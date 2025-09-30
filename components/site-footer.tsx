import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold mb-4">MU-VONZENI</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Celebrating and raising the next generation of artists, creators, and amazing young talents.
            </p>
            <Button asChild className="mt-6 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/donate">Donate</Link>
            </Button>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wide">Events</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/events" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/tickets" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Buy Tickets
                </Link>
              </li>
              <li>
                <Link href="/merchandise" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Merchandise
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wide">Partners</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/vendors" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Become a Vendor
                </Link>
              </li>
              <li>
                <Link href="/sponsorship" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Sponsorship
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wide">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MU-VONZENI ENTERTAINMENT. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-accent transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
