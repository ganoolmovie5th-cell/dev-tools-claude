'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

export default function RobotsTxtGenerator() {
  const [sitemapUrl, setSitemapUrl] = useState('https://example.com/sitemap.xml')
  const [rules, setRules] = useState([
    { agent: '*', allow: ['/'], disallow: ['/admin/', '/api/'] },
  ])

  const addRule = () => setRules([...rules, { agent: '', allow: ['/'], disallow: [] }])
  const removeRule = (i: number) => setRules(rules.filter((_, idx) => idx !== i))

  const output = rules.map(r => {
    let text = `User-agent: ${r.agent || '*'}\n`
    r.allow.filter(Boolean).forEach(p => { text += `Allow: ${p}\n` })
    r.disallow.filter(Boolean).forEach(p => { text += `Disallow: ${p}\n` })
    return text
  }).join('\n') + (sitemapUrl ? `\nSitemap: ${sitemapUrl}\n` : '')

  return (
    <div className="space-y-4">
      {rules.map((rule, i) => (
        <div key={i} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg space-y-2">
          <div className="flex gap-2 items-center">
            <label className="text-xs text-gray-500 dark:text-gray-400 w-20">User-agent:</label>
            <input type="text" value={rule.agent} onChange={e => { const n = [...rules]; n[i].agent = e.target.value; setRules(n) }} placeholder="*" className="flex-1 px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded text-sm" />
            {rules.length > 1 && <button onClick={() => removeRule(i)} className="text-red-400 hover:text-red-600 text-xs">Remove</button>}
          </div>
          <div className="flex gap-2 items-center">
            <label className="text-xs text-gray-500 dark:text-gray-400 w-20">Allow:</label>
            <input type="text" value={rule.allow.join(', ')} onChange={e => { const n = [...rules]; n[i].allow = e.target.value.split(',').map(s => s.trim()); setRules(n) }} placeholder="/" className="flex-1 px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded text-sm" />
          </div>
          <div className="flex gap-2 items-center">
            <label className="text-xs text-gray-500 dark:text-gray-400 w-20">Disallow:</label>
            <input type="text" value={rule.disallow.join(', ')} onChange={e => { const n = [...rules]; n[i].disallow = e.target.value.split(',').map(s => s.trim()); setRules(n) }} placeholder="/admin/, /private/" className="flex-1 px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded text-sm" />
          </div>
        </div>
      ))}
      <div className="flex gap-2 items-center">
        <label className="text-xs text-gray-500 dark:text-gray-400 w-20">Sitemap:</label>
        <input type="text" value={sitemapUrl} onChange={e => setSitemapUrl(e.target.value)} className="flex-1 px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded text-sm" />
      </div>
      <button onClick={addRule} className="text-sm text-blue-600 hover:underline">+ Add rule</button>
      <div className="relative">
        <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto whitespace-pre-wrap text-sm">{output}</pre>
        <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
      </div>
    </div>
  )
}
