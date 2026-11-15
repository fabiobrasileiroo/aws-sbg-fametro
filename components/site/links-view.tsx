/* eslint-disable @next/next/no-img-element -- export estático para o GitHub Pages: imagens servidas direto de public/ */
import {
  ArrowSquareOutIcon,
  CalendarDotsIcon,
  DeviceMobileIcon,
  HouseIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/ssr"

import { site, asset } from "@/lib/site"
import { type Locale } from "@/lib/i18n"
import { Badge } from "@/components/ui/badge"

interface LinksViewProps {
  locale: Locale
}

export function LinksView({ locale }: LinksViewProps) {
  const isEn = locale === "en"

  const links = [
    {
      title: isEn
        ? "Online Roundtable: Cloud & AWS Certifications"
        : "Mesa Redonda: Nuvem & Certificações AWS",
      subtitle: isEn
        ? "Dec 12 (Afternoon) • Featuring Guga na Nuvem & Josilene Silva"
        : "12 de Dezembro (Tarde) • Com Guga na Nuvem & Josilene Silva",
      url: ("encontroOnline" in site && site.encontroOnline?.meetup_url) ? site.encontroOnline.meetup_url : site.meetup,
      badge: isEn ? "Next Event • Dec 12" : "Próximo Evento • 12/Dez",
      icon: CalendarDotsIcon,
      highlight: true,
      external: true,
    },
    {
      title: isEn ? "WhatsApp Community Group" : "Comunidade no WhatsApp",
      subtitle: isEn
        ? "Study group, tech alerts and networking in Manaus"
        : "Grupo de estudos, avisos de eventos e networking em Manaus",
      url: "https://chat.whatsapp.com/L14sMtFXz0s3SCDAOQinQd",
      badge: isEn ? "Community" : "Comunidade",
      icon: WhatsappLogoIcon,
      highlight: false,
      external: true,
    },
    {
      title: isEn ? "Official Group Website" : "Site Oficial do Grupo",
      subtitle: isEn
        ? "Explore interactive decks, certifications path & team"
        : "Conheça o grupo, trilha de certificações e parceiros",
      url: asset(isEn ? "/en/" : "/"),
      badge: isEn ? "Portal" : "Portal",
      icon: HouseIcon,
      highlight: false,
      external: false,
    },
    {
      title: isEn ? "Interactive Slides (Dec 12)" : "Slides Interativos (12/12)",
      subtitle: isEn
        ? "Interactive presentation with mobile remote control"
        : "Apresentação oficial com controle interativo pelo celular",
      url: asset("/slides/apresentacao_encontro_12_dezembro.html"),
      badge: isEn ? "Slides" : "Slides",
      icon: DeviceMobileIcon,
      highlight: false,
      external: false,
    },
    {
      title: isEn ? "LinkedIn • Fábio Brasileiro" : "LinkedIn • Fábio Brasileiro",
      subtitle: isEn
        ? "AWS Student Builder Group Leader • Connect & Network"
        : "Líder do AWS Student Builder Group • Conexões e artigos",
      url: "https://www.linkedin.com/in/fabiobrasileiro/",
      badge: "LinkedIn",
      icon: LinkedinLogoIcon,
      highlight: false,
      external: true,
    },
    {
      title: isEn ? "Instagram • @fabiobrasileiroo" : "Instagram • @fabiobrasileiroo",
      subtitle: isEn
        ? "Updates, backstage & student community tech events"
        : "Bastidores, tecnologia e novidades da comunidade",
      url: "https://www.instagram.com/fabiobrasileiroo/",
      badge: "Instagram",
      icon: InstagramLogoIcon,
      highlight: false,
      external: true,
    },
    {
      title: isEn ? "In-Person Venue: CEI Senac Chapada" : "Local Presencial: CEI Senac Chapada",
      subtitle: isEn
        ? "Senac Amazonas Computing Center (Upcoming Meetup)"
        : "Centro de Informática do Senac Amazonas (Próximo Presencial)",
      url: "https://am.senac.br/curso-unidade/senac-chapada/",
      badge: isEn ? "Partner" : "Parceiro",
      icon: ArrowSquareOutIcon,
      highlight: false,
      external: true,
    },
  ]

  return (
    <div className="relative min-h-screen w-full bg-pixel-grid bg-background px-4 py-12 text-foreground sm:py-16">
      {/* Luz ambiente de fundo */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-radial from-aws-orange/10 via-background/80 to-background"
      />

      <main className="relative z-10 mx-auto flex max-w-lg flex-col items-center">
        {/* Header do perfil */}
        <header className="mb-8 flex flex-col items-center text-center">
          <div className="relative mb-4 size-24 overflow-hidden rounded-2xl border-2 border-aws-orange/40 bg-card shadow-lg shadow-aws-orange/10 transition-transform duration-300 hover:scale-105">
            <img
              src={asset("/img/pessoas/fabio-brasileiro.jpg")}
              alt="Fábio Brasileiro"
              className="size-full object-cover"
            />
          </div>

          <div className="mb-2 flex items-center gap-2">
            <Badge variant="outline" className="border-aws-orange/60 font-mono text-xs text-aws-orange">
              AWS Student Builder Group
            </Badge>
            <Badge variant="secondary" className="font-mono text-xs">
              Fametro • Manaus
            </Badge>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Fábio Brasileiro
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {isEn
              ? "AWS Student Builder Group Leader • Software Engineering @ Fametro"
              : "AWS Student Builder Group Leader • Engenharia de Software @ Fametro"}
          </p>

          <p className="mt-2 max-w-sm text-xs text-muted-foreground/80">
            {isEn
              ? "Connecting students, cloud certifications and the Amazonas tech community."
              : "Conectando estudantes, certificações em nuvem e a comunidade tech do Amazonas."}
          </p>
        </header>

        {/* Lista de Links */}
        <nav aria-label="Links úteis" className="flex w-full flex-col gap-3.5">
          {links.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.title}
                href={item.url}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className={`group relative flex items-center justify-between gap-4 rounded-xl border p-4 transition-all duration-300 ${
                  item.highlight
                    ? "border-aws-orange bg-aws-orange/10 shadow-lg shadow-aws-orange/20 hover:scale-[1.02] hover:bg-aws-orange/15"
                    : "border-border bg-card/80 backdrop-blur-sm hover:scale-[1.01] hover:border-aws-orange/50 hover:bg-card"
                }`}
              >
                {/* Indicador pulsante se for destaque */}
                {item.highlight && (
                  <span
                    aria-hidden="true"
                    className="absolute -top-1.5 -right-1.5 flex size-3.5 items-center justify-center"
                  >
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-aws-orange opacity-75" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-aws-orange" />
                  </span>
                )}

                <div className="flex items-center gap-3.5">
                  <div
                    className={`flex size-11 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                      item.highlight
                        ? "border-aws-orange/40 bg-aws-orange/20 text-aws-orange"
                        : "border-border bg-muted/50 text-foreground group-hover:border-aws-orange/40 group-hover:text-aws-orange"
                    }`}
                  >
                    <Icon className="size-6" weight="bold" />
                  </div>

                  <div className="flex flex-col text-left">
                    <span className="text-base font-semibold text-foreground transition-colors group-hover:text-aws-orange">
                      {item.title}
                    </span>
                    <span className="line-clamp-1 text-xs text-muted-foreground">
                      {item.subtitle}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  {item.badge && (
                    <Badge
                      variant={item.highlight ? "default" : "outline"}
                      className={`hidden text-[10px] sm:inline-flex ${
                        item.highlight
                          ? "bg-aws-orange text-black hover:bg-aws-orange"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      {item.badge}
                    </Badge>
                  )}
                  <ArrowSquareOutIcon
                    className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
                    weight="bold"
                  />
                  {item.external && (
                    <span className="sr-only">
                      {isEn ? " (opens in a new tab)" : " (abre em nova aba)"}
                    </span>
                  )}
                </div>
              </a>
            )
          })}
        </nav>

        {/* Rodapé institucional */}
        <footer className="mt-10 flex flex-col items-center text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} AWS Student Builder Group • Centro Universitário Fametro</p>
          <p className="mt-1 text-[11px] text-muted-foreground/70">
            {isEn
              ? "Official student program supported by Amazon Web Services"
              : "Programa estudantil oficial apoiado pela Amazon Web Services"}
          </p>
          <div className="mt-4">
            <a
              href={asset(isEn ? "/en/" : "/")}
              className="font-mono text-xs text-aws-orange underline-offset-4 hover:underline"
            >
              ← {isEn ? "Back to main website" : "Voltar para o site principal"}
            </a>
          </div>
        </footer>
      </main>
    </div>
  )
}
