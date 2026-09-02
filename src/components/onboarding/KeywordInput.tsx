"use client"

import { useState, useRef } from "react"
import { X } from "lucide-react"

interface KeywordInputProps {
  value: string
  onChange: (value: string) => void
  minKeywords?: number
  maxKeywords?: number
  suggestions?: string[]
  onSuggestionsUsed?: () => void
}

export function KeywordInput({
  value,
  onChange,
  minKeywords = 5,
  maxKeywords = 20,
  suggestions = [],
  onSuggestionsUsed
}: KeywordInputProps) {
  const [input, setInput] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const keywords = value
    .split(",")
    .map((k) => k.trim())
    .filter((k) => k.length > 0)

  const keywordCount = keywords.length
  const isValid = keywordCount >= minKeywords && keywordCount <= maxKeywords
  const isFull = keywordCount >= maxKeywords

  const addKeyword = (keyword: string) => {
    const trimmed = keyword.trim().toLowerCase()
    if (!trimmed || keywords.includes(trimmed) || isFull) return

    const newKeywords = [...keywords, trimmed]
    onChange(newKeywords.join(", "))
    setInput("")
  }

  const addKeywords = (rawKeywords: string[]) => {
    const nextKeywords = [...keywords]
    rawKeywords.forEach((keyword) => {
      const trimmed = keyword.trim().toLowerCase()
      if (trimmed && !nextKeywords.includes(trimmed) && nextKeywords.length < maxKeywords) {
        nextKeywords.push(trimmed)
      }
    })

    if (nextKeywords.length !== keywords.length) {
      onChange(nextKeywords.join(", "))
    }
  }

  const removeKeyword = (index: number) => {
    const newKeywords = keywords.filter((_, i) => i !== index)
    onChange(newKeywords.join(", "))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addKeyword(input)
    } else if (e.key === "Backspace" && !input && keywords.length > 0) {
      removeKeyword(keywords.length - 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (val.includes(",")) {
      const parts = val.split(",")
      const completed = parts.slice(0, -1)
      addKeywords(completed)
      setInput(parts.at(-1) ?? "")
      setShowSuggestions(false)
      return
    }

    setInput(val)
    setShowSuggestions(suggestions.length > 0 && val.length > 0)
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text")
    const newKeywords = pasted
      .split(/[,;\n\r]+/)
      .map((k) => k.trim().toLowerCase())
      .filter((k) => k.length > 0 && !keywords.includes(k))
      .slice(0, maxKeywords - keywordCount)

    if (newKeywords.length > 0) {
      addKeywords(newKeywords)
      setInput("")
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    addKeyword(suggestion)
    onSuggestionsUsed?.()
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="border rounded-lg p-3 bg-white dark:bg-slate-900 border-gray-300 dark:border-gray-700 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition">
          <div className="flex flex-wrap gap-2 mb-2">
            {keywords.map((keyword, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary text-sm rounded-full"
              >
                <span>{keyword}</span>
                <button
                  onClick={() => removeKeyword(index)}
                  className="hover:bg-primary/20 rounded-full p-0.5 transition"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onFocus={() => showSuggestions && setShowSuggestions(true)}
            disabled={isFull}
            placeholder={isFull ? "Max keywords reached" : "Type keyword, press Enter or comma"}
            className="w-full bg-transparent outline-none text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
            <div className="p-2 space-y-1">
              <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">
                Suggested keywords:
              </div>
              {suggestions
                .filter((s) => !keywords.includes(s.toLowerCase()))
                .slice(0, 8)
                .map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-2 py-2 text-sm hover:bg-primary/10 rounded transition"
                  >
                    <span className="text-muted-foreground">+</span> {suggestion}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="text-xs text-muted-foreground">
          {keywordCount}/{minKeywords} required
        </div>
        <div className={`text-xs font-medium ${isValid ? "text-emerald-600" : "text-amber-600"}`}>
          {isValid ? "✓ Ready" : `${minKeywords - keywordCount} more needed`}
        </div>
      </div>
    </div>
  )
}
