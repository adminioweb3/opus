"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useJourneyStore } from "@/lib/stores/journey-store"
import { Sparkles, Search, FileText, Activity, ShieldCheck, Quote, Target, Tag, Lightbulb } from "lucide-react"

const SCAN_STEPS = [
  { id: "seo", label: "Checking SEO...", icon: Search, delay: 0 },
  { id: "content", label: "Checking content...", icon: FileText, delay: 2000 },
  { id: "authority", label: "Checking authority...", icon: ShieldCheck, delay: 4000 },
  { id: "visibility", label: "Checking AI visibility...", icon: Sparkles, delay: 6000 },
  { id: "citations", label: "Checking citations...", icon: Quote, delay: 8000 },
  { id: "competitors", label: "Checking competitors...", icon: Target, delay: 10000 },
  { id: "keywords", label: "Checking keywords...", icon: Tag, delay: 12000 },
  { id: "recommendations", label: "Generating recommendations...", icon: Lightbulb, delay: 14000 },
]

export default function AnalysisSimulationPage() {
  const router = useRouter()
  const { websiteUrl, setState } = useJourneyStore()
  const [activeStepIndex, setActiveStepIndex] = useState(-1)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Start fake progress animation up to 90%
    let currentProgress = 0
    const progressInterval = setInterval(() => {
      if (currentProgress < 90) {
        currentProgress += 2
        setProgress(Math.min(currentProgress, 90))
      }
    }, 150) 

    const stepTimers = SCAN_STEPS.map((step, index) => {
      // Speed up step animation visually
      return setTimeout(() => {
        setActiveStepIndex(index)
      }, step.delay / 3) 
    })

    // Call real API
    const runAnalysis = async () => {
      try {
        const { analyzeOnboardingData } = await import("@/lib/api/onboardingApi")
        const storeState = useJourneyStore.getState()
        
        const result = await analyzeOnboardingData({
          websiteUrl: storeState.websiteUrl,
          businessName: storeState.businessName,
          industry: storeState.industry,
          targetAudience: storeState.targetAudience,
          keywords: storeState.keywords,
          competitors: storeState.competitors.join(", "),
          rankingGoal: storeState.rankingGoal
        })

        // Ensure we show at least a few seconds of animation
        await new Promise(resolve => setTimeout(resolve, 3000))
        
        clearInterval(progressInterval)
        setProgress(100)
        
        storeState.setAnalysisResult(result)
        
        setTimeout(() => {
          setState("paywall")
          router.push("/onboarding/report")
        }, 500)

      } catch (err) {
        console.error("Analysis failed", err)
        // Fallback to report on error
        clearInterval(progressInterval)
        setState("paywall")
        router.push("/onboarding/report")
      }
    }

    runAnalysis()

    return () => {
      clearInterval(progressInterval)
      stepTimers.forEach(clearTimeout)
    }
  }, [router, setState])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md relative">
        <div className="absolute -inset-10 bg-primary/20 blur-[100px] rounded-full z-0 pointer-events-none" />
        
        <div className="relative z-10 glass-card border border-border p-10 rounded-3xl shadow-2xl text-center space-y-8">
          <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center relative">
            <Sparkles className="w-10 h-10 text-primary animate-pulse" />
            <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-2">Analyzing Website</h1>
            <p className="text-muted-foreground font-mono text-sm">{websiteUrl || "your domain"}</p>
          </div>

          <div className="space-y-4 text-left border rounded-xl p-4 bg-muted/30">
            {SCAN_STEPS.map((step, index) => {
              const Icon = step.icon
              const isActive = index === activeStepIndex
              const isPast = index < activeStepIndex
              
              return (
                <div key={step.id} className={`flex items-center gap-3 transition-opacity duration-500 ${isPast ? "opacity-50" : isActive ? "opacity-100 scale-105 transform translate-x-2" : "opacity-0"}`}>
                  <Icon className={`w-4 h-4 ${isActive ? "text-primary animate-spin" : "text-muted-foreground"}`} style={{ animationDuration: isActive && step.id !== "recommendations" ? "3s" : "0s" }} />
                  <span className={`text-sm font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</span>
                  {isPast && <div className="ml-auto w-2 h-2 rounded-full bg-emerald-500" />}
                </div>
              )
            })}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium text-muted-foreground">
              <span>Analysis Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all ease-linear" 
                style={{ width: `${progress}%`, transitionDuration: '150ms' }} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
