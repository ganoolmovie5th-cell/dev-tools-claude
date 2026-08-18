'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

const TW_MAP: Record<string, string> = {
  // Display
  'block': 'display: block;', 'inline-block': 'display: inline-block;', 'inline': 'display: inline;', 'flex': 'display: flex;', 'grid': 'display: grid;', 'hidden': 'display: none;',
  // Position
  'static': 'position: static;', 'fixed': 'position: fixed;', 'absolute': 'position: absolute;', 'relative': 'position: relative;', 'sticky': 'position: sticky;',
  // Flex
  'flex-row': 'flex-direction: row;', 'flex-col': 'flex-direction: column;', 'flex-wrap': 'flex-wrap: wrap;', 'flex-nowrap': 'flex-wrap: nowrap;',
  'items-start': 'align-items: flex-start;', 'items-center': 'align-items: center;', 'items-end': 'align-items: flex-end;', 'items-stretch': 'align-items: stretch;',
  'justify-start': 'justify-content: flex-start;', 'justify-center': 'justify-content: center;', 'justify-end': 'justify-content: flex-end;', 'justify-between': 'justify-content: space-between;',
  'flex-1': 'flex: 1 1 0%;', 'flex-auto': 'flex: 1 1 auto;', 'flex-none': 'flex: none;',
  // Sizing
  'w-full': 'width: 100%;', 'w-screen': 'width: 100vw;', 'w-auto': 'width: auto;', 'h-full': 'height: 100%;', 'h-screen': 'height: 100vh;', 'h-auto': 'height: auto;',
  'min-w-0': 'min-width: 0;', 'min-h-0': 'min-height: 0;', 'min-h-screen': 'min-height: 100vh;',
  // Typography
  'text-left': 'text-align: left;', 'text-center': 'text-align: center;', 'text-right': 'text-align: right;',
  'font-thin': 'font-weight: 100;', 'font-light': 'font-weight: 300;', 'font-normal': 'font-weight: 400;', 'font-medium': 'font-weight: 500;', 'font-semibold': 'font-weight: 600;', 'font-bold': 'font-weight: 700;', 'font-extrabold': 'font-weight: 800;',
  'text-xs': 'font-size: 0.75rem; line-height: 1rem;', 'text-sm': 'font-size: 0.875rem; line-height: 1.25rem;', 'text-base': 'font-size: 1rem; line-height: 1.5rem;', 'text-lg': 'font-size: 1.125rem; line-height: 1.75rem;', 'text-xl': 'font-size: 1.25rem; line-height: 1.75rem;', 'text-2xl': 'font-size: 1.5rem; line-height: 2rem;', 'text-3xl': 'font-size: 1.875rem; line-height: 2.25rem;',
  'italic': 'font-style: italic;', 'not-italic': 'font-style: normal;', 'underline': 'text-decoration: underline;', 'line-through': 'text-decoration: line-through;', 'no-underline': 'text-decoration: none;', 'uppercase': 'text-transform: uppercase;', 'lowercase': 'text-transform: lowercase;', 'capitalize': 'text-transform: capitalize;',
  'truncate': 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap;',
  // Border
  'rounded': 'border-radius: 0.25rem;', 'rounded-md': 'border-radius: 0.375rem;', 'rounded-lg': 'border-radius: 0.5rem;', 'rounded-xl': 'border-radius: 0.75rem;', 'rounded-full': 'border-radius: 9999px;', 'rounded-none': 'border-radius: 0;',
  'border': 'border-width: 1px;', 'border-0': 'border-width: 0;', 'border-2': 'border-width: 2px;',
  // Overflow
  'overflow-hidden': 'overflow: hidden;', 'overflow-auto': 'overflow: auto;', 'overflow-scroll': 'overflow: scroll;', 'overflow-visible': 'overflow: visible;',
  // Cursor
  'cursor-pointer': 'cursor: pointer;', 'cursor-not-allowed': 'cursor: not-allowed;', 'cursor-default': 'cursor: default;',
  // Misc
  'opacity-0': 'opacity: 0;', 'opacity-50': 'opacity: 0.5;', 'opacity-100': 'opacity: 1;',
  'transition': 'transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;',
  'shadow': 'box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1);', 'shadow-md': 'box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);', 'shadow-lg': 'box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1);', 'shadow-none': 'box-shadow: none;',
}

function parseSpacing(cls: string): string | null {
  const m = cls.match(/^(m|p|mx|my|mt|mr|mb|ml|px|py|pt|pr|pb|pl|gap)-([\d.]+|auto)$/)
  if (!m) return null
  const [, prefix, val] = m
  const prop: Record<string, string> = { m: 'margin', p: 'padding', mx: 'margin-left/margin-right', my: 'margin-top/margin-bottom', mt: 'margin-top', mr: 'margin-right', mb: 'margin-bottom', ml: 'margin-left', px: 'padding-left/padding-right', py: 'padding-top/padding-bottom', pt: 'padding-top', pr: 'padding-right', pb: 'padding-bottom', pl: 'padding-left', gap: 'gap' }
  const value = val === 'auto' ? 'auto' : `${parseFloat(val) * 0.25}rem`
  const propName = prop[prefix] || prefix
  if (propName.includes('/')) {
    const [a, b] = propName.split('/')
    return `${a}: ${value}; ${b}: ${value};`
  }
  return `${propName}: ${value};`
}

function convertClass(cls: string): string {
  if (TW_MAP[cls]) return TW_MAP[cls]
  const spacing = parseSpacing(cls)
  if (spacing) return spacing
  if (cls.startsWith('text-') && cls.match(/text-(black|white|gray|red|blue|green|yellow|purple|pink)/)) return `color: /* ${cls} */;`
  if (cls.startsWith('bg-')) return `background-color: /* ${cls} */;`
  if (cls.match(/^w-\d+$/)) return `width: ${parseInt(cls.slice(2)) * 0.25}rem;`
  if (cls.match(/^h-\d+$/)) return `height: ${parseInt(cls.slice(2)) * 0.25}rem;`
  return `/* ${cls}: unknown */`
}

export default function TailwindToCss() {
  const [input, setInput] = useState('')
  const output = input.trim()
    ? input.trim().split(/\s+/).map(convertClass).join('\n')
    : ''

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="flex items-center justify-between p-4 rounded-lg shadow-md text-lg font-bold"
        className="w-full h-28 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 text-xs whitespace-pre-wrap">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
      <p className="text-xs text-gray-400 dark:text-gray-500">Covers common utilities. Colors output as comments — check Tailwind docs for exact hex values.</p>
    </div>
  )
}
