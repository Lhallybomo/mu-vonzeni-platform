import { createClient } from "@/lib/supabase/server"
import { Card } from "@/components/ui/card"
import { Ticket, ShoppingBag, Users, Store, DollarSign, FileText } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Fetch statistics
  const { count: totalOrders } = await supabase.from("orders").select("*", { count: "exact", head: true })

  const { count: pendingOrders } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .eq("payment_status", "pending")

  const { count: confirmedOrders } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .eq("payment_status", "confirmed")

  const { data: revenueData } = await supabase.from("orders").select("total_amount").eq("payment_status", "confirmed")

  const totalRevenue = revenueData?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0

  const { count: vendorApplications } = await supabase
    .from("vendor_applications")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending")

  const { count: sponsorInquiries } = await supabase
    .from("sponsor_inquiries")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending")

  const { count: contactMessages } = await supabase
    .from("contact_messages")
    .select("*", { count: "exact", head: true })
    .eq("status", "unread")

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders || 0,
      icon: ShoppingBag,
      href: "/admin/orders",
      color: "text-blue-500",
    },
    {
      title: "Pending Orders",
      value: pendingOrders || 0,
      icon: Ticket,
      href: "/admin/orders?status=pending",
      color: "text-yellow-500",
    },
    {
      title: "Confirmed Orders",
      value: confirmedOrders || 0,
      icon: Ticket,
      href: "/admin/orders?status=confirmed",
      color: "text-green-500",
    },
    {
      title: "Total Revenue",
      value: `₦${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      href: "/admin/orders",
      color: "text-primary",
    },
    {
      title: "Vendor Applications",
      value: vendorApplications || 0,
      icon: Store,
      href: "/admin/vendors",
      color: "text-purple-500",
    },
    {
      title: "Sponsor Inquiries",
      value: sponsorInquiries || 0,
      icon: Users,
      href: "/admin/sponsors",
      color: "text-pink-500",
    },
    {
      title: "Contact Messages",
      value: contactMessages || 0,
      icon: FileText,
      href: "/admin/messages",
      color: "text-orange-500",
    },
  ]

  const quickLinks = [
    { title: "Manage Orders", href: "/admin/orders", icon: ShoppingBag },
    { title: "Manage Events", href: "/admin/events", icon: Ticket },
    { title: "Manage Blog", href: "/admin/blog", icon: FileText },
    { title: "Vendor Applications", href: "/admin/vendors", icon: Store },
    { title: "Sponsor Inquiries", href: "/admin/sponsors", icon: Users },
    { title: "Contact Messages", href: "/admin/messages", icon: FileText },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your MU-VONZENI event platform</p>
      </div>

      {/* Statistics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="p-6 hover:border-primary transition-colors">
              <div className="flex items-start justify-between mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.title}</div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((link) => (
            <Link key={link.title} href={link.href}>
              <Card className="p-6 hover:border-primary transition-colors">
                <div className="flex items-center gap-4">
                  <link.icon className="w-6 h-6 text-primary" />
                  <span className="font-semibold">{link.title}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
