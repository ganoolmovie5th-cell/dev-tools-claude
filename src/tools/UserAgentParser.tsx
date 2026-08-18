'use client'

import { useState, useEffect } from 'react'
import CopyButton from '@/components/CopyButton'

function parseUA(ua: string) {
  const browser = ua.match(/(Chrome|Firefox|Safari|Edge|Opera|MSIE|Trident)[\s/]?([\d.]+)?/i)
  const os = ua.match(/(Windows NT [\d.]+|Mac OS X [\d._]+|Linux|Android [\d.]+|iOS [\d._]+|iPhone OS [\d._]+)/i)
  const mobile = /Mobile|Android|iPhone|iPad/i.test(ua)
  const bot = /bot|crawl|spider|slurp/i.test(ua)

  let browserName = browser ? browser[1] : 'Unknown'
  if (browserName === 'Trident') browserName = 'Internet Explorer'
  const browserVersion = browser ? browser[2] || '' : ''

  let osName = os ? os[1].replace(/_/g, '.') : 'Unknown'
  if (osName.startsWith('Windows NT 10')) osName = 'Windows 10/11'
  else if (osName.startsWith('Windows NT 6.3')) osName = 'Windows 8.1'
  else if (osName.startsWith('Windows NT 6.1')) osName = 'Windows 7'

  return {
    browser: `${browserName} ${browserVersion}`.trim(),
    os: osName,
    mobile: mobile ? 'Yes' : 'No',
    bot: bot ? 'Yes' : 'No',
  }
}

export default function UserAgentParser() {
  const [ua, setUa] = useState('')
  const [result, setResult] = useState<ReturnType<typeof parseUA> | null>(null)

  useEffect(() => {
    setUa(navigator.userAgent)
  }, [])

  const parse = () => setResult(parseUA(ua))

  useEffect(() => { if (ua) parse() }, [ua])

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          value={ua}
          onChange={e => setUa(e.target.value)}
          placeholder="Paste a user agent string..."
          className="w-full h-20 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
        />
        <div className="absolute top-2 right-2"><CopyButton text={ua} /></div>
      </div>
      <button onClick={parse} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Parse</button>
      {result && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(result).map(([key, val]) => (
            <div key={key} className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{key}</p>
              <p className="font-medium text-sm text-gray-900 dark:text-white mt-0.5">{val}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
