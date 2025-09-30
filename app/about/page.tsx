import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Target, Users, Zap } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-primary text-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center space-y-6">
              <h1 className="text-balance text-white">About MU-VONZENI</h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Celebrating and raising the next generation of artists, creators, and amazing young talents.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 md:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center max-w-6xl mx-auto">
              <div className="space-y-6">
                <h2 className="text-balance">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  MU-VONZENI ENTERTAINMENT is dedicated to creating unforgettable experiences that bring together food,
                  music, art, and culture. We believe in the power of community and the importance of supporting young
                  talent.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Through our events, we provide a platform for emerging artists, chefs, and creators to showcase their
                  talents while bringing people together to celebrate Nigerian culture and creativity.
                </p>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden bg-muted">
                <div className="absolute inset-0 bg-[url('/diverse-young-nigerian-artists-performers-communit.jpg')] bg-cover bg-center" />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 md:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h2 className="text-balance mb-6">Our Values</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The principles that guide everything we do at MU-VONZENI.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
              <Card className="border-border/50 bg-card">
                <CardContent className="pt-8 pb-8 space-y-4 text-center">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto">
                    <Heart className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold">Community First</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Building connections and fostering a sense of belonging among young creatives.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card">
                <CardContent className="pt-8 pb-8 space-y-4 text-center">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold">Excellence</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Delivering high-quality experiences that exceed expectations every time.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card">
                <CardContent className="pt-8 pb-8 space-y-4 text-center">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto">
                    <Zap className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold">Innovation</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Pushing boundaries and creating fresh, exciting entertainment experiences.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card">
                <CardContent className="pt-8 pb-8 space-y-4 text-center">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold">Inclusivity</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Creating spaces where everyone feels welcome and celebrated.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 md:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h2 className="text-balance mb-6">Our Team</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Meet the passionate people behind MU-VONZENI ENTERTAINMENT.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border-border/50 bg-card">
                  <CardContent className="pt-8 pb-8 space-y-4 text-center">
                    <div className="h-32 w-32 rounded-full bg-muted mx-auto overflow-hidden">
                      <div className="h-full w-full bg-[url('/professional-portrait.png')] bg-cover bg-center" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Team Member</h3>
                      <p className="text-sm text-muted-foreground">Position Title</p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      Passionate about creating memorable experiences and supporting young talent.
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
