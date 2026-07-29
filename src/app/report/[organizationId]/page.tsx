"use client"

import { Suspense, useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { getFullReport, FullReportData } from "@/lib/api/reportApi"
import { Loader2 } from "lucide-react"

import ReportCover from "@/components/report/ReportCover"
import ExecutiveKPIs from "@/components/report/ExecutiveKPIs"
import ExecutiveSummarySection from "@/components/report/ExecutiveSummarySection"
import WebsiteIntelligence from "@/components/report/WebsiteIntelligence"
import CompetitorAnalysis from "@/components/report/CompetitorAnalysis"
import AIVisibilityOverview from "@/components/report/AIVisibilityOverview"
import PromptAnalysis from "@/components/report/PromptAnalysis"
import PlatformAnalysis from "@/components/report/PlatformAnalysis"
import CitationAnalysis from "@/components/report/CitationAnalysis"
import PersonaAnalysis from "@/components/report/PersonaAnalysis"
import RegionAnalysis from "@/components/report/RegionAnalysis"
import RecommendationsKanban from "@/components/report/RecommendationsKanban"
import FinalScorecard from "@/components/report/FinalScorecard"
import ReportFooter from "@/components/report/ReportFooter"
import SubscribeModal from "@/components/report/SubscribeModal"

export default function ReportPage() {
  return (
    <Suspense>
      <ReportPageContent />
    </Suspense>
  )
}

function ReportPageContent() {
  const params = useParams()
  const organizationId = params.organizationId as string

  // Only the post-onboarding hop (analysis/page.tsx) appends this — the Command Center
  // "Reports" button links here with no query string, so existing dashboard users never
  // see the paywall on a report they already have full access to.
  const searchParams = useSearchParams()
  const showPaywall = searchParams.get("source") === "onboarding"

  const [reportData, setReportData] = useState<FullReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!organizationId) return

    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await getFullReport(organizationId)
        setReportData(data)
      } catch (err) {
        console.error("Failed to load report", err)
        setError("Failed to load the executive report. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [organizationId])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <h2 className="text-xl font-semibold text-slate-700">Generating Executive Dashboard...</h2>
        <p className="text-sm text-slate-500 mt-2">Aggregating AI visibility metrics</p>
      </div>
    )
  }

  if (error || !reportData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-sm border border-red-100">
          <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="font-bold text-xl">!</span>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Error Loading Report</h2>
          <p className="text-slate-500">{error || "Data not found"}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="report-doc min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 pb-20">
      <button
        onClick={() => window.print()}
        className="print:hidden fixed top-6 right-6 z-50 text-sm font-medium text-slate-600 hover:text-blue-600 bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm rounded-full px-4 py-2 transition-colors"
      >
        Export PDF
      </button>

      <main className="max-w-7xl mx-auto px-6 pt-12 space-y-16 relative">
        <ReportCover data={reportData} />
        <ExecutiveKPIs data={reportData} />
        <ExecutiveSummarySection data={reportData} />
        
        <div className="relative">
          {showPaywall && <SubscribeModal organizationId={organizationId} />}
          <div className={showPaywall ? "space-y-16 opacity-20 select-none pointer-events-none blur-[3px]" : "space-y-16"}>
            <WebsiteIntelligence data={reportData} />
            <CompetitorAnalysis data={reportData} />
            <AIVisibilityOverview data={reportData} />
            <PromptAnalysis data={reportData} />
            <PlatformAnalysis data={reportData} />
            <CitationAnalysis data={reportData} />
            <PersonaAnalysis data={reportData} />
            <RegionAnalysis data={reportData} />
            <RecommendationsKanban data={reportData} />
            <FinalScorecard data={reportData} />
          </div>
        </div>
      </main>

      <ReportFooter />
    </div>
  )
}
