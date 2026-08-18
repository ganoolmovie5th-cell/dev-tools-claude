'use client'

import { useState, useEffect } from 'react'
import CopyButton from '@/components/CopyButton'

interface IpData {
  ip: string
  city?: string
  region?: string
  country?: string
  org?: string
  timezone?: string
}

export default function IpInfo() {
  const [data, setData] = useState<IpData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(d => {
        setData({ ip: d.ip, city: d.city, region: d.region, country: d.country_name, org: d.org, timezone: d.timezone })
        setLoading(false)
      })
      .catch(() => {
        setError('Could not fetch IP info. Try disabling ad blocker.')
        setLoading(false)
      })
  }, [])

  if (loading) return <p className="text-gray-400 animate-pulse">Detecting your IP...</p>
  if (error) return <p className="text-red-500 text-sm">{error}</p>
  if (!data) return null

  const entries = [
    { label: 'IP Address', value: data.ip },
    { label: 'City', value: data.city || 'Unknown' },
    { label: 'Region', value: data.region || 'Unknown' },
    { label: 'Country', value: data.country || 'Unknown' },
    { label: 'ISP / Org', value: data.org || 'Unknown' },
    { label: 'Timezone', value: data.timezone || 'Unknown' },
  ]

  return (
    <div className="space-y-4">
      <div className="relative p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Your IP Address</p>
        <p className="text-3xl font-bold font-mono text-blue-600">{data.ip}</p>
        <div className="absolute top-3 right-3"><CopyButton text={data.ip} /></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {entries.slice(1).map(e => (
          <div key={e.label} className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
            <p className="text-xs text-gray-500 dark:text-gray-400">{e.label}</p>
            <p className="font-medium text-sm text-gray-900 dark:text-white mt-0.5">{e.value}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400">Data from ipapi.co. Your IP is not stored by DevKit.</p>
    </div>
  )
}
