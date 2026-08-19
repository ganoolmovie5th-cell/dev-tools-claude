'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function beautifyJs(code: string): string {
  let indent = 0
  let result = ''
  let inString = false
  let stringChar = ''
  let i = 0

  const addNewline = () => { result += '\n' + '  '.repeat(indent) }

  while (i < code.length) {
    const ch = code[i]

    // Handle strings
    if ((ch === '"' || ch === "'" || ch === '`') && code[i - 1] !== '\\') {
      if (!inString) { inString = true; stringChar = ch }
      else if (ch === stringChar) { inString = false }
      result += ch; i++; continue
    }
    if (inString) { result += ch; i++; continue }

    // Handle braces
    if (ch === '{') { result += ' {'; indent++; addNewline(); i++; continue }
    if (ch === '}') { indent--; addNewline(); result += '}'; if (code[i + 1] !== ';' && code[i + 1] !== ',') addNewline(); i++; continue }

    // Handle semicolons
    if (ch === ';') { result += ';'; if (code[i + 1] !== '}') addNewline(); i++; continue }

    // Handle commas in objects/arrays
    if (ch === ',') { result += ','; if (code[i + 1] !== '\n') { result += ' ' } i++; continue }

    // Skip multiple spaces
    if (ch === ' ' && code[i + 1] === ' ') { i++; continue }

    result += ch
    i++
  }

  return result.replace(/\n\s*\n/g, '\n').trim()
}

export default function JsBeautifier() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const beautify = () => setOutput(beautifyJs(input))

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Paste minified JavaScript here..."
        className="w-full h-48 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button onClick={beautify} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Beautify</button>
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap text-sm">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
    </div>
  )
}
