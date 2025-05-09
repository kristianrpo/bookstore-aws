import type { NextConfig } from 'next';
import ROUTES from '@/constants/urls';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/images-book/:path*',
        destination: `${ROUTES.STATIC_SERVER}/images-book/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;

export default nextConfig;
