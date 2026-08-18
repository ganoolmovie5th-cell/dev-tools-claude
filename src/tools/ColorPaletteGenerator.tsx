'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => { const k = (n + h / 30) % 12; return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1) }
  return '#' + [f(0), f(8), f(4)].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('')
}

function generatePalette(baseHue: number, mode: string): string[] {
  const hues: number[] = []
  if (mode === 'monochrome') return [20, 35, 50, 65, 80].map(l => hslToHex(baseHue, 70, l))
  if (mode === 'analogous') hues.push(baseHue - 30, baseHue - 15, baseHue, baseHue + 15, baseHue + 30)
  else if (mode === 'complementary') hues.push(baseHue, baseHue, baseHue, baseHue + 180, baseHue + 180)
  else if (mode === 'triadic') hues.push(baseHue, baseHue, baseHue + 120, baseHue + 120, baseHue + 240)
  else if (mode === 'split') hues.push(baseHue, baseHue, baseHue + 150, baseHue + 180, baseHue + 210)
  else hues.push(baseHue, baseHue + 72, baseHue + 144, baseHue + 216, baseHue + 288) // tetradic

  return hues.map((h, i) => hslToHex((h + 360) % 360, 65 + i * 3, 45 + i * 5))
}

export default function ColorPaletteGenerator() {
  const [hue, setHue] = useState(210)
  const [mode, setMode] = useState('analogous')
  const palette = generatePalette(hue, mode)

  const cssVars = palette.map((c, i) => `--color-${i + 1}: ${c};`).join('\n')

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Base Hue ({hue}°)</label>
          <input type="range" min={0} max={360} value={hue} onChange={e => setHue(+e.target.value)} className="w-40" />
        </div>
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Harmony</label>
          <select value={mode} onChange={e => setMode(e.target.value)} className="px-3 py-1.5 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg text-sm">
            <option value="monochrome">Monochrome</option>
            <option value="analogous">Analogous</option>
            <option value="complementary">Complementary</option>
            <option value="triadic">Triadic</option>
            <option value="split">Split Complementary</option>
            <option value="tetradic">Tetradic</option>
          </select>
        </div>
      </div>

      <div className="flex rounded-lg overflow-hidden h-24">
        {palette.map((color, i) => (
          <div key={i} className="flex-1 relative group cursor-pointer" style={{ backgroundColor: color }} onClick={() => navigator.clipboard.writeText(color)}>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-mono text-white opacity-0 group-hover:opacity-100 bg-black/30">{color}</span>
          </div>
        ))}
      </div>

      <div className="relative">
        <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm">{cssVars}</pre>
        <div className="absolute top-2 right-2"><CopyButton text={cssVars} /></div>
      </div>
      <p className="text-xs text-gray-400">Click any color to copy its hex value.</p>
    </div>
  )
}
