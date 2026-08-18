'use client'

import dynamic from 'next/dynamic'

const toolComponents: Record<string, React.ComponentType> = {
  'json-formatter': dynamic(() => import('./JsonFormatter')),
  'base64-encode-decode': dynamic(() => import('./Base64')),
  'url-encode-decode': dynamic(() => import('./UrlEncodeDecode')),
  'jwt-decoder': dynamic(() => import('./JwtDecoder')),
  'uuid-generator': dynamic(() => import('./UuidGenerator')),
  'hash-generator': dynamic(() => import('./HashGenerator')),
  'regex-tester': dynamic(() => import('./RegexTester')),
  'unix-timestamp-converter': dynamic(() => import('./UnixTimestamp')),
  'color-converter': dynamic(() => import('./ColorConverter')),
  'lorem-ipsum-generator': dynamic(() => import('./LoremIpsum')),
  'password-generator': dynamic(() => import('./PasswordGenerator')),
  'markdown-preview': dynamic(() => import('./MarkdownPreview')),
  'html-entity-encode-decode': dynamic(() => import('./HtmlEntity')),
  'css-minifier': dynamic(() => import('./CssMinifier')),
  'js-minifier': dynamic(() => import('./JsMinifier')),
  'sql-formatter': dynamic(() => import('./SqlFormatter')),
  'cron-expression-generator': dynamic(() => import('./CronGenerator')),
  'gitignore-generator': dynamic(() => import('./GitignoreGenerator')),
  'diff-checker': dynamic(() => import('./DiffChecker')),
  'json-to-csv': dynamic(() => import('./JsonToCsv')),
  'qr-code-generator': dynamic(() => import('./QrCodeGenerator')),
  'slug-generator': dynamic(() => import('./SlugGenerator')),
  'word-counter': dynamic(() => import('./WordCounter')),
  'text-case-converter': dynamic(() => import('./TextCaseConverter')),
  'json-to-typescript': dynamic(() => import('./JsonToTypescript')),
  'image-to-base64': dynamic(() => import('./ImageToBase64')),
  'tailwind-colors': dynamic(() => import('./TailwindColors')),
  'chmod-calculator': dynamic(() => import('./ChmodCalculator')),
  'yaml-json': dynamic(() => import('./YamlJson')),
  'csv-to-json': dynamic(() => import('./CsvToJson')),
  'number-base-converter': dynamic(() => import('./NumberBaseConverter')),
  'http-status-codes': dynamic(() => import('./HttpStatusCodes')),
  'regex-escape': dynamic(() => import('./RegexEscape')),
  'html-to-markdown': dynamic(() => import('./HtmlToMarkdown')),
  'markdown-to-html': dynamic(() => import('./MarkdownToHtml')),
  'js-object-to-json': dynamic(() => import('./JsObjToJson')),
  'json-path-finder': dynamic(() => import('./JsonPathFinder')),
  'text-diff-word': dynamic(() => import('./TextDiffWord')),
}

export default function ToolRenderer({ slug }: { slug: string }) {
  const Component = toolComponents[slug]
  if (!Component) return <p>Tool not found.</p>
  return <Component />
}
