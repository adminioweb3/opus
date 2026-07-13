import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { LANDING_PHOTOS } from "@/lib/landing-images"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex bg-background">
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <Link href="/" className="mb-12 block">
            <Logo />
          </Link>
          {children}
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 h-full w-full p-12 flex flex-col justify-end overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LANDING_PHOTOS.teamAtMonitor(1600)}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Brand-tinted gradient so the photo reads as ours, not a stock crop */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/92 via-primary/75 to-blue-600/80" />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/10" />
          {/* SVG grid pattern for texture */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="auth-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#auth-grid)"/></svg>
          {/* Radial glow */}
          <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10 backdrop-blur-sm bg-white/10 p-8 rounded-2xl max-w-lg border border-white/20 shadow-2xl">
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
