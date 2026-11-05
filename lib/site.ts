import site from "@/data/site.json"

export { site }

/** Caminho de arquivos em public/, com o basePath do GitHub Pages. */
export function asset(path: string | null | undefined) {
  if (!path) return ""
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`
}

/** Texto curto para links: "linkedin.com/in/fulano". */
export function shortUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")
}

export const nav = [
  { href: "#sobre", label: "Sobre" },
  { href: "#apresentacoes", label: "Apresentações" },
  { href: "#evento", label: "Próximo evento" },
  { href: "#certificacoes", label: "Certificações" },
  { href: "#equipe", label: "Equipe" },
  { href: "#parceiros", label: "Parceiros" },
]
