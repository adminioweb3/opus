import React from "react";
import { FileText, Plus, Sparkles } from "lucide-react";

export default function CitationIntelligencePage() {
  return (
    <div className="flex-1 space-y-6 p-8 bg-background text-foreground">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Citation intelligence</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Analyze direct citations, links, and source credibility across AI platforms
          </p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> New Citation Report
        </button>
      </div>

      <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-border rounded-xl bg-card/50">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary shadow-sm ring-1 ring-primary/20">
          <FileText className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Citation module active</h2>
        <p className="text-muted-foreground max-w-100 text-sm leading-relaxed">
          Frontend scaffolding is ready. Connect this view to your database to pull in real-time citation analysis and source mapping data.
        </p>
        <button className="mt-8 flex items-center gap-2 bg-background border border-border text-foreground px-5 py-2.5 rounded-xl text-sm font-medium shadow-sm hover:bg-muted transition-colors">
          <Sparkles className="w-4 h-4 text-primary" /> Generate Mock Data
        </button>
      </div>
    </div>
  );
}
