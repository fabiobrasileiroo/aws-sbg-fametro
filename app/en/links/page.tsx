import type { Metadata } from "next"
import { LinksView } from "@/components/site/links-view"

export const metadata: Metadata = {
  title: "Official Links • AWS Student Builder Group Fametro",
  description:
    "Official links for AWS Student Builder Group at Fametro: Dec 12 Meetup RSVP, WhatsApp community, main website and social channels.",
  alternates: {
    canonical: "/en/links/",
    languages: {
      "pt-BR": "/links/",
      en: "/en/links/",
      "x-default": "/links/",
    },
  },
}

export default function LinksPage() {
  return <LinksView locale="en" />
}
