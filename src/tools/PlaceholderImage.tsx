'use client'

import { useState, useRef, useEffect } from 'react'

export default function PlaceholderImage() {
  const [width, setWidth] = useState(400)
  const [height, setHeight] = useState(300)
  const [bg, setBg] = useState('#e2e8f0')
  const [textColor, setTextColor] = useState('#64748b')
  const [text, setText] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const label = text || `${width} × ${height}`

  const draw = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    canvas.width = width
    canvas.height = height
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, width, height)
    ctx.fillStyle = textColor
    const fontSize = Math.max(12, Math.min(width, height) / 10)
    ctx.font = `${fontSize}px system-ui, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(label, width / 2, height / 2)
  }

  useEffect(() => { draw() }, [width, height, bg, textColor, text])

  const download = () => {
    if (!canvasRef.current) return
    const link = document.createElement('a')
    link.download = `placeholder-${width}x${height}.png`
    link.href = canvasRef.current.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Width</label>
          <input type="number" value={width} onChange={e => setWidth(+e.target.value)} min={10} max={2000} className="w-full px-2 py-1.5 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded" />
        </div>
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Height</label>
          <input type="number" value={height} onChange={e => setHeight(+e.target.value)} min={10} max={2000} className="w-full px-2 py-1.5 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded" />
        </div>
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Background</label>
          <input type="color" value={bg} onChange={e => setBg(e.target.value)} className="w-full h-8 rounded cursor-pointer" />
        </div>
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Text Color</label>
          <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-full h-8 rounded cursor-pointer" />
        </div>
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Custom Text</label>
          <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Optional" className="w-full px-2 py-1.5 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <canvas ref={canvasRef} className="border border-gray-200 dark:border-gray-700 rounded max-w-full" style={{ maxHeight: 300 }} />
        <button onClick={download} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Download PNG</button>
      </div>
    </div>
  )
}
