'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function generateToc(markdown: string): string {
  const lines = markdown.split('\n')
  const toc: string[] = []

  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)$/)
    if (!match) continue
    const level = match[1].length
    const title = match[2].replace(/[*_`\[\]()]/g, '')
    const slug = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
    const indent = '  '.repeat(level - 1)
    toc.push(`${indent}- [${title}](#${slug})`)
  }

  return toc.join('\n')
}

export default function MarkdownTocGenerator() {
  const [input, setInput] = useState('# Introduction\n## Getting Started\n### Installation\n### Configuration\n## Usage\n### Basic Example\n### Advanced Example\n## API Reference\n## FAQ\n## Contributing')
  const output = generateToc(input)

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Paste your markdown with headings..."
        className="w-full h-48 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap text-sm">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
    </div>
  )
}
