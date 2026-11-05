"use client"

import { useEffect, useRef } from "react"

/**
 * Vídeo do teaser: igual ao anterior (automático, mudo, em loop, com controles e pôster),
 * mas só começa a baixar depois que a página carregou, para não disputar banda com o primeiro desenho.
 */
export function TeaserVideo({
  src,
  poster,
  label,
}: {
  src: string
  poster: string
  label: string
}) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    let idle: number | null = null
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }
    const go = () => {
      if (v.getAttribute("src")) return
      v.src = src
      v.play().catch(() => {})
    }
    const schedule = () => {
      if (w.requestIdleCallback)
        idle = w.requestIdleCallback(go, { timeout: 2000 })
      else setTimeout(go, 800)
    }
    if (document.readyState === "complete") schedule()
    else window.addEventListener("load", schedule, { once: true })
    return () => {
      window.removeEventListener("load", schedule)
      if (idle !== null) w.cancelIdleCallback?.(idle)
    }
  }, [src])

  return (
    <video
      ref={ref}
      className="aspect-video w-full border border-border bg-black"
      poster={poster}
      controls
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      aria-label={label}
    />
  )
}
