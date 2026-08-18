# Dev Tools Site — Design Spec

## Overview

Static developer tools website targeting AdSense revenue. 22 client-side tools, each on its own page, optimized for SEO with high-CPC developer keywords.

## Architecture

- **Framework**: Next.js 14 (App Router, static export)
- **Styling**: Tailwind CSS — clean light theme
- **Deploy**: GitHub Pages via static export
- **Backend**: None. All tools run client-side.
- **Repo**: github.com/ganoolmovie5th-cell/dev-tools-claude (branch: main)

## Pages

```
/                     → Homepage: tool grid + search/filter
/tools/[slug]         → Individual tool pages (22 total)
/about                → Site identity (AdSense requirement)
/privacy-policy       → Privacy policy (AdSense requirement)
```

## Tool List (22 tools)

| # | Slug | Tool Name | Target Keyword |
|---|------|-----------|----------------|
| 1 | json-formatter | JSON Formatter & Validator | json formatter online |
| 2 | base64-encode-decode | Base64 Encode/Decode | base64 decode |
| 3 | url-encode-decode | URL Encode/Decode | url encoder |
| 4 | jwt-decoder | JWT Decoder | jwt decode online |
| 5 | uuid-generator | UUID Generator | uuid generator |
| 6 | hash-generator | Hash Generator (MD5/SHA256) | sha256 hash generator |
| 7 | regex-tester | Regex Tester | regex tester |
| 8 | unix-timestamp-converter | Unix Timestamp Converter | unix timestamp converter |
| 9 | color-converter | Color Converter (HEX/RGB/HSL) | hex to rgb |
| 10 | lorem-ipsum-generator | Lorem Ipsum Generator | lorem ipsum generator |
| 11 | password-generator | Password Generator | password generator |
| 12 | markdown-preview | Markdown Preview | markdown preview online |
| 13 | html-entity-encode-decode | HTML Entity Encode/Decode | html entity decoder |
| 14 | css-minifier | CSS Minifier | css minifier |
| 15 | js-minifier | JavaScript Minifier | js minifier online |
| 16 | sql-formatter | SQL Formatter | sql formatter |
| 17 | cron-expression-generator | Cron Expression Generator | cron expression generator |
| 18 | gitignore-generator | .gitignore Generator | gitignore generator |
| 19 | diff-checker | Diff Checker | diff checker online |
| 20 | json-to-csv | JSON to CSV Converter | json to csv |
| 21 | qr-code-generator | QR Code Generator | qr code generator |
| 22 | slug-generator | Slug Generator | slug generator |

## Design System

- **Style**: Clean light — white background, subtle gray borders, blue accent
- **Typography**: Inter (body), JetBrains Mono (code/inputs)
- **Layout**: Max-width 1200px centered, responsive
- **Tool page layout**: Title + description → input area → output area → copy button
- **Homepage**: Search bar + category filter + grid of tool cards

## AdSense Integration

- Leaderboard (728x90) below header on all pages
- In-content rectangle (336x280) on tool pages, between description and tool
- Responsive ad units for mobile

## SEO Strategy

- Unique `<title>` per tool: "[Tool Name] — Free Online [Category] Tool | DevToolkit"
- Meta description: action-oriented, includes keyword
- Canonical URLs
- JSON-LD: WebApplication schema per tool
- Auto-generated sitemap.xml
- robots.txt allowing all crawlers

## Dependencies (minimal)

- next, react, react-dom
- tailwindcss, postcss, autoprefixer
- marked (markdown preview)
- qrcode (QR generation)
- diff (diff checker)

All other tools use built-in browser APIs (TextEncoder, crypto.subtle, URL, etc).

## Folder Structure

```
src/
  app/
    layout.tsx          → root layout + fonts + AdSense script
    page.tsx            → homepage
    about/page.tsx
    privacy-policy/page.tsx
    tools/
      [slug]/page.tsx   → dynamic tool page
  components/
    Header.tsx
    Footer.tsx
    ToolCard.tsx
    AdSlot.tsx
    SearchBar.tsx
    CopyButton.tsx
  tools/
    registry.ts         → tool metadata array
    json-formatter.tsx
    base64.tsx
    ... (one component per tool)
  lib/
    seo.ts              → metadata generators
```

## Success Criteria

1. All 22 tools functional client-side
2. Static export builds without errors
3. Deploys to GitHub Pages
4. Each page has unique SEO metadata
5. AdSense script placeholder ready
6. Lighthouse score >90 (performance)
7. Mobile responsive
