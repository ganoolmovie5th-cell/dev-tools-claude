'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

const conversions = {
  lowercase: (s: string) => s.toLowerCase(),
  UPPERCASE: (s: string) => s.toUpperCase(),
  'Title Case': (s: string) => s.replace(/\b\w/g, c => c.toUpperCase()),
  'Sentence case': (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase(),
  camelCase: (s: string) => s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()),
  PascalCase: (s: string) => s.replace(/(?:^|[^a-zA-Z0-9]+)(.)/g, (_, c) => c.toUpperCase()),
  snake_case: (s: string) => s.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, ''),
  'kebab-case': (s: string) => s.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, ''),
  'CONSTANT_CASE': (s: string) => s.toUpperCase().replace(/[^A-Z0-9]+/g, '_').replace(/^_|_$/g, ''),
  'dot.case': (s: string) => s.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '.').replace(/^\.|\.$/g, ''),
}

export default function TextCaseConverter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [active, setActive] = useState('')

  const convert = (name: string, fn: (s: string) => string) => {
    setOutput(fn(input))
    setActive(name)
  }

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter text to convert..."
        className="w-full h-28 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      />
      <div className="flex flex-wrap gap-2">
        {Object.entries(conversions).map(([name, fn]) => (
          <button
            key={name}
            onClick={() => convert(name, fn)}
            className={`px-3 py-1.5 text-sm rounded border transition-colors ${active === name ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-300'}`}
          >
            {name}
          </button>
        ))}
      </div>
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto whitespace-pre-wrap">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
    </div>
  )
}
