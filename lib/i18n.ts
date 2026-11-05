/**
 * Idiomas do site: português em "/" (padrão, endereço dos QR codes) e inglês em "/en/".
 * Textos da interface ficam nos dicionários abaixo; os dados (equipe, parceiros...) vêm de data/site.json,
 * com a versão em inglês nos campos terminados em "En".
 */
export const locales = ["pt", "en"] as const
export type Locale = (typeof locales)[number]

/** Atributo lang do HTML de cada idioma. */
export const htmlLang: Record<Locale, string> = { pt: "pt-BR", en: "en" }

/** Caminho da página inicial de cada idioma (sem o basePath). */
export const homePath: Record<Locale, string> = { pt: "/", en: "/en/" }

/** Escolhe o campo em inglês quando existe (ex.: pick("en", p.papel, p.papelEn)). */
export const pick = (locale: Locale, pt: string, en?: string) => (locale === "en" && en ? en : pt)

const pt = {
  meta: {
    title: "AWS Student Builder Group da Fametro",
    description:
      "Comunidade de estudantes do Centro Universitário Fametro, em Manaus, que aprendem nuvem e inteligência artificial construindo. Encontros práticos gratuitos do programa AWS Student Builder Groups.",
    ogAlt: "AWS Student Builder Group da Fametro, Manaus: comunidade de estudantes de nuvem e IA",
    ogLocale: "pt_BR",
  },
  skip: "Pular para o conteúdo",
  newTab: " (abre em nova aba)",
  header: {
    brand: "Student Builder Group • Fametro",
    sections: "Seções",
    joinMeetup: "Entrar no Meetup",
    openMenu: "Abrir menu",
    menu: "Menu",
    language: "Idioma",
  },
  nav: {
    sobre: "Sobre",
    apresentacoes: "Apresentações",
    evento: "Próximo evento",
    certificacoes: "Certificações",
    equipe: "Equipe",
    parceiros: "Parceiros",
  },
  hero: {
    badge: "Centro Universitário Fametro • Manaus",
    titleSuffix: "da Fametro",
    lead: "Uma comunidade de estudantes que se reúnem para aprender nuvem e inteligência artificial construindo, junto com a comunidade de tecnologia de Manaus. Gratuito.",
    joinMeetup: "Entrar no grupo pelo Meetup",
    seeTalk: "Ver a apresentação",
    videoLabel: "Teaser em vídeo do AWS Student Builder Group da Fametro",
    caption: "Teaser com trilha original. Versão animada interativa:",
    openTeaser: "abrir o teaser",
  },
  about: {
    eyebrow: "O que é",
    title: "Aprender construindo, em comunidade.",
    lead: "O AWS Student Builder Groups é um programa oficial da AWS com mais de 1.000 grupos no mundo, liderados por estudantes. Na Fametro, o grupo já existe: encontros práticos, gratuitos, com apoio de professores e de comunidades parceiras.",
    cards: [
      { t: "Prática real", d: "Laboratórios no AWS Builder Center e no Skill Builder: você constrói projetos de verdade na nuvem." },
      { t: "Comunidade e mentoria", d: "Contato com profissionais das comunidades de Manaus, networking e portfólio para estágio e emprego." },
      { t: "Rumo à certificação", d: "Grupo de estudos para as certificações AWS e oportunidades de vouchers, conforme as regras do programa." },
    ],
    photoAlt: "Auditório da Fametro lotado de alunos na primeira apresentação do grupo",
    photoCaption: "Primeira apresentação do grupo no auditório da Fametro.",
  },
  talks: {
    eyebrow: "Apresentações",
    title: "Slides interativos",
    iframeTitle: "Apresentação:",
    preview: "slides. A prévia avança sozinha; toque em qualquer lugar para controlar.",
    remoteBefore: "Para apresentar: abra a apresentação, clique em",
    remoteButton: "Controle pelo celular",
    remoteAfter: "e aponte a câmera para o QR code. O celular avança, volta e mostra as notas.",
    open: "Abrir a apresentação",
    teaser: "Teaser animado",
  },
  places: {
    eyebrow: "Parcerias com instituições",
    title: "Onde os encontros acontecem",
  },
  event: {
    eyebrow: "Próximo evento",
    question: "Qual é esse lugar?",
    answer: (local: string) => `É o ${local}!`,
    reveal: "Revelar o local do próximo evento",
    hide: "Esconder o local do próximo evento",
    sentence: (local: string, descricao: string) =>
      `O próximo encontro do AWS Student Builder Group da Fametro vai ser no ${local}: ${descricao}.`,
    date: "Data:",
    hint: "Clique na silhueta para descobrir.",
  },
  certs: {
    eyebrow: "Caminho de certificação",
    title: "12 certificações AWS, quatro níveis",
    jacketBefore: "Quem conquista todas as certificações ativas ao mesmo tempo pode receber a",
    jacketAfter: ". A lista muda com o tempo: confira em",
  },
  team: {
    eyebrow: "Quem faz acontecer",
    title: "Core Team e professores",
  },
  partners: {
    eyebrow: "Ecossistema local",
    title: "Comunidades e parceiros",
  },
  cta: {
    title: "Bora construir juntos?",
    tagline: "Want to build the future? Join the club.",
    lead: "Entre no grupo pelo Meetup para receber o aviso de cada encontro e fazer sua inscrição.",
    join: "Entrar no grupo pelo Meetup",
    qrAlt: "QR code que abre a página do grupo no Meetup",
  },
  footer: {
    ledBy: "Liderado por",
    disclaimer: "Comunidade estudantil do programa AWS Student Builder Groups. Este não é um site oficial da Amazon Web Services.",
  },
  toTop: "Voltar ao topo",
}

