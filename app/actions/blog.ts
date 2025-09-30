"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createBlogPost(formData: {
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  imageUrl?: string
  published: boolean
}) {
  const supabase = await createClient()

  const { error } = await supabase.from("blog_posts").insert({
    title: formData.title,
    slug: formData.slug,
    excerpt: formData.excerpt,
    content: formData.content,
    author: formData.author,
    image_url: formData.imageUrl || null,
    published: formData.published,
    published_at: formData.published ? new Date().toISOString() : null,
  })

  if (error) {
    throw new Error("Failed to create blog post")
  }

  revalidatePath("/blog")
  revalidatePath("/admin/blog")
  return { success: true }
}

export async function updateBlogPost(
  id: string,
  formData: {
    title: string
    slug: string
    excerpt: string
    content: string
    author: string
    imageUrl?: string
    published: boolean
  },
) {
  const supabase = await createClient()

  const updateData: any = {
    title: formData.title,
    slug: formData.slug,
    excerpt: formData.excerpt,
    content: formData.content,
    author: formData.author,
    image_url: formData.imageUrl || null,
    published: formData.published,
    updated_at: new Date().toISOString(),
  }

  // Only update published_at if changing from unpublished to published
  if (formData.published) {
    const { data: currentPost } = await supabase.from("blog_posts").select("published").eq("id", id).single()

    if (currentPost && !currentPost.published) {
      updateData.published_at = new Date().toISOString()
    }
  }

  const { error } = await supabase.from("blog_posts").update(updateData).eq("id", id)

  if (error) {
    throw new Error("Failed to update blog post")
  }

  revalidatePath("/blog")
  revalidatePath(`/blog/${formData.slug}`)
  revalidatePath("/admin/blog")
  return { success: true }
}

export async function deleteBlogPost(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("blog_posts").delete().eq("id", id)

  if (error) {
    throw new Error("Failed to delete blog post")
  }

  revalidatePath("/blog")
  revalidatePath("/admin/blog")
  return { success: true }
}
