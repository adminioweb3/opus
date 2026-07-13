import {
  Gauge, Quote, Eye, PieChart, LineChart, Swords, Wand2, FileBadge, FileText,
  Megaphone, Search, Building2, Layers, Landmark, HeartPulse, DollarSign, ShoppingBag,
  BookOpen, GraduationCap, FileCode, Plug, Puzzle, Newspaper, LifeBuoy,
  Info, Briefcase, Mail, ShieldCheck, Lock, Map, History,
  type LucideIcon,
} from "lucide-react"

export interface NavItem {
  icon: LucideIcon
  title: string
  desc: string
  href: string
}

export interface NavGroup {
  key: string
  label: string
  items: NavItem[]
  footer?: { label: string; href: string }
}

export const PLATFORM_MENU: NavGroup = {
  key: "platform",
  label: "Platform",
  footer: { label: "See the full platform overview", href: "/features" },
  items: [
    { icon: Gauge, title: "AI Visibility Dashboard", desc: "One real-time score for every AI platform tracking your brand.", href: "/features" },
    { icon: Quote, title: "AI Citation Tracking", desc: "See exactly which sources AI engines cite instead of you.", href: "/features" },
    { icon: Eye, title: "Brand Monitoring", desc: "Know the moment an AI answer misrepresents your brand.", href: "/features" },
    { icon: PieChart, title: "Share of Voice", desc: "Your real presence in AI answers, benchmarked weekly.", href: "/features" },
    { icon: LineChart, title: "AI Search Analytics", desc: "Prompt-level analytics across every engine you're monitored on.", href: "/features" },
    { icon: Swords, title: "Competitor Intelligence", desc: "Track who's winning the answers you should own.", href: "/features" },
    { icon: Wand2, title: "GEO Optimization", desc: "Concrete, prioritized fixes for generative engine visibility.", href: "/features" },
    { icon: FileBadge, title: "AEO Optimization", desc: "Structure content so AI engines can lift it directly.", href: "/features" },
    { icon: FileText, title: "Reports", desc: "Executive-ready reporting, exportable in one click.", href: "/features" },
  ],
}

export const SOLUTIONS_MENU: NavGroup = {
  key: "solutions",
  label: "Solutions",
  footer: { label: "Explore every solution", href: "/solutions" },
  items: [
    { icon: Megaphone, title: "Marketing Teams", desc: "Prove AI-sourced pipeline and defend budget with real data.", href: "/solutions" },
    { icon: Search, title: "SEO Teams", desc: "Extend your existing stack into GEO and AEO.", href: "/solutions" },
    { icon: Building2, title: "Agencies", desc: "White-labelled visibility reporting across every client.", href: "/solutions" },
    { icon: Layers, title: "SaaS", desc: "Benchmark share of voice against direct competitors.", href: "/solutions" },
    { icon: Landmark, title: "Enterprise", desc: "Executive reporting and SOC 2-aligned security at scale.", href: "/solutions" },
    { icon: HeartPulse, title: "Healthcare", desc: "Accurate, compliant AI representation for patient-facing brands.", href: "/solutions" },
    { icon: DollarSign, title: "Finance", desc: "Monitor AI answers on regulated, high-trust topics.", href: "/solutions" },
    { icon: ShoppingBag, title: "Retail", desc: "Win product-recommendation prompts before competitors do.", href: "/solutions" },
  ],
}

export const RESOURCES_MENU: NavGroup = {
  key: "resources",
  label: "Resources",
  footer: { label: "Visit the resource center", href: "/resources" },
  items: [
    { icon: BookOpen, title: "Blog", desc: "Insights on AI search, GEO, and brand visibility.", href: "/blog" },
    { icon: GraduationCap, title: "AI Search Academy", desc: "Guides for mastering generative engine optimization.", href: "/resources" },
    { icon: FileCode, title: "Documentation", desc: "Everything you need to integrate Citationly.", href: "/resources" },
    { icon: Plug, title: "API", desc: "Build custom visibility workflows on our API.", href: "/resources" },
    { icon: Puzzle, title: "Integrations", desc: "Connect Citationly to the tools your team already uses.", href: "/resources" },
    { icon: Newspaper, title: "Case Studies", desc: "Real results from real Citationly customers.", href: "/case-studies" },
    { icon: LifeBuoy, title: "Help Center", desc: "Answers to common setup and account questions.", href: "/resources" },
  ],
}

export const COMPANY_MENU: NavGroup = {
  key: "company",
  label: "Company",
  footer: { label: "About Citationly", href: "/about" },
  items: [
    { icon: Info, title: "About", desc: "Our mission to make AI visibility measurable.", href: "/about" },
    { icon: Briefcase, title: "Careers", desc: "Help build the AI visibility category.", href: "/careers" },
    { icon: Mail, title: "Contact", desc: "Talk to our team about your use case.", href: "/contact" },
    { icon: ShieldCheck, title: "Security", desc: "How we protect your data and your customers'.", href: "/security" },
    { icon: Lock, title: "Privacy", desc: "Our commitment to responsible data handling.", href: "/privacy" },
    { icon: Map, title: "Roadmap", desc: "What we're building next.", href: "/changelog" },
    { icon: History, title: "Changelog", desc: "Every shipped improvement, in order.", href: "/changelog" },
  ],
}

export const NAV_GROUPS: NavGroup[] = [PLATFORM_MENU, SOLUTIONS_MENU, RESOURCES_MENU, COMPANY_MENU]
