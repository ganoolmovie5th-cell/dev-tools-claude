import './globals.css'
import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ServiceWorker from '@/components/ServiceWorker'
import CommandPalette from '@/components/CommandPalette'
import KeyboardHelp from '@/components/KeyboardHelp'
import { ToastProvider } from '@/components/Toast'

export const metadata: Metadata = {
  title: 'DevKit — Free Online Developer Tools',
  description: 'Collection of 52+ free online developer tools: JSON formatter, Base64 encoder, UUID generator, regex tester, and more. All tools run client-side.',
  metadataBase: new URL('https://devkit.web.id'),
  openGraph: {
    title: 'DevKit — Free Online Developer Tools',
    description: '52+ free developer tools that run entirely in your browser.',
    url: 'https://devkit.web.id',
    siteName: 'DevKit',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/icon-192.svg" />
        {/* Google Analytics — replace G-XXXXXXXXXX with your Measurement ID */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');`,
          }}
        />
        {/* Vercel Analytics */}
        <script
          defer
          src="/_vercel/insights/script.js"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <ToastProvider>
          <Header />
          <ServiceWorker />
          <CommandPalette />
          <KeyboardHelp />
          <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
            {children}
          </main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  )
}
