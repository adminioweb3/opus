"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockMoatData } from "@/lib/mock-data/moat"
import { motion } from "framer-motion"
import { ShoppingCart, TrendingUp, TrendingDown, Store, BrainCircuit, Search } from "lucide-react"

export default function ShoppingVisibilityPage() {
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
        <h2 className="text-3xl font-bold tracking-tight">AI Shopping Visibility</h2>
        <p className="text-muted-foreground mt-1">
          Track product recommendations across major AI shopping interfaces.
        </p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4">
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>SKU / Product Matrix</CardTitle>
              <CardDescription>Live rankings for your top products in AI purchasing funnels.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product / Category</TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        <BrainCircuit className="w-4 h-4" /> ChatGPT
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        <Search className="w-4 h-4" /> Google AI
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        <Store className="w-4 h-4" /> Perplexity
                      </div>
                    </TableHead>
                    <TableHead className="text-right">7-Day Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockMoatData.shopping.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4 text-muted-foreground" />
                        {row.product}
                      </TableCell>
                      <TableCell>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${row.chatgpt.includes('Rank #1') ? 'bg-emerald-500/10 text-emerald-500' : row.chatgpt.includes('Rank') ? 'bg-amber-500/10 text-amber-500' : 'bg-muted text-muted-foreground'}`}>
                          {row.chatgpt}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${row.google.includes('Rank #1') ? 'bg-emerald-500/10 text-emerald-500' : row.google.includes('Rank') ? 'bg-amber-500/10 text-amber-500' : 'bg-muted text-muted-foreground'}`}>
                          {row.google}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${row.perplexity.includes('Rank #1') ? 'bg-emerald-500/10 text-emerald-500' : row.perplexity.includes('Rank') ? 'bg-amber-500/10 text-amber-500' : 'bg-muted text-muted-foreground'}`}>
                          {row.perplexity}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={`inline-flex items-center gap-1 text-sm font-semibold ${row.trend.startsWith('+') ? 'text-emerald-500' : 'text-destructive'}`}>
                          {row.trend.startsWith('+') ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {row.trend}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
