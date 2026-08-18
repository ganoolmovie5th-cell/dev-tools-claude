'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function calcSubnet(ip: string, cidr: number) {
  const parts = ip.split('.').map(Number)
  if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) throw new Error('Invalid IP')
  if (cidr < 0 || cidr > 32) throw new Error('CIDR must be 0-32')

  const ipNum = (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]
  const mask = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0
  const network = (ipNum & mask) >>> 0
  const broadcast = (network | ~mask) >>> 0
  const first = cidr >= 31 ? network : (network + 1) >>> 0
  const last = cidr >= 31 ? broadcast : (broadcast - 1) >>> 0
  const hosts = cidr >= 31 ? (cidr === 32 ? 1 : 2) : Math.pow(2, 32 - cidr) - 2

  const toIp = (n: number) => [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.')
  const toMask = (n: number) => toIp(n)

  return {
    network: toIp(network),
    broadcast: toIp(broadcast),
    firstHost: toIp(first),
    lastHost: toIp(last),
    subnetMask: toMask(mask),
    hosts,
    cidr,
  }
}

export default function IpSubnetCalc() {
  const [ip, setIp] = useState('192.168.1.0')
  const [cidr, setCidr] = useState(24)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  const calc = () => {
    try { setResult(calcSubnet(ip, cidr)); setError('') }
    catch (e: any) { setError(e.message); setResult(null) }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <input type="text" value={ip} onChange={e => setIp(e.target.value)} placeholder="192.168.1.0" className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <span className="text-gray-400">/</span>
        <input type="number" value={cidr} onChange={e => setCidr(+e.target.value)} min={0} max={32} className="w-20 px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg" />
        <button onClick={calc} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Calculate</button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {result && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: 'Network', value: result.network },
            { label: 'Broadcast', value: result.broadcast },
            { label: 'First Host', value: result.firstHost },
            { label: 'Last Host', value: result.lastHost },
            { label: 'Subnet Mask', value: result.subnetMask },
            { label: 'Usable Hosts', value: result.hosts.toLocaleString() },
          ].map(r => (
            <div key={r.label} className="relative p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400">{r.label}</p>
              <p className="font-mono font-medium text-sm mt-0.5">{r.value}</p>
              <div className="absolute top-1 right-1"><CopyButton text={String(r.value)} /></div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
