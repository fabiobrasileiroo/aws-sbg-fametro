import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo"
import { cn } from "@/lib/utils"

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: ["AWS", "AWS Student Builder Group", "Fametro", "Manaus", "computação em nuvem", "inteligência artificial",
    "certificação AWS", "comunidade de tecnologia", "Amazonas", "estudantes"],
  authors: [{ name: "Fábio Henrique Mendes Brasileiro", url: "https://www.linkedin.com/in/fabiobrasileiro/" }],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "AWS Student Builder Group da Fametro, Manaus: comunidade de estudantes de nuvem e IA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/og.jpg"],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={cn("antialiased", fontSans.variable, fontMono.variable)}>
      <body>
        <ThemeProvider forcedTheme="dark">{children}</ThemeProvider>
      </body>
    </html>
  )
}
