"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockOsData } from "@/lib/mock-data/os"
import { motion } from "framer-motion"
import { Download, Store, Star } from "lucide-react"

export default function MarketplacePage() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Marketplace</h2>
        <p className="text-muted-foreground mt-1">
          Install pre-configured industry extension packs to boost your agent capabilities.
        </p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {mockOsData.marketplace.map((pack, i) => (
          <motion.div key={i} variants={item}>
            <Card className="h-full flex flex-col hover:border-primary/50 transition-colors group">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Store className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground font-medium uppercase tracking-wider">
                    {pack.category}
                  </span>
                </div>
                <CardTitle className="mt-4">{pack.title}</CardTitle>
                <CardDescription>
                  Pre-configured prompts, campaigns, and dashboard widgets tailored for {pack.category.toLowerCase()} businesses.
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-1 text-sm font-medium text-amber-500">
                    <Star className="w-4 h-4 fill-amber-500" /> {pack.rating}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {pack.installs} installs
                  </div>
                </div>
                <button className="w-full inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10">
                  <Download className="w-4 h-4" /> Install Pack
                </button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
