'use client'

import { useState } from 'react'
import CopyButton from './CopyButton'

export default function EmbedWidget({ slug, name }: { slug: string; name: string }) {
  const [open, setOpen] = useState(false)
  const embedCode = `<iframe src="https://devkit.web.id/tools/${slug}/" width="100%" height="500" frameborder="0" title="${name}"></iframe>`

  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen(!open)}
        className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
      >
        {open ? 'Hide embed code' : 'Embed this tool'}
      </button>
      {open && (
        <div className="mt-2 relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs overflow-auto">{embedCode}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={embedCode} /></div>
        </div>
      )}
    </div>
  )
}
