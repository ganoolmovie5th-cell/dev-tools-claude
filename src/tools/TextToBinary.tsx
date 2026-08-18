'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function textToBin(text: string): string {
  return text.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ')
}

function binToText(bin: string): string {
  return bin.trim().split(/\s+/).map(b => String.fromCharCode(parseInt(b, 2))).join('')
}

export default function TextToBinary() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const encode = () => setOutput(textToBin(input))
  const decode = () => { try { setOutput(binToText(input)) } catch { setOutput('Invalid binary') } }

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter text or binary (space-separated)..."
        className="w-full h-28 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex gap-2">
        <button onClick={encode} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Text → Binary</button>
        <button onClick={decode} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600">Binary → Text</button>
      </div>
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
    </div>
  )
}
