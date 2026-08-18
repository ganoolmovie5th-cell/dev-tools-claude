'use client'

import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600">
          DevKit
        </Link>
        <div className="flex items-center gap-3">
          <nav className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-gray-900 dark:hover:text-white">Tools</Link>
            <Link href="/about" className="hover:text-gray-900 dark:hover:text-white">About</Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
