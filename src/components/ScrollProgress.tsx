'use client'

import { useState, useEffect } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  if (progress < 1) return null

  return (
    <div className="fixed top-14 left-0 right-0 z-40 h-0.5">
      <div className="h-full bg-blue-600 transition-all duration-75" style={{ width: `${progress}%` }} />
    </div>
  )
}
