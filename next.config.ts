import type { NextConfig } from "next"

// No GitHub Pages o site fica em /aws-sbg-fametro; localmente (npm run dev) fica na raiz.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
}

export default nextConfig
