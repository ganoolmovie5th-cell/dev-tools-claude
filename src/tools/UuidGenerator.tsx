'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function generateUUID(): string {
  return crypto.randomUUID()
}

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([generateUUID()])
  const [count, setCount] = useState(1)

  const generate = () => {
    setUuids(Array.from({ length: count }, () => generateUUID()))
  }

  const allText = uuids.join('\n')

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label className="text-sm text-gray-600">Count:</label>
        <input
          type="number"
          min={1}
          max={100}
          value={count}
          onChange={e => setCount(Math.min(100, Math.max(1, +e.target.value)))}
          className="w-20 px-2 py-1 border border-gray-200 rounded"
        />
        <button onClick={generate} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Generate</button>
      </div>
      <div className="relative">
        <pre className="p-3 bg-gray-50 border border-gray-200 rounded-lg overflow-auto max-h-96">{allText}</pre>
        <div className="absolute top-2 right-2"><CopyButton text={allText} /></div>
      </div>
    </div>
  )
}
