import type { Metadata } from "next"

import { type Locale, dictionaries, homePath, htmlLang, locales } from "@/lib/i18n"

/** Endereço público do site (domínio próprio, com https via Cloudflare). */
export const SITE_URL = "https://fabiobrasileiro.me/aws-sbg-fametro/"

/** Metadados de cada idioma: título, descrição, card de compartilhamento e links hreflang entre as versões. */
export function buildMetadata(locale: Locale): Metadata {
  const t = dictionaries[locale].meta
  const og = locale === "en" ? "/og-en.jpg" : "/og.jpg"
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.title, template: `%s | ${t.title}` },
    description: t.description,
    applicationName: t.title,
    keywords: locale === "en"
      ? ["AWS", "AWS Student Builder Group", "Fametro", "Manaus", "Brazil", "cloud computing", "artificial intelligence",
        "AWS certification", "tech community", "Amazonas", "students"]
      : ["AWS", "AWS Student Builder Group", "Fametro", "Manaus", "computação em nuvem", "inteligência artificial",
        "certificação AWS", "comunidade de tecnologia", "Amazonas", "estudantes"],
    authors: [{ name: "Fábio Henrique Mendes Brasileiro", url: "https://www.linkedin.com/in/fabiobrasileiro/" }],
    alternates: {
      canonical: homePath[locale],
      languages: { ...Object.fromEntries(locales.map((l) => [htmlLang[l], homePath[l]])), "x-default": homePath.pt },
    },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: t.ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => dictionaries[l].meta.ogLocale),
      url: homePath[locale],
      siteName: t.title,
      title: t.title,
      description: t.description,
      images: [{ url: og, width: 1200, height: 630, alt: t.ogAlt }],
    },
    twitter: { card: "summary_large_image", title: t.title, description: t.description, images: [og] },
  }
}
