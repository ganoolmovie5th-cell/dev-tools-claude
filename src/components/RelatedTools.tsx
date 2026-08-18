import Link from 'next/link'
import { tools, ToolMeta } from '@/tools/registry'

export default function RelatedTools({ current }: { current: string }) {
  const tool = tools.find(t => t.slug === current)
  if (!tool) return null

  const related = tools
    .filter(t => t.slug !== current && t.category === tool.category)
    .slice(0, 4)

  // If not enough same-category, fill with random others
  if (related.length < 4) {
    const others = tools.filter(t => t.slug !== current && !related.includes(t)).slice(0, 4 - related.length)
    related.push(...others)
  }

  return (
    <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Related Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {related.map(t => (
          <Link
            key={t.slug}
            href={`/tools/${t.slug}`}
            className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
          >
            <span className="text-xs text-blue-600 uppercase tracking-wide">{t.category}</span>
            <p className="font-medium text-gray-900 dark:text-white text-sm">{t.name}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
