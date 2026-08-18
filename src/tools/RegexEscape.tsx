'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export default function RegexEscape() {
  const [input, setInput] = useState('')
  const output = escapeRegex(input)

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter text with special regex characters... e.g. file.txt (copy)"
        className="w-full h-28 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto whitespace-pre-wrap">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
      <p className="text-xs text-gray-400 dark:text-gray-500">Characters escaped: . * + ? ^ $ {'{'} {'}'} ( ) | [ ] \</p>
    </div>
  )
}
