"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Sparkles, Copy, Check, ArrowRight, Wand2 } from "lucide-react"
import { MOCK_OPTIMIZER_RESULT } from "@/lib/mock-data/optimizer"

export default function OptimizerPage() {
  const [inputType, setInputType] = useState<"url" | "text">("url")
  const [inputValue, setInputValue] = useState("")
  const [optimizing, setOptimizing] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleOptimize = () => {
    if (!inputValue) return
    setOptimizing(true)
    setResult(null)
    
    // Simulate AI optimization delay
    setTimeout(() => {
      setOptimizing(false)
      setResult(MOCK_OPTIMIZER_RESULT)
    }, 3000)
  }

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div>
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Wand2 className="w-8 h-8 text-primary" />
          AEO Content Optimizer
        </h2>
        <p className="text-muted-foreground mt-1">
          Restructure your content to maximize visibility in AI answer engines like Perplexity and ChatGPT.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 flex-1 min-h-[500px]">
        {/* Left Column: Input */}
        <Card className="flex flex-col h-full border-primary/10 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Original Content</CardTitle>
            <CardDescription>Enter a URL or paste raw text to optimize.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col flex-1 gap-4">
            <Tabs value={inputType} onValueChange={(v) => setInputType(v as "url" | "text")} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="url">URL to Scrape</TabsTrigger>
                <TabsTrigger value="text">Paste Text</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex-1 flex flex-col gap-4">
              {inputType === "url" ? (
                <Input
                  placeholder="https://yourwebsite.com/blog-post"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="mt-2 text-md p-6"
                />
              ) : (
                <Textarea
                  placeholder="Paste your article or content here..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 mt-2 resize-none text-base p-4 min-h-[250px]"
                />
              )}
            </div>

            <Button 
              size="lg" 
              className="w-full mt-auto" 
              onClick={handleOptimize}
              disabled={!inputValue || optimizing}
            >
              {optimizing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing & Optimizing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Optimize for AI Search
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Right Column: Output */}
        <Card className="flex flex-col h-full bg-muted/30 border-muted relative overflow-hidden">
          {optimizing && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-primary animate-pulse" />
              </div>
              <p className="text-lg font-medium">Extracting Entities...</p>
              <p className="text-sm text-muted-foreground mt-2">Formatting for Generative Engine Optimization</p>
              
              <div className="w-64 h-2 bg-muted rounded-full mt-6 overflow-hidden">
                <div className="h-full bg-primary rounded-full w-2/3 animate-[progress_3s_ease-in-out_infinite]" />
              </div>
            </div>
          )}

          <CardHeader className="pb-4 flex flex-row items-center justify-between border-b bg-background/50 backdrop-blur">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                Optimized Result
              </CardTitle>
              <CardDescription>AEO-friendly structure and schema.</CardDescription>
            </div>
            {result && (
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                {copied ? "Copied!" : "Copy Result"}
              </Button>
            )}
          </CardHeader>
          
          <CardContent className="flex-1 overflow-auto p-0">
            {result ? (
              <div className="p-6 prose prose-sm dark:prose-invert max-w-none">
                {/* Simple Markdown rendering simulation */}
                <div 
                  className="space-y-4"
                  dangerouslySetInnerHTML={{ 
                    __html: result
                      .replace(/### (.*)/g, '<h3 class="text-lg font-bold mt-4 mb-2 text-primary">$1</h3>')
                      .replace(/## (.*)/g, '<h2 class="text-xl font-bold mt-6 mb-3 border-b pb-2">$1</h2>')
                      .replace(/# (.*)/g, '<h1 class="text-2xl font-black mb-4 text-foreground">$1</h1>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/- \*\*(.*?)\*\* (.*)/g, '<li class="ml-4 mb-1"><strong>$1</strong> $2</li>')
                      .replace(/---/g, '<hr class="my-6 border-muted" />')
                      .replace(/```json([\s\S]*?)```/g, '<pre class="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-xs my-4"><code>$1</code></pre>')
                      // basic table rendering hack for the mock data
                      .replace(/\|(.*)\|/g, (match) => {
                        if (match.includes('---')) return '';
                        return `<div class="border-b border-border py-2 flex gap-4 text-sm">${match.split('|').filter(Boolean).map(cell => `<div class="flex-1 px-2">${cell.trim()}</div>`).join('')}</div>`;
                      })
                  }} 
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8 text-muted-foreground">
                <ArrowRight className="w-12 h-12 text-muted mb-4 hidden lg:block" />
                <p className="max-w-[250px]">
                  Enter your content on the left to see the AEO-optimized version here.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
