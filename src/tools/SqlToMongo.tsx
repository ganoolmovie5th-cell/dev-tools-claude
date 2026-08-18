'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function sqlToMongo(sql: string): string {
  const s = sql.trim().replace(/;$/, '')

  // SELECT
  const selectMatch = s.match(/^SELECT\s+(.*?)\s+FROM\s+(\w+)(?:\s+WHERE\s+(.*?))?(?:\s+ORDER\s+BY\s+(.*?))?(?:\s+LIMIT\s+(\d+))?$/i)
  if (selectMatch) {
    const [, fields, collection, where, order, limit] = selectMatch
    let result = `db.${collection}.find(`

    // WHERE clause
    const filter = where ? parseWhere(where) : '{}'
    result += filter

    // Projection
    if (fields.trim() !== '*') {
      const proj = fields.split(',').map(f => `${f.trim()}: 1`).join(', ')
      result += `, { ${proj} }`
    }

    result += ')'
    if (order) {
      const parts = order.split(',').map(p => {
        const [field, dir] = p.trim().split(/\s+/)
        return `${field}: ${dir?.toUpperCase() === 'DESC' ? -1 : 1}`
      })
      result += `.sort({ ${parts.join(', ')} })`
    }
    if (limit) result += `.limit(${limit})`

    return result
  }

  // INSERT
  const insertMatch = s.match(/^INSERT\s+INTO\s+(\w+)\s*\(([^)]+)\)\s*VALUES\s*\(([^)]+)\)/i)
  if (insertMatch) {
    const [, collection, cols, vals] = insertMatch
    const keys = cols.split(',').map(c => c.trim())
    const values = vals.split(',').map(v => v.trim())
    const doc = keys.map((k, i) => `${k}: ${values[i]}`).join(', ')
    return `db.${collection}.insertOne({ ${doc} })`
  }

  // UPDATE
  const updateMatch = s.match(/^UPDATE\s+(\w+)\s+SET\s+(.*?)\s+WHERE\s+(.*)/i)
  if (updateMatch) {
    const [, collection, set, where] = updateMatch
    const setObj = set.split(',').map(s => { const [k, v] = s.split('=').map(x => x.trim()); return `${k}: ${v}` }).join(', ')
    return `db.${collection}.updateMany(${parseWhere(where)}, { $set: { ${setObj} } })`
  }

  // DELETE
  const deleteMatch = s.match(/^DELETE\s+FROM\s+(\w+)\s+WHERE\s+(.*)/i)
  if (deleteMatch) {
    const [, collection, where] = deleteMatch
    return `db.${collection}.deleteMany(${parseWhere(where)})`
  }

  return '// Could not parse SQL. Supports: SELECT, INSERT, UPDATE, DELETE'
}

function parseWhere(where: string): string {
  let result = where
    .replace(/\s+AND\s+/gi, ', ')
    .replace(/(\w+)\s*=\s*('[^']*'|\d+)/g, '$1: $2')
    .replace(/(\w+)\s*>\s*(\d+)/g, '$1: { $gt: $2 }')
    .replace(/(\w+)\s*<\s*(\d+)/g, '$1: { $lt: $2 }')
    .replace(/(\w+)\s*>=\s*(\d+)/g, '$1: { $gte: $2 }')
    .replace(/(\w+)\s*<=\s*(\d+)/g, '$1: { $lte: $2 }')
    .replace(/(\w+)\s*!=\s*('[^']*'|\d+)/g, '$1: { $ne: $2 }')
    .replace(/(\w+)\s+LIKE\s+'%([^%]+)%'/gi, '$1: /.*$2.*/')
  return `{ ${result} }`
}

export default function SqlToMongo() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const convert = () => setOutput(sqlToMongo(input))

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="SELECT name, age FROM users WHERE age > 25 ORDER BY name LIMIT 10"
        className="w-full h-28 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button onClick={convert} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Convert to MongoDB</button>
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
      <p className="text-xs text-gray-400">Supports SELECT, INSERT, UPDATE, DELETE with basic WHERE clauses.</p>
    </div>
  )
}
