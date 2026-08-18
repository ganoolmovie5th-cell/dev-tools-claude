import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://ganoolmovie5th-cell.github.io/dev-tools-claude/sitemap.xml',
  }
}
