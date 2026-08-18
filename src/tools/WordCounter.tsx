'use client'

import { useState, useEffect, useRef } from 'react'
import ShareButton from '@/components/ShareButton'
import { useShareParam } from '@/lib/useShareParam'

export default function WordCounter() {
  const [input, setInput] = useState('')
  const shared = useShareParam()
  const inputRef = useRef(input)
  inputRef.current = input

  useEffect(() => { if (shared) setInput(shared) }, [shared])

  const chars = input.length
  const charsNoSpace = input.replace(/\s/g, '').length
  const words = input.trim() ? input.trim().split(/\s+/).length : 0
  const sentences = input.trim() ? input.split(/[.!?]+/).filter(s => s.trim()).length : 0
  const paragraphs = input.trim() ? input.split(/\n\n+/).filter(s => s.trim()).length : 0
  const readingTime = Math.max(1, Math.ceil(words / 200))

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Start typing or paste your text here..."
        className="w-full h-48 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex">
        <ShareButton getInput={() => inputRef.current} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Characters', value: chars },
          { label: 'No Spaces', value: charsNoSpace },
          { label: 'Words', value: words },
          { label: 'Sentences', value: sentences },
          { label: 'Paragraphs', value: paragraphs },
          { label: 'Reading Time', value: `${readingTime} min` },
        ].map(({ label, value }) => (
          <div key={label} className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-center">
            <p className="text-2xl font-bold text-blue-600">{value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
