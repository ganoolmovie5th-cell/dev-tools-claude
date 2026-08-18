'use client'

import { useState, useRef } from 'react'
import CopyButton from '@/components/CopyButton'

export default function ImageToBase64() {
  const [output, setOutput] = useState('')
  const [preview, setPreview] = useState('')
  const [fileName, setFileName] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setOutput(result)
      setPreview(result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-4">
      <div
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
      >
        <p className="text-gray-500 dark:text-gray-400">Click to select an image or drag and drop</p>
        {fileName && <p className="mt-2 text-sm text-blue-600">{fileName}</p>}
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      </div>
      {preview && (
        <div className="flex justify-center">
          <img src={preview} alt="Preview" className="max-h-48 rounded border border-gray-200 dark:border-gray-700" />
        </div>
      )}
      {output && (
        <div className="relative">
          <textarea
            readOnly
            value={output}
            className="w-full h-36 p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs"
          />
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
    </div>
  )
}
