'use client'

import { useState, useEffect } from 'react'

export default function ToolRating({ slug }: { slug: string }) {
  const [rating, setRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [hover, setHover] = useState(0)

  const key = `rating-${slug}`

  useEffect(() => {
    const stored = localStorage.getItem(key)
    if (stored) { setRating(parseInt(stored)); setSubmitted(true) }
  }, [key])

  const rate = (n: number) => {
    setRating(n)
    setSubmitted(true)
    localStorage.setItem(key, n.toString())
    // Track aggregate in a separate key
    const agg = JSON.parse(localStorage.getItem('ratings-aggregate') || '{}')
    agg[slug] = n
    localStorage.setItem('ratings-aggregate', JSON.stringify(agg))
  }

  return (
    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        {submitted ? 'Thanks for rating!' : 'Was this tool helpful?'}
      </p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            onClick={() => rate(n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            disabled={submitted}
            className="p-0.5 disabled:cursor-default"
            aria-label={`Rate ${n} stars`}
          >
            <svg
              className={`w-6 h-6 transition-colors ${
                n <= (hover || rating)
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300 dark:text-gray-600'
              }`}
              viewBox="0 0 20 20"
              fill={n <= (hover || rating) ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}
