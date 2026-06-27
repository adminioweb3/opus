"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Mic,
  ArrowUp,
  Sparkles,
  User,
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
  Cpu,
  Search,
  History,
  Bot,
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
    ic: AlertTriangle,
    c: "text-red-600",
    t: "Win back my lost Perplexity snippet",
    tag: "$40k at risk",
    warn: true,
  },
  {
    ic: Target,
    c: "text-primary",
    t: "Close my top 3 GEO gaps",
    tag: "+$80k",
    warn: false,
  },
  {
    ic: Quote,
    c: "text-green-600",
    t: "How do I boost Gemini citations?",
    tag: "+6%",
    warn: false,
  },
  {
    ic: TrendingUp,
    c: "text-blue-600",
    t: "Summarize this week’s visibility wins",
    warn: false,
  },
  {
    ic: Swords,
    c: "text-purple-600",
    t: "What is Competitor A doing differently?",
    warn: false,
  },
  {
    ic: Rocket,
    c: "text-sky-500",
    t: "Draft & publish 5 FAQ pages",
    warn: false,
  },
];

const ASST_AGENTS = [
  {
    ic: Pencil,
    c: "text-purple-600",
    bg: "bg-purple-50 dark:bg-purple-950/30 border-purple-100 dark:border-purple-900",
    n: "Content",
  },
  {
    ic: Globe,
    c: "text-primary",
    bg: "bg-primary/10 border-primary/20",
    n: "GEO",
  },
  {
    ic: Quote,
    c: "text-sky-500",
    bg: "bg-sky-50 dark:bg-sky-950/30 border-sky-100 dark:border-sky-900",
    n: "Citation",
  },
  {
    ic: Swords,
    c: "text-red-600",
    bg: "bg-red-50 dark:bg-red-950/30 border-red-100 dark:border-red-900",
    n: "Competitor",
  },
  {
    ic: Award,
    c: "text-green-600",
    bg: "bg-green-50 dark:bg-green-950/30 border-green-100 dark:border-green-900",
    n: "Authority",
  },
  {
    ic: Code,
    c: "text-slate-600 dark:text-slate-400",
    bg: "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700",
    n: "Technical",
  },
  {
    ic: MapPin,
    c: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900",
    n: "Local",
  },
  {
    ic: DollarSign,
    c: "text-emerald-700",
    bg: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900",
    n: "Revenue",
  },
];

const ASST_RECENT = [
  {
    ic: Quote,
    c: "text-sky-500",
    bg: "bg-sky-50 dark:bg-sky-950/30",
    t: "Improving citation rate on Claude",
    time: "2h ago",
  },
  {
    ic: Swords,
    c: "text-red-600",
    bg: "bg-red-50 dark:bg-red-950/30",
    t: "Competitor A snippet analysis",
    time: "Yesterday",
  },
  {
    ic: Rocket,
    c: "text-primary",
    bg: "bg-primary/10",
    t: "FAQ content batch for Q3",
    time: "2 days ago",
  },
];

