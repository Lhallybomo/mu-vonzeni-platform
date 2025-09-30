import { createClient } from "@/lib/supabase/server"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default async function AdminEventsPage() {
  const supabase = await createClient()

  const { data: events } = await supabase
    .from("events")
    .select("*, ticket_types(*)")
    .order("date", { ascending: false })

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Events</h1>
            <p className="text-muted-foreground">Manage events and ticket inventory</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/admin">Back to Dashboard</Link>
          </Button>
        </div>

        <div className="space-y-6">
          {events && events.length > 0 ? (
            events.map((event) => (
              <Card key={event.id} className="p-6">
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-semibold">{event.title}</h3>
                    <Badge
                      variant={
                        event.status === "upcoming" ? "default" : event.status === "ongoing" ? "secondary" : "outline"
                      }
                    >
                      {event.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>
                      <strong>Date:</strong> {new Date(event.date).toLocaleString()}
                    </p>
                    <p>
                      <strong>Location:</strong> {event.location} - {event.venue}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Ticket Types</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    {event.ticket_types.map((ticket: any) => (
                      <Card key={ticket.id} className="p-4">
                        <h5 className="font-semibold mb-2">{ticket.name}</h5>
                        <div className="text-sm space-y-1">
                          <p className="text-primary font-bold">₦{Number(ticket.price).toLocaleString()}</p>
                          <p className="text-muted-foreground">
                            Available: {ticket.available_quantity} / {ticket.total_quantity}
                          </p>
                          <div className="w-full bg-muted rounded-full h-2 mt-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{
                                width: `${(ticket.available_quantity / ticket.total_quantity) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No events yet</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
