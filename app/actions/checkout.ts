"use server"

import { stripe } from "@/lib/stripe"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createCheckoutSession(formData: {
  eventId: string
  tickets: { ticketTypeId: string; quantity: number }[]
  customerInfo: {
    name: string
    email: string
    phone: string
  }
  paymentMethod: "card" | "bank_transfer"
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Calculate total amount
  let totalAmount = 0
  const lineItems = []

  for (const ticket of formData.tickets) {
    const { data: ticketType } = await supabase.from("ticket_types").select("*").eq("id", ticket.ticketTypeId).single()

    if (!ticketType) {
      throw new Error("Ticket type not found")
    }

    // Check availability
    if (ticketType.available_quantity < ticket.quantity) {
      throw new Error(`Not enough ${ticketType.name} tickets available`)
    }

    totalAmount += ticketType.price * ticket.quantity

    lineItems.push({
      price_data: {
        currency: "ngn",
        product_data: {
          name: ticketType.name,
          description: ticketType.description || "",
        },
        unit_amount: Math.round(ticketType.price * 100), // Convert to kobo
      },
      quantity: ticket.quantity,
    })
  }

  // Generate order number
  const orderNumber = `MV-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

  // Create order in database
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      order_number: orderNumber,
      event_id: formData.eventId,
      customer_name: formData.customerInfo.name,
      customer_email: formData.customerInfo.email,
      customer_phone: formData.customerInfo.phone,
      total_amount: totalAmount,
      payment_method: formData.paymentMethod,
      payment_status: "pending",
      user_id: user?.id || null, // Link to user if authenticated
    })
    .select()
    .single()

  if (orderError) {
    throw new Error("Failed to create order")
  }

  // Create order items
  for (const ticket of formData.tickets) {
    const { data: ticketType } = await supabase
      .from("ticket_types")
      .select("price")
      .eq("id", ticket.ticketTypeId)
      .single()

    await supabase.from("order_items").insert({
      order_id: order.id,
      ticket_type_id: ticket.ticketTypeId,
      quantity: ticket.quantity,
      unit_price: ticketType!.price,
      subtotal: ticketType!.price * ticket.quantity,
    })
  }

  if (formData.paymentMethod === "card") {
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      redirect_on_completion: "never",
      line_items: lineItems,
      mode: "payment",
      customer_email: formData.customerInfo.email,
      metadata: {
        order_id: order.id,
        order_number: orderNumber,
      },
    })

    // Update order with Stripe session ID
    await supabase.from("orders").update({ stripe_session_id: session.id }).eq("id", order.id)

    return {
      success: true,
      clientSecret: session.client_secret,
      orderId: order.id,
      orderNumber: orderNumber,
    }
  } else {
    // Bank transfer - return bank details
    return {
      success: true,
      orderId: order.id,
      orderNumber: orderNumber,
      bankDetails: {
        bankName: "First Bank of Nigeria",
        accountNumber: "1234567890",
        accountName: "MU-VONZENI ENTERTAINMENT",
        amount: totalAmount,
      },
    }
  }
}

export async function confirmPayment(orderId: string) {
  const supabase = await createClient()

  // Get order details
  const { data: order } = await supabase
    .from("orders")
    .select("*, order_items(*, ticket_types(*))")
    .eq("id", orderId)
    .single()

  if (!order) {
    throw new Error("Order not found")
  }

  if (order.payment_method === "card" && order.stripe_session_id) {
    // Check Stripe payment status
    const session = await stripe.checkout.sessions.retrieve(order.stripe_session_id)

    if (session.payment_status === "paid") {
      // Update order status
      await supabase.from("orders").update({ payment_status: "confirmed" }).eq("id", orderId)

      // Update ticket availability
      for (const item of order.order_items) {
        await supabase.rpc("decrement_ticket_quantity", {
          ticket_type_id: item.ticket_type_id,
          quantity: item.quantity,
        })
      }

      revalidatePath("/events")
      return { success: true, status: "confirmed" }
    }
  }

  return { success: false, status: order.payment_status }
}

export async function submitBankTransferProof(orderId: string, proofUrl: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("orders").update({ bank_transfer_proof_url: proofUrl }).eq("id", orderId)

  if (error) {
    throw new Error("Failed to submit proof")
  }

  revalidatePath("/admin/orders")
  return { success: true }
}
