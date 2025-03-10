/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: false, // Disable Server Actions
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;