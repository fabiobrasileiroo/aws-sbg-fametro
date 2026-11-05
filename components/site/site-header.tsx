"use client"

import { ListIcon } from "@phosphor-icons/react"

import { buttonVariants } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { asset, nav, site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
        <a href="#inicio" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/kit/aws-logo.svg")} alt="" className="h-6 w-auto invert" />
          <span className="font-heading text-sm font-semibold">Student Builder Group • Fametro</span>
        </a>
        <nav aria-label="Seções" className="ml-auto hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className={buttonVariants({ variant: "ghost", size: "sm" })}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href={site.meetup} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants(), "hidden md:inline-flex")}>
          Entrar no Meetup<span className="sr-only"> (abre em nova aba)</span>
        </a>
        <Sheet>
          <SheetTrigger className={cn(buttonVariants({ variant: "outline", size: "icon" }), "ml-auto md:hidden")} aria-label="Abrir menu">
            <ListIcon />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav aria-label="Seções" className="flex flex-col gap-1 px-4">
              {nav.map((n) => (
                <a key={n.href} href={n.href} className={buttonVariants({ variant: "ghost" })}>
                  {n.label}
                </a>
              ))}
              <a href={site.meetup} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants(), "mt-4")}>
                Entrar no Meetup<span className="sr-only"> (abre em nova aba)</span>
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