export type Dictionary = typeof pt

const en: Dictionary = {
  meta: {
    title: "AWS Student Builder Group at Fametro",
    description:
      "A student community at Centro Universitário Fametro, in Manaus, Brazil, learning cloud and artificial intelligence by building. Free hands-on meetups of the AWS Student Builder Groups program.",
    ogAlt: "AWS Student Builder Group at Fametro, Manaus: a student community for cloud and AI",
    ogLocale: "en_US",
  },
  skip: "Skip to content",
  newTab: " (opens in a new tab)",
  header: {
    brand: "Student Builder Group • Fametro",
    sections: "Sections",
    joinMeetup: "Join on Meetup",
    openMenu: "Open menu",
    menu: "Menu",
    language: "Language",
  },
  nav: {
    sobre: "About",
    apresentacoes: "Talks",
    evento: "Next event",
    certificacoes: "Certifications",
    equipe: "Team",
    parceiros: "Partners",
  },
  hero: {
    badge: "Centro Universitário Fametro • Manaus, Brazil",
    titleSuffix: "at Fametro",
    lead: "A community of students who meet to learn cloud and artificial intelligence by building, together with the Manaus tech community. Free.",
    joinMeetup: "Join the group on Meetup",
    seeTalk: "Watch the talk",
    videoLabel: "Video teaser of the AWS Student Builder Group at Fametro",
    caption: "Teaser with an original soundtrack. Interactive animated version:",
    openTeaser: "open the teaser",
  },
  about: {
    eyebrow: "What it is",
    title: "Learning by building, as a community.",
    lead: "AWS Student Builder Groups is an official AWS program with more than 1,000 student-led groups around the world. At Fametro, the group is already up and running: free hands-on meetups, supported by professors and partner communities.",
    cards: [
      { t: "Real hands-on practice", d: "Labs on AWS Builder Center and Skill Builder: you build real projects in the cloud." },
      { t: "Community and mentoring", d: "Connect with professionals from the Manaus communities, build your network and a portfolio for internships and jobs." },
      { t: "Toward certification", d: "A study group for AWS certifications and voucher opportunities, according to the program rules." },
    ],
    photoAlt: "Fametro auditorium packed with students at the group's first talk",
    photoCaption: "The group's first talk in the Fametro auditorium.",
  },
  talks: {
    eyebrow: "Talks",
    title: "Interactive slides",
    iframeTitle: "Talk:",
    preview: "slides. The preview advances on its own; tap anywhere to take control.",
    remoteBefore: "To present: open the talk, click",
    remoteButton: "Controle pelo celular",
    remoteAfter: "(phone remote) and point your camera at the QR code. Your phone moves forward, back and shows the speaker notes.",
    open: "Open the talk",
    teaser: "Animated teaser",
  },
  places: {
    eyebrow: "Partner institutions",
    title: "Where the meetups happen",
  },
  event: {
    eyebrow: "Next event",
    question: "Who's that place?",
    answer: (local: string) => `It's ${local}!`,
    reveal: "Reveal the next event's venue",
    hide: "Hide the next event's venue",
    sentence: (local: string, descricao: string) =>
      `The next AWS Student Builder Group at Fametro meetup will be at ${local}: ${descricao}.`,
    date: "Date:",
    hint: "Click the silhouette to find out.",
  },
  certs: {
    eyebrow: "Certification path",
    title: "12 AWS certifications, four levels",
    jacketBefore: "Anyone who holds every active certification at the same time can receive the",
    jacketAfter: ". The list changes over time: check",
  },
  team: {
    eyebrow: "The people behind it",
    title: "Core Team and professors",
  },
  partners: {
    eyebrow: "Local ecosystem",
    title: "Communities and partners",
  },
  cta: {
    title: "Let's build together?",
    tagline: "Want to build the future? Join the club.",
    lead: "Join the group on Meetup to get notified about every meetup and sign up.",
    join: "Join the group on Meetup",
    qrAlt: "QR code that opens the group's Meetup page",
  },
  footer: {
    ledBy: "Led by",
    disclaimer: "Student community of the AWS Student Builder Groups program. This is not an official Amazon Web Services website.",
  },
  toTop: "Back to top",
}

export const dictionaries: Record<Locale, Dictionary> = { pt, en }
