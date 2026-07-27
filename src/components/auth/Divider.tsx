"use client"

export function Divider({ text = "or" }: { text?: string }) {
  return (
    <div className="relative my-8">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200 dark:border-gray-700" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-3 bg-white dark:bg-slate-950 text-gray-500 dark:text-gray-400 font-medium">{text}</span>
      </div>
    </div>
  )
}
