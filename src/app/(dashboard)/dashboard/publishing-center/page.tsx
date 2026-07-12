"use client";

import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  getContentDrafts,
  publishContentDraft,
  getPublishingSummary,
  ContentDraft,
  PublishingSummary,
} from "@/lib/api/contentApi";
import { getIntegrations, upsertIntegration, Integration } from "@/lib/api/integrationsApi";

const FILTERS = ["All", "Draft", "Optimized", "Published", "Failed"] as const;
type Filter = (typeof FILTERS)[number];

const STATUS_TONE: Record<string, string> = {
  Draft: "bg-muted text-muted-foreground",
  Optimized: "bg-blue-500/10 text-blue-600",
  Published: "bg-emerald-500/10 text-emerald-600",
  Failed: "bg-red-500/10 text-red-600",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function PublishingCenterPage() {
  const [drafts, setDrafts] = useState<ContentDraft[]>([]);
  const [summary, setSummary] = useState<PublishingSummary | null>(null);
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [publishingId, setPublishingId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [connectOpen, setConnectOpen] = useState(false);
  const [siteUrl, setSiteUrl] = useState("");
  const [credentials, setCredentials] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  const wordpress = integrations.find((i) => i.platformName === "WordPress");

  const loadAll = useCallback(async () => {
    setIsLoading(true);
    try {
      const [draftsRes, summaryRes, integrationsRes] = await Promise.all([
        getContentDrafts(),
        getPublishingSummary(),
        getIntegrations(),
      ]);
      setDrafts(draftsRes);
      setSummary(summaryRes);
      setIntegrations(integrationsRes);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load the Publishing Center");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const handlePublish = useCallback(
    async (draft: ContentDraft) => {
      setPublishingId(draft.id);
      try {
        const result = await publishContentDraft(draft.id);
        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
        await loadAll();
      } catch (err) {
        console.error(err);
        toast.error("Failed to publish this draft");
      } finally {
        setPublishingId(null);
      }
    },
    [loadAll]
  );

  const handleConnect = useCallback(async () => {
    if (!siteUrl.trim() || !credentials.trim()) {
      toast.error("Site URL and application password are required");
      return;
    }
    setIsConnecting(true);
    try {
      await upsertIntegration({
        platformName: "WordPress",
        apiUrl: siteUrl.trim(),
        apiKey: credentials.trim(),
      });
      toast.success("WordPress connected successfully");
      setConnectOpen(false);
      setSiteUrl("");
      setCredentials("");
      await loadAll();
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { Message?: string } } })?.response?.data?.Message ||
        "Failed to connect — check the site URL and application password";
      toast.error(message);
    } finally {
      setIsConnecting(false);
    }
  }, [siteUrl, credentials, loadAll]);

  const filteredDrafts = drafts.filter((d) => {
    const matchesFilter = activeFilter === "All" || d.status === activeFilter;
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-300">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-border/50">
        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Content Studio
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Publishing Center</h1>
          <p className="text-muted-foreground text-[15px] max-w-2xl">
            {summary
              ? `${summary.totalDrafts} drafts total — ${summary.publishedCount} published, ${summary.optimizedCount} ready to publish, ${summary.failedCount} failed.`
              : "Publish your content drafts to your connected WordPress site."}
          </p>
        </div>

        <Dialog open={connectOpen} onOpenChange={setConnectOpen}>
          <DialogTrigger>
            <Button variant={wordpress ? "outline" : "default"}>
              <i className="ti ti-brand-wordpress mr-2" />
              {wordpress ? "Update WordPress connection" : "Connect WordPress"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect WordPress</DialogTitle>
              <DialogDescription>
                Uses the WordPress REST API with an{" "}
                <a
                  href="https://wordpress.org/documentation/article/application-passwords/"
                  target="_blank"
                  rel="noreferrer"
                >
                  application password
                </a>
                . Credentials are validated against your site before saving.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label htmlFor="site-url">Site URL</Label>
                <Input
                  id="site-url"
                  placeholder="https://yoursite.com"
                  value={siteUrl}
                  onChange={(e) => setSiteUrl(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="credentials">Username:Application Password</Label>
                <Input
                  id="credentials"
                  type="password"
                  placeholder="admin:xxxx xxxx xxxx xxxx xxxx xxxx"
                  value={credentials}
                  onChange={(e) => setCredentials(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleConnect} disabled={isConnecting}>
                {isConnecting ? "Validating…" : "Connect"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* KPIs */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total drafts", value: summary?.totalDrafts ?? 0, icon: "ti-files" },
          { label: "Ready to publish", value: summary?.optimizedCount ?? 0, icon: "ti-checklist" },
          { label: "Published", value: summary?.publishedCount ?? 0, icon: "ti-circle-check" },
          { label: "Failed", value: summary?.failedCount ?? 0, icon: "ti-alert-triangle" },
        ].map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] font-semibold text-muted-foreground">{kpi.label}</span>
                <i className={`ti ${kpi.icon} text-muted-foreground`} />
              </div>
              <span className="text-3xl font-bold tracking-tighter">{kpi.value}</span>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* WordPress connection status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">WordPress connection</CardTitle>
          <CardDescription>The only CMS platform wired up for real publishing today.</CardDescription>
        </CardHeader>
        <CardContent>
          {wordpress ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                <i className="ti ti-circle-check text-xl" />
              </div>
              <div className="text-sm">
                <div className="font-semibold text-foreground">Connected</div>
                <div className="text-muted-foreground">{wordpress.apiUrl}</div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                <i className="ti ti-plug-off text-xl" />
              </div>
              <div className="text-sm">
                <div className="font-semibold text-foreground">Not connected</div>
                <div className="text-muted-foreground">Connect WordPress above to enable Publish Now.</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Drafts */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <i className="ti ti-file-text text-muted-foreground" /> Content drafts
          </h2>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search drafts…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-56"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <Button
              key={f}
              variant={activeFilter === f ? "secondary" : "ghost"}
              size="sm"
              className="h-8 px-3 text-xs"
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </Button>
          ))}
        </div>

        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-8 text-center text-muted-foreground text-sm">Loading drafts…</div>
            ) : filteredDrafts.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground text-sm">
                {drafts.length === 0
                  ? "No content drafts yet. Create one in the Content Generator first."
                  : "No drafts match this filter."}
              </div>
            ) : (
              <div className="divide-y divide-border/50">
                {filteredDrafts.map((draft) => (
                  <div key={draft.id} className="flex items-center justify-between gap-4 p-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold truncate">{draft.title || "Untitled draft"}</span>
                        <Badge className={STATUS_TONE[draft.status] ?? "bg-muted text-muted-foreground"}>
                          {draft.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {draft.contentType || "Article"} &middot; {draft.wordCount} words &middot; updated{" "}
                        {formatDate(draft.updatedAt)}
                      </div>
                      {draft.status === "Published" && draft.publishedUrl && (
                        <a
                          href={draft.publishedUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-primary hover:underline mt-1 inline-flex items-center gap-1"
                        >
                          <i className="ti ti-external-link" /> View published post
                        </a>
                      )}
                      {draft.status === "Failed" && draft.publishError && (
                        <div className="text-xs text-red-600 mt-1">{draft.publishError}</div>
                      )}
                    </div>
                    <Button
                      size="sm"
                      disabled={!wordpress || publishingId === draft.id || draft.status === "Published"}
                      onClick={() => handlePublish(draft)}
                      title={!wordpress ? "Connect WordPress first" : undefined}
                    >
                      {publishingId === draft.id
                        ? "Publishing…"
                        : draft.status === "Published"
                        ? "Published"
                        : "Publish Now"}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
