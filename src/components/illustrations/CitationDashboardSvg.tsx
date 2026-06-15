export function CitationDashboardSvg() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-full drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
      {/* Base App Window */}
      <rect x="0" y="0" width="800" height="500" rx="16" fill="#ffffff" stroke="#E2E8F0" strokeWidth="2" />
      
      {/* Header */}
      <rect x="0" y="0" width="800" height="64" rx="16" fill="#F8FAFC" />
      <line x1="0" y1="64" x2="800" y2="64" stroke="#E2E8F0" strokeWidth="1" />
      <rect x="32" y="24" width="160" height="16" rx="4" fill="#0F172A" />
      
      <rect x="32" y="96" width="340" height="372" rx="12" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1" />
      <text x="56" y="132" fill="#0F172A" fontSize="16" fontWeight="bold" fontFamily="sans-serif">Source Distribution</text>
      
      {/* Donut Chart */}
      <g transform="translate(202, 260)">
        <circle cx="0" cy="0" r="80" fill="none" stroke="#F1F5F9" strokeWidth="30" />
        {/* Segment 1 */}
        <path d="M 0 -80 A 80 80 0 0 1 76 25" fill="none" stroke="#2563EB" strokeWidth="30" strokeLinecap="round" />
        {/* Segment 2 */}
        <path d="M 76 25 A 80 80 0 0 1 -40 69" fill="none" stroke="#000068" strokeWidth="30" strokeLinecap="round" />
        {/* Segment 3 */}
        <path d="M -40 69 A 80 80 0 0 1 -76 -25" fill="none" stroke="#38BDF8" strokeWidth="30" strokeLinecap="round" />
        
        <text x="0" y="-5" textAnchor="middle" fill="#0F172A" fontSize="32" fontWeight="bold" fontFamily="sans-serif">2.4k</text>
        <text x="0" y="15" textAnchor="middle" fill="#64748B" fontSize="12" fontFamily="sans-serif">Total Citations</text>
      </g>

      {/* Authority Metric */}
      <rect x="400" y="96" width="368" height="150" rx="12" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1" />
      <text x="424" y="132" fill="#0F172A" fontSize="16" fontWeight="bold" fontFamily="sans-serif">Domain Authority Score</text>
      <rect x="424" y="160" width="320" height="16" rx="8" fill="#F1F5F9" />
      <rect x="424" y="160" width="260" height="16" rx="8" fill="#10B981" />
      <text x="424" y="210" fill="#10B981" fontSize="32" fontWeight="bold" fontFamily="sans-serif">82/100</text>
      <text x="520" y="205" fill="#64748B" fontSize="12" fontFamily="sans-serif">Top 5% of your industry</text>

      {/* Citation List */}
      <rect x="400" y="270" width="368" height="198" rx="12" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1" />
      <text x="424" y="306" fill="#0F172A" fontSize="16" fontWeight="bold" fontFamily="sans-serif">Top Performing URLs</text>
      
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(424, ${330 + i * 40})`}>
          <rect x="0" y="0" width="320" height="32" rx="6" fill="#F8FAFC" />
          <rect x="12" y="10" width="180" height="12" rx="4" fill="#0F172A" opacity="0.8" />
          <rect x="260" y="10" width="48" height="12" rx="4" fill="#2563EB" opacity="0.2" />
        </g>
      ))}

    </svg>
  )
}
