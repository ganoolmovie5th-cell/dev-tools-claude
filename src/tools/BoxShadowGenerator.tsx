'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

export default function BoxShadowGenerator() {
  const [x, setX] = useState(4)
  const [y, setY] = useState(4)
  const [blur, setBlur] = useState(10)
  const [spread, setSpread] = useState(0)
  const [color, setColor] = useState('#00000033')
  const [inset, setInset] = useState(false)

  const shadow = `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px ${color}`
  const css = `box-shadow: ${shadow};`

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div><label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">X Offset ({x}px)</label><input type="range" min={-50} max={50} value={x} onChange={e => setX(+e.target.value)} className="w-full" /></div>
        <div><label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Y Offset ({y}px)</label><input type="range" min={-50} max={50} value={y} onChange={e => setY(+e.target.value)} className="w-full" /></div>
        <div><label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Blur ({blur}px)</label><input type="range" min={0} max={100} value={blur} onChange={e => setBlur(+e.target.value)} className="w-full" /></div>
        <div><label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Spread ({spread}px)</label><input type="range" min={-50} max={50} value={spread} onChange={e => setSpread(+e.target.value)} className="w-full" /></div>
        <div><label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Color</label><input type="color" value={color.slice(0, 7)} onChange={e => setColor(e.target.value + '33')} className="w-full h-8 rounded cursor-pointer" /></div>
        <div><label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Inset</label><label className="flex items-center gap-2 mt-1"><input type="checkbox" checked={inset} onChange={e => setInset(e.target.checked)} className="w-4 h-4" /><span className="text-sm">Inset shadow</span></label></div>
      </div>

      <div className="flex justify-center p-12 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="w-48 h-48 bg-white dark:bg-gray-700 rounded-lg" style={{ boxShadow: shadow }} />
      </div>

      <div className="relative">
        <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm">{css}</pre>
        <div className="absolute top-2 right-2"><CopyButton text={css} /></div>
      </div>
    </div>
  )
}
