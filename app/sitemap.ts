import type { MetadataRoute } from "next"

import { SITE_URL } from "@/lib/seo"
import { site } from "@/lib/site"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...site.apresentacoes.map((a) => ({ url: new URL(a.arquivo.replace(/^\//, ""), SITE_URL).toString(), lastModified: now, priority: 0.7 })),
    { url: new URL("teaser/", SITE_URL).toString(), lastModified: now, priority: 0.5 },
  ]
}
