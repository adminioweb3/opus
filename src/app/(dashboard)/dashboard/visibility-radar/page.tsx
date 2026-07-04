"use client";

import React, { useEffect, useState } from "react";
import { TrendingUp, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const platforms = [
  { name: "ChatGPT", logoColor: "bg-[#10A37F]", score: "91%", sparkColor: "#10B981", sparkPoints: "0,20 15,17 30,18 45,12 60,13 75,8 100,5", citations: 142, status: "Strong", statusClass: "bg-emerald-50 text-emerald-600" },
  { name: "Claude", logoColor: "bg-[#D97757]", score: "88%", sparkColor: "#10B981", sparkPoints: "0,18 15,19 30,15 45,16 60,11 75,12 100,8", citations: 119, status: "Strong", statusClass: "bg-emerald-50 text-emerald-600" },
  { name: "Gemini", logoColor: "bg-[#4285F4]", score: "76%", sparkColor: "#06B6D4", sparkPoints: "0,12 15,13 30,10 45,14 60,15 75,14 100,13", citations: 94, status: "Solid", statusClass: "bg-cyan-50 text-cyan-600" },
  { name: "Perplexity", logoColor: "bg-[#20808D]", score: "58%", sparkColor: "#F59E0B", sparkPoints: "0,10 15,12 30,15 45,16 60,19 75,20 100,22", citations: 61, status: "Developing", statusClass: "bg-amber-50 text-amber-600" },
  { name: "Microsoft Copilot", logoColor: "bg-[#0078D4]", score: "61%", sparkColor: "#F59E0B", sparkPoints: "0,22 15,20 30,18 45,16 60,15 75,13 100,12", citations: 52, status: "Developing", statusClass: "bg-amber-50 text-amber-600" },
  { name: "Grok", logoColor: "bg-[#1A1A1A]", score: "34%", sparkColor: "#94A3B8", sparkPoints: "0,15 15,15 30,16 45,15 60,16 75,15 100,16", citations: 18, status: "Weak", statusClass: "bg-red-50 text-red-600" },
  { name: "DeepSeek", logoColor: "bg-[#4D6BFE]", score: "29%", sparkColor: "#EF4444", sparkPoints: "0,12 15,14 30,16 45,18 60,19 75,21 100,22", citations: 11, status: "Weak", statusClass: "bg-red-50 text-red-600" }
];

const signalMix = [
  { label: "Direct citations", pct: "62%", width: "62%", color: "bg-indigo-600" },
  { label: "Brand mentions", pct: "23%", width: "23%", color: "bg-cyan-500" },
  { label: "Indirect references", pct: "11%", width: "11%", color: "bg-emerald-500" },
  { label: "Comparative mentions", pct: "4%", width: "4%", color: "bg-amber-500" }
];

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
    <div className="flex-1 p-8 text-slate-900 bg-[#f8fafc] min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[28px] font-space-grotesk font-bold tracking-tight text-slate-900">
            Visibility radar
          </h1>
          <p className="text-[14px] text-slate-500 mt-1">
            Track where Citationly shows up across every AI platform, and how strong each signal is
          </p>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-semibold tracking-[0.04em]">
          <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-[12px] font-bold">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            LIVE MONITORING
          </div>
          <div className="text-slate-400 uppercase">Updated 00:12 ago</div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="flex items-center gap-2 mb-6">
        {["All platforms", "Strong", "Developing", "Weak"].map((filter, i) => (
          <button
            key={i}
            className={`px-4 py-1.5 text-[13.5px] font-semibold rounded-[20px] transition-colors ${
              i === 0
                ? "bg-slate-900 text-white"
                : "bg-transparent text-slate-600 hover:bg-slate-100"
            }`}
          >
            {filter}
          </button>
        ))}
        <div className="flex-1" />
        <button className="px-4 py-1.5 text-[13.5px] font-semibold bg-transparent text-slate-600 rounded-[20px] hover:bg-slate-100 flex items-center gap-1">
          Last 30 days <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* RADAR HERO */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div className="relative bg-white border border-slate-200 rounded-[14px] overflow-hidden shadow-sm h-115 flex items-center justify-center p-6">
          <div className="absolute w-full h-full flex items-center justify-center">
            {/* nested rectangular rings */}
            <div className="absolute w-187.5 h-97.5 border border-slate-200 rounded-[10px]"></div>
            <div className="absolute w-140.5 h-73 border border-slate-200 rounded-[8px]"></div>
            <div className="absolute w-93.5 h-48.5 border border-slate-200 rounded-[6px]"></div>
            <div className="absolute w-46.5 h-24 border border-slate-200 rounded-lg"></div>
            
            {/* axes labels */}
            <div className="absolute top-5 text-[9px] text-slate-400 font-mono">100%</div>
            <div className="absolute top-17.25 text-[9px] text-slate-400 font-mono">75%</div>
            <div className="absolute top-29.5 text-[9px] text-slate-400 font-mono">50%</div>
            <div className="absolute top-41.75 text-[9px] text-slate-400 font-mono">25%</div>

            {/* center hub */}
            <div className="absolute w-17.5 h-15 bg-white border-2 border-indigo-600 rounded-[8px] flex flex-col items-center justify-center z-10">
              <div className="text-[10px] font-bold tracking-[0.5px]">CITATIONLY</div>
              <div className="text-[9px] text-slate-400 font-mono">87.4 avg</div>
            </div>

            {/* sweep animation */}
            <div
              className="absolute w-187.5 h-97.5 rounded-[10px] z-1 mix-blend-multiply opacity-50 pointer-events-none"
              style={{
                background: "conic-gradient(from 0deg, transparent 70%, rgba(79,70,229,0.1) 95%, rgba(79,70,229,0.4) 100%)",
                transform: `rotate(${rotation}deg)`,
                clipPath: "polygon(50% 50%, 100% 50%, 100% 0, 50% 0)"
              }}
            ></div>

            {/* nodes (manual positioning for demo) */}
            <div className="absolute top-8.75 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20">
              <div className="w-5 h-5 rounded-full bg-emerald-500 border-[3px] border-white shadow-[0_0_10px_rgba(16,185,129,0.2)]"></div>
              <div className="text-[11px] font-semibold">ChatGPT</div>
              <div className="text-[9px] text-slate-400 font-mono">91%</div>
            </div>
            
            <div className="absolute top-26.25 left-[80%] -translate-x-1/2 flex flex-col items-center gap-1 z-20">
              <div className="w-4.5 h-4.5 rounded-full bg-emerald-500 border-[3px] border-white shadow-[0_0_10px_rgba(16,185,129,0.2)]"></div>
              <div className="text-[11px] font-semibold">Claude</div>
              <div className="text-[9px] text-slate-400 font-mono">88%</div>
            </div>

            <div className="absolute top-81.25 left-[80%] -translate-x-1/2 flex flex-col items-center gap-1 z-20">
              <div className="w-3.5 h-3.5 rounded-full bg-indigo-500 border-[3px] border-white shadow-[0_0_10px_rgba(79,70,229,0.2)]"></div>
              <div className="text-[11px] font-semibold">Gemini</div>
              <div className="text-[9px] text-slate-400 font-mono">76%</div>
            </div>

            <div className="absolute top-98.75 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20">
              <div className="w-3 h-3 rounded-full bg-amber-500 border-[3px] border-white shadow-[0_0_10px_rgba(245,158,11,0.2)]"></div>
              <div className="text-[11px] font-semibold">Perplexity</div>
              <div className="text-[9px] text-slate-400 font-mono">58%</div>
            </div>

            <div className="absolute top-81.25 left-[20%] -translate-x-1/2 flex flex-col items-center gap-1 z-20">
              <div className="w-3 h-3 rounded-full bg-amber-500 border-[3px] border-white shadow-[0_0_10px_rgba(245,158,11,0.2)]"></div>
              <div className="text-[11px] font-semibold">Copilot</div>
              <div className="text-[9px] text-slate-400 font-mono">61%</div>
            </div>

            <div className="absolute top-26.25 left-[20%] -translate-x-1/2 flex flex-col items-center gap-1 z-20">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 border-[3px] border-white shadow-[0_0_10px_rgba(239,68,68,0.2)]"></div>
              <div className="text-[11px] font-semibold">Grok</div>
              <div className="text-[9px] text-slate-400 font-mono">34%</div>
            </div>
            
            <div className="absolute top-12.5 left-[35%] -translate-x-1/2 flex flex-col items-center gap-1 z-20">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 border-[3px] border-white shadow-[0_0_10px_rgba(239,68,68,0.2)]"></div>
              <div className="text-[11px] font-semibold">DeepSeek</div>
              <div className="text-[9px] text-slate-400 font-mono">29%</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white border border-slate-200 p-8 rounded-[14px] shadow-sm text-center">
            <div className="text-[11.5px] text-slate-400 uppercase tracking-[0.04em] font-semibold mb-2">COMPOSITE VISIBILITY SCORE</div>
            <div className="font-space-grotesk text-[64px] font-bold leading-none mb-4">
              87.4<span className="text-[24px] text-slate-400 font-normal ml-1">/100</span>
            </div>
            <div className="text-emerald-500 font-semibold flex items-center justify-center gap-1 text-[14px]">
              <TrendingUp className="w-4 h-4" /> 3.2 pts vs last 30 days
            </div>
          </div>
          
          <div className="bg-white border border-slate-200 p-8 rounded-[14px] shadow-sm flex-1">
            <h3 className="mb-6 text-[14px] uppercase tracking-[0.5px] text-slate-500 font-semibold">Status Legend</h3>
            <div className="flex flex-col gap-4">
              {[
                { label: "Strong (80%+)", color: "bg-emerald-500", count: 2 },
                { label: "Solid (65–79%)", color: "bg-indigo-500", count: 1 },
                { label: "Developing (45–64%)", color: "bg-amber-500", count: 2 },
                { label: "Weak (under 45%)", color: "bg-red-500", count: 2 },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="font-semibold text-[14px]">{item.label}</span>
                  </div>
                  <span className="text-[14px] font-mono text-slate-400 font-medium">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PLATFORM BREAKDOWN */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[18px] font-bold text-slate-900">Platform breakdown</h2>
          <span className="text-[13px] text-slate-500 font-medium">7 platforms · 30 day trend</span>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-[14px] shadow-sm overflow-hidden">
          <div className="grid grid-cols-5 gap-4 p-4 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <span>Platform</span>
            <span>Score</span>
            <span>30-day trend</span>
            <span>Citations</span>
            <span>Status</span>
          </div>
          
          {platforms.map((p, i) => (
            <div key={i} className="grid grid-cols-5 gap-4 p-4 items-center border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3 font-semibold text-[14px] text-slate-900">
                <div className={`w-6 h-6 rounded-md ${p.logoColor} ${p.name === 'Grok' ? 'border border-slate-700' : ''}`}></div>
                {p.name}
              </div>
              <div className="font-mono font-medium text-[14px] text-slate-700">{p.score}</div>
              <div>
                <svg viewBox="0 0 100 28" preserveAspectRatio="none" className="w-24 h-7">
                  <polyline points={p.sparkPoints} fill="none" stroke={p.sparkColor} strokeWidth="2.5" />
                </svg>
              </div>
              <div className="font-mono text-[14px] text-slate-600">{p.citations}</div>
              <div>
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${p.statusClass}`}>
                  {p.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TWO COL: SCORE HISTORY + SIGNAL MIX */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white border border-slate-200 p-6 rounded-[14px] shadow-sm">
          <h3 className="text-[15px] font-bold mb-6 text-slate-800">Composite score history</h3>
          <div className="relative h-40">
            <svg viewBox="0 0 600 160" preserveAspectRatio="none" className="w-full h-full">
              <line x1="0" y1="40" x2="600" y2="40" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="80" x2="600" y2="80" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="120" x2="600" y2="120" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
              <polyline points="0,110 80,102 160,96 240,88 320,78 400,68 480,52 560,40 600,36" fill="none" stroke="#4F46E5" strokeWidth="3" />
              <circle cx="600" cy="36" r="5" fill="#4F46E5" />
            </svg>
            <div className="flex justify-between text-[12px] text-slate-400 font-medium mt-3">
              <span>30 days ago</span>
              <span>Today</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-[14px] shadow-sm">
          <h3 className="text-[15px] font-bold mb-6 text-slate-800">Signal mix</h3>
          <div className="flex flex-col gap-5 mt-4">
            {signalMix.map((s, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="w-40 text-[13.5px] text-slate-600 font-medium">{s.label}</span>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${s.color}`} style={{ width: s.width }}></div>
                </div>
                <span className="w-12 text-right font-mono text-[14px] text-slate-700 font-bold">{s.pct}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
