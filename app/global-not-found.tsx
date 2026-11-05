import type { Metadata } from "next"

import { RootLayout } from "@/components/site/root-layout"
import { buttonVariants } from "@/components/ui/button"
import { asset } from "@/lib/site"

// página 404 única para os dois idiomas (com dois layouts raiz, o Next pede um 404 global)
export const metadata: Metadata = {
  title: "404 | AWS Student Builder Group da Fametro",
  robots: { index: false },
}

export default function GlobalNotFound() {
  return (
    <RootLayout locale="pt">
      <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-pixel-grid px-4 text-center">
        <p className="font-heading text-sm font-semibold tracking-widest text-aws-orange uppercase">404</p>
        <h1 className="text-3xl font-semibold md:text-5xl">Página não encontrada</h1>
        <p lang="en" className="text-lg text-muted-foreground">Page not found</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href={asset("/")} className={buttonVariants({ size: "lg" })}>Voltar ao início</a>
          <a href={asset("/en/")} lang="en" className={buttonVariants({ size: "lg", variant: "outline" })}>Back to home</a>
        </div>
      </main>
    </RootLayout>
  )
}
