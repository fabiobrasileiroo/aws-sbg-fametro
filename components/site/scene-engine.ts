import type * as ThreeNS from "three"

// Cores do template (pixel art do AWS Student Builder Group)
const PALETTE = [0xff9900, 0xff57e9, 0xad5cff, 0x42b4ff, 0x00e582]
const N = 140

type V = [number, number, number]
const rnd = (a: number, b: number) => a + Math.random() * (b - a)

// ---------- formações (uma por seção) ----------
function frame(): V[] {
  const rows = ["4200000024", "2111111112", "0100400010", "0104040010", "0100400010", "0104040010", "2111111112", "4200000024"]
  const pts: V[] = []
  rows.forEach((r, j) => r.split("").forEach((v, i) => { if (v !== "0") pts.push([i - 4.5 + 4, 3.5 - j, 0]) }))
  return pts
}
function cloud(): V[] {
  const blobs: [number, number, number][] = [[-2.6, -0.6, 1.9], [0, 0.6, 2.6], [2.8, -0.4, 2], [1.2, -1.4, 1.6], [-1.2, -1.4, 1.6]]
  const pts: V[] = []
  for (let k = 0; k < 90; k++) {
    const [cx, cy, r] = blobs[k % blobs.length]
    const a = rnd(0, Math.PI * 2), d = Math.sqrt(Math.random()) * r
    pts.push([Math.round(cx + Math.cos(a) * d), Math.round(cy + Math.sin(a) * d * 0.8), Math.round(rnd(-1, 1))])
  }
  return pts
}
function screen(): V[] {
  const pts: V[] = []
  for (let x = -8; x <= 8; x++) { pts.push([x, 4.5, 0]); pts.push([x, -4.5, 0]) }
  for (let y = -3.5; y <= 3.5; y++) { pts.push([-8, y, 0]); pts.push([8, y, 0]) }
  for (let x = -1; x <= 1; x++) pts.push([x, -5.5, 0])
  for (let x = -3; x <= 3; x++) pts.push([x, -6.5, 0])
  return pts
}
function hexagon(): V[] {
  const pts: V[] = []
  for (let ring = 2; ring <= 5; ring += 3) {
    for (let side = 0; side < 6; side++) {
      const a1 = (Math.PI / 3) * side + Math.PI / 6, a2 = a1 + Math.PI / 3
      const steps = ring * 2
      for (let s = 0; s < steps; s++) {
        const t = s / steps
        pts.push([Math.round((Math.cos(a1) * (1 - t) + Math.cos(a2) * t) * ring * 1.15), Math.round((Math.sin(a1) * (1 - t) + Math.sin(a2) * t) * ring * 1.15), 0])
      }
    }
  }
  return pts
}
function ring(): V[] {
  const pts: V[] = []
  for (let k = 0; k < 8; k++) {
    const a = (k / 8) * Math.PI * 2, cx = Math.cos(a) * 6, cy = Math.sin(a) * 3.6
    for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [1, 1], [0, 2], [1, 2], [-1, 2], [2, 2]]) pts.push([Math.round(cx) + dx, Math.round(cy) + dy - 1, 0])
  }
  return pts
}
function network(): V[] {
  const nodes: V[] = Array.from({ length: 8 }, () => [Math.round(rnd(-8, 8)), Math.round(rnd(-4.5, 4.5)), Math.round(rnd(-2, 2))])
  const pts: V[] = []
  nodes.forEach((n, i) => {
    pts.push(n, [n[0] + 1, n[1], n[2]], [n[0], n[1] + 1, n[2]], [n[0] + 1, n[1] + 1, n[2]])
    const m = nodes[(i + 3) % nodes.length]
    for (let t = 0.15; t < 1; t += 0.12) pts.push([n[0] + (m[0] - n[0]) * t, n[1] + (m[1] - n[1]) * t, n[2] + (m[2] - n[2]) * t])
  })
  return pts
}
const FORMS: Record<string, () => V[]> = { inicio: frame, sobre: cloud, apresentacoes: screen, certificacoes: hexagon, equipe: ring, parceiros: network, cta: frame }

/** Completa a formação até N cubos com "poeira" ao fundo, para todos os cubos sempre terem destino. */
function fill(pts: V[]): { p: V; s: number }[] {
  const out = pts.slice(0, N).map((p) => ({ p, s: 1 }))
  while (out.length < N) out.push({ p: [rnd(-12, 12), rnd(-7, 7), rnd(-8, -3)], s: rnd(0.25, 0.55) })
  return out
}

export type SceneMsg =
  | { type: "resize"; w: number; h: number }
  | { type: "scene"; id: string }
  | { type: "mouse"; x: number; y: number }
  | { type: "visible"; visible: boolean }

/**
 * Cena 3D (cubos em pixel que mudam de formação a cada seção). Sem DOM: roda no Web Worker
 * (OffscreenCanvas, fora da thread principal) ou, sem suporte, na própria página.
 */
