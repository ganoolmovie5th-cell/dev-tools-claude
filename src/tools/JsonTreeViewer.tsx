'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function TreeNode({ name, value, depth = 0 }: { name: string; value: any; depth?: number }) {
  const [open, setOpen] = useState(depth < 2)
  const isObj = value !== null && typeof value === 'object'
  const isArray = Array.isArray(value)
  const entries = isObj ? Object.entries(value) : []
  const prefix = isArray ? `[${entries.length}]` : `{${entries.length}}`

  if (!isObj) {
    const color = typeof value === 'string' ? 'text-green-600 dark:text-green-400' :
      typeof value === 'number' ? 'text-blue-600 dark:text-blue-400' :
      typeof value === 'boolean' ? 'text-purple-600 dark:text-purple-400' :
      'text-gray-400'
    return (
      <div className="flex items-center gap-1 py-0.5" style={{ paddingLeft: depth * 16 }}>
        <span className="text-gray-700 dark:text-gray-300 text-xs">{name}:</span>
        <span className={`text-xs font-mono ${color}`}>{JSON.stringify(value)}</span>
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 py-0.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded w-full text-left"
        style={{ paddingLeft: depth * 16 }}
      >
        <svg className={`w-3 h-3 text-gray-400 transition-transform ${open ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-700 dark:text-gray-300 text-xs">{name}</span>
        <span className="text-gray-400 text-[10px]">{prefix}</span>
      </button>
      {open && entries.map(([k, v]) => (
        <TreeNode key={k} name={isArray ? `[${k}]` : k} value={v} depth={depth + 1} />
      ))}
    </div>
  )
}

export default function JsonTreeViewer() {
  const [input, setInput] = useState('')
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState('')

  const parse = () => {
    try { setData(JSON.parse(input)); setError('') }
    catch (e: any) { setError(e.message); setData(null) }
  }

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder='{"user": {"name": "John", "tags": ["admin", "dev"]}, "active": true}'
        className="w-full h-36 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button onClick={parse} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">View Tree</button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {data !== null && (
        <div className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-[500px]">
          <TreeNode name="root" value={data} />
        </div>
      )}
    </div>
  )
}
