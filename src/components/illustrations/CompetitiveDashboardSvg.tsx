export function CompetitiveDashboardSvg() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-full drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
      {/* Base App Window */}
      <rect x="0" y="0" width="800" height="500" rx="16" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
      
      {/* Header */}
      <rect x="0" y="0" width="800" height="64" rx="16" fill="#ffffff" />
      <line x1="0" y1="64" x2="800" y2="64" stroke="#E2E8F0" strokeWidth="1" />
      <rect x="32" y="24" width="160" height="16" rx="4" fill="#0F172A" />
      
      {/* Main Content Area */}
      {/* Market Share Graph (Multi-line) */}
      <rect x="32" y="96" width="468" height="372" rx="12" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1" />
      <text x="56" y="132" fill="#0F172A" fontSize="16" fontWeight="bold" fontFamily="sans-serif">Market Share Comparison</text>
      
      {/* Grid */}
      <line x1="56" y1="180" x2="476" y2="180" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4" />
      <line x1="56" y1="260" x2="476" y2="260" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4" />
      <line x1="56" y1="340" x2="476" y2="340" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4" />
      <line x1="56" y1="420" x2="476" y2="420" stroke="#E2E8F0" strokeWidth="1" />
      
      {/* Lines */}
      {/* OPUS Line */}
      <path d="M 56 400 L 120 380 L 180 320 L 240 280 L 300 300 L 360 210 L 420 190 L 476 140" fill="none" stroke="#2563EB" strokeWidth="3" />
      <circle cx="476" cy="140" r="5" fill="#ffffff" stroke="#2563EB" strokeWidth="3" />
      <text x="440" y="125" fill="#2563EB" fontSize="12" fontWeight="bold" fontFamily="sans-serif">OPUS</text>
      
      {/* Competitor A */}
      <path d="M 56 300 L 120 290 L 180 310 L 240 340 L 300 330 L 360 380 L 420 370 L 476 390" fill="none" stroke="#94A3B8" strokeWidth="2" strokeDasharray="6" />
      
      {/* Competitor B */}
      <path d="M 56 220 L 120 200 L 180 250 L 240 240 L 300 210 L 360 250 L 420 240 L 476 280" fill="none" stroke="#64748B" strokeWidth="2" strokeDasharray="6" />

      {/* Visibility Comparison Bar Chart */}
      <rect x="524" y="96" width="244" height="372" rx="12" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1" />
      <text x="548" y="132" fill="#0F172A" fontSize="16" fontWeight="bold" fontFamily="sans-serif">Visibility by Competitor</text>
      
      <g transform="translate(548, 180)">
        {/* OPUS */}
        <text x="0" y="12" fill="#0F172A" fontSize="12" fontWeight="bold" fontFamily="sans-serif">OPUS</text>
        <rect x="0" y="20" width="180" height="24" rx="4" fill="#2563EB" />
        <text x="190" y="36" fill="#0F172A" fontSize="12" fontWeight="bold" fontFamily="sans-serif">84</text>
        
        {/* Comp A */}
        <text x="0" y="76" fill="#64748B" fontSize="12" fontFamily="sans-serif">Competitor A</text>
        <rect x="0" y="84" width="120" height="24" rx="4" fill="#94A3B8" opacity="0.5" />
        <text x="130" y="100" fill="#64748B" fontSize="12" fontFamily="sans-serif">52</text>
        
        {/* Comp B */}
        <text x="0" y="140" fill="#64748B" fontSize="12" fontFamily="sans-serif">Competitor B</text>
        <rect x="0" y="148" width="150" height="24" rx="4" fill="#64748B" opacity="0.5" />
        <text x="160" y="164" fill="#64748B" fontSize="12" fontFamily="sans-serif">68</text>
        
        {/* Comp C */}
        <text x="0" y="204" fill="#64748B" fontSize="12" fontFamily="sans-serif">Competitor C</text>
        <rect x="0" y="212" width="60" height="24" rx="4" fill="#E2E8F0" />
        <text x="70" y="228" fill="#64748B" fontSize="12" fontFamily="sans-serif">24</text>
      </g>
      
    </svg>
  )
}
