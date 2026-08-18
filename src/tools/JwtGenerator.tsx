'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function base64url(str: string): string {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export default function JwtGenerator() {
  const [header, setHeader] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}')
  const [payload, setPayload] = useState('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}')
  const [secret, setSecret] = useState('your-secret-key')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const generate = () => {
    try {
      JSON.parse(header)
      JSON.parse(payload)
      const h = base64url(header)
      const p = base64url(payload)
      // Note: signature is a placeholder — real HMAC requires crypto
      const sig = base64url(`fake-sig-${secret.slice(0, 8)}`)
      setOutput(`${h}.${p}.${sig}`)
      setError('')
    } catch (e: any) {
      setError(e.message)
      setOutput('')
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Header</label>
          <textarea value={header} onChange={e => setHeader(e.target.value)} className="w-full h-28 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Payload</label>
          <textarea value={payload} onChange={e => setPayload(e.target.value)} className="w-full h-28 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
      <div>
        <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Secret (for display only — signature is illustrative)</label>
        <input type="text" value={secret} onChange={e => setSecret(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <button onClick={generate} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Generate JWT</button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto text-xs break-all whitespace-pre-wrap">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
      <p className="text-xs text-gray-400">Note: Signature is illustrative. For production JWTs, use a proper library with real HMAC signing.</p>
    </div>
  )
}
