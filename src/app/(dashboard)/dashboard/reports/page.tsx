"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { usePermission } from "@/components/auth/PermissionGate"
import { formatDate } from "@/lib/utils"
import { Plus, FileText, Copy, Trash2, Calendar, Download, Clock, MoreHorizontal, Eye } from "lucide-react"

interface Report {
  id: string
  name: string
  description: string
  type: "visibility" | "competitive" | "brand" | "executive" | "custom"
  status: "draft" | "published" | "scheduled"
  createdAt: string
  lastUpdated: string
  schedule: string | null
  pages: number
}

const MOCK_REPORTS: Report[] = [
  { id: "rpt_001", name: "Weekly AI Visibility Report", description: "Comprehensive overview of visibility scores, mention trends, and platform performance.", type: "visibility", status: "published", createdAt: "2025-06-01T10:00:00Z", lastUpdated: "2025-06-08T10:00:00Z", schedule: "Every Monday 9:00 AM", pages: 12 },
  { id: "rpt_002", name: "Q2 Competitive Intelligence", description: "Quarterly deep-dive into competitor positioning across AI platforms.", type: "competitive", status: "published", createdAt: "2025-04-01T10:00:00Z", lastUpdated: "2025-06-01T10:00:00Z", schedule: null, pages: 24 },
  { id: "rpt_003", name: "Monthly Brand Health Report", description: "Brand sentiment analysis, mention quality, and hallucination tracking.", type: "brand", status: "scheduled", createdAt: "2025-05-01T10:00:00Z", lastUpdated: "2025-06-01T10:00:00Z", schedule: "1st of every month", pages: 16 },
  { id: "rpt_004", name: "Executive AI Summary", description: "High-level KPIs and strategic insights for leadership.", type: "executive", status: "draft", createdAt: "2025-06-10T10:00:00Z", lastUpdated: "2025-06-10T10:00:00Z", schedule: null, pages: 6 },
  { id: "rpt_005", name: "ChatGPT Performance Deep Dive", description: "Platform-specific analysis of ChatGPT visibility, citations, and response quality.", type: "custom", status: "published", createdAt: "2025-05-15T10:00:00Z", lastUpdated: "2025-06-05T10:00:00Z", schedule: null, pages: 18 },
]

const REPORT_TEMPLATES = [
  { name: "Visibility Overview", description: "KPIs, trend charts, platform breakdown", icon: "📊" },
  { name: "Competitive Analysis", description: "Side-by-side competitor comparison", icon: "🏆" },
  { name: "Brand Health", description: "Sentiment, mentions, hallucinations", icon: "🛡️" },
  { name: "Executive Summary", description: "High-level metrics for leadership", icon: "📋" },
]

const statusColors = {
  draft: "bg-neutral-100 text-neutral-700",
  published: "bg-emerald-100 text-emerald-700",
  scheduled: "bg-blue-100 text-blue-700",
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>(MOCK_REPORTS)
  const [showTemplates, setShowTemplates] = useState(false)
  const canCreate = usePermission("reports.create")
  const canDelete = usePermission("reports.delete")

  const duplicateReport = (report: Report) => {
    const newReport = { ...report, id: `rpt_${Date.now()}`, name: `${report.name} (Copy)`, status: "draft" as const, createdAt: new Date().toISOString(), lastUpdated: new Date().toISOString() }
    setReports([newReport, ...reports])
  }

  const deleteReport = (id: string) => {
    setReports(reports.filter(r => r.id !== id))
  }

  const createFromTemplate = (templateName: string) => {
    const newReport: Report = {
      id: `rpt_${Date.now()}`,
      name: `New ${templateName}`,
      description: `Auto-generated ${templateName.toLowerCase()} report`,
      type: "custom",
      status: "draft",
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      schedule: null,
      pages: 0,
    }
    setReports([newReport, ...reports])
    setShowTemplates(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground">Create, schedule, and manage your AI visibility reports.</p>
        </div>
        {canCreate && (
          <Button onClick={() => setShowTemplates(!showTemplates)}>
            <Plus className="w-4 h-4 mr-2" /> Create Report
          </Button>
        )}
      </div>

      {/* Templates */}
      {showTemplates && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {REPORT_TEMPLATES.map(t => (
            <Card key={t.name} className="cursor-pointer hover:border-primary/50 transition-colors" onClick={() => createFromTemplate(t.name)}>
              <CardContent className="pt-6 text-center">
                <div className="text-4xl mb-3">{t.icon}</div>
                <div className="font-semibold text-sm mb-1">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Reports List */}
      <div className="space-y-3">
        {reports.map(report => (
          <Card key={report.id}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium truncate">{report.name}</span>
                      <Badge className={`${statusColors[report.status]} border-0 text-xs capitalize`}>{report.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{report.description}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-xs text-muted-foreground">{report.pages} pages</span>
                      {report.schedule && (
                        <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {report.schedule}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">Updated {formatDate(report.lastUpdated, "relative")}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm"><Download className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => duplicateReport(report)}><Copy className="w-4 h-4" /></Button>
                  {canDelete && (
                    <Button variant="ghost" size="sm" onClick={() => deleteReport(report.id)}>
                      <Trash2 className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {reports.length === 0 && (
        <div className="text-center py-16">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No reports yet</h3>
          <p className="text-muted-foreground mb-6">Create your first report from a template.</p>
          {canCreate && <Button onClick={() => setShowTemplates(true)}><Plus className="w-4 h-4 mr-2" /> Create Report</Button>}
        </div>
      )}
    </div>
  )
}
