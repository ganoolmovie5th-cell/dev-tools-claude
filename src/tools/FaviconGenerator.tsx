'use client'

import { useState, useRef, useEffect } from 'react'

export default function FaviconGenerator() {
  const [text, setText] = useState('DK')
  const [bgColor, setBgColor] = useState('#2563eb')
  const [textColor, setTextColor] = useState('#ffffff')
  const [radius, setRadius] = useState(6)
  const [size, setSize] = useState(64)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const draw = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = size
    canvas.height = size

    // Background
    ctx.beginPath()
    const r = (radius / 32) * size
    ctx.moveTo(r, 0)
    ctx.lineTo(size - r, 0)
    ctx.quadraticCurveTo(size, 0, size, r)
    ctx.lineTo(size, size - r)
    ctx.quadraticCurveTo(size, size, size - r, size)
    ctx.lineTo(r, size)
    ctx.quadraticCurveTo(0, size, 0, size - r)
    ctx.lineTo(0, r)
    ctx.quadraticCurveTo(0, 0, r, 0)
    ctx.closePath()
    ctx.fillStyle = bgColor
    ctx.fill()

    // Text
    const fontSize = size * 0.45
    ctx.font = `bold ${fontSize}px system-ui, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = textColor
    ctx.fillText(text.slice(0, 3), size / 2, size / 2 + fontSize * 0.05)
  }

  useEffect(() => { draw() }, [text, bgColor, textColor, radius, size])

  const download = (s: number, name: string) => {
    const tmpCanvas = document.createElement('canvas')
    tmpCanvas.width = s
    tmpCanvas.height = s
    const ctx = tmpCanvas.getContext('2d')!
    const r = (radius / 32) * s
    ctx.beginPath()
    ctx.moveTo(r, 0); ctx.lineTo(s - r, 0); ctx.quadraticCurveTo(s, 0, s, r)
    ctx.lineTo(s, s - r); ctx.quadraticCurveTo(s, s, s - r, s)
    ctx.lineTo(r, s); ctx.quadraticCurveTo(0, s, 0, s - r)
    ctx.lineTo(0, r); ctx.quadraticCurveTo(0, 0, r, 0)
    ctx.closePath(); ctx.fillStyle = bgColor; ctx.fill()
    const fontSize = s * 0.45
    ctx.font = `bold ${fontSize}px system-ui, sans-serif`
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillStyle = textColor
    ctx.fillText(text.slice(0, 3), s / 2, s / 2 + fontSize * 0.05)
    const link = document.createElement('a')
    link.download = name
    link.href = tmpCanvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Text / Emoji</label>
          <input type="text" value={text} onChange={e => setText(e.target.value)} maxLength={3} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg" />
        </div>
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Background</label>
          <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-full h-10 rounded cursor-pointer" />
        </div>
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Text Color</label>
          <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-full h-10 rounded cursor-pointer" />
        </div>
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Radius</label>
          <input type="range" min={0} max={32} value={radius} onChange={e => setRadius(+e.target.value)} className="w-full mt-2" />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <canvas ref={canvasRef} width={size} height={size} className="border border-gray-200 dark:border-gray-700 rounded" />
        <div className="space-y-2">
          <button onClick={() => download(16, 'favicon-16.png')} className="block text-sm text-blue-600 hover:underline">Download 16x16</button>
          <button onClick={() => download(32, 'favicon-32.png')} className="block text-sm text-blue-600 hover:underline">Download 32x32</button>
          <button onClick={() => download(180, 'apple-touch-icon.png')} className="block text-sm text-blue-600 hover:underline">Download 180x180 (Apple)</button>
          <button onClick={() => download(192, 'icon-192.png')} className="block text-sm text-blue-600 hover:underline">Download 192x192 (PWA)</button>
          <button onClick={() => download(512, 'icon-512.png')} className="block text-sm text-blue-600 hover:underline">Download 512x512 (PWA)</button>
        </div>
      </div>
    </div>
  )
}
