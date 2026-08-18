'use client'

import { useState, useEffect } from 'react'

export default function Onboarding() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('onboarding-dismissed')) return
    const timer = setTimeout(() => setShow(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  const dismiss = () => {
    setShow(false)
    localStorage.setItem('onboarding-dismissed', '1')
  }

  if (!show) return null

  return (
    <div className="fixed bottom-6 right-6 z-[90] max-w-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-4 animate-fade-in">
      <button onClick={dismiss} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-lg leading-none">&times;</button>
      <p className="font-semibold text-gray-900 dark:text-white text-sm">Welcome to DevKit! 👋</p>
      <ul className="mt-2 space-y-1.5 text-xs text-gray-500 dark:text-gray-400">
        <li className="flex gap-2"><kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-[10px]">Ctrl+K</kbd> Quick search tools</li>
        <li className="flex gap-2"><kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-[10px]">?</kbd> Show all shortcuts</li>
        <li className="flex gap-2">⭐ Star tools to add to favorites</li>
        <li className="flex gap-2">🌙 Toggle dark mode in the header</li>
      </ul>
      <button onClick={dismiss} className="mt-3 w-full px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700">Got it!</button>
    </div>
  )
}
