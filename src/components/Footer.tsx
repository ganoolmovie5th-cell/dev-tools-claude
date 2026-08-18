import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-12 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>&copy; {new Date().getFullYear()} DevKit. All tools run client-side.</p>
        <div className="flex gap-4">
          <Link href="/pro" className="hover:text-gray-700 dark:hover:text-gray-200">Pro</Link>
          <Link href="/resources" className="hover:text-gray-700 dark:hover:text-gray-200">Resources</Link>
          <Link href="/privacy-policy" className="hover:text-gray-700 dark:hover:text-gray-200">Privacy Policy</Link>
          <Link href="/about" className="hover:text-gray-700 dark:hover:text-gray-200">About</Link>
        </div>
      </div>
    </footer>
  )
}
