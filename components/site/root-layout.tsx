import { preload } from "react-dom"
import { Inter, JetBrains_Mono } from "next/font/google"

import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { type Locale, htmlLang } from "@/lib/i18n"
import { asset } from "@/lib/site"
import { cn } from "@/lib/utils"

// fallback: sem isso, se a fonte não carregar, o navegador cai no padrão (serifado) em sistemas sem Arial (Linux)
const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  fallback: ["system-ui", "Segoe UI", "Roboto", "Noto Sans", "Helvetica Neue", "Arial", "sans-serif"],
})
const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "Liberation Mono", "monospace"],
})

/** HTML base dos dois idiomas (cada idioma tem o próprio layout raiz, com o lang certo). */
export function RootLayout({ locale, children }: Readonly<{ locale: Locale; children: React.ReactNode }>) {
  // cursores baixados antes do primeiro clique (sem piscar ao clicar e soltar)
  for (const c of ["seta", "link", "clique"]) preload(asset(`/cursor/${c}.png`), { as: "image" })
  return (
    <html
      lang={htmlLang[locale]}
      suppressHydrationWarning
      className={cn("antialiased", fontSans.variable, fontMono.variable)}
      style={
        {
          "--cursor-seta": `url("${asset("/cursor/seta.png")}") 1 1`,
          "--cursor-link": `url("${asset("/cursor/link.png")}") 11 1`,
          "--cursor-clique": `url("${asset("/cursor/clique.png")}") 11 2`,
        } as React.CSSProperties
      }
    >
      <body>
        <ThemeProvider forcedTheme="dark">{children}</ThemeProvider>
      </body>
    </html>
  )
}
