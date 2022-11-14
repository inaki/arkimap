/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    mapboxglAccessToken: process.env.MAPBOXGL_ACCESS_TOKEN,
  },
};

module.exports = nextConfig;
