import type { Metadata } from "next"
import { LinksView } from "@/components/site/links-view"

export const metadata: Metadata = {
  title: "Links Úteis • AWS Student Builder Group Fametro",
  description:
    "Acesse os links oficiais do AWS Student Builder Group da Fametro: Meetup do encontro de 12/12, grupo de WhatsApp, site e redes sociais.",
  alternates: {
    canonical: "/links/",
    languages: {
      "pt-BR": "/links/",
      en: "/en/links/",
      "x-default": "/links/",
    },
  },
}

export default function LinksPage() {
  return <LinksView locale="pt" />
}
