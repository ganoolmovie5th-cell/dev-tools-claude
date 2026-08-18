'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function envToJson(env: string): string {
  const obj: Record<string, string> = {}
  env.split('\n').forEach(line => {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) return
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) return
    const key = trimmed.slice(0, eqIdx).trim()
    let value = trimmed.slice(eqIdx + 1).trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    obj[key] = value
  })
  return JSON.stringify(obj, null, 2)
}

function jsonToEnv(json: string): string {
  const obj = JSON.parse(json)
  return Object.entries(obj).map(([k, v]) => {
    const val = String(v)
    return val.includes(' ') || val.includes('#') ? `${k}="${val}"` : `${k}=${val}`
  }).join('\n')
}

export default function EnvToJson() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const toJson = () => { try { setOutput(envToJson(input)); setError('') } catch (e: any) { setError(e.message); setOutput('') } }
  const toEnv = () => { try { setOutput(jsonToEnv(input)); setError('') } catch (e: any) { setError(e.message); setOutput('') } }

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder={'DB_HOST=localhost\nDB_PORT=5432\nDB_NAME="my database"\n# Comment line'}
        className="w-full h-36 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex gap-2">
        <button onClick={toJson} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">.env → JSON</button>
        <button onClick={toEnv} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600">JSON → .env</button>
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
