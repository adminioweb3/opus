import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex bg-background">
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <Link href="/" className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="font-bold text-primary-foreground text-xl leading-none">O</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">CITATIONLY</span>
          </Link>
          {children}
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 h-full w-full p-12 flex flex-col justify-end bg-linear-to-br from-primary via-primary/90 to-blue-600">
          {/* SVG grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="auth-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#auth-grid)"/></svg>
          {/* Radial glow */}
          <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10 backdrop-blur-sm bg-white/10 p-8 rounded-2xl max-w-lg border border-white/20">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-4">Master your AI visibility.</h2>
            <p className="text-lg text-white/80 font-medium">
              Join industry leaders monitoring their brand presence across ChatGPT, Gemini, and Claude.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
