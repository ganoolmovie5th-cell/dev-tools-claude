'use client'

import { useState } from 'react'
import { diffWords } from 'diff'

export default function TextDiffWord() {
  const [left, setLeft] = useState('')
  const [right, setRight] = useState('')
  const [result, setResult] = useState<{ value: string; added?: boolean; removed?: boolean }[]>([])

  const compare = () => {
    setResult(diffWords(left, right))
  }

  const stats = result.reduce((acc, p) => {
    if (p.added) acc.added += p.value.split(/\s+/).filter(Boolean).length
    if (p.removed) acc.removed += p.value.split(/\s+/).filter(Boolean).length
    return acc
  }, { added: 0, removed: 0 })

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Original</label>
          <textarea
            value={left}
            onChange={e => setLeft(e.target.value)}
            placeholder="Original text..."
            className="w-full h-36 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Modified</label>
          <textarea
            value={right}
            onChange={e => setRight(e.target.value)}
            placeholder="Modified text..."
            className="w-full h-36 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <button onClick={compare} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Compare (Word Level)</button>
      {result.length > 0 && (
        <>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="text-green-600">+{stats.added} words</span>{' / '}
            <span className="text-red-500">-{stats.removed} words</span>
          </p>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 text-sm leading-relaxed">
            {result.map((part, i) => (
              <span
                key={i}
                className={part.added ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : part.removed ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 line-through' : ''}
              >
                {part.value}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
