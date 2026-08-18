'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

const CHARS = ' .:-=+*#%@'

function textToAscii(text: string, size: 'small' | 'medium' | 'large'): string {
  const scale = size === 'small' ? 1 : size === 'medium' ? 2 : 3
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  const fontSize = 12 * scale
  ctx.font = `bold ${fontSize}px monospace`
  const metrics = ctx.measureText(text)
  const w = Math.ceil(metrics.width) + 4
  const h = fontSize + 4
  canvas.width = w
  canvas.height = h
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, w, h)
  ctx.fillStyle = '#000'
  ctx.font = `bold ${fontSize}px monospace`
  ctx.textBaseline = 'top'
  ctx.fillText(text, 2, 2)

  const data = ctx.getImageData(0, 0, w, h).data
  const lines: string[] = []
  const step = Math.max(1, Math.floor(2 / scale))

  for (let y = 0; y < h; y += step * 2) {
    let line = ''
    for (let x = 0; x < w; x += step) {
      const i = (y * w + x) * 4
      const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3
      const charIdx = Math.floor((1 - brightness / 255) * (CHARS.length - 1))
      line += CHARS[charIdx]
    }
    lines.push(line)
  }
  return lines.join('\n')
}

export default function AsciiArt() {
  const [input, setInput] = useState('Hello')
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium')
  const [output, setOutput] = useState('')

  const generate = () => {
    if (!input.trim()) return
    setOutput(textToAscii(input, size))
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text..." className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <select value={size} onChange={e => setSize(e.target.value as any)} className="px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg">
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
        <button onClick={generate} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Generate</button>
      </div>
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-900 text-green-400 rounded-lg overflow-auto max-h-96 text-[10px] leading-tight font-mono">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
    </div>
  )
}
