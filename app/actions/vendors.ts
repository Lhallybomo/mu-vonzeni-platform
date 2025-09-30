"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function submitVendorApplication(formData: {
  businessName: string
  contactName: string
  email: string
  phone: string
  businessType: string
  description: string
  website?: string
  instagram?: string
}) {
  const supabase = await createClient()

  const { error } = await supabase.from("vendor_applications").insert({
    business_name: formData.businessName,
    contact_name: formData.contactName,
    email: formData.email,
    phone: formData.phone,
    business_type: formData.businessType,
    description: formData.description,
    website: formData.website || null,
    instagram: formData.instagram || null,
    status: "pending",
  })

  if (error) {
    throw new Error("Failed to submit vendor application")
  }

  revalidatePath("/admin/vendors")
  return { success: true }
}
