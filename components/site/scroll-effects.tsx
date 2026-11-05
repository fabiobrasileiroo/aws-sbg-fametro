"use client"

import { useEffect } from "react"
import "lenis/dist/lenis.css"

/**
 * Efeitos de rolagem: rolagem suave (Lenis), barra de progresso e revelação do conteúdo (GSAP ScrollTrigger).
 * Marque elementos com data-reveal (sobe e aparece) ou data-reveal-stagger (filhos em sequência).
 * Com "reduzir movimento", nada disso roda e o conteúdo aparece normalmente.
 */
export function ScrollEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let cleanup = () => {}
    let disposed = false
    let started = false
    let idleId: number | null = null
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }

    // começa no tempo ocioso (ou no primeiro scroll/toque): as animações são de conteúdo abaixo da primeira tela
    const start = () => {
      if (started || disposed) return
      started = true
      window.removeEventListener("scroll", start)
      window.removeEventListener("pointerdown", start)
      Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]).then(([{ gsap }, { ScrollTrigger }, { default: Lenis }]) => {
        if (disposed) return
        gsap.registerPlugin(ScrollTrigger)
        const lenis = new Lenis({ anchors: { offset: -72 }, autoRaf: false })
        lenis.on("scroll", ScrollTrigger.update)
        const tick = (time: number) => lenis.raf(time * 1000)
        gsap.ticker.add(tick)
        gsap.ticker.lagSmoothing(0)

        const ctx = gsap.context(() => {
          gsap.to("[data-progress]", {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
          })
          gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
            gsap.from(el, {
              y: 48,
              autoAlpha: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
            })
          })
          gsap.utils
            .toArray<HTMLElement>("[data-reveal-stagger]")
            .forEach((el) => {
              gsap.from(el.children, {
                y: 56,
                autoAlpha: 0,
                duration: 0.7,
                ease: "power3.out",
                stagger: 0.08,
                scrollTrigger: { trigger: el, start: "top 85%", once: true },
              })
            })
          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
            gsap.fromTo(
              el,
              { yPercent: -6, scale: 1.08 },
              {
                yPercent: 6,
                scale: 1.08,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            )
          })
          gsap.utils
            .toArray<HTMLElement>("[data-badges] img")
            .forEach((el, i) => {
              gsap.from(el, {
                scale: 0,
                rotation: -30,
                duration: 0.5,
                ease: "back.out(2.2)",
                delay: (i % 5) * 0.05,
                scrollTrigger: { trigger: el, start: "top 90%", once: true },
              })
            })
        })

        cleanup = () => {
          ctx.revert()
          gsap.ticker.remove(tick)
          lenis.destroy()
        }
      })
    }
    window.addEventListener("scroll", start, { passive: true })
    window.addEventListener("pointerdown", start, { passive: true })
    if (w.requestIdleCallback)
      idleId = w.requestIdleCallback(start, { timeout: 2000 })
    else setTimeout(start, 800)
    return () => {
      disposed = true
      window.removeEventListener("scroll", start)
      window.removeEventListener("pointerdown", start)
      if (idleId !== null) w.cancelIdleCallback?.(idleId)
      cleanup()
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-1 bg-transparent"
    >
      <div
        data-progress
        className="h-full origin-left scale-x-0 bg-aws-orange"
      />
    </div>
  )
}
