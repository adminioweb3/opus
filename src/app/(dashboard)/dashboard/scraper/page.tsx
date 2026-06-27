"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Play, Download, Globe, FileText, Loader2, Trash2,
  ChevronRight, ChevronDown, ExternalLink, Link2, Hash,
  FolderOpen, Folder, File, X, Search, RefreshCw, Clock, CheckCircle2, XCircle
} from "lucide-react"
import apiClient from "@/lib/apiClient"
import { useOrganizationStore } from "@/lib/stores/organizationStore"

// ─── Types ────────────────────────────────────────────────────────────────────

interface ScrapingJob {
  id: string
  url: string
  status: "Pending" | "Processing" | "Completed" | "Failed"
  scrapeType: "Single" | "Website"
  totalPages: number
  processedPages: number
  maxPages: number
  createdAt: string
  completedAt?: string
  estimatedSizeKb: number
  displayName: string
}

interface Heading { level: number; text: string }

interface ScrapedPage {
  id: string
  jobId: string
  url: string
  title: string
  description: string
  content: string
  markdownContent: string
  wordCount: number
  scrapedAt: string
  headings: Heading[]
  internalLinks: string[]
  externalLinks: string[]
  images: { src: string; alt: string }[]
  sizeBytes: number
  fileName: string
  urlPath: string
  subFolder: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const formatDate = (iso: string) => {
  if (!iso) return "—"
  const d = new Date(iso)
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
}

const timeAgo = (iso: string) => {
  if (!iso) return "—"
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

const statusColor = (status: string) => {
  switch (status) {
    case "Completed": return "text-emerald-500"
    case "Processing": return "text-blue-500"
    case "Failed": return "text-red-500"
    default: return "text-muted-foreground"
  }
}

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "Completed": return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
    case "Processing": return <Loader2 className="w-3.5 h-3.5 text-blue-500 animate-spin" />
    case "Failed": return <XCircle className="w-3.5 h-3.5 text-red-500" />
    default: return <Clock className="w-3.5 h-3.5 text-muted-foreground" />
  }
}

// ─── Page File Row ────────────────────────────────────────────────────────────

function PageFileRow({
  page,
  indent = 0,
  onPreview,
  onDelete,
  onDownload,
}: {
  page: ScrapedPage
  indent?: number
  onPreview: (p: ScrapedPage) => void
  onDelete: (id: string) => void
  onDownload: (p: ScrapedPage) => void
}) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted/40 cursor-pointer border-b border-border/20 last:border-0 transition-colors group"
      style={{ paddingLeft: `${16 + indent * 20}px` }}
      onClick={() => onPreview(page)}
    >
      <div className="w-5 h-5 bg-emerald-500/15 rounded flex items-center justify-center shrink-0">
        <File className="w-3 h-3 text-emerald-500" />
      </div>
      <span className="flex-1 text-sm text-foreground/90 truncate" title={page.fileName}>
        {page.fileName}
      </span>
      <span className="w-20 text-right text-xs text-muted-foreground hidden md:block">{timeAgo(page.scrapedAt)}</span>
      <span className="w-24 text-right text-xs text-muted-foreground hidden md:block">{formatDate(page.scrapedAt)}</span>
      <span className="w-20 text-right text-xs text-muted-foreground hidden md:block">{page.wordCount.toLocaleString()}</span>
      <span className="w-20 text-right text-xs text-muted-foreground hidden md:block">{formatSize(page.sizeBytes)}</span>
      <div
        className="w-16 flex items-center justify-end gap-1 shrink-0"
        onClick={e => e.stopPropagation()}
      >
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
          title="Download .md" onClick={() => onDownload(page)}>
          <Download className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="sm"
          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
          title="Delete" onClick={() => onDelete(page.id)}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
}

// ─── Subfolder Row ────────────────────────────────────────────────────────────

