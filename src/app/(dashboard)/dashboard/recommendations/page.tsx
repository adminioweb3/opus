"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { mockRecommendations } from "@/lib/mock-data/actions"
import { motion } from "framer-motion"
import { AlertTriangle, Search, Wand2, TrendingUp, ArrowRight, Plug, Loader2 } from "lucide-react"
import { deployRecommendation } from "@/lib/api/deploymentsApi"
import { useOrganizationStore } from "@/lib/stores/organizationStore"
import { toast } from "sonner"

export default function RecommendationsPage() {
  const { organizationId } = useOrganizationStore()
  const [deployingId, setDeployingId] = useState<string | null>(null)
  const [deployedRecs, setDeployedRecs] = useState<Record<string, string>>({})

  const handleDeploy = async (recId: string) => {
    setDeployingId(recId)
    try {
      const response = await deployRecommendation({
        organizationId,
        recommendationId: recId,
        // Using a dummy integration ID for now
        integrationId: "12345678-1234-1234-1234-123456789012"
      })
      
      if (response.deployedUrl) {
        toast.success("Successfully deployed to WordPress!")
        setDeployedRecs(prev => ({ ...prev, [recId]: response.deployedUrl }))
      } else {
        toast.success("Deployed, but no URL was returned.")
        setDeployedRecs(prev => ({ ...prev, [recId]: "true" }))
      }
    } catch (error) {
      console.error("Failed to deploy", error)
      toast.error("Failed to deploy recommendation")
    } finally {
      setDeployingId(null)
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Recommendation Engine</h2>
        <p className="text-muted-foreground mt-1">
          Root cause analysis mapped to precise, actionable solutions.
        </p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-6">
        {mockRecommendations.map((rec) => {
          const isDeploying = deployingId === rec.id;
          const deployedUrl = deployedRecs[rec.id];

          return (
            <motion.div variants={item} key={rec.id}>
              <Card className="overflow-hidden border-muted-foreground/20">
                <div className="grid md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
                  
                  {/* 1. Issue */}
                  <div className="p-6 bg-destructive/5 relative group">
                    <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] font-mono text-muted-foreground bg-background px-2 py-1 rounded">{rec.id}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      <h3 className="font-semibold text-sm">Issue Detected</h3>
                    </div>
                    <p className="text-sm font-medium leading-relaxed">{rec.issue}</p>
                  </div>

                  {/* 2. Root Cause */}
                  <div className="p-6 bg-muted/30">
                    <div className="flex items-center gap-2 mb-3">
                      <Search className="h-5 w-5 text-amber-500" />
                      <h3 className="font-semibold text-sm">Root Cause Analysis</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{rec.rootCause}</p>
                  </div>

                  {/* 3. Suggested Fix */}
                  <div className="p-6 bg-primary/5">
                    <div className="flex items-center gap-2 mb-3">
                      <Wand2 className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-sm">Suggested AI Fix</h3>
                    </div>
                    <p className="text-sm font-medium leading-relaxed">{rec.suggestedFix}</p>
                  </div>

                  {/* 4. Expected Gain & Action */}
                  <div className="p-6 bg-emerald-500/5 relative flex flex-col justify-between">
                    <div>
                      <div className="hidden md:flex absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 rounded-full bg-background border border-border items-center justify-center z-10">
                        <ArrowRight className="w-3 h-3 text-muted-foreground" />
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="h-5 w-5 text-emerald-500" />
                        <h3 className="font-semibold text-sm">Expected Gain</h3>
                      </div>
                      <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 leading-relaxed mb-4">{rec.expectedGain}</p>
                    </div>

                    {deployedUrl ? (
                      <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-sm">
                        <span className="text-emerald-600 font-bold mb-1 block">✓ Deployed</span>
                        {deployedUrl !== "true" && (
                          <a href={deployedUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline break-all">
                            View Draft
                          </a>
                        )}
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleDeploy(rec.id)}
                        disabled={isDeploying}
                        className="mt-4 w-full h-10 rounded-md bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isDeploying ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plug className="w-4 h-4" />}
                        {isDeploying ? "Deploying..." : "Deploy to WordPress"}
                      </button>
                    )}
                  </div>

                </div>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
