'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function findPaths(obj: any, prefix = '$'): { path: string; value: string; type: string }[] {
  const results: { path: string; value: string; type: string }[] = []

  if (obj === null) {
    results.push({ path: prefix, value: 'null', type: 'null' })
    return results
  }

  if (Array.isArray(obj)) {
    results.push({ path: prefix, value: `Array[${obj.length}]`, type: 'array' })
    obj.forEach((item, i) => {
      results.push(...findPaths(item, `${prefix}[${i}]`))
    })
  } else if (typeof obj === 'object') {
    results.push({ path: prefix, value: `Object{${Object.keys(obj).length}}`, type: 'object' })
    Object.entries(obj).forEach(([key, val]) => {
      results.push(...findPaths(val, `${prefix}.${key}`))
    })
  } else {
    results.push({ path: prefix, value: String(obj), type: typeof obj })
  }

  return results
}

export default function JsonPathFinder() {
  const [input, setInput] = useState('')
  const [paths, setPaths] = useState<{ path: string; value: string; type: string }[]>([])
  const [filter, setFilter] = useState('')
  const [error, setError] = useState('')

  const parse = () => {
    try {
      const obj = JSON.parse(input)
      setPaths(findPaths(obj))
      setError('')
    } catch (e: any) {
      setError(e.message)
      setPaths([])
    }
  }

  const filtered = paths.filter(p =>
    p.path.toLowerCase().includes(filter.toLowerCase()) ||
    p.value.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder='{"user": {"name": "John", "tags": ["admin", "dev"]}}'
        className="w-full h-36 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button onClick={parse} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Find Paths</button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {paths.length > 0 && (
        <>
          <input
            type="text"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder="Filter paths..."
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="overflow-x-auto max-h-80 overflow-y-auto">
            <table className="w-full text-xs">
              <tbody>
                {filtered.map((p, i) => (
                  <tr key={i} className="border-b border-gray-100 dark:border-gray-800 group">
                    <td className="py-1.5 pr-2 font-mono text-blue-600 whitespace-nowrap">{p.path}</td>
                    <td className="py-1.5 pr-2 text-gray-500 dark:text-gray-400 max-w-xs truncate">{p.value}</td>
                    <td className="py-1.5 w-8 opacity-0 group-hover:opacity-100"><CopyButton text={p.path} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
