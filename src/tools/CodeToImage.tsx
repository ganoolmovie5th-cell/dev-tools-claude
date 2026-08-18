'use client'

import { useState, useRef } from 'react'

export default function CodeToImage() {
  const [code, setCode] = useState('function hello() {\n  console.log("Hello, World!");\n  return 42;\n}')
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [padding, setPadding] = useState(32)
  const [fontSize, setFontSize] = useState(14)
  const preRef = useRef<HTMLDivElement>(null)

  const bg = theme === 'dark' ? '#1e293b' : '#f8fafc'
  const textColor = theme === 'dark' ? '#e2e8f0' : '#1e293b'
  const border = theme === 'dark' ? '#334155' : '#e2e8f0'

  const download = () => {
    if (!preRef.current) return
    // Use canvas to render
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    const lines = code.split('\n')
    const lineHeight = fontSize * 1.6
    const w = Math.max(400, Math.max(...lines.map(l => l.length)) * fontSize * 0.62 + padding * 2)
    const h = lines.length * lineHeight + padding * 2

    canvas.width = w * 2 // 2x for retina
    canvas.height = h * 2
    ctx.scale(2, 2)

    // Background
    ctx.fillStyle = bg
    ctx.beginPath()
    ctx.roundRect(0, 0, w, h, 12)
    ctx.fill()

    // Window dots
    const dotY = padding / 2
    ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(padding, dotY, 5, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = '#eab308'; ctx.beginPath(); ctx.arc(padding + 16, dotY, 5, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = '#22c55e'; ctx.beginPath(); ctx.arc(padding + 32, dotY, 5, 0, Math.PI * 2); ctx.fill()

    // Code text
    ctx.fillStyle = textColor
    ctx.font = `${fontSize}px "JetBrains Mono", "Fira Code", monospace`
    lines.forEach((line, i) => {
      ctx.fillText(line, padding, padding + (i + 1) * lineHeight)
    })

    const link = document.createElement('a')
    link.download = 'code-snippet.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="space-y-4">
      <textarea
        value={code}
        onChange={e => setCode(e.target.value)}
        placeholder="Paste your code..."
        className="w-full h-36 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex flex-wrap gap-3 items-center">
        <select value={theme} onChange={e => setTheme(e.target.value as any)} className="px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg">
          <option value="dark">Dark theme</option>
          <option value="light">Light theme</option>
        </select>
        <label className="text-xs text-gray-500 dark:text-gray-400">Size:</label>
        <input type="range" min={10} max={20} value={fontSize} onChange={e => setFontSize(+e.target.value)} className="w-24" />
        <label className="text-xs text-gray-500 dark:text-gray-400">Padding:</label>
        <input type="range" min={16} max={64} value={padding} onChange={e => setPadding(+e.target.value)} className="w-24" />
      </div>

      <div ref={preRef} className="rounded-xl overflow-hidden inline-block" style={{ background: bg, padding, border: `1px solid ${border}` }}>
        <div className="flex gap-1.5 mb-3">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <pre style={{ color: textColor, fontSize, lineHeight: 1.6, fontFamily: "'JetBrains Mono', monospace", margin: 0 }}>{code}</pre>
      </div>

      <button onClick={download} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Download as PNG</button>
    </div>
  )
}
