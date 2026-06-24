"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useJourneyStore } from "@/lib/stores/journey-store"
import { Check, ChevronRight, ArrowLeft, Globe, Building2, Target, Trophy, Sparkles } from "lucide-react"

const steps = [
  { id: 1, title: "Website", icon: Globe },
  { id: 2, title: "Business Info", icon: Building2 },
  { id: 3, title: "Competitors", icon: Target },
  { id: 4, title: "Ranking Goal", icon: Trophy },
]

export default function JourneyOnboardingPage() {
  const router = useRouter()
  const { 
    websiteUrl, businessName, industry, country, targetAudience, services, products, keywords, competitors, rankingGoal,
    updateOnboardingData, addCompetitor, removeCompetitor, setState 
  } = useJourneyStore()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [competitorInput, setCompetitorInput] = useState("")

  const goNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleAddCompetitor = () => {
    if (competitorInput.trim() && !competitors.includes(competitorInput.trim())) {
      addCompetitor(competitorInput.trim())
      setCompetitorInput("")
    }
  }

  const finish = () => {
    setState("analyzing")
    router.push("/onboarding/analysis")
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar Progress */}
      <div className="hidden lg:flex w-80 border-r bg-card p-8 flex-col">
        <div className="flex items-center gap-2 mb-12">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="font-bold text-primary-foreground text-xl leading-none">O</span>
          </div>
          <span className="font-bold text-xl tracking-tight">CITATIONLY</span>
        </div>

        <nav className="flex-1 space-y-1">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
                step.id === currentStep
                  ? "bg-primary/10 text-primary font-medium"
                  : step.id < currentStep
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                step.id < currentStep
                  ? "bg-primary text-primary-foreground"
                  : step.id === currentStep
                  ? "bg-primary/10 text-primary border-2 border-primary"
                  : "bg-muted text-muted-foreground"
              }`}>
                {step.id < currentStep ? <Check className="w-3.5 h-3.5" /> : <step.icon className="w-3.5 h-3.5" />}
              </div>
              {step.title}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative p-8">
        <div className="absolute top-8 right-8">
          <Button variant="ghost" onClick={() => router.push('/login')} className="text-muted-foreground hover:text-foreground">
            Already have an account? Log in
          </Button>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-xl">
          {/* Mobile Progress */}
          <div className="lg:hidden mb-8">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Step {currentStep} of 4</span>
              <span>{Math.round((currentStep / 4) * 100)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${(currentStep / 4) * 100}%` }} />
            </div>
          </div>

          {/* Step 1: Website */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Let&apos;s start with your website</h1>
                <p className="mt-3 text-muted-foreground text-lg">Enter your primary domain to initialize your AI SEO workspace.</p>
              </div>
              <div className="space-y-4 pt-4">
                <div>
                  <Label>Website URL</Label>
                  <Input 
                    className="mt-2 text-lg py-6" 
                    placeholder="https://company.com" 
                    value={websiteUrl} 
                    onChange={e => updateOnboardingData({ websiteUrl: e.target.value })} 
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Business Info */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Tell us about your business</h2>
                <p className="mt-2 text-muted-foreground">The more details you provide, the better AI models can understand your brand entity.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <Label>Business Name</Label>
                  <Input className="mt-2" placeholder="Acme Corp" value={businessName} onChange={e => updateOnboardingData({ businessName: e.target.value })} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <Label>Industry</Label>
                  <Input className="mt-2" placeholder="e.g. B2B SaaS" value={industry} onChange={e => updateOnboardingData({ industry: e.target.value })} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <Label>Country</Label>
                  <Input className="mt-2" placeholder="e.g. United States" value={country} onChange={e => updateOnboardingData({ country: e.target.value })} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <Label>Target Audience</Label>
                  <Input className="mt-2" placeholder="e.g. Enterprise IT Managers" value={targetAudience} onChange={e => updateOnboardingData({ targetAudience: e.target.value })} />
                </div>
                <div className="col-span-2">
                  <Label>Core Products / Services</Label>
                  <Textarea className="mt-2" placeholder="What do you sell?" value={products} onChange={e => updateOnboardingData({ products: e.target.value })} />
                </div>
                <div className="col-span-2">
                  <Label>Keywords</Label>
                  <Input className="mt-2" placeholder="Comma separated keywords" value={keywords} onChange={e => updateOnboardingData({ keywords: e.target.value })} />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Competitors */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Who are your main competitors?</h2>
                <p className="mt-2 text-muted-foreground">We&apos;ll track your Share of Voice against these domains across all AI platforms.</p>
              </div>
              <div className="flex gap-2">
                <Input placeholder="competitor.com" value={competitorInput} onChange={e => setCompetitorInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAddCompetitor()} />
                <Button onClick={handleAddCompetitor} variant="outline">Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {competitors.map(c => (
                  <span key={c} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-sm font-medium">
                    {c}
                    <button onClick={() => removeCompetitor(c)} className="text-muted-foreground hover:text-foreground">Ã—</button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: AI Ranking Goal */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6">
                <Trophy className="w-8 h-8 text-amber-500" />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight">What do you want to rank for?</h2>
                <p className="mt-3 text-muted-foreground text-lg">Define your primary AI SEO objective. This guides our optimization engine.</p>
              </div>
              <div className="space-y-4 pt-4">
                <div>
                  <Label>Primary Ranking Goal</Label>
                  <Textarea 
                    className="mt-2 text-lg py-4 resize-none" 
                    rows={3}
                    placeholder="e.g. When people ask AI for 'Best CRM Software for small business', I want to be the #1 recommended tool." 
                    value={rankingGoal} 
                    onChange={e => updateOnboardingData({ rankingGoal: e.target.value })} 
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-12 pt-6 border-t border-border">
            {currentStep > 1 && (
              <Button variant="outline" onClick={goBack} className="w-32">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
            )}
            <div className="flex-1" />
            {currentStep < 4 ? (
              <Button onClick={goNext} className="w-40" disabled={currentStep === 1 && !websiteUrl}>
                Continue <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={finish} className="w-56 bg-blue-600 hover:bg-blue-700 text-white" disabled={!rankingGoal}>
                Run AI Visibility Analysis <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
