"use client"

import { Check } from "lucide-react"
import { useRouter } from "next/navigation"

const plans = [
  {
    name: "Professional",
    price: "$299",
    description: "Perfect for growing brands and agencies.",
    features: ["Track up to 5 keywords", "Daily AI Search updates", "3 Competitors", "Basic Sentiment Analysis", "Email Alerts"],
    highlighted: false
  },
  {
    name: "Enterprise",
    price: "$999",
    description: "Advanced monitoring for global enterprises.",
    features: ["Unlimited keywords", "Real-time AI monitoring", "Unlimited Competitors", "Advanced Topic Clustering", "API Access", "Custom Webhooks"],
    highlighted: true
  }
]

export function Pricing() {
  const router = useRouter()
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple, transparent pricing</h2>
          <p className="text-muted-foreground text-lg">Choose the right plan to monitor your AI visibility.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`rounded-3xl p-8 border ${plan.highlighted ? 'border-accent bg-section-bg shadow-card-hover relative' : 'border-border bg-white shadow-card hover:shadow-card-hover'} transition-shadow`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-medium shadow-sm">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              <div className="mb-6">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">/mo</span>
              </div>
              <button onClick={() => router.push('/onboarding')} className={`w-full py-3 rounded-lg font-semibold mb-8 transition-colors ${plan.highlighted ? 'bg-accent text-white hover:bg-accent/90' : 'bg-section-bg text-primary-text border border-border hover:bg-border'}`}>
                Get Started
              </button>
              <ul className="space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-secondary-text">
                    <Check className="w-5 h-5 text-accent" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
