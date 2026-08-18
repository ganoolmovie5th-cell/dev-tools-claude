'use client'

import { useEffect, useState } from 'react'

export default function Confetti() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Only show once ever
    if (localStorage.getItem('confetti-shown')) return

    const handler = () => {
      if (localStorage.getItem('confetti-shown')) return
      localStorage.setItem('confetti-shown', '1')
      setShow(true)
      setTimeout(() => setShow(false), 2500)
    }

    // Listen for copy events
    document.addEventListener('copy', handler)
    // Also listen for our copy button clicks
    const observer = new MutationObserver(() => {
      const btn = document.querySelector('button')
      if (btn?.textContent === 'Copied!') handler()
    })
    observer.observe(document.body, { subtree: true, childList: true, characterData: true })

    return () => {
      document.removeEventListener('copy', handler)
      observer.disconnect()
    }
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
      {Array.from({ length: 40 }, (_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-sm animate-confetti-fall"
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: ['#3b82f6', '#ef4444', '#22c55e', '#eab308', '#a855f7', '#ec4899'][i % 6],
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${1.5 + Math.random()}s`,
          }}
        />
      ))}
    </div>
  )
}
