"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Database, Files, Cpu, BadgeCheck, Palette, Users, Building2, Package, LifeBuoy,
  Plus, Settings, FolderPlus, Search, RefreshCcw, Folder, FileText, Globe, Network,
  ClipboardList, Cloud, ChevronLeft, ChevronRight, Check, Mic, FlaskConical, Briefcase,
  Target, AlertTriangle, Clock, CircleCheck, Loader2, MoreVertical, X, Zap, Sparkles, Link
} from 'lucide-react';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import { useOrganizationStore } from "@/lib/stores/organizationStore";
import { getKnowledgeBases, createKnowledgeBase, askKnowledgeBase, KnowledgeBaseDto, KnowledgeBaseAnswer } from "@/lib/api/knowledgeVaultApi";
import { getScrapedPage, ScrapedPageDetail, startScraping as startScrapeJob, getScrapeStatus, getScrapeJobs, getScrapeResult } from "@/lib/api/scraperApi";
import { getSourceFolders, createSourceFolder, SourceFolderDto } from "@/lib/api/sourceFolderApi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Dummy Data
const ENGINE_COLORS: Record<string, string> = {ChatGPT:'#10A37F', Claude:'#D97706', Gemini:'#4285F4', Perplexity:'#20808D'};

const KB_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = { Building2, Package, LifeBuoy, Database, Folder, Globe, Users, Briefcase };

