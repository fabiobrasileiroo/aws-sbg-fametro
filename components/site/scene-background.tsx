"use client"

import { useEffect, useRef } from "react"

import type { SceneMsg } from "./scene-engine"

/**
 * Fundo 3D fixo da página: cubos em pixel que mudam de formação a cada seção e ficam desfocados atrás do
 * conteúdo. Na abertura fica nítido; ao passar o mouse no conteúdo principal, desfoca. Decorativo (aria-hidden).
 * Com "reduzir movimento": troca de formação sem animação e sem seguir o mouse.
 * A cena roda num Web Worker (OffscreenCanvas) para não travar a página; sem suporte, roda aqui mesmo.
 */
export function SceneBackground() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = ref.current
    if (!host) return
    let disposed = false
    let send: (m: SceneMsg) => void = () => {}
    let stop = () => {}

    const start = async () => {
      const canvas = document.createElement("canvas")
      host.appendChild(canvas)
      const opts = {
        w: window.innerWidth,
        h: window.innerHeight,
        reduceMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        saveData: !!(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData,
      }
      if ("transferControlToOffscreen" in canvas && typeof Worker !== "undefined") {
        const worker = new Worker(new URL("./scene-worker.ts", import.meta.url), { type: "module" })
        const offscreen = canvas.transferControlToOffscreen()
        worker.postMessage({ type: "init", canvas: offscreen, ...opts }, [offscreen])
        send = (m) => worker.postMessage(m)
        stop = () => { worker.postMessage({ type: "dispose" }); canvas.remove() }
      } else {
        const [THREE, { createScene }] = await Promise.all([import("three"), import("./scene-engine")])
        if (disposed) { canvas.remove(); return }
        const s = createScene(THREE, canvas, opts)
        send = (m) => s.handle(m)
        stop = () => { s.dispose(); canvas.remove() }
      }
      // seção em que a página já está (ex.: recarregou no meio)
      send({ type: "scene", id: host.dataset.current ?? "inicio" })
    }

    // seção atual = a que ocupa o meio da tela
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return
        const id = (e.target as HTMLElement).dataset.scene!
        host.dataset.current = id
        send({ type: "scene", id })
      })
    }, { rootMargin: "-45% 0px -45% 0px" })
    document.querySelectorAll<HTMLElement>("[data-scene]").forEach((s) => io.observe(s))

    // desfoque ao passar o mouse no conteúdo principal
    const focusEls = Array.from(document.querySelectorAll<HTMLElement>("[data-blur-bg]"))
    const on = () => { host.dataset.hover = "1" }
    const off = () => { delete host.dataset.hover }
    // brilho do vidro segue o mouse (efeito "liquid glass")
    const sheen = (e: PointerEvent) => {
      const el = e.currentTarget as HTMLElement, r = el.getBoundingClientRect()
      el.style.setProperty("--mx", `${e.clientX - r.left}px`)
      el.style.setProperty("--my", `${e.clientY - r.top}px`)
    }
    focusEls.forEach((el) => {
      el.addEventListener("pointermove", sheen)
      el.addEventListener("pointerenter", on); el.addEventListener("pointerleave", off)
      el.addEventListener("focusin", on); el.addEventListener("focusout", off)
    })
    const onMove = (e: PointerEvent) =>
      send({ type: "mouse", x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * 2 })
    const onResize = () => send({ type: "resize", w: window.innerWidth, h: window.innerHeight })
    const onVisibility = () => send({ type: "visible", visible: !document.hidden })
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("resize", onResize)
    document.addEventListener("visibilitychange", onVisibility)

    // começa depois do carregamento (tempo ocioso), para não competir com o primeiro desenho da página
    let idleId: number | null = null
    let timer: ReturnType<typeof setTimeout> | null = null
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void }
    if (w.requestIdleCallback) idleId = w.requestIdleCallback(() => void start(), { timeout: 1500 })
    else timer = setTimeout(() => void start(), 600)

    return () => {
      disposed = true
      if (idleId !== null) w.cancelIdleCallback?.(idleId)
      if (timer) clearTimeout(timer)
      io.disconnect()
      focusEls.forEach((el) => {
        el.removeEventListener("pointermove", sheen)
        el.removeEventListener("pointerenter", on); el.removeEventListener("pointerleave", off)
        el.removeEventListener("focusin", on); el.removeEventListener("focusout", off)
      })
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("resize", onResize)
      document.removeEventListener("visibilitychange", onVisibility)
      stop()
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-current="inicio"
      className="scene-bg pointer-events-none fixed inset-0 z-0 [&>canvas]:size-full"
    />
  )
}
