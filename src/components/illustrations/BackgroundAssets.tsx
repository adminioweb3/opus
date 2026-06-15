export function NeuralNetworkBg({ className = "" }: { className?: string }) {
  return (
    <svg className={`absolute inset-0 w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <defs>
        <pattern id="neural-net" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="2" fill="currentColor" />
          <circle cx="80" cy="30" r="2" fill="currentColor" />
          <circle cx="40" cy="80" r="2" fill="currentColor" />
          <circle cx="90" cy="90" r="2" fill="currentColor" />
          <path d="M 20 20 L 80 30 L 40 80 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
          <path d="M 80 30 L 90 90 L 40 80" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#neural-net)" />
    </svg>
  )
}

export function DataFlowBg({ className = "" }: { className?: string }) {
  return (
    <svg className={`absolute inset-0 w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M 0,50 Q 25,20 50,50 T 100,50" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <path d="M 0,70 Q 30,100 60,70 T 100,70" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <path d="M 0,30 Q 40,0 80,30 T 100,30" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1" />
    </svg>
  )
}

export function AiMeshBg({ className = "" }: { className?: string }) {
  return (
    <svg className={`absolute inset-0 w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="ai-mesh" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 0 20 L 20 0 L 40 20 L 20 40 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ai-mesh)" />
    </svg>
  )
}
