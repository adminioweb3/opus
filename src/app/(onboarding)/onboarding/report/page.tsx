"use client"

import { useRouter } from "next/navigation"
import { useJourneyStore } from "@/lib/stores/journey-store"
import { LIMITED_REPORT } from "@/lib/mock-data/journey"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Eye, ShieldCheck, FileText, Quote, ChevronRight, Unlock } from "lucide-react"

export default function PaywallReportPage() {
  const router = useRouter()
  const { websiteUrl, analysisResult } = useJourneyStore()

  // Use the live AI results if available, otherwise fallback
  const visibilityScore = analysisResult?.visibilityScore ?? LIMITED_REPORT.visibilityScore;
  const brandAuthority = analysisResult?.brandAuthority ?? LIMITED_REPORT.brandAuthority;
  const contentStrength = analysisResult?.contentStrength ?? LIMITED_REPORT.contentStrength;
  const citationScore = analysisResult?.citationScore ?? LIMITED_REPORT.citationScore;

  const metrics = [
    { label: "AI Visibility Score", value: visibilityScore, icon: Eye, color: "text-red-500", suffix: "/100", status: visibilityScore < 50 ? "Critical" : "Fair" },
    { label: "Brand Authority", value: brandAuthority, icon: ShieldCheck, color: "text-amber-500", suffix: "/100", status: brandAuthority < 50 ? "Poor" : "Good" },
    { label: "Content Strength", value: contentStrength, icon: FileText, color: "text-amber-500", suffix: "/100", status: contentStrength < 60 ? "Fair" : "Good" },
    { label: "Citation Score", value: citationScore, icon: Quote, color: "text-red-500", suffix: "/100", status: citationScore < 40 ? "Critical" : "Fair" },
  ]

  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      <div className="bg-background border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="font-bold text-primary-foreground text-lg leading-none">O</span>
            </div>
            <span className="font-bold tracking-tight">OPUS</span>
          </div>
          <Button onClick={() => router.push("/onboarding/checkout")} className="bg-blue-600 hover:bg-blue-700">
            Unlock Full Report <Unlock className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-10 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="outline" className="mb-4">Free Analysis Complete</Badge>
          <h1 className="text-4xl font-bold tracking-tight">Your AI Visibility is at Risk</h1>
          <p className="text-xl text-muted-foreground mt-4">
            We analyzed <span className="font-mono text-foreground font-medium">{websiteUrl || "your website"}</span> across ChatGPT, Gemini, Claude, and Perplexity.
          </p>
        </div>

        {/* Free Tier Visible Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {metrics.map(m => (
            <Card key={m.label} className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg bg-muted ${m.color}`}>
                    <m.icon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full bg-muted ${m.color}`}>{m.status}</span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{m.label}</p>
                  <p className="text-3xl font-bold">{m.value}<span className="text-lg text-muted-foreground font-normal">{m.suffix}</span></p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Locked Premium Section */}
        <div className="relative mt-12">
          {/* Paywall Overlay */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm rounded-3xl border border-border/50">
            <div className="bg-background p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-border">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Unlock the Full Strategy</h2>
              <p className="text-muted-foreground mb-6">
                Get access to your customized AI optimization roadmap, competitor gap analysis, and growth forecasting.
              </p>
              <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => router.push("/onboarding/checkout")}>
                View Pricing Plans <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-xs text-muted-foreground mt-4">14-day money-back guarantee. Cancel anytime.</p>
            </div>
          </div>

          {/* Blurred Background Content */}
          <div className="grid md:grid-cols-2 gap-6 opacity-40 select-none pointer-events-none">
            <Card>
              <CardHeader>
                <CardTitle>AI Recommendations</CardTitle>
                <CardDescription>Actionable steps to improve visibility.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-4 p-3 border rounded-lg">
                    <div className="w-10 h-10 bg-muted rounded-lg" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Competitor Gap Analysis</CardTitle>
                <CardDescription>Where you are losing share of voice.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex items-center justify-between border-b pb-2">
                    <div className="h-4 bg-muted rounded w-1/3" />
                    <div className="h-4 bg-muted rounded w-1/4" />
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Growth Forecast</CardTitle>
                <CardDescription>Projected AI visibility over 6 months.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 w-full bg-muted rounded-lg" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Inline Badge component for this file
function Badge({ children, className, variant = "default" }: { children: React.ReactNode, className?: string, variant?: "default" | "outline" }) {
  const base = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
  const variants = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    outline: "text-foreground",
  }
  return <div className={`${base} ${variants[variant]} ${className || ""}`}>{children}</div>
}
