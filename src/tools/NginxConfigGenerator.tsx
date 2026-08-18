'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

export default function NginxConfigGenerator() {
  const [domain, setDomain] = useState('example.com')
  const [port, setPort] = useState('3000')
  const [ssl, setSsl] = useState(true)
  const [www, setWww] = useState(true)
  const [gzip, setGzip] = useState(true)
  const [cacheStatic, setCacheStatic] = useState(true)

  let config = ''

  if (www) {
    config += `server {\n    listen 80;\n    server_name www.${domain};\n    return 301 https://${domain}$request_uri;\n}\n\n`
  }

  if (ssl) {
    config += `server {\n    listen 80;\n    server_name ${domain};\n    return 301 https://$host$request_uri;\n}\n\n`
    config += `server {\n    listen 443 ssl http2;\n    server_name ${domain};\n\n`
    config += `    ssl_certificate /etc/letsencrypt/live/${domain}/fullchain.pem;\n`
    config += `    ssl_certificate_key /etc/letsencrypt/live/${domain}/privkey.pem;\n`
    config += `    ssl_protocols TLSv1.2 TLSv1.3;\n`
    config += `    ssl_ciphers HIGH:!aNULL:!MD5;\n\n`
  } else {
    config += `server {\n    listen 80;\n    server_name ${domain};\n\n`
  }

  if (gzip) {
    config += `    gzip on;\n    gzip_types text/plain text/css application/json application/javascript text/xml;\n    gzip_min_length 256;\n\n`
  }

  if (cacheStatic) {
    config += `    location ~* \\.(jpg|jpeg|png|gif|ico|css|js|woff2?)$ {\n        expires 30d;\n        add_header Cache-Control "public, immutable";\n    }\n\n`
  }

  config += `    location / {\n        proxy_pass http://127.0.0.1:${port};\n        proxy_http_version 1.1;\n        proxy_set_header Upgrade $http_upgrade;\n        proxy_set_header Connection "upgrade";\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n        proxy_set_header X-Forwarded-Proto $scheme;\n    }\n}\n`

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div><label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Domain</label><input type="text" value={domain} onChange={e => setDomain(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg" /></div>
        <div><label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Backend Port</label><input type="text" value={port} onChange={e => setPort(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg" /></div>
        <div className="flex flex-col gap-1 pt-5">
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={ssl} onChange={e => setSsl(e.target.checked)} className="w-4 h-4" /> SSL (Let's Encrypt)</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={www} onChange={e => setWww(e.target.checked)} className="w-4 h-4" /> Redirect www</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={gzip} onChange={e => setGzip(e.target.checked)} className="w-4 h-4" /> Gzip</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={cacheStatic} onChange={e => setCacheStatic(e.target.checked)} className="w-4 h-4" /> Cache static</label>
        </div>
      </div>
      <div className="relative">
        <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 text-xs whitespace-pre-wrap">{config}</pre>
        <div className="absolute top-2 right-2"><CopyButton text={config} /></div>
      </div>
    </div>
  )
}
