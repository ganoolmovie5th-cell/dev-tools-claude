# DevKit

Koleksi 79+ developer tools gratis yang berjalan sepenuhnya di browser. Tidak ada data yang dikirim ke server, tanpa signup, tanpa tracking.

**Tech Stack:** Next.js 14 · TypeScript · Tailwind CSS · Vercel

**Live:** [devkit.web.id](https://www.devkit.web.id)

## Features

- 79+ tools (formatters, encoders, generators, converters, testers, calculators)
- Privacy-first (semua proses client-side)
- Dark mode + custom accent color
- PWA (installable, works offline)
- Command palette (Ctrl+K)
- Favorites & history
- Keyboard shortcuts
- Multi-tab workspace
- Share links via URL parameters
- Tool ratings

## Tool Categories

- Formatters & Minifiers (JSON, SQL, XML, CSS, JS, HTML, Markdown)
- Encoders & Decoders (Base64, URL, HTML Entity, JWT, Image to Base64)
- Generators (UUID, Password, QR Code, Cron, .gitignore, Favicon, Barcode)
- Converters (Unix Timestamp, Color, JSON/CSV, YAML, TypeScript, Tailwind)
- Testers & Validators (Regex, Diff, JSON Path/Schema, Word Counter)
- Calculators (Chmod, IP Subnet, HTTP Status, Epoch)
- Security (Hash Generator, Bcrypt)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/
    page.tsx          → Homepage (tool grid + search)
    tools/            → Individual tool pages
    blog/             → Blog articles
    cheatsheets/      → Cheat sheets
    compare/          → Tool comparisons
  components/         → Reusable UI components
  tools/              → 79+ tool implementations
  lib/                → Utilities
```

## License

MIT
