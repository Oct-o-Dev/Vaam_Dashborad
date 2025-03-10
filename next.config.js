/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: true, // Enable Server Actions
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
