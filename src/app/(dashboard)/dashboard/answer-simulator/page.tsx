"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockMoatData } from "@/lib/mock-data/moat"
import { motion } from "framer-motion"
import { Terminal, Bot, BrainCircuit, Sparkles } from "lucide-react"

export default function AnswerSimulatorPage() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  // A helper function to parse and highlight the mock text
  const renderHighlightedText = (text: string) => {
    // We split by our custom mock syntax:
    // **[CITATIONLY]** -> Brand Mention
    // **[Competitor A]** -> Competitor Mention
    // **[[Citation]]** -> Citation
    
    const parts = text.split(/(\*\*\[\[.*?\]\]\*\*|\*\*\[.*?\]\*\*)/g)

    return parts.map((part, index) => {
      if (part.startsWith('**[[') && part.endsWith(']]**')) {
        const citation = part.slice(4, -4)
        return <span key={index} className="px-1.5 py-0.5 mx-0.5 rounded bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-mono text-xs cursor-pointer hover:underline border border-indigo-500/20">{citation}</span>
      }
      if (part.startsWith('**[') && part.endsWith(']**')) {
        const mention = part.slice(3, -3)
        if (mention === 'CITATIONLY') {
          return <span key={index} className="px-1.5 py-0.5 mx-0.5 rounded bg-primary/15 text-primary font-bold border border-primary/20">{mention}</span>
        } else {
          return <span key={index} className="px-1.5 py-0.5 mx-0.5 rounded bg-destructive/10 text-destructive font-bold border border-destructive/20">{mention}</span>
        }
      }
      return <span key={index}>{part}</span>
    })
  }

  const engines = [
    { id: "chatgpt", name: "ChatGPT", icon: <Bot className="w-4 h-4" /> },
    { id: "claude", name: "Claude", icon: <BrainCircuit className="w-4 h-4" /> },
    { id: "gemini", name: "Gemini", icon: <Sparkles className="w-4 h-4" /> },
    { id: "perplexity", name: "Perplexity", icon: <Terminal className="w-4 h-4" /> },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI Answer Simulator</h2>
        <p className="text-muted-foreground mt-1">
          Test prompts and see exactly how different LLMs construct their answers.
        </p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4">
        <motion.div variants={item}>
          <Card className="bg-muted/30">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Simulated Prompt</span>
                <p className="text-lg font-medium">&quot;{mockMoatData.simulator.prompt}&quot;</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Tabs defaultValue="chatgpt" className="space-y-4">
            <TabsList className="bg-muted/50 p-1 w-full justify-start overflow-x-auto">
              {engines.map(engine => (
                <TabsTrigger key={engine.id} value={engine.id} className="gap-2">
                  {engine.icon} {engine.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {engines.map(engine => (
              <TabsContent key={engine.id} value={engine.id}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {engine.icon} Generated Response
                    </CardTitle>
                    <CardDescription>
                      Highlighting brand mentions, competitors, and citations.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-6 rounded-lg bg-card border shadow-inner leading-relaxed text-foreground/90">
                      {renderHighlightedText(mockMoatData.simulator.responses[engine.id as keyof typeof mockMoatData.simulator.responses])}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-4 text-xs font-medium">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-primary/20 border border-primary/30" /> Your Brand
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-destructive/20 border border-destructive/30" /> Competitor
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-indigo-500/20 border border-indigo-500/30" /> External Citation
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  )
}
