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

type AccentColor = "orange" | "green" | "blue" | "purple" | "pink"

const colorStyles: Record<
  AccentColor,
  {
    borderHover: string
    bgHover: string
    iconBox: string
    iconBoxHover: string
    titleHover: string
  }
> = {
  orange: {
    borderHover: "hover:border-aws-orange/80 hover:shadow-aws-orange/20",
    bgHover: "hover:bg-aws-orange/10",
    iconBox: "border-aws-orange/40 bg-aws-orange/15 text-aws-orange",
    iconBoxHover: "group-hover:border-aws-orange group-hover:bg-aws-orange/25 group-hover:text-aws-orange",
    titleHover: "group-hover:text-aws-orange",
  },
  green: {
    borderHover: "hover:border-aws-green/80 hover:shadow-aws-green/20",
    bgHover: "hover:bg-aws-green/10",
    iconBox: "border-aws-green/30 bg-aws-green/15 text-aws-green",
    iconBoxHover: "group-hover:border-aws-green group-hover:bg-aws-green/25 group-hover:text-aws-green",
    titleHover: "group-hover:text-aws-green",
  },
  blue: {
    borderHover: "hover:border-aws-blue/80 hover:shadow-aws-blue/20",
    bgHover: "hover:bg-aws-blue/10",
    iconBox: "border-aws-blue/30 bg-aws-blue/15 text-aws-blue",
    iconBoxHover: "group-hover:border-aws-blue group-hover:bg-aws-blue/25 group-hover:text-aws-blue",
    titleHover: "group-hover:text-aws-blue",
  },
  purple: {
    borderHover: "hover:border-aws-purple/80 hover:shadow-aws-purple/20",
    bgHover: "hover:bg-aws-purple/10",
    iconBox: "border-aws-purple/30 bg-aws-purple/15 text-aws-purple",
    iconBoxHover: "group-hover:border-aws-purple group-hover:bg-aws-purple/25 group-hover:text-aws-purple",
    titleHover: "group-hover:text-aws-purple",
  },
  pink: {
    borderHover: "hover:border-aws-pink/80 hover:shadow-aws-pink/20",
    bgHover: "hover:bg-aws-pink/10",
    iconBox: "border-aws-pink/30 bg-aws-pink/15 text-aws-pink",
    iconBoxHover: "group-hover:border-aws-pink group-hover:bg-aws-pink/25 group-hover:text-aws-pink",
    titleHover: "group-hover:text-aws-pink",
  },
}

