/* eslint-disable @next/next/no-img-element -- export estático para o GitHub Pages: imagens servidas direto de public/ */
import { preload } from "react-dom"
import {
  ArrowSquareOutIcon,
  BuildingsIcon,
  CameraIcon,
  CertificateIcon,
  ChatCenteredDotsIcon,
  ClockIcon,
  CloudIcon,
  CoffeeIcon,
  DeviceMobileIcon,
  LinkedinLogoIcon,
  MapPinIcon,
  MicrophoneStageIcon,
  PlayIcon,
  SealCheckIcon,
  SparkleIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/ssr"

import { ExternalLink } from "@/components/site/external-link"
import { GoToTop } from "@/components/site/go-to-top"
import { LazyIframe } from "@/components/site/lazy-iframe"
import { SceneBackground } from "@/components/site/scene-background"
import { ScrollEffects } from "@/components/site/scroll-effects"
import { SiteHeader } from "@/components/site/site-header"
import { TeaserVideo } from "@/components/site/teaser-video"
import { WhoIsIt } from "@/components/site/who-is-it"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { type Locale, dictionaries, homePath, pick } from "@/lib/i18n"
import { SITE_URL } from "@/lib/seo"
import { asset, shortUrl, site } from "@/lib/site"
import { cn } from "@/lib/utils"

// dados estruturados para o Google (schema.org)
const jsonLd = (locale: Locale) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: dictionaries[locale].meta.title,
  url: new URL(homePath[locale].slice(1), SITE_URL).toString(),
  inLanguage: locale === "pt" ? "pt-BR" : "en",
  logo: new URL("icon.png", SITE_URL).toString(),
  image: new URL("og.jpg", SITE_URL).toString(),
  description: dictionaries[locale].meta.description,
  areaServed: { "@type": "City", name: "Manaus" },
  parentOrganization: { "@type": "CollegeOrUniversity", name: "Centro Universitário Fametro" },
  founder: { "@type": "Person", name: site.lider.nome, sameAs: site.lider.links },
  sameAs: [site.meetup],
})

const NIVEL_COR = ["bg-[#8D99A8]", "bg-aws-blue", "bg-aws-green", "bg-aws-purple"]

const timelineIcons = [
  { icon: SparkleIcon, color: "text-aws-purple", border: "border-aws-purple/50", bg: "bg-aws-purple/10" },
  { icon: MicrophoneStageIcon, color: "text-aws-blue", border: "border-aws-blue/50", bg: "bg-aws-blue/10" },
  { icon: CoffeeIcon, color: "text-aws-green", border: "border-aws-green/50", bg: "bg-aws-green/10" },
  { icon: MicrophoneStageIcon, color: "text-aws-orange", border: "border-aws-orange/50", bg: "bg-aws-orange/10" },
  { icon: ChatCenteredDotsIcon, color: "text-aws-purple", border: "border-aws-purple/50", bg: "bg-aws-purple/10" },
  { icon: CameraIcon, color: "text-aws-blue", border: "border-aws-blue/50", bg: "bg-aws-blue/10" },
]

const iniciais = (nome: string) =>
  nome.replace(/^Prof\.\s*/, "").split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join("")

function Secao({ id, titulo, eyebrow, children, className }: { id: string; titulo: string; eyebrow: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} data-scene={id} aria-labelledby={`${id}-titulo`} className={cn("scroll-mt-20 border-b border-border py-20", className)}>
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4">
        <div data-reveal className="flex flex-col gap-3">
          <p className="font-heading text-sm font-semibold tracking-widest text-aws-orange uppercase">{eyebrow}</p>
          <h2 id={`${id}-titulo`} className="text-3xl font-semibold md:text-5xl">{titulo}</h2>
        </div>
        {children}
      </div>
    </section>
  )
}

