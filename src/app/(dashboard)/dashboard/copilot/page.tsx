"use client"

import { Card, CardContent } from "@/components/ui/card"
import { mockOsData } from "@/lib/mock-data/os"
import { motion } from "framer-motion"
import { MessageSquare, Send, Sparkles, Bot } from "lucide-react"

export default function CopilotPage() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)]">
      <div className="mb-4">
        <h2 className="text-3xl font-bold tracking-tight">AI Command Center</h2>
        <p className="text-muted-foreground mt-1">
          Your conversational copilot for the CITATIONLY operating system.
        </p>
      </div>

      <Card className="flex-1 flex flex-col bg-muted/20 border-primary/20 overflow-hidden relative">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
            {mockOsData.copilot.history.map((msg, i) => (
              <motion.div key={i} variants={item} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1 border border-primary/30">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div className={`p-4 rounded-xl max-w-[80%] ${
                  msg.role === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                    : 'bg-card border shadow-sm rounded-tl-sm'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 mt-1">
                    <span className="text-xs font-bold text-muted-foreground">ME</span>
                  </div>
                )}
              </motion.div>
            ))}

            <motion.div variants={item} className="flex gap-4">
               <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1 border border-primary/30">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="p-4 rounded-xl bg-card border shadow-sm rounded-tl-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce delay-75" />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce delay-150" />
                </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="p-4 bg-background border-t">
          <div className="flex flex-wrap gap-2 mb-4">
            {mockOsData.copilot.suggestedPrompts.map((prompt, i) => (
              <button key={i} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors text-xs font-medium text-muted-foreground border">
                <Sparkles className="w-3 h-3" /> {prompt}
              </button>
            ))}
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Ask CITATIONLY anything about your visibility, competitors, or strategy..." 
              className="w-full h-12 pl-4 pr-12 rounded-lg border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
              readOnly
            />
            <button className="absolute right-2 top-2 w-8 h-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}
