'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

export default function BorderRadiusVisualizer() {
  const [tl, setTl] = useState(16)
  const [tr, setTr] = useState(16)
  const [br, setBr] = useState(16)
  const [bl, setBl] = useState(16)
  const [linked, setLinked] = useState(true)

  const setAll = (v: number) => { setTl(v); setTr(v); setBr(v); setBl(v) }
  const handleChange = (setter: (v: number) => void, v: number) => {
    if (linked) setAll(v); else setter(v)
  }

  const css = tl === tr && tr === br && br === bl
    ? `border-radius: ${tl}px;`
    : `border-radius: ${tl}px ${tr}px ${br}px ${bl}px;`

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-2">
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <input type="checkbox" checked={linked} onChange={e => setLinked(e.target.checked)} className="w-4 h-4" />
          Link all corners
        </label>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div><label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Top-Left ({tl}px)</label><input type="range" min={0} max={100} value={tl} onChange={e => handleChange(setTl, +e.target.value)} className="w-full" /></div>
        <div><label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Top-Right ({tr}px)</label><input type="range" min={0} max={100} value={tr} onChange={e => handleChange(setTr, +e.target.value)} className="w-full" /></div>
        <div><label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Bottom-Right ({br}px)</label><input type="range" min={0} max={100} value={br} onChange={e => handleChange(setBr, +e.target.value)} className="w-full" /></div>
        <div><label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Bottom-Left ({bl}px)</label><input type="range" min={0} max={100} value={bl} onChange={e => handleChange(setBl, +e.target.value)} className="w-full" /></div>
      </div>

      <div className="flex justify-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div
          className="w-48 h-48 bg-blue-500"
          style={{ borderRadius: `${tl}px ${tr}px ${br}px ${bl}px` }}
        />
      </div>

      <div className="relative">
        <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm">{css}</pre>
        <div className="absolute top-2 right-2"><CopyButton text={css} /></div>
      </div>
    </div>
  )
}
