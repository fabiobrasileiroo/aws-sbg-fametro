"use client"

import { ArrowUpIcon } from "@phosphor-icons/react"
import { useEffect, useState } from "react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/** Botão flutuante "voltar ao topo" no canto inferior direito; aparece depois de rolar a página. */
export function GoToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const subir = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
    // leva o foco do teclado para o início, junto com a rolagem
    document.getElementById("inicio-titulo")?.setAttribute("tabindex", "-1")
    document.getElementById("inicio-titulo")?.focus({ preventScroll: true })
  }

  return (
    <button
      type="button"
      onClick={subir}
      aria-label="Voltar ao topo"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={cn(
        buttonVariants({ size: "icon-lg" }),
        "go-top fixed right-5 bottom-5 z-40 size-12 shadow-lg",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <ArrowUpIcon weight="bold" />
    </button>
  )
}
