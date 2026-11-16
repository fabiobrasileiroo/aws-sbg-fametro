"use client"

import { useEffect, useState } from "react"
import { CookieIcon, ShieldCheckIcon, XIcon } from "@phosphor-icons/react"

import { buttonVariants } from "@/components/ui/button"
import { enableAnalytics, getStoredConsent, setStoredConsent } from "@/lib/analytics"
import { type Locale, dictionaries } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export function CookieConsent({ locale }: { locale: Locale }) {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const t = dictionaries[locale].cookies

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true)
      const consent = getStoredConsent()
      if (!consent) {
        setVisible(true)
      } else if (consent === "accepted") {
        enableAnalytics()
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  if (!mounted || !visible) return null

  const handleAccept = () => {
    setStoredConsent("accepted")
    setVisible(false)
  }

  const handleDecline = () => {
    setStoredConsent("declined")
    setVisible(false)
  }

  return (
    <aside
      role="region"
      aria-label={t.title}
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-xl animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="relative overflow-hidden rounded-2xl border border-aws-purple/40 bg-card/95 p-4 sm:p-5 shadow-2xl backdrop-blur-md">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-aws-purple via-aws-blue to-aws-orange" aria-hidden="true" />
        <div className="flex items-start gap-3.5">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-aws-purple/15 text-purple-300 border border-aws-purple/30">
            <CookieIcon className="size-5" weight="bold" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex items-center gap-2">
              <h3 className="font-heading text-sm font-semibold text-foreground">{t.title}</h3>
              <span className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-muted/50 px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
                <ShieldCheckIcon className="size-3 text-aws-green" weight="bold" /> LGPD
              </span>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">{t.description}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleAccept}
                className={cn(buttonVariants({ size: "sm" }), "h-8 px-3.5 text-xs font-semibold shadow-xs cursor-pointer")}
              >
                {t.accept}
              </button>
              <button
                type="button"
                onClick={handleDecline}
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-8 px-3 text-xs text-muted-foreground hover:text-foreground cursor-pointer")}
              >
                {t.decline}
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={handleDecline}
            aria-label={t.decline}
            className="rounded-lg p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground cursor-pointer"
          >
            <XIcon className="size-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
