'use client'

import { useState } from 'react'

export default function OgPreview() {
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('My Page Title')
  const [desc, setDesc] = useState('A brief description of my page that shows up in social media previews.')
  const [image, setImage] = useState('')
  const [siteName, setSiteName] = useState('mysite.com')

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Description</label>
          <input type="text" value={desc} onChange={e => setDesc(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Image URL</label>
          <input type="text" value={image} onChange={e => setImage(e.target.value)} placeholder="https://..." className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Site Name</label>
          <input type="text" value={siteName} onChange={e => setSiteName(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Preview — Facebook / LinkedIn</h3>
        <div className="max-w-lg border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          {image && <div className="h-52 bg-gray-200 dark:bg-gray-700 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />}
          {!image && <div className="h-52 bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 text-sm">No image</div>}
          <div className="p-3 bg-gray-50 dark:bg-gray-800">
            <p className="text-[10px] text-gray-400 uppercase">{siteName}</p>
            <p className="font-semibold text-sm text-gray-900 dark:text-white mt-0.5 line-clamp-1">{title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{desc}</p>
          </div>
        </div>

        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Preview — X (Twitter)</h3>
        <div className="max-w-lg border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          {image && <div className="h-48 bg-gray-200 dark:bg-gray-700 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />}
          {!image && <div className="h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 text-sm">No image</div>}
          <div className="p-3">
            <p className="font-medium text-sm text-gray-900 dark:text-white line-clamp-1">{title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{desc}</p>
            <p className="text-[10px] text-gray-400 mt-1">{siteName}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
