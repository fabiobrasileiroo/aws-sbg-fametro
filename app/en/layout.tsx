import { RootLayout } from "@/components/site/root-layout"
import { buildMetadata } from "@/lib/seo"

// inglês: "/en/"
export const metadata = buildMetadata("en")

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootLayout locale="en">{children}</RootLayout>
}
