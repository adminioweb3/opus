"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Globe, X, Sparkles, Building2, Landmark, Package, Loader2, AlertCircle } from "lucide-react"
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import { Textarea } from "@/components/ui/textarea"
import { INDUSTRIES } from "@/lib/data/industries"
import { COUNTRIES, flagImageUrl } from "@/lib/data/countries"
import { KeywordInput } from "./KeywordInput"
import { suggestKeywordsFromWebsite, detectIndustryFromWebsite } from "@/lib/api/onboardingPrefillApi"

const AUDIENCE_OPTIONS = ["CEO", "CMO", "Marketing Manager", "Agency", "Startup", "Enterprise", "Developer"]

// Shared "click trigger -> absolute panel below it, close on outside click" pattern —
// matches the hand-rolled dropdown already used for the dashboard profile menu, so no new
// shared Popover primitive is introduced just for these two fields.
function useOutsideClose<T extends HTMLElement>(open: boolean, onClose: () => void) {
  const ref = useRef<T>(null)
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open, onClose])
  return ref
}

function FieldLabel({ icon: Icon, children }: { icon: React.ElementType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <label className="flex items-center gap-1.5 text-[12px] font-semibold text-foreground/80 mb-1.5">
      <Icon className="w-3 h-3 text-[#5B5CEB]" />
      {children}
    </label>
  )
}

