/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Prevents "Can't resolve 'encoding'" & "pino-pretty" build warnings
    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      encoding: false,
      'pino-pretty': false,
    };
    return config;
  },
};

module.exports = nextConfig;