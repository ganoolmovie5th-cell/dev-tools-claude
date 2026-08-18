'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

export default function FlexboxGenerator() {
  const [direction, setDirection] = useState('row')
  const [justify, setJustify] = useState('center')
  const [align, setAlign] = useState('center')
  const [wrap, setWrap] = useState('nowrap')
  const [gap, setGap] = useState(8)
  const [items, setItems] = useState(4)

  const css = `display: flex;\nflex-direction: ${direction};\njustify-content: ${justify};\nalign-items: ${align};\nflex-wrap: ${wrap};\ngap: ${gap}px;`

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div><label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Direction</label><select value={direction} onChange={e => setDirection(e.target.value)} className="w-full px-2 py-1.5 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded">{['row', 'row-reverse', 'column', 'column-reverse'].map(v => <option key={v}>{v}</option>)}</select></div>
        <div><label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Justify Content</label><select value={justify} onChange={e => setJustify(e.target.value)} className="w-full px-2 py-1.5 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded">{['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'].map(v => <option key={v}>{v}</option>)}</select></div>
        <div><label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Align Items</label><select value={align} onChange={e => setAlign(e.target.value)} className="w-full px-2 py-1.5 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded">{['flex-start', 'flex-end', 'center', 'stretch', 'baseline'].map(v => <option key={v}>{v}</option>)}</select></div>
        <div><label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Wrap</label><select value={wrap} onChange={e => setWrap(e.target.value)} className="w-full px-2 py-1.5 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded">{['nowrap', 'wrap', 'wrap-reverse'].map(v => <option key={v}>{v}</option>)}</select></div>
        <div><label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Gap ({gap}px)</label><input type="range" min={0} max={40} value={gap} onChange={e => setGap(+e.target.value)} className="w-full mt-1" /></div>
        <div><label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Items ({items})</label><input type="range" min={1} max={8} value={items} onChange={e => setItems(+e.target.value)} className="w-full mt-1" /></div>
      </div>

      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 min-h-[160px]" style={{ display: 'flex', flexDirection: direction as any, justifyContent: justify, alignItems: align, flexWrap: wrap as any, gap }}>
        {Array.from({ length: items }, (_, i) => (
          <div key={i} className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">{i + 1}</div>
        ))}
      </div>

      <div className="relative">
        <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm whitespace-pre-wrap">{css}</pre>
        <div className="absolute top-2 right-2"><CopyButton text={css} /></div>
      </div>
    </div>
  )
}
