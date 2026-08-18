'use client'

import { useState, useEffect } from 'react'
import CopyButton from './CopyButton'

interface HistoryEntry {
  output: string
  timestamp: number
}

export function useOutputHistory(toolSlug: string) {
  const key = `history-${toolSlug}`

  const save = (output: string) => {
    if (!output.trim()) return
    const stored: HistoryEntry[] = JSON.parse(localStorage.getItem(key) || '[]')
    const entry: HistoryEntry = { output, timestamp: Date.now() }
    const next = [entry, ...stored.filter(e => e.output !== output)].slice(0, 10)
    localStorage.setItem(key, JSON.stringify(next))
  }

  return { save }
}

export default function OutputHistory({ toolSlug }: { toolSlug: string }) {
  const [entries, setEntries] = useState<HistoryEntry[]>([])
  const [open, setOpen] = useState(false)
  const key = `history-${toolSlug}`

  useEffect(() => {
    setEntries(JSON.parse(localStorage.getItem(key) || '[]'))
  }, [key])

  const clear = () => {
    localStorage.removeItem(key)
    setEntries([])
  }

  if (entries.length === 0) return null

  return (
    <div className="mt-6">
      <button
        onClick={() => setOpen(!open)}
        className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex items-center gap-1"
      >
        <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        History ({entries.length})
      </button>

      {open && (
        <div className="mt-3 space-y-2">
          {entries.map((e, i) => (
            <div key={i} className="relative p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-xs font-mono overflow-hidden">
              <pre className="overflow-auto max-h-20 whitespace-pre-wrap">{e.output.slice(0, 200)}{e.output.length > 200 ? '...' : ''}</pre>
              <div className="absolute top-1 right-1"><CopyButton text={e.output} /></div>
              <p className="text-[10px] text-gray-400 mt-1">{new Date(e.timestamp).toLocaleString()}</p>
            </div>
          ))}
          <button onClick={clear} className="text-xs text-red-500 hover:text-red-600">Clear history</button>
        </div>
      )}
    </div>
  )
}
