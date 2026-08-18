'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

const DIRECTIVES = [
  { key: 'default-src', label: 'default-src', placeholder: "'self'" },
  { key: 'script-src', label: 'script-src', placeholder: "'self' 'unsafe-inline'" },
  { key: 'style-src', label: 'style-src', placeholder: "'self' 'unsafe-inline'" },
  { key: 'img-src', label: 'img-src', placeholder: "'self' data: https:" },
  { key: 'font-src', label: 'font-src', placeholder: "'self' https://fonts.gstatic.com" },
  { key: 'connect-src', label: 'connect-src', placeholder: "'self' https://api.example.com" },
  { key: 'frame-src', label: 'frame-src', placeholder: "'none'" },
  { key: 'object-src', label: 'object-src', placeholder: "'none'" },
  { key: 'base-uri', label: 'base-uri', placeholder: "'self'" },
  { key: 'form-action', label: 'form-action', placeholder: "'self'" },
]

export default function CspBuilder() {
  const [values, setValues] = useState<Record<string, string>>({
    'default-src': "'self'",
    'script-src': "'self'",
    'style-src': "'self' 'unsafe-inline'",
    'img-src': "'self' data: https:",
    'object-src': "'none'",
  })

  const update = (key: string, val: string) => {
    setValues(prev => val ? { ...prev, [key]: val } : Object.fromEntries(Object.entries(prev).filter(([k]) => k !== key)))
  }

  const csp = Object.entries(values).filter(([, v]) => v).map(([k, v]) => `${k} ${v}`).join('; ')
  const header = `Content-Security-Policy: ${csp}`
  const meta = `<meta http-equiv="Content-Security-Policy" content="${csp}">`

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {DIRECTIVES.map(d => (
          <div key={d.key} className="flex gap-2 items-center">
            <label className="text-xs text-gray-500 dark:text-gray-400 w-28 font-mono">{d.label}</label>
            <input
              type="text"
              value={values[d.key] || ''}
              onChange={e => update(d.key, e.target.value)}
              placeholder={d.placeholder}
              className="flex-1 px-2 py-1.5 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded text-sm font-mono"
            />
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">HTTP Header:</p>
          <div className="relative">
            <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs overflow-auto whitespace-pre-wrap">{header}</pre>
            <div className="absolute top-2 right-2"><CopyButton text={header} /></div>
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Meta Tag:</p>
          <div className="relative">
            <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs overflow-auto whitespace-pre-wrap">{meta}</pre>
            <div className="absolute top-2 right-2"><CopyButton text={meta} /></div>
          </div>
        </div>
      </div>
    </div>
  )
}
