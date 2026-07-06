/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Real work photos will be added later; keep formats modern for when they are.
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // v2 route renames — preserve old URLs.
    return [
      { source: "/request-a-quote", destination: "/quote", permanent: true },
      { source: "/our-standard", destination: "/standard", permanent: true },
    ];
  },
};

export default nextConfig;
