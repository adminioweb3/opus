"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, Target, LineChart, Globe, Zap, Search } from "lucide-react"
import { VisibilityDashboardSvg } from "@/components/illustrations/VisibilityDashboardSvg"
import { MonitoringDashboardSvg } from "@/components/illustrations/MonitoringDashboardSvg"
import { CitationDashboardSvg } from "@/components/illustrations/CitationDashboardSvg"
import { CompetitiveDashboardSvg } from "@/components/illustrations/CompetitiveDashboardSvg"

const features = [
  {
    id: "visibility",
    title: "AI Visibility Dashboard",
    icon: LineChart,
    description: "Track your Share of Voice across ChatGPT, Claude, and Gemini with interactive trend charts and visibility scorecards.",
  },
  {
    id: "monitoring",
    title: "Real-Time Monitoring",
    icon: Activity,
    description: "Monitor live brand mentions in AI outputs with a scrolling feed of tracking events.",
  },
  {
    id: "citation",
    title: "AI Citation Dashboard",
    icon: Globe,
    description: "Analyze the exact sources and domain authority scores that LLMs are using to generate responses about you.",
  },
  {
    id: "competitive",
    title: "Competitive Intelligence",
    icon: Target,
    description: "Compare your market share against up to 10 competitors across all major generative engines.",
  },
  {
    id: "geo",
    title: "GEO Performance",
    icon: Zap,
    description: "Get actionable recommendations to improve your Generative Engine Optimization score.",
  }
]

export function ProductShowcase() {
  const [activeTab, setActiveTab] = useState(features[0].id)

  const renderMockup = () => {
    switch(activeTab) {
      case "visibility":
        return <VisibilityDashboardSvg />
      case "monitoring":
        return <MonitoringDashboardSvg />
      case "citation":
        return <CitationDashboardSvg />
      case "competitive":
        return <CompetitiveDashboardSvg />
      case "geo":
        return <VisibilityDashboardSvg />
      default:
        return null
    }
  }

  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 radial-glow opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold mb-6 tracking-tight text-primary-text">Complete AI Visibility Platform</h2>
          <p className="text-secondary-text text-lg max-w-2xl mx-auto">
            Everything you need to execute a flawless ChatGPT SEO and AI Search Optimization strategy.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1 w-full flex flex-col gap-3">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveTab(feature.id)}
                className={`w-full text-left p-6 rounded-2xl transition-all duration-300 border ${
                  activeTab === feature.id 
                    ? "bg-white border-border shadow-card ring-1 ring-black/5" 
                    : "bg-transparent border-transparent hover:bg-white/50"
                }`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className={`p-2.5 rounded-xl transition-colors ${activeTab === feature.id ? "bg-accent/10 text-accent" : "bg-slate-100 text-secondary-text border border-border/50"}`}>
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-primary-text">{feature.title}</h3>
                </div>
                <p className={`text-sm pl-14 leading-relaxed transition-colors ${activeTab === feature.id ? "text-secondary-text" : "text-secondary-text/60"}`}>
                  {feature.description}
                </p>
              </button>
            ))}
          </div>
          
          <div className="flex-[1.2] w-full">
            <div className="aspect-4/3 rounded-3xl bg-slate-100/50 border border-border shadow-2xl overflow-hidden relative ring-1 ring-black/5 p-4 md:p-8 backdrop-blur-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full flex flex-col"
                >
                  <div className="w-full h-full flex items-center justify-center p-2">
                    {renderMockup()}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
