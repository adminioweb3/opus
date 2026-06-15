"use client"

import { Activity, ShieldCheck, TrendingUp, Link as LinkIcon, Database, Eye, CheckCircle2 } from "lucide-react"
import { AiEcosystemIllustration } from "@/components/illustrations/AiEcosystemIllustration"
import { NeuralNetworkBg, AiMeshBg } from "@/components/illustrations/BackgroundAssets"

export function BrandTracking() {
  return (
    <section className="py-24 bg-surface/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Advanced <span className="text-primary">Brand Tracking</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Understand the sentiment, context, and exact phrasing AI models use when discussing your brand. Our NLP engine breaks down millions of AI interactions to provide you with actionable brand health scores.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <ShieldCheck className="w-8 h-8 text-primary" />
                <h4 className="font-semibold">Reputation Shield</h4>
                <p className="text-sm text-muted-foreground">Detect hallucinations or negative biases instantly.</p>
              </div>
              <div className="space-y-2">
                <Activity className="w-8 h-8 text-primary" />
                <h4 className="font-semibold">Health Score</h4>
                <p className="text-sm text-muted-foreground">Aggregate brand health metrics across all AI models.</p>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="glass-card aspect-video rounded-2xl border border-border/50 p-6">
               <AiEcosystemIllustration />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function CitationTracking() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
          <div className="flex-1 w-full">
            <div className="glass-card aspect-4/3 rounded-2xl border border-border/50 p-6 flex flex-col gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50">
                  <div className="w-10 h-10 rounded bg-accent/20 flex items-center justify-center">
                    <LinkIcon className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="h-4 w-3/4 bg-white/10 rounded mb-2" />
                    <div className="h-3 w-1/2 bg-white/5 rounded" />
                  </div>
                  <div className="text-sm font-semibold text-accent">Cited</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              AI <span className="text-accent">Citation Tracking</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When AI models generate answers, they cite sources. OPUS tracks every URL on your domain to show you exactly which pages are driving AI traffic and visibility.
            </p>
            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent" /> Page-level attribution</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent" /> Traffic estimation from AI</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent" /> Link placement analysis</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ShareOfVoice() {
  return (
    <section className="py-24 bg-surface/30">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Global <span className="text-transparent bg-clip-text bg-linear-to-r from-success to-primary">Share of Voice</span>
        </h2>
        <p className="text-lg text-muted-foreground mb-16">
          Stop guessing. Get definitive metrics on how much of the AI conversation your brand owns compared to the rest of the market.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: "Your Brand", value: "45%", color: "bg-primary" },
            { label: "Competitor A", value: "30%", color: "bg-secondary" },
            { label: "Others", value: "25%", color: "bg-muted" },
          ].map((item, i) => (
            <div key={i} className="glass-card p-8 rounded-2xl">
               <div className="text-4xl font-bold mb-2">{item.value}</div>
               <div className="flex items-center justify-center gap-2">
                 <div className={`w-3 h-3 rounded-full ${item.color}`} />
                 <span className="text-muted-foreground font-medium">{item.label}</span>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function PlatformComparison() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why choose OPUS?</h2>
          <p className="text-muted-foreground text-lg">Compare our enterprise platform against standard SEO tools.</p>
        </div>
        <div className="glass-card rounded-2xl overflow-hidden border border-border/50">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50 bg-surface/50">
                <th className="p-6 font-semibold">Feature</th>
                <th className="p-6 font-bold text-primary">OPUS</th>
                <th className="p-6 font-semibold text-muted-foreground">Standard SEO</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: "AI Model Tracking", opus: true, standard: false },
                { feature: "Real-time Sentiment", opus: true, standard: false },
                { feature: "Citation Attribution", opus: true, standard: false },
                { feature: "Traditional SERP Tracking", opus: true, standard: true },
                { feature: "Hallucination Alerts", opus: true, standard: false },
              ].map((row, i) => (
                <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-white/2 transition-colors">
                  <td className="p-6 font-medium">{row.feature}</td>
                  <td className="p-6"><CheckCircle2 className="w-6 h-6 text-primary" /></td>
                  <td className="p-6">{row.standard ? <CheckCircle2 className="w-6 h-6 text-muted-foreground" /> : <span className="text-muted-foreground">-</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export function UseCases() {
  return (
    <section className="py-24 bg-surface/30 relative overflow-hidden">
      <div className="absolute inset-0 text-accent opacity-20 pointer-events-none">
        <AiMeshBg />
      </div>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Built for every team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Database />, title: "Marketing Leaders", desc: "Prove ROI of brand campaigns by tracking shifts in AI sentiment and recommendation frequency." },
            { icon: <Eye />, title: "PR & Comms", desc: "Monitor brand crises in real-time and ensure AI models are utilizing your latest press releases." },
            { icon: <TrendingUp />, title: "SEO Strategists", desc: "Pivot from traditional SEO to AIO (AI Optimization). Track which content gets cited by LLMs." }
          ].map((item, i) => (
            <div key={i} className="glass-card p-8 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

