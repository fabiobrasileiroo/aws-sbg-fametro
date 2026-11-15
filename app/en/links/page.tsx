import type { Metadata } from "next"
import { LinksView } from "@/components/site/links-view"
import { SITE_URL } from "@/lib/seo"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Official Links • AWS Student Builder Group Fametro",
  description:
    "Official links for AWS Student Builder Group at Fametro: Dec 12 Roundtable RSVP, WhatsApp community, main website and social channels.",
  alternates: {
    canonical: "/en/links/",
    languages: {
      "pt-BR": "/links/",
      en: "/en/links/",
      "x-default": "/links/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["pt_BR"],
    url: "/en/links/",
    siteName: "AWS Student Builder Group Fametro",
    title: "Official Links • AWS Student Builder Group Fametro",
    description:
      "Official links for AWS Student Builder Group at Fametro: Dec 12 Roundtable RSVP, WhatsApp community, main website and social channels.",
    images: [
      {
        url: "/og-links-en.jpg",
        width: 1200,
        height: 630,
        alt: "AWS Student Builder Group Fametro Official Links",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Official Links • AWS Student Builder Group Fametro",
    description:
      "Official links for AWS Student Builder Group at Fametro: Dec 12 Roundtable RSVP, WhatsApp community, main website and social channels.",
    images: ["/og-links-en.jpg"],
  },
}

export default function LinksPage() {
  return <LinksView locale="en" />
}
