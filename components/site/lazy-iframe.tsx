"use client"

import { useEffect, useRef, useState } from "react"

/** iframe que só carrega quando chega perto da tela (a prévia dos slides pesa ~1 MB). */
export function LazyIframe({
  src,
  title,
  className,
}: {
  src: string
  title: string
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true)
          io.disconnect()
        }
      },
      { rootMargin: "300px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="size-full">
      {show && (
        <iframe
          src={src}
          title={title}
          className={className}
          allow="fullscreen"
        />
      )}
    </div>
  )
}
