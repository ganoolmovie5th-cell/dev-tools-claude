'use client'

import { useState } from 'react'

export default function ShareButton({ getInput }: { getInput: () => string }) {
  const [copied, setCopied] = useState(false)

  const share = () => {
    const input = getInput()
    if (!input) return
    const encoded = encodeURIComponent(input)
    const url = `${window.location.origin}${window.location.pathname}?q=${encoded}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={share}
      className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
    >
      {copied ? 'Link Copied!' : 'Share'}
    </button>
  )
}
