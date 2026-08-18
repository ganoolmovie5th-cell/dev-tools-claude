'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function jsObjToJson(input: string): string {
  // Convert JS object literal to valid JSON
  let json = input
    .replace(/'/g, '"') // single to double quotes
    .replace(/(\w+)\s*:/g, '"$1":') // unquoted keys
    .replace(/,\s*([\]}])/g, '$1') // trailing commas
    .replace(/undefined/g, 'null')
  return JSON.stringify(JSON.parse(json), null, 2)
}

export default function JsObjToJson() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const convert = () => {
    try { setOutput(jsObjToJson(input)); setError('') }
    catch (e: any) { setError(e.message); setOutput('') }
  }

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="{name: 'John', age: 30, hobbies: ['reading', 'coding']}"
        className="w-full h-48 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button onClick={convert} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Convert to JSON</button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
    </div>
  )
}
