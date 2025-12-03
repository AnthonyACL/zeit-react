import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  transpilePackages: ['leaflet', 'react-leaflet'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
  webpack: (config) => {
    config.externals = config.externals || [];
    config.externals.push({
      canvas: 'canvas',
    });
    return config;
  },
};

export default nextConfig;