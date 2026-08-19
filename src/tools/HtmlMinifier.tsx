'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function minifyHtml(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/>\s+</g, '><')
    .replace(/\s{2,}/g, ' ')
    .replace(/\n/g, '')
    .replace(/\s*=\s*/g, '=')
    .trim()
}

export default function HtmlMinifier() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const minify = () => setOutput(minifyHtml(input))

  const saved = input.length && output.length ? Math.round((1 - output.length / input.length) * 100) : 0

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Paste HTML here..."
        className="w-full h-48 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button onClick={minify} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Minify HTML</button>
      {output && (
        <div className="relative">
          <p className="text-sm text-gray-500 mb-1">Saved {saved}% ({input.length - output.length} characters)</p>
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap text-xs">{output}</pre>
          <div className="absolute top-8 right-2"><CopyButton text={output} /></div>
        </div>
      )}
    </div>
  )
}
