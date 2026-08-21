import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "shoponbot.s3.amazonaws.com",
            },
        ],
    },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost/api/:path*'
      }
    ]
  }
};

export default nextConfig;
