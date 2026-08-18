'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

const TEMPLATES: Record<string, string> = {
  'Node.js': 'node_modules/\ndist/\n.env\n.env.local\n*.log\nnpm-debug.log*\n.DS_Store',
  'Python': '__pycache__/\n*.py[cod]\n*$py.class\n*.so\n.Python\nvenv/\n.env\n*.egg-info/\ndist/\nbuild/',
  'Java': '*.class\n*.jar\n*.war\ntarget/\n.idea/\n*.iml\n.gradle/\nbuild/',
  'Go': '*.exe\n*.exe~\n*.dll\n*.so\n*.dylib\n*.test\n*.out\nvendor/',
  'Rust': '/target\nCargo.lock\n**/*.rs.bk',
  'React': 'node_modules/\nbuild/\n.env.local\n.env.development.local\n.env.test.local\n.env.production.local\nnpm-debug.log*\n.DS_Store',
  'Next.js': 'node_modules/\n.next/\nout/\n.env*.local\nnpm-debug.log*\n.DS_Store\n*.tsbuildinfo\nnext-env.d.ts',
  'Laravel': '/vendor\n/node_modules\n.env\n.env.backup\nstorage/*.key\n/public/hot\n/public/storage\n/storage/*.key',
  'Unity': '/[Ll]ibrary/\n/[Tt]emp/\n/[Oo]bj/\n/[Bb]uild/\n/[Bb]uilds/\n*.csproj\n*.unityproj\n*.sln',
  'macOS': '.DS_Store\n.AppleDouble\n.LSOverride\n._*\n.Spotlight-V100\n.Trashes',
}

export default function GitignoreGenerator() {
  const [selected, setSelected] = useState<string[]>([])
  const output = selected.map(s => `# ${s}\n${TEMPLATES[s]}`).join('\n\n')

  const toggle = (name: string) => {
    setSelected(prev => prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name])
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {Object.keys(TEMPLATES).map(name => (
          <button
            key={name}
            onClick={() => toggle(name)}
            className={`px-3 py-1.5 text-sm rounded border ${selected.includes(name) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'}`}
          >
            {name}
          </button>
        ))}
      </div>
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 border border-gray-200 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
    </div>
  )
}
