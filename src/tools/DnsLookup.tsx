'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

interface DnsRecord {
  type: string
  value: string
  ttl?: number
}

export default function DnsLookup() {
  const [domain, setDomain] = useState('')
  const [records, setRecords] = useState<DnsRecord[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const lookup = async () => {
    if (!domain.trim()) return
    setLoading(true)
    setError('')
    setRecords([])

    try {
      const types = ['A', 'AAAA', 'MX', 'NS', 'TXT', 'CNAME']
      const results: DnsRecord[] = []

      for (const type of types) {
        try {
          const res = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domain.trim())}&type=${type}`)
          const data = await res.json()
          if (data.Answer) {
            data.Answer.forEach((a: any) => {
              results.push({ type: type, value: a.data, ttl: a.TTL })
            })
          }
        } catch { /* skip failed type */ }
      }

      if (results.length === 0) {
        setError('No DNS records found for this domain.')
      } else {
        setRecords(results)
      }
    } catch (e: any) {
      setError('Lookup failed. Check the domain and try again.')
    }
    setLoading(false)
  }

  const allText = records.map(r => `${r.type}\t${r.value}\tTTL:${r.ttl}`).join('\n')

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={domain}
          onChange={e => setDomain(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && lookup()}
          placeholder="example.com"
          className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={lookup} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
          {loading ? 'Looking up...' : 'Lookup'}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {records.length > 0 && (
        <div className="relative">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-2 pr-3 text-left text-gray-600 dark:text-gray-400 w-20">Type</th>
                  <th className="py-2 pr-3 text-left text-gray-600 dark:text-gray-400">Value</th>
                  <th className="py-2 text-left text-gray-600 dark:text-gray-400 w-20">TTL</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r, i) => (
                  <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-2 pr-3 font-mono text-blue-600 font-medium">{r.type}</td>
                    <td className="py-2 pr-3 font-mono text-xs break-all text-gray-700 dark:text-gray-300">{r.value}</td>
                    <td className="py-2 text-gray-400 text-xs">{r.ttl}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="absolute top-0 right-0"><CopyButton text={allText} /></div>
        </div>
      )}
      <p className="text-xs text-gray-400">Uses Google DNS-over-HTTPS (dns.google). Your query is sent to Google's public DNS resolver.</p>
    </div>
  )
}
