"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  generateContent,
  analyzeCompetitor,
  rewriteContent,
  updateContentDraft,
  getContentDrafts,
  ContentDraft,
  CompetitorAnalysisResult,
} from "@/lib/api/contentApi";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const CS_CARD = "bg-gradient-to-b from-white/98 to-[#FAF8FF]/94 border-[#E8E1F5] shadow-[0_16px_34px_rgba(15,23,42,.06)] rounded-xl";
const CS_FIELD = "border-[#E8E1F5] rounded-xl text-[13.5px] text-[#261B43] focus-visible:border-primary/50 focus-visible:ring-primary/12";
const CS_SIDE = "p-4.5 border border-[#E8E1F5] rounded-xl bg-gradient-to-b from-white to-[#FBF9FF]";
const CS_SELECT = "w-full border border-[#E8E1F5] rounded-xl bg-white px-3.5 py-3 text-[13.5px] text-[#261B43] outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/12 transition-colors";

/* ── template data ───────────────────────────────────── */
const TEMPLATES = [
  { label: "SEO Blog", prompt: "Write an SEO blog post about [topic] targeting [keyword]. Include a strong introduction, scannable sections, helpful examples, and a conversion-focused CTA." },
  { label: "Landing Page", prompt: "Create high-converting landing page copy for [product or service]. Write hero copy, benefits, objections, CTA, and FAQ in a clear brand voice." },
  { label: "FAQ", prompt: "Generate customer-facing FAQs for [product, service, or website] using a helpful tone and clear answers that support search intent." },
  { label: "Email", prompt: "Write a short email campaign for [offer]. Include subject line ideas, preview text, primary message, and CTA." },
  { label: "LinkedIn", prompt: "Draft a LinkedIn post about [topic] with a strong hook, practical insights, and a clear call to action for the target audience." },
  { label: "Product Description", prompt: "Write persuasive product description copy for [product]. Highlight key features, benefits, target user, and search-friendly language." },
  { label: "Website Content", prompt: "Create website content for [business]. Write clear, SEO-friendly sections aligned to the target audience and brand positioning." },
] as const;

const CONTENT_TYPES   = ["SEO Blog", "How-To Article", "Listicle", "Case Study", "AI Overview Content", "LinkedIn Post", "FAQ", "Landing Page Copy"] as const;
const TONES           = ["Expert and approachable", "Professional", "Friendly", "Persuasive", "Authoritative"] as const;
const LANGUAGES       = ["English (US)", "English (UK)", "Spanish", "German", "French"] as const;
const AUDIENCES       = ["SEO Managers", "Marketing Teams", "Agency Owners", "Business Owners", "SaaS Buyers"] as const;
const LENGTHS         = ["Long Form", "Medium", "Short"] as const;
const VOICES          = ["Citationly Default", "Consultative", "Bold SaaS", "Enterprise Clear"] as const;
const MODELS          = ["GPT-4.1", "GPT-4o", "GPT-4.1 mini"] as const;
const FORMATS         = ["Structured Draft", "Brief + Draft", "Outline Only", "Social Pack"] as const;
const INTENTS         = ["Commercial Investigation", "Informational", "Navigational", "Transactional"] as const;
const CONTENT_TAGS    = ["SEO Blogs", "How-To", "Listicles", "Case Studies", "AI Overview", "LinkedIn", "X Posts", "FAQ", "Hero Copy", "CTA Blocks"] as const;

const WORKFLOW_STEPS = [
  { num: 1, title: "Enter URL",        desc: "Add a competitor page to benchmark depth, headings, and strategic positioning." },
  { num: 2, title: "Analyze Content",  desc: "Highlight gaps, overused claims, and missed conversion opportunities." },
  { num: 3, title: "Outperform Draft", desc: "Generate a stronger piece with better structure, clarity, and CTA alignment." },
] as const;

/* ── helpers ──────────────────────────────────────────── */
const LENGTH_ESTIMATES: Record<string, string> = {
  "Long Form": "1,200 to 1,800 words",
  "Medium": "600 to 900 words",
  "Short": "300 to 500 words",
};

