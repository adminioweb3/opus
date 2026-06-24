import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bot, BarChart3, Library, Briefcase } from "lucide-react"

import ModelsTab from "./components/ModelsTab"
import BenchmarksTab from "./components/BenchmarksTab"
import ResearchTab from "./components/ResearchTab"
import CaseStudiesTab from "./components/CaseStudiesTab"

export default function AIHubPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Performance Hub</h1>
        <p className="text-muted-foreground mt-1">
          Your centralized command center for AI search visibility, benchmarks, and AEO research.
        </p>
      </div>

      <Tabs defaultValue="models" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="models" className="flex items-center gap-2">
            <Bot className="w-4 h-4" />
            Models Deep-Dive
          </TabsTrigger>
          <TabsTrigger value="benchmarks" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Benchmarks
          </TabsTrigger>
          <TabsTrigger value="research" className="flex items-center gap-2">
            <Library className="w-4 h-4" />
            Research Hub
          </TabsTrigger>
          <TabsTrigger value="casestudies" className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Case Studies
          </TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="mt-0 outline-none">
          <ModelsTab />
        </TabsContent>

        <TabsContent value="benchmarks" className="mt-0 outline-none">
          <div className="pt-4">
            <BenchmarksTab />
          </div>
        </TabsContent>

        <TabsContent value="research" className="mt-0 outline-none">
          <div className="pt-4">
            <ResearchTab />
          </div>
        </TabsContent>

        <TabsContent value="casestudies" className="mt-0 outline-none">
          <div className="pt-4">
            <CaseStudiesTab />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
