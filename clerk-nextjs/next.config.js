/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        'organic-space-telegram-6vxj4vrjgq7f49vq-3000.app.github.dev',
        'localhost:3000',
      ],
    },
  },
}

module.exports = nextConfig
