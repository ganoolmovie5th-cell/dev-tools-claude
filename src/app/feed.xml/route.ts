export const dynamic = 'force-static'

const posts = [
  { slug: 'mastering-json-formatting', title: 'Mastering JSON: Format, Validate, and Debug Like a Pro', date: '2026-08-18', excerpt: 'Learn how to work with JSON effectively — from formatting messy API responses to catching subtle validation errors.' },
  { slug: 'regex-guide-for-developers', title: 'Regex for Developers: From Zero to Pattern Matching Hero', date: '2026-08-18', excerpt: 'A practical guide to regular expressions covering character classes, quantifiers, lookaheads, and real-world patterns.' },
  { slug: 'web-security-encoding-guide', title: 'Web Security Encoding: Base64, URL, HTML Entities Explained', date: '2026-08-18', excerpt: 'Understand when and why to encode data for the web — preventing XSS, handling URLs safely, and embedding binary content.' },
]

const BASE = 'https://www.devkit.web.id'

export async function GET() {
  const items = posts.map(p => `    <item>
      <title>${p.title}</title>
      <link>${BASE}/blog/${p.slug}/</link>
      <description>${p.excerpt}</description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <guid>${BASE}/blog/${p.slug}/</guid>
    </item>`).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>DevKit Blog</title>
    <link>${BASE}/blog/</link>
    <description>Developer tutorials and guides from DevKit</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
