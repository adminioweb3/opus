"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useJourneyStore } from "@/lib/stores/journey-store"
import { completeOnboarding } from "@/lib/api/onboardingApi"
import { LIMITED_REPORT } from "@/lib/mock-data/journey"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, ShieldCheck, ArrowRight, Loader2 } from "lucide-react"

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 49,
    description: "For small businesses starting with AI SEO.",
    features: ["1 Website", "3 Competitors", "Basic Recommendations", "Monthly Scans"],
  },
  {
    id: "growth",
    name: "Growth",
    price: 199,
    popular: true,
    description: "For growing brands focused on share of voice.",
    features: ["5 Websites", "10 Competitors", "Advanced AI Recommendations", "Weekly Scans", "Competitor Gap Analysis"],
  },
  {
    id: "business",
    name: "Business",
    price: 499,
    description: "For agencies and large scale businesses.",
    features: ["Unlimited Websites", "Unlimited Competitors", "API Access", "Daily Scans", "White-label Reports"],
  }
]

import { useOrganizationStore } from "@/lib/stores/organization-store"

export default function PaywallCheckoutPage() {
  const router = useRouter()
  const { websiteUrl, businessName, analysisResult, setSubscribed, setState } = useJourneyStore()

  const [selectedPlan, setSelectedPlan] = useState("growth")
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    setLoading(true)
    
    try {
      // Map all onboarding data into the dashboard database
      await completeOnboarding({
        websiteUrl: websiteUrl || "",
        businessName: businessName || "",

        visibilityScore: analysisResult?.overallConfidence ?? LIMITED_REPORT.visibilityScore,
        brandAuthority: analysisResult?.domainAuthorityEstimate?.value?.estimatedScore ?? LIMITED_REPORT.brandAuthority,
        contentStrength: analysisResult?.seoStrength?.value?.score ?? LIMITED_REPORT.contentStrength,
        citationScore: analysisResult?.topicalAuthority?.confidence ?? LIMITED_REPORT.citationScore
      })

      // Update the local organization store so the sidebar/navbar show the correct details
      useOrganizationStore.getState().updateOrg({
        orgName: businessName || "My Organization",
        orgDomain: websiteUrl || ""
      })
    } catch (error) {
      console.error("Failed to complete onboarding mapping:", error)
      // Proceed to dashboard anyway so user is not stuck
    }
    
    setSubscribed(true)
    setState("subscribed")
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-muted/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Choose your plan</h1>
          <p className="text-xl text-muted-foreground">Unlock your full AI visibility report and actionable optimization strategy.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PLANS.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative cursor-pointer transition-all ${
                selectedPlan === plan.id 
                  ? "border-blue-600 ring-2 ring-blue-600 shadow-xl" 
                  : "border-border hover:border-blue-600/50"
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3">Most Popular</Badge>
                </div>
              )}
              <CardContent className="p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mt-2 h-10">{plan.description}</p>
                </div>
                <div className="mb-6 flex items-baseline text-5xl font-extrabold">
                  ${plan.price}
                  <span className="text-xl text-muted-foreground font-medium">/mo</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="shrink-0">
                        <Check className="h-5 w-5 text-emerald-500" />
                      </div>
                      <p className="ml-3 text-sm text-foreground">{feature}</p>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${selectedPlan === plan.id ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}`}
                  variant={selectedPlan === plan.id ? "default" : "outline"}
                  size="lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPlan(plan.id);
                  }}
                >
                  {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 max-w-md mx-auto space-y-8">

          <Card className="border-border shadow-lg">
            <CardContent className="p-6">
              <h4 className="font-bold mb-4 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-emerald-500" /> Checkout</h4>
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Selected Plan</span>
                  <span className="capitalize font-medium text-foreground">{selectedPlan}</span>
                </div>
                <div className="flex justify-between text-muted-foreground border-b pb-3">
                  <span>Billing Cycle</span>
                  <span>Monthly</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2">
                  <span>Total Due Today</span>
                  <span>${PLANS.find(p => p.id === selectedPlan)?.price}</span>
                </div>
              </div>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
                size="lg"
                onClick={handleSubscribe}
                disabled={loading}
              >
                {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...</> : <>Subscribe & Unlock Dashboard <ArrowRight className="w-4 h-4 ml-2" /></>}
              </Button>
              <p className="text-center text-xs text-muted-foreground mt-4">Secure payment powered by Stripe. Cancel anytime.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
