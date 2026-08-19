'use client'

import { useState } from 'react'

function decodePayload(jwt: string): any {
  const parts = jwt.trim().split('.')
  if (parts.length !== 3) throw new Error('Invalid JWT format')
  const padded = parts[1].replace(/-/g, '+').replace(/_/g, '/') + '=='.slice(0, (4 - parts[1].length % 4) % 4)
  return JSON.parse(atob(padded))
}

export default function JwtExpiryChecker() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<{ exp: number; iat?: number; remaining: string; expired: boolean; issuedAgo?: string } | null>(null)
  const [error, setError] = useState('')

  const check = () => {
    try {
      const payload = decodePayload(input)
      if (!payload.exp) { setError('No "exp" claim found in JWT payload'); setResult(null); return }

      const now = Math.floor(Date.now() / 1000)
      const diff = payload.exp - now
      const expired = diff <= 0
      const absDiff = Math.abs(diff)

      const days = Math.floor(absDiff / 86400)
      const hours = Math.floor((absDiff % 86400) / 3600)
      const minutes = Math.floor((absDiff % 3600) / 60)
      const seconds = absDiff % 60

      const remaining = expired
        ? `Expired ${days > 0 ? days + 'd ' : ''}${hours}h ${minutes}m ${seconds}s ago`
        : `${days > 0 ? days + 'd ' : ''}${hours}h ${minutes}m ${seconds}s remaining`

      let issuedAgo: string | undefined
      if (payload.iat) {
        const iatDiff = now - payload.iat
        const iatDays = Math.floor(iatDiff / 86400)
        const iatHours = Math.floor((iatDiff % 86400) / 3600)
        issuedAgo = `${iatDays > 0 ? iatDays + 'd ' : ''}${iatHours}h ago`
      }

      setResult({ exp: payload.exp, iat: payload.iat, remaining, expired, issuedAgo })
      setError('')
    } catch (e: any) {
      setError(e.message)
      setResult(null)
    }
  }

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Paste JWT token here..."
        className="w-full h-24 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button onClick={check} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Check Expiry</button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {result && (
        <div className={`p-4 rounded-lg border ${result.expired ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800' : 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'}`}>
          <p className={`text-lg font-bold ${result.expired ? 'text-red-600' : 'text-green-600'}`}>
            {result.expired ? '⚠️ Token Expired' : '✓ Token Valid'}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{result.remaining}</p>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
              <p className="text-[10px] text-gray-400">Expires at (exp)</p>
              <p className="font-mono text-xs">{new Date(result.exp * 1000).toISOString()}</p>
            </div>
            {result.iat && (
              <div className="p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                <p className="text-[10px] text-gray-400">Issued (iat)</p>
                <p className="font-mono text-xs">{result.issuedAgo}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
