'use client'

import { useState, useEffect, useRef } from 'react'
import ShareButton from '@/components/ShareButton'
import { useShareParam } from '@/lib/useShareParam'

export default function RegexTester() {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('g')
  const [text, setText] = useState('')
  const [matches, setMatches] = useState<string[]>([])
  const [error, setError] = useState('')
  const shared = useShareParam()
  const patternRef = useRef(pattern)
  patternRef.current = pattern

  useEffect(() => { if (shared) setPattern(shared) }, [shared])

  const test = () => {
    try {
      const re = new RegExp(pattern, flags)
      const found = text.match(re)
      setMatches(found || [])
      setError('')
    } catch (e: any) {
      setError(e.message)
      setMatches([])
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={pattern}
          onChange={e => setPattern(e.target.value)}
          placeholder="Regex pattern..."
          className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={flags}
          onChange={e => setFlags(e.target.value)}
          placeholder="Flags"
          className="w-20 px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Test string..."
        className="w-full h-36 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex gap-2 flex-wrap">
        <button onClick={test} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Test</button>
        <ShareButton getInput={() => patternRef.current} />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {matches.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Matches ({matches.length})</h3>
          <div className="flex flex-wrap gap-2">
            {matches.map((m, i) => (
              <span key={i} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded text-sm font-mono">{m}</span>
            ))}
          </div>
        </div>
      )}
      {!error && matches.length === 0 && pattern && <p className="text-gray-400 text-sm">No matches found.</p>}
    </div>
  )
}
