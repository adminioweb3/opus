"use client"

import { Card, CardContent } from "@/components/ui/card"
import { mockDeploymentsData } from "@/lib/mock-data/deployments"
import { motion } from "framer-motion"
import { GitBranch, GitCommit, GitPullRequest, Github } from "lucide-react"

export default function RepositoriesPage() {
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
        <h2 className="text-3xl font-bold tracking-tight">GitHub Deployments</h2>
        <p className="text-muted-foreground mt-1">
          Manage pull requests and code-level SEO/AEO optimizations for custom apps.
        </p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid lg:grid-cols-3 gap-6">
        
        {/* Left Col: Repositories */}
        <motion.div variants={item} className="lg:col-span-1 space-y-4">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Github className="w-5 h-5" /> Connected Repos
          </h3>
          {mockDeploymentsData.repositories.map((repo, i) => (
            <Card key={i} className="hover:border-primary/50 transition-colors">
              <CardContent className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="font-mono text-sm font-bold text-primary">{repo.name}</div>
                  <span className="text-xs bg-muted px-2 py-0.5 rounded font-medium">{repo.framework}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1"><GitBranch className="w-3 h-3" /> {repo.branch}</div>
                  <div className="flex items-center gap-1"><GitPullRequest className="w-3 h-3" /> {repo.prs} PRs</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Right Col: Active PRs */}
        <motion.div variants={item} className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <GitPullRequest className="w-5 h-5 text-primary" /> Generated Pull Requests
          </h3>
          <div className="space-y-4">
            {mockDeploymentsData.pullRequests.map((pr, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                    <div className="space-y-1">
                      <h4 className="font-mono text-lg font-bold hover:text-primary transition-colors cursor-pointer">
                        {pr.title}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-mono bg-muted px-2 py-0.5 rounded-md text-xs border">
                          <GitBranch className="w-3 h-3 inline mr-1" />{pr.branch}
                        </span>
                        <span>opened by <span className="text-foreground font-medium">OPUS-Agent</span></span>
                      </div>
                    </div>
                    <div>
                      <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                        pr.status === 'Ready to Merge' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                      }`}>
                        {pr.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 pt-4 border-t text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <GitCommit className="w-4 h-4" /> {pr.commits} commits
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono font-bold">
                      <span className="text-emerald-500">{pr.lines.split(' ')[0]}</span>
                      <span className="text-destructive">{pr.lines.split(' ')[1]}</span>
                    </div>
                    <button className="ml-auto text-sm text-primary font-medium hover:underline">
                      View Diff
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
