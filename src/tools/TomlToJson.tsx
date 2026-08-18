'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function parseToml(toml: string): any {
  const result: any = {}
  let current = result
  const lines = toml.split('\n')

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    // Section header [section]
    const section = trimmed.match(/^\[([^\]]+)\]$/)
    if (section) {
      const keys = section[1].split('.')
      current = result
      for (const k of keys) {
        if (!current[k]) current[k] = {}
        current = current[k]
      }
      continue
    }

    // Key-value pair
    const kv = trimmed.match(/^([^=]+?)\s*=\s*(.+)$/)
    if (kv) {
      const key = kv[1].trim().replace(/^["']|["']$/g, '')
      let value: any = kv[2].trim()

      if (value === 'true') value = true
      else if (value === 'false') value = false
      else if (/^-?\d+$/.test(value)) value = parseInt(value)
      else if (/^-?\d+\.\d+$/.test(value)) value = parseFloat(value)
      else if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1)
      else if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1)
      else if (value.startsWith('[') && value.endsWith(']')) {
        try { value = JSON.parse(value.replace(/'/g, '"')) } catch { /* keep as string */ }
      }

      current[key] = value
    }
  }
  return result
}

export default function TomlToJson() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const convert = () => {
    try {
      const result = parseToml(input)
      setOutput(JSON.stringify(result, null, 2))
      setError('')
    } catch (e: any) {
      setError(e.message)
      setOutput('')
    }
  }

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder={'[package]\nname = "my-app"\nversion = "1.0.0"\n\n[dependencies]\nreact = "^18.0"'}
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
