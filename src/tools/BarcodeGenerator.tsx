'use client'

import { useState, useRef, useEffect } from 'react'

function drawBarcode(canvas: HTMLCanvasElement, text: string) {
  const ctx = canvas.getContext('2d')!
  const barWidth = 2
  const height = 80
  const padding = 20

  // Simple Code 128-like encoding (visual approximation)
  const binary = text.split('').map(c => {
    const code = c.charCodeAt(0)
    return code.toString(2).padStart(8, '0')
  }).join('1') // separator

  const width = binary.length * barWidth + padding * 2
  canvas.width = width
  canvas.height = height + 30

  // White background
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Draw bars
  for (let i = 0; i < binary.length; i++) {
    if (binary[i] === '1') {
      ctx.fillStyle = '#000000'
      ctx.fillRect(padding + i * barWidth, 10, barWidth, height)
    }
  }

  // Text below
  ctx.fillStyle = '#000000'
  ctx.font = '12px monospace'
  ctx.textAlign = 'center'
  ctx.fillText(text, canvas.width / 2, height + 24)
}

export default function BarcodeGenerator() {
  const [input, setInput] = useState('DEVKIT-2026')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current && input) drawBarcode(canvasRef.current, input)
  }, [input])

  const download = () => {
    if (!canvasRef.current) return
    const link = document.createElement('a')
    link.download = 'barcode.png'
    link.href = canvasRef.current.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter text for barcode..."
        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex flex-col items-center gap-3">
        <canvas ref={canvasRef} className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white" />
        <button onClick={download} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Download PNG</button>
      </div>
      <p className="text-xs text-gray-400">Visual barcode representation. For production use, integrate a standards-compliant barcode library.</p>
    </div>
  )
}
