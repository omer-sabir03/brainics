/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pure static site: `npm run build` writes plain HTML/CSS/JS to the `out/` folder.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
