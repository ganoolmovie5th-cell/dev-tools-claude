'use client'

import { useEffect, useState } from 'react'

export function useShareParam(): string {
  const [value, setValue] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const q = params.get('q')
    if (q) setValue(decodeURIComponent(q))
  }, [])

  return value
}