const toVaultCard = (kb: KnowledgeBaseDto) => ({
  id: kb.id,
  name: kb.name,
  icon: KB_ICONS[kb.icon] || Building2,
  tint: kb.tint || '#6366F1',
  bg: kb.bg || '#EEEEFE',
  desc: kb.description || 'A new knowledge base — add sources to start grounding answers.',
  indexed: 0, indexing: 0, failed: 0, tokens: '0', fresh: 100, updated: 'just now',
  engines: [] as string[],
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const INITIAL_VAULT_SRC: Record<string, any[]> = {};

const BRAND_KITS = [
  {name:'Acme — Primary', icon: Palette, tint:'#6366F1', bg:'#EEEEFE', voice:'Confident, plain-spoken, no jargon', sw:['#6366F1','#1E293B','#16A34A','#EAF1FE']},
  {name:'Acme Labs (beta)', icon: FlaskConical, tint:'#7C3AED', bg:'#F3EEFF', voice:'Playful, technical, builder-first', sw:['#7C3AED','#0EA5E9','#111827','#FDE68A']}
];

const SEGMENTS = [
  {name:'Mid-market RevOps', icon: Users, tint:'#2563EB', bg:'#EAF1FE', size:'~4,200 buyers', tags:['B2B SaaS','50–500 staff','North America']},
  {name:'Agency owners', icon: Briefcase, tint:'#16A34A', bg:'#ECFDF3', size:'~1,800 buyers', tags:['Web & design','Founder-led','Global']}
];

const ADD_METHODS = [
  {ic: Globe, id:'scrape', t:'Scrape a page', d:'Pull clean content from one or more URLs.', tint:'#6366F1', bg:'#EEEEFE'},
  {ic: Files, id:'upload', t:'Upload files', d:'PDF, DOCX, CSV, TXT or Markdown.', tint:'#2563EB', bg:'#EAF1FE'},
  {ic: Network, id:'crawl', t:'Crawl a website', d:'Index a whole site across many pages.', tint:'#7C3AED', bg:'#F3EEFF'},
  {ic: ClipboardList, id:'paste', t:'Paste text', d:'Drop raw text or notes straight in.', tint:'#16A34A', bg:'#ECFDF3'},
  {ic: Files, id:'notion', t:'Import from Notion', d:'Sync pages from a connected workspace.', tint:'#475569', bg:'#F1F5F9'},
  {ic: Cloud, id:'drive', t:'Google Drive', d:'Bring in docs from a linked account.', tint:'#D97706', bg:'#FEF6E7'}
];

export default function KnowledgeVaultPage() {
  const { organizationId } = useOrganizationStore();
  const [activeTab, setActiveTab] = useState('kb');
  const [kbId, setKbId] = useState<string | null>(null);
  const [detailTab, setDetailTab] = useState('files');

  // Search tab — ask a question grounded in this knowledge base's indexed content
  const [searchQuestion, setSearchQuestion] = useState("");
  const [isAsking, setIsAsking] = useState(false);
  const [askResult, setAskResult] = useState<KnowledgeBaseAnswer | null>(null);

  // Modals state
  const [modalType, setModalType] = useState<string | null>(null);
  const [newKbName, setNewKbName] = useState("");
  const [isCreatingKb, setIsCreatingKb] = useState(false);

  // Source folders for the currently open knowledge base
  const [kbFolders, setKbFolders] = useState<SourceFolderDto[]>([]);
  const [newFolderName, setNewFolderName] = useState("");
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  // Folder picker shown when crawling a website: an existing folder's id, or '__new__'
  const [folderChoice, setFolderChoice] = useState<string>('__new__');
  const [newCrawlFolderName, setNewCrawlFolderName] = useState("");

  // Viewed source content ("click a .md file" modal)
  const [viewingPage, setViewingPage] = useState<ScrapedPageDetail | null>(null);
  const [isLoadingPageView, setIsLoadingPageView] = useState(false);

  // Knowledge bases loaded from the backend
  const [allKbs, setAllKbs] = useState<ReturnType<typeof toVaultCard>[]>([]);

  // Vault data state
  const [vaultSources, setVaultSources] = useState(INITIAL_VAULT_SRC);
  
  // Scraper Modal State
  const [scrapeUrl, setScrapeUrl] = useState("");
  const [scrapeType, setScrapeType] = useState<"Single" | "Website">("Single");
  const [maxPages, setMaxPages] = useState(50);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Active Jobs Polling
  const [activeJobs, setActiveJobs] = useState<{jobId: string, kbId: string}[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});
  // Guards against a completed job's results being merged into vaultSources more than once
  // (e.g. if a poll tick overlaps a state update) — without this, re-merging would duplicate
  // every crawled page in the UI.
  const mergedJobIdsRef = useRef<Set<string>>(new Set());

  const getFolderName = useCallback((folderId?: string) =>
    (folderId && kbFolders.find(f => f.id === folderId)?.name) || 'Untitled folder', [kbFolders]);

  useEffect(() => {
    if (!organizationId) return;

    getKnowledgeBases()
      .then((kbs) => setAllKbs(kbs.map(toVaultCard)))
      .catch((err) => console.error("Failed to fetch knowledge bases:", err));
  }, [organizationId]);

  // Reload this knowledge base's persisted sources every time it's opened (including after
  // a full page refresh, which resets kbId back to null and loses all in-memory state).
  useEffect(() => {
    if (!kbId || !organizationId) return;
    let cancelled = false;

    const loadSources = async () => {
      setSearchQuestion("");
      setAskResult(null);
      try {
        const [folders, jobs] = await Promise.all([
          getSourceFolders(kbId).catch(() => [] as SourceFolderDto[]),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          getScrapeJobs(organizationId, kbId).catch(() => [] as any[]),
        ]);
        if (cancelled) return;
        setKbFolders(folders);
        if (cancelled) return;

        const folderNameById = new Map(folders.map(f => [f.id, f.name]));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const folderNodes: Record<string, any> = {}; // keyed by folderId, or "auto:<name>" for legacy path-based grouping
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const flatEntries: any[] = [];
        const newlyActive: {jobId: string, kbId: string}[] = [];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await Promise.all(jobs.map(async (job: any) => {
          const when = new Date(job.createdAt).toLocaleDateString();
          const folderName: string | undefined = job.folderId ? folderNameById.get(job.folderId) : undefined;
          const displayName = folderName ? `Crawl — ${folderName}` : (job.scrapeType === 'Website' ? `Crawl — ${job.url}` : job.url);

          if (job.status === 'Pending' || job.status === 'Processing') {
            newlyActive.push({ jobId: job.id, kbId });
            flatEntries.push({
              name: displayName, url: job.url, folderId: job.folderId,
              type: job.scrapeType === 'Website' ? 'Crawl' : 'Scrape',
              ic: job.scrapeType === 'Website' ? Network : Globe,
              tc: job.scrapeType === 'Website' ? '#7C3AED' : '#6366F1',
              status: 'indexing', when, jobId: job.id,
              progress: job.totalPages > 0 ? Math.round((job.processedPages / job.totalPages) * 100) : 0,
            });
          } else if (job.status === 'Failed') {
            flatEntries.push({
              name: displayName, url: job.url, folderId: job.folderId,
              type: job.scrapeType === 'Website' ? 'Crawl' : 'Scrape',
              ic: job.scrapeType === 'Website' ? Network : Globe,
              tc: job.scrapeType === 'Website' ? '#7C3AED' : '#6366F1',
              status: 'failed', when, jobId: job.id,
            });
          } else if (job.status === 'Completed') {
            try {
              const resData = await getScrapeResult(job.id);
              mergedJobIdsRef.current.add(job.id);

              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (resData.pages || []).forEach((p: any) => {
                const fileObj = {
                  name: p.fileName, type: 'Scrape', ic: Globe, tc: '#6366F1',
                  status: 'indexed', chunks: Math.ceil((p.sizeBytes || 0) / 500) || 1,
                  when, jobId: job.id, pageId: p.id
                };
                if (job.folderId) {
                  if (!folderNodes[job.folderId]) {
                    folderNodes[job.folderId] = { f: 1, name: folderName || 'Untitled folder', items: 0, children: [], folderId: job.folderId };
                  }
                  folderNodes[job.folderId].children.push(fileObj);
                  folderNodes[job.folderId].items++;
                } else if (p.subFolder) {
                  const key = `auto:${p.subFolder}`;
                  if (!folderNodes[key]) {
                    folderNodes[key] = { f: 1, name: p.subFolder, items: 0, children: [] };
                  }
                  folderNodes[key].children.push(fileObj);
                  folderNodes[key].items++;
                } else {
                  flatEntries.push(fileObj);
                }
              });
            } catch (err) {
              console.error(err);
            }
          }
        }));

        // Keep manually-created empty folders visible even before any crawl targets them
        folders.forEach(f => {
          if (!folderNodes[f.id]) {
            folderNodes[f.id] = { f: 1, name: f.name, items: 0, children: [], folderId: f.id };
          }
        });

        if (cancelled) return;

        setVaultSources(prev => ({ ...prev, [kbId]: [...Object.values(folderNodes), ...flatEntries] }));

        if (newlyActive.length > 0) {
          setActiveJobs(prev => {
            const existingIds = new Set(prev.map(j => j.jobId));
            const toAdd = newlyActive.filter(j => !existingIds.has(j.jobId));
            return toAdd.length > 0 ? [...prev, ...toAdd] : prev;
          });
        }
      } catch (err) {
        console.error("Failed to load knowledge base sources:", err);
      }
    };

    loadSources();
    return () => { cancelled = true; };
  }, [kbId, organizationId]);

  useEffect(() => {
    if (activeJobs.length === 0) return;
    
    const interval = setInterval(async () => {
      let stillActive = [...activeJobs];
      
      for (const job of activeJobs) {
        try {
          const data = await getScrapeStatus(job.jobId);
          {
            if (data.status === 'Completed' || data.status === 'Failed') {
              stillActive = stillActive.filter(j => j.jobId !== job.jobId);

              if (data.status === 'Completed') {
                if (mergedJobIdsRef.current.has(job.jobId)) continue;
                mergedJobIdsRef.current.add(job.jobId);

                // Fetch final results
                {
                  const resData = await getScrapeResult(job.jobId);
                  const newPageIds = new Set<string>((resData.pages || []).map((p: any) => p.id));
                  const jobFolderId: string | undefined = resData.job?.folderId;

                  setVaultSources(prev => {
                    const existing = [...(prev[job.kbId] || [])];
                    const index = existing.findIndex(s => s.jobId === job.jobId);
                    if (index !== -1) {
                        existing.splice(index, 1);
                    }
                    // Defensive: drop any already-present entries pointing at a page we're
                    // about to (re-)add, so an accidental double-merge can't duplicate rows.
                    const rest = existing.filter(s => !(s.pageId && newPageIds.has(s.pageId)));

                    const newFiles = (resData.pages || []).map((p: any) => ({
                      name: p.fileName,
                      type: 'Scrape',
                      ic: Globe,
                      tc: '#6366F1',
                      status: 'indexed',
                      chunks: Math.ceil((p.sizeBytes || 0) / 500) || 1,
                      when: 'just now',
                      jobId: job.jobId,
                      pageId: p.id
                    }));

                    if (jobFolderId) {
                      // Merge into the existing folder node for this folder (if one is already
                      // present from an earlier crawl into the same folder) instead of creating
                      // a second folder with the same name.
                      const folderIdx = rest.findIndex(s => s.f && s.folderId === jobFolderId);
                      if (folderIdx !== -1) {
                        const updated = [...rest];
                        const folderNode = { ...updated[folderIdx] };
                        folderNode.children = [...(folderNode.children || []), ...newFiles];
                        folderNode.items = folderNode.children.length;
                        updated[folderIdx] = folderNode;
                        return { ...prev, [job.kbId]: updated };
                      }
                      const folderNode = { f: 1, name: getFolderName(jobFolderId), items: newFiles.length, children: newFiles, folderId: jobFolderId };
                      return { ...prev, [job.kbId]: [folderNode, ...rest] };
                    }

                    // Legacy/unfoldered crawl: fall back to auto path-based subfolder grouping
                    const folders: Record<string, any> = {};
                    const files: any[] = [];
                    newFiles.forEach((fileObj: any, idx: number) => {
                      const subFolder = (resData.pages || [])[idx]?.subFolder;
                      if (subFolder) {
                        if (!folders[subFolder]) {
                          folders[subFolder] = { f: 1, name: subFolder, items: 0, children: [] };
                        }
                        folders[subFolder].children.push(fileObj);
                        folders[subFolder].items++;
                      } else {
                        files.push(fileObj);
                      }
                    });

                    return { ...prev, [job.kbId]: [...Object.values(folders), ...files, ...rest] };
                  });
                  toast.success(`Scraping completed! Found ${resData.pages?.length || 0} pages.`);
                }
              } else {
                setVaultSources(prev => {
                  const kbSrcs = [...(prev[job.kbId] || [])];
                  const index = kbSrcs.findIndex(s => s.jobId === job.jobId);
                  if (index !== -1) {
                      kbSrcs[index] = { ...kbSrcs[index], status: 'failed' };
                  }
                  return { ...prev, [job.kbId]: kbSrcs };
                });
                toast.error("Scraping job failed.");
              }
            } else {
              setVaultSources(prev => {
                const kbSrcs = [...(prev[job.kbId] || [])];
                const index = kbSrcs.findIndex(s => s.jobId === job.jobId);
                if (index !== -1) {
                  const progress = data.totalPages > 0 ? Math.round((data.processedPages / data.totalPages) * 100) : 0;
                  kbSrcs[index] = { ...kbSrcs[index], progress };
                }
                return { ...prev, [job.kbId]: kbSrcs };
              });
            }
          }
        } catch (err) {
          console.error(err);
        }
      }
      setActiveJobs(stillActive);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [activeJobs, getFolderName]);

  const toggleFolder = (name: string) => {
    setExpandedFolders(prev => ({...prev, [name]: !prev[name]}));
  };

  const startScraping = async () => {
    if (!scrapeUrl || !kbId) return;
    if (!organizationId) {
      toast.error("Still loading your organization — try again in a moment");
      return;
    }
    const isCrawl = scrapeType === 'Website';
    if (isCrawl && folderChoice === '__new__' && !newCrawlFolderName.trim()) {
      toast.error("Please name the folder for this crawl");
      return;
    }

    setIsSubmitting(true);
    try {
      let folderId: string | undefined = isCrawl && folderChoice !== '__new__' ? folderChoice : undefined;
      let folderName: string | undefined = folderId ? kbFolders.find(f => f.id === folderId)?.name : undefined;

      if (isCrawl && folderChoice === '__new__') {
        const folder = await createSourceFolder(kbId, newCrawlFolderName.trim());
        setKbFolders(prev => [folder, ...prev]);
        folderId = folder.id;
        folderName = folder.name;
      }

      const data = await startScrapeJob({
        organizationId,
        knowledgeBaseId: kbId,
        folderId,
        url: scrapeUrl,
        scrapeType,
        maxPages,
      });

      const newItem = {
        name: folderName ? `Crawl — ${folderName}` : (isCrawl ? `Crawl — ${scrapeUrl}` : scrapeUrl),
        url: scrapeUrl,
        folderId,
        type: isCrawl ? 'Crawl' : 'Scrape',
        ic: isCrawl ? Network : Globe,
        tc: isCrawl ? '#7C3AED' : '#6366F1',
        status: 'indexing',
        progress: 0,
        when: 'just now',
        jobId: data.jobId
      };

      setVaultSources(prev => ({
        ...prev,
        [kbId]: [newItem, ...(prev[kbId] || [])]
      }));

      setActiveJobs(prev => [...prev, {jobId: data.jobId, kbId}]);
      setModalType(null);
      setScrapeUrl("");
      setFolderChoice('__new__');
      setNewCrawlFolderName("");
      toast.success(`Started ${isCrawl ? 'crawl' : 'scrape'} job for ${scrapeUrl}`);
    } catch (err) {
      console.error(err);
      toast.error("Error connecting to scraping service");
    } finally {
      setIsSubmitting(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRetrySource = async (source: any) => {
    if (!source.url || !kbId) return;
    if (!organizationId) {
      toast.error("Still loading your organization — try again in a moment");
      return;
    }
    const type: "Single" | "Website" = source.type === 'Crawl' ? 'Website' : 'Single';
    try {
      const data = await startScrapeJob({
        organizationId,
        knowledgeBaseId: kbId,
        folderId: source.folderId,
        url: source.url,
        scrapeType: type,
        maxPages,
      });
      const newItem = { ...source, status: 'indexing', progress: 0, when: 'just now', jobId: data.jobId };

      setVaultSources(prev => {
        const kbSrcs = [...(prev[kbId] || [])];
        const index = kbSrcs.findIndex(s => s.jobId === source.jobId);
        if (index !== -1) {
          kbSrcs[index] = newItem;
        } else {
          kbSrcs.unshift(newItem);
        }
        return { ...prev, [kbId]: kbSrcs };
      });

      setActiveJobs(prev => [...prev, { jobId: data.jobId, kbId }]);
      toast.success(`Retrying ${type === 'Website' ? 'crawl' : 'scrape'} for ${source.url}`);
    } catch (err) {
      console.error(err);
      toast.error("Error connecting to scraping service");
    }
  };

  const handleViewPage = async (pageId: string) => {
    setModalType('view-page');
    setViewingPage(null);
    setIsLoadingPageView(true);
    try {
      const page = await getScrapedPage(pageId);
      setViewingPage(page);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load source content");
      setModalType(null);
    } finally {
      setIsLoadingPageView(false);
    }
  };

  const handleAskQuestion = async () => {
    if (!searchQuestion.trim() || !kbId) return;
    setIsAsking(true);
    setAskResult(null);
    try {
      const result = await askKnowledgeBase(kbId, searchQuestion.trim());
      setAskResult(result);
    } catch (err) {
      console.error(err);
      toast.error("Failed to get an answer — please try again");
    } finally {
      setIsAsking(false);
    }
  };

  const handleCreateKb = async () => {
    if (!newKbName.trim()) return;
    setIsCreatingKb(true);
    try {
      const kb = await createKnowledgeBase({ name: newKbName.trim() });
      const card = toVaultCard(kb);
      setAllKbs(prev => [...prev, card]);
      setVaultSources(prev => ({ ...prev, [card.id]: [] }));
      setModalType(null);
      setNewKbName("");
      toast.success('Knowledge base created');
    } catch (err) {
      console.error(err);
      toast.error("Failed to create knowledge base");
    } finally {
      setIsCreatingKb(false);
    }
  };

  const handleAddSourceClick = (methodId: string) => {
    if (methodId === 'scrape' || methodId === 'crawl') {
      setScrapeType(methodId === 'crawl' ? 'Website' : 'Single');
      if (methodId === 'crawl') {
        setFolderChoice('__new__');
        setNewCrawlFolderName("");
      }
      setModalType('input-scrape');
    } else {
      setModalType(null);
      toast.success(`Not implemented yet. Coming soon!`);
    }
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim() || !kbId) return;
    setIsCreatingFolder(true);
    try {
      const folder = await createSourceFolder(kbId, newFolderName.trim());
      setKbFolders(prev => [folder, ...prev]);
      setVaultSources(prev => {
        const kbSrcs = [...(prev[kbId] || [])];
        kbSrcs.unshift({ f: 1, name: folder.name, items: 0, children: [], folderId: folder.id });
        return { ...prev, [kbId]: kbSrcs };
      });
      setModalType(null);
      setNewFolderName("");
      toast.success('Folder created');
    } catch (err) {
      console.error(err);
      toast.error("Failed to create folder");
    } finally {
      setIsCreatingFolder(false);
    }
  };

  // Stats
  let totalSrc=0, totalIdx=0, indexing=0;
  allKbs.forEach(k => { totalSrc += k.indexed+k.indexing+k.failed; totalIdx+=k.indexed; indexing+=k.indexing; });
  const avgFresh = allKbs.length ? Math.round(allKbs.reduce((a,k)=>a+k.fresh,0)/allKbs.length) : 0;

  const RingSVG = ({ pct, color }: { pct: number, color: string }) => {
    const r=18, c=2*Math.PI*r, off=c*(1-pct/100);
    return (
      <div className="relative w-12 h-12 flex items-center justify-center">
        <svg width="48" height="48" viewBox="0 0 48 48" className="-rotate-90">
          <circle cx="24" cy="24" r={r} fill="none" stroke="#e2e8f0" strokeWidth="4"/>
          <circle cx="24" cy="24" r={r} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeDasharray={c.toFixed(1)} strokeDashoffset={off.toFixed(1)} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[11px] font-bold text-slate-800 leading-none">{pct}</span>
          <span className="text-[6.5px] font-semibold text-slate-500 tracking-wider">FRESH</span>
        </div>
      </div>
    );
  };

  const renderLanding = () => (
    <div className="p-8 max-w-6xl mx-auto text-slate-900">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Knowledge vault</h1>
          <p className="text-sm text-slate-500 mt-1">The source of truth that grounds every AI answer about your brand.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="text-slate-600">
            <RefreshCcw size={15} className="mr-2" /> Re-sync all
          </Button>
          <Button onClick={() => setModalType('create-kb')}>
            <Plus size={16} className="mr-1" /> New knowledge base
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center text-xs font-semibold uppercase tracking-wider mb-2" style={{color: '#6366F1'}}><Database size={15} className="mr-2" /> Knowledge bases</div>
            <div className="text-3xl font-bold my-1">{allKbs.length}</div>
            <div className="text-xs text-slate-500">grounding your AI presence</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center text-xs font-semibold uppercase tracking-wider mb-2" style={{color: '#2563EB'}}><Files size={15} className="mr-2" /> Active sources</div>
            <div className="text-3xl font-bold my-1">{totalSrc}</div>
            <div className="text-xs text-slate-500">{totalIdx} indexed · {indexing} in progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center text-xs font-semibold uppercase tracking-wider mb-2" style={{color: '#7C3AED'}}><Cpu size={15} className="mr-2" /> Indexed knowledge</div>
            <div className="text-3xl font-bold my-1 flex items-baseline">4.1<span className="text-sm text-slate-500 ml-1">M tokens</span></div>
            <div className="text-xs text-slate-500">retrievable by every engine</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center text-xs font-semibold uppercase tracking-wider mb-2" style={{color: '#16A34A'}}><BadgeCheck size={15} className="mr-2" /> Vault freshness</div>
            <div className="text-3xl font-bold my-1 flex items-baseline">{avgFresh}<span className="text-sm text-slate-500 ml-1">%</span></div>
            <div className="text-xs text-slate-500">recency of cited content</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex space-x-6 border-b border-slate-200 mb-8">
        <button 
          className={`flex items-center pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'kb' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
          onClick={() => setActiveTab('kb')}
        >
          <Database size={16} className="mr-2" /> Knowledge bases 
          <span className="ml-2 bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full font-bold">{allKbs.length}</span>
        </button>
        <button 
          className={`flex items-center pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'brand' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
          onClick={() => setActiveTab('brand')}
        >
          <Palette size={16} className="mr-2" /> Brand kits 
          <span className="ml-2 bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full font-bold">{BRAND_KITS.length}</span>
        </button>
        <button 
          className={`flex items-center pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'seg' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
          onClick={() => setActiveTab('seg')}
        >
          <Users size={16} className="mr-2" /> Audience segments 
          <span className="ml-2 bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full font-bold">{SEGMENTS.length}</span>
        </button>
      </div>

      {activeTab === 'kb' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allKbs.map((k) => {
            const Icon = k.icon;
            return (
              <Card
                key={k.id}
                className="hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer"
                onClick={() => setKbId(k.id)}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{background: k.bg, color: k.tint}}>
                      <Icon size={24} />
                    </div>
                    <RingSVG pct={k.fresh} color={k.tint} />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">{k.name}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-grow">{k.desc}</p>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
                    <div className="flex space-x-3 items-center">
                      <span><b className="text-slate-900">{k.indexed}</b> indexed</span>
                      {k.indexing > 0 && <span className="flex items-center"><Loader2 size={12} className="animate-spin mr-1 text-indigo-500"/> {k.indexing} indexing</span>}
                      {k.failed > 0 && <span className="flex items-center text-red-600"><AlertTriangle size={12} className="mr-1" /> {k.failed}</span>}
                    </div>
                    <div className="flex space-x-1" title={k.engines.join(', ')}>
                      {k.engines.map(e => (
                        <span key={e} className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold text-white" style={{background: ENGINE_COLORS[e]||'#94A3B8'}}>{e.charAt(0)}</span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          <div
            className="flex flex-col items-center justify-center text-center bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-6 cursor-pointer hover:bg-slate-100 hover:border-indigo-300 transition-colors min-h-[220px]"
            onClick={() => setModalType('create-kb')}
          >
            <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-3">
              <Plus size={24} />
            </div>
            <div className="text-sm font-bold text-slate-900 mb-1">New knowledge base</div>
            <div className="text-xs text-slate-500 px-4">Group sources around a theme — product, support, brand.</div>
          </div>
        </div>
      )}

      {activeTab === 'brand' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRAND_KITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <Card key={i} className="hover:shadow-md transition-all cursor-pointer" onClick={() => toast.info(`Opening brand kit — ${b.name}`)}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{background: b.bg, color: b.tint}}><Icon size={24} /></div>
                  <h3 className="text-base font-bold text-slate-900 mb-3">{b.name}</h3>
                  <div className="flex space-x-2 mb-4">
                    {b.sw.map(c => <span key={c} className="w-6 h-6 rounded-full shadow-inner" style={{background: c}}></span>)}
                  </div>
                  <div className="flex items-center text-sm text-slate-700 mb-4 bg-slate-50 p-2 rounded"><Mic size={15} className="text-slate-400 mr-2" /> Voice: <b className="ml-1">{b.voice}</b></div>
                  <div className="mt-auto pt-4 border-t border-slate-100 text-xs text-green-600 font-medium flex items-center">
                    <Check size={14} className="mr-1" /> Applied to all answers
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {activeTab === 'seg' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SEGMENTS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Card key={i} className="hover:shadow-md transition-all cursor-pointer" onClick={() => toast.info(`Opening segment — ${s.name}`)}>
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{background: s.bg, color: s.tint}}><Icon size={24} /></div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">{s.name}</h3>
                  <p className="text-sm text-slate-500 mb-4">{s.size}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {s.tags.map(t => <Badge key={t} variant="secondary" className="text-xs font-medium">{t}</Badge>)}
                  </div>
                  <div className="mt-auto pt-4 border-t border-slate-100 text-xs font-medium flex items-center" style={{color: s.tint}}>
                    <Target size={14} className="mr-1" /> Targeted prompts tuned
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderDetail = () => {
    const k = allKbs.find(x => x.id === kbId);
    if (!k) return null;
    const srcs = vaultSources[k.id] || [];
    const fileCount = k.indexed + k.indexing + k.failed;
    const Icon = k.icon;
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderNode = (s: any, i: number, depth = 0) => {
      const isExpanded = expandedFolders[s.name];
      if (s.f) {
        return (
          <div key={`${depth}-${i}`}>
            <div 
              className="flex items-center p-3 hover:bg-slate-50 transition-colors cursor-pointer text-sm border-b border-slate-100" 
              style={{paddingLeft: (depth * 24) + 16}}
              onClick={() => toggleFolder(s.name)}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-indigo-50 text-indigo-600 mr-3 flex-shrink-0"><Folder size={16} fill="currentColor" fillOpacity={0.2} /></div>
              <div className="flex-grow min-w-0 pr-4">
                <div className="font-semibold text-slate-900 truncate">{s.name}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.items} sources</div>
              </div>
              <div className="flex-shrink-0 text-slate-400">
                  <ChevronRight size={18} className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
              </div>
            </div>
            {isExpanded && s.children && (
              <div className="bg-slate-50/50">
                  {s.children.map((child: any, ci: number) => renderNode(child, ci, depth + 1))}
              </div>
            )}
          </div>
        );
      }
      
      const SIcon = s.ic || FileText;
      return (
        <div
          key={`${depth}-${i}`}
          className="flex items-center p-3 hover:bg-slate-50 transition-colors group cursor-pointer text-sm border-b border-slate-100"
          style={{paddingLeft: (depth * 24) + 16}}
          onClick={() => s.pageId && handleViewPage(s.pageId)}
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 flex-shrink-0 mr-3">
            <SIcon size={16} style={{color: s.tc || '#64748b'}} />
          </div>
          <div className="flex-grow min-w-0 pr-4">
            <div className="font-medium text-slate-900 truncate">{s.name}</div>
            <div className="flex items-center mt-0.5">
              <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-slate-600">{s.type}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-xs flex-shrink-0">
            {s.status === 'indexing' && (
              <div className="w-16 h-1.5 bg-indigo-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 transition-all duration-300" style={{width: `${s.progress||0}%`}}></div>
              </div>
            )}
            {s.status === 'indexed' && <div className="text-slate-500 w-16 text-right whitespace-nowrap"><b className="text-slate-900 font-semibold">{s.chunks || 0}</b> chunks</div>}
            {s.status === 'failed' && <button className="border border-slate-300 rounded px-2 py-1 hover:bg-slate-100 text-slate-700" onClick={(e)=>{e.stopPropagation();handleRetrySource(s);}}>Retry</button>}
            {(s.status !== 'indexing' && s.status !== 'indexed' && s.status !== 'failed') && <div className="text-slate-400 w-16 text-right">—</div>}
            
            {s.status === 'indexed' && <span className="flex items-center text-green-600 font-medium w-20"><CircleCheck size={14} className="mr-1" /> Indexed</span>}
            {s.status === 'indexing' && <span className="flex items-center text-indigo-600 font-medium w-20"><Loader2 size={14} className="mr-1 animate-spin" /> Indexing</span>}
            {s.status === 'queued' && <span className="flex items-center text-slate-500 font-medium w-20"><Clock size={14} className="mr-1" /> Queued</span>}
            {s.status === 'failed' && <span className="flex items-center text-red-600 font-medium w-20"><AlertTriangle size={14} className="mr-1" /> Failed</span>}
            
            <span className="w-16 text-right text-slate-400 whitespace-nowrap">{s.when || 'just now'}</span>
            <button className="text-slate-400 opacity-0 group-hover:opacity-100 hover:text-slate-900 transition-opacity p-1" onClick={(e) => { e.stopPropagation(); toast.info('Source options'); }}>
              <MoreVertical size={16} />
            </button>
          </div>
        </div>
      );
    };

    return (
      <div className="p-8 max-w-6xl mx-auto">
        <div className="flex items-center space-x-2 text-sm text-slate-500 mb-6">
          <a className="hover:text-slate-900 cursor-pointer flex items-center font-medium" onClick={() => setKbId(null)}>
            <ChevronLeft size={16} className="mr-1" /> Knowledge vault
          </a>
          <ChevronRight size={14} className="text-slate-300" />
          <span className="text-slate-900 font-medium">{k.name}</span>
        </div>
        
        <div className="flex items-start gap-5 mb-8">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm" style={{background: k.bg, color: k.tint}}>
            <Icon size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center">
              {k.name} 
              <Settings size={18} className="ml-3 text-slate-400 hover:text-slate-700 cursor-pointer transition-colors" onClick={() => toast.info('Knowledge base settings')} />
            </h1>
            <div className="flex items-center text-sm text-slate-500 mt-2 space-x-3">
              <span>{fileCount} sources</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span>{k.tokens} tokens</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span className="text-green-600 font-semibold">{k.fresh}% fresh</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span>synced {k.updated}</span>
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-3">
            <button
              className="flex items-center text-sm bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 font-medium transition-colors shadow-sm"
              onClick={() => setModalType('new-folder')}
            >
              <FolderPlus size={16} className="mr-2 text-slate-500" /> New folder
            </button>
            <button 
              className="flex items-center text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-medium transition-colors shadow-sm" 
              onClick={() => setModalType('add-source')}
            >
              <Plus size={16} className="mr-2" /> Add source
            </button>
          </div>
        </div>

        <div className="flex space-x-6 border-b border-slate-200 mb-8">
          <button 
            className={`flex items-center pb-3 text-sm font-medium border-b-2 transition-colors ${detailTab === 'files' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
            onClick={() => setDetailTab('files')}
          >
            <Files size={16} className="mr-2" /> Files
          </button>
          <button 
            className={`flex items-center pb-3 text-sm font-medium border-b-2 transition-colors ${detailTab === 'search' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
            onClick={() => setDetailTab('search')}
          >
            <Search size={16} className="mr-2" /> Search
          </button>
        </div>

        {detailTab === 'files' ? (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-grow">
              <div className="flex items-center justify-between text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-t-xl px-4 py-3">
                <span className="flex items-center"><Database size={16} className="mr-2 text-slate-400" /> {k.name}</span>
                <button 
                  className="flex items-center text-xs bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-50 font-medium transition-colors shadow-sm" 
                  onClick={() => setModalType('add-source')}
                >
                  <Plus size={14} className="mr-1" /> Add
                </button>
              </div>
              <div className="border-x border-b border-slate-200 rounded-b-xl bg-white shadow-sm overflow-hidden">
                {srcs.length === 0 ? (
                  <div className="p-8 text-center text-slate-500">No sources added yet.</div>
                ) : (
                  srcs.map((s, i) => renderNode(s, i))
                )}
              </div>
            </div>
            
            <div className="w-full lg:w-72 flex-shrink-0">
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm sticky top-6">
                <div className="flex items-center font-bold text-slate-900 text-sm mb-2">
                  <Zap size={16} className="mr-2 text-yellow-500" /> What this vault powers
                </div>
                <div className="text-xs text-slate-500 mb-6 leading-relaxed">
                  Citations this base has earned across engines, last 30 days.
                </div>
                {k.engines.map(e => {
                  const w = 40 + Math.round(Math.random()*55);
                  return (
                    <div key={e} className="flex items-center mb-4 text-xs font-medium">
                      <span className="w-20 text-slate-700">{e}</span>
                      <div className="flex-grow h-2 bg-slate-100 rounded-full overflow-hidden mx-3">
                        <div className="h-full rounded-full" style={{width: `${w}%`, background: ENGINE_COLORS[e]||'#94A3B8'}}></div>
                      </div>
                      <span className="w-8 text-right text-slate-500">{Math.round(w*1.6)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto py-8">
            <div className="relative mb-6">
              <Search size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                className="w-full bg-white border border-slate-200 rounded-xl py-4 pl-12 pr-16 text-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="Ask anything about this knowledge base…"
                value={searchQuestion}
                onChange={(e) => setSearchQuestion(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !isAsking) handleAskQuestion(); }}
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-600 text-white rounded-lg w-9 h-9 flex items-center justify-center hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAskQuestion}
                disabled={!searchQuestion.trim() || isAsking}
              >
                {isAsking ? <Loader2 size={16} className="animate-spin" /> : <span className="font-mono text-sm">↵</span>}
              </button>
            </div>
            <div className="flex items-center justify-center text-sm text-slate-500 mb-10 text-center">
              <Sparkles size={16} className="text-orange-500 mr-2 flex-shrink-0" />
              Ask a question and get a GPT answer grounded in this knowledge base&apos;s indexed sources.
            </div>

            {isAsking && (
              <div className="flex items-center justify-center py-16">
                <Loader2 size={28} className="animate-spin text-indigo-500" />
              </div>
            )}

            {!isAsking && askResult && (
              <div className="text-left bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <div className="prose prose-sm max-w-none prose-headings:font-bold prose-a:text-indigo-600">
                  <ReactMarkdown>{askResult.answer}</ReactMarkdown>
                </div>
                {askResult.sources.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Sources</div>
                    <div className="flex flex-wrap gap-2">
                      {askResult.sources.map(s => (
                        <button
                          key={s.pageId}
                          onClick={() => handleViewPage(s.pageId)}
                          className="flex items-center bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs px-3 py-1.5 rounded-full font-medium transition-colors"
                        >
                          <FileText size={12} className="mr-1.5 text-slate-400 flex-shrink-0" /> {s.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      {kbId ? renderDetail() : renderLanding()}

      {/* MODALS */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => { setModalType(null); setViewingPage(null); }}></div>

          <div className={`relative bg-white rounded-2xl shadow-2xl w-full overflow-hidden flex flex-col transform transition-all ${modalType === 'view-page' ? 'max-w-3xl max-h-[85vh]' : 'max-w-lg'}`}>
            
            {modalType === 'create-kb' && (
              <>
                <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">New knowledge base</h2>
                    <p className="text-sm text-slate-500 mt-1">Group related sources so answers stay on-message.</p>
                  </div>
                  <button className="text-slate-400 hover:text-slate-700 p-1 bg-slate-50 hover:bg-slate-100 rounded-md transition-colors" onClick={() => { setModalType(null); setNewKbName(""); }}>
                    <X size={20} />
                  </button>
                </div>
                <div className="px-6 py-6">
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
                      placeholder="e.g. Product & pricing"
                      value={newKbName}
                      onChange={(e) => setNewKbName(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end space-x-3 mt-8">
                    <button className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors" onClick={() => { setModalType(null); setNewKbName(""); }}>Cancel</button>
                    <button
                      className="flex items-center px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handleCreateKb}
                      disabled={!newKbName.trim() || isCreatingKb}
                    >
                      {isCreatingKb ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Check size={16} className="mr-2" />} Create base
                    </button>
                  </div>
                </div>
              </>
            )}

            {modalType === 'new-folder' && (
              <>
                <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">New folder</h2>
                    <p className="text-sm text-slate-500 mt-1">Group related sources inside this knowledge base.</p>
                  </div>
                  <button className="text-slate-400 hover:text-slate-700 p-1 bg-slate-50 hover:bg-slate-100 rounded-md transition-colors" onClick={() => { setModalType(null); setNewFolderName(""); }}>
                    <X size={20} />
                  </button>
                </div>
                <div className="px-6 py-6">
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Folder name</label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
                      placeholder="e.g. Support articles"
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end space-x-3 mt-8">
                    <button className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors" onClick={() => { setModalType(null); setNewFolderName(""); }}>Cancel</button>
                    <button
                      className="flex items-center px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handleCreateFolder}
                      disabled={!newFolderName.trim() || isCreatingFolder}
                    >
                      {isCreatingFolder ? <Loader2 size={16} className="mr-2 animate-spin" /> : <FolderPlus size={16} className="mr-2" />} Create folder
                    </button>
                  </div>
                </div>
              </>
            )}

            {modalType === 'add-source' && (
              <>
                <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Add a source</h2>
                    <p className="text-sm text-slate-500 mt-1">Pick how Citationly should pull in this knowledge.</p>
                  </div>
                  <button className="text-slate-400 hover:text-slate-700 p-1 bg-slate-50 hover:bg-slate-100 rounded-md transition-colors" onClick={() => setModalType(null)}>
                    <X size={20} />
                  </button>
                </div>
                <div className="px-6 py-6 bg-slate-50/50">
                  <div className="grid grid-cols-2 gap-4">
                    {ADD_METHODS.map((m, i) => {
                      const Icon = m.ic;
                      return (
                        <button 
                          key={i} 
                          className="text-left bg-white border border-slate-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all group" 
                          onClick={() => handleAddSourceClick(m.id)}
                        >
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform" style={{background: m.bg, color: m.tint}}>
                            <Icon size={20} />
                          </div>
                          <div className="text-sm font-bold text-slate-900 mb-1">{m.t}</div>
                          <div className="text-xs text-slate-500 leading-relaxed">{m.d}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {modalType === 'view-page' && (
              <>
                <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-start flex-shrink-0">
                  <div className="min-w-0 pr-4">
                    <h2 className="text-xl font-bold text-slate-900 truncate">{viewingPage?.title || viewingPage?.fileName || 'Loading…'}</h2>
                    {viewingPage && (
                      <a href={viewingPage.url} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:underline mt-1 flex items-center min-w-0">
                        <Link size={13} className="mr-1 flex-shrink-0" /> <span className="truncate">{viewingPage.url}</span>
                      </a>
                    )}
                  </div>
                  <button className="text-slate-400 hover:text-slate-700 p-1 bg-slate-50 hover:bg-slate-100 rounded-md transition-colors flex-shrink-0" onClick={() => { setModalType(null); setViewingPage(null); }}>
                    <X size={20} />
                  </button>
                </div>

                {isLoadingPageView ? (
                  <div className="flex items-center justify-center py-24">
                    <Loader2 size={28} className="animate-spin text-indigo-500" />
                  </div>
                ) : viewingPage ? (
                  <div className="overflow-y-auto flex-1 min-h-0 px-6 py-6">
                    <div className="flex flex-wrap items-center gap-2 mb-5 text-xs">
                      <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-semibold">{viewingPage.wordCount} words</span>
                      <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-semibold">{Math.round(viewingPage.sizeBytes / 100) / 10} KB</span>
                      <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-semibold">Scraped {new Date(viewingPage.scrapedAt).toLocaleString()}</span>
                      {viewingPage.subFolder && <span className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full font-semibold">{viewingPage.subFolder}</span>}
                    </div>

                    {viewingPage.description && (
                      <p className="text-sm text-slate-500 italic mb-5 border-l-2 border-slate-200 pl-3">{viewingPage.description}</p>
                    )}

                    {viewingPage.headings.length > 0 && (
                      <div className="mb-6 bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">On this page</div>
                        <ul className="space-y-1">
                          {viewingPage.headings.map((h, i) => (
                            <li key={i} className="text-sm text-slate-700 truncate" style={{paddingLeft: Math.max(0, (h.level || 1) - 1) * 12}}>
                              {h.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="prose prose-sm max-w-none prose-headings:font-bold prose-a:text-indigo-600">
                      <ReactMarkdown>{viewingPage.markdownContent || viewingPage.content || '_No content extracted for this page._'}</ReactMarkdown>
                    </div>
                  </div>
                ) : (
                  <div className="py-24 text-center text-slate-500 text-sm">Couldn&apos;t load this source.</div>
                )}
              </>
            )}

            {modalType === 'input-scrape' && (
              <>
                <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{scrapeType === 'Website' ? 'Crawl a Website' : 'Scrape a Page'}</h2>
                    <p className="text-sm text-slate-500 mt-1">
                      {scrapeType === 'Website' 
                        ? 'We will recursively crawl links from this start URL to index the entire site.'
                        : 'Enter the exact URL of the page you want to pull content from.'}
                    </p>
                  </div>
                  <button className="text-slate-400 hover:text-slate-700 p-1 bg-slate-50 hover:bg-slate-100 rounded-md transition-colors" onClick={() => setModalType(null)}>
                    <X size={20} />
                  </button>
                </div>
                <div className="px-6 py-6">
                  <div className="mb-5">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">URL</label>
                    <div className="relative">
                      <Link size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="url" 
                        placeholder="https://example.com" 
                        value={scrapeUrl} 
                        onChange={(e) => setScrapeUrl(e.target.value)} 
                        className="w-full border border-slate-300 rounded-xl py-3 pl-11 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
                      />
                    </div>
                  </div>
                  
                  {scrapeType === 'Website' && (
                    <div className="mb-5">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Max Pages to Crawl</label>
                      <input
                        type="number"
                        value={maxPages}
                        onChange={(e) => setMaxPages(parseInt(e.target.value) || 10)}
                        min={1}
                        max={1000}
                        className="w-full border border-slate-300 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
                      />
                    </div>
                  )}

                  {scrapeType === 'Website' && (
                    <div className="mb-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Folder</label>
                      <select
                        value={folderChoice}
                        onChange={(e) => setFolderChoice(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm bg-white"
                      >
                        <option value="__new__">+ Create new folder</option>
                        {kbFolders.map(f => (
                          <option key={f.id} value={f.id}>{f.name}</option>
                        ))}
                      </select>
                      {folderChoice === '__new__' && (
                        <input
                          type="text"
                          placeholder="Name this folder, e.g. Support articles"
                          value={newCrawlFolderName}
                          onChange={(e) => setNewCrawlFolderName(e.target.value)}
                          className="w-full border border-slate-300 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm mt-3"
                        />
                      )}
                    </div>
                  )}

                  <div className="flex justify-between items-center mt-8 pt-4 border-t border-slate-100">
                    <button
                      className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                      onClick={() => setModalType('add-source')}
                      disabled={isSubmitting}
                    >
                      &larr; Back
                    </button>
                    <button
                      className="flex items-center px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={startScraping}
                      disabled={!scrapeUrl || isSubmitting || (scrapeType === 'Website' && folderChoice === '__new__' && !newCrawlFolderName.trim())}
                    >
                      {isSubmitting ? <Loader2 size={18} className="mr-2 animate-spin" /> : <Globe size={18} className="mr-2" />}
                      Start {scrapeType === 'Website' ? 'Crawl' : 'Scrape'}
                    </button>
                  </div>
                </div>
              </>
            )}
            
          </div>
        </div>
      )}
    </div>
  );
}
