# DevKit — 79+ Free Online Developer Tools

A collection of 79+ developer tools that run entirely in your browser. No data sent to any server, no signup required, no tracking.

**Live:** [devkit.web.id](https://www.devkit.web.id)

## Tools

### Formatters & Minifiers
JSON Formatter · SQL Formatter · XML Formatter · CSS Minifier · JavaScript Minifier · HTML Minifier · JavaScript Beautifier · Markdown Preview

### Encoders & Decoders
Base64 · URL Encode/Decode · HTML Entity · JWT Decoder · JWT Generator · JWT Expiry Checker · Image to Base64 · Text to Binary

### Generators
UUID · Password · Lorem Ipsum · QR Code · Cron Expression · .gitignore · Favicon · Placeholder Image · Barcode · Meta Tag · Color Palette · Markdown Table · Markdown TOC · ASCII Art · Robots.txt · CSP Header · Nginx Config · Box Shadow CSS · Gradient CSS

### Converters
Unix Timestamp · Color (HEX/RGB/HSL) · JSON to CSV · CSV to JSON · JSON to TypeScript · YAML to JSON · TOML to JSON · HTML to Markdown · Markdown to HTML · JS Object to JSON · Number Base · Text Case · Slug · .env to JSON · Tailwind to CSS · SVG to CSS · Docker Run to Compose · SQL to MongoDB · cURL to Code

### Testers & Validators
Regex Tester · Regex Escape · Diff Checker · Word-Level Diff · JSON Path Finder · JSON Schema Validator · JSON Tree Viewer · Word Counter · User Agent Parser · Typing Speed Test · Open Graph Preview · SSL Checker · DNS Lookup

### Calculators & Reference
Chmod Calculator · IP Subnet Calculator · HTTP Status Codes · Tailwind CSS Colors · Epoch Countdown · IP Address Info

### Productivity
Pomodoro Timer · Code to Image · Flexbox Generator · Border Radius Visualizer

### Security
Hash Generator (SHA-1/256/512) · Bcrypt Generator

## Features

- **Privacy-first** — all processing happens client-side. Your data never leaves your device.
- **Dark mode** — toggle + custom accent color picker
- **PWA** — installable, works offline
- **Command palette** — press `Ctrl+K` to search tools instantly
- **Favorites & history** — star tools, track recent usage, output history per tool
- **Keyboard shortcuts** — press `?` to see all shortcuts
- **Multi-tab workspace** — use multiple tools side by side
- **Share links** — share tool state via URL parameters
- **Embed widget** — embed any tool as an iframe on your site
- **Tool ratings** — rate tools to help prioritize improvements

## Content

- 6 blog posts (JSON, Regex, Encoding, JWT, Docker, CSS)
- 7 comparison articles (JSON vs YAML, REST vs GraphQL, etc.)
- 3 cheat sheets (Regex, Cron, Git)
- 79 auto-generated how-to guides
- 6 curated tool bundles (Frontend, API, DevOps, Security, SEO, Data)

## Tech Stack

- **Framework:** Next.js 14 (App Router, static export)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel (static)
- **Analytics:** Google Tag Manager + GA4 + Vercel Analytics
- **Monetization:** Google AdSense

## Getting Started

```bash
git clone https://github.com/ganoolmovie5th-cell/devkit-claude.git
cd devkit-claude
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contributing

See [Contributing Guide](https://www.devkit.web.id/contribute/) for instructions on adding new tools.

**Quick version:**
1. Create component in `src/tools/YourTool.tsx`
2. Add entry to `src/tools/registry.ts`
3. Add dynamic import to `src/tools/ToolRenderer.tsx`
4. Run `npm run dev` and test at `/tools/your-tool`

## License

MIT
