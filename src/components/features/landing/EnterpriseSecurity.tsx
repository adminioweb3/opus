"use client"

import { Shield, Lock, Server, Key, Users } from "lucide-react"

export function EnterpriseSecurity() {
  return (
    <section className="py-32 bg-slate-50 text-primary-text border-y border-border relative overflow-hidden">
      <div className="absolute top-0 right-0 w-150 h-150 radial-glow opacity-40 pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">Enterprise-grade security</h2>
          <p className="text-secondary-text text-lg leading-relaxed">
            Your <span className="text-accent font-medium">AI Visibility Tracking</span> data is sensitive. CITATIONLY is built from the ground up to meet the strict security and compliance requirements of Fortune 500 companies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-6">
              <Shield className="w-7 h-7 text-accent" />
            </div>
            <h3 className="font-semibold text-lg mb-2">SOC 2 Type II</h3>
            <p className="text-sm text-secondary-text">Independently audited and certified for security, availability, and confidentiality.</p>
          </div>

          <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-6">
              <Lock className="w-7 h-7 text-accent" />
            </div>
            <h3 className="font-semibold text-lg mb-2">GDPR & CCPA</h3>
            <p className="text-sm text-secondary-text">Full compliance with global data privacy frameworks and robust data processing agreements.</p>
          </div>

          <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-6">
              <Key className="w-7 h-7 text-accent" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Enterprise SSO</h3>
            <p className="text-sm text-secondary-text">Seamless integration with Okta, Azure AD, and Google Workspace via SAML 2.0.</p>
          </div>

          <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-accent" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Advanced RBAC</h3>
            <p className="text-sm text-secondary-text">Granular role-based access control to manage permissions across global teams.</p>
          </div>
        </div>

        <div className="mt-12 bg-white border border-border shadow-card rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <Server className="w-10 h-10 text-slate-300" />
            <div>
              <h4 className="font-semibold text-primary-text">Dedicated Infrastructure</h4>
              <p className="text-sm text-secondary-text">Available for enterprise plans with strict data residency requirements.</p>
            </div>
          </div>
          <button className="px-6 py-3 bg-white border border-border rounded-lg text-primary-text font-medium hover:bg-slate-50 transition-colors shadow-sm">
            View Security Portal
          </button>
        </div>
      </div>
    </section>
  )
}
