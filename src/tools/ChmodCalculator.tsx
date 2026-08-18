'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

const PERMS = ['Read', 'Write', 'Execute'] as const
const ROLES = ['Owner', 'Group', 'Others'] as const

export default function ChmodCalculator() {
  const [perms, setPerms] = useState([[true, true, false], [true, false, false], [true, false, false]])

  const toggle = (role: number, perm: number) => {
    const next = perms.map(r => [...r])
    next[role][perm] = !next[role][perm]
    setPerms(next)
  }

  const octal = perms.map(role => role.reduce((sum, p, i) => sum + (p ? [4, 2, 1][i] : 0), 0)).join('')
  const symbolic = 'chmod ' + perms.map(role => (role[0] ? 'r' : '-') + (role[1] ? 'w' : '-') + (role[2] ? 'x' : '-')).join('')

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="py-2 text-left text-gray-600 dark:text-gray-400"></th>
              {PERMS.map(p => <th key={p} className="py-2 text-center text-gray-600 dark:text-gray-400">{p}</th>)}
            </tr>
          </thead>
          <tbody>
            {ROLES.map((role, ri) => (
              <tr key={role} className="border-b border-gray-100 dark:border-gray-800">
                <td className="py-3 font-medium text-gray-700 dark:text-gray-300">{role}</td>
                {PERMS.map((_, pi) => (
                  <td key={pi} className="py-3 text-center">
                    <input
                      type="checkbox"
                      checked={perms[ri][pi]}
                      onChange={() => toggle(ri, pi)}
                      className="w-5 h-5 accent-blue-600 cursor-pointer"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="relative p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Octal</p>
          <p className="font-mono text-lg font-bold">{octal}</p>
          <div className="absolute top-2 right-2"><CopyButton text={octal} /></div>
        </div>
        <div className="relative p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Symbolic</p>
          <p className="font-mono text-lg font-bold">{symbolic}</p>
          <div className="absolute top-2 right-2"><CopyButton text={symbolic} /></div>
        </div>
      </div>
    </div>
  )
}
