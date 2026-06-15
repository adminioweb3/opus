"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Sparkles, Target, Zap } from "lucide-react"

export default function PromptOptimizationPage() {
  const [goal, setGoal] = useState("")
  const [generating, setGenerating] = useState(false)
  const [strategy, setStrategy] = useState<any>(null)

  const handleGenerate = () => {
    if (!goal) return
    setGenerating(true)
    setStrategy(null)
    setTimeout(() => {
      setGenerating(false)
      setStrategy({
        content: ["Create a massive comparison hub against the top 3 players", "Publish deep-dive case studies covering enterprise pain points"],
        keywords: ["best enterprise CRM", "scalable CRM alternative", "CRM with lowest total cost of ownership"],
        authority: ["Secure G2 category leader badge", "Get cited in Gartner Magic Quadrant alternative lists"],
        citations: ["Partner with top tech newsletters for feature mentions", "Distribute press releases for major feature updates"]
      })
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI Prompt Optimization</h2>
        <p className="text-muted-foreground">Reverse-engineer how AI models decide rankings to build your strategy.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">I want to rank #1 for...</label>
              <Textarea 
                placeholder="e.g. Best CRM Software for large enterprises"
                className="text-lg py-4 resize-none"
                rows={3}
                value={goal}
                onChange={e => setGoal(e.target.value)}
              />
            </div>
            <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={handleGenerate} disabled={!goal || generating}>
              {generating ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating Strategy...</> : <><Sparkles className="w-5 h-5 mr-2" /> Generate AI SEO Strategy</>}
            </Button>
          </div>
        </CardContent>
      </Card>

      {strategy && (
        <div className="grid md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4">
          <Card className="border-blue-200 bg-blue-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2"><Target className="w-5 h-5 text-blue-600" /> Content Roadmap</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc pl-5 text-sm text-foreground">
                {strategy.content.map((s: string, i: number) => <li key={i}>{s}</li>)}
              </ul>
            </CardContent>
          </Card>
          
          <Card className="border-emerald-200 bg-emerald-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2"><Zap className="w-5 h-5 text-emerald-600" /> Keyword Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc pl-5 text-sm text-foreground">
                {strategy.keywords.map((s: string, i: number) => <li key={i}>{s}</li>)}
              </ul>
            </CardContent>
          </Card>
          
          <Card className="border-amber-200 bg-amber-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-amber-600" /> Authority Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc pl-5 text-sm text-foreground">
                {strategy.authority.map((s: string, i: number) => <li key={i}>{s}</li>)}
              </ul>
            </CardContent>
          </Card>
          
          <Card className="border-violet-200 bg-violet-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2"><Quote className="w-5 h-5 text-violet-600" /> AI Citation Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc pl-5 text-sm text-foreground">
                {strategy.citations.map((s: string, i: number) => <li key={i}>{s}</li>)}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

function ShieldCheck(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-3 5.99-5.11a2 2 0 0 1 2.72-.03C15.82 2.1 17.63 4 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
}

function Quote(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.975c0 2.221-1.353 3.619-2.975 4.385v1.895C13 20 14 21 15 21z"/></svg>
}
