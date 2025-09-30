"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"
import { UserNav } from "@/components/user-nav"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-tight">MU-VONZENI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/events" className="text-sm font-medium hover:text-accent transition-colors">
            EVENTS
          </Link>
          <Link href="/tickets" className="text-sm font-medium hover:text-accent transition-colors">
            TICKETS
          </Link>
          <Link href="/merchandise" className="text-sm font-medium hover:text-accent transition-colors">
            SHOP
          </Link>
          <Link href="/vendors" className="text-sm font-medium hover:text-accent transition-colors">
            VENDORS
          </Link>
          <Link href="/sponsorship" className="text-sm font-medium hover:text-accent transition-colors">
            SPONSORS
          </Link>
          <Link href="/blog" className="text-sm font-medium hover:text-accent transition-colors">
            BLOG
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-accent transition-colors">
            CONTACT
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button asChild variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/tickets">GET TICKETS</Link>
          </Button>
          <UserNav />
        </div>

        <div className="flex md:hidden items-center gap-2">
          <UserNav />
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background">
          <nav className="container flex flex-col gap-4 px-4 py-6">
            <Link href="/events" className="text-sm font-medium hover:text-accent transition-colors">
              EVENTS
            </Link>
            <Link href="/tickets" className="text-sm font-medium hover:text-accent transition-colors">
              TICKETS
            </Link>
            <Link href="/merchandise" className="text-sm font-medium hover:text-accent transition-colors">
              SHOP
            </Link>
            <Link href="/vendors" className="text-sm font-medium hover:text-accent transition-colors">
              VENDORS
            </Link>
            <Link href="/sponsorship" className="text-sm font-medium hover:text-accent transition-colors">
              SPONSORS
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:text-accent transition-colors">
              BLOG
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-accent transition-colors">
              CONTACT
            </Link>
            <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/tickets">GET TICKETS</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