function SubFolderRow({
  folderName,
  pages,
  onPreview,
  onDelete,
  onDownload,
}: {
  folderName: string
  pages: ScrapedPage[]
  onPreview: (p: ScrapedPage) => void
  onDelete: (id: string) => void
  onDownload: (p: ScrapedPage) => void
}) {
  const [open, setOpen] = useState(false)
  const totalSize = pages.reduce((sum, p) => sum + p.sizeBytes, 0)

  return (
    <>
      {/* Subfolder header */}
      <div
        className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted/30 cursor-pointer border-b border-border/20 transition-colors"
        style={{ paddingLeft: "36px" }}
        onClick={() => setOpen(v => !v)}
      >
        <div className="shrink-0">
          {open ? <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />}
        </div>
        <div className="w-5 h-5 bg-amber-500/15 rounded flex items-center justify-center shrink-0">
          {open ? <FolderOpen className="w-3 h-3 text-amber-500" /> : <Folder className="w-3 h-3 text-amber-500" />}
        </div>
        <span className="flex-1 text-sm text-foreground/80 font-medium">{folderName}</span>
        <span className="w-20 text-right text-xs text-muted-foreground hidden md:block">{timeAgo(pages[0]?.scrapedAt)}</span>
        <span className="w-24 text-right text-xs text-muted-foreground hidden md:block">{formatDate(pages[0]?.scrapedAt)}</span>
        <Badge variant="secondary" className="w-20 justify-center text-xs font-normal hidden md:flex">{pages.length} files</Badge>
        <span className="w-20 text-right text-xs text-muted-foreground hidden md:block">{formatSize(totalSize)}</span>
        <div className="w-16" />
      </div>
      {/* Sub pages */}
      {open && pages.map(p => (
        <PageFileRow key={p.id} page={p} indent={2} onPreview={onPreview} onDelete={onDelete} onDownload={onDownload} />
      ))}
    </>
  )
}

// ─── SubFolder Page List (groups pages by URL subfolder) ─────────────────────

function SubFolderPageList({
  pages,
  onPreview,
  onDelete,
  onDownload,
}: {
  pages: ScrapedPage[]
  onPreview: (p: ScrapedPage) => void
  onDelete: (id: string) => void
  onDownload: (p: ScrapedPage) => void
}) {
  // Group: root-level pages (no subFolder) + subfolders
  const subFolderMap = new Map<string, ScrapedPage[]>()
  const rootPages: ScrapedPage[] = []

  for (const page of pages) {
    const folder = page.subFolder || ""
    if (!folder) {
      rootPages.push(page)
    } else {
      if (!subFolderMap.has(folder)) subFolderMap.set(folder, [])
      subFolderMap.get(folder)!.push(page)
    }
  }

  return (
    <>
      {/* Root-level pages first */}
      {rootPages.map(p => (
        <PageFileRow key={p.id} page={p} indent={1} onPreview={onPreview} onDelete={onDelete} onDownload={onDownload} />
      ))}
      {/* Subfolder sections */}
      {Array.from(subFolderMap.entries()).sort(([a], [b]) => a.localeCompare(b)).map(([folder, folderPages]) => (
        <SubFolderRow
          key={folder}
          folderName={folder}
          pages={folderPages}
          onPreview={onPreview}
          onDelete={onDelete}
          onDownload={onDownload}
        />
      ))}
    </>
  )
}

// ─── Markdown Preview Modal ───────────────────────────────────────────────────