export default function AssistantPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg = text.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsLoading(true);

    try {
      const res = await apiClient.post("/assistant/chat", {
        message: userMsg,
        history: messages,
      });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.data.reply },
      ]);
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.error || err.message || "An error occurred";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Error: ${errorMsg}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderComposer = () => (
    <div className="w-full">
      <div className="flex items-end gap-2.5 bg-muted/30 dark:bg-muted/10 border-2 border-transparent focus-within:border-primary/50 focus-within:bg-background transition-all rounded-[16px] p-2.5">
        <button className="w-[34px] h-[34px] rounded-lg text-muted-foreground hover:bg-muted/50 flex items-center justify-center transition-colors shrink-0">
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
          className="flex-1 bg-transparent border-0 focus:ring-0 resize-none py-1.5 text-sm text-foreground outline-none max-h-[120px] min-h-[24px]"
          rows={1}
          style={{ height: "auto" }}
        />
        <button className="w-[34px] h-[34px] rounded-lg text-muted-foreground hover:bg-muted/50 flex items-center justify-center transition-colors shrink-0">
          <Mic className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleSend(input)}
          disabled={!input.trim() || isLoading}
          className="w-[38px] h-[38px] rounded-[11px] bg-primary text-primary-foreground flex items-center justify-center transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 shrink-0 shadow-sm shadow-primary/20"
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

  if (messages.length > 0) {
    return (
      <div className="flex h-[calc(100vh-6rem)] w-full max-w-7xl mx-auto bg-background overflow-hidden -mx-4 sm:mx-auto border-t border-border/50">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0 border-r border-border/50">
          <div
            ref={chatScrollRef}
            className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5 no-scrollbar"
          >
            {messages.map((msg, i) => (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                key={i}
                className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}
              >
                {msg.role === "assistant" ? (
                  <div className="w-8 h-8 rounded-[9px] bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-sm mt-1">
                    <Sparkles className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-[9px] bg-slate-800 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-1">
                    SC
                  </div>
                )}

                <div
                  className={`p-3.5 rounded-[14px] text-sm leading-relaxed border shadow-sm ${
                    msg.role === "user"
                      ? "bg-slate-800 border-slate-800 text-white"
                      : "bg-card border-border/50 text-foreground"
                  }`}
                >
                  {msg.role === "user" ? (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  ) : (
                    <div className="prose prose-sm dark:prose-invert max-w-none overflow-x-auto">
                      <ReactMarkdown
                        components={{
                          code({
                            node,
                            inline,
                            className,
                            children,
                            ...props
                          }: any) {
                            const match = /language-(\w+)/.exec(
                              className || "",
                            );
                            if (!inline && match && match[1] === "chart") {
                              try {
                                const data = JSON.parse(String(children));
                                return (
                                  <div className="h-56 w-full my-3 p-4 rounded-xl border bg-background">
                                    <ResponsiveContainer
                                      width="100%"
                                      height="100%"
                                    >
                                      <BarChart data={data}>
                                        <XAxis
                                          dataKey="name"
                                          stroke="#888888"
                                          fontSize={12}
                                          tickLine={false}
                                          axisLine={false}
                                        />
                                        <YAxis
                                          stroke="#888888"
                                          fontSize={12}
                                          tickLine={false}
                                          axisLine={false}
                                        />
                                        <Tooltip
                                          cursor={{ fill: "rgba(0,0,0,0.05)" }}
                                          contentStyle={{ borderRadius: "8px" }}
                                        />
                                        <Bar
                                          dataKey="value"
                                          fill="hsl(var(--primary))"
                                          radius={[4, 4, 0, 0]}
                                        />
                                      </BarChart>
                                    </ResponsiveContainer>
                                  </div>
                                );
                              } catch (e) {
                                return null;
                              }
                            }
                            return !inline && match ? (
                              <SyntaxHighlighter
                                style={vscDarkPlus as any}
                                language={match[1]}
                                PreTag="div"
                                className="rounded-xl my-2 text-[12px] border w-full"
                              >
                                {String(children).replace(/\n$/, "")}
                              </SyntaxHighlighter>
                            ) : (
                              <code
                                className="bg-muted px-1.5 py-0.5 rounded text-[11px] font-mono"
                                {...props}
                              >
                                {children}
                              </code>
                            );
                          },
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3 max-w-[85%]"
              >
                <div className="w-8 h-8 rounded-[9px] bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-sm mt-1">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-[14px] bg-card border border-border/50 shadow-sm flex items-center gap-1.5 h-[52px]">
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.2, delay: 0 }}
                    className="w-1.5 h-1.5 rounded-full bg-primary"
                  />
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}
                    className="w-1.5 h-1.5 rounded-full bg-primary"
                  />
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }}
                    className="w-1.5 h-1.5 rounded-full bg-primary"
                  />
                </div>
              </motion.div>
            )}
          </div>
          <div className="p-3 md:p-5 bg-background border-t border-border/50">
            {renderComposer()}
          </div>
        </div>

        {/* Right Rail */}
        <div className="hidden lg:flex flex-col w-[260px] shrink-0 bg-background overflow-y-auto no-scrollbar">
          <div className="p-4">
            <button
              onClick={() => setMessages([])}
              className="w-full py-2 rounded-xl border-2 border-dashed border-primary/30 text-primary text-[12px] font-semibold hover:bg-primary/5 hover:border-primary/50 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-3.5 h-3.5" /> New chat
            </button>
          </div>

          <div className="px-4 pb-3">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-2.5 flex items-center gap-1.5">
              <History className="w-3 h-3" /> Recent
            </div>
            <div className="space-y-0.5">
              {ASST_RECENT.map((r, i) => {
                const Icon = r.ic;
                return (
                  <div
                    key={i}
                    className="flex gap-2.5 p-2 rounded-xl hover:bg-muted/50 cursor-pointer transition-colors group"
                  >
                    <div
                      className={`w-7 h-7 rounded-[7px] flex items-center justify-center shrink-0 ${r.bg} ${r.c} border border-transparent group-hover:border-border/50`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11.5px] font-semibold text-foreground leading-tight truncate">
                        {r.t}
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">
                        {r.time}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="px-4 pb-4">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-2.5 flex items-center gap-1.5 mt-2">
              <Bot className="w-3 h-3" /> Quick agents
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {ASST_AGENTS.map((a, i) => {
                const Icon = a.ic;
                return (
                  <div
                    key={i}
                    onClick={() => handleSend(`Launch the ${a.n} agent`)}
                    className="flex flex-col items-center gap-1 p-2 rounded-xl border border-border/50 hover:border-primary/50 hover:shadow-sm hover:shadow-primary/5 cursor-pointer transition-all bg-card"
                  >
                    <div
                      className={`w-7 h-7 rounded-[7px] flex items-center justify-center ${a.bg} ${a.c}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-[9.5px] font-semibold text-muted-foreground">
                      {a.n}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Initial Empty Hero State
  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] w-full items-center justify-between px-4 overflow-hidden bg-background">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-start w-full max-w-[700px] flex-1 min-h-0 pt-3 sm:pt-5 pb-4"
      >
        {/* Removed Floating Orb */}

        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground text-center mb-1">
          Hey Sarah{" "}
          <motion.span
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="inline-block"
          >
            👋
          </motion.span>
          , let's win the <span className="text-primary">AI search game</span>
        </h1>
        <p className="text-[13px] text-muted-foreground text-center mb-4 max-w-[500px]">
          Ask me anything about your visibility, or fire off one of these — each
          tied to real pipeline impact.
        </p>

        {/* Action Chips */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-5 w-full">
          {ASST_CHIPS.map((c, i) => {
            const Icon = c.ic;
            return (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: i * 0.05 + 0.1, duration: 0.4 }}
                onClick={() => handleSend(c.t)}
                className="flex items-center gap-1.5 bg-card border border-border/80 hover:border-primary hover:shadow-sm hover:shadow-primary/10 rounded-2xl px-3 py-1.5 text-[11.5px] font-semibold text-foreground transition-all hover:-translate-y-0.5 group"
              >
                <Icon className={`w-3.5 h-3.5 ${c.c}`} />
                {c.t}
                {c.tag && (
                  <span
                    className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded-[5px] ml-0.5 ${c.warn ? "bg-red-50 text-red-600 dark:bg-red-950/40" : "bg-green-50 text-green-700 dark:bg-green-950/40"}`}
                  >
                    {c.tag}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Quick Launch Agents Grid */}
        <div className="w-full mb-0">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-2.5 text-center">
            Or launch an agent
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {ASST_AGENTS.map((a, i) => {
              const Icon = a.ic;
              return (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: i * 0.04 + 0.3, duration: 0.4 }}
                  onClick={() => handleSend(`Launch the ${a.n} agent`)}
                  className="flex flex-col items-center gap-1.5 bg-card border border-border/80 hover:border-primary hover:shadow-sm hover:shadow-primary/10 rounded-[10px] p-2 transition-all hover:-translate-y-0.5"
                >
                  <div
                    className={`w-7 h-7 rounded-[7px] flex items-center justify-center ${a.bg} ${a.c} border`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-[10px] font-semibold text-foreground text-center leading-tight">
                    {a.n} agent
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Composer at the bottom of the screen */}
      <div className="w-full max-w-[700px] shrink-0 pb-2">
        {renderComposer()}
      </div>
    </div>
  );
}
