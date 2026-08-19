'use client'

import { useState } from 'react'

interface ValidationResult {
  valid: boolean
  errors: string[]
}

function validateAgainstSchema(data: any, schema: any, path = ''): string[] {
  const errors: string[] = []

  if (schema.type) {
    const actualType = Array.isArray(data) ? 'array' : data === null ? 'null' : typeof data
    if (schema.type !== actualType) {
      errors.push(`${path || 'root'}: expected type "${schema.type}", got "${actualType}"`)
      return errors
    }
  }

  if (schema.type === 'object' && schema.properties) {
    if (schema.required) {
      for (const key of schema.required) {
        if (!(key in data)) errors.push(`${path}.${key}: required property missing`)
      }
    }
    for (const [key, propSchema] of Object.entries(schema.properties)) {
      if (key in data) {
        errors.push(...validateAgainstSchema(data[key], propSchema as any, `${path}.${key}`))
      }
    }
  }

  if (schema.type === 'array' && schema.items && Array.isArray(data)) {
    data.forEach((item: any, i: number) => {
      errors.push(...validateAgainstSchema(item, schema.items, `${path}[${i}]`))
    })
    if (schema.minItems && data.length < schema.minItems) errors.push(`${path}: array must have at least ${schema.minItems} items`)
    if (schema.maxItems && data.length > schema.maxItems) errors.push(`${path}: array must have at most ${schema.maxItems} items`)
  }

  if (schema.type === 'string') {
    if (schema.minLength && data.length < schema.minLength) errors.push(`${path}: string must be at least ${schema.minLength} chars`)
    if (schema.maxLength && data.length > schema.maxLength) errors.push(`${path}: string must be at most ${schema.maxLength} chars`)
    if (schema.pattern && !new RegExp(schema.pattern).test(data)) errors.push(`${path}: string does not match pattern "${schema.pattern}"`)
    if (schema.enum && !schema.enum.includes(data)) errors.push(`${path}: value must be one of ${JSON.stringify(schema.enum)}`)
  }

  if (schema.type === 'number' || schema.type === 'integer') {
    if (schema.minimum !== undefined && data < schema.minimum) errors.push(`${path}: must be >= ${schema.minimum}`)
    if (schema.maximum !== undefined && data > schema.maximum) errors.push(`${path}: must be <= ${schema.maximum}`)
    if (schema.type === 'integer' && !Number.isInteger(data)) errors.push(`${path}: must be an integer`)
  }

  return errors
}

export default function JsonSchemaValidator() {
  const [jsonInput, setJsonInput] = useState('')
  const [schemaInput, setSchemaInput] = useState('')
  const [result, setResult] = useState<ValidationResult | null>(null)
  const [error, setError] = useState('')

  const validate = () => {
    try {
      const data = JSON.parse(jsonInput)
      const schema = JSON.parse(schemaInput)
      const errors = validateAgainstSchema(data, schema)
      setResult({ valid: errors.length === 0, errors })
      setError('')
    } catch (e: any) {
      setError(e.message)
      setResult(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">JSON Data</label>
          <textarea
            value={jsonInput}
            onChange={e => setJsonInput(e.target.value)}
            placeholder='{"name": "John", "age": 30}'
            className="w-full h-40 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">JSON Schema</label>
          <textarea
            value={schemaInput}
            onChange={e => setSchemaInput(e.target.value)}
            placeholder='{"type": "object", "required": ["name"], "properties": {"name": {"type": "string"}, "age": {"type": "number", "minimum": 0}}}'
            className="w-full h-40 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <button onClick={validate} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Validate</button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {result && (
        <div className={`p-4 rounded-lg border ${result.valid ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'}`}>
          <p className={`font-semibold ${result.valid ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
            {result.valid ? '✓ Valid — data matches schema' : `✗ Invalid — ${result.errors.length} error(s)`}
          </p>
          {result.errors.length > 0 && (
            <ul className="mt-2 space-y-1">
              {result.errors.map((err, i) => (
                <li key={i} className="text-sm text-red-600 dark:text-red-400 font-mono">• {err}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
