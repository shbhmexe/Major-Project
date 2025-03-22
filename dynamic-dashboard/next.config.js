/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Add this for static exports
  trailingSlash: true, // Makes routing cleaner for static exports
  images: {
    unoptimized: true, // Required for static export
  },
  // Disable specific features not supported in static exports if needed
};

module.exports = nextConfig; 