import { MetadataRoute } from 'next'
import { tools } from '@/tools/registry'

export const dynamic = 'force-static'

const BASE = 'https://www.devkit.web.id'

export default function sitemap(): MetadataRoute.Sitemap {
  const toolPages = tools.map(t => ({
    url: `${BASE}/tools/${t.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const howToPages = tools.map(t => ({
    url: `${BASE}/how-to/${t.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const cheatsheets = ['regex', 'cron', 'git'].map(s => ({
    url: `${BASE}/cheatsheets/${s}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    { url: `${BASE}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/cheatsheets/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    ...cheatsheets,
    { url: `${BASE}/changelog/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
    { url: `${BASE}/pro/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/resources/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/about/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/privacy-policy/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    ...toolPages,
    ...howToPages,
  ]
}