function IndustryCombobox({ value, onChange, suggestion }: { value: string; onChange: (v: string) => void; suggestion?: string }) {
  const [open, setOpen] = useState(false)
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false))
  const showSuggestion = suggestion && !value

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`w-full h-11 rounded-lg border px-3.5 flex items-center justify-between text-[13.5px] font-medium transition-colors focus:outline-none focus:ring-4 ${
          showSuggestion
            ? "border-primary/30 bg-primary/5 focus:border-[#5B5CEB] focus:ring-[#5B5CEB]/10"
            : "border-black/10 bg-white hover:border-black/20 focus:border-[#5B5CEB] focus:ring-[#5B5CEB]/10"
        }`}
      >
        <div className="flex items-center gap-2">
          <span className={value ? "text-foreground" : "text-muted-foreground"}>{value || suggestion || "Select industry"}</span>
          {showSuggestion && <span className="text-xs px-1.5 py-0.5 rounded-full bg-primary/20 text-primary font-semibold">AI Suggested</span>}
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute z-30 mt-2 w-full rounded-xl border border-black/10 bg-white shadow-[0_20px_50px_-12px_rgba(30,27,75,0.25)] overflow-hidden">
          <Command className="rounded-xl! bg-white">
            <CommandInput placeholder="Search industries..." autoFocus />
            <CommandList>
              <CommandEmpty>No industry found.</CommandEmpty>
              <CommandGroup>
                {INDUSTRIES.map((ind) => (
                  <CommandItem
                    key={ind}
                    value={ind}
                    data-checked={ind === value}
                    onSelect={() => {
                      onChange(ind)
                      setOpen(false)
                    }}
                  >
                    {ind}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  )
}

function CountrySelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false))
  const selected = useMemo(() => COUNTRIES.find((c) => c.name === value), [value])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="w-full h-11 rounded-lg border border-black/10 bg-white px-3.5 flex items-center justify-between text-[13.5px] font-medium transition-colors hover:border-black/20 focus:outline-none focus:border-[#5B5CEB] focus:ring-4 focus:ring-[#5B5CEB]/10"
      >
        <span className={`flex items-center gap-2 ${value ? "text-foreground" : "text-muted-foreground"}`}>
          {selected && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={flagImageUrl(selected.code)} alt="" className="w-4 h-3 rounded-xs object-cover shrink-0" />
          )}
          {value || "Select country"}
        </span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute z-30 mt-2 w-full rounded-xl border border-black/10 bg-white shadow-[0_20px_50px_-12px_rgba(30,27,75,0.25)] overflow-hidden">
          <Command className="rounded-xl! bg-white">
            <CommandInput placeholder="Search countries..." autoFocus />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {COUNTRIES.map((c) => (
                  <CommandItem
                    key={c.code}
                    value={c.name}
                    data-checked={c.name === value}
                    onSelect={() => {
                      onChange(c.name)
                      setOpen(false)
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={flagImageUrl(c.code)} alt="" className="w-4 h-3 rounded-xs object-cover shrink-0 mr-1" />
                    {c.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  )
}

function AudienceMultiSelect({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [draft, setDraft] = useState("")

  const toggle = (opt: string) => {
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt])
  }
  
  const commit = () => {
    const tag = draft.trim()
    if (tag && !value.includes(tag)) onChange([...value, tag])
    setDraft("")
  }

  // Combine predefined options with any custom ones that were selected
  const displayOptions = Array.from(new Set([...AUDIENCE_OPTIONS, ...value]))

  return (
    <div className="flex flex-wrap gap-1.5" role="group" aria-label="Target audience">
      {displayOptions.map((opt) => {
        const active = value.includes(opt)
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            aria-pressed={active}
            className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all duration-150 ${
              active
                ? "bg-[#5B5CEB] text-white shadow-[0_6px_16px_-4px_rgba(91,92,235,0.5)]"
                : "bg-white text-foreground/70 ring-1 ring-black/10 hover:ring-black/20"
            }`}
          >
            {opt}
          </button>
        )
      })}
      
      <input
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault()
            commit()
          }
        }}
        onBlur={commit}
        placeholder="+ Add custom..."
        className="px-3 py-1.5 rounded-full text-[12px] font-medium bg-white text-foreground ring-1 ring-black/10 outline-none focus:ring-[#5B5CEB] min-w-[120px] transition-all"
      />
    </div>
  )
}

export interface BusinessStepData {
  businessName: string
  websiteUrl: string
  industry: string
  customIndustry: string
  country: string
  targetAudience: string
  products: string
  keywords: string
}

interface BusinessStepProps {
  data: BusinessStepData
  onChange: (field: keyof BusinessStepData, value: string) => void
  onSubmit: () => void
}

// Step 2: sectioned business-details form with AI prefilling
export function BusinessStep({ data, onChange, onSubmit }: BusinessStepProps) {
  const [suggestions, setSuggestions] = useState<{ industry?: string; keywords: string[] }>({ keywords: [] })
  const [loading, setLoading] = useState(false)
  const suggestionsLoadedRef = useRef(false)

  const audienceList = useMemo(
    () => (data.targetAudience ? data.targetAudience.split(",").map((s) => s.trim()).filter(Boolean) : []),
    [data.targetAudience]
  )
  const keywordList = useMemo(
    () => (data.keywords ? data.keywords.split(",").map((s) => s.trim()).filter(Boolean) : []),
    [data.keywords]
  )

  // Fetch prefilling suggestions on mount
  useEffect(() => {
    if (suggestionsLoadedRef.current || !data.websiteUrl || !data.businessName) return
    suggestionsLoadedRef.current = true

    const fetchSuggestions = async () => {
      try {
        setLoading(true)
        const [keywordSuggestions, industrySuggestion] = await Promise.all([
          suggestKeywordsFromWebsite(data.websiteUrl, data.businessName, data.industry),
          detectIndustryFromWebsite(data.websiteUrl, data.businessName)
        ])
        setSuggestions({
          industry: industrySuggestion.industry,
          keywords: keywordSuggestions
        })
      } catch (error) {
        console.error("Failed to fetch suggestions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSuggestions()
  }, [data.websiteUrl, data.businessName])

  const isIndustryValid = data.industry !== "Other" || (data.industry === "Other" && data.customIndustry.trim().length > 0)
  const isKeywordsValid = keywordList.length >= 5
  const valid = data.businessName.trim().length > 0 && isIndustryValid && isKeywordsValid

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h1 className="text-lg sm:text-xl font-bold tracking-[-0.02em] text-foreground mb-1.5">
        Tell us about your business
      </h1>
      <p className="text-[12.5px] text-muted-foreground mb-4">
        A few details so we can tailor the report to your market and audience.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (valid) onSubmit()
        }}
        className="space-y-3"
      >
        {/* Section 1: Company */}
        <section className="rounded-lg bg-white ring-1 ring-black/[0.05] p-3.5">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#5B5CEB]/10">
              <Building2 className="w-3 h-3 text-[#5B5CEB]" />
            </span>
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-foreground/70">Company</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <FieldLabel icon={Building2}>Organization name</FieldLabel>
              <input
                value={data.businessName}
                onChange={(e) => onChange("businessName", e.target.value)}
                placeholder="Acme Inc."
                required
                className="w-full h-10 rounded-lg border border-black/10 bg-white px-3 text-[13px] font-medium outline-none transition-colors focus:border-[#5B5CEB] focus:ring-4 focus:ring-[#5B5CEB]/10"
              />
            </div>
            <div>
              <FieldLabel icon={Globe}>Website</FieldLabel>
              <div className="w-full h-10 rounded-lg border border-black/5 bg-[#F8FAFC] px-3 flex items-center gap-2 text-[13px] font-medium text-muted-foreground">
                <Globe className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{data.websiteUrl || "—"}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Market */}
        <section className="rounded-lg bg-white ring-1 ring-black/[0.05] p-3.5">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#7C3AED]/10">
              <Landmark className="w-3 h-3 text-[#7C3AED]" />
            </span>
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-foreground/70">Market</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <div>
              <FieldLabel icon={Landmark}>Industry</FieldLabel>
              <IndustryCombobox value={data.industry} onChange={(v) => onChange("industry", v)} suggestion={suggestions.industry} />
            </div>
            <div>
              <FieldLabel icon={Globe}>Country</FieldLabel>
              <CountrySelect value={data.country} onChange={(v) => onChange("country", v)} />
            </div>
          </div>
          {data.industry === "Other" && (
            <div className="mb-3">
              <Textarea
                value={data.customIndustry}
                onChange={(e) => onChange("customIndustry", e.target.value)}
                placeholder="Describe your industry in a few words"
                rows={2}
                required
                className="w-full text-[13px] rounded-lg border-black/10 focus-visible:border-[#5B5CEB] focus-visible:ring-[#5B5CEB]/10"
              />
            </div>
          )}
          <div>
            <FieldLabel icon={Sparkles}>Target audience</FieldLabel>
            <AudienceMultiSelect
              value={audienceList}
              onChange={(list) => onChange("targetAudience", list.join(", "))}
            />
          </div>
        </section>

        {/* Section 3: Offerings */}
        <section className="rounded-lg bg-white ring-1 ring-black/[0.05] p-3.5">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#22C55E]/10">
              <Package className="w-3 h-3 text-[#22C55E]" />
            </span>
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-foreground/70">Offerings</h2>
          </div>
          <div className="space-y-3">
            <div>
              <FieldLabel icon={Package}>Products / services</FieldLabel>
              <Textarea
                value={data.products}
                onChange={(e) => onChange("products", e.target.value)}
                placeholder="Describe what you sell or offer..."
                rows={2}
                className="rounded-lg border-black/10 text-[13px] py-2 min-h-0 focus-visible:border-[#5B5CEB] focus-visible:ring-[#5B5CEB]/10"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FieldLabel icon={Sparkles}>Keywords</FieldLabel>
                {loading && <Loader2 className="w-3 h-3 animate-spin text-primary" />}
              </div>
              <KeywordInput
                value={data.keywords}
                onChange={(val) => onChange("keywords", val)}
                minKeywords={5}
                maxKeywords={10}
                suggestions={suggestions.keywords}
              />
              <p className="text-[11.5px] text-muted-foreground mt-1.5 leading-snug">
                The more precise your keywords, the better we track your buyers' real questions.
              </p>
            </div>
          </div>
        </section>

        <button
          type="submit"
          disabled={!valid}
          className="hidden lg:flex w-full h-11 rounded-lg bg-gradient-to-r from-[#5B5CEB] to-[#7C3AED] text-white font-semibold text-[13px] items-center justify-center gap-2 shadow-[0_12px_28px_-8px_rgba(91,92,235,0.5)] transition-all hover:shadow-[0_14px_34px_-6px_rgba(91,92,235,0.6)] disabled:opacity-30 disabled:shadow-none disabled:cursor-not-allowed"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Generate AI Visibility Report
        </button>
      </form>
    </motion.div>
  )
}
