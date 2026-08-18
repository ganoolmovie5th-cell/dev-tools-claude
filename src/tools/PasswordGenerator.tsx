'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function generate(length: number, upper: boolean, lower: boolean, numbers: boolean, symbols: boolean): string {
  let chars = ''
  if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (lower) chars += 'abcdefghijklmnopqrstuvwxyz'
  if (numbers) chars += '0123456789'
  if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'
  if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz'
  const arr = new Uint32Array(length)
  crypto.getRandomValues(arr)
  return Array.from(arr, v => chars[v % chars.length]).join('')
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [upper, setUpper] = useState(true)
  const [lower, setLower] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(true)
  const [password, setPassword] = useState('')

  const gen = () => setPassword(generate(length, upper, lower, numbers, symbols))

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <label className="text-sm text-gray-600">Length:</label>
        <input type="number" min={4} max={128} value={length} onChange={e => setLength(+e.target.value)} className="w-20 px-2 py-1 border border-gray-200 rounded" />
        <label className="flex items-center gap-1 text-sm"><input type="checkbox" checked={upper} onChange={e => setUpper(e.target.checked)} /> A-Z</label>
        <label className="flex items-center gap-1 text-sm"><input type="checkbox" checked={lower} onChange={e => setLower(e.target.checked)} /> a-z</label>
        <label className="flex items-center gap-1 text-sm"><input type="checkbox" checked={numbers} onChange={e => setNumbers(e.target.checked)} /> 0-9</label>
        <label className="flex items-center gap-1 text-sm"><input type="checkbox" checked={symbols} onChange={e => setSymbols(e.target.checked)} /> !@#</label>
      </div>
      <button onClick={gen} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Generate Password</button>
      {password && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-lg tracking-wider">{password}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={password} /></div>
        </div>
      )}
    </div>
  )
}
