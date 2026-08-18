'use client'

import { useState, useEffect, useRef } from 'react'

export default function EpochCountdown() {
  const [target, setTarget] = useState('')
  const [now, setNow] = useState(Date.now())
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => setNow(Date.now()), 1000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const targetMs = target ? new Date(target).getTime() : 0
  const diff = targetMs - now
  const isPast = diff < 0
  const absDiff = Math.abs(diff)

  const days = Math.floor(absDiff / 86400000)
  const hours = Math.floor((absDiff % 86400000) / 3600000)
  const minutes = Math.floor((absDiff % 3600000) / 60000)
  const seconds = Math.floor((absDiff % 60000) / 1000)

  const currentEpoch = Math.floor(now / 1000)

  return (
    <div className="space-y-6">
      <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Current Unix Epoch</p>
        <p className="text-3xl font-bold font-mono text-blue-600">{currentEpoch}</p>
        <p className="text-xs text-gray-400 mt-1">{new Date(now).toISOString()}</p>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Countdown to:</label>
        <input
          type="datetime-local"
          value={target}
          onChange={e => setTarget(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {target && targetMs > 0 && (
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{isPast ? 'Time since:' : 'Time remaining:'}</p>
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Days', value: days },
              { label: 'Hours', value: hours },
              { label: 'Minutes', value: minutes },
              { label: 'Seconds', value: seconds },
            ].map(({ label, value }) => (
              <div key={label} className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <p className="text-2xl font-bold font-mono text-blue-600">{value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">Target epoch: {Math.floor(targetMs / 1000)}</p>
        </div>
      )}
    </div>
  )
}
