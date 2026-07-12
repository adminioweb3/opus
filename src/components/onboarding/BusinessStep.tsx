"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Globe, X, Sparkles, Building2, Landmark, Package } from "lucide-react"
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

function IndustryCombobox({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false))

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="w-full h-11 rounded-lg border border-black/10 bg-white px-3.5 flex items-center justify-between text-[13.5px] font-medium transition-colors hover:border-black/20 focus:outline-none focus:border-[#5B5CEB] focus:ring-4 focus:ring-[#5B5CEB]/10"
      >
        <span className={value ? "text-foreground" : "text-muted-foreground"}>{value || "Select industry"}</span>
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
  const toggle = (opt: string) => {
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt])
  }
  return (
    <div className="flex flex-wrap gap-1.5" role="group" aria-label="Target audience">
      {AUDIENCE_OPTIONS.map((opt) => {
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
    </div>
  )
}

function KeywordTagInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [draft, setDraft] = useState("")

  const commit = () => {
    const tag = draft.trim()
    if (tag && !value.includes(tag)) onChange([...value, tag])
    setDraft("")
  }

  return (
    <div
      className="min-h-11 w-full rounded-lg border border-black/10 bg-white px-2.5 py-1.5 flex flex-wrap items-center gap-1.5 transition-colors focus-within:border-[#5B5CEB] focus-within:ring-4 focus-within:ring-[#5B5CEB]/10"
      onClick={(e) => (e.currentTarget.querySelector("input") as HTMLInputElement | null)?.focus()}
    >
      {value.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1 rounded-full bg-[#5B5CEB]/8 text-[#5B5CEB] text-[12.5px] font-medium"
        >
          {tag}
          <button
            type="button"
            aria-label={`Remove ${tag}`}
            onClick={() => onChange(value.filter((t) => t !== tag))}
            className="rounded-full hover:bg-[#5B5CEB]/15 p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(e) => {
          if (e.target.value.endsWith(",")) {
            setDraft(e.target.value.slice(0, -1))
            commit()
          } else {
            setDraft(e.target.value)
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            commit()
          } else if (e.key === "Backspace" && !draft && value.length > 0) {
            onChange(value.slice(0, -1))
          }
        }}
        onBlur={commit}
        placeholder={value.length === 0 ? "Type a keyword and press Enter..." : ""}
        className="flex-1 min-w-24 h-7 bg-transparent text-[13.5px] outline-none placeholder:text-muted-foreground/50"
      />
    </div>
  )
}

export interface BusinessStepData {
  businessName: string
  websiteUrl: string
  industry: string
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

// Step 2: sectioned business-details form (Company / Market / Offerings) instead of one
// long stacked list. Audience + keywords are stored as comma-joined strings on the shared
// journey-store field (unchanged shape for downstream consumers) while presented as chips/tags.
export function BusinessStep({ data, onChange, onSubmit }: BusinessStepProps) {
  const audienceList = useMemo(
    () => (data.targetAudience ? data.targetAudience.split(",").map((s) => s.trim()).filter(Boolean) : []),
    [data.targetAudience]
  )
  const keywordList = useMemo(
    () => (data.keywords ? data.keywords.split(",").map((s) => s.trim()).filter(Boolean) : []),
    [data.keywords]
  )

  const valid = data.businessName.trim().length > 0

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
              <IndustryCombobox value={data.industry} onChange={(v) => onChange("industry", v)} />
            </div>
            <div>
              <FieldLabel icon={Globe}>Country</FieldLabel>
              <CountrySelect value={data.country} onChange={(v) => onChange("country", v)} />
            </div>
          </div>
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
              <FieldLabel icon={Sparkles}>Keywords</FieldLabel>
              <KeywordTagInput
                value={keywordList}
                onChange={(list) => onChange("keywords", list.join(", "))}
              />
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