/** Página inicial, a mesma nos dois idiomas (textos do dicionário de cada um). */
export function HomePage({ locale }: { locale: Locale }) {
  const t = dictionaries[locale]
  // o pôster do vídeo é o maior elemento da primeira tela (LCP): baixa primeiro
  preload(asset(site.fotos.poster), { as: "image", fetchPriority: "high" })
  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-primary focus:p-3 focus:text-primary-foreground">
        {t.skip}
      </a>
      <SceneBackground />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(locale)) }} />
      <ScrollEffects />
      <SiteHeader locale={locale} />
      <main id="conteudo" className="relative z-10">
        {/* início */}
        <section id="inicio" data-scene="inicio" aria-labelledby="inicio-titulo" className="relative overflow-hidden border-b border-border bg-pixel-grid">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20" />
          <div data-blur-bg className="relative isolate mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 md:grid-cols-[1.1fr_1fr] md:py-28">
            <div className="relative isolate flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-2 max-w-full">
                <Badge variant="outline" className="w-fit shrink-0">{t.hero.badge}</Badge>
                {"encontroOnline" in site && site.encontroOnline && (
                  <a href="#evento" className="inline-flex max-w-full">
                    <span className="inline-flex h-auto max-w-full flex-wrap items-center gap-1.5 rounded-sm border border-aws-purple/50 bg-aws-purple/10 px-2.5 py-1 text-xs font-medium text-aws-purple transition hover:border-aws-purple hover:bg-aws-purple/20">
                      <span className="font-semibold shrink-0">⚡ {locale === "en" ? "Next Event:" : "Próximo Evento:"}</span>
                      <span className="break-words font-medium">{pick(locale, site.encontroOnline.titulo, site.encontroOnline.titulo_en)}</span>
                      <span className="shrink-0 font-mono text-[11px] text-muted-foreground">• {pick(locale, site.encontroOnline.data, site.encontroOnline.data_en)}</span>
                    </span>
                  </a>
                )}
              </div>
              <h1 id="inicio-titulo" className="text-4xl leading-tight font-semibold md:text-6xl">
                AWS Student Builder Group <span className="text-aws-orange">{t.hero.titleSuffix}</span>
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                {t.hero.lead}
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={site.meetup} target="_blank" rel="noopener noreferrer" className={buttonVariants({ size: "lg" })}>
                  <UsersThreeIcon data-icon="inline-start" /> {t.hero.joinMeetup}<span className="sr-only">{t.newTab}</span>
                </a>
                <a href="#apresentacoes" className={buttonVariants({ size: "lg", variant: "outline" })}>
                  <PlayIcon data-icon="inline-start" /> {t.hero.seeTalk}
                </a>
              </div>
            </div>
            <figure className="glass-frame flex flex-col gap-3">
              <span aria-hidden="true" className="glass-glow" />
              <span aria-hidden="true" className="glass-surface" />
              <span aria-hidden="true" className="px-corner px-tl" />
              <span aria-hidden="true" className="px-corner px-tr" />
              <span aria-hidden="true" className="px-corner px-bl" />
              <span aria-hidden="true" className="px-corner px-br" />
              <TeaserVideo
                src={asset("/video/teaser_aws_sbg_fametro.mp4")}
                poster={asset(site.fotos.poster)}
                label={t.hero.videoLabel}
              />
              <figcaption className="text-sm text-muted-foreground">
                {t.hero.caption} <a className="underline underline-offset-4 hover:text-primary" href={asset("/teaser/")}>{t.hero.openTeaser}</a>.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* sobre */}
        <Secao id="sobre" eyebrow={t.about.eyebrow} titulo={t.about.title}>
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {t.about.lead}
          </p>
          <div data-reveal-stagger className="grid gap-4 md:grid-cols-3">
            {[
              { icon: CloudIcon, cor: "text-aws-orange" },
              { icon: UsersThreeIcon, cor: "text-aws-blue" },
              { icon: CertificateIcon, cor: "text-aws-green" },
            ].map(({ icon: Icon, cor }, i) => (
              <Card key={cor}>
                <CardHeader>
                  <Icon className={cn("size-8", cor)} aria-hidden="true" />
                  <CardTitle className="text-lg">{t.about.cards[i].t}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{t.about.cards[i].d}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <figure data-reveal className="flex flex-col gap-3">
            <div className="overflow-hidden border border-border">
            <img loading="lazy" decoding="async" data-parallax src={asset(site.fotos.auditorio)} alt={t.about.photoAlt} className="aspect-[16/7] w-full object-cover" />
            </div>
            <figcaption className="text-sm text-muted-foreground">{t.about.photoCaption}</figcaption>
          </figure>
        </Secao>

        {/* apresentações */}
        <Secao id="apresentacoes" eyebrow={t.talks.eyebrow} titulo={t.talks.title}>
          <div data-reveal-stagger className="flex flex-col gap-8">
            {site.apresentacoes.map((deck) => (
              <Card key={deck.arquivo} className="overflow-hidden">
                <div className="aspect-video w-full border-b border-border bg-black">
                  <LazyIframe src={`${asset(deck.arquivo)}?autoplay=6`} title={`${t.talks.iframeTitle} ${pick(locale, deck.titulo, deck.tituloEn)}`} className="size-full" />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{pick(locale, deck.titulo, deck.tituloEn)}</CardTitle>
                  <CardDescription className="text-base">{pick(locale, deck.descricao, deck.descricaoEn)} {deck.slides} {t.talks.preview}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 text-base text-muted-foreground">
                  <p className="flex items-start gap-2">
                    <DeviceMobileIcon className="mt-1 size-5 shrink-0 text-aws-orange" aria-hidden="true" />
                    <span>{t.talks.remoteBefore} <strong lang="pt-BR" className="text-foreground">{t.talks.remoteButton}</strong> {t.talks.remoteAfter}</span>
                  </p>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-3">
                  <a href={asset(deck.arquivo)} className={buttonVariants({ size: "lg" })}>
                    <ArrowSquareOutIcon data-icon="inline-start" /> {t.talks.open}
                  </a>
                  {deck.arquivo.includes("auditorio") ? (
                    <a href={asset("/teaser/")} className={buttonVariants({ size: "lg", variant: "outline" })}>
                      <PlayIcon data-icon="inline-start" /> {t.talks.teaser}
                    </a>
                  ) : (
                    <a href={site.meetup} target="_blank" rel="noopener noreferrer" className={buttonVariants({ size: "lg", variant: "outline" })}>
                      <UsersThreeIcon data-icon="inline-start" /> {t.hero.joinMeetup}<span className="sr-only">{t.newTab}</span>
                    </a>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </Secao>

        {/* instituições parceiras e próximo evento */}
        <Secao id="instituicoes" eyebrow={t.places.eyebrow} titulo={t.places.title}>
          <ul data-reveal-stagger className="grid gap-4 md:grid-cols-2">
            {site.instituicoes.map((i) => (
              <li key={i.nome} className="min-w-0">
                <Card className="h-full min-w-0">
                  <CardHeader className="flex flex-row items-center gap-4">
                    {i.logo ? (
                      <img loading="lazy" decoding="async" src={asset(i.logo)} alt="" className="h-10 w-auto max-w-44 object-contain" />
                    ) : (
                      <BuildingsIcon className="size-12 shrink-0 text-aws-orange" aria-hidden="true" />
                    )}
                    <div className="flex min-w-0 flex-col gap-1">
                      <CardTitle className="text-lg break-words">{i.nome}</CardTitle>
                      <CardDescription className="break-words">{pick(locale, i.tipo, i.tipoEn)}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardFooter className="mt-auto text-sm">
                    <ExternalLink newTab={t.newTab} href={i.url} className="block max-w-full truncate font-mono">{shortUrl(i.url)}</ExternalLink>
                  </CardFooter>
                </Card>
              </li>
            ))}
          </ul>
          <div id="evento" data-reveal className="scroll-mt-24 flex flex-col gap-8">
            {"encontroOnline" in site && site.encontroOnline && (
              <Card className="relative overflow-hidden border border-aws-purple/40 bg-card/90 shadow-2xl backdrop-blur-md">
                <div className="h-1.5 w-full bg-gradient-to-r from-aws-purple via-aws-blue to-aws-orange" aria-hidden="true" />
                <CardHeader className="flex flex-col gap-4 p-5 sm:p-8">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-aws-purple/40 bg-aws-purple/10 px-3 py-1 text-xs font-semibold text-aws-purple">
                      <span className="relative flex size-2">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-aws-purple opacity-75" />
                        <span className="relative inline-flex size-2 rounded-full bg-aws-purple" />
                      </span>
                      {locale === "en" ? "Special Edition • 3 Hours" : "Edição Especial • 3 Horas"}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-muted/40 px-3 py-1 font-mono text-xs text-foreground/90">
                      <ClockIcon className="size-3.5 text-aws-blue" />
                      {pick(locale, site.encontroOnline.data, site.encontroOnline.data_en)}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
                      {locale === "en" ? "100% Online • Google Meet • Free" : "100% Online • Google Meet • Gratuito"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <CardTitle className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground break-words">
                      {pick(locale, site.encontroOnline.titulo, site.encontroOnline.titulo_en)}
                    </CardTitle>
                    <CardDescription className="text-base sm:text-lg leading-relaxed text-muted-foreground break-words max-w-3xl">
                      {pick(locale, site.encontroOnline.descricao, site.encontroOnline.descricao_en)}
                    </CardDescription>
                  </div>
                </CardHeader>

                {site.encontroOnline.convidados && site.encontroOnline.convidados.length > 0 && (
                  <CardContent className="flex flex-col gap-6 px-5 sm:px-8 pt-0">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-t border-border/60 pt-6">
                      <div>
                        <p className="font-heading text-xs font-bold uppercase tracking-widest text-aws-purple">
                          {locale === "en" ? "Special Guests & Keynotes" : "Convidados Especiais & Keynotes"}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                          {locale === "en"
                            ? "Industry leaders sharing real-world cloud practices & career insights"
                            : "Especialistas do mercado compartilhando prática real de nuvem e dicas de carreira"}
                        </p>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground shrink-0">
                        {site.encontroOnline.convidados.length} {locale === "en" ? "confirmed speakers" : "palestrantes confirmados"}
                      </span>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                      {site.encontroOnline.convidados.map((c) => (
                        <div
                          key={c.nome}
                          className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-gradient-to-b from-card via-card/95 to-muted/20 p-5 sm:p-6 transition-all duration-300 hover:border-aws-purple/60 hover:shadow-xl hover:shadow-aws-purple/5"
                        >
                          <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-4">
                              <div className="relative size-20 sm:size-24 rounded-2xl overflow-hidden ring-2 ring-border/80 group-hover:ring-aws-purple/60 transition-all shrink-0 shadow-md">
                                {c.foto ? (
                                  <img
                                    loading="lazy"
                                    decoding="async"
                                    src={asset(c.foto)}
                                    alt={c.nome}
                                    className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                ) : (
                                  <div className="flex size-full items-center justify-center bg-aws-purple/20 text-aws-purple font-bold text-2xl">
                                    {c.nome.charAt(0)}
                                  </div>
                                )}
                                <div className="absolute bottom-1 right-1 rounded-full bg-background/90 p-0.5 shadow-xs">
                                  <SealCheckIcon className="size-4 text-aws-blue" weight="fill" />
                                </div>
                              </div>

                              <div className="flex min-w-0 flex-1 flex-col gap-1">
                                <strong className="text-lg sm:text-xl font-heading font-bold text-foreground truncate">
                                  {c.nome}
                                </strong>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                                  <MapPinIcon className="size-3.5 text-aws-orange shrink-0" />
                                  <span>{pick(locale, c.origem, c.origemEn)}</span>
                                </div>
                                <span className="text-xs sm:text-sm font-medium text-foreground/85 line-clamp-2 mt-0.5">
                                  {pick(locale, c.papel, c.papelEn)}
                                </span>
                                {c.link && (
                                  <ExternalLink
                                    newTab={t.newTab}
                                    href={c.link}
                                    className="inline-flex items-center gap-1 text-xs font-mono text-aws-purple hover:underline mt-1 w-fit"
                                  >
                                    <LinkedinLogoIcon className="size-3.5" />
                                    <span>LinkedIn</span>
                                    <ArrowSquareOutIcon className="size-3 opacity-70" />
                                  </ExternalLink>
                                )}
                              </div>
                            </div>

                            {"tags" in c && Array.isArray(c.tags) && c.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {c.tags.map((tag: string) => (
                                  <span
                                    key={tag}
                                    className="inline-flex items-center rounded-md border border-border/70 bg-muted/50 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}

                            {"bio" in c && c.bio && (
                              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-3 border-t border-border/40">
                                {pick(locale, c.bio, c.bioEn)}
                              </p>
                            )}
                          </div>

                          {"palestra" in c && c.palestra && (
                            <div className="mt-4 rounded-xl border border-border/70 bg-muted/30 p-4 transition hover:border-aws-purple/40">
                              <div className="flex items-center gap-1.5">
                                {"palestraStatus" in c && c.palestraStatus === "confirmada" ? (
                                  <span className="inline-flex items-center gap-1 rounded-full border border-aws-blue/40 bg-aws-blue/10 px-2.5 py-0.5 text-[11px] font-semibold text-aws-blue">
                                    <MicrophoneStageIcon className="size-3" />
                                    {locale === "en" ? "Confirmed Keynote (1h)" : "Palestra Confirmada (1h)"}
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 rounded-full border border-aws-orange/40 bg-aws-orange/10 px-2.5 py-0.5 text-[11px] font-semibold text-aws-orange">
                                    <ClockIcon className="size-3" />
                                    {locale === "en" ? "1-Hour Keynote • Topic TBA" : "Palestra de 1h • Tema em Definição"}
                                  </span>
                                )}
                              </div>
                              <h4 className="font-heading font-semibold text-sm sm:text-base text-foreground mt-2 leading-snug">
                                {pick(locale, c.palestra, c.palestraEn)}
                              </h4>
                              {"palestraDescricao" in c && c.palestraDescricao && (
                                <p className="text-xs sm:text-sm text-muted-foreground/90 mt-1.5 leading-relaxed">
                                  {pick(locale, c.palestraDescricao, c.palestraDescricaoEn)}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}

                {"cronograma" in site.encontroOnline && site.encontroOnline.cronograma && site.encontroOnline.cronograma.length > 0 && (
                  <CardContent className="flex flex-col gap-6 px-5 sm:px-8 pt-0">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-8">
                      <div>
                        <p className="font-heading text-xs font-bold uppercase tracking-widest text-aws-purple">
                          {locale === "en" ? "Official Schedule (3 Hours)" : "Programação Oficial (3 Horas)"}
                        </p>
                        <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground mt-0.5">
                          {locale === "en" ? "Event Timeline • 14:00 to 17:00 AMT" : "Linha do Tempo Oficial • 14h às 17h AMT"}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/40 px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
                          <ClockIcon className="size-3 text-aws-purple" />
                          {locale === "en" ? "15:00 to 18:00 BRT" : "15h às 18h Brasília (BRT)"}
                        </span>
                        <span className="inline-flex items-center rounded-md border border-aws-purple/30 bg-aws-purple/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-aws-purple">
                          6 {locale === "en" ? "blocks" : "blocos"}
                        </span>
                      </div>
                    </div>

                    <div className="relative flex flex-col gap-4 sm:gap-5 pl-7 sm:pl-9 before:absolute before:bottom-4 before:left-3.5 sm:before:left-4 before:top-4 before:w-0.5 before:bg-gradient-to-b before:from-aws-purple before:via-aws-blue before:to-aws-purple/20">
                      {site.encontroOnline.cronograma.map((item, idx) => {
                        const meta = timelineIcons[idx % timelineIcons.length]
                        const NodeIcon = meta.icon

                        return (
                          <div key={idx} className="group relative">
                            <div
                              className={cn(
                                "absolute -left-7 sm:-left-9 mt-1 flex size-7 sm:size-8 items-center justify-center rounded-full border-2 bg-background shadow-xs transition-transform duration-200 group-hover:scale-110",
                                meta.border,
                                meta.bg,
                                meta.color
                              )}
                              aria-hidden="true"
                            >
                              <NodeIcon className="size-3.5 sm:size-4" weight="bold" />
                            </div>

                            <div className="flex flex-col gap-2 rounded-xl border border-border/70 bg-card/70 p-4 sm:p-5 transition-all duration-200 hover:border-aws-purple/50 hover:bg-card/95 hover:shadow-md">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="font-mono text-xs font-bold text-foreground bg-muted border border-border px-2 py-0.5 rounded">
                                    {item.hora}
                                  </span>
                                  {item.tag && (
                                    <Badge variant="outline" className="text-[11px] font-medium py-0 h-5">
                                      {pick(locale, item.tag, item.tagEn)}
                                    </Badge>
                                  )}
                                  {"palestrante" in item && item.palestrante && (
                                    <span className="inline-flex items-center gap-1 font-mono text-xs text-aws-purple bg-aws-purple/10 border border-aws-purple/30 rounded px-2 py-0.5">
                                      👤 {item.palestrante}
                                    </span>
                                  )}
                                </div>
                                <span className="font-mono text-xs text-muted-foreground shrink-0">
                                  ⏱️ {item.duracao}
                                </span>
                              </div>

                              <strong className="text-sm sm:text-base font-semibold text-foreground">
                                {pick(locale, item.titulo, item.tituloEn)}
                              </strong>

                              {"tema" in item && item.tema && (
                                <div className="rounded-md border-l-2 border-aws-orange bg-aws-orange/10 px-3 py-1.5 text-xs sm:text-sm font-medium text-aws-orange/95">
                                  💡 {pick(locale, item.tema, item.temaEn)}
                                </div>
                              )}

                              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                {pick(locale, item.descricao, item.descricaoEn)}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                )}

                <CardFooter className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4 border-t border-border/60 bg-muted/20 p-5 sm:p-8">
                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full sm:w-auto">
                    <a
                      href={site.encontroOnline.meetup_url ?? site.meetup}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto justify-center bg-aws-purple hover:bg-aws-purple/90 text-white font-semibold shadow-md shadow-aws-purple/20")}
                    >
                      <UsersThreeIcon data-icon="inline-start" /> {locale === "en" ? "RSVP on Meetup (Free)" : "Inscrever-se no Meetup (Gratuito)"}
                      <span className="sr-only">{t.newTab}</span>
                    </a>
                    <a href="#apresentacoes" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "w-full sm:w-auto justify-center")}>
                      <PlayIcon data-icon="inline-start" /> {locale === "en" ? "View Interactive Slides" : "Ver slides interativos"}
                    </a>
                  </div>
                  <p className="text-[11px] font-mono text-muted-foreground text-center sm:text-right">
                    {locale === "en"
                      ? "* Manaus AMT (UTC-4) • Equivalent to 15:00–18:00 Brasília (BRT, UTC-3)."
                      : "* Fuso de Manaus AMT (UTC-4) • Correspondente às 15:00–18:00 no fuso de Brasília (BRT, UTC-3)."}
                  </p>
                </CardFooter>
              </Card>
            )}
            {site.proximoEvento && (
              <div>
                <p className="mb-3 font-heading text-xs font-semibold uppercase tracking-widest text-muted-foreground text-center">
                  {locale === "en" ? "Next In-Person Meetup (Teaser)" : "Próximo Encontro Presencial (Teaser)"}
                </p>
                <WhoIsIt
                  locale={locale}
                  logo={asset(site.proximoEvento.logo)}
                  local={site.proximoEvento.local}
                  descricao={pick(locale, site.proximoEvento.descricao, site.proximoEvento.descricaoEn)}
                  data={pick(locale, site.proximoEvento.data, site.proximoEvento.dataEn)}
                />
              </div>
            )}
          </div>
        </Secao>

        {/* certificações */}
        <Secao id="certificacoes" eyebrow={t.certs.eyebrow} titulo={t.certs.title}>
          <div data-reveal-stagger data-badges className="grid gap-4 md:grid-cols-4">
            {site.certificacoes.map((n, i) => (
              <Card key={n.nivel}>
                <div className={cn("h-2 w-full", NIVEL_COR[i])} aria-hidden="true" />
                <CardHeader>
                  <CardTitle className="font-heading text-xl">{locale === "en" ? n.en : n.nivel}</CardTitle>
                  <CardDescription className="text-sm">
                    {locale === "pt" && <><span lang="en" className="tracking-widest uppercase">{n.en}</span> • </>}
                    {pick(locale, n.nota, n.notaEn)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-col gap-3">
                    {n.itens.map((c) => (
                      <li key={c.nome + n.nivel} className="flex items-center gap-3">
                        <img loading="lazy" decoding="async" src={asset(c.selo)} alt="" className="h-12 w-auto" />
                        <span lang="en" className="font-medium">{c.nome}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-base text-muted-foreground">
            {t.certs.jacketBefore} <strong className="text-foreground">Golden Jacket</strong>{t.certs.jacketAfter}{" "}
            <ExternalLink newTab={t.newTab} href="https://aws.amazon.com/certification/">aws.amazon.com/certification</ExternalLink>.
          </p>
        </Secao>

        {/* equipe */}
        <Secao id="equipe" eyebrow={t.team.eyebrow} titulo={t.team.title}>
          <ul data-reveal-stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...site.equipe, ...site.professores].map((p) => (
              <li key={p.nome} className="min-w-0">
                <Card className="h-full min-w-0">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="size-16">
                      <AvatarImage src={asset(p.foto)} alt="" loading="lazy" decoding="async" />
                      <AvatarFallback>{iniciais(p.nome)}</AvatarFallback>
                    </Avatar>
                    <div className="flex min-w-0 flex-col gap-1">
                      <CardTitle className="text-base break-words">{p.nome}</CardTitle>
                      <CardDescription className="break-words">{pick(locale, p.papel, p.papelEn)}</CardDescription>
                    </div>
                  </CardHeader>
                  {p.links.length > 0 && (
                    <CardContent className="flex flex-col gap-1 text-sm">
                      {p.links.map((l) => (
                        <ExternalLink newTab={t.newTab} key={l} href={l} className="block max-w-full truncate font-mono">{shortUrl(l)}</ExternalLink>
                      ))}
                    </CardContent>
                  )}
                </Card>
              </li>
            ))}
          </ul>
        </Secao>

        {/* parceiros */}
        <Secao id="parceiros" eyebrow={t.partners.eyebrow} titulo={t.partners.title}>
          <ul data-reveal-stagger className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {site.parceiros.map((p) => (
              <li key={p.nome} className="min-w-0">
                <Card className="h-full min-w-0">
                  <CardHeader className="flex flex-col items-start gap-3">
                    <img loading="lazy" decoding="async" src={asset(p.logo)} alt="" className="size-16 bg-white object-contain p-1" />
                    <CardTitle className="text-base">{p.nome}</CardTitle>
                    <CardDescription>{pick(locale, p.tipo, p.tipoEn)}</CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto text-sm">
                    <ExternalLink newTab={t.newTab} href={p.url} className="block max-w-full truncate font-mono">{shortUrl(p.url)}</ExternalLink>
                  </CardFooter>
                </Card>
              </li>
            ))}
          </ul>
        </Secao>

        {/* chamada */}
        <section data-scene="cta" aria-labelledby="cta-titulo" className="bg-pixel-grid py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-[1fr_auto]">
            <div data-reveal className="flex flex-col gap-5">
              <h2 id="cta-titulo" className="text-3xl font-semibold md:text-5xl">{t.cta.title}</h2>
              <p lang="en" className="text-xl text-aws-orange">{t.cta.tagline}</p>
              <p className="max-w-xl text-lg text-muted-foreground">{t.cta.lead}</p>
              <a href={site.meetup} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ size: "lg" }), "w-fit")}>
                {t.cta.join}<span className="sr-only">{t.newTab}</span>
              </a>
            </div>
            <img loading="lazy" decoding="async" src={asset(site.fotos.qrMeetup)} alt={t.cta.qrAlt} className="size-56 bg-white p-3" />
          </div>
        </section>
      </main>
      <footer className="relative z-10 border-t border-border bg-background py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm text-muted-foreground">
          <Separator />
          <p>
            {t.footer.ledBy} {site.lider.nome} •{" "}
            {site.lider.links.map((l, i) => (
              <span key={l}>{i > 0 && " • "}<ExternalLink newTab={t.newTab} href={l} className="font-mono">{shortUrl(l)}</ExternalLink></span>
            ))}
          </p>
          <p>{t.footer.disclaimer}</p>
        </div>
      </footer>
      <GoToTop locale={locale} />
    </>
  )
}
