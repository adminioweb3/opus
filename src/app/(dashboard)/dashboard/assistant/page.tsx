"use client";

import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "@/lib/stores/auth-store";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  AlertTriangle,
  Target,
  Quote,
  TrendingUp,
  Swords,
  Rocket,
  Pencil,
  Globe,
  Award,
  Code,
  MapPin,
  DollarSign,
  Paperclip,
  Mic,
  ArrowUp,
  Cpu,
  History,
  Bot,
  Plus,
  MessageSquare,
  Search
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import apiClient from "@/lib/apiClient";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const ASST_CHIPS = [
  {
    icon: AlertTriangle,
    colorClass: "text-red-600",
    text: "Win back my lost Perplexity snippet",
    tag: "$40k at risk",
    warn: true,
  },
  {
    icon: Target,
    colorClass: "text-primary",
    text: "Close my top 3 GEO gaps",
    tag: "+$80k",
  },
  {
    icon: Quote,
    colorClass: "text-green-600",
    text: "How do I boost Gemini citations?",
    tag: "+6%",
  },
  {
    icon: TrendingUp,
    colorClass: "text-blue-600",
    text: "Summarize this week's visibility wins",
  },
  {
    icon: Swords,
    colorClass: "text-purple-600",
    text: "What is Competitor A doing differently?",
  },
  {
    icon: Rocket,
    colorClass: "text-sky-500",
    text: "Draft & publish 5 FAQ pages",
  },
];

const ASST_AGENTS = [
  {
    icon: Pencil,
    colorClass: "text-purple-600",
    bgClass: "bg-purple-50 dark:bg-purple-950/30",
    name: "Content",
  },
  {
    icon: Globe,
    colorClass: "text-primary",
    bgClass: "bg-primary/10",
    name: "GEO",
  },
  {
    icon: Quote,
    colorClass: "text-sky-500",
    bgClass: "bg-sky-50 dark:bg-sky-950/30",
    name: "Citation",
  },
  {
    icon: Swords,
    colorClass: "text-red-600",
    bgClass: "bg-red-50 dark:bg-red-950/30",
    name: "Competitor",
  },
  {
    icon: Award,
    colorClass: "text-green-600",
    bgClass: "bg-green-50 dark:bg-green-950/30",
    name: "Authority",
  },
  {
    icon: Code,
    colorClass: "text-slate-600 dark:text-slate-400",
    bgClass: "bg-slate-100 dark:bg-slate-800",
    name: "Technical",
  },
  {
    icon: MapPin,
    colorClass: "text-amber-600",
    bgClass: "bg-amber-50 dark:bg-amber-950/30",
    name: "Local",
  },
  {
    icon: DollarSign,
    colorClass: "text-emerald-700",
    bgClass: "bg-emerald-50 dark:bg-emerald-950/30",
    name: "Revenue",
  },
];

const ASST_RECENT = [
  {
    icon: Quote,
    colorClass: "text-sky-500",
    bgClass: "bg-sky-50 dark:bg-sky-950/30",
    text: "Improving citation rate on Claude",
    time: "2h ago",
  },
  {
    icon: Swords,
    colorClass: "text-red-600",
    bgClass: "bg-red-50 dark:bg-red-950/30",
    text: "Competitor A snippet analysis",
    time: "Yesterday",
  },
  {
    icon: Rocket,
    colorClass: "text-primary",
    bgClass: "bg-primary/10",
    text: "FAQ content batch for Q3",
    time: "2 days ago",
  },
];

