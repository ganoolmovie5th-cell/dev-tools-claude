'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

export default function MarkdownTableGenerator() {
  const [rows, setRows] = useState(3)
  const [cols, setCols] = useState(3)
  const [data, setData] = useState<string[][]>(() =>
    Array.from({ length: 4 }, (_, r) =>
      Array.from({ length: 3 }, (_, c) => r === 0 ? `Header ${c + 1}` : '')
    )
  )
  const [align, setAlign] = useState<('left' | 'center' | 'right')[]>(['left', 'left', 'left'])

  const updateSize = (newRows: number, newCols: number) => {
    const newData = Array.from({ length: newRows + 1 }, (_, r) =>
      Array.from({ length: newCols }, (_, c) => data[r]?.[c] || (r === 0 ? `Header ${c + 1}` : ''))
    )
    setData(newData)
    setRows(newRows)
    setCols(newCols)
    setAlign(Array.from({ length: newCols }, (_, i) => align[i] || 'left'))
  }

  const updateCell = (r: number, c: number, val: string) => {
    const next = data.map(row => [...row])
    next[r][c] = val
    setData(next)
  }

  const getAlignSep = (a: string) => {
    if (a === 'center') return ':---:'
    if (a === 'right') return '---:'
    return '---'
  }

  const output = [
    '| ' + data[0].join(' | ') + ' |',
    '| ' + align.map(getAlignSep).join(' | ') + ' |',
    ...data.slice(1).map(row => '| ' + row.join(' | ') + ' |'),
  ].join('\n')

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-center">
        <label className="text-xs text-gray-500 dark:text-gray-400">Rows:</label>
        <input type="number" min={1} max={20} value={rows} onChange={e => updateSize(+e.target.value, cols)} className="w-16 px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded" />
        <label className="text-xs text-gray-500 dark:text-gray-400">Cols:</label>
        <input type="number" min={1} max={10} value={cols} onChange={e => updateSize(rows, +e.target.value)} className="w-16 px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded" />
      </div>

      <div className="overflow-x-auto">
        <table className="text-sm">
          <thead>
            <tr>
              {data[0].map((_, c) => (
                <th key={c} className="p-1">
                  <select value={align[c]} onChange={e => { const n = [...align]; n[c] = e.target.value as any; setAlign(n) }} className="text-[10px] px-1 py-0.5 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded">
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c} className="p-0.5">
                    <input
                      type="text"
                      value={cell}
                      onChange={e => updateCell(r, c, e.target.value)}
                      className={`w-full px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded text-xs ${r === 0 ? 'font-bold' : ''}`}
                      placeholder={r === 0 ? 'Header' : 'Cell'}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="relative">
        <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto text-sm whitespace-pre-wrap">{output}</pre>
        <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
      </div>
    </div>
  )
}
