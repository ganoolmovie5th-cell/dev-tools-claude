'use client'

import { useState } from 'react'
import { marked } from 'marked'

export default function MarkdownPreview() {
  const [input, setInput] = useState('# Hello World\n\nThis is **bold** and this is *italic*.\n\n- Item 1\n- Item 2\n\n```js\nconsole.log("hello")\n```')

  const html = marked.parse(input, { async: false }) as string

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Markdown</label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          className="w-full h-96 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Preview</label>
        <div
          className="h-96 p-3 border border-gray-200 rounded-lg overflow-auto prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}
