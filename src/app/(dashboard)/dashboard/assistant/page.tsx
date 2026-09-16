"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUp,
  Check,
  Copy,
  Database,
  Globe2,
  Loader2,
  Menu,
  MessageSquare,
  Plus,
  Search,
  Sparkles,
  Square,
  Trash2,
  X,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import apiClient, { getApiBaseUrl } from "@/lib/apiClient";
import { useAuthStore } from "@/lib/stores/auth-store";

type Thread = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

type StreamEvent = { event: string; data: Record<string, unknown> };

const suggestions = [
  { icon: Database, label: "Summarize my AI visibility" },
  { icon: Search, label: "Where are my biggest citation gaps?" },
  { icon: Globe2, label: "Compare my platform performance" },
  { icon: Sparkles, label: "What should I improve first?" },
];

function parseSseBlock(block: string): StreamEvent | null {
  let event = "message";
  const data: string[] = [];

  for (const line of block.split("\n")) {
    if (line.startsWith("event:")) event = line.slice(6).trim();
    if (line.startsWith("data:")) data.push(line.slice(5).trimStart());
  }

  if (!data.length) return null;
  try {
    return { event, data: JSON.parse(data.join("\n")) };
  } catch {
    return null;
  }
}

export default function AssistantPage() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<"ask" | "inspect">("ask");
  const [status, setStatus] = useState("");
  const [isLoadingThreads, setIsLoadingThreads] = useState(true);
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const loadThreads = useCallback(async () => {
    const response = await apiClient.get<Thread[]>("/assistant/threads");
    setThreads(response.data);
    return response.data;
  }, []);

  const openThread = useCallback(async (threadId: string) => {
    setActiveThreadId(threadId);
    setSidebarOpen(false);
    setIsLoadingChat(true);
    try {
      const response = await apiClient.get<{ thread: Thread; messages: Message[] }>(`/assistant/threads/${threadId}`);
      setMessages(response.data.messages);
    } finally {
      setIsLoadingChat(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    // The state update occurs after the API promise resolves; this is initial data loading.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadThreads()
      .then((items) => {
        if (!cancelled && items[0]) void openThread(items[0].id);
      })
      .catch(() => setThreads([]))
      .finally(() => setIsLoadingThreads(false));
    return () => {
      cancelled = true;
      abortRef.current?.abort();
    };
  }, [loadThreads, openThread]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  const filteredThreads = useMemo(() => {
    const query = search.trim().toLowerCase();
    return query ? threads.filter((thread) => thread.title.toLowerCase().includes(query)) : threads;
  }, [search, threads]);

  const createThread = async () => {
    abortRef.current?.abort();
    const response = await apiClient.post<Thread>("/assistant/threads", {});
    setThreads((current) => [response.data, ...current]);
    setActiveThreadId(response.data.id);
    setMessages([]);
    setInput("");
    setStatus("");
    setSidebarOpen(false);
    return response.data.id;
  };

  const deleteThread = async (threadId: string) => {
    await apiClient.delete(`/assistant/threads/${threadId}`);
    const remaining = threads.filter((thread) => thread.id !== threadId);
    setThreads(remaining);
    if (activeThreadId === threadId) {
      setActiveThreadId(null);
      setMessages([]);
      if (remaining[0]) void openThread(remaining[0].id);
    }
  };

  const stopGeneration = () => abortRef.current?.abort();

  const sendMessage = async (text = input) => {
    const content = text.trim();
    if (!content || isGenerating) return;

    let threadId = activeThreadId;
    if (!threadId) threadId = await createThread();

    const userMessage: Message = {
      id: `local-user-${Date.now()}`,
      role: "user",
      content,
      createdAt: new Date().toISOString(),
    };
    const assistantId = `local-assistant-${Date.now()}`;
    setMessages((current) => [
      ...current,
      userMessage,
      { id: assistantId, role: "assistant", content: "", createdAt: new Date().toISOString() },
    ]);
    setInput("");
    setStatus("Understanding your request...");
    setIsGenerating(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const token = useAuthStore.getState().token;
      const response = await fetch(`${getApiBaseUrl()}/assistant/threads/${threadId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ message: content, mode }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) throw new Error("The assistant is unavailable right now.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        buffer += decoder.decode(value, { stream: !done }).replace(/\r\n/g, "\n");
        const blocks = buffer.split("\n\n");
        buffer = blocks.pop() ?? "";

        for (const block of blocks) {
          const parsed = parseSseBlock(block);
          if (!parsed) continue;

          if (parsed.event === "run.status") setStatus(String(parsed.data.status ?? ""));
          if (parsed.event === "message.delta") {
            const delta = String(parsed.data.delta ?? "");
            setStatus("");
            setMessages((current) => current.map((message) =>
              message.id === assistantId ? { ...message, content: message.content + delta } : message));
          }
          if (parsed.event === "message.completed" && parsed.data.message) {
            const completed = parsed.data.message as Message;
            setMessages((current) => current.map((message) =>
              message.id === assistantId ? completed : message));
          }
          if (parsed.event === "error") throw new Error(String(parsed.data.message ?? "Response failed."));
        }

        if (done) break;
      }

      await loadThreads();
    } catch (error) {
      if (controller.signal.aborted) {
        setMessages((current) => current.filter((message) => message.id !== assistantId || message.content.length > 0));
      } else {
        const message = error instanceof Error ? error.message : "Response failed.";
        setMessages((current) => current.map((item) =>
          item.id === assistantId ? { ...item, content: `**Something went wrong.** ${message}` } : item));
      }
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
      setStatus("");
      setIsGenerating(false);
    }
  };

  const copyMessage = async (message: Message) => {
    await navigator.clipboard.writeText(message.content);
    setCopiedId(message.id);
    window.setTimeout(() => setCopiedId(null), 1500);
  };

  const composer = (
    <div className="mx-auto w-full max-w-3xl px-4 pb-4">
      <div className="rounded-2xl border border-slate-300 bg-white p-2 shadow-sm focus-within:border-slate-500">
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              void sendMessage();
            }
          }}
          placeholder={mode === "inspect" ? "Ask about evidence in your Citationly workspace" : "Message Citationly Assistant"}
          rows={1}
          className="max-h-40 min-h-12 w-full resize-none bg-transparent px-3 py-2 text-[15px] text-slate-900 outline-none placeholder:text-slate-400"
        />
        <div className="flex items-center justify-between gap-3 px-1">
          <div className="flex rounded-lg bg-slate-100 p-1" aria-label="Assistant mode">
            <button
              type="button"
              onClick={() => setMode("ask")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium ${mode === "ask" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}
            >
              Ask
            </button>
            <button
              type="button"
              onClick={() => setMode("inspect")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium ${mode === "inspect" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}
            >
              Inspect
            </button>
          </div>
          {isGenerating ? (
            <button type="button" onClick={stopGeneration} title="Stop generating" className="flex size-9 items-center justify-center rounded-full bg-slate-900 text-white">
              <Square className="size-3.5 fill-current" />
            </button>
          ) : (
            <button type="button" onClick={() => void sendMessage()} disabled={!input.trim()} title="Send message" className="flex size-9 items-center justify-center rounded-full bg-slate-900 text-white disabled:bg-slate-200 disabled:text-slate-400">
              <ArrowUp className="size-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative flex h-[calc(100vh-6rem)] min-h-150 overflow-hidden border border-slate-200 bg-white">
      {sidebarOpen && <button className="fixed inset-0 z-30 bg-black/20 lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close conversations" />}

      <aside className={`absolute inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-slate-50 transition-transform lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center gap-2 p-3">
          <button onClick={() => void createThread()} className="flex h-10 flex-1 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-800 hover:bg-slate-100">
            <Plus className="size-4" /> New chat
          </button>
          <button onClick={() => setSidebarOpen(false)} title="Close" className="flex size-10 items-center justify-center text-slate-500 lg:hidden">
            <X className="size-5" />
          </button>
        </div>
        <div className="px-3 pb-3">
          <div className="flex h-9 items-center gap-2 rounded-lg bg-slate-100 px-3 text-slate-500">
            <Search className="size-4" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search chats" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-2 pb-3">
          {isLoadingThreads ? (
            <Loader2 className="mx-auto mt-6 size-5 animate-spin text-slate-400" />
          ) : filteredThreads.length === 0 ? (
            <p className="px-3 py-6 text-center text-xs text-slate-400">No conversations yet</p>
          ) : filteredThreads.map((thread) => (
            <div key={thread.id} className={`group mb-1 flex items-center rounded-lg ${activeThreadId === thread.id ? "bg-slate-200" : "hover:bg-slate-100"}`}>
              <button onClick={() => void openThread(thread.id)} className="flex min-w-0 flex-1 items-center gap-2.5 px-3 py-2.5 text-left">
                <MessageSquare className="size-4 shrink-0 text-slate-500" />
                <span className="truncate text-sm text-slate-700">{thread.title}</span>
              </button>
              <button onClick={() => void deleteThread(thread.id)} title="Delete conversation" className="mr-2 hidden size-7 items-center justify-center rounded-md text-slate-400 hover:bg-white hover:text-red-600 group-hover:flex">
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-200 px-4 py-3 text-xs font-medium text-slate-500">
          Citationly workspace
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col bg-white">
        <header className="flex h-14 shrink-0 items-center border-b border-slate-200 px-4">
          <button onClick={() => setSidebarOpen(true)} title="Open conversations" className="mr-2 flex size-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden">
            <Menu className="size-5" />
          </button>
          <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <Sparkles className="size-4" />
          </div>
          <div className="ml-3 min-w-0">
            <h1 className="truncate text-sm font-semibold text-slate-900">Citationly Assistant</h1>
            <p className="text-xs text-slate-500">Workspace data connected</p>
          </div>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          {isLoadingChat ? (
            <div className="flex h-full items-center justify-center"><Loader2 className="size-6 animate-spin text-slate-400" /></div>
          ) : messages.length === 0 ? (
            <div className="mx-auto flex h-full max-w-3xl flex-col justify-center px-6 py-10">
              <div className="mb-8">
                <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-indigo-600 text-white"><Sparkles className="size-5" /></div>
                <h2 className="text-2xl font-semibold text-slate-900">What can I help you with?</h2>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {suggestions.map(({ icon: Icon, label }) => (
                  <button key={label} onClick={() => void sendMessage(label)} className="flex min-h-14 items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 text-left text-sm text-slate-700 hover:border-slate-400 hover:bg-slate-50">
                    <Icon className="size-4 shrink-0 text-indigo-600" /> {label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mx-auto w-full max-w-3xl px-4 py-8">
              {messages.map((message) => (
                <motion.article key={message.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className={`mb-8 flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  {message.role === "assistant" && (
                    <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white"><Sparkles className="size-4" /></div>
                  )}
                  <div className={message.role === "user" ? "max-w-[82%] rounded-2xl bg-slate-100 px-4 py-3 text-[15px] leading-6 text-slate-900" : "group min-w-0 max-w-[calc(100%-3rem)] flex-1 text-[15px] leading-7 text-slate-800"}>
                    {message.role === "user" ? <p className="whitespace-pre-wrap">{message.content}</p> : message.content ? (
                      <>
                        <div className="prose prose-slate prose-sm max-w-none prose-headings:mt-6 prose-headings:mb-2 prose-p:my-3 prose-li:my-1 prose-pre:overflow-x-auto prose-table:block prose-table:overflow-x-auto">
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                        <button onClick={() => void copyMessage(message)} title="Copy response" className="mt-2 flex size-8 items-center justify-center rounded-md text-slate-400 opacity-0 hover:bg-slate-100 hover:text-slate-700 group-hover:opacity-100 focus:opacity-100">
                          {copiedId === message.id ? <Check className="size-4" /> : <Copy className="size-4" />}
                        </button>
                      </>
                    ) : (
                      <div className="flex h-8 items-center gap-1.5"><span className="size-1.5 animate-pulse rounded-full bg-slate-400" /><span className="size-1.5 animate-pulse rounded-full bg-slate-400 [animation-delay:150ms]" /><span className="size-1.5 animate-pulse rounded-full bg-slate-400 [animation-delay:300ms]" /></div>
                    )}
                  </div>
                </motion.article>
              ))}
              {status && <div className="ml-12 flex items-center gap-2 pb-4 text-sm text-slate-500"><Loader2 className="size-4 animate-spin" /> {status}</div>}
            </div>
          )}
        </div>

        {composer}
      </main>
    </div>
  );
}
