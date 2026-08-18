'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export default function SlugGenerator() {
  const [input, setInput] = useState('')
  const slug = toSlug(input)

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter text to convert to slug..."
        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {slug && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono">{slug}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={slug} /></div>
        </div>
      )}
    </div>
  )
}
