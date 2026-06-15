"use client"

import { motion } from "framer-motion"
import { BarChart3, Globe, LineChart, MessageSquare, Search, ShieldAlert } from "lucide-react"

const features = [
  {
    icon: <Search className="w-6 h-6 text-primary" />,
    title: "AI Search Tracking",
    description: "Monitor how your brand is surfaced in ChatGPT, Gemini, Claude, and Perplexity responses."
  },
  {
    icon: <Globe className="w-6 h-6 text-accent" />,
    title: "Global Share of Voice",
    description: "Measure your brand's presence against competitors across all major LLMs globally."
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-success" />,
    title: "Sentiment Analysis",
    description: "Analyze the tone and context of AI-generated content mentioning your brand."
  },
  {
    icon: <ShieldAlert className="w-6 h-6 text-warning" />,
    title: "Real-time Alerts",
    description: "Get instantly notified when AI models generate inaccurate or harmful content about you."
  },
  {
    icon: <LineChart className="w-6 h-6 text-secondary" />,
    title: "Citation Tracking",
    description: "Discover which of your web pages and resources are being cited by AI engines."
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-primary" />,
    title: "Competitor Benchmarking",
    description: "Compare your AI visibility scores directly against your top industry competitors."
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export function FeaturesGrid() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Comprehensive <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">Visibility Intelligence</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Everything you need to understand, protect, and optimize your brand&apos;s presence in the age of AI search.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="glass-card p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-surface border border-white/5 flex items-center justify-center mb-6 shadow-inner">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
