'use client'

import { useState, useEffect } from 'react'

const ACCENT_COLORS = [
  { name: 'Blue', value: '#2563eb' },
  { name: 'Purple', value: '#7c3aed' },
  { name: 'Green', value: '#059669' },
  { name: 'Red', value: '#dc2626' },
  { name: 'Orange', value: '#ea580c' },
  { name: 'Pink', value: '#db2777' },
  { name: 'Teal', value: '#0d9488' },
  { name: 'Indigo', value: '#4f46e5' },
]

export default function ThemeCustomizer() {
  const [open, setOpen] = useState(false)
  const [accent, setAccent] = useState('#2563eb')

  useEffect(() => {
    const stored = localStorage.getItem('accent-color')
    if (stored) {
      setAccent(stored)
      document.documentElement.style.setProperty('--accent', stored)
    }
  }, [])

  const setColor = (color: string) => {
    setAccent(color)
    localStorage.setItem('accent-color', color)
    document.documentElement.style.setProperty('--accent', color)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Customize theme"
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 z-50">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Accent Color</p>
          <div className="grid grid-cols-4 gap-2">
            {ACCENT_COLORS.map(c => (
              <button
                key={c.value}
                onClick={() => setColor(c.value)}
                title={c.name}
                className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${accent === c.value ? 'border-gray-900 dark:border-white scale-110' : 'border-transparent'}`}
                style={{ backgroundColor: c.value }}
              />
            ))}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <input
              type="color"
              value={accent}
              onChange={e => setColor(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer"
            />
            <span className="text-xs text-gray-400 font-mono">{accent}</span>
          </div>
        </div>
      )}
    </div>
  )
}
