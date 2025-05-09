import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/images-book/:path*',
        destination: `http://localhost:4000/images-book/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;

export default nextConfig;
