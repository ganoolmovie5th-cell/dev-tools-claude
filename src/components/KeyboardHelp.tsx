'use client'

import { useState, useEffect } from 'react'

const shortcuts = [
  { keys: ['Ctrl', 'K'], desc: 'Open command palette' },
  { keys: ['Esc'], desc: 'Close palette / blur input' },
  { keys: ['?'], desc: 'Show this help' },
  { keys: ['↑', '↓'], desc: 'Navigate palette results' },
  { keys: ['Enter'], desc: 'Select palette result' },
]

export default function KeyboardHelp() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '?' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault()
        setOpen(prev => !prev)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[98] flex items-center justify-center" onClick={() => setOpen(false)}>
      <div className="fixed inset-0 bg-black/50" />
      <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Keyboard Shortcuts</h2>
        <div className="space-y-3">
          {shortcuts.map((s, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">{s.desc}</span>
              <div className="flex gap-1">
                {s.keys.map(k => (
                  <kbd key={k} className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded font-mono">{k}</kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-gray-400 text-center">Press <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-[10px]">?</kbd> or <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-[10px]">Esc</kbd> to close</p>
      </div>
    </div>
  )
}
