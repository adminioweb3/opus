"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Mic, ArrowUp, X, Sparkles, ChevronDown, User, Bot, LayoutDashboard, Database } from "lucide-react"
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import apiClient from '@/lib/apiClient'

type RecentItem = {
  id: number
  name: string
  owner: string
  type: string
  updatedAt: string
}

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export default function AssistantPage() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [recentItems, setRecentItems] = useState<RecentItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showConnectBanner, setShowConnectBanner] = useState(true)

  useEffect(() => {
    apiClient.get("/assistant/recent")
      .then(res => setRecentItems(res.data))
      .catch(err => console.error("Error fetching recent items:", err))
  }, [])

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const res = await apiClient.post("/assistant/chat", { 
        message: userMessage,
        history: messages 
      })
      setMessages(prev => [...prev, { role: 'assistant', content: res.data.reply }])
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || err.message || "An error occurred"
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${errorMsg}` }])
    } finally {
      setIsLoading(false)
    }
  }

  const suggestions = [
    "Which competitors are improving?",
    "Improve my visibility",
    "Top performing topics"
  ]

  // Chat View
  if (messages.length > 0) {
    return (
      <div className="flex flex-col h-[calc(100vh-2rem)] relative max-w-5xl mx-auto w-full pt-6">
        <div className="flex items-center gap-2 mb-6 px-4">
          <span className="text-sm font-medium text-muted-foreground flex items-center cursor-pointer hover:text-foreground">
            Select a chat <ChevronDown className="w-4 h-4 ml-1" />
          </span>
          <span className="text-[10px] bg-blue-100/20 text-blue-600 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">Beta</span>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 space-y-8 pb-32 no-scrollbar">
          {messages.map((msg, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1 border border-primary/20">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
              )}
              <div className={`p-4 rounded-2xl ${msg.role === 'assistant' ? 'w-full max-w-[90%]' : 'max-w-[85%]'} shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-muted text-foreground rounded-tr-sm' 
                  : 'bg-card border text-foreground rounded-tl-sm'
              }`}>
                {msg.role === 'user' ? (
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                ) : (
                  <div className="text-sm leading-relaxed overflow-x-auto w-full prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown
                      components={{
                        code({ node, inline, className, children, ...props }: any) {
                          const match = /language-(\w+)/.exec(className || '')
                          return !inline && match ? (
                            <SyntaxHighlighter
                              style={vscDarkPlus as any}
                              language={match[1]}
                              PreTag="div"
                              className="rounded-xl my-3 !bg-[#1A1A1A] text-[13px] border shadow-sm w-full"
                              showLineNumbers={false}
                              customStyle={{ padding: '1rem', margin: 0, overflowX: 'auto', width: '100%' }}
                              {...props}
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          ) : (
                            <code className={`${className} bg-muted px-1.5 py-0.5 rounded-md font-mono text-xs`} {...props}>
                              {children}
                            </code>
                          )
                        }
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </motion.div>
          ))}
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 justify-start">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1 border border-primary/20">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div className="p-4 rounded-2xl flex items-center gap-2 bg-card border shadow-sm rounded-tl-sm">
                <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce delay-75" />
                <span className="w-2 h-2 rounded-full bg-primary/80 animate-bounce delay-150" />
              </div>
            </motion.div>
          )}
        </div>

        {/* Floating Input at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/95 to-transparent pt-10">
          <form onSubmit={handleSubmit} className="relative bg-card border rounded-2xl shadow-md focus-within:ring-1 focus-within:ring-primary/50 transition-all overflow-hidden flex flex-col">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit()
                }
              }}
              placeholder="Ask about your visibility, build an agent, create content..."
              className="w-full bg-transparent border-none focus:ring-0 resize-none px-4 pt-4 pb-2 text-sm min-h-[60px] max-h-[200px] outline-none"
              rows={1}
            />
            <div className="flex items-center justify-between px-3 pb-3">
              <div className="flex items-center gap-2">
                <button type="button" className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1 bg-muted/50 hover:bg-muted cursor-pointer px-3 py-1.5 rounded-full text-xs font-medium text-foreground transition-colors">
                  <Sparkles className="w-3 h-3 text-muted-foreground" /> Auto <ChevronDown className="w-3 h-3 text-muted-foreground ml-1" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors">
                  <Mic className="w-4 h-4" />
                </button>
                <button 
                  type="submit" 
                  disabled={!input.trim() || isLoading}
                  className="w-8 h-8 rounded-full bg-foreground text-background disabled:opacity-30 flex items-center justify-center transition-opacity"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // Initial View
  return (
    <div className="flex flex-col min-h-full max-w-4xl mx-auto w-full pt-6 pb-20 px-4">
      <div className="flex items-center gap-2 mb-12">
        <span className="text-sm font-medium text-muted-foreground flex items-center cursor-pointer hover:text-foreground transition-colors">
          Select a chat <ChevronDown className="w-4 h-4 ml-1" />
        </span>
        <span className="text-[10px] bg-blue-100/20 text-blue-600 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">Beta</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl mx-auto mt-10">
        <div className="relative mb-8 text-center w-full">
          <div className="absolute inset-0 blur-[40px] bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-50 -z-10 h-20" />
          <h1 className="text-2xl font-semibold tracking-tight text-foreground relative z-10">Let's analyze data</h1>
        </div>

        <div className="w-full space-y-4">
          {/* Main Input Box */}
          <form onSubmit={handleSubmit} className="relative bg-card border rounded-2xl shadow-sm focus-within:ring-1 focus-within:ring-primary/50 transition-all flex flex-col overflow-hidden">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit()
                }
              }}
              placeholder="Ask about your visibility, build an agent, create content..."
              className="w-full bg-transparent border-none focus:ring-0 resize-none px-4 pt-4 pb-2 text-sm min-h-[60px] outline-none"
              rows={1}
            />
            <div className="flex items-center justify-between px-3 pb-3">
              <div className="flex items-center gap-2">
                <button type="button" className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1 bg-muted/50 hover:bg-muted cursor-pointer px-3 py-1.5 rounded-full text-xs font-medium text-foreground transition-colors">
                  <Sparkles className="w-3 h-3 text-muted-foreground" /> Auto <ChevronDown className="w-3 h-3 text-muted-foreground ml-1" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors">
                  <Mic className="w-4 h-4" />
                </button>
                <button 
                  type="submit" 
                  disabled={!input.trim() || isLoading}
                  className="w-8 h-8 rounded-full bg-foreground text-background disabled:opacity-30 flex items-center justify-center transition-opacity"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>

          {/* Connect Tools Banner */}
          <AnimatePresence>
            {showConnectBanner && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center justify-between bg-muted/30 border border-muted/50 px-4 py-2.5 rounded-xl text-sm overflow-hidden"
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-1.5 shrink-0">
                    <div className="w-5 h-5 rounded-sm bg-blue-500/20 flex items-center justify-center border border-background"><LayoutDashboard className="w-3 h-3 text-blue-600" /></div>
                    <div className="w-5 h-5 rounded-sm bg-purple-500/20 flex items-center justify-center border border-background"><Database className="w-3 h-3 text-purple-600" /></div>
                    <div className="w-5 h-5 rounded-sm bg-green-500/20 flex items-center justify-center border border-background"><Sparkles className="w-3 h-3 text-green-600" /></div>
                  </div>
                  <span className="text-muted-foreground text-xs font-medium">Profound works better with all of your existing tools</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button className="text-[11px] font-semibold bg-background border shadow-sm px-3 py-1.5 rounded-lg hover:bg-muted transition-colors">
                    Connect tools
                  </button>
                  <button onClick={() => setShowConnectBanner(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Suggested Prompts */}
          <div className="flex flex-col gap-1 pt-2">
            {suggestions.map((sug, i) => (
              <button 
                key={i} 
                onClick={() => setInput(sug)}
                className="flex items-center justify-between px-4 py-3 text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors rounded-xl text-left border border-transparent hover:border-border"
              >
                {sug}
                <Plus className="w-4 h-4 opacity-40 hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recently Updated */}
      <div className="mt-20 w-full max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">Recently updated</h3>
          <div className="flex items-center bg-muted/40 p-0.5 rounded-lg gap-1">
            {["All", "Projects", "Sheets", "Agents"].map((filter, i) => (
              <button 
                key={filter} 
                className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
                  i === 0 ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="border rounded-2xl bg-card overflow-hidden">
          {recentItems.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">No recent items</div>
          ) : (
            <div className="divide-y divide-border">
              {recentItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3 w-1/2">
                    <Bot className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2 w-1/4">
                    <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <User className="w-3 h-3 text-muted-foreground" />
                    </div>
                    <span className="text-xs text-muted-foreground truncate">{item.owner}</span>
                  </div>
                  <div className="w-1/4 text-right">
                    <span className="text-xs text-muted-foreground">{item.updatedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
