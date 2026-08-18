'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function describeCron(min: string, hour: string, dom: string, month: string, dow: string): string {
  const parts: string[] = []
  if (min === '*' && hour === '*') parts.push('Every minute')
  else if (min !== '*' && hour === '*') parts.push(`At minute ${min} of every hour`)
  else if (min !== '*' && hour !== '*') parts.push(`At ${hour.padStart(2, '0')}:${min.padStart(2, '0')}`)
  else parts.push(`Every minute of hour ${hour}`)

  if (dom !== '*') parts.push(`on day ${dom} of the month`)
  if (month !== '*') parts.push(`in month ${month}`)
  if (dow !== '*') {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const d = parseInt(dow)
    parts.push(`on ${days[d] || dow}`)
  }
  return parts.join(' ')
}

export default function CronGenerator() {
  const [min, setMin] = useState('0')
  const [hour, setHour] = useState('*')
  const [dom, setDom] = useState('*')
  const [month, setMonth] = useState('*')
  const [dow, setDow] = useState('*')

  const expression = `${min} ${hour} ${dom} ${month} ${dow}`
  const description = describeCron(min, hour, dom, month, dow)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-2">
        {[
          { label: 'Minute', value: min, set: setMin },
          { label: 'Hour', value: hour, set: setHour },
          { label: 'Day (Month)', value: dom, set: setDom },
          { label: 'Month', value: month, set: setMonth },
          { label: 'Day (Week)', value: dow, set: setDow },
        ].map(({ label, value, set }) => (
          <div key={label}>
            <label className="text-xs text-gray-500 block mb-1">{label}</label>
            <input
              type="text"
              value={value}
              onChange={e => set(e.target.value)}
              className="w-full px-2 py-1.5 border border-gray-200 rounded text-center font-mono"
            />
          </div>
        ))}
      </div>
      <div className="relative">
        <pre className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-lg">{expression}</pre>
        <div className="absolute top-2 right-2"><CopyButton text={expression} /></div>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}
