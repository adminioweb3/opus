import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/ui/logo"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <Logo />
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm mb-8">
              The enterprise standard for AI Search Optimization and LLM Visibility. Monitor and optimize your Share of Voice across ChatGPT, Gemini, and Claude.
            </p>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">Subscribe to our newsletter</h4>
              <div className="flex gap-2">
                <Input placeholder="Enter your email" type="email" className="max-w-60 text-sm" />
                <Button className="text-sm">Subscribe</Button>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/features" className="hover:text-primary transition-colors">AI Visibility Tracking</Link></li>
              <li><Link href="/solutions" className="hover:text-primary transition-colors">AI Search Optimization</Link></li>
              <li><Link href="/features" className="hover:text-primary transition-colors">ChatGPT SEO</Link></li>
              <li><Link href="/features" className="hover:text-primary transition-colors">LLM Share of Voice</Link></li>
              <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog & News</Link></li>
              <li><Link href="/case-studies" className="hover:text-primary transition-colors">Case Studies</Link></li>
              <li><Link href="/resources" className="hover:text-primary transition-colors">GEO Guidelines</Link></li>
              <li><Link href="/security" className="hover:text-primary transition-colors">Security</Link></li>
              <li><Link href="/changelog" className="hover:text-primary transition-colors">Roadmap</Link></li>
              <li><Link href="/status" className="hover:text-primary transition-colors">System Status</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Sales</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Citationly Inc. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link href="https://twitter.com" className="hover:text-primary transition-colors">Twitter</Link>
            <Link href="https://linkedin.com" className="hover:text-primary transition-colors">LinkedIn</Link>
            <Link href="https://github.com" className="hover:text-primary transition-colors">GitHub</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
