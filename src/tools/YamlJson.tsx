'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

// Minimal YAML parser (handles common cases: objects, arrays, strings, numbers, booleans)
function yamlToJson(yaml: string): string {
  const lines = yaml.split('\n')
  const result: any = {}
  let currentObj = result
  const stack: { obj: any; indent: number }[] = [{ obj: result, indent: -1 }]

  for (const line of lines) {
    if (!line.trim() || line.trim().startsWith('#')) continue
    const indent = line.search(/\S/)
    const content = line.trim()

    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
      stack.pop()
    }
    currentObj = stack[stack.length - 1].obj

    if (content.includes(': ')) {
      const colonIdx = content.indexOf(': ')
      const key = content.slice(0, colonIdx).replace(/^["']|["']$/g, '')
      let value: any = content.slice(colonIdx + 2).trim()

      if (value === 'true') value = true
      else if (value === 'false') value = false
      else if (value === 'null' || value === '~') value = null
      else if (/^-?\d+$/.test(value)) value = parseInt(value)
      else if (/^-?\d+\.\d+$/.test(value)) value = parseFloat(value)
      else if (value.startsWith('[') && value.endsWith(']')) {
        value = JSON.parse(value.replace(/'/g, '"'))
      } else {
        value = value.replace(/^["']|["']$/g, '')
      }

      if (Array.isArray(currentObj)) currentObj.push({ [key]: value })
      else currentObj[key] = value
    } else if (content.endsWith(':')) {
      const key = content.slice(0, -1).replace(/^["']|["']$/g, '')
      const newObj: any = {}
      if (Array.isArray(currentObj)) currentObj.push({ [key]: newObj })
      else currentObj[key] = newObj
      stack.push({ obj: newObj, indent: indent })
    } else if (content.startsWith('- ')) {
      const val = content.slice(2).trim()
      const parentKey = Object.keys(currentObj).pop()
      if (parentKey && !Array.isArray(currentObj[parentKey])) {
        currentObj[parentKey] = []
      }
      if (parentKey) {
        let parsed: any = val
        if (parsed === 'true') parsed = true
        else if (parsed === 'false') parsed = false
        else if (/^-?\d+$/.test(parsed)) parsed = parseInt(parsed)
        else parsed = parsed.replace(/^["']|["']$/g, '')
        currentObj[parentKey].push(parsed)
      }
    }
  }
  return JSON.stringify(result, null, 2)
}

function jsonToYaml(json: string, indent = 0): string {
  const obj = JSON.parse(json)
  const prefix = '  '.repeat(indent)

  if (Array.isArray(obj)) {
    return obj.map(item => {
      if (typeof item === 'object' && item !== null) {
        const inner = jsonToYaml(JSON.stringify(item), indent + 1).trim()
        return `${prefix}- ${inner.replace(/\n/g, `\n${prefix}  `)}`
      }
      return `${prefix}- ${item}`
    }).join('\n')
  }

  return Object.entries(obj).map(([key, value]) => {
    if (value === null) return `${prefix}${key}: null`
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        const items = value.map(v => `${prefix}  - ${typeof v === 'object' ? JSON.stringify(v) : v}`).join('\n')
        return `${prefix}${key}:\n${items}`
      }
      return `${prefix}${key}:\n${jsonToYaml(JSON.stringify(value), indent + 1)}`
    }
    if (typeof value === 'string') return `${prefix}${key}: "${value}"`
    return `${prefix}${key}: ${value}`
  }).join('\n')
}

export default function YamlJson() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const toJson = () => {
    try { setOutput(yamlToJson(input)); setError('') }
    catch (e: any) { setError(e.message); setOutput('') }
  }

  const toYaml = () => {
    try { setOutput(jsonToYaml(input)); setError('') }
    catch (e: any) { setError(e.message); setOutput('') }
  }

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Paste YAML or JSON here..."
        className="w-full h-48 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex gap-2">
        <button onClick={toJson} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">YAML → JSON</button>
        <button onClick={toYaml} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600">JSON → YAML</button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
    </div>
  )
}
