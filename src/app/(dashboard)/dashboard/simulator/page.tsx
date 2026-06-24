"use client"

import { useState } from "react"
import { useOrganizationStore } from "@/lib/stores/organizationStore"
import { searchSimilar, SearchResult } from "@/lib/api/simulatorApi"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Search, User, Database } from "lucide-react"

export default function SimulatorPage() {
  const { organizationId } = useOrganizationStore()
  const [query, setQuery] = useState("")
  const [simulating, setSimulating] = useState(false)
  const [results, setResults] = useState<SearchResult[] | null>(null)

  const handleSimulate = async () => {
    if (!query) return
    setSimulating(true)
    setResults(null)
    
    try {
      const data = await searchSimilar({
        organizationId,
        queryText: query,
        topK: 3
      })
      setResults(data)
    } catch (error) {
      console.error("Simulation failed", error)
    } finally {
      setSimulating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI Vector Search Simulator</h2>
        <p className="text-muted-foreground">Test how CITATIONLY retrieves your content using Vector Similarity (Cosine Distance) to build LLM context.</p>
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
            <Database className="w-10 h-10 text-primary mx-auto animate-pulse" />
            <p className="text-lg font-medium text-primary">Searching Vector Database across your organization&apos;s embeddings...</p>
          </CardContent>
        </Card>
      )}

      {results && (
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
              <Database className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-2xl rounded-tl-none p-5 relative overflow-hidden space-y-4">
              <p className="font-semibold text-blue-900 dark:text-blue-100">Top 3 Nearest Neighbors (Context Retrieved):</p>
              {results.length === 0 && (
                <p className="text-muted-foreground">No relevant embeddings found. Have you crawled your site yet?</p>
              )}
              {results.map((result, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded uppercase">
                      {result.embedding.referenceType}
                    </span>
                    <span className="text-xs text-muted-foreground">Similarity: {(result.similarityScore * 100).toFixed(1)}%</span>
                  </div>
                  <p className="text-sm text-foreground line-clamp-3">&quot;{result.embedding.textContent}&quot;</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
