/** @type {import('next').NextConfig} */
const nextConfig = {
  // Improve Fast Refresh reliability
  reactStrictMode: true,

  // Webpack configuration for better dev server stability
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Improve file watching reliability
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },

  // Experimental features for better hot reload
  experimental: {
    // Turbopack is more stable for hot reloading (optional, can be enabled with --turbo flag)
  },
}

module.exports = nextConfig