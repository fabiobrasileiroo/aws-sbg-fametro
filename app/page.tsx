/* eslint-disable @next/next/no-img-element -- export estático para o GitHub Pages: imagens servidas direto de public/ */
import { preload } from "react-dom"
import { ArrowSquareOutIcon, BuildingsIcon, CertificateIcon, CloudIcon, DeviceMobileIcon, PlayIcon, UsersThreeIcon } from "@phosphor-icons/react/ssr"

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
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo"
import { asset, shortUrl, site } from "@/lib/site"
import { cn } from "@/lib/utils"

// dados estruturados para o Google (schema.org)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: new URL("icon.png", SITE_URL).toString(),
  image: new URL("og.jpg", SITE_URL).toString(),
  description: SITE_DESCRIPTION,
  areaServed: { "@type": "City", name: "Manaus" },
  parentOrganization: { "@type": "CollegeOrUniversity", name: "Centro Universitário Fametro" },
  founder: { "@type": "Person", name: site.lider.nome, sameAs: site.lider.links },
  sameAs: [site.meetup],
}

const NIVEL_COR = ["bg-[#8D99A8]", "bg-aws-blue", "bg-aws-green", "bg-aws-purple"]

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

export default function Page() {
  // o pôster do vídeo é o maior elemento da primeira tela (LCP): baixa primeiro
  preload(asset(site.fotos.poster), { as: "image", fetchPriority: "high" })
  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-primary focus:p-3 focus:text-primary-foreground">
        Pular para o conteúdo
      </a>
      <SceneBackground />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ScrollEffects />
      <SiteHeader />
      <main id="conteudo" className="relative z-10">
        {/* início */}
        <section id="inicio" data-scene="inicio" aria-labelledby="inicio-titulo" className="relative overflow-hidden border-b border-border bg-pixel-grid">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20" />
          <div data-blur-bg className="relative isolate mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 md:grid-cols-[1.1fr_1fr] md:py-28">
            <div className="relative isolate flex flex-col gap-6">
              <Badge variant="outline" className="w-fit">Centro Universitário Fametro • Manaus</Badge>
              <h1 id="inicio-titulo" className="text-4xl leading-tight font-semibold md:text-6xl">
                AWS Student Builder Group <span className="text-aws-orange">da Fametro</span>
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                Uma comunidade de estudantes que se reúnem para aprender nuvem e inteligência artificial construindo, junto com a comunidade de tecnologia de Manaus. Gratuito.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={site.meetup} target="_blank" rel="noopener noreferrer" className={buttonVariants({ size: "lg" })}>
                  <UsersThreeIcon data-icon="inline-start" /> Entrar no grupo pelo Meetup<span className="sr-only"> (abre em nova aba)</span>
                </a>
                <a href="#apresentacoes" className={buttonVariants({ size: "lg", variant: "outline" })}>
                  <PlayIcon data-icon="inline-start" /> Ver a apresentação
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
                label="Teaser em vídeo do AWS Student Builder Group da Fametro"
              />
              <figcaption className="text-sm text-muted-foreground">
                Teaser com trilha original. Versão animada interativa: <a className="underline underline-offset-4 hover:text-primary" href={asset("/teaser/")}>abrir o teaser</a>.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* sobre */}
        <Secao id="sobre" eyebrow="O que é" titulo="Aprender construindo, em comunidade.">
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
            O AWS Student Builder Groups é um programa oficial da AWS com mais de 1.000 grupos no mundo, liderados por estudantes. Na Fametro, o grupo já existe: encontros práticos, gratuitos, com apoio de professores e de comunidades parceiras.
          </p>
          <div data-reveal-stagger className="grid gap-4 md:grid-cols-3">
            {[
              { icon: CloudIcon, cor: "text-aws-orange", t: "Prática real", d: "Laboratórios no AWS Builder Center e no Skill Builder: você constrói projetos de verdade na nuvem." },
              { icon: UsersThreeIcon, cor: "text-aws-blue", t: "Comunidade e mentoria", d: "Contato com profissionais das comunidades de Manaus, networking e portfólio para estágio e emprego." },
              { icon: CertificateIcon, cor: "text-aws-green", t: "Rumo à certificação", d: "Grupo de estudos para as certificações AWS e oportunidades de vouchers, conforme as regras do programa." },
            ].map(({ icon: Icon, cor, t, d }) => (
              <Card key={t}>
                <CardHeader>
                  <Icon className={cn("size-8", cor)} aria-hidden="true" />
                  <CardTitle className="text-lg">{t}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{d}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <figure data-reveal className="flex flex-col gap-3">
            <div className="overflow-hidden border border-border">
            <img loading="lazy" decoding="async" data-parallax src={asset(site.fotos.auditorio)} alt="Auditório da Fametro lotado de alunos na primeira apresentação do grupo" className="aspect-[16/7] w-full object-cover" />
            </div>
            <figcaption className="text-sm text-muted-foreground">Primeira apresentação do grupo no auditório da Fametro.</figcaption>
          </figure>
        </Secao>

        {/* apresentações */}
        <Secao id="apresentacoes" eyebrow="Apresentações" titulo="Slides interativos">
          <div data-reveal-stagger className="flex flex-col gap-8">
            {site.apresentacoes.map((deck) => (
              <Card key={deck.arquivo} className="overflow-hidden">
                <div className="aspect-video w-full border-b border-border bg-black">
                  <LazyIframe src={`${asset(deck.arquivo)}?autoplay=6`} title={`Apresentação: ${deck.titulo}`} className="size-full" />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{deck.titulo}</CardTitle>
                  <CardDescription className="text-base">{deck.descricao} {deck.slides} slides. A prévia avança sozinha; toque em qualquer lugar para controlar.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 text-base text-muted-foreground">
                  <p className="flex items-start gap-2">
                    <DeviceMobileIcon className="mt-1 size-5 shrink-0 text-aws-orange" aria-hidden="true" />
                    <span>Para apresentar: abra a apresentação, clique em <strong className="text-foreground">Controle pelo celular</strong> e aponte a câmera para o QR code. O celular avança, volta e mostra as notas.</span>
                  </p>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-3">
                  <a href={asset(deck.arquivo)} className={buttonVariants({ size: "lg" })}>
                    <ArrowSquareOutIcon data-icon="inline-start" /> Abrir a apresentação
                  </a>
                  <a href={asset("/teaser/")} className={buttonVariants({ size: "lg", variant: "outline" })}>
                    <PlayIcon data-icon="inline-start" /> Teaser animado
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Secao>

        {/* instituições parceiras e próximo evento */}
        <Secao id="instituicoes" eyebrow="Parcerias com instituições" titulo="Onde os encontros acontecem">
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
                      <CardDescription className="break-words">{i.tipo}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardFooter className="mt-auto text-sm">
                    <ExternalLink href={i.url} className="block max-w-full truncate font-mono">{shortUrl(i.url)}</ExternalLink>
                  </CardFooter>
                </Card>
              </li>
            ))}
          </ul>
          {site.proximoEvento && (
            <div id="evento" data-reveal className="scroll-mt-24">
              <WhoIsIt
                logo={asset(site.proximoEvento.logo)}
                local={site.proximoEvento.local}
                descricao={site.proximoEvento.descricao}
                data={site.proximoEvento.data}
              />
            </div>
          )}
        </Secao>

        {/* certificações */}
        <Secao id="certificacoes" eyebrow="Caminho de certificação" titulo="12 certificações AWS, quatro níveis">
          <div data-reveal-stagger data-badges className="grid gap-4 md:grid-cols-4">
            {site.certificacoes.map((n, i) => (
              <Card key={n.nivel}>
                <div className={cn("h-2 w-full", NIVEL_COR[i])} aria-hidden="true" />
                <CardHeader>
                  <CardTitle className="font-heading text-xl">{n.nivel}</CardTitle>
                  <CardDescription className="text-sm"><span lang="en" className="tracking-widest uppercase">{n.en}</span> • {n.nota}</CardDescription>
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
            Quem conquista todas as certificações ativas ao mesmo tempo pode receber a <strong className="text-foreground">Golden Jacket</strong>. A lista muda com o tempo: confira em{" "}
            <ExternalLink href="https://aws.amazon.com/certification/">aws.amazon.com/certification</ExternalLink>.
          </p>
        </Secao>

        {/* equipe */}
        <Secao id="equipe" eyebrow="Quem faz acontecer" titulo="Core Team e professores">
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
                      <CardDescription className="break-words">{p.papel}</CardDescription>
                    </div>
                  </CardHeader>
                  {p.links.length > 0 && (
                    <CardContent className="flex flex-col gap-1 text-sm">
                      {p.links.map((l) => (
                        <ExternalLink key={l} href={l} className="block max-w-full truncate font-mono">{shortUrl(l)}</ExternalLink>
                      ))}
                    </CardContent>
                  )}
                </Card>
              </li>
            ))}
          </ul>
        </Secao>

        {/* parceiros */}
        <Secao id="parceiros" eyebrow="Ecossistema local" titulo="Comunidades e parceiros">
          <ul data-reveal-stagger className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {site.parceiros.map((p) => (
              <li key={p.nome} className="min-w-0">
                <Card className="h-full min-w-0">
                  <CardHeader className="flex flex-col items-start gap-3">
                    <img loading="lazy" decoding="async" src={asset(p.logo)} alt="" className="size-16 bg-white object-contain p-1" />
                    <CardTitle className="text-base">{p.nome}</CardTitle>
                    <CardDescription>{p.tipo}</CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto text-sm">
                    <ExternalLink href={p.url} className="block max-w-full truncate font-mono">{shortUrl(p.url)}</ExternalLink>
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
              <h2 id="cta-titulo" className="text-3xl font-semibold md:text-5xl">Bora construir juntos?</h2>
              <p lang="en" className="text-xl text-aws-orange">Want to build the future? Join the club.</p>
              <p className="max-w-xl text-lg text-muted-foreground">Entre no grupo pelo Meetup para receber o aviso de cada encontro e fazer sua inscrição.</p>
              <a href={site.meetup} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ size: "lg" }), "w-fit")}>
                Entrar no grupo pelo Meetup<span className="sr-only"> (abre em nova aba)</span>
              </a>
            </div>
            <img loading="lazy" decoding="async" src={asset(site.fotos.qrMeetup)} alt="QR code que abre a página do grupo no Meetup" className="size-56 bg-white p-3" />
          </div>
        </section>
      </main>
      <footer className="relative z-10 border-t border-border bg-background py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm text-muted-foreground">
          <Separator />
          <p>
            Liderado por {site.lider.nome} •{" "}
            {site.lider.links.map((l, i) => (
              <span key={l}>{i > 0 && " • "}<ExternalLink href={l} className="font-mono">{shortUrl(l)}</ExternalLink></span>
            ))}
          </p>
          <p>Comunidade estudantil do programa AWS Student Builder Groups. Este não é um site oficial da Amazon Web Services.</p>
        </div>
      </footer>
      <GoToTop />
    </>
  )
}
