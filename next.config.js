/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["upload.wikimedia.org", "fakestoreapi.com"],
  },
};

module.exports = nextConfig;
