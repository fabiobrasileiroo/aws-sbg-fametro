"use client"

import { useEffect, useRef } from "react"

// Cores do template (pixel art do AWS Student Builder Group)
const PALETTE = [0xff9900, 0xff57e9, 0xad5cff, 0x42b4ff, 0x00e582]

// Moldura em pixel inspirada na capa do template: 9x9, 0 = vazio, 1..5 = cor da paleta
const PATTERN = [
  "4200000024",
  "2111111112",
  "0100400010",
  "0104040010",
  "0100400010",
  "0104040010",
  "2111111112",
  "4200000024",
].map((r) => r.split("").map(Number))

/**
 * Fundo 3D da abertura: cubos em pixel nas cores do programa que flutuam, seguem o mouse
 * e se espalham ao rolar a página. Decorativo (aria-hidden). Sem animação com "reduzir movimento".
 */
export function HeroVoxels() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = ref.current
    if (!host) return
    let disposed = false
    let cleanup = () => {}

    import("three").then((THREE) => {
      if (disposed) return
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      host.appendChild(renderer.domElement)
      renderer.domElement.setAttribute("aria-hidden", "true")

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
      camera.position.set(0, 0, 16)
      scene.add(new THREE.AmbientLight(0xffffff, 0.55))
      const key = new THREE.DirectionalLight(0xffffff, 1.4)
      key.position.set(4, 6, 8)
      scene.add(key)

      // cubos da moldura + poeira de pixels em volta
      const cells: { x: number; y: number; c: number }[] = []
      PATTERN.forEach((row, j) =>
        row.forEach((v, i) => { if (v) cells.push({ x: i - (row.length - 1) / 2, y: (PATTERN.length - 1) / 2 - j, c: v - 1 }) }))
      const dust = 70
      for (let k = 0; k < dust; k++) {
        cells.push({ x: (Math.random() - 0.5) * 22, y: (Math.random() - 0.5) * 12, c: Math.floor(Math.random() * PALETTE.length) })
      }
      const count = cells.length
      const geo = new THREE.BoxGeometry(0.92, 0.92, 0.92)
      const mat = new THREE.MeshStandardMaterial({ roughness: 0.45, metalness: 0.1 })
      const mesh = new THREE.InstancedMesh(geo, mat, count)
      const color = new THREE.Color()
      const seeds = cells.map((_, k) => ({
        phase: Math.random() * Math.PI * 2,
        z: k < count - dust ? 0 : -3 - Math.random() * 6,
        scale: k < count - dust ? 1 : 0.25 + Math.random() * 0.35,
        spread: new THREE.Vector3((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, 4 + Math.random() * 8),
        spin: (Math.random() - 0.5) * 2,
      }))
      cells.forEach((c, k) => mesh.setColorAt(k, color.setHex(PALETTE[c.c])))
      const group = new THREE.Group()
      group.add(mesh)
      group.position.x = 3.2
      scene.add(group)

      const dummy = new THREE.Object3D()
      const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
      let scroll = 0

      const resize = () => {
        const w = host.clientWidth, h = host.clientHeight
        renderer.setSize(w, h, false)
        camera.aspect = w / Math.max(h, 1)
        group.position.x = w < 768 ? 0 : 3.2
        group.scale.setScalar(w < 768 ? 0.7 : 1)
        camera.updateProjectionMatrix()
      }
      const onMove = (e: PointerEvent) => {
        mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2
        mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2
      }
      const onScroll = () => { scroll = Math.min(window.scrollY / Math.max(host.clientHeight, 1), 1.5) }

      const draw = (t: number) => {
        mouse.x += (mouse.tx - mouse.x) * 0.05
        mouse.y += (mouse.ty - mouse.y) * 0.05
        group.rotation.y = -0.35 + mouse.x * 0.35 + scroll * 0.6
        group.rotation.x = 0.15 + mouse.y * 0.2
        cells.forEach((c, k) => {
          const s = seeds[k]
          const float = reduce ? 0 : Math.sin(t * 0.0012 + s.phase) * 0.15
          dummy.position.set(c.x + s.spread.x * scroll, c.y + float + s.spread.y * scroll, s.z + s.spread.z * scroll)
          dummy.rotation.set(s.spin * scroll * 2, s.spin * scroll * 3 + (reduce ? 0 : t * 0.0002 * s.spin), 0)
          dummy.scale.setScalar(s.scale * (1 - Math.min(scroll, 1) * 0.35))
          dummy.updateMatrix()
          mesh.setMatrixAt(k, dummy.matrix)
        })
        mesh.instanceMatrix.needsUpdate = true
        renderer.render(scene, camera)
      }

      let raf = 0
      let visible = true
      const loop = (t: number) => { draw(t); raf = requestAnimationFrame(loop) }
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting
        cancelAnimationFrame(raf)
        if (visible && !reduce) raf = requestAnimationFrame(loop)
      })
      io.observe(host)
      resize()
      onScroll()
      draw(0)
      window.addEventListener("resize", resize)
      window.addEventListener("scroll", onScroll, { passive: true })
      if (!reduce) window.addEventListener("pointermove", onMove)

      cleanup = () => {
        cancelAnimationFrame(raf)
        io.disconnect()
        window.removeEventListener("resize", resize)
        window.removeEventListener("scroll", onScroll)
        window.removeEventListener("pointermove", onMove)
        geo.dispose(); mat.dispose(); renderer.dispose()
        renderer.domElement.remove()
      }
    })
    return () => { disposed = true; cleanup() }
  }, [])

  return <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 [&>canvas]:size-full" />
}
