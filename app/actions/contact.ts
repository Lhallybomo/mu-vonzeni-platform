"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function submitContactMessage(formData: {
  name: string
  email: string
  subject: string
  message: string
}) {
  const supabase = await createClient()

  const { error } = await supabase.from("contact_messages").insert({
    name: formData.name,
    email: formData.email,
    subject: formData.subject,
    message: formData.message,
    status: "unread",
  })

  if (error) {
    throw new Error("Failed to submit contact message")
  }

  revalidatePath("/admin/messages")
  return { success: true }
}
