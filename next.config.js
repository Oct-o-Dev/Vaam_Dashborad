/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true }, // Required for static export
};

module.exports = nextConfig;