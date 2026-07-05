/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Real work photos will be added later; keep formats modern for when they are.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