export function createScene(
  THREE: typeof ThreeNS,
  canvas: HTMLCanvasElement | OffscreenCanvas,
  opts: { w: number; h: number; reduceMotion: boolean; saveData: boolean }
) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" })
  renderer.setPixelRatio(1)
  // WebGL por software (sem GPU) ou economia de dados: quadros estáticos, como em "reduzir movimento"
  const gl = renderer.getContext()
  const dbg = gl.getExtension("WEBGL_debug_renderer_info")
  const gpu = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : ""
  const reduce = opts.reduceMotion || /swiftshader|llvmpipe|softpipe|software|basic render/i.test(gpu) || opts.saveData

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
  camera.position.set(0, 0, 24)
  scene.add(new THREE.AmbientLight(0xffffff, 0.55))
  const key = new THREE.DirectionalLight(0xffffff, 1.4)
  key.position.set(4, 6, 8)
  scene.add(key)

  const geo = new THREE.BoxGeometry(0.92, 0.92, 0.92)
  const mat = new THREE.MeshStandardMaterial({ roughness: 0.45, metalness: 0.1 })
  const mesh = new THREE.InstancedMesh(geo, mat, N)
  const color = new THREE.Color()
  for (let k = 0; k < N; k++) mesh.setColorAt(k, color.setHex(PALETTE[k % PALETTE.length]))
  const group = new THREE.Group()
  group.add(mesh)
  scene.add(group)

  const cache: Record<string, { p: V; s: number }[]> = {}
  const target = (id: string) => (cache[id] ??= fill((FORMS[id] ?? frame)()))
  const cur = Array.from({ length: N }, () => ({ p: [rnd(-12, 12), rnd(-7, 7), rnd(-10, 2)] as V, s: 0.5 }))
  const phase = Array.from({ length: N }, () => rnd(0, Math.PI * 2))
  let sceneId = "inicio"
  let goal = target(sceneId)
  let width = opts.w
  const offset = { x: 0, tx: 0 }
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
  const dummy = new THREE.Object3D()

  const resize = (w: number, h: number) => {
    width = w
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    group.scale.setScalar(w < 768 ? 0.62 : 1)
  }

  const draw = (t: number, snap = false) => {
    const k = snap || reduce ? 1 : 0.06
    offset.x += (offset.tx - offset.x) * k
    mouse.x += (mouse.tx - mouse.x) * 0.05
    mouse.y += (mouse.ty - mouse.y) * 0.05
    group.position.x = offset.x
    group.rotation.y = reduce ? -0.25 : -0.25 + mouse.x * 0.3 + Math.sin(t * 0.00015) * 0.15
    group.rotation.x = reduce ? 0.1 : 0.1 + mouse.y * 0.18
    for (let i = 0; i < N; i++) {
      const c = cur[i], g = goal[i]
      for (let a = 0; a < 3; a++) c.p[a] += (g.p[a] - c.p[a]) * k
      c.s += (g.s - c.s) * k
      const float = reduce ? 0 : Math.sin(t * 0.0012 + phase[i]) * 0.12
      dummy.position.set(c.p[0], c.p[1] + float, c.p[2])
      dummy.rotation.set(0, reduce ? 0 : t * 0.0003 * ((i % 3) - 1), 0)
      dummy.scale.setScalar(c.s)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    }
    mesh.instanceMatrix.needsUpdate = true
    renderer.render(scene, camera)
  }

  // requestAnimationFrame existe em workers dedicados (Chrome, Firefox, Safari 16.4+); senão, ~30 fps por timer
  const g = globalThis as typeof globalThis & { requestAnimationFrame?: (cb: (t: number) => void) => number; cancelAnimationFrame?: (id: number) => void }
  const raf = g.requestAnimationFrame ? g.requestAnimationFrame.bind(g) : (cb: (t: number) => void) => setTimeout(() => cb(performance.now()), 33) as unknown as number
  const caf = g.cancelAnimationFrame ? g.cancelAnimationFrame.bind(g) : (id: number) => clearTimeout(id)
  let frameId = 0
  let last = 0
  let visible = true
  // 30 quadros por segundo bastam para o movimento lento dos cubos e cortam o trabalho pela metade
  const loop = (t: number) => {
    frameId = raf(loop)
    if (t - last < 32) return
    last = t
    draw(t)
  }

  resize(opts.w, opts.h)
  offset.tx = opts.w >= 768 ? 4.5 : 0
  if (reduce) { for (let i = 0; i < N; i++) cur[i] = { p: [...goal[i].p] as V, s: goal[i].s }; draw(0, true) }
  else frameId = raf(loop)

  return {
    handle(msg: SceneMsg) {
      if (msg.type === "resize") { resize(msg.w, msg.h); if (reduce) draw(0, true) }
      else if (msg.type === "scene") {
        if (msg.id === sceneId) return
        sceneId = msg.id
        goal = target(msg.id)
        offset.tx = msg.id === "inicio" && width >= 768 ? 4.5 : 0
        if (reduce) draw(0, true)
      } else if (msg.type === "mouse") { if (!reduce) { mouse.tx = msg.x; mouse.ty = msg.y } }
      else if (msg.type === "visible") {
        visible = msg.visible
        caf(frameId)
        if (visible && !reduce) frameId = raf(loop)
      }
    },
    dispose() {
      caf(frameId)
      geo.dispose(); mat.dispose(); renderer.dispose()
    },
  }
}
