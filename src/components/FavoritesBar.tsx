'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { tools } from '@/tools/registry'

export function useFavorites() {
  const [favs, setFavs] = useState<string[]>([])

  useEffect(() => {
    setFavs(JSON.parse(localStorage.getItem('favorites') || '[]'))
  }, [])

  const toggle = (slug: string) => {
    const next = favs.includes(slug) ? favs.filter(f => f !== slug) : [...favs, slug]
    setFavs(next)
    localStorage.setItem('favorites', JSON.stringify(next))
  }

  return { favs, toggle }
}

export function useRecent() {
  const [recent, setRecent] = useState<string[]>([])

  useEffect(() => {
    setRecent(JSON.parse(localStorage.getItem('recent-tools') || '[]'))
  }, [])

  const track = (slug: string) => {
    const next = [slug, ...recent.filter(r => r !== slug)].slice(0, 6)
    setRecent(next)
    localStorage.setItem('recent-tools', JSON.stringify(next))
  }

  return { recent, track }
}

export function FavoriteButton({ slug }: { slug: string }) {
  const { favs, toggle } = useFavorites()
  const isFav = favs.includes(slug)

  return (
    <button
      onClick={() => toggle(slug)}
      aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
      className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      <svg className={`w-5 h-5 ${isFav ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400 dark:text-gray-600'}`} viewBox="0 0 20 20" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
    </button>
  )
}

export default function FavoritesBar() {
  const { favs } = useFavorites()
  const { recent } = useRecent()

  const favTools = tools.filter(t => favs.includes(t.slug))
  const recentTools = tools.filter(t => recent.includes(t.slug) && !favs.includes(t.slug)).slice(0, 4)

  if (favTools.length === 0 && recentTools.length === 0) return null

  return (
    <div className="mb-8 space-y-4">
      {favTools.length > 0 && (
        <div>
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Favorites</h2>
          <div className="flex flex-wrap gap-2">
            {favTools.map(t => (
              <Link
                key={t.slug}
                href={`/tools/${t.slug}`}
                className="px-3 py-1.5 text-sm bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/40 transition-colors"
              >
                {t.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      {recentTools.length > 0 && (
        <div>
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Recently Used</h2>
          <div className="flex flex-wrap gap-2">
            {recentTools.map(t => (
              <Link
                key={t.slug}
                href={`/tools/${t.slug}`}
                className="px-3 py-1.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {t.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
