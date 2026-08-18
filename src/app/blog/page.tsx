import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog — Developer Tutorials & Guides | DevKit',
  description: 'In-depth tutorials on JSON handling, regex patterns, web security, and developer productivity.',
}

const posts = [
  { slug: 'mastering-json-formatting', title: 'Mastering JSON: Format, Validate, and Debug Like a Pro', date: '2026-08-18', readTime: '6 min', excerpt: 'Learn how to work with JSON effectively — from formatting messy API responses to catching subtle validation errors that break your applications.' },
  { slug: 'regex-guide-for-developers', title: 'Regex for Developers: From Zero to Pattern Matching Hero', date: '2026-08-18', readTime: '8 min', excerpt: 'A practical guide to regular expressions covering character classes, quantifiers, lookaheads, and real-world patterns you will actually use.' },
  { slug: 'web-security-encoding-guide', title: 'Web Security Encoding: Base64, URL, HTML Entities Explained', date: '2026-08-18', readTime: '7 min', excerpt: 'Understand when and why to encode data for the web — preventing XSS, handling URLs safely, and embedding binary content in text formats.' },
]

export default function BlogPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Blog</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">In-depth tutorials and guides for developers.</p>

      <div className="space-y-6">
        {posts.map(post => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
              <time>{post.date}</time>
              <span>{post.readTime} read</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{post.title}</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
