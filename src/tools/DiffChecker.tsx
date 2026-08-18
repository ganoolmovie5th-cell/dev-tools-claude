'use client'

import { useState } from 'react'
import { diffLines } from 'diff'

export default function DiffChecker() {
  const [left, setLeft] = useState('')
  const [right, setRight] = useState('')
  const [result, setResult] = useState<{ value: string; added?: boolean; removed?: boolean }[]>([])

  const compare = () => {
    setResult(diffLines(left, right))
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Original</label>
          <textarea
            value={left}
            onChange={e => setLeft(e.target.value)}
            placeholder="Paste original text..."
            className="w-full h-48 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Modified</label>
          <textarea
            value={right}
            onChange={e => setRight(e.target.value)}
            placeholder="Paste modified text..."
            className="w-full h-48 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <button onClick={compare} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Compare</button>
      {result.length > 0 && (
        <pre className="p-3 bg-gray-50 border border-gray-200 rounded-lg overflow-auto max-h-96 text-sm">
          {result.map((part, i) => (
            <span
              key={i}
              className={part.added ? 'bg-green-100 text-green-800' : part.removed ? 'bg-red-100 text-red-800' : ''}
            >
              {part.value}
            </span>
          ))}
        </pre>
      )}
    </div>
  )
}
