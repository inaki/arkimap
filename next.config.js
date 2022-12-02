/** @type {import('next').NextConfig} */
const { withSuperjson } = require("next-superjson");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    mapboxglAccessToken: process.env.MAPBOXGL_ACCESS_TOKEN,
  },
};

module.exports = withSuperjson()(nextConfig);
