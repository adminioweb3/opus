"use client"

import { useEffect, useState } from "react"
import { MessageSquare, RefreshCw, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/lib/toast"
import { getFeedback, submitFeedback, type BetaFeedback } from "@/lib/api/feedbackApi"
import { EmptyState, SectionHead, StatusPill } from "./shared"

const FEEDBACK_TYPES = ["General", "Bug", "Confusing", "MissingFeature", "Billing", "Integration"]

export default function FeedbackSection() {
  const [pagePath, setPagePath] = useState("")
  const [feedbackType, setFeedbackType] = useState("General")
  const [rating, setRating] = useState("")
  const [message, setMessage] = useState("")
  const [contextId, setContextId] = useState("")
  const [recent, setRecent] = useState<BetaFeedback[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const loadRecent = async () => {
    setIsLoading(true)
    try {
      setRecent(await getFeedback(25))
    } catch (err) {
      console.error(err)
      setRecent([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setPagePath(window.location.pathname)
    setContextId(crypto.randomUUID())
    loadRecent()
  }, [])

  const handleSubmit = async () => {
    if (!message.trim()) {
      toast.error("Add feedback before submitting")
      return
    }

    const parsedRating = rating.trim() ? Number(rating) : null
    if (parsedRating !== null && (Number.isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5)) {
      toast.error("Rating must be between 1 and 5")
      return
    }

    setIsSaving(true)
    try {
      await submitFeedback({
        pagePath,
        feedbackType,
        rating: parsedRating,
        message,
        contextId,
      })
      toast.success("Feedback sent")
      setMessage("")
      setRating("")
      setContextId(crypto.randomUUID())
      await loadRecent()
    } catch (err) {
      console.error(err)
      toast.error("Failed to send feedback")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-5">
      <Card>
        <CardContent className="pt-6">
          <SectionHead
            title="Beta feedback"
            sub="Send page-level feedback with a support context ID so the team can triage real friction."
          />
          <div className="grid gap-4 max-w-2xl">
            <div>
              <Label>Page or workflow</Label>
              <Input className="mt-1.5" value={pagePath} onChange={(event) => setPagePath(event.target.value)} placeholder="/dashboard/..." />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Feedback type</Label>
                <select
                  className="mt-1.5 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={feedbackType}
                  onChange={(event) => setFeedbackType(event.target.value)}
                >
                  {FEEDBACK_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Rating</Label>
                <Input className="mt-1.5" inputMode="numeric" placeholder="Optional, 1-5" value={rating} onChange={(event) => setRating(event.target.value)} />
              </div>
            </div>
            <div>
              <Label>What happened?</Label>
              <Textarea className="mt-1.5 min-h-32" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Tell us what was confusing, broken, missing, or surprisingly useful." />
            </div>
            <div className="rounded-lg border border-border/60 bg-muted/20 p-3 text-xs text-muted-foreground">
              Context ID: <span className="font-mono text-foreground">{contextId || "Generating..."}</span>
            </div>
            <Button className="w-fit" onClick={handleSubmit} disabled={isSaving || !message.trim()}>
              {isSaving ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
              Send feedback
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <SectionHead title="Recent feedback" sub="Visible to admins for support triage." />
          {isLoading ? (
            <EmptyState icon={MessageSquare} message="Loading recent feedback..." />
          ) : recent.length === 0 ? (
            <EmptyState icon={MessageSquare} message="No feedback submitted yet." />
          ) : (
            <div className="space-y-2">
              {recent.map((item) => (
                <div key={item.id} className="rounded-lg border border-border/60 p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm font-medium">{item.pagePath || "No page path"}</div>
                    <StatusPill kind={item.status === "Open" ? "warn" : "ok"} text={item.status} />
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {item.feedbackType}{item.rating ? ` · ${item.rating}/5` : ""} · {new Date(item.createdAt).toLocaleString()}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{item.message}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
