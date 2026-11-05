import { cn } from "@/lib/utils"

/** Link externo acessível: abre em nova aba e avisa o leitor de tela. */
export function ExternalLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cn("relative underline underline-offset-4 hover:text-primary", className)}>
      {children}
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  )
}
