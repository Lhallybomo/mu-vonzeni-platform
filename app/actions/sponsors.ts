"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function submitSponsorInquiry(formData: {
  companyName: string
  contactName: string
  email: string
  phone: string
  sponsorshipTier: string
  message?: string
}) {
  const supabase = await createClient()

  const { error } = await supabase.from("sponsor_inquiries").insert({
    company_name: formData.companyName,
    contact_name: formData.contactName,
    email: formData.email,
    phone: formData.phone,
    sponsorship_tier: formData.sponsorshipTier,
    message: formData.message || null,
    status: "pending",
  })

  if (error) {
    throw new Error("Failed to submit sponsor inquiry")
  }

  revalidatePath("/admin/sponsors")
  return { success: true }
}
