"use client"

import { MOCK_ADMIN_CUSTOMERS } from "@/lib/mock-data/journey"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, DollarSign, Activity, AlertCircle, Download, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function AdminDashboardPage() {
  const totalMRR = MOCK_ADMIN_CUSTOMERS.reduce((sum, c) => sum + c.mrr, 0)
  const activeCustomers = MOCK_ADMIN_CUSTOMERS.filter(c => c.plan !== "free").length
  const totalCustomers = MOCK_ADMIN_CUSTOMERS.length
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Admin Overview</h2>
          <p className="text-muted-foreground">Global SaaS metrics and customer tracking.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Export Data</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">Total MRR</p>
              <DollarSign className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-3xl font-bold">${totalMRR.toLocaleString()}</p>
            <p className="text-xs text-emerald-500 font-medium mt-1">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">Active Subscriptions</p>
              <Users className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-3xl font-bold">{activeCustomers}</p>
            <p className="text-xs text-emerald-500 font-medium mt-1">+4 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">Total Workspaces</p>
              <Activity className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-3xl font-bold">{totalCustomers}</p>
            <p className="text-xs text-muted-foreground mt-1">Including free tier</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">Churn Risk</p>
              <AlertCircle className="w-4 h-4 text-red-500" />
            </div>
            <p className="text-3xl font-bold text-red-500">
              {MOCK_ADMIN_CUSTOMERS.filter(c => c.churnRisk === "high").length}
            </p>
            <p className="text-xs text-muted-foreground mt-1">High risk customers</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Customer Directory</CardTitle>
            <CardDescription>All workspaces and their current AI visibility status.</CardDescription>
          </div>
          <div className="w-64 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search customers..." />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Customer</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Plan</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">MRR</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Analysis Status</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Visibility Score</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Churn Risk</th>
                  <th className="px-4 py-3 font-medium text-right text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {MOCK_ADMIN_CUSTOMERS.map((cust) => (
                  <tr key={cust.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-bold">{cust.name}</div>
                      <div className="text-xs text-muted-foreground">{cust.website}</div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="capitalize">{cust.plan}</Badge>
                    </td>
                    <td className="px-4 py-3 font-medium">${cust.mrr}</td>
                    <td className="px-4 py-3">
                      {cust.analysisCompleted ? (
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">Completed</Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-amber-100 text-amber-700">Pending</Badge>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-muted rounded-full h-1.5 max-w-15">
                          <div className={`h-1.5 rounded-full ${cust.visibilityScore > 80 ? 'bg-emerald-500' : cust.visibilityScore > 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${cust.visibilityScore}%` }} />
                        </div>
                        <span className="font-medium">{cust.visibilityScore || "-"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={`capitalize ${
                        cust.churnRisk === 'low' ? 'text-emerald-600 border-emerald-200 bg-emerald-50' :
                        cust.churnRisk === 'medium' ? 'text-amber-600 border-amber-200 bg-amber-50' :
                        'text-red-600 border-red-200 bg-red-50'
                      }`}>
                        {cust.churnRisk}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
