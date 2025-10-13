/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
