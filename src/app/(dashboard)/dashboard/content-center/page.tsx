"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockContentCenter } from "@/lib/mock-data/actions"
import { motion } from "framer-motion"
import { FileText, MessageCircle, Scale, LayoutTemplate, Code2, Plus } from "lucide-react"

export default function ContentCenterPage() {
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
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Content Opportunity Center</h2>
          <p className="text-muted-foreground mt-1">
            Auto-generated assets to capture visibility and fix citation drops.
          </p>
        </div>
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 gap-2">
          <Plus className="w-4 h-4" /> Generate New Asset
        </button>
      </div>

      <motion.div variants={container} initial="hidden" animate="show">
        <Tabs defaultValue="faqs" className="space-y-4">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="faqs" className="gap-2"><MessageCircle className="w-4 h-4" /> FAQs</TabsTrigger>
            <TabsTrigger value="blogs" className="gap-2"><FileText className="w-4 h-4" /> Blogs</TabsTrigger>
            <TabsTrigger value="comparisons" className="gap-2"><Scale className="w-4 h-4" /> Comparisons</TabsTrigger>
            <TabsTrigger value="landing" className="gap-2"><LayoutTemplate className="w-4 h-4" /> Landing Pages</TabsTrigger>
            <TabsTrigger value="schema" className="gap-2"><Code2 className="w-4 h-4" /> Schema</TabsTrigger>
          </TabsList>

          {/* FAQs */}
          <TabsContent value="faqs">
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>FAQ Generation</CardTitle>
                  <CardDescription>Questions identified directly from AI engine prompt clusters.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Question</TableHead>
                        <TableHead>Search Volume</TableHead>
                        <TableHead>Difficulty</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockContentCenter.faqs.map((faq, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{faq.question}</TableCell>
                          <TableCell>{faq.volume}</TableCell>
                          <TableCell>
                            <span className={`text-xs px-2 py-1 rounded-full ${faq.difficulty === 'Low' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                              {faq.difficulty}
                            </span>
                          </TableCell>
                          <TableCell className="text-right text-muted-foreground">{faq.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Blogs */}
          <TabsContent value="blogs">
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>Blog Recommendations</CardTitle>
                  <CardDescription>Long-form content generated to capture broad entity queries.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Keywords</TableHead>
                        <TableHead>Intent</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockContentCenter.blogs.map((blog, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{blog.title}</TableCell>
                          <TableCell>
                            <div className="flex gap-1 flex-wrap">
                              {blog.keywords.map(kw => (
                                <span key={kw} className="text-[10px] bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded">{kw}</span>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>{blog.intent}</TableCell>
                          <TableCell className="text-right text-muted-foreground">{blog.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Comparisons */}
          <TabsContent value="comparisons">
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>Comparison Pages</CardTitle>
                  <CardDescription>Assets specifically designed to win head-to-head AI queries against competitors.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Page Title</TableHead>
                        <TableHead>Target Engine</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockContentCenter.comparisons.map((comp, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{comp.title}</TableCell>
                          <TableCell>{comp.targetEngine}</TableCell>
                          <TableCell>
                            <span className={`text-xs px-2 py-1 rounded-full ${comp.priority === 'High' ? 'bg-destructive/10 text-destructive' : 'bg-orange-500/10 text-orange-500'}`}>
                              {comp.priority}
                            </span>
                          </TableCell>
                          <TableCell className="text-right text-muted-foreground">{comp.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Landing Pages */}
          <TabsContent value="landing">
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>Landing Pages</CardTitle>
                  <CardDescription>High-converting templates aimed at bottom-of-funnel users.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Target URL</TableHead>
                        <TableHead>Strategic Focus</TableHead>
                        <TableHead>Est. Conv. Rate</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockContentCenter.landingPages.map((lp, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{lp.url}</TableCell>
                          <TableCell>{lp.focus}</TableCell>
                          <TableCell className="font-semibold text-emerald-500">{lp.conversionEst}</TableCell>
                          <TableCell className="text-right text-muted-foreground">{lp.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Schema */}
          <TabsContent value="schema">
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>Schema Opportunities</CardTitle>
                  <CardDescription>JSON-LD structured data improvements to feed AI knowledge graphs.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Schema Type</TableHead>
                        <TableHead>Target URL</TableHead>
                        <TableHead>Current Issue</TableHead>
                        <TableHead className="text-right">Action Needed</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockContentCenter.schema.map((sch, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-mono text-sm">{sch.type}</TableCell>
                          <TableCell className="text-muted-foreground">{sch.targetUrl}</TableCell>
                          <TableCell className="text-destructive font-medium">{sch.issue}</TableCell>
                          <TableCell className="text-right font-medium text-primary cursor-pointer hover:underline">{sch.action}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

        </Tabs>
      </motion.div>
    </div>
  )
}
