/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration for Next.js 15.5.3
  experimental: {
    // Enable experimental features
  },
  // Configure webpack for compatibility
  webpack: (config, { isServer }) => {
    // Fix for Windows file path issues
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    // Add SVG loader configuration
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    
    return config;
  },
};

export default nextConfig;
