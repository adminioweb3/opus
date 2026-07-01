"use client";

import React, { useEffect, useState } from "react";
import { Eye, TrendingUp, Sparkles, Activity, Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function VisibilityRadarPage() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      setRotation((prev) => (prev + 1) % 360);
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="flex-1 space-y-6 p-8 bg-background text-foreground">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Visibility radar</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Track where Citationly shows up across every AI platform, and how strong each signal is
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            LIVE MONITORING
          </div>
          <div className="text-muted-foreground uppercase tracking-wider">Updated 00:12 ago</div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="flex items-center gap-2 mb-6">
        {["All platforms", "Strong", "Developing", "Weak"].map((filter, i) => (
          <button
            key={i}
            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
              i === 0
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {filter}
          </button>
        ))}
        <div className="flex-1" />
        <button className="px-4 py-1.5 text-sm font-medium bg-muted text-muted-foreground rounded-full hover:bg-muted/80">
          Last 30 days ▾
        </button>
      </div>

      {/* RADAR HERO */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 relative bg-card border border-border rounded-xl overflow-hidden shadow-sm h-115 flex items-center justify-center p-6">
          <svg viewBox="0 0 820 460" className="w-full h-full" preserveAspectRatio="none">
            {/* nested rectangular rings */}
            <rect x="35" y="35" width="750" height="390" rx="10" fill="none" stroke="currentColor" className="text-border" strokeWidth="1" />
            <rect x="129" y="84" width="562" height="292" rx="8" fill="none" stroke="currentColor" className="text-border" strokeWidth="1" />
            <rect x="223" y="133" width="374" height="194" rx="6" fill="none" stroke="currentColor" className="text-border" strokeWidth="1" />
            <rect x="317" y="182" width="186" height="96" rx="4" fill="none" stroke="currentColor" className="text-border" strokeWidth="1" />
            
            <text x="410" y="30" textAnchor="middle" fill="currentColor" className="text-muted-foreground text-[9px] font-mono">100%</text>
            <text x="410" y="79" textAnchor="middle" fill="currentColor" className="text-muted-foreground text-[9px] font-mono">75%</text>
            <text x="410" y="128" textAnchor="middle" fill="currentColor" className="text-muted-foreground text-[9px] font-mono">50%</text>
            <text x="410" y="177" textAnchor="middle" fill="currentColor" className="text-muted-foreground text-[9px] font-mono">25%</text>

            <g style={{ transformOrigin: "410px 230px", transform: `rotate(${rotation}deg)` }}>
              <path d="M410,230 L410,35 L785,35 Z" fill="url(#sweepGrad)" opacity="0.5" />
            </g>
            <defs>
              <radialGradient id="sweepGrad">
                <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
              </radialGradient>
            </defs>

            <rect x="375" y="200" width="70" height="60" rx="8" fill="currentColor" className="text-card" stroke="#4F46E5" strokeWidth="2" />
            <text x="410" y="226" textAnchor="middle" fill="currentColor" className="text-foreground text-[10px] font-semibold tracking-wider font-sans">CITATIONLY</text>
            <text x="410" y="240" textAnchor="middle" fill="currentColor" className="text-muted-foreground text-[9px] font-mono">87.4 avg</text>

            <g><circle cx="410" cy="50" r="10" fill="#10B981" /><text x="410" y="32" textAnchor="middle" fill="currentColor" className="text-foreground text-[11px] font-medium font-sans">ChatGPT</text><text x="410" y="68" textAnchor="middle" fill="currentColor" className="text-muted-foreground text-[9px] font-mono">91%</text></g>
            <g><circle cx="755" cy="120" r="9" fill="#10B981" /><text x="755" y="102" textAnchor="middle" fill="currentColor" className="text-foreground text-[11px] font-medium font-sans">Claude</text><text x="755" y="138" textAnchor="middle" fill="currentColor" className="text-muted-foreground text-[9px] font-mono">88%</text></g>
            <g><circle cx="755" cy="340" r="7" fill="#06B6D4" /><text x="755" y="322" textAnchor="middle" fill="currentColor" className="text-foreground text-[11px] font-medium font-sans">Gemini</text><text x="755" y="358" textAnchor="middle" fill="currentColor" className="text-muted-foreground text-[9px] font-mono">76%</text></g>
            <g><circle cx="410" cy="410" r="6" fill="#F59E0B" /><text x="410" y="392" textAnchor="middle" fill="currentColor" className="text-foreground text-[11px] font-medium font-sans">Perplexity</text><text x="410" y="428" textAnchor="middle" fill="currentColor" className="text-muted-foreground text-[9px] font-mono">58%</text></g>
            <g><circle cx="65" cy="340" r="6" fill="#F59E0B" /><text x="65" y="322" textAnchor="middle" fill="currentColor" className="text-foreground text-[11px] font-medium font-sans">Copilot</text><text x="65" y="358" textAnchor="middle" fill="currentColor" className="text-muted-foreground text-[9px] font-mono">61%</text></g>
            <g><circle cx="65" cy="120" r="5" fill="#EF4444" /><text x="65" y="102" textAnchor="middle" fill="currentColor" className="text-foreground text-[11px] font-medium font-sans">Grok</text><text x="65" y="138" textAnchor="middle" fill="currentColor" className="text-muted-foreground text-[9px] font-mono">34%</text></g>
            <g><circle cx="260" cy="64" r="5" fill="#EF4444" /><text x="260" y="46" textAnchor="middle" fill="currentColor" className="text-foreground text-[11px] font-medium font-sans">DeepSeek</text><text x="260" y="82" textAnchor="middle" fill="currentColor" className="text-muted-foreground text-[9px] font-mono">29%</text></g>
          </svg>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-card border border-border p-6 rounded-xl shadow-sm text-center">
            <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-2">Composite visibility score</div>
            <div className="text-5xl font-bold font-sans text-foreground mb-4">87.4<span className="text-xl text-muted-foreground font-normal ml-1">/100</span></div>
            <div className="text-emerald-500 font-medium flex items-center justify-center gap-1">
              <TrendingUp className="w-4 h-4" /> 3.2 pts vs last 30 days
            </div>
          </div>
          
          <div className="bg-card border border-border p-6 rounded-xl shadow-sm flex-1">
            <h3 className="font-medium text-sm mb-4 uppercase tracking-wider text-muted-foreground">Status Legend</h3>
            <div className="space-y-4">
              {[
                { label: "Strong (80%+)", color: "bg-emerald-500", count: 2 },
                { label: "Solid (65–79%)", color: "bg-cyan-500", count: 1 },
                { label: "Developing (45–64%)", color: "bg-amber-500", count: 2 },
                { label: "Weak (under 45%)", color: "bg-rose-500", count: 2 },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <span className="text-sm font-mono text-muted-foreground">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
