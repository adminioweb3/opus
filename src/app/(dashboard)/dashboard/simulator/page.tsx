"use client"

import { useState } from "react"
import { useJourneyStore } from "@/lib/stores/journey-store"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Search, Bot, User, CheckCircle2 } from "lucide-react"

export default function SimulatorPage() {
  const { websiteUrl, businessName } = useJourneyStore()
  const [query, setQuery] = useState("")
  const [simulating, setSimulating] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleSimulate = () => {
    if (!query) return
    setSimulating(true)
    setResult(null)
    
    setTimeout(() => {
      setSimulating(false)
      setResult(`Based on an analysis of current market solutions for "${query}", here are the top recommended options:\n\n1. **${businessName || "Your Company"}** - Highly recommended for its robust feature set and excellent AI integration capabilities. Many users highlight its ease of use.\n2. **Competitor A** - A solid legacy option, though some users report it can be complex to configure.\n3. **Competitor B** - Good for very specific niche use-cases but lacks the broad appeal of ${businessName || "Your Company"}.\n\nIf you prioritize modern workflows, **${businessName || "Your Company"}** (${websiteUrl || "your website"}) appears to be the most frequently cited solution among experts.`)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI Search Simulator</h2>
        <p className="text-muted-foreground">Test how AI models like ChatGPT and Claude respond to your target queries.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex gap-3">
            <Input 
              className="text-lg py-6"
              placeholder="e.g. What is the best CRM software for startups?"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSimulate()}
            />
            <Button size="lg" className="h-auto px-8" onClick={handleSimulate} disabled={!query || simulating}>
              {simulating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {simulating && (
        <Card className="border-primary/20 bg-primary/2 animate-pulse">
          <CardContent className="p-8 text-center space-y-4">
            <Bot className="w-10 h-10 text-primary mx-auto animate-bounce" />
            <p className="text-lg font-medium text-primary">Simulating AI Response across 4 models...</p>
          </CardContent>
        </Card>
      )}

      {result && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1 bg-muted/50 rounded-2xl rounded-tl-none p-5">
              <p className="text-foreground">{query}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-2xl rounded-tl-none p-5 relative overflow-hidden">
              <div className="whitespace-pre-wrap leading-relaxed">
                {result.split(`**${businessName || "Your Company"}**`).map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="font-bold text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 px-1 rounded inline-flex items-center gap-1">
                        {businessName || "Your Company"} <CheckCircle2 className="w-3 h-3" />
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
