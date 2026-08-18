'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function KeyboardShortcuts() {
  const router = useRouter()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K = focus search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        const input = document.querySelector<HTMLInputElement>('input[placeholder*="Search"]')
        input?.focus()
      }
      // Escape = blur active element
      if (e.key === 'Escape') {
        (document.activeElement as HTMLElement)?.blur()
      }
      // Ctrl/Cmd + / = go home
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault()
        router.push('/')
      }
    }

    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [router])

  return null
}
