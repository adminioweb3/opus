"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, ChevronDown, ChevronRight, Download, Filter, 
  Columns, AlertTriangle, ArrowUpRight 
} from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/lib/stores/auth-store";

export default function PromptsDashboard() {
  const [topics, setTopics] = useState<Record<string, unknown>[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [topicQuestions, setTopicQuestions] = useState<Record<string, Record<string, unknown>[]>>({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");
  const [newTopicDesc, setNewTopicDesc] = useState("");
  
  const token = useAuthStore((state) => state.token);
  useEffect(() => {
    const fetchQuestionsForTopic = async (topicId: string) => {
      try {
        const res = await fetch(`http://localhost:5100/api/PromptIntelligence/topics/${topicId}/questions`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setTopicQuestions(prev => ({ ...prev, [topicId]: data }));
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    const fetchTopics = async () => {
      if (!token) return;
      try {
        const res = await fetch("http://localhost:5100/api/PromptIntelligence/topics", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setTopics(data);
          
          data.forEach((topic: Record<string, unknown>) => fetchQuestionsForTopic(topic.id as string));
        }
      } catch (error) {
        console.error("Error fetching topics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [token]);



  const createTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicName) return;
    try {
      const res = await fetch("http://localhost:5100/api/PromptIntelligence/topics", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ name: newTopicName, description: newTopicDesc })
      });
      if (res.ok) {
        setIsModalOpen(false);
        setNewTopicName("");
        setNewTopicDesc("");
        // A simple reload is easiest to fetch topics without complex dependency injection
        window.location.reload();
      }
    } catch (error) {
      console.error("Error creating topic:", error);
    }
  };

  const toggleExpand = (topicId: string) => {
    setExpandedTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const getTopicAggregates = (topicId: string) => {
    const questions = topicQuestions[topicId] || [];
    if (questions.length === 0) return { score: "-", sov: "-", pos: "-", rank: "-" };

    const withVis = questions.filter(q => q.visibility);
    if (withVis.length === 0) return { score: "-", sov: "-", pos: "-", rank: "-" };

    const avgScore = withVis.reduce((acc, q: Record<string, unknown>) => acc + (((q.visibility as Record<string, unknown>).overallVisibilityScore as number) || 0), 0) / withVis.length;
    const avgSov = withVis.reduce((acc, q: Record<string, unknown>) => acc + (((q.visibility as Record<string, unknown>).shareOfVoice as number) || 0), 0) / withVis.length;
    const avgPos = withVis.reduce((acc, q: Record<string, unknown>) => acc + (((q.visibility as Record<string, unknown>).averagePosition as number) || 0), 0) / withVis.length;

    return {
      score: `${avgScore.toFixed(1)}%`,
      sov: `${avgSov.toFixed(1)}%`,
      pos: avgPos.toFixed(1),
      rank: `#${Math.max(1, Math.round(5 - (avgScore / 25)))}` // Mock rank based on score
    };
  };

  const totalPrompts = Object.values(topicQuestions).reduce((acc: number, qList: Record<string, unknown>[]) => acc + qList.length, 0);

  return (
    <div className="p-8 max-w-7xl mx-auto text-gray-900">
      
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Prompt Analysis</h1>
          <p className="text-gray-500 text-sm">
            {totalPrompts} prompts across {topics.length} topics, 0 tags, and 2 analysis types, run daily
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <svg className="w-10 h-10 transform -rotate-90">
                <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-gray-200" />
                <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="3" fill="transparent" 
                  strokeDasharray="100" strokeDashoffset={100 - (totalPrompts/50)*100} className="text-blue-600" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-600">{totalPrompts} / 50 prompts</span>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors text-sm shadow-sm"
          >
            <AlertTriangle size={16} className="text-amber-400" />
            Modify Prompts
            <ArrowUpRight size={16} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Toolbar Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div className="flex bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
          <button className="bg-gray-50 text-gray-900 px-4 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 shadow-sm border border-gray-200">
            Visibility <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-semibold">35</span>
          </button>
          <button className="text-gray-500 hover:text-gray-900 px-4 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 transition-colors">
            Sentiment <span className="bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded text-xs font-semibold">42</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-sm">
            <Filter size={14} /> Group by: Topic <ChevronDown size={14} className="text-gray-400" />
          </button>
          <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-sm">
            <Columns size={14} /> Customize Columns <ChevronDown size={14} className="text-gray-400" />
          </button>
          <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 p-2 rounded-lg transition-colors shadow-sm">
            <Download size={16} />
          </button>
          <div className="relative shadow-sm rounded-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search Topics" 
              className="bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-48 transition-all placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Data Grid */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mt-6 shadow-sm">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <div className="col-span-5 flex items-center gap-1">Topic <ChevronDown size={12} /></div>
          <div className="col-span-1 flex items-center gap-1">Visibility Rank <ChevronDown size={12} /></div>
          <div className="col-span-2 flex items-center gap-1">Visibility Score <ChevronDown size={12} /></div>
          <div className="col-span-2 flex items-center gap-1">Share of Voice <ChevronDown size={12} /></div>
          <div className="col-span-2 flex items-center gap-1">Average Position</div>
        </div>

        {/* Table Body */}
        {loading ? (
          <div className="p-12 flex justify-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : topics.length === 0 ? (
          <div className="p-16 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Topics Yet</h3>
            <p className="text-gray-500 mb-6">Start tracking how AI models perceive your brand by modifying prompts.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {topics.map((topic: Record<string, unknown>) => {
              const topicId = topic.id as string;
              const isExpanded = expandedTopics[topicId];
              const questions = topicQuestions[topicId] || [];
              const aggs = getTopicAggregates(topicId);

              return (
                <div key={topicId} className="flex flex-col">
                  {/* Topic Row */}
                  <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors group">
                    <div className="col-span-5 flex items-center gap-3">
                      <button onClick={() => toggleExpand(topicId)} className="text-gray-400 hover:text-gray-900 transition-colors">
                        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </button>
                      <div>
                        <Link href={`/dashboard/prompt-intelligence/${topicId}`} className="font-semibold text-gray-900 hover:text-blue-600 transition-colors block">
                          {topic.name as string}
                        </Link>
                        <p className="text-xs text-gray-500 mt-0.5">{questions.length} prompts</p>
                      </div>
                      <Link 
                        href={`/dashboard/prompt-intelligence/${topicId}`}
                        className="ml-auto opacity-0 group-hover:opacity-100 bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-md flex items-center gap-1 transition-all shadow-sm"
                      >
                        Analyze <ArrowUpRight size={12} />
                      </Link>
                    </div>
                    <div className="col-span-1 text-sm font-medium text-gray-900">{aggs.rank}</div>
                    <div className="col-span-2 text-sm font-medium text-gray-900">{aggs.score}</div>
                    <div className="col-span-2 text-sm font-medium text-gray-900">{aggs.sov}</div>
                    <div className="col-span-2 text-sm font-medium text-gray-900">{aggs.pos}</div>
                  </div>

                  {/* Expanded Prompts */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden bg-gray-50 border-t border-gray-200"
                      >
                        {questions.length === 0 ? (
                          <div className="p-4 pl-12 text-sm text-gray-500">No prompts found for this topic.</div>
                        ) : (
                          <div className="divide-y divide-gray-200">
                            {questions.map((q: Record<string, unknown>) => {
                              const vis = q.visibility as Record<string, unknown>;
                              const qObj = q.question as Record<string, unknown>;
                              return (
                                <div key={qObj.id as string} className="grid grid-cols-12 gap-4 p-4 pl-12 items-center hover:bg-gray-100 transition-colors">
                                  <div className="col-span-5 pr-4">
                                    <Link 
                                      href={`/dashboard/prompt-intelligence/${topicId}/analyze/${qObj.id}`}
                                      className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                                    >
                                      {qObj.promptText as string}
                                    </Link>
                                  </div>
                                  <div className="col-span-1 text-sm text-gray-600">
                                    {vis ? `#${Math.max(1, Math.round(5 - ((vis.overallVisibilityScore as number) / 25)))}` : "-"}
                                  </div>
                                  <div className="col-span-2 text-sm text-gray-600">
                                    {vis ? `${(vis.overallVisibilityScore as number).toFixed(1)}%` : "-"}
                                  </div>
                                  <div className="col-span-2 text-sm text-gray-600">
                                    {vis ? `${(vis.shareOfVoice as number).toFixed(1)}%` : "-"}
                                  </div>
                                  <div className="col-span-2 text-sm text-gray-600">
                                    {vis ? (vis.averagePosition as number).toFixed(1) : "-"}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create Topic Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-gray-200 rounded-2xl w-full max-w-md overflow-hidden shadow-xl"
          >
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-900">Create New Topic</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
                &times;
              </button>
            </div>
            <form onSubmit={createTopic} className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Topic Name</label>
                <input 
                  type="text" 
                  value={newTopicName}
                  onChange={(e) => setNewTopicName(e.target.value)}
                  placeholder="e.g. Best CRM Software"
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm placeholder:text-gray-400"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  value={newTopicDesc}
                  onChange={(e) => setNewTopicDesc(e.target.value)}
                  placeholder="Describe what this topic covers..."
                  rows={3}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none shadow-sm placeholder:text-gray-400"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-lg font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
                >
                  Create Topic
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
