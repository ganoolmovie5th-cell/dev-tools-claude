'use client'

import { useState } from 'react'
import { tools } from '@/tools/registry'
import ToolCard from '@/components/ToolCard'
import FavoritesBar from '@/components/FavoritesBar'

export default function HomePage() {
  const [search, setSearch] = useState('')

  const filtered = tools.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <section className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Free Online Developer Tools</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">28+ tools that run entirely in your browser. No data sent to any server.</p>
      </section>

      <FavoritesBar />

      <div className="mb-8">
        <input
          type="text"
          placeholder="Search tools..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(tool => (
          <ToolCard key={tool.slug} {...tool} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 mt-8">No tools found matching &ldquo;{search}&rdquo;</p>
      )}
    </div>
  )
}
