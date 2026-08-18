'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

const WORDS = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ')

function generateWords(n: number): string {
  let result = []
  for (let i = 0; i < n; i++) result.push(WORDS[i % WORDS.length])
  return result.join(' ')
}

function generateParagraphs(n: number): string {
  return Array.from({ length: n }, (_, i) => {
    const len = 40 + Math.floor(Math.random() * 30)
    const words = generateWords(len)
    return words.charAt(0).toUpperCase() + words.slice(1) + '.'
  }).join('\n\n')
}

export default function LoremIpsum() {
  const [count, setCount] = useState(3)
  const [type, setType] = useState<'paragraphs' | 'words'>('paragraphs')
  const [output, setOutput] = useState('')

  const generate = () => {
    setOutput(type === 'paragraphs' ? generateParagraphs(count) : generateWords(count))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input
          type="number"
          min={1}
          max={50}
          value={count}
          onChange={e => setCount(+e.target.value)}
          className="w-20 px-2 py-1 border border-gray-200 rounded"
        />
        <select value={type} onChange={e => setType(e.target.value as any)} className="px-3 py-2 border border-gray-200 rounded-lg">
          <option value="paragraphs">Paragraphs</option>
          <option value="words">Words</option>
        </select>
        <button onClick={generate} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Generate</button>
      </div>
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 border border-gray-200 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
    </div>
  )
}
