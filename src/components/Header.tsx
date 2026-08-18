'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600">
          DevToolkit
        </Link>
        <nav className="flex gap-4 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">Tools</Link>
          <Link href="/about" className="hover:text-gray-900">About</Link>
        </nav>
      </div>
    </header>
  )
}
