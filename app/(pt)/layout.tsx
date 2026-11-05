import { RootLayout } from "@/components/site/root-layout"
import { buildMetadata } from "@/lib/seo"

// português: raiz do site ("/"), endereço usado nos QR codes e links já compartilhados
export const metadata = buildMetadata("pt")

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootLayout locale="pt">{children}</RootLayout>
}
