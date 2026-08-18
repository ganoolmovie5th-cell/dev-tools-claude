'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function jsonToTs(json: string, name = 'Root'): string {
  const obj = JSON.parse(json)
  const lines: string[] = []

  function getType(value: any): string {
    if (value === null) return 'null'
    if (Array.isArray(value)) {
      if (value.length === 0) return 'any[]'
      return getType(value[0]) + '[]'
    }
    if (typeof value === 'object') return 'object'
    return typeof value
  }

  function generateInterface(obj: any, interfaceName: string) {
    lines.push(`interface ${interfaceName} {`)
    for (const [key, value] of Object.entries(obj)) {
      if (value === null) {
        lines.push(`  ${key}: null;`)
      } else if (Array.isArray(value)) {
        if (value.length > 0 && typeof value[0] === 'object' && value[0] !== null) {
          const childName = interfaceName + key.charAt(0).toUpperCase() + key.slice(1) + 'Item'
          lines.push(`  ${key}: ${childName}[];`)
          generateInterface(value[0], childName)
        } else {
          lines.push(`  ${key}: ${getType(value)};`)
        }
      } else if (typeof value === 'object') {
        const childName = interfaceName + key.charAt(0).toUpperCase() + key.slice(1)
        lines.push(`  ${key}: ${childName};`)
        generateInterface(value, childName)
      } else {
        lines.push(`  ${key}: ${typeof value};`)
      }
    }
    lines.push('}')
    lines.push('')
  }

  if (Array.isArray(obj)) {
    if (obj.length > 0 && typeof obj[0] === 'object') {
      generateInterface(obj[0], name)
      return lines.join('\n') + `type ${name}Array = ${name}[];`
    }
    return `type ${name} = ${getType(obj)};`
  }

  generateInterface(obj, name)
  return lines.join('\n')
}

export default function JsonToTypescript() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [name, setName] = useState('Root')

  const convert = () => {
    try {
      setOutput(jsonToTs(input, name))
      setError('')
    } catch (e: any) {
      setError(e.message)
      setOutput('')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <label className="text-sm text-gray-600 dark:text-gray-400">Interface name:</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="px-3 py-1.5 border border-gray-200 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder='{"name": "John", "age": 30, "hobbies": ["reading"]}'
        className="w-full h-48 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      />
      <button onClick={convert} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Generate TypeScript</button>
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
