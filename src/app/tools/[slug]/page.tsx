import { tools, getToolBySlug } from '@/tools/registry'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ToolRenderer from '@/tools/ToolRenderer'
import RelatedTools from '@/components/RelatedTools'
import ToolPageClient from '@/components/ToolPageClient'
import OutputHistory from '@/components/OutputHistory'
import EmbedWidget from '@/components/EmbedWidget'

export function generateStaticParams() {
  return tools.map(t => ({ slug: t.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const tool = getToolBySlug(params.slug)
  if (!tool) return {}
  return {
    title: `${tool.name} — Free Online Tool | DevKit`,
    description: tool.description,
    keywords: tool.keywords.join(', '),
    openGraph: {
      title: `${tool.name} — Free Online Tool`,
      description: tool.description,
      url: `https://devkit.web.id/tools/${tool.slug}/`,
      siteName: 'DevKit',
      type: 'website',
    },
  }
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug)
  if (!tool) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.description,
    url: `https://devkit.web.id/tools/${tool.slug}/`,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    browserRequirements: 'Requires JavaScript',
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-6 flex items-start justify-between">
        <div>
          <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">{tool.category}</span>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{tool.name}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{tool.description}</p>
        </div>
        <ToolPageClient slug={tool.slug} />
      </div>
      <ToolRenderer slug={tool.slug} />
      <OutputHistory toolSlug={tool.slug} />
      <EmbedWidget slug={tool.slug} name={tool.name} />
      <RelatedTools current={tool.slug} />
    </div>
  )
}
