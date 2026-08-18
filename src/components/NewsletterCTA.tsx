'use client'

import { useState } from 'react'

export default function NewsletterCTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    // Store locally for now — replace with actual email service (Buttondown, ConvertKit, etc)
    const subs = JSON.parse(localStorage.getItem('newsletter-subs') || '[]')
    subs.push({ email, date: new Date().toISOString() })
    localStorage.setItem('newsletter-subs', JSON.stringify(subs))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 rounded-lg text-center">
        <p className="text-sm text-green-700 dark:text-green-300">Thanks! You&apos;ll get notified when we add new tools.</p>
      </div>
    )
  }

  return (
    <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg">
      <p className="text-sm font-medium text-gray-900 dark:text-white">Get notified about new tools</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">No spam. One email when we ship something new.</p>
      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@email.com"
          required
          className="flex-1 px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">Subscribe</button>
      </form>
    </div>
  )
}