export default function AssistantPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"ask" | "inspect">("ask");
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const [thinkingStatuses, setThinkingStatuses] = useState<string[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, thinkingStatuses]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg = text.trim();
    setInput("");
    
    const newMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages as any);
    setIsLoading(true);
    setThinkingStatuses([]);
    setIsThinking(true);
    setMode("ask");

    try {
      const baseUrl = apiClient.defaults.baseURL || "http://localhost:5100/api";
      const token = useAuthStore.getState().token;
      
      const response = await fetch(baseUrl + "/assistant/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          message: userMsg,
          history: messages
        })
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.replace('data: ', ''));
                if (data.status) {
                  if (data.status === "STATUS_DONE") {
                    setIsThinking(false);
                  } else if (data.status.startsWith("RESPONSE:")) {
                    const finalResponse = data.status.substring(9);
                    setMessages(prev => [...prev, { role: "assistant", content: finalResponse }]);
                  } else {
                    setThinkingStatuses(prev => [...prev, data.status]);
                  }
                }
              } catch (e) {
                console.error("Parse error", e, line);
              }
            }
          }
        }
      }
    } catch (err: any) {
      const errorMsg = err.message || "An error occurred";
      setMessages(prev => [...prev, { role: "assistant", content: `Error: ${errorMsg}` }]);
    } finally {
      setIsLoading(false);
      setIsThinking(false);
    }
  };

  const renderComposer = () => (
    <div className="w-full">
      <div className="flex items-end gap-2.5 bg-white border border-slate-200 focus-within:border-indigo-600 transition-all rounded-[24px] px-3 py-2 shadow-sm">
        <button className="w-8.5 h-8.5 rounded-lg text-slate-400 hover:bg-slate-100 flex items-center justify-center transition-colors shrink-0">
          <Paperclip className="w-5 h-5" />
        </button>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend(input);
            }
          }}
          placeholder="Ask Citationly anything..."
          className="flex-1 bg-transparent border-0 focus:ring-0 resize-none py-1.5 text-[14.5px] text-slate-900 outline-none max-h-30 min-h-6"
          rows={1}
          style={{ height: "auto" }}
        />
        <button className="w-8.5 h-8.5 rounded-lg text-slate-400 hover:bg-slate-100 flex items-center justify-center transition-colors shrink-0">
          <Mic className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleSend(input)}
          disabled={!input.trim() || isLoading}
          className="w-9.5 h-9.5 rounded-full bg-indigo-600 text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 shrink-0 shadow-sm shadow-indigo-600/20"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
      <div className="flex items-center gap-3 mt-3 text-[11.5px] text-muted-foreground font-medium px-1">
        <div className="flex items-center gap-1.5 hover:bg-muted/50 px-2 py-1 rounded-md cursor-pointer transition-colors">
          <Cpu className="w-3.5 h-3.5" /> Citationly Opus
        </div>
        <div className="flex items-center gap-1.5 hover:bg-muted/50 px-2 py-1 rounded-md cursor-pointer transition-colors">
          <Globe className="w-3.5 h-3.5" /> Web access on
        </div>
        <div className="ml-auto hidden sm:block opacity-60">
          Enter to send · Shift+Enter for newline
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] w-full max-w-350 mx-auto bg-white border border-slate-200 rounded-[14px] overflow-hidden shadow-sm">
      
      {/* Hub Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#f8fafc] border-b border-slate-200 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-[10px] bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-[15px] font-bold text-slate-900 leading-tight font-space-grotesk">Citationly Assistant</h2>
            <p className="text-[13px] text-slate-500">Ask anything — or inspect the real answers AI gives about you</p>
          </div>
        </div>
        
        <div className="flex items-center p-1 bg-slate-100 border border-slate-200 rounded-[11px]">
          <button 
            onClick={() => setMode("ask")}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[13px] font-semibold transition-colors ${mode === "ask" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
          >
            <MessageSquare className="w-4 h-4" /> Ask
          </button>
          <button 
            onClick={() => setMode("inspect")}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[13px] font-semibold transition-colors ${mode === "inspect" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
          >
            <Search className="w-4 h-4" /> Inspect
          </button>
        </div>
      </div>

      {messages.length === 0 ? (
        // Hero Empty State
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center overflow-y-auto">

          <h1 className="text-[30px] font-space-grotesk font-extrabold tracking-tight text-slate-900 mb-2">
            Hey there <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2.2 }} className="inline-block">👋</motion.span>, let's win the <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-[#A855F7]">AI search game</span>
          </h1>
          <p className="text-[15px] text-slate-500 max-w-130 mb-8">
            Ask me anything about your visibility, or fire off one of these — each tied to real pipeline impact.
          </p>

          <div className="flex flex-wrap gap-2.5 justify-center max-w-170">
            {ASST_CHIPS.map((chip, idx) => {
              const Icon = chip.icon;
              return (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, y: 8, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: idx * 0.06, duration: 0.45 }}
                  onClick={() => handleSend(chip.text)}
                  className="flex items-center gap-2 bg-white border border-slate-200 rounded-[13px] px-4 py-2.5 text-[13px] font-semibold text-slate-700 hover:-translate-y-1 hover:scale-[1.03] hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-600/10 transition-all"
                >
                  <Icon className={`w-4.25 h-4.25 ${chip.colorClass}`} />
                  {chip.text}
                  {chip.tag && (
                    <span className={`text-[11px] px-2 py-0.5 rounded-[6px] ${chip.warn ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>
                      {chip.tag}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>


          <div className="w-full max-w-170 mt-10">
            {renderComposer()}
          </div>
        </div>
      ) : (
        // Active Chat Split Layout
        <div className="flex-1 flex overflow-hidden">
          {/* Chat Column */}
          <div className="flex-1 flex flex-col min-w-0 border-r border-slate-200 bg-white">
            <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  key={i}
                  className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}
                >
                  {msg.role === "assistant" ? (
                    <div className="w-8 h-8 rounded-[9px] bg-linear-to-br from-primary to-[#A855F7] text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-[9px] bg-slate-800 dark:bg-slate-700 text-white flex items-center justify-center shrink-0 text-[12px] font-bold mt-1">
                      ME
                    </div>
                  )}

                  <div
                    className={`p-5 text-[14.5px] leading-[1.6] shadow-[0_1px_3px_rgba(0,0,0,0.02)] ${
                      msg.role === "user"
                        ? "bg-indigo-600 text-white rounded-[20px_20px_0_20px]"
                        : "bg-white border border-slate-200 text-slate-900 rounded-[0_20px_20px_20px]"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    ) : (
                      <div className="prose prose-sm max-w-none overflow-x-auto text-slate-900 prose-p:leading-[1.6] prose-p:mb-[12px]">
                        <ReactMarkdown
                          components={{
                            code({ node, inline, className, children, ...props }: any) {
                              const match = /language-(\w+)/.exec(className || "");
                              if (!inline && match && match[1] === "chart") {
                                try {
                                  const data = JSON.parse(String(children));
                                  return (
                                    <div className="h-56 w-full my-3 p-4 rounded-[12px] border bg-white">
                                      <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={data}>
                                          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                          <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} contentStyle={{ borderRadius: "8px" }} />
                                          <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                      </ResponsiveContainer>
                                    </div>
                                  );
                                } catch (e) {
                                  return null;
                                }
                              }
                              return !inline && match ? (
                                <SyntaxHighlighter style={vscDarkPlus as any} language={match[1]} PreTag="div" className="rounded-xl my-2 text-[12px] border w-full">
                                  {String(children).replace(/\n$/, "")}
                                </SyntaxHighlighter>
                              ) : (
                                <code className="bg-slate-100 px-1.5 py-0.5 rounded text-[11px] font-mono text-slate-800" {...props}>{children}</code>
                              );
                            }
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {isThinking && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-[9px] bg-linear-to-br from-primary to-[#A855F7] text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col gap-2">
                    {thinkingStatuses.map((s, idx) => (
                      <motion.div key={idx} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-[13px] text-muted-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-pulse" />
                        {s}
                      </motion.div>
                    ))}
                    <div className="flex items-center gap-1.5 px-3 py-2 bg-muted/20 rounded-[14px] w-fit border border-border/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.2s" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.4s" }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="p-4 bg-background border-t border-border/50">
              {renderComposer()}
            </div>
          </div>

          {/* Right Rail */}
          <div className="w-70 bg-[#f8fafc] hidden lg:flex flex-col overflow-y-auto">
            <div className="p-4 pt-5 pb-2 border-b border-slate-200">
              <button 
                onClick={() => setMessages([])}
                className="w-full py-2.5 px-4 border-2 border-dashed border-indigo-200 text-indigo-600 font-semibold text-[13px] rounded-[11px] flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors"
              >
                <Plus className="w-4 h-4" /> New chat
              </button>
            </div>
            
            <div className="p-4 pb-2">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-slate-500 font-bold mb-3">
                <History className="w-3.5 h-3.5" /> Recent
              </div>
              <div className="flex flex-col gap-1">
                {ASST_RECENT.map((r, idx) => {
                  const Icon = r.icon;
                  return (
                    <button key={idx} className="flex items-center gap-3 p-2.5 rounded-[11px] hover:bg-slate-200/50 transition-colors text-left">
                      <div className={`w-7.5 h-7.5 shrink-0 rounded-lg flex items-center justify-center ${r.bgClass} ${r.colorClass}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12.5px] font-semibold text-slate-900 truncate">{r.text}</div>
                        <div className="text-[11px] text-slate-500">{r.time}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-4 pt-2">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-slate-500 font-bold mb-3">
                <Bot className="w-3.5 h-3.5" /> Quick agents
              </div>
              <div className="grid grid-cols-2 gap-2">
                {ASST_AGENTS.map((agent, idx) => {
                  const Icon = agent.icon;
                  return (
                    <button 
                      key={idx}
                      onClick={() => handleSend(`Launch the ${agent.name} agent`)}
                      className="flex flex-col items-center gap-1.5 p-3 bg-white border border-slate-200 rounded-[11px] hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-sm transition-all"
                    >
                      <div className={`w-7.5 h-7.5 rounded-lg flex items-center justify-center ${agent.bgClass} ${agent.colorClass}`}>
                        <Icon className="w-3.75 h-3.75" />
                      </div>
                      <span className="text-[10.5px] font-semibold text-slate-500">{agent.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
