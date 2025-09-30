// Ticket types
export interface TicketCategory {
  id: string
  name: string
  price: number
  currency: string
  description?: string
  quantityTotal: number
  quantityRemaining: number
}

export interface TicketOrder {
  orderId: string
  eventId: string
  user: {
    name: string
    email: string
    phone: string
  }
  items: Array<{
    ticketId: string
    category: string
    quantity: number
    price: number
  }>
  subtotal: number
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  paymentMethod: "card" | "bank_transfer"
  receiptUrl?: string
  createdAt: string
}

// Event types
export interface Event {
  id: string
  name: string
  slug: string
  tagline: string
  description: string
  date: string
  location: string
  imageUrl: string
  ticketCategories: TicketCategory[]
  featured: boolean
}

// Blog types
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: "music" | "food" | "fashion" | "art" | "dance" | "comedy"
  imageUrl: string
  author: string
  publishedAt: string
}

// Vendor types
export interface VendorBooking {
  id: string
  eventId: string
  vendorName: string
  businessName: string
  email: string
  phone: string
  boothType: string
  paymentStatus: "pending" | "paid" | "failed"
  createdAt: string
}

// Sponsor types
export interface SponsorshipInquiry {
  id: string
  companyName: string
  contactName: string
  email: string
  phone: string
  tier: "bronze" | "silver" | "gold" | "platinum"
  message: string
  status: "pending" | "contacted" | "confirmed"
  createdAt: string
}
