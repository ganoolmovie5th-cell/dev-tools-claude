import Link from 'next/link'

interface ToolCardProps {
  slug: string
  name: string
  description: string
  category: string
}

export default function ToolCard({ slug, name, description, category }: ToolCardProps) {
  return (
    <Link
      href={`/tools/${slug}`}
      className="block p-5 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-sm transition-all bg-white dark:bg-gray-800/50"
    >
      <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">{category}</span>
      <h3 className="mt-1 font-semibold text-gray-900 dark:text-white">{name}</h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </Link>
  )
}
