/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pure static site
  output: "export",
  images: { unoptimized: true },
  trailingSlash: false,
};

export default nextConfig;