function MarkdownPreviewModal({ page, onClose }: { page: ScrapedPage; onClose: () => void }) {
  const downloadPage = () => {
    const blob = new Blob([page.markdownContent || page.content || ""], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = page.fileName
    a.click()
    URL.revokeObjectURL(url)
  }

  const renderMarkdown = (md: string) => {
    const lines = md.split("\n")
    const elements: React.ReactNode[] = []
    let i = 0
    while (i < lines.length) {
      const line = lines[i]

      if (line.startsWith("# ")) {
        elements.push(<h1 key={i} className="text-xl font-bold mt-5 mb-2 text-foreground border-b border-border pb-2">{line.slice(2)}</h1>)
      } else if (line.startsWith("## ")) {
        elements.push(<h2 key={i} className="text-lg font-semibold mt-4 mb-1.5 text-foreground">{line.slice(3)}</h2>)
      } else if (line.startsWith("### ")) {
        elements.push(<h3 key={i} className="text-base font-semibold mt-3 mb-1 text-foreground">{line.slice(4)}</h3>)
      } else if (line.startsWith("#### ")) {
        elements.push(<h4 key={i} className="text-sm font-semibold mt-2 mb-1 text-foreground">{line.slice(5)}</h4>)
      } else if (line.startsWith("##### ")) {
        elements.push(<h5 key={i} className="text-sm font-medium mt-2 mb-0.5 text-foreground uppercase tracking-wide">{line.slice(6)}</h5>)
      } else if (line.startsWith("###### ")) {
        elements.push(<h6 key={i} className="text-xs font-semibold mt-2 mb-0.5 text-muted-foreground uppercase tracking-wider">{line.slice(7)}</h6>)
      } else if (line.startsWith("---")) {
        elements.push(<hr key={i} className="my-4 border-border" />)
      } else if (line.startsWith("> ")) {
        elements.push(<blockquote key={i} className="border-l-2 border-primary pl-3 text-muted-foreground italic my-2 text-sm">{line.slice(2)}</blockquote>)
      } else if (line.startsWith("- ") || line.startsWith("* ")) {
        // Collect consecutive list items
        const items: string[] = []
        while (i < lines.length && (lines[i].startsWith("- ") || lines[i].startsWith("* "))) {
          items.push(lines[i].slice(2))
          i++
        }
        elements.push(
          <ul key={`ul-${i}`} className="my-2 space-y-1 ml-1">
            {items.map((item, j) => (
              <li key={j} className="flex items-start gap-2 text-sm text-foreground/80">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(item) }} />
              </li>
            ))}
          </ul>
        )
        continue
      } else if (/^\d+\. /.test(line)) {
        // Collect ordered list items
        const items: string[] = []
        let idx = 1
        while (i < lines.length && /^\d+\. /.test(lines[i])) {
          items.push(lines[i].replace(/^\d+\. /, ""))
          i++
        }
        elements.push(
          <ol key={`ol-${i}`} className="my-2 space-y-1 ml-1 list-decimal list-inside">
            {items.map((item, j) => (
              <li key={j} className="text-sm text-foreground/80"
                dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(item) }} />
            ))}
          </ol>
        )
        continue
      } else if (line.startsWith("![")) {
        // Image
        const match = line.match(/!\[([^\]]*)\]\(([^)]+)\)/)
        if (match) {
          elements.push(
            <div key={i} className="my-2">
              <img src={match[2]} alt={match[1]} className="max-w-full rounded border border-border" loading="lazy"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
              {match[1] && <p className="text-xs text-muted-foreground mt-1">{match[1]}</p>}
            </div>
          )
        }
      } else if (line.trim() === "") {
        elements.push(<div key={i} className="h-2" />)
      } else if (line.startsWith("**") && line.endsWith("**")) {
        elements.push(<p key={i} className="text-sm font-semibold text-foreground my-1">{line.slice(2, -2)}</p>)
      } else {
        elements.push(
          <p key={i} className="text-sm text-foreground/80 leading-relaxed my-0.5"
            dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(line) }} />
        )
      }
      i++
    }
    return elements
  }

  const renderInlineMarkdown = (text: string) => {
    return text
      // Bold
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      // Code
      .replace(/`([^`]+)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-xs font-mono">$1</code>')
      // Links [text](url)
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>')
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-background border border-border rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 bg-emerald-500/20 rounded flex items-center justify-center shrink-0">
              <FileText className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <span className="text-sm font-medium text-foreground truncate">{page.fileName}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm" onClick={downloadPage}>
              <Download className="w-3.5 h-3.5 mr-1.5" />Download
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}><X className="w-4 h-4" /></Button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="flex items-center gap-4 px-4 py-2 bg-muted/30 border-b border-border shrink-0 text-xs text-muted-foreground flex-wrap">
          <span className="flex items-center gap-1"><Hash className="w-3 h-3" />{page.wordCount?.toLocaleString()} words</span>
          <span className="flex items-center gap-1"><Link2 className="w-3 h-3" />{page.internalLinks?.length ?? 0} internal links</span>
          <span className="flex items-center gap-1"><ExternalLink className="w-3 h-3" />{page.externalLinks?.length ?? 0} external links</span>
          <span>{formatSize(page.sizeBytes)}</span>
          <a href={page.url} target="_blank" rel="noopener noreferrer"
            className="ml-auto flex items-center gap-1 text-primary hover:underline truncate max-w-xs">
            <Globe className="w-3 h-3 shrink-0" /><span className="truncate">{page.url}</span>
          </a>
        </div>

        {/* Headings outline */}
        {page.headings?.length > 0 && (
          <div className="px-4 pt-3 pb-2 border-b border-border shrink-0">
            <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Page Outline</p>
            <div className="flex flex-wrap gap-2">
              {page.headings.slice(0, 8).map((h, i) => (
                <span key={i} className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full truncate max-w-xs"
                  style={{ marginLeft: `${(h.level - 1) * 4}px` }}>
                  H{h.level}: {h.text}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto p-5 flex-1">
          {renderMarkdown(page.markdownContent || page.content || "No content available.")}
        </div>
      </div>
    </div>
  )
}

// ─── Job Row (one crawl job = one folder entry) ───────────────────────────────

function CrawlJobRow({
  job,
  onDelete,
  onPreviewPage,
}: {
  job: ScrapingJob
  onDelete: (id: string) => void
  onPreviewPage: (page: ScrapedPage) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const [pages, setPages] = useState<ScrapedPage[]>([])
  const [loadingPages, setLoadingPages] = useState(false)
  const [search, setSearch] = useState("")
  const isFolder = job.scrapeType === "Website"

  const loadPages = useCallback(async () => {
    if (pages.length > 0) return
    setLoadingPages(true)
    try {
      const res = await apiClient.get(`/scraper/result/${job.id}`)
      setPages(res.data.pages || [])
    } catch { }
    finally { setLoadingPages(false) }
  }, [job.id, pages.length])

  const handleExpand = () => {
    setExpanded(v => !v)
    if (!expanded && job.status === "Completed") loadPages()
  }

  const handleDeletePage = async (pageId: string) => {
    try {
      await apiClient.delete(`/scraper/pages/${pageId}`)
      setPages(prev => prev.filter(p => p.id !== pageId))
    } catch { }
  }

  const downloadPage = (page: ScrapedPage) => {
    const blob = new Blob([page.markdownContent || page.content || ""], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = page.fileName
    a.click()
    URL.revokeObjectURL(url)
  }

  const downloadAll = () => {
    const baseUrl = apiClient.defaults.baseURL || ""
    window.open(`${baseUrl}/scraper/download/${job.id}`, "_blank")
  }

  const filteredPages = search
    ? pages.filter(p => (p.title || p.url || p.fileName).toLowerCase().includes(search.toLowerCase()))
    : pages

  const pageCount = job.totalPages || job.processedPages

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      {/* Job header row */}
      <div
        className="flex items-center gap-3 px-4 py-3 hover:bg-muted/30 cursor-pointer transition-colors"
        onClick={handleExpand}
      >
        <div className="shrink-0">
          {expanded ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
        </div>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isFolder ? "bg-amber-500/15" : "bg-primary/10"}`}>
          {isFolder ? <FolderOpen className="w-4 h-4 text-amber-500" /> : <FileText className="w-4 h-4 text-primary" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground truncate">{job.displayName}</span>
            <div className="flex items-center gap-1">
              <StatusIcon status={job.status} />
              <span className={`text-xs ${statusColor(job.status)}`}>{job.status}</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground truncate mt-0.5">{job.url}</div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-xs text-muted-foreground shrink-0">
          <span className="w-20 text-right">{timeAgo(job.createdAt)}</span>
          <span className="w-24 text-right">{formatDate(job.createdAt)}</span>
          <span className="w-20 text-right">
            {pageCount > 0
              ? <Badge variant="secondary" className="text-xs font-normal">{pageCount} {pageCount === 1 ? "file" : "files"}</Badge>
              : "—"}
          </span>
          <span className="w-20 text-right">{job.estimatedSizeKb > 0 ? `${job.estimatedSizeKb} KB` : "—"}</span>
        </div>
        <div className="flex items-center gap-1 shrink-0 ml-2" onClick={e => e.stopPropagation()}>
          {job.status === "Completed" && (
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="Download all as Markdown" onClick={downloadAll}>
              <Download className="w-3.5 h-3.5" />
            </Button>
          )}
          <Button variant="ghost" size="sm"
            className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => onDelete(job.id)} title="Delete">
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Processing progress */}
      {job.status === "Processing" && (
        <div className="px-4 pb-3">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span className="flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin" />Running in background...</span>
            <span>{job.processedPages} pages scraped</span>
          </div>
          <Progress value={job.maxPages > 0 ? Math.min((job.processedPages / job.maxPages) * 100, 100) : 0} className="h-1.5" />
          <p className="text-xs text-muted-foreground mt-1">You can navigate away — crawling continues in the background.</p>
        </div>
      )}

      {/* Expanded pages */}
      {expanded && (
        <div className="border-t border-border bg-muted/10">
          {job.status !== "Completed" ? (
            <div className="px-4 py-3 text-sm text-muted-foreground">
              {job.status === "Processing"
                ? <span className="flex items-center gap-2"><Loader2 className="w-3.5 h-3.5 animate-spin" />Still processing...</span>
                : `Status: ${job.status}`}
            </div>
          ) : loadingPages ? (
            <div className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />Loading files...
            </div>
          ) : pages.length === 0 ? (
            <div className="px-4 py-3 text-sm text-muted-foreground">No pages found.</div>
          ) : (
            <>
              {pages.length > 5 && (
                <div className="px-4 pt-3 pb-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <Input className="pl-8 h-8 text-xs" placeholder="Search files..." value={search} onChange={e => setSearch(e.target.value)} />
                  </div>
                </div>
              )}
              {/* Column headers */}
              <div className="flex items-center gap-3 px-4 py-2 text-xs text-muted-foreground border-b border-border/50">
                <span className="w-5" /><span className="flex-1">Name</span>
                <span className="w-20 text-right hidden md:block">Last Updated</span>
                <span className="w-24 text-right hidden md:block">Created</span>
                <span className="w-20 text-right hidden md:block">Words</span>
                <span className="w-20 text-right hidden md:block">Size</span>
                <span className="w-16 text-right">Actions</span>
              </div>

              <SubFolderPageList
                pages={filteredPages}
                onPreview={onPreviewPage}
                onDelete={handleDeletePage}
                onDownload={downloadPage}
              />
            </>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ScraperPage() {
  const { organizationId } = useOrganizationStore()

  const [url, setUrl] = useState("")
  const [scrapeType, setScrapeType] = useState<"Single" | "Website">("Single")
  const [maxPages, setMaxPages] = useState("50")
  const [isScraping, setIsScraping] = useState(false)

  const [jobs, setJobs] = useState<ScrapingJob[]>([])
  const [loadingJobs, setLoadingJobs] = useState(false)

  const [previewPage, setPreviewPage] = useState<ScrapedPage | null>(null)

  // Derived: any job still running?
  const hasActiveJobs = jobs.some(j => j.status === "Pending" || j.status === "Processing")

  // Ref so the polling interval always reads fresh job list without re-creating itself
  const jobsRef = useRef<ScrapingJob[]>([])
  useEffect(() => { jobsRef.current = jobs }, [jobs])

  const loadJobs = useCallback(async () => {
    if (!organizationId) return
    setLoadingJobs(true)
    try {
      const res = await apiClient.get(`/scraper/jobs?organizationId=${organizationId}`)
      setJobs(res.data || [])
    } catch { }
    finally { setLoadingJobs(false) }
  }, [organizationId])

  useEffect(() => { loadJobs() }, [loadJobs])

  // ── Stable polling loop: runs every 3s, reads active jobs from ref ──────────
  // Using a ref means the interval is created ONCE and doesn't recreate on every setJobs.
  useEffect(() => {
    const interval = setInterval(async () => {
      const activeJobs = jobsRef.current.filter(
        j => j.status === "Pending" || j.status === "Processing"
      )
      if (activeJobs.length === 0) return

      let anyStillActive = false
      for (const job of activeJobs) {
        try {
          const res = await apiClient.get(`/scraper/status/${job.id}`)
          const data = res.data
          setJobs(prev => prev.map(j =>
            j.id === job.id
              ? { ...j, status: data.status, processedPages: data.processedPages, totalPages: data.totalPages }
              : j
          ))
          if (data.status === "Pending" || data.status === "Processing") {
            anyStillActive = true
          }
        } catch { }
      }
      // All done — full refresh so file counts + sizes update
      if (!anyStillActive) {
        loadJobs()
      }
    }, 3000)

    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadJobs]) // Only re-creates if loadJobs identity changes (i.e. on org change)

  const handleStart = async () => {
    if (!url || !organizationId) return
    setIsScraping(true)
    try {
      const res = await apiClient.post("/scraper/start", {
        organizationId,
        url: url.startsWith("http") ? url : `https://${url}`,
        scrapeType,
        maxPages: parseInt(maxPages) || 50
      })
      setUrl("")
      // Reload jobs after a short delay so new job appears
      setTimeout(loadJobs, 600)
    } catch (err) {
      console.error(err)
    } finally {
      setIsScraping(false)
    }
  }

  const handleDeleteJob = async (jobId: string) => {
    try {
      await apiClient.delete(`/scraper/jobs/${jobId}`)
      setJobs(prev => prev.filter(j => j.id !== jobId))
    } catch { }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Website Scraper</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Scrape web pages into structured Markdown files. Crawl jobs run in the background.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={loadJobs} disabled={loadingJobs}>
          <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loadingJobs ? "animate-spin" : ""}`} />Refresh
        </Button>
      </div>

      {/* New Scrape Input */}
      <Card className="border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" />Add Source
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Label htmlFor="url" className="text-xs text-muted-foreground mb-1.5 block">Website URL</Label>
              <Input
                id="url"
                placeholder="https://example.com"
                value={url}
                onChange={e => setUrl(e.target.value)}
                disabled={isScraping}
                onKeyDown={e => e.key === "Enter" && handleStart()}
                className="h-9"
              />
            </div>
            <div className="w-full sm:w-44">
              <Label className="text-xs text-muted-foreground mb-1.5 block">Scrape Type</Label>
              <Select value={scrapeType} onValueChange={v => setScrapeType(v as "Single" | "Website")} disabled={isScraping}>
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single">
                    <span className="flex items-center gap-2"><File className="w-3.5 h-3.5" />Single Page</span>
                  </SelectItem>
                  <SelectItem value="Website">
                    <span className="flex items-center gap-2"><FolderOpen className="w-3.5 h-3.5" />Crawl Entire Website</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            {scrapeType === "Website" && (
              <div className="w-full sm:w-32">
                <Label htmlFor="maxPages" className="text-xs text-muted-foreground mb-1.5 block">Max Pages</Label>
                <Input id="maxPages" type="number" value={maxPages} onChange={e => setMaxPages(e.target.value)}
                  disabled={isScraping} className="h-9" />
              </div>
            )}
            <div className="sm:self-end">
              <Button onClick={handleStart} disabled={isScraping || !url} className="h-9 px-5 w-full sm:w-auto">
                {isScraping
                  ? <><Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />Scraping...</>
                  : <><Play className="w-3.5 h-3.5 mr-2" />Start Scrape</>}
              </Button>
            </div>
          </div>
          {hasActiveJobs && (
            <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5">
              <Loader2 className="w-3 h-3 animate-spin text-primary" />
              Jobs are running in the background — you can navigate away and come back.
            </p>
          )}
        </CardContent>
      </Card>
      {/* Global background activity banner */}
      {hasActiveJobs && (
        <div className="flex items-center gap-2.5 px-3 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm text-blue-600 dark:text-blue-400">
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          <span>
            <strong>{jobs.filter(j => j.status === "Pending" || j.status === "Processing").length} job{jobs.filter(j => j.status === "Pending" || j.status === "Processing").length > 1 ? "s" : ""}</strong> running in the background.
            You can navigate freely — the scraper will keep running on the server and update automatically.
          </span>
        </div>
      )}

      {/* File Manager */}
      <div>
        <div className="flex items-center gap-3 px-4 py-2 text-xs font-medium text-muted-foreground border-b border-border mb-2">
          <div className="w-4" /><div className="w-8" />
          <span className="flex-1">Name</span>
          <span className="w-20 text-right hidden md:block">Last Updated</span>
          <span className="w-24 text-right hidden md:block">Created</span>
          <span className="w-20 text-right hidden md:block">Details</span>
          <span className="w-20 text-right hidden md:block">Size</span>
          <span className="w-16 text-right">Actions</span>
        </div>

        {loadingJobs ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Loading scrape jobs...</span>
          </div>
        ) : jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Globe className="w-12 h-12 mb-3 opacity-20" />
            <p className="text-sm font-medium">No scrapes yet</p>
            <p className="text-xs mt-1">Enter a URL above and click "Start Scrape"</p>
          </div>
        ) : (
          <div className="space-y-2">
            {jobs.map(job => (
              <CrawlJobRow
                key={job.id}
                job={job}
                onDelete={handleDeleteJob}
                onPreviewPage={setPreviewPage}
              />
            ))}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {previewPage && (
        <MarkdownPreviewModal page={previewPage} onClose={() => setPreviewPage(null)} />
      )}
    </div>
  )
}
