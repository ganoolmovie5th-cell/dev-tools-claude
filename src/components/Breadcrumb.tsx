import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-xs text-gray-400 dark:text-gray-500">
      <ol className="flex items-center gap-1">
        <li><Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300">Home</Link></li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            <span>/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-gray-600 dark:hover:text-gray-300">{item.label}</Link>
            ) : (
              <span className="text-gray-600 dark:text-gray-300">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
