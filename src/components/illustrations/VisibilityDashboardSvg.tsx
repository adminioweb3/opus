export function VisibilityDashboardSvg() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-full drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="vis-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {/* Base App Window */}
      <rect x="0" y="0" width="800" height="500" rx="16" fill="#ffffff" stroke="#E2E8F0" strokeWidth="2" />
      
      {/* Sidebar */}
      <rect x="0" y="0" width="64" height="500" rx="16" fill="#F8FAFC" className="border-r border-[#E2E8F0]" />
      <circle cx="32" cy="40" r="16" fill="#000068" />
      <rect x="20" y="100" width="24" height="24" rx="6" fill="#2563EB" fillOpacity="0.1" />
      <rect x="20" y="148" width="24" height="24" rx="6" fill="#94A3B8" fillOpacity="0.2" />
      <rect x="20" y="196" width="24" height="24" rx="6" fill="#94A3B8" fillOpacity="0.2" />
      
      {/* Header */}
      <rect x="64" y="0" width="736" height="64" fill="#ffffff" />
      <line x1="64" y1="64" x2="800" y2="64" stroke="#E2E8F0" strokeWidth="1" />
      <rect x="96" y="24" width="200" height="16" rx="4" fill="#0F172A" />
      
      {/* Main Content Area */}
      {/* Top Cards */}
      <rect x="96" y="96" width="200" height="120" rx="12" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1" />
      <text x="116" y="128" fill="#64748B" fontSize="14" fontFamily="sans-serif">Global Visibility Score</text>
      <text x="116" y="172" fill="#0F172A" fontSize="36" fontWeight="bold" fontFamily="sans-serif">84</text>
      <path d="M 176 160 L 190 146 L 200 156 L 220 136" fill="none" stroke="#10B981" strokeWidth="2" />
      
      <rect x="320" y="96" width="200" height="120" rx="12" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1" />
      <text x="340" y="128" fill="#64748B" fontSize="14" fontFamily="sans-serif">Share of Voice</text>
      <text x="340" y="172" fill="#0F172A" fontSize="36" fontWeight="bold" fontFamily="sans-serif">62%</text>
      <path d="M 400 160 L 414 146 L 424 156 L 444 136" fill="none" stroke="#10B981" strokeWidth="2" />

      <rect x="544" y="96" width="200" height="120" rx="12" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1" />
      <text x="564" y="128" fill="#64748B" fontSize="14" fontFamily="sans-serif">Active Citations</text>
      <text x="564" y="172" fill="#0F172A" fontSize="36" fontWeight="bold" fontFamily="sans-serif">12.4k</text>
      
      {/* Trend Graph Area */}
      <rect x="96" y="248" width="648" height="220" rx="12" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1" />
      <text x="120" y="280" fill="#0F172A" fontSize="16" fontWeight="bold" fontFamily="sans-serif">Visibility Trend</text>
      
      {/* Graph Grid */}
      <line x1="120" y1="320" x2="700" y2="320" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4" />
      <line x1="120" y1="370" x2="700" y2="370" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4" />
      <line x1="120" y1="420" x2="700" y2="420" stroke="#E2E8F0" strokeWidth="1" />
      
      {/* Graph Area / Line */}
      <path d="M 120 420 L 120 380 Q 200 350 280 370 T 440 300 T 600 330 L 700 280 L 700 420 Z" fill="url(#vis-grad)" />
      <path d="M 120 380 Q 200 350 280 370 T 440 300 T 600 330 L 700 280" fill="none" stroke="#2563EB" strokeWidth="3" />
      
      {/* Data Points */}
      <circle cx="280" cy="370" r="4" fill="#ffffff" stroke="#2563EB" strokeWidth="2" />
      <circle cx="440" cy="300" r="4" fill="#ffffff" stroke="#2563EB" strokeWidth="2" />
      <circle cx="600" cy="330" r="4" fill="#ffffff" stroke="#2563EB" strokeWidth="2" />
      <circle cx="700" cy="280" r="4" fill="#ffffff" stroke="#2563EB" strokeWidth="2" />
    </svg>
  )
}
