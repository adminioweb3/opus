"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play, AlertCircle, CheckCircle, Sparkles, BarChart2, Shield, Search, Zap } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";

export default function PromptAnalysisWorkspace() {
  const { id: topicId, questionId } = useParams();
  const token = useAuthStore((state) => state.token);
  
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [timeline, setTimeline] = useState<Record<string, unknown>[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchResults = async (analysisId: string) => {
      try {
        const res = await fetch(`https://api.citationly.ai/PromptIntelligence/analyses/${analysisId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const analysisData = await res.json();
          setData(analysisData);
        }
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchInitialData = async () => {
      if (!token) return;
    try {
      const res = await fetch(`https://api.citationly.ai/PromptIntelligence/topics/${topicId}/questions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const questions = await res.json();
        const currentQ = questions.find((q: Record<string, unknown>) => (q.question as Record<string, unknown>).id === questionId);
        
        if (currentQ?.latestAnalysis?.status === "Completed") {
          await fetchResults(currentQ.latestAnalysis.id);
        } else {
          setLoading(false);
        }
      }
    } catch (error) {
      console.error("Error fetching question data:", error);
      setLoading(false);
    }
    };
    
    fetchInitialData();
  }, [questionId, token, topicId]);

  const fetchResults = async (analysisId: string) => {
    try {
      const res = await fetch(`https://api.citationly.ai/PromptIntelligence/analyses/${analysisId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const analysisData = await res.json();
        setData(analysisData);
      }
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  };

  const runAnalysis = async () => {
    setAnalyzing(true);
    setTimeline([]);
    setProgress(0);
    setData(null);

    try {
      const response = await fetch(`https://api.citationly.ai/PromptIntelligence/analyze/stream/${questionId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        const lines = text.split('\n').filter(l => l.trim().startsWith('data: '));

        for (const line of lines) {
          const payload = line.replace('data: ', '').trim();
          if (payload === '[DONE]') {
            setAnalyzing(false);
            break;
          }
          try {
            const parsed = JSON.parse(payload);
            if (parsed.error) {
              setTimeline(prev => [...prev, { step: parsed.error, error: true }]);
              setAnalyzing(false);
            } else {
              setTimeline(prev => [...prev, { step: parsed.step }]);
              setProgress(parsed.progress);

              if (parsed.progress === 100 && parsed.analysisId) {
                await fetchResults(parsed.analysisId);
                setAnalyzing(false);
              }
            }
          } catch (e) {
             console.error("Parse error", e);
          }
        }
      }
    } catch (error) {
      console.error("Analysis failed", error);
      setAnalyzing(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto text-gray-900">
      <Link href={`/dashboard/prompt-intelligence/${topicId}`} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors w-fit font-medium">
        <ArrowLeft size={16} />
        Back to Prompts
      </Link>

      <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 blur-[100px] rounded-full" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-semibold rounded-full border border-blue-200">
                Prompt Workspace
              </span>
              {data && (
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-sm font-semibold rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle size={14} /> Analyzed
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-2 text-gray-900">
              &quot;Which software is best for B2B sales in 2026?&quot;
            </h1>
            <p className="text-gray-500 flex items-center gap-2 font-medium">
              <Shield size={16} className="text-blue-500" /> Tracked against 7 major AI platforms
            </p>
          </div>
          <button 
            onClick={runAnalysis}
            disabled={analyzing}
            className={`px-8 py-4 rounded-xl flex items-center gap-3 font-semibold text-lg transition-all shadow-md
              ${analyzing ? 'bg-blue-300 text-white cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white hover:-translate-y-1 hover:shadow-lg'}
            `}
          >
            {analyzing ? (
              <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Running...</>
            ) : (
              <><Play size={20} className="fill-current" /> Run Analysis</>
            )}
          </button>
        </div>
      </div>

      {analyzing && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm"
        >
          <div className="flex justify-between text-sm mb-2">
            <span className="text-blue-600 font-semibold">Analysis in Progress...</span>
            <span className="text-gray-500 font-medium">{progress}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5 mb-6 overflow-hidden">
            <motion.div 
              className="bg-blue-500 h-2.5 rounded-full" 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          </div>
          <div className="space-y-3">
            <AnimatePresence>
              {timeline.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-center gap-3 font-medium ${item.error ? 'text-rose-500' : i === timeline.length - 1 ? 'text-gray-900' : 'text-gray-400'}`}
                >
                  {item.error ? <AlertCircle size={16} /> : i === timeline.length - 1 ? <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div> : <CheckCircle size={16} className="text-emerald-500" />}
                  <span>{item.step as string}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {loading && !analyzing && (
        <div className="py-20 flex justify-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {!loading && !analyzing && !data && (
        <div className="bg-white border border-gray-200 rounded-2xl p-16 text-center shadow-sm">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search size={40} className="text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Data Yet</h2>
          <p className="text-gray-500 max-w-lg mx-auto text-lg">Click the &quot;Run Analysis&quot; button above to query all AI models and generate your visibility report.</p>
        </div>
      )}

      {!loading && data && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Executive Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-linear-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 relative overflow-hidden shadow-md text-white border border-blue-800">
              <div className="absolute top-0 right-0 p-4 opacity-20"><BarChart2 size={80} /></div>
              <p className="text-blue-100 font-medium mb-2">Visibility Score</p>
              <h3 className="text-5xl font-bold mb-2">{(data.Visibility as Record<string, unknown>)?.overallVisibilityScore as number ?? 0}<span className="text-xl text-blue-200 font-normal">/100</span></h3>
              <p className="text-sm text-blue-100 flex items-center gap-1 font-medium"><Sparkles size={14} className="text-yellow-300"/> Exceptional presence</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <p className="text-gray-500 font-medium mb-2">Share of Voice</p>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">{(data.Visibility as Record<string, unknown>)?.shareOfVoice as number ?? 0}%</h3>
              <p className="text-sm text-gray-500 font-medium">vs {(data.Visibility as Record<string, unknown>)?.competitorCount as number ?? 0} Competitors</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <p className="text-gray-500 font-medium mb-2">Avg Position</p>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">{(data.Visibility as Record<string, unknown>)?.averagePosition as number ?? 0}<span className="text-lg text-gray-400 font-normal">th %ile</span></h3>
              <p className="text-sm text-gray-500 font-medium">Lower is earlier in response</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <p className="text-gray-500 font-medium mb-2">Platform Mentions</p>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">{(data.Visibility as Record<string, unknown>)?.mentionFrequency as number ?? 0}%</h3>
              <p className="text-sm text-gray-500 font-medium">Mentioned in {((data.Visibility as Record<string, unknown>)?.mentionFrequency as number ?? 0) / 100 * 7}/7 platforms</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: AI Responses */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Raw AI Intelligence</h2>
              
              <div className="space-y-6">
                {(data.Responses as Record<string, unknown>[])?.map((resp: Record<string, unknown>) => {
                  const isMentioned = (data.Mentions as Record<string, unknown>[])?.some((m: Record<string, unknown>) => m.platform === resp.platform && m.isBrand);
                  return (
                    <div key={resp.id as string} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${isMentioned ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                          <h3 className="font-semibold text-lg text-gray-900">{resp.platform as string}</h3>
                        </div>
                        <span className={`text-sm font-semibold px-3 py-1 rounded-full border ${isMentioned ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                          {isMentioned ? 'Mentioned' : 'Not Mentioned'}
                        </span>
                      </div>
                      <div className="p-6 text-gray-600 leading-relaxed text-sm max-h-60 overflow-y-auto">
                        {resp.responseText as string}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Insights & Competitors */}
            <div className="space-y-8">
              {/* Recommendations */}
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                  <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2"><Zap size={18} className="text-amber-500"/> Action Plan</h3>
                </div>
                <div className="p-6 space-y-4">
                  {(data.Recommendations as Record<string, unknown>[])?.map((rec: Record<string, unknown>) => (
                    <div key={rec.id as string} className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">{rec.category as string}</span>
                        <span className={`text-xs font-bold px-2 py-1 rounded-md ${rec.priority === 'High' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'}`}>
                          {rec.priority as string} Priority
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{rec.title as string}</h4>
                      <p className="text-sm text-gray-500 mb-3 leading-relaxed">{rec.description as string}</p>
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 w-fit px-2.5 py-1 rounded-md">
                        +{rec.estimatedVisibilityGain as string}% Est. Gain
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Competitors */}
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
                  <h3 className="font-bold text-lg text-gray-900">Competitor Radar</h3>
                </div>
                <div className="p-6 space-y-5">
                  {(data.CompetitorComparisons as Record<string, unknown>[])?.map((comp: Record<string, unknown>) => (
                    <div key={comp.id as string}>
                      <div className="flex justify-between text-sm mb-2 font-medium">
                        <span className="text-gray-900">{comp.competitorName as string}</span>
                        <span className="text-gray-500">Vis: {comp.visibilityScore as number}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${comp.visibilityScore}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
