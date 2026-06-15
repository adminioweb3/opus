"use client"

import { MOCK_CONTENT_OPPORTUNITIES } from "@/lib/mock-data/journey"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus, Sparkles, TrendingUp } from "lucide-react"

export default function ContentOpportunitiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Content Opportunities</h2>
          <p className="text-muted-foreground">AI-generated content ideas designed to maximize model ingestion.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Sparkles className="w-4 h-4 mr-2" /> Generate More Ideas
        </Button>
      </div>

      <div className="grid gap-4">
        {MOCK_CONTENT_OPPORTUNITIES.map((opp) => (
          <Card key={opp.id} className="hover:border-blue-300 transition-colors">
            <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg">{opp.title}</h3>
                    <Badge variant="outline" className="capitalize bg-muted">{opp.type.replace("_", " ")}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" /> {opp.searchVolume.toLocaleString()} Vol
                    </span>
                    <span className="flex items-center gap-1">
                      Difficulty: <span className={opp.keywordDifficulty > 70 ? "text-red-500 font-bold" : "text-amber-500 font-bold"}>{opp.keywordDifficulty}/100</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 w-full md:w-auto shrink-0">
                <Button variant="outline" className="flex-1 md:flex-none">
                  <Sparkles className="w-4 h-4 mr-2 text-blue-600" /> Draft with AI
                </Button>
                <Button variant="secondary" className="flex-1 md:flex-none">
                  <Plus className="w-4 h-4 mr-2" /> Add Task
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
