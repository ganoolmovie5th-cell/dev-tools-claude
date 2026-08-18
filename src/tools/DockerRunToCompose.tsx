'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function parseDockerRun(cmd: string): string {
  const parts = cmd.replace(/\\\n/g, ' ').trim().split(/\s+/)
  const service: any = {}
  let image = ''
  let i = 0

  // skip 'docker run' or 'docker' 'run'
  if (parts[0] === 'docker') i++
  if (parts[i] === 'run') i++

  while (i < parts.length) {
    const arg = parts[i]
    if (arg === '-d' || arg === '--detach') { i++; continue }
    if (arg === '--rm') { i++; continue }
    if (arg === '-it' || arg === '-i' || arg === '-t') { i++; continue }
    if (arg === '--name') { service.container_name = parts[++i]; i++; continue }
    if (arg === '-p' || arg === '--publish') { service.ports = service.ports || []; service.ports.push(parts[++i]); i++; continue }
    if (arg === '-v' || arg === '--volume') { service.volumes = service.volumes || []; service.volumes.push(parts[++i]); i++; continue }
    if (arg === '-e' || arg === '--env') { service.environment = service.environment || []; service.environment.push(parts[++i]); i++; continue }
    if (arg === '--env-file') { service.env_file = service.env_file || []; service.env_file.push(parts[++i]); i++; continue }
    if (arg === '--network') { service.networks = [parts[++i]]; i++; continue }
    if (arg === '--restart') { service.restart = parts[++i]; i++; continue }
    if (arg === '-w' || arg === '--workdir') { service.working_dir = parts[++i]; i++; continue }
    if (arg === '--memory' || arg === '-m') { i += 2; continue } // skip for simplicity
    if (!arg.startsWith('-')) { image = arg; i++; break }
    i++
  }

  const command = parts.slice(i).join(' ')
  const serviceName = service.container_name || image.split('/').pop()?.split(':')[0] || 'app'

  let yaml = `version: "3.8"\n\nservices:\n  ${serviceName}:\n    image: ${image}\n`
  if (service.container_name) yaml += `    container_name: ${service.container_name}\n`
  if (service.ports?.length) yaml += `    ports:\n${service.ports.map((p: string) => `      - "${p}"`).join('\n')}\n`
  if (service.volumes?.length) yaml += `    volumes:\n${service.volumes.map((v: string) => `      - ${v}`).join('\n')}\n`
  if (service.environment?.length) yaml += `    environment:\n${service.environment.map((e: string) => `      - ${e}`).join('\n')}\n`
  if (service.env_file?.length) yaml += `    env_file:\n${service.env_file.map((f: string) => `      - ${f}`).join('\n')}\n`
  if (service.networks) yaml += `    networks:\n      - ${service.networks[0]}\n`
  if (service.restart) yaml += `    restart: ${service.restart}\n`
  if (service.working_dir) yaml += `    working_dir: ${service.working_dir}\n`
  if (command) yaml += `    command: ${command}\n`

  if (service.networks) yaml += `\nnetworks:\n  ${service.networks[0]}:\n    driver: bridge\n`

  return yaml
}

export default function DockerRunToCompose() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const convert = () => {
    try { setOutput(parseDockerRun(input)); setError('') }
    catch (e: any) { setError(e.message); setOutput('') }
  }

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder='docker run -d --name myapp -p 3000:3000 -v ./data:/data -e NODE_ENV=production --restart always node:18-alpine npm start'
        className="w-full h-28 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button onClick={convert} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Convert to Compose</button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
    </div>
  )
}
