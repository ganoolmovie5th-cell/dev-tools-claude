'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

// Simple bcrypt-like display — actual bcrypt requires a library.
// We use SHA-256 + salt display to simulate the experience client-side.
async function hashWithSalt(text: string, rounds: number): Promise<string> {
  const salt = Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map(b => b.toString(16).padStart(2, '0')).join('')
  const data = new TextEncoder().encode(salt + text)
  const buf = await crypto.subtle.digest('SHA-256', data)
  const hash = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
  return `$2b$${rounds.toString().padStart(2, '0')}$${salt.slice(0, 22)}${hash.slice(0, 31)}`
}

export default function BcryptGenerator() {
  const [input, setInput] = useState('')
  const [rounds, setRounds] = useState(10)
  const [output, setOutput] = useState('')

  const generate = async () => {
    if (!input) return
    const hash = await hashWithSalt(input, rounds)
    setOutput(hash)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Password / Text</label>
          <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text to hash..." className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Rounds</label>
          <input type="number" value={rounds} onChange={e => setRounds(+e.target.value)} min={4} max={16} className="w-20 px-2 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg" />
        </div>
      </div>
      <button onClick={generate} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Generate Hash</button>
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto text-sm break-all">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
      <p className="text-xs text-gray-400">Note: This generates a bcrypt-format hash using SHA-256 for client-side demonstration. For production, use a server-side bcrypt library.</p>
    </div>
  )
}
