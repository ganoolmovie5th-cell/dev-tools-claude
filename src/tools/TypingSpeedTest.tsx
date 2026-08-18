'use client'

import { useState, useEffect, useRef } from 'react'

const TEXTS = [
  'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump.',
  'Programming is the art of telling another human what one wants the computer to do. Code is like humor. When you have to explain it, it is bad.',
  'First solve the problem then write the code. Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
]

export default function TypingSpeedTest() {
  const [text] = useState(TEXTS[Math.floor(Math.random() * TEXTS.length)])
  const [input, setInput] = useState('')
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [startTime, setStartTime] = useState(0)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const handleInput = (val: string) => {
    if (!started) {
      setStarted(true)
      setStartTime(Date.now())
    }
    setInput(val)

    if (val.length >= text.length) {
      const elapsed = (Date.now() - startTime) / 1000 / 60 // minutes
      const words = text.split(' ').length
      setWpm(Math.round(words / elapsed))

      let correct = 0
      for (let i = 0; i < text.length; i++) {
        if (val[i] === text[i]) correct++
      }
      setAccuracy(Math.round((correct / text.length) * 100))
      setFinished(true)
    }
  }

  const restart = () => {
    setInput('')
    setStarted(false)
    setFinished(false)
    setWpm(0)
    setAccuracy(100)
    inputRef.current?.focus()
  }

  return (
    <div className="space-y-4">
      <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-sm leading-relaxed">
        {text.split('').map((char, i) => {
          let color = 'text-gray-400'
          if (i < input.length) {
            color = input[i] === char ? 'text-green-600 dark:text-green-400' : 'text-red-500 bg-red-100 dark:bg-red-900/30'
          }
          if (i === input.length) color = 'bg-blue-200 dark:bg-blue-800 text-gray-900 dark:text-white'
          return <span key={i} className={color}>{char}</span>
        })}
      </div>

      <textarea
        ref={inputRef}
        value={input}
        onChange={e => handleInput(e.target.value)}
        disabled={finished}
        placeholder={finished ? 'Test complete!' : 'Start typing here...'}
        className="w-full h-20 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        autoFocus
      />

      {finished && (
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-center">
            <p className="text-2xl font-bold text-blue-600">{wpm}</p>
            <p className="text-xs text-gray-500">WPM</p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-center">
            <p className="text-2xl font-bold text-green-600">{accuracy}%</p>
            <p className="text-xs text-gray-500">Accuracy</p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-center">
            <p className="text-2xl font-bold text-purple-600">{Math.round((Date.now() - startTime) / 1000)}s</p>
            <p className="text-xs text-gray-500">Time</p>
          </div>
        </div>
      )}

      <button onClick={restart} className="px-4 py-2 text-sm text-blue-600 border border-blue-200 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20">
        {finished ? 'Try Again' : 'Reset'}
      </button>
    </div>
  )
}
