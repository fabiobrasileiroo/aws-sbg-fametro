import type { MetadataRoute } from "next"

import { SITE_URL } from "@/lib/seo"
import { site } from "@/lib/site"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    // as duas versões da página inicial, cada uma apontando para a outra (hreflang)
    ...(["/", "/en/"] as const).map((path) => ({
      url: new URL(path.slice(1), SITE_URL).toString(),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 1,
      alternates: { languages: { "pt-BR": SITE_URL, en: new URL("en/", SITE_URL).toString() } },
    })),
    ...site.apresentacoes.map((a) => ({ url: new URL(a.arquivo.replace(/^\//, ""), SITE_URL).toString(), lastModified: now, priority: 0.7 })),
    { url: new URL("teaser/", SITE_URL).toString(), lastModified: now, priority: 0.5 },
  ]
}
