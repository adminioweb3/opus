import { Navbar } from "@/components/layouts/Navbar"
import { Footer } from "@/components/layouts/Footer"
import { SmoothScroll } from "@/components/features/landing/primitives/SmoothScroll"

// Every marketing page in this group gets the floating Navbar and shared Footer for free.
// Navbar defaults to heroVariant="light" (dark text at top), so pages here must open on a
// light background — PageHero handles that.
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-background relative selection:bg-primary/20">
        <Navbar />
        {children}
        <Footer />
      </main>
    </SmoothScroll>
  )
}