export function LinksView({ locale }: LinksViewProps) {
  const isEn = locale === "en"

  const links: Array<{
    title: string
    subtitle: string
    url: string
    badge: string
    icon: typeof CalendarDotsIcon
    highlight: boolean
    color: AccentColor
    external: boolean
  }> = [
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
      color: "orange",
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
      color: "green",
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
      color: "blue",
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
      color: "purple",
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
      color: "blue",
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
      color: "pink",
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
      color: "orange",
      external: true,
    },
  ]

  return (
    <div className="relative min-h-screen w-full bg-pixel-grid bg-background px-4 py-12 text-foreground sm:py-16 overflow-x-hidden">
      {/* Aurora animada com a paleta oficial da AWS */}
      <div aria-hidden="true" className="aws-aurora-glow" />

      {/* Pixels 8-bit decorativos flutuantes (Assinatura visual do SBG Kit) */}
      <div
        aria-hidden="true"
        className="pixel-chip left-8 top-28 text-aws-orange hidden sm:block"
        style={{ animationDelay: "0.2s" }}
      />
      <div
        aria-hidden="true"
        className="pixel-chip right-10 top-36 text-aws-blue hidden sm:block"
        style={{ animationDelay: "0.7s" }}
      />
      <div
        aria-hidden="true"
        className="pixel-chip left-12 top-2/3 text-aws-pink hidden sm:block"
        style={{ animationDelay: "1.2s" }}
      />
      <div
        aria-hidden="true"
        className="pixel-chip right-14 top-1/2 text-aws-purple hidden sm:block"
        style={{ animationDelay: "0.9s" }}
      />
      <div
        aria-hidden="true"
        className="pixel-chip right-8 bottom-36 text-aws-green hidden sm:block"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        aria-hidden="true"
        className="pixel-chip left-10 bottom-24 text-aws-orange hidden sm:block"
        style={{ animationDelay: "0.4s" }}
      />

      <main className="relative z-10 mx-auto flex max-w-lg flex-col items-center">
        {/* Header do perfil */}
        <header className="mb-8 flex flex-col items-center text-center sbg-rise">
          {/* Avatar com moldura de vidro e cantos pixel (Design System AWS) */}
          <div className="relative mb-4 size-24 p-1 rounded-2xl border-2 border-aws-orange/40 bg-card shadow-lg shadow-aws-orange/15 transition-all duration-500 hover:scale-105 hover:border-aws-orange hover:shadow-aws-orange/30">
            <span className="px-corner px-tl" aria-hidden="true" />
            <span className="px-corner px-tr" aria-hidden="true" />
            <span className="px-corner px-bl" aria-hidden="true" />
            <span className="px-corner px-br" aria-hidden="true" />
            <div className="size-full overflow-hidden rounded-xl">
              <img
                src={asset("/img/pessoas/fabio-brasileiro.jpg")}
                alt="Fábio Brasileiro"
                className="size-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
          </div>

          <div className="mb-2 flex items-center gap-2 sbg-float">
            <Badge
              variant="outline"
              className="border-aws-orange/60 font-mono text-xs text-aws-orange shadow-[0_0_12px_rgba(255,153,0,0.2)]"
            >
              AWS Student Builder Group
            </Badge>
            <Badge variant="secondary" className="font-mono text-xs border border-border">
              Fametro • Manaus
            </Badge>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Fábio Brasileiro
          </h1>
          <p className="mt-1 text-sm text-muted-foreground font-mono">
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
          {links.map((item, index) => {
            const Icon = item.icon
            const cStyle = colorStyles[item.color]

            return (
              <a
                key={item.title}
                href={item.url}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className={`group relative flex items-center justify-between gap-4 rounded-xl border p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg sbg-rise ${
                  item.highlight
                    ? "border-aws-orange bg-aws-orange/10 shadow-lg shadow-aws-orange/20 hover:border-aws-orange hover:bg-aws-orange/15 hover:shadow-aws-orange/30"
                    : `border-border/80 bg-card/85 backdrop-blur-sm ${cStyle.borderHover} ${cStyle.bgHover}`
                }`}
                style={{ animationDelay: `${index * 65 + 120}ms` }}
              >
                {/* Efeito de feixe de luz dinâmico (Shimmer) no destaque */}
                {item.highlight && <div className="sbg-shimmer-sweep" aria-hidden="true" />}

                {/* Indicador pulsante se for destaque */}
                {item.highlight && (
                  <span
                    aria-hidden="true"
                    className="absolute -top-1.5 -right-1.5 flex size-3.5 items-center justify-center"
                  >
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-aws-orange opacity-75" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-aws-orange shadow-[0_0_8px_#FF9900]" />
                  </span>
                )}

                <div className="flex items-center gap-3.5">
                  <div
                    className={`flex size-11 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 ${
                      item.highlight
                        ? "border-aws-orange/50 bg-aws-orange/20 text-aws-orange shadow-[0_0_12px_rgba(255,153,0,0.25)]"
                        : `${cStyle.iconBox} ${cStyle.iconBoxHover}`
                    }`}
                  >
                    <Icon className="size-6" weight="bold" />
                  </div>

                  <div className="flex flex-col text-left">
                    <span className={`text-base font-semibold text-foreground transition-colors ${cStyle.titleHover}`}>
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
                          ? "bg-aws-orange text-black font-semibold hover:bg-aws-orange shadow-sm"
                          : "border-border text-muted-foreground group-hover:border-current"
                      }`}
                    >
                      {item.badge}
                    </Badge>
                  )}
                  <ArrowSquareOutIcon
                    className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-foreground"
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
        <footer className="mt-10 flex flex-col items-center text-center text-xs text-muted-foreground sbg-rise" style={{ animationDelay: "600ms" }}>
          <p>© {new Date().getFullYear()} AWS Student Builder Group • Centro Universitário Fametro</p>
          <p className="mt-1 text-[11px] text-muted-foreground/70">
            {isEn
              ? "Official student program supported by Amazon Web Services"
              : "Programa estudantil oficial apoiado pela Amazon Web Services"}
          </p>
          <div className="mt-4">
            <a
              href={asset(isEn ? "/en/" : "/")}
              className="font-mono text-xs text-aws-orange underline-offset-4 hover:underline transition-colors hover:text-aws-orange/80"
            >
              ← {isEn ? "Back to main website" : "Voltar para o site principal"}
            </a>
          </div>
        </footer>
      </main>
    </div>
  )
}
