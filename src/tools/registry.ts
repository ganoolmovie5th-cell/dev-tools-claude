export interface ToolMeta {
  slug: string
  name: string
  description: string
  category: string
  keywords: string[]
}

export const tools: ToolMeta[] = [
  { slug: 'json-formatter', name: 'JSON Formatter & Validator', description: 'Format, validate, and beautify JSON data with syntax highlighting.', category: 'Formatter', keywords: ['json formatter online', 'json validator', 'json beautifier'] },
  { slug: 'base64-encode-decode', name: 'Base64 Encode/Decode', description: 'Encode text to Base64 or decode Base64 back to plain text.', category: 'Encoder', keywords: ['base64 decode', 'base64 encode online'] },
  { slug: 'url-encode-decode', name: 'URL Encode/Decode', description: 'Encode or decode URL components for safe transmission.', category: 'Encoder', keywords: ['url encoder', 'url decode online'] },
  { slug: 'jwt-decoder', name: 'JWT Decoder', description: 'Decode and inspect JSON Web Token header and payload.', category: 'Decoder', keywords: ['jwt decode online', 'jwt parser'] },
  { slug: 'uuid-generator', name: 'UUID Generator', description: 'Generate random UUID v4 identifiers instantly.', category: 'Generator', keywords: ['uuid generator', 'guid generator'] },
  { slug: 'hash-generator', name: 'Hash Generator', description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from text.', category: 'Crypto', keywords: ['sha256 hash generator', 'md5 generator'] },
  { slug: 'regex-tester', name: 'Regex Tester', description: 'Test regular expressions against sample text with match highlighting.', category: 'Tester', keywords: ['regex tester', 'regex101 alternative'] },
  { slug: 'unix-timestamp-converter', name: 'Unix Timestamp Converter', description: 'Convert Unix timestamps to human-readable dates and vice versa.', category: 'Converter', keywords: ['unix timestamp converter', 'epoch converter'] },
  { slug: 'color-converter', name: 'Color Converter', description: 'Convert colors between HEX, RGB, and HSL formats.', category: 'Converter', keywords: ['hex to rgb', 'color converter'] },
  { slug: 'lorem-ipsum-generator', name: 'Lorem Ipsum Generator', description: 'Generate placeholder text in paragraphs, sentences, or words.', category: 'Generator', keywords: ['lorem ipsum generator', 'dummy text generator'] },
  { slug: 'password-generator', name: 'Password Generator', description: 'Generate secure random passwords with customizable length and characters.', category: 'Generator', keywords: ['password generator', 'random password'] },
  { slug: 'markdown-preview', name: 'Markdown Preview', description: 'Write Markdown and see a live rendered preview side by side.', category: 'Formatter', keywords: ['markdown preview online', 'markdown editor'] },
  { slug: 'html-entity-encode-decode', name: 'HTML Entity Encode/Decode', description: 'Encode special characters to HTML entities or decode them back.', category: 'Encoder', keywords: ['html entity decoder', 'html encode'] },
  { slug: 'css-minifier', name: 'CSS Minifier', description: 'Minify CSS code by removing whitespace and comments.', category: 'Minifier', keywords: ['css minifier', 'css compressor'] },
  { slug: 'js-minifier', name: 'JavaScript Minifier', description: 'Minify JavaScript code by removing whitespace and shortening syntax.', category: 'Minifier', keywords: ['js minifier online', 'javascript compressor'] },
  { slug: 'sql-formatter', name: 'SQL Formatter', description: 'Format and beautify SQL queries for better readability.', category: 'Formatter', keywords: ['sql formatter', 'sql beautifier'] },
  { slug: 'cron-expression-generator', name: 'Cron Expression Generator', description: 'Build cron expressions visually with a human-readable preview.', category: 'Generator', keywords: ['cron expression generator', 'crontab guru'] },
  { slug: 'gitignore-generator', name: '.gitignore Generator', description: 'Generate .gitignore files for popular languages and frameworks.', category: 'Generator', keywords: ['gitignore generator', 'gitignore template'] },
  { slug: 'diff-checker', name: 'Diff Checker', description: 'Compare two texts and see the differences highlighted line by line.', category: 'Tester', keywords: ['diff checker online', 'text compare'] },
  { slug: 'json-to-csv', name: 'JSON to CSV Converter', description: 'Convert JSON arrays to CSV format for spreadsheet use.', category: 'Converter', keywords: ['json to csv', 'json csv converter'] },
  { slug: 'qr-code-generator', name: 'QR Code Generator', description: 'Generate QR codes from any text or URL instantly.', category: 'Generator', keywords: ['qr code generator', 'free qr code'] },
  { slug: 'slug-generator', name: 'Slug Generator', description: 'Convert text to URL-friendly slugs for SEO-friendly URLs.', category: 'Generator', keywords: ['slug generator', 'url slug converter'] },
  { slug: 'word-counter', name: 'Word Counter', description: 'Count words, characters, sentences, paragraphs, and estimate reading time.', category: 'Tester', keywords: ['word counter online', 'character counter'] },
  { slug: 'text-case-converter', name: 'Text Case Converter', description: 'Convert text between camelCase, snake_case, kebab-case, PascalCase, and more.', category: 'Converter', keywords: ['text case converter', 'camelcase converter'] },
  { slug: 'json-to-typescript', name: 'JSON to TypeScript', description: 'Generate TypeScript interfaces from JSON data automatically.', category: 'Generator', keywords: ['json to typescript', 'json to interface'] },
  { slug: 'image-to-base64', name: 'Image to Base64', description: 'Convert images to Base64 data URI strings for embedding in code.', category: 'Converter', keywords: ['image to base64', 'image encoder'] },
  { slug: 'tailwind-colors', name: 'Tailwind CSS Colors', description: 'Browse and copy all Tailwind CSS color palette values.', category: 'Reference', keywords: ['tailwind colors', 'tailwind color palette'] },
  { slug: 'chmod-calculator', name: 'Chmod Calculator', description: 'Calculate Unix file permissions in octal and symbolic notation.', category: 'Calculator', keywords: ['chmod calculator', 'permission calculator'] },
]

export function getToolBySlug(slug: string): ToolMeta | undefined {
  return tools.find(t => t.slug === slug)
}
