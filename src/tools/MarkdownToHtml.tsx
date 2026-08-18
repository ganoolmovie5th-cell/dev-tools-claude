'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'
import { marked } from 'marked'

export default function MarkdownToHtml() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const convert = () => {
    const html = marked.parse(input, { async: false }) as string
    setOutput(html)
  }

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="# Hello World&#10;&#10;This is **bold** and *italic*."
        className="w-full h-48 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button onClick={convert} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Convert to HTML</button>
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap text-xs">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
    </div>
  )
}
