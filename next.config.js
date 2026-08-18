/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/dev-tools-claude',
  trailingSlash: true,
}

module.exports = nextConfig
