'use client'

import { useEffect } from 'react'

export default function AutoFocus() {
  useEffect(() => {
    // Auto-focus first textarea or text input on tool pages
    const timer = setTimeout(() => {
      const el = document.querySelector<HTMLTextAreaElement | HTMLInputElement>(
        'main textarea, main input[type="text"]'
      )
      if (el && !el.value) el.focus()
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return null
}
