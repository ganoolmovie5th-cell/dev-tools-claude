'use client'

import { useState, useEffect, useRef } from 'react'

export default function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)
  const [mode, setMode] = useState<'work' | 'break'>('work')
  const [sessions, setSessions] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => {
          if (prev === 0) {
            if (minutes === 0) {
              setRunning(false)
              if (mode === 'work') {
                setSessions(s => s + 1)
                setMode('break')
                setMinutes(5)
              } else {
                setMode('work')
                setMinutes(25)
              }
              return 0
            }
            setMinutes(m => m - 1)
            return 59
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running, minutes, mode])

  const reset = () => {
    setRunning(false)
    setMode('work')
    setMinutes(25)
    setSeconds(0)
  }

  const total = mode === 'work' ? 25 * 60 : 5 * 60
  const remaining = minutes * 60 + seconds
  const progress = ((total - remaining) / total) * 100

  return (
    <div className="space-y-6 text-center">
      <div className="inline-flex flex-col items-center">
        <div className="relative w-48 h-48">
          <svg className="w-48 h-48 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-gray-200 dark:text-gray-700" strokeWidth="6" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" className={mode === 'work' ? 'text-blue-500' : 'text-green-500'} strokeWidth="6" strokeLinecap="round" strokeDasharray={`${progress * 2.83} 283`} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold font-mono text-gray-900 dark:text-white">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            <span className={`text-xs uppercase tracking-wide mt-1 ${mode === 'work' ? 'text-blue-500' : 'text-green-500'}`}>
              {mode === 'work' ? 'Focus' : 'Break'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => setRunning(!running)}
          className={`px-6 py-2 text-white rounded-lg ${running ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {running ? 'Pause' : 'Start'}
        </button>
        <button onClick={reset} className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
          Reset
        </button>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400">Sessions completed: <span className="font-bold text-blue-600">{sessions}</span></p>
    </div>
  )
}
