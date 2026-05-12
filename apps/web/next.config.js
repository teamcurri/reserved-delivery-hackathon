/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow the Express gateway (and any ngrok host) to load /_next/* in dev.
  allowedDevOrigins: ['localhost', '127.0.0.1', '*.ngrok-free.dev', '*.ngrok-free.app'],
  compiler: {
    styledComponents: true,
  },
  transpilePackages: ['@curri/ui', '@hackathon/shared'],
}

module.exports = nextConfig