/* ── page component ──────────────────────────────────── */
export default function ContentGeneratorPage() {
  const router = useRouter();

  /* prompt editor */
  const [prompt, setPrompt] = useState("");
  const [keywords, setKeywords] = useState("");

  /* generation settings */
  const [contentType, setContentType]   = useState<string>(CONTENT_TYPES[0]);
  const [tone, setTone]                 = useState<string>(TONES[0]);
  const [language, setLanguage]         = useState<string>(LANGUAGES[0]);
  const [audience, setAudience]         = useState<string>(AUDIENCES[0]);
  const [outputLength, setOutputLength] = useState<string>(LENGTHS[0]);
  const [brandVoice, setBrandVoice]     = useState<string>(VOICES[0]);
  const [model, setModel]               = useState<string>(MODELS[0]);
  const [outputFormat, setOutputFormat] = useState<string>(FORMATS[0]);
  const [creativity, setCreativity]     = useState(68);

  /* content brief */
  const [targetKeyword, setTargetKeyword]   = useState("");
  const [businessName, setBusinessName]     = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [searchIntent, setSearchIntent]     = useState<string>(INTENTS[0]);
  const [goal, setGoal]                     = useState("");
  const [cta, setCta]                       = useState("");
  const [refs, setRefs]                     = useState("");
  const [angle, setAngle]                   = useState("");

  /* competitor benchmarking */
  const [competitorUrl, setCompetitorUrl] = useState("");
  const [competitorAnalysis, setCompetitorAnalysis] = useState<CompetitorAnalysisResult | null>(null);

  /* generated draft */
  const [draft, setDraft] = useState<ContentDraft | null>(null);
  const [editedContent, setEditedContent] = useState("");
  const [recentDrafts, setRecentDrafts] = useState<ContentDraft[]>([]);

  /* loading states */
  const [isGenerating, setIsGenerating]     = useState(false);
  const [isAnalyzing, setIsAnalyzing]       = useState(false);
  const [docStatus, setDocStatus]           = useState("Waiting for generation");

  useEffect(() => {
    getContentDrafts()
      .then(setRecentDrafts)
      .catch((err) => console.error("Failed to load recent drafts:", err));
  }, []);

  const loadDraftIntoEditor = useCallback((d: ContentDraft) => {
    setDraft(d);
    setEditedContent(d.content);
    setDocStatus("Draft ready");
  }, []);

  /* ── handlers ────────────────────────────────────────── */
  const handleTemplateClick = useCallback((templatePrompt: string) => {
    setPrompt(templatePrompt);
  }, []);

  const handleGenerate = useCallback(async (overrideCompetitorInsights?: string) => {
    if (!prompt.trim()) {
      toast.error("Describe what you want generated first");
      return;
    }
    setIsGenerating(true);
    setDocStatus("Generating…");
    try {
      const result = await generateContent({
        prompt,
        keywords,
        contentType,
        tone,
        language,
        audience,
        outputLength,
        brandVoice,
        outputFormat,
        creativity,
        targetKeyword: targetKeyword || undefined,
        businessName: businessName || undefined,
        targetAudience: targetAudience || undefined,
        searchIntent,
        goal: goal || undefined,
        cta: cta || undefined,
        referenceUrls: refs || undefined,
        secondaryAngle: angle || undefined,
        competitorUrl: competitorUrl || undefined,
        competitorInsights: overrideCompetitorInsights,
        model,
      });
      loadDraftIntoEditor(result);
      setRecentDrafts((prev) => [result, ...prev.filter((d) => d.id !== result.id)]);
      toast.success("Content generated successfully");
    } catch (err) {
      console.error(err);
      setDocStatus("Generation failed");
      toast.error("Failed to generate content");
    } finally {
      setIsGenerating(false);
    }
  }, [prompt, keywords, contentType, tone, language, audience, outputLength, brandVoice, outputFormat, creativity, targetKeyword, businessName, targetAudience, searchIntent, goal, cta, refs, angle, competitorUrl, model, loadDraftIntoEditor]);

  const handleSaveDraft = useCallback(async () => {
    if (!draft) {
      toast.error("Generate content before saving");
      return;
    }
    try {
      const updated = await updateContentDraft(draft.id, editedContent);
      setDraft(updated);
      setRecentDrafts((prev) => [updated, ...prev.filter((d) => d.id !== updated.id)]);
      toast.success("Draft saved");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save draft");
    }
  }, [draft, editedContent]);

  const handleAnalyzeCompetitor = useCallback(async () => {
    if (!competitorUrl.trim()) {
      toast.error("Enter a competitor URL first");
      return;
    }
    setIsAnalyzing(true);
    try {
      const result = await analyzeCompetitor(competitorUrl);
      setCompetitorAnalysis(result);
      toast.success("Competitor analysis complete");
    } catch (err) {
      console.error(err);
      toast.error("Analysis failed — check the URL and try again");
    } finally {
      setIsAnalyzing(false);
    }
  }, [competitorUrl]);

  const handleOutperform = useCallback(() => {
    if (!competitorAnalysis) {
      toast.error("Analyze a competitor page first");
      return;
    }
    const insights = [
      competitorAnalysis.opportunity,
      competitorAnalysis.gapSignals.length ? `Gaps to close: ${competitorAnalysis.gapSignals.join(", ")}` : "",
      competitorAnalysis.recommendedAngle,
    ].filter(Boolean).join("\n");
    handleGenerate(insights);
  }, [competitorAnalysis, handleGenerate]);

  const handleCopy = useCallback(async () => {
    const text = editedContent || draft?.content || "";
    if (!text) {
      toast.error("Nothing to copy yet");
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Content copied to clipboard");
    } catch (err) {
      console.error(err);
      toast.error("Couldn't copy — your browser blocked clipboard access");
    }
  }, [editedContent, draft]);

  const handleRewrite = useCallback(async () => {
    if (!draft) {
      toast.error("Generate content before rewriting");
      return;
    }
    setIsGenerating(true);
    setDocStatus("Rewriting…");
    try {
      const result = await rewriteContent(
        draft.id,
        "Rewrite this content with improved clarity, flow, and structure while preserving the key points and CTA."
      );
      loadDraftIntoEditor(result);
      setRecentDrafts((prev) => [result, ...prev.filter((d) => d.id !== result.id)]);
      toast.success("Content rewritten");
    } catch (err) {
      console.error(err);
      setDocStatus("Draft ready");
      toast.error("Failed to rewrite content");
    } finally {
      setIsGenerating(false);
    }
  }, [draft, loadDraftIntoEditor]);

  const handleOptimize = useCallback(() => {
    if (!draft) {
      toast.error("Generate content before optimizing");
      return;
    }
    router.push(`/dashboard/content-optimizer?draftId=${draft.id}`);
  }, [draft, router]);

  const handlePublish = useCallback(() => {
    if (!draft) {
      toast.error("Generate content before publishing");
      return;
    }
    router.push(`/dashboard/publishing-center?draftId=${draft.id}`);
  }, [draft, router]);

  const handleAttachFiles = useCallback(() => {
    if (!refs.trim()) {
      toast.error("Add reference URLs in the Content Brief first");
      return;
    }
    setPrompt((p) => (p.includes(refs) ? p : `${p}\n\nReference URLs for context: ${refs}`));
    toast.success("Attached reference brief to prompt");
  }, [refs]);

  /* ── render ──────────────────────────────────────────── */
  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
      <div className="grid gap-3.5 text-[#261B43]">

        {/* ── header ───────────────────────────────── */}
        <div className="flex items-start justify-between gap-3.5 flex-wrap">
          <div>
            <div className="inline-flex items-center gap-2.5 px-3 py-2 rounded-full border border-primary/16 bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#818CF8] to-accent shadow-[0_0_0_5px_rgba(99,102,241,.14)]" />
              Content studio
            </div>
            <h1 className="mt-3 mb-1.5 font-space-grotesk text-[32px] leading-tight tracking-tight">Content Generator</h1>
            <p className="max-w-[760px] text-[#6F6687] text-sm leading-relaxed">
              Build SEO blogs, social posts, landing pages, and FAQ content inside the main
              Citationly dashboard, with the same purple palette, rounded cards, and premium
              module styling.
            </p>
          </div>

          <div className="grid gap-2.5 min-w-[260px]">
            <span className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-[#E8E1F5] bg-white/92 text-[#6F6687] text-[12.5px] font-semibold whitespace-nowrap">
              <strong className="text-[#261B43]">Workflow</strong> Prompt to brief to competitor to draft
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-[#E8E1F5] bg-white/92 text-[#6F6687] text-[12.5px] font-semibold whitespace-nowrap">
              <strong className="text-[#261B43]">Status</strong> Ready for generation
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-[#E8E1F5] bg-white/92 text-[#6F6687] text-[12.5px] font-semibold whitespace-nowrap">
              <strong className="text-[#261B43]">Scope</strong> Premium interactive view
            </span>
          </div>
        </div>

        {/* ── top grid: prompt editor + settings ──── */}
        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.45fr)_minmax(330px,1fr)] gap-3.5 items-start">

          {/* prompt editor card */}
          <Card className={CS_CARD}>
            <div className="p-5.5 pb-0 flex items-start justify-between gap-3.5 flex-wrap">
              <div>
                <h2 className="font-space-grotesk text-xl tracking-tight">Prompt Editor</h2>
                <p className="mt-1.5 text-[#6F6687] text-[13.5px] leading-relaxed">
                  Start with a guided prompt, reuse templates, and lock in the target keyword
                  before generation.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-[#E8E1F5] bg-white/92 text-[#6F6687] text-[12.5px] font-semibold whitespace-nowrap">
                <strong className="text-[#261B43]">Estimated Output</strong> {draft ? `${draft.wordCount} words generated` : (LENGTH_ESTIMATES[outputLength] || "—")}
              </span>
            </div>

            <div className="p-5.5 grid gap-4">
              {/* quick templates */}
              <div className="grid gap-2">
                <span className="text-[12.5px] font-bold text-[#261B43]">Quick Templates</span>
                <div className="flex flex-wrap gap-2.5">
                  {TEMPLATES.map((t) => (
                    <button
                      key={t.label}
                      type="button"
                      onClick={() => handleTemplateClick(t.prompt)}
                      className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-[#E8E1F5] bg-[#FAF8FF] text-[#261B43] text-[12.5px] font-bold cursor-pointer hover:-translate-y-px hover:border-primary/35 hover:bg-primary/8 transition-all"
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* prompt textarea */}
              <div className="grid gap-2">
                <Label htmlFor="csPrompt" className="text-[12.5px] font-bold text-[#261B43]">Content Prompt</Label>
                <Textarea
                  id="csPrompt"
                  placeholder="Describe what you want Citationly to generate. Include the topic, primary keyword, desired format, brand context, and CTA."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className={`${CS_FIELD} min-h-[210px] leading-relaxed`}
                />
              </div>

              {/* meta row */}
              <div className="flex items-center justify-between gap-3 flex-wrap p-3.5 border border-[#E8E1F5] rounded-xl bg-[#FAF8FF]">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-[#E8E1F5] bg-white/92 text-[#6F6687] text-[12.5px] font-semibold">
                    <strong className="text-[#261B43]">Characters</strong> <span>{prompt.length}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-[#E8E1F5] bg-white/92 text-[#6F6687] text-[12.5px] font-semibold">
                    <strong className="text-[#261B43]">Output</strong> Structured long-form draft
                  </span>
                </div>
                <div className="text-[#6F6687] text-[12.5px] font-semibold">Suggested inputs: angle, keyword, CTA, tone</div>
              </div>

              {/* keywords + attach */}
              <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto] gap-3 items-end">
                <div className="grid gap-2">
                  <Label htmlFor="csKeywords" className="text-[12.5px] font-bold text-[#261B43]">Keywords</Label>
                  <Input
                    id="csKeywords"
                    type="text"
                    className={CS_FIELD}
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                  />
                  <small className="text-[#6F6687] text-xs leading-relaxed">
                    Use comma-separated target terms for blogs, FAQs, landing pages, and social
                    derivatives.
                  </small>
                </div>
                <Button variant="outline" className="border-[#E8E1F5] text-[#261B43]" type="button" onClick={handleAttachFiles}>
                  Attach Files
                </Button>
              </div>
            </div>
          </Card>

          {/* generation settings card */}
          <Card className={CS_CARD}>
            <div className="p-5.5 pb-0">
              <h2 className="font-space-grotesk text-xl tracking-tight">Generation Settings</h2>
              <p className="mt-1.5 text-[#6F6687] text-[13.5px] leading-relaxed">
                Keep the setup compact while controlling tone, format, audience, and
                creativity.
              </p>
            </div>

            <div className="p-5.5 grid gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <SelectField id="csType"     label="Content Type"   value={contentType}   onChange={setContentType}   options={CONTENT_TYPES} />
                <SelectField id="csTone"     label="Tone"           value={tone}           onChange={setTone}           options={TONES} />
                <SelectField id="csLanguage" label="Language"       value={language}       onChange={setLanguage}       options={LANGUAGES} />
                <SelectField id="csAudience" label="Target Audience" value={audience}      onChange={setAudience}       options={AUDIENCES} />
                <SelectField id="csLength"   label="Output Length"  value={outputLength}   onChange={setOutputLength}   options={LENGTHS} />
                <SelectField id="csVoice"    label="Brand Voice"    value={brandVoice}     onChange={setBrandVoice}     options={VOICES} />
                <SelectField id="csModel"    label="AI Model"       value={model}          onChange={setModel}          options={MODELS} />
                <SelectField id="csFormat"   label="Output Format"  value={outputFormat}   onChange={setOutputFormat}   options={FORMATS} />
              </div>

              {/* creativity slider */}
              <div className="p-3.5 border border-[#E8E1F5] rounded-xl bg-[#FAF8FF]">
                <div className="flex items-center justify-between mb-2.5 text-[12.5px] font-bold">
                  <span>Creativity</span>
                  <span className="text-primary">{creativity}%</span>
                </div>
                <input
                  id="csCreativity"
                  type="range"
                  min={0}
                  max={100}
                  value={creativity}
                  onChange={(e) => setCreativity(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div className="flex items-center justify-between gap-3 p-3.5 border border-[#E8E1F5] rounded-xl bg-[#FAF8FF] text-[#6F6687] text-[12.5px]">
                <span>
                  <strong className="text-[#261B43]">Generation Mode:</strong> Balanced SEO output with conversion-friendly
                  structure
                </span>
                <span>Ready</span>
              </div>

              <div className="flex items-center flex-wrap gap-2.5">
                <Button
                  className="bg-gradient-to-br from-primary to-accent shadow-[0_14px_24px_rgba(99,102,241,.22)]"
                  disabled={isGenerating}
                  onClick={() => handleGenerate()}
                >
                  {isGenerating && <LoadingSpinner />}
                  Generate Content
                </Button>
                <Button
                  variant="outline"
                  className="border-primary/16 bg-primary/8 text-primary hover:bg-primary/12"
                  onClick={handleSaveDraft}
                >
                  Save Draft
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {/* ── content brief ────────────────────────── */}
        <Card className={CS_CARD}>
          <div className="p-5.5 pb-0 flex items-start justify-between gap-3.5 flex-wrap">
            <div>
              <h2 className="font-space-grotesk text-xl tracking-tight">Content Brief</h2>
              <p className="mt-1.5 text-[#6F6687] text-[13.5px] leading-relaxed">
                Improve direction before generation with a dedicated two-column brief.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-[#E8E1F5] bg-white/92 text-[#6F6687] text-[12.5px] font-semibold whitespace-nowrap">
              <strong className="text-[#261B43]">Required</strong> Strategy inputs before draft
            </span>
          </div>

          <div className="p-5.5 grid gap-4">
            <div className="flex items-center gap-2.5 p-3.5 border border-[#E8E1F5] rounded-xl bg-[#FAF8FF] text-[#6F6687] text-[13px] leading-relaxed">
              <strong className="text-[#261B43]">Brief Flow:</strong> Define the keyword, audience, intent, and CTA now so
              the generated content lands closer to publish-ready.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <BriefField id="csKeyword"        label="Target Keyword"   value={targetKeyword}   onChange={setTargetKeyword} />
              <BriefField id="csBusiness"        label="Business Name"    value={businessName}    onChange={setBusinessName} />
              <BriefField id="csTargetAudience"  label="Target Audience"  value={targetAudience}  onChange={setTargetAudience} />
              <BriefSelectField id="csIntent"    label="Search Intent"    value={searchIntent}    onChange={setSearchIntent} options={INTENTS} />
              <BriefField id="csGoal"            label="Goal"             value={goal}            onChange={setGoal} />
              <BriefField id="csCta"             label="Call To Action"   value={cta}             onChange={setCta} />
              <BriefField id="csRefs"            label="Reference URLs"   value={refs}            onChange={setRefs} />
              <BriefField id="csAngle"           label="Secondary Angle"  value={angle}           onChange={setAngle} />
            </div>
          </div>
        </Card>

        {/* ── competitor benchmarking ──────────────── */}
        <Card className={CS_CARD}>
          <div className="p-5.5 pb-0 flex items-start justify-between gap-3.5 flex-wrap">
            <div>
              <h2 className="font-space-grotesk text-xl tracking-tight">Competitor Content Benchmarking</h2>
              <p className="mt-1.5 text-[#6F6687] text-[13.5px] leading-relaxed">
                Analyze a competing page, then generate a better response inside the same studio
                workflow.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-[#E8E1F5] bg-white/92 text-[#6F6687] text-[12.5px] font-semibold whitespace-nowrap">
              <strong className="text-[#261B43]">Outperform</strong> Analyze then exceed
            </span>
          </div>

          <div className="p-5.5">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.08fr)_minmax(280px,.92fr)] gap-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="csCompetitor" className="text-[12.5px] font-bold text-[#261B43]">Competitor Website URL</Label>
                  <Input
                    id="csCompetitor"
                    type="url"
                    placeholder="https://competitor.com/page"
                    className={CS_FIELD}
                    value={competitorUrl}
                    onChange={(e) => setCompetitorUrl(e.target.value)}
                  />
                  <small className="text-[#6F6687] text-xs leading-relaxed">
                    Paste a ranking page or direct competitor article to review angles,
                    structure, and content gaps.
                  </small>
                </div>

                <div className="flex items-center flex-wrap gap-2.5">
                  <Button
                    variant="outline"
                    className="border-[#E8E1F5] text-[#261B43]"
                    disabled={isAnalyzing}
                    onClick={handleAnalyzeCompetitor}
                  >
                    {isAnalyzing && <LoadingSpinner />}
                    Analyze Competitor
                  </Button>
                  <Button
                    className="bg-gradient-to-br from-primary to-accent shadow-[0_14px_24px_rgba(99,102,241,.22)]"
                    onClick={handleOutperform}
                  >
                    Generate Better Content
                  </Button>
                </div>

                {/* workflow steps */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {WORKFLOW_STEPS.map((step) => (
                    <div key={step.num} className={CS_SIDE}>
                      <span className="inline-flex items-center justify-center w-7.5 h-7.5 rounded-full mb-3 bg-primary/12 text-primary text-xs font-extrabold">{step.num}</span>
                      <h4 className="mb-2 text-sm font-bold">{step.title}</h4>
                      <p className="text-[#6F6687] text-[12.8px] leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* analysis panels */}
              <div className="grid gap-3">
                <div className={CS_SIDE}>
                  <h4 className="mb-2 text-sm font-bold">Detected Opportunity</h4>
                  <p className="text-[#6F6687] text-[12.8px] leading-relaxed">
                    {isAnalyzing
                      ? "Analyzing the competitor page…"
                      : competitorAnalysis?.opportunity ||
                        'Click "Analyze Competitor" above to review this URL for gaps, intent alignment, and structural opportunities.'}
                  </p>
                </div>
                <div className={CS_SIDE}>
                  <h4 className="mb-2 text-sm font-bold">Content Gap Signals</h4>
                  {competitorAnalysis && competitorAnalysis.gapSignals.length > 0 ? (
                    <ul className="m-0 pl-4.5 text-[#6F6687] text-[12.8px] leading-relaxed list-disc">
                      {competitorAnalysis.gapSignals.map((g, i) => (
                        <li key={i}>{g}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[#6F6687] text-[12.8px] leading-relaxed">
                      Analytic signals will appear here, showing key terms and entities the
                      competing content fails to target.
                    </p>
                  )}
                </div>
                <div className={CS_SIDE}>
                  <h4 className="mb-2 text-sm font-bold">Recommended Angle</h4>
                  <p className="text-[#6F6687] text-[12.8px] leading-relaxed">
                    {competitorAnalysis?.recommendedAngle ||
                      "Our audit engine will recommend a structural positioning angle to outperform the target page in search results."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* ── generated content output ─────────────── */}
        <Card className={CS_CARD}>
          <div className="p-5.5 pb-0 flex items-start justify-between gap-3.5 flex-wrap">
            <div>
              <h2 className="font-space-grotesk text-xl tracking-tight">Generated Content Output</h2>
              <p className="mt-1.5 text-[#6F6687] text-[13.5px] leading-relaxed">
                AI draft workspace containing output text, readability checklist, and publishing
                integration links.
              </p>
            </div>
            <div className="flex items-center flex-wrap gap-2.5">
              <Button variant="outline" className="border-[#E8E1F5] text-[#261B43]" onClick={handleSaveDraft}>
                Save Draft
              </Button>
              <Button variant="outline" className="border-primary/16 bg-primary/8 text-primary hover:bg-primary/12" onClick={handleOptimize}>
                Optimize
              </Button>
              <Button className="bg-gradient-to-br from-primary to-accent shadow-[0_14px_24px_rgba(99,102,241,.22)]" onClick={handlePublish}>
                Publish
              </Button>
            </div>
          </div>

          {/* toolbar */}
          <div className="flex items-center justify-between gap-3 flex-wrap px-5.5 py-4.5 border-t border-b border-[#E8E1F5] bg-[#FAF8FF]">
            <div className="flex items-center gap-2.5 flex-wrap">
              <button type="button" onClick={handleCopy} className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-[#E8E1F5] bg-white text-[#261B43] text-[12.5px] font-bold">
                <i className="ti ti-copy" /> Copy
              </button>
              <button type="button" onClick={handleRewrite} className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-[#E8E1F5] bg-white text-[#261B43] text-[12.5px] font-bold">
                <i className="ti ti-refresh" /> Rewrite
              </button>
              <button type="button" onClick={handleOptimize} className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-[#E8E1F5] bg-white text-[#261B43] text-[12.5px] font-bold">
                <i className="ti ti-wand" /> Optimize
              </button>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-[#E8E1F5] bg-white/92 text-[#6F6687] text-[12.5px] font-semibold whitespace-nowrap">
                <strong className="text-[#261B43]">Status</strong> <span>{docStatus}</span>
              </span>
            </div>
          </div>

          <div className="p-5.5">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.08fr)_minmax(280px,.92fr)] gap-4">
              {/* draft preview */}
              <div className="p-5.5 border border-[#E8E1F5] rounded-xl bg-gradient-to-b from-white to-[#FCFBFF] min-h-[440px]">
                <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
                  <div>
                    <h3 className="font-space-grotesk text-lg tracking-tight">Draft Preview</h3>
                    <p className="mt-1.5 text-[#6F6687] text-[13.5px] leading-relaxed">
                      This area is prepared for long-form output, rewrites, and future
                      optimization passes.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[#EEF2F6] text-[#6F6687] text-xs font-bold">
                    {docStatus}
                  </div>
                </div>

                {isGenerating ? (
                  <>
                    <div className="flex items-center gap-2.5 p-3.5 border border-[#E8E1F5] rounded-xl bg-[#FAF8FF] text-[#6F6687] text-[13px] leading-relaxed">
                      <strong className="text-[#261B43]">Generating:</strong> Calling the model and structuring your draft —
                      this usually takes a few seconds.
                    </div>
                    <div className="grid gap-4.5 mt-4.5">
                      <div className="h-3 rounded-full bg-gradient-to-r from-primary/14 to-primary/6 w-[30%]" />
                      <div className="h-3 rounded-full bg-gradient-to-r from-primary/14 to-primary/6 w-[58%]" />
                      <div className="grid gap-2.5">
                        <div className="h-3 rounded-full bg-gradient-to-r from-primary/14 to-primary/6 w-full" />
                        <div className="h-3 rounded-full bg-gradient-to-r from-primary/14 to-primary/6 w-full" />
                        <div className="h-3 rounded-full bg-gradient-to-r from-primary/14 to-primary/6 w-[58%]" />
                      </div>
                      <div className="h-3 rounded-full bg-gradient-to-r from-primary/14 to-primary/6 w-[30%]" />
                      <div className="grid gap-2.5">
                        <div className="h-3 rounded-full bg-gradient-to-r from-primary/14 to-primary/6 w-full" />
                        <div className="h-3 rounded-full bg-gradient-to-r from-primary/14 to-primary/6 w-full" />
                        <div className="h-3 rounded-full bg-gradient-to-r from-primary/14 to-primary/6 w-full" />
                        <div className="h-3 rounded-full bg-gradient-to-r from-primary/14 to-primary/6 w-[58%]" />
                      </div>
                    </div>
                  </>
                ) : draft ? (
                  <>
                    <div className="flex items-center gap-2.5 p-3.5 border border-[#E8E1F5] rounded-xl bg-[#FAF8FF] text-[#6F6687] text-[13px] leading-relaxed mb-4">
                      <strong className="text-[#261B43]">Editing:</strong> Tweak the generated Markdown directly below, then
                      click Save Draft to persist your changes.
                    </div>
                    <Textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      rows={20}
                      className={`${CS_FIELD} w-full resize-y text-sm leading-relaxed p-4`}
                    />
                  </>
                ) : (
                  <div className="flex items-center gap-2.5 p-3.5 border border-[#E8E1F5] rounded-xl bg-[#FAF8FF] text-[#6F6687] text-[13px] leading-relaxed">
                    <strong className="text-[#261B43]">No draft yet:</strong> Fill in the prompt and settings above, then
                    click Generate Content to create your first draft.
                  </div>
                )}
              </div>

              {/* sidebar */}
              <aside className="grid gap-3">
                <div className={CS_SIDE}>
                  <h4 className="mb-2 text-sm font-bold">Generation Checklist</h4>
                  <ul className="m-0 pl-4.5 text-[#6F6687] text-[12.8px] leading-relaxed list-disc">
                    <li>Prompt includes target keyword, angle, tone, and CTA.</li>
                    <li>Brief captures audience, intent, and reference inputs.</li>
                    <li>Competitor insights are ready to inform differentiation.</li>
                  </ul>
                </div>

                <div className={CS_SIDE}>
                  <h4 className="mb-2 text-sm font-bold">Content Types Supported</h4>
                  <div className="flex flex-wrap gap-2.5 mt-3">
                    {CONTENT_TAGS.map((tag) => (
                      <span key={tag} className="px-3 py-2 border border-[#E8E1F5] rounded-full bg-white text-[#6F6687] text-[11.5px] font-bold">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className={CS_SIDE}>
                  <h4 className="mb-2 text-sm font-bold">Recent Drafts</h4>
                  {recentDrafts.length === 0 ? (
                    <p className="text-[#6F6687] text-[12.8px] leading-relaxed">Your saved and generated drafts will show up here.</p>
                  ) : (
                    <ul className="m-0 p-0 list-none grid gap-2">
                      {recentDrafts.slice(0, 6).map((d) => (
                        <li key={d.id}>
                          <button
                            type="button"
                            onClick={() => loadDraftIntoEditor(d)}
                            className="w-full text-left block px-3.5 py-2.5 rounded-full border border-[#E8E1F5] bg-[#FAF8FF] text-[#261B43] text-[12.5px] font-bold cursor-pointer hover:-translate-y-px hover:border-primary/35 hover:bg-primary/8 transition-all"
                          >
                            {d.title || d.contentType} · {d.wordCount} words
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
}

/* ── sub-components ─────────────────────────────────── */

function LoadingSpinner() {
  return (
    <i
      className="ti ti-loader st-spin"
      style={{ marginRight: 4 }}
    />
  );
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}

function SelectField({ id, label, value, onChange, options }: SelectFieldProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="text-[12.5px] font-bold text-[#261B43]">{label}</Label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={CS_SELECT}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

interface BriefFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
}

function BriefField({ id, label, value, onChange }: BriefFieldProps) {
  return (
    <div className={CS_SIDE}>
      <Label htmlFor={id} className="block mb-2.5 text-[12.5px] font-bold text-[#261B43]">{label}</Label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-0 p-0 bg-transparent text-[#261B43] text-sm outline-none"
      />
    </div>
  );
}

interface BriefSelectFieldProps extends BriefFieldProps {
  options: readonly string[];
}

function BriefSelectField({ id, label, value, onChange, options }: BriefSelectFieldProps) {
  return (
    <div className={CS_SIDE}>
      <Label htmlFor={id} className="block mb-2.5 text-[12.5px] font-bold text-[#261B43]">{label}</Label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-0 p-0 bg-transparent text-[#261B43] text-sm outline-none cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}