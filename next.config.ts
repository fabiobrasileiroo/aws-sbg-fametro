import type { NextConfig } from "next"

// No GitHub Pages o site fica em /aws-sbg-fametro; localmente (npm run dev) fica na raiz.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  // 404 único para os dois idiomas (cada idioma tem o próprio layout raiz)
  experimental: { globalNotFound: true },
  images: { unoptimized: true },
}

export default nextConfig
