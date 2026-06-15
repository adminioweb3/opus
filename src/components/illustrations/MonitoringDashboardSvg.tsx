export function MonitoringDashboardSvg() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-full drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
      {/* Base App Window */}
      <rect x="0" y="0" width="800" height="500" rx="16" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
      
      {/* Header */}
      <rect x="0" y="0" width="800" height="64" rx="16" fill="#ffffff" />
      <line x1="0" y1="64" x2="800" y2="64" stroke="#E2E8F0" strokeWidth="1" />
      <rect x="32" y="24" width="160" height="16" rx="4" fill="#0F172A" />
      <rect x="680" y="20" width="88" height="24" rx="12" fill="#10B981" fillOpacity="0.1" />
      <circle cx="692" cy="32" r="4" fill="#10B981" />
      <text x="704" y="36" fill="#10B981" fontSize="12" fontWeight="bold" fontFamily="sans-serif">LIVE</text>
      
      {/* Split Pane */}
      {/* Left: Feed */}
      <rect x="32" y="96" width="340" height="372" rx="12" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1" />
      
      {/* Feed Items */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(0, ${116 + i * 80})`}>
          <rect x="48" y="0" width="308" height="64" rx="8" fill="#F8FAFC" />
          <circle cx="72" cy="32" r="12" fill={i % 2 === 0 ? "#10A37F" : "#4285F4"} />
          <rect x="96" y="16" width="200" height="10" rx="4" fill="#0F172A" />
          <rect x="96" y="38" width="140" height="8" rx="4" fill="#64748B" opacity="0.5" />
          <rect x="320" y="24" width="24" height="16" rx="8" fill="#10B981" fillOpacity="0.2" />
        </g>
      ))}

      {/* Right: Charts */}
      <rect x="400" y="96" width="368" height="372" rx="12" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1" />
      <text x="424" y="132" fill="#0F172A" fontSize="16" fontWeight="bold" fontFamily="sans-serif">Platform Activity</text>
      
      {/* Activity Bars */}
      <g transform="translate(424, 180)">
        {/* ChatGPT */}
        <text x="0" y="12" fill="#64748B" fontSize="12" fontFamily="sans-serif">ChatGPT</text>
        <rect x="80" y="2" width="220" height="12" rx="6" fill="#10A37F" />
        
        {/* Gemini */}
        <text x="0" y="44" fill="#64748B" fontSize="12" fontFamily="sans-serif">Gemini</text>
        <rect x="80" y="34" width="160" height="12" rx="6" fill="#4285F4" />
        
        {/* Claude */}
        <text x="0" y="76" fill="#64748B" fontSize="12" fontFamily="sans-serif">Claude</text>
        <rect x="80" y="66" width="190" height="12" rx="6" fill="#D97757" />
        
        {/* Perplexity */}
        <text x="0" y="108" fill="#64748B" fontSize="12" fontFamily="sans-serif">Perplexity</text>
        <rect x="80" y="98" width="120" height="12" rx="6" fill="#22B8CD" />
      </g>
      
      {/* Bottom Chart */}
      <rect x="424" y="320" width="320" height="120" rx="8" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
      <path d="M 424 440 L 424 400 L 460 380 L 480 390 L 520 340 L 560 360 L 600 330 L 640 350 L 680 320 L 720 340 L 744 320 L 744 440 Z" fill="#2563EB" opacity="0.1" />
      <path d="M 424 400 L 460 380 L 480 390 L 520 340 L 560 360 L 600 330 L 640 350 L 680 320 L 720 340 L 744 320" fill="none" stroke="#2563EB" strokeWidth="2" />
      
    </svg>
  )
}
