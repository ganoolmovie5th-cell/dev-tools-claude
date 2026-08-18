'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

async function hash(algo: string, text: string): Promise<string> {
  const data = new TextEncoder().encode(text)
  const buf = await crypto.subtle.digest(algo, data)
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export default function HashGenerator() {
  const [input, setInput] = useState('')
  const [results, setResults] = useState<Record<string, string>>({})

  const generate = async () => {
    if (!input) return
    const [sha1, sha256, sha512] = await Promise.all([
      hash('SHA-1', input),
      hash('SHA-256', input),
      hash('SHA-512', input),
    ])
    setResults({ 'SHA-1': sha1, 'SHA-256': sha256, 'SHA-512': sha512 })
  }

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter text to hash..."
        className="w-full h-28 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button onClick={generate} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Generate Hashes</button>
      {Object.keys(results).length > 0 && (
        <div className="space-y-3">
          {Object.entries(results).map(([algo, val]) => (
            <div key={algo}>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">{algo}</h3>
              <div className="relative">
                <pre className="p-3 bg-gray-50 border border-gray-200 rounded-lg overflow-auto text-xs break-all whitespace-pre-wrap">{val}</pre>
                <div className="absolute top-2 right-2"><CopyButton text={val} /></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
