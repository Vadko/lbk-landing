import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.lbklauncher.com",
      },
    ],
  },
  async redirects() {
    return [
      // Приклад: якщо URL гри змінився
      // {
      //   source: '/games/old-url',
      //   destination: '/games/new-url',
      //   permanent: true,
      // },
      // Приклад: якщо змінилася назва команди
      // {
      //   source: '/games/:slug/old-team-slug',
      //   destination: '/games/:slug/new-team-slug',
      //   permanent: true,
      // },
    ];
  },
};

export default nextConfig;
