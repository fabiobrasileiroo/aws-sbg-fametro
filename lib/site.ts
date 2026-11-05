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

/** Seções do menu (o texto de cada uma está no dicionário do idioma, em nav). */
export const nav = ["sobre", "apresentacoes", "evento", "certificacoes", "equipe", "parceiros"] as const
