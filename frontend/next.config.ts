import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Disable error overlay in development
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Completely disable the error overlay
      config.devServer = {
        ...config.devServer,
        client: {
          overlay: false,
        },
      };

      // Optional: Disable source maps for faster builds
      // config.devtool = false;
    }
    return config;
  },

  // Disable React Strict Mode if it's causing issues
  reactStrictMode: false,

  // Experimental features for better error handling
  experimental: {
    // Other experimental features can go here
  },

  // Custom error handling
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
};

export default nextConfig;
