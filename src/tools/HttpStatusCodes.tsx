'use client'

import { useState } from 'react'

const codes: [number, string, string][] = [
  [100, 'Continue', 'Server received request headers, client should proceed'],
  [101, 'Switching Protocols', 'Server agrees to switch protocols (e.g. WebSocket)'],
  [200, 'OK', 'Request succeeded'],
  [201, 'Created', 'Resource created successfully'],
  [204, 'No Content', 'Success, no response body'],
  [301, 'Moved Permanently', 'Resource permanently moved to new URL'],
  [302, 'Found', 'Resource temporarily at different URL'],
  [304, 'Not Modified', 'Cached version is still valid'],
  [307, 'Temporary Redirect', 'Redirect preserving method'],
  [308, 'Permanent Redirect', 'Permanent redirect preserving method'],
  [400, 'Bad Request', 'Malformed request syntax or invalid parameters'],
  [401, 'Unauthorized', 'Authentication required'],
  [403, 'Forbidden', 'Server refuses to authorize the request'],
  [404, 'Not Found', 'Resource does not exist'],
  [405, 'Method Not Allowed', 'HTTP method not supported for this resource'],
  [409, 'Conflict', 'Request conflicts with current server state'],
  [413, 'Payload Too Large', 'Request body exceeds server limit'],
  [415, 'Unsupported Media Type', 'Content-Type not supported'],
  [422, 'Unprocessable Entity', 'Valid syntax but semantic errors'],
  [429, 'Too Many Requests', 'Rate limit exceeded'],
  [500, 'Internal Server Error', 'Unexpected server error'],
  [502, 'Bad Gateway', 'Invalid response from upstream server'],
  [503, 'Service Unavailable', 'Server temporarily overloaded or in maintenance'],
  [504, 'Gateway Timeout', 'Upstream server timed out'],
]

function getColor(code: number): string {
  if (code < 200) return 'text-blue-600'
  if (code < 300) return 'text-green-600'
  if (code < 400) return 'text-yellow-600'
  if (code < 500) return 'text-red-500'
  return 'text-red-700'
}

export default function HttpStatusCodes() {
  const [search, setSearch] = useState('')

  const filtered = codes.filter(([code, name, desc]) =>
    code.toString().includes(search) ||
    name.toLowerCase().includes(search.toLowerCase()) ||
    desc.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search by code or name..."
        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="py-2 pr-3 text-left text-gray-600 dark:text-gray-400 w-16">Code</th>
              <th className="py-2 pr-3 text-left text-gray-600 dark:text-gray-400">Name</th>
              <th className="py-2 text-left text-gray-600 dark:text-gray-400">Description</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(([code, name, desc]) => (
              <tr key={code} className="border-b border-gray-100 dark:border-gray-800">
                <td className={`py-2 pr-3 font-mono font-bold ${getColor(code)}`}>{code}</td>
                <td className="py-2 pr-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">{name}</td>
                <td className="py-2 text-gray-500 dark:text-gray-400">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
