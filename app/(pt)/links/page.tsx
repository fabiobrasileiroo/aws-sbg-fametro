import type { Metadata } from "next"
import { LinksView } from "@/components/site/links-view"
import { SITE_URL } from "@/lib/seo"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Links Úteis • AWS Student Builder Group Fametro",
  description:
    "Acesse os links oficiais do AWS Student Builder Group da Fametro: Roda de Conversa de 12/12, comunidade no WhatsApp, site oficial e redes sociais.",
  alternates: {
    canonical: "/links/",
    languages: {
      "pt-BR": "/links/",
      en: "/en/links/",
      "x-default": "/links/",
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    alternateLocale: ["en_US"],
    url: "/links/",
    siteName: "AWS Student Builder Group Fametro",
    title: "Central de Links • AWS Student Builder Group Fametro",
    description:
      "Acesse os links oficiais do AWS Student Builder Group da Fametro: Roda de Conversa de 12/12, comunidade no WhatsApp, site oficial e redes sociais.",
    images: [
      {
        url: "/og-links.jpg",
        width: 1200,
        height: 630,
        alt: "Central de Links do AWS Student Builder Group da Fametro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Central de Links • AWS Student Builder Group Fametro",
    description:
      "Acesse os links oficiais do AWS Student Builder Group da Fametro: Roda de Conversa de 12/12, comunidade no WhatsApp, site oficial e redes sociais.",
    images: ["/og-links.jpg"],
  },
}

export default function LinksPage() {
  return <LinksView locale="pt" />
}
