'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

export default function GradientGenerator() {
  const [color1, setColor1] = useState('#3b82f6')
  const [color2, setColor2] = useState('#8b5cf6')
  const [angle, setAngle] = useState(135)
  const [type, setType] = useState<'linear' | 'radial'>('linear')

  const gradient = type === 'linear'
    ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
    : `radial-gradient(circle, ${color1}, ${color2})`
  const css = `background: ${gradient};`

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div><label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Color 1</label><input type="color" value={color1} onChange={e => setColor1(e.target.value)} className="w-full h-10 rounded cursor-pointer" /></div>
        <div><label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Color 2</label><input type="color" value={color2} onChange={e => setColor2(e.target.value)} className="w-full h-10 rounded cursor-pointer" /></div>
        <div><label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Angle ({angle}°)</label><input type="range" min={0} max={360} value={angle} onChange={e => setAngle(+e.target.value)} className="w-full mt-2" /></div>
        <div><label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Type</label><select value={type} onChange={e => setType(e.target.value as any)} className="w-full px-2 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg">{['linear', 'radial'].map(t => <option key={t} value={t}>{t}</option>)}</select></div>
      </div>

      <div className="h-40 rounded-lg border border-gray-200 dark:border-gray-700" style={{ background: gradient }} />

      <div className="relative">
        <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm">{css}</pre>
        <div className="absolute top-2 right-2"><CopyButton text={css} /></div>
      </div>
    </div>
  )
}
