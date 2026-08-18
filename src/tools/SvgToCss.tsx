'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function svgToCssBackground(svg: string): string {
  const encoded = encodeURIComponent(svg.trim())
    .replace(/'/g, '%27')
    .replace(/"/g, '%22')
  return `background-image: url("data:image/svg+xml,${encoded}");`
}

export default function SvgToCss() {
  const [input, setInput] = useState('')
  const output = input.trim() ? svgToCssBackground(input) : ''
  const fullCss = output ? `${output}\nbackground-repeat: no-repeat;\nbackground-size: contain;\nbackground-position: center;` : ''

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">...</svg>'
        className="w-full h-48 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {fullCss && (
        <>
          <div className="relative">
            <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-48 text-xs whitespace-pre-wrap">{fullCss}</pre>
            <div className="absolute top-2 right-2"><CopyButton text={fullCss} /></div>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Preview:</p>
            <div
              className="w-full h-32 border border-gray-200 dark:border-gray-700 rounded-lg"
              style={{
                backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(input.trim())}")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
              }}
            />
          </div>
        </>
      )}
    </div>
  )
}
