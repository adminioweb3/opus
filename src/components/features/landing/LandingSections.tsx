"use client"

import { motion } from "framer-motion"
import { CheckCircle2, ChevronDown, Bot, Zap, Globe, PieChart, ShieldAlert } from "lucide-react"
import { useRouter } from "next/navigation"

export function TrustedCompanies() {
  return (
    <section className="py-10 border-y border-white/5 bg-surface/30">
      <div className="container mx-auto px-6">
        <p className="text-center text-sm font-medium text-muted-foreground mb-6 uppercase tracking-wider">
          Trusted by forward-thinking enterprise teams
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale">
          {/* Mock Logos */}
          {['ACME Corp', 'Globex', 'Soylent', 'Initech', 'Umbrella'].map((company) => (
            <div key={company} className="text-xl font-bold tracking-tighter text-foreground/80">
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Statistics() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { value: "4.5B+", label: "AI Queries Monitored Monthly" },
            { value: "98%", label: "Accuracy in Sentiment Detection" },
            { value: "12+", label: "Major LLMs & Search Engines Tracked" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2 tracking-tighter">{stat.value}</div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function AiMonitoring() {
  return (
    <section className="py-24 overflow-hidden bg-surface/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Real-time <span className="text-accent">AI Monitoring</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Instantly know when your brand is mentioned across ChatGPT, Claude, Gemini, and Perplexity. Our advanced tracking algorithms capture every citation, sentiment shift, and context placement in real-time.
            </p>
            <ul className="space-y-4 pt-4">
              {['24/7 Continuous Scanning', 'Multi-Language Support', 'Contextual Analysis'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                  <CheckCircle2 className="w-5 h-5 text-primary" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full">
            <div className="glass-card aspect-square md:aspect-4/3 rounded-2xl border border-border/50 p-6 flex flex-col gap-4 relative">
              {/* Mock UI */}
              <div className="h-8 w-1/3 bg-white/5 rounded-md mb-4" />
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border/50">
                  <Bot className="w-8 h-8 text-muted-foreground" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-1/4 bg-white/10 rounded" />
                    <div className="h-3 w-3/4 bg-white/5 rounded" />
                    <div className="h-3 w-1/2 bg-white/5 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function CompetitiveIntelligence() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
          <div className="flex-1 w-full">
            <div className="glass-card aspect-square md:aspect-4/3 rounded-2xl border border-border/50 p-6 relative overflow-hidden">
               {/* Mock UI Chart */}
               <div className="absolute inset-0 bg-linear-to-tr from-secondary/20 to-transparent" />
               <div className="relative z-10 h-full flex items-end gap-4 px-4 pb-4">
                 {[40, 70, 45, 90, 65].map((h, i) => (
                   <div key={i} className="flex-1 bg-secondary/50 rounded-t-md border-t border-secondary" style={{ height: `${h}%` }} />
                 ))}
               </div>
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Competitive <span className="text-secondary">Intelligence</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Don't just track your own brandâ€”see exactly how you stack up against competitors. Identify opportunity gaps where AI models recommend rivals over you.
            </p>
            <ul className="space-y-4 pt-4">
              {['Head-to-head Comparisons', 'Gap Analysis', 'Market Positioning Overlap'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                  <Zap className="w-5 h-5 text-secondary" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Faq() {
  return (
    <section className="py-24 bg-surface/30">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Everything you need to know about the product and billing.</p>
        </div>
        <div className="space-y-4">
          {[
            { q: "Which AI models do you track?", a: "We currently track ChatGPT (3.5, 4, 4o), Claude (Citationly, Sonnet, Haiku), Gemini (Pro, Ultra), Perplexity, and Grok." },
            { q: "How often is data updated?", a: "Enterprise plans feature real-time streaming updates. Professional plans receive daily aggregated syncs." },
            { q: "Can I track my competitors?", a: "Yes, you can track up to 10 competitors simultaneously depending on your subscription tier." }
          ].map((faq, i) => (
            <div key={i} className="glass-card p-6 rounded-xl border border-border/50">
              <div className="flex justify-between items-center cursor-pointer">
                <h4 className="font-semibold">{faq.q}</h4>
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CtaBanner() {
  const router = useRouter()
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/10" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="glass-card rounded-3xl p-12 text-center border border-primary/20 bg-primary/5">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to dominate AI Search?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join industry leaders who use CITATIONLY to monitor, protect, and optimize their brand presence across the next generation of search.
          </p>
          <button onClick={() => router.push('/register')} className="bg-foreground text-background px-8 py-4 rounded-lg font-semibold text-lg hover:bg-foreground/90 transition-colors">
            Start Your Free Trial
          </button>
        </div>
      </div>
    </section>
  )
}
