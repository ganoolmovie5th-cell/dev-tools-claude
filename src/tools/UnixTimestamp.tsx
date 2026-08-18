'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

export default function UnixTimestamp() {
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000).toString())
  const [dateStr, setDateStr] = useState('')
  const [result, setResult] = useState('')

  const toDate = () => {
    const ts = parseInt(timestamp)
    if (isNaN(ts)) { setResult('Invalid timestamp'); return }
    const d = new Date(ts * 1000)
    setResult(d.toISOString() + '\n' + d.toLocaleString())
  }

  const toTimestamp = () => {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) { setResult('Invalid date'); return }
    setResult(Math.floor(d.getTime() / 1000).toString())
  }

  const now = () => {
    const ts = Math.floor(Date.now() / 1000)
    setTimestamp(ts.toString())
    setResult(new Date().toISOString())
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Unix Timestamp</label>
          <input
            type="text"
            value={timestamp}
            onChange={e => setTimestamp(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={toDate} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full">To Date</button>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Date String</label>
          <input
            type="text"
            value={dateStr}
            onChange={e => setDateStr(e.target.value)}
            placeholder="2024-01-15T10:30:00Z"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={toTimestamp} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 w-full">To Timestamp</button>
        </div>
      </div>
      <button onClick={now} className="px-4 py-2 text-sm text-blue-600 border border-blue-200 rounded hover:bg-blue-50">Current Time</button>
      {result && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 border border-gray-200 rounded-lg overflow-auto whitespace-pre-wrap">{result}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={result} /></div>
        </div>
      )}
    </div>
  )
}
