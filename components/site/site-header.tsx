"use client"

import { ListIcon } from "@phosphor-icons/react"

import { buttonVariants } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { type Locale, dictionaries, homePath, htmlLang, locales } from "@/lib/i18n"
import { asset, nav, site } from "@/lib/site"
import { cn } from "@/lib/utils"

/**
 * Seletor PT | EN: cada idioma tem o próprio endereço ("/" e "/en/"), então são links, não botões.
 * Ao trocar, mantém a seção em que a pessoa está (#equipe, #certificacoes...).
 */
function LanguageSwitch({ locale, className }: { locale: Locale; className?: string }) {
  const t = dictionaries[locale].header
  return (
    <div role="group" aria-label={t.language} className={cn("flex border border-border", className)}>
      {locales.map((l) => (
        <a
          key={l}
          href={asset(homePath[l])}
          hrefLang={htmlLang[l]}
          lang={htmlLang[l]}
          aria-current={l === locale ? "page" : undefined}
          onClick={(e) => {
            if (l === locale) return e.preventDefault()
            if (window.location.hash) e.currentTarget.href += window.location.hash
          }}
          className={cn(
            buttonVariants({ variant: l === locale ? "default" : "ghost", size: "sm" }),
            "min-w-10 font-heading uppercase"
          )}
        >
          <span aria-hidden="true">{l}</span>
          <span className="sr-only">{l === "pt" ? "Português" : "English"}</span>
        </a>
      ))}
    </div>
  )
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = dictionaries[locale]
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
        <a href="#inicio" className="flex min-w-0 items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/kit/aws-logo.svg")} alt="" className="h-6 w-auto invert" />
          <span className="font-heading text-sm font-semibold">{t.header.brand}</span>
        </a>
        <nav aria-label={t.header.sections} className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className={buttonVariants({ variant: "ghost", size: "sm" })}>
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <LanguageSwitch locale={locale} className="ml-auto shrink-0 lg:ml-0" />
        <a href={site.meetup} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants(), "hidden lg:inline-flex")}>
          {t.header.joinMeetup}<span className="sr-only">{t.newTab}</span>
        </a>
        <Sheet>
          <SheetTrigger className={cn(buttonVariants({ variant: "outline", size: "icon" }), "shrink-0 lg:hidden")} aria-label={t.header.openMenu}>
            <ListIcon />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>{t.header.menu}</SheetTitle>
            </SheetHeader>
            <nav aria-label={t.header.sections} className="flex flex-col gap-1 px-4">
              {nav.map((id) => (
                <a key={id} href={`#${id}`} className={buttonVariants({ variant: "ghost" })}>
                  {t.nav[id]}
                </a>
              ))}
              <a href={site.meetup} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants(), "mt-4")}>
                {t.header.joinMeetup}<span className="sr-only">{t.newTab}</span>
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
