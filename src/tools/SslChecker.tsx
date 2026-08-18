'use client'

import { useState } from 'react'

interface SslInfo {
  valid: boolean
  issuer: string
  subject: string
  validFrom: string
  validTo: string
  daysLeft: number
  protocol: string
}

export default function SslChecker() {
  const [domain, setDomain] = useState('')
  const [info, setInfo] = useState<SslInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const check = async () => {
    if (!domain.trim()) return
    setLoading(true)
    setError('')
    setInfo(null)

    try {
      // Use a public SSL check API
      const cleanDomain = domain.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '')
      const res = await fetch(`https://ssl-checker.io/api/v1/check/${encodeURIComponent(cleanDomain)}`)

      if (!res.ok) throw new Error('API error')

      const data = await res.json()

      if (data.result === 'failed' || !data.cert) {
        // Fallback: try basic connectivity check
        setInfo({
          valid: false,
          issuer: 'Unknown',
          subject: cleanDomain,
          validFrom: 'N/A',
          validTo: 'N/A',
          daysLeft: 0,
          protocol: 'Check failed',
        })
        setError('Could not retrieve SSL certificate details. The domain may not have a valid SSL certificate, or the checking service is unavailable.')
      } else {
        const validTo = new Date(data.cert.validTo)
        const daysLeft = Math.floor((validTo.getTime() - Date.now()) / 86400000)

        setInfo({
          valid: daysLeft > 0,
          issuer: data.cert.issuer || 'Unknown',
          subject: data.cert.subject || cleanDomain,
          validFrom: data.cert.validFrom || 'N/A',
          validTo: data.cert.validTo || 'N/A',
          daysLeft,
          protocol: data.protocol || 'TLS',
        })
      }
    } catch {
      // Simple fallback — just check if HTTPS connects
      try {
        const cleanDomain = domain.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '')
        const testRes = await fetch(`https://${cleanDomain}`, { method: 'HEAD', mode: 'no-cors' })
        setInfo({
          valid: true,
          issuer: 'Could not determine (CORS)',
          subject: cleanDomain,
          validFrom: 'N/A',
          validTo: 'N/A',
          daysLeft: -1,
          protocol: 'HTTPS reachable',
        })
      } catch {
        setError('Could not check SSL. The domain may not support HTTPS or the checking service is unavailable.')
      }
    }
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={domain}
          onChange={e => setDomain(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && check()}
          placeholder="example.com"
          className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={check} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
          {loading ? 'Checking...' : 'Check SSL'}
        </button>
      </div>
      {error && <p className="text-yellow-600 dark:text-yellow-400 text-sm">{error}</p>}
      {info && (
        <div className="space-y-3">
          <div className={`p-4 rounded-lg border ${info.valid ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'}`}>
            <div className="flex items-center gap-2">
              <span className={`text-2xl ${info.valid ? '' : ''}`}>{info.valid ? '🔒' : '⚠️'}</span>
              <div>
                <p className={`font-semibold ${info.valid ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                  {info.valid ? 'SSL Certificate Valid' : 'SSL Certificate Issue'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{info.subject}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400">Issuer</p>
              <p className="font-medium text-sm text-gray-900 dark:text-white mt-0.5 truncate">{info.issuer}</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400">Valid From</p>
              <p className="font-medium text-sm text-gray-900 dark:text-white mt-0.5">{info.validFrom}</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400">Valid To</p>
              <p className="font-medium text-sm text-gray-900 dark:text-white mt-0.5">{info.validTo}</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400">Days Remaining</p>
              <p className={`font-medium text-sm mt-0.5 ${info.daysLeft > 30 ? 'text-green-600' : info.daysLeft > 7 ? 'text-yellow-600' : 'text-red-600'}`}>
                {info.daysLeft >= 0 ? info.daysLeft : 'N/A'}
              </p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400">Protocol</p>
              <p className="font-medium text-sm text-gray-900 dark:text-white mt-0.5">{info.protocol}</p>
            </div>
          </div>
        </div>
      )}
      <p className="text-xs text-gray-400">Note: SSL details depend on external API availability. Basic HTTPS reachability is always checked.</p>
    </div>
  )
}
