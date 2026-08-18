'use client'

import { useEffect } from 'react'
import { FavoriteButton, useRecent } from './FavoritesBar'

export default function ToolPageClient({ slug }: { slug: string }) {
  const { track } = useRecent()

  useEffect(() => {
    track(slug)
  }, [slug])

  return <FavoriteButton slug={slug} />
}
