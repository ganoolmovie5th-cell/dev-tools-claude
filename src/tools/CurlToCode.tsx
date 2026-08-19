'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function parseCurl(cmd: string) {
  const parts = cmd.replace(/\\\n/g, ' ').trim()
  let url = ''
  let method = 'GET'
  const headers: Record<string, string> = {}
  let body = ''

  // Extract URL
  const urlMatch = parts.match(/curl\s+(?:'([^']+)'|"([^"]+)"|(\S+))/) ||
    parts.match(/(?:^|\s)(?:'(https?:\/\/[^']+)'|"(https?:\/\/[^"]+)"|(https?:\/\/\S+))/)
  if (urlMatch) url = urlMatch[1] || urlMatch[2] || urlMatch[3] || ''

  // Method
  const methodMatch = parts.match(/-X\s+(\w+)/)
  if (methodMatch) method = methodMatch[1]
  if (parts.includes('-d ') || parts.includes('--data')) method = method === 'GET' ? 'POST' : method

  // Headers
  const headerMatches = parts.matchAll(/-H\s+['"](.*?)['"]/g)
  for (const m of headerMatches) {
    const [key, ...val] = m[1].split(':')
    headers[key.trim()] = val.join(':').trim()
  }

  // Body
  const bodyMatch = parts.match(/(?:-d|--data|--data-raw)\s+['"](.*?)['"]/)
  if (bodyMatch) body = bodyMatch[1]

  return { url, method, headers, body }
}

function toJavaScript(p: ReturnType<typeof parseCurl>): string {
  const opts: string[] = []
  opts.push(`  method: '${p.method}'`)
  if (Object.keys(p.headers).length) opts.push(`  headers: ${JSON.stringify(p.headers, null, 4).replace(/\n/g, '\n  ')}`)
  if (p.body) opts.push(`  body: '${p.body}'`)

  return `const response = await fetch('${p.url}', {\n${opts.join(',\n')}\n});\nconst data = await response.json();\nconsole.log(data);`
}

function toPython(p: ReturnType<typeof parseCurl>): string {
  let code = `import requests\n\n`
  const args: string[] = []
  if (Object.keys(p.headers).length) args.push(`headers=${JSON.stringify(p.headers).replace(/"/g, "'")}`)
  if (p.body) args.push(`data='${p.body}'`)

  code += `response = requests.${p.method.toLowerCase()}('${p.url}'${args.length ? ', ' + args.join(', ') : ''})\nprint(response.json())`
  return code
}

function toPHP(p: ReturnType<typeof parseCurl>): string {
  let code = `<?php\n$ch = curl_init();\ncurl_setopt($ch, CURLOPT_URL, '${p.url}');\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\n`
  if (p.method !== 'GET') code += `curl_setopt($ch, CURLOPT_CUSTOMREQUEST, '${p.method}');\n`
  if (Object.keys(p.headers).length) {
    const h = Object.entries(p.headers).map(([k, v]) => `'${k}: ${v}'`).join(', ')
    code += `curl_setopt($ch, CURLOPT_HTTPHEADER, [${h}]);\n`
  }
  if (p.body) code += `curl_setopt($ch, CURLOPT_POSTFIELDS, '${p.body}');\n`
  code += `$response = curl_exec($ch);\ncurl_close($ch);\necho $response;\n?>`
  return code
}

export default function CurlToCode() {
  const [input, setInput] = useState('')
  const [lang, setLang] = useState<'javascript' | 'python' | 'php'>('javascript')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const convert = () => {
    try {
      const parsed = parseCurl(input)
      if (!parsed.url) { setError('Could not parse URL from cURL command'); setOutput(''); return }
      const converters = { javascript: toJavaScript, python: toPython, php: toPHP }
      setOutput(converters[lang](parsed))
      setError('')
    } catch (e: any) {
      setError(e.message)
      setOutput('')
    }
  }

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder={`curl -X POST 'https://api.example.com/data' \\\n  -H 'Content-Type: application/json' \\\n  -d '{"key": "value"}'`}
        className="w-full h-28 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex gap-2 items-center">
        <select value={lang} onChange={e => setLang(e.target.value as any)} className="px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg">
          <option value="javascript">JavaScript (fetch)</option>
          <option value="python">Python (requests)</option>
          <option value="php">PHP (cURL)</option>
        </select>
        <button onClick={convert} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Convert</button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap text-sm">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
    </div>
  )
}
