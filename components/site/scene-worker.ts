/// <reference lib="webworker" />
// Web Worker do fundo 3D: o three.js carrega, compila e desenha aqui, fora da thread principal da página
import type { SceneMsg } from "./scene-engine"

type Init = { type: "init"; canvas: OffscreenCanvas; w: number; h: number; reduceMotion: boolean; saveData: boolean }

let scene: { handle: (m: SceneMsg) => void; dispose: () => void } | null = null
const pending: SceneMsg[] = []

self.onmessage = async (e: MessageEvent<Init | SceneMsg | { type: "dispose" }>) => {
  const msg = e.data
  if (msg.type === "init") {
    const [THREE, { createScene }] = await Promise.all([import("three"), import("./scene-engine")])
    scene = createScene(THREE, msg.canvas, msg)
    pending.splice(0).forEach((m) => scene!.handle(m))
  } else if (msg.type === "dispose") {
    scene?.dispose()
    self.close()
  } else if (scene) scene.handle(msg)
  else pending.push(msg)
}
