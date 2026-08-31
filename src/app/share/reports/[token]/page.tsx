"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { PageLoader } from "@/components/ui/loader"
import { getSharedReport, type SharedReportResponse } from "@/lib/api/agencyApi"
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
import ReportExportButton from "@/components/report/ReportExportButton"

export default function SharedReportPage() {
  const params = useParams()
  const token = params.token as string
  const [payload, setPayload] = useState<SharedReportResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) return
    getSharedReport(token)
      .then(setPayload)
      .catch((err) => {
        console.error(err)
        setError("This report link is invalid or expired.")
      })
      .finally(() => setLoading(false))
  }, [token])

  if (loading) {
    return (
      <PageLoader className="min-h-screen bg-slate-50" label="Loading shared report..." />
    )
  }

  if (error || !payload?.report) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">Report unavailable</h1>
          <p className="mt-2 text-sm text-slate-500">{error || "Data not found"}</p>
        </div>
      </div>
    )
  }

  const reportData = payload.report
  const whiteLabel = payload.whiteLabel

  return (
    <div className="report-doc min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 pb-20">
      <div className="print:hidden sticky top-0 z-40 border-b border-slate-200 bg-white/90 px-6 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {whiteLabel?.logoUrl ? <img src={whiteLabel.logoUrl} alt="" className="h-8 w-8 rounded object-contain" /> : null}
            <div>
              <p className="text-sm font-semibold" style={{ color: whiteLabel?.primaryColor || undefined }}>
                {whiteLabel?.brandName || "Shared executive report"}
              </p>
              <p className="text-xs text-slate-500">Expires {new Date(payload.expiresAt).toLocaleDateString()}</p>
            </div>
          </div>
          <ReportExportButton className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition-colors hover:text-blue-600 disabled:cursor-wait disabled:opacity-70" />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-12 space-y-16 relative">
        <ReportCover data={reportData} />
        <ExecutiveKPIs data={reportData} />
        <ExecutiveSummarySection data={reportData} />
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
      </main>

      <ReportFooter />
    </div>
  )
}
