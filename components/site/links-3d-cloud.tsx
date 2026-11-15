"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

interface Links3DCloudProps {
  className?: string
  interactive?: boolean
  variant?: "hero" | "flank-left" | "flank-right"
}

export function Links3DCloud({
  className,
  interactive = true,
  variant = "hero",
}: Links3DCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Checagem de acessibilidade: redução de movimento (WCAG 2.2)
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const w = container.clientWidth || 320
    const h = container.clientHeight || 200

    // Cena, Câmera e Renderizador WebGL
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100)
    camera.position.set(0, 0, variant === "hero" ? 7.6 : 8.2)

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      })
    } catch {
      // Fallback gracioso caso WebGL não esteja disponível
      return
    }

    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.3
    container.appendChild(renderer.domElement)

    // Grupo Raiz da Nuvem
    const cloudRoot = new THREE.Group()
    if (variant === "flank-left") {
      cloudRoot.rotation.y = 0.28
      cloudRoot.scale.set(0.85, 0.85, 0.85)
    } else if (variant === "flank-right") {
      cloudRoot.rotation.y = -0.28
      cloudRoot.scale.set(0.85, 0.85, 0.85)
    }
    scene.add(cloudRoot)

    // Material de Nuvem Branca Perolada / Iridescente (AWS Modern 3D Keynote Style)
    // Reflete suavemente as luzes roxa e azul da AWS nas bordas e mantém o corpo branco luminoso
    const cloudMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0x162032,
      roughness: 0.18,
      metalness: 0.04,
      transmission: 0.42,
      thickness: 1.8,
      transparent: true,
      opacity: 0.96,
      reflectivity: 0.6,
      clearcoat: 0.65,
      clearcoatRoughness: 0.15,
    })

    const puffGeom = new THREE.SphereGeometry(1, 28, 24)

    // Volumes esféricos que formam o contorno clássico da nuvem
    const puffConfigs = [
      { pos: [0, 0, 0], scale: [1.45, 1.2, 1.15] },
      { pos: [-1.25, -0.2, 0.15], scale: [1.1, 0.95, 0.95] },
      { pos: [1.3, -0.15, -0.1], scale: [1.15, 1.0, 1.0] },
      { pos: [-2.1, -0.4, 0.2], scale: [0.8, 0.7, 0.75] },
      { pos: [2.15, -0.38, 0.15], scale: [0.85, 0.75, 0.8] },
      { pos: [0.3, 0.8, 0.1], scale: [1.2, 1.1, 1.05] },
      { pos: [-0.7, 0.6, -0.15], scale: [1.0, 0.95, 0.9] },
      { pos: [0, -0.45, 0.5], scale: [1.3, 0.65, 0.8] },
      { pos: [0.2, 0.1, -0.75], scale: [1.05, 0.9, 0.85] },
    ]

    puffConfigs.forEach(({ pos, scale }) => {
      const mesh = new THREE.Mesh(puffGeom, cloudMat)
      mesh.position.set(pos[0], pos[1], pos[2])
      mesh.scale.set(scale[0], scale[1], scale[2])
      cloudRoot.add(mesh)
    })

    // Anel orbital 1: Roxo AWS (#AD5CFF)
    const ring1Geom = new THREE.TorusGeometry(3.15, 0.026, 16, 80)
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0xad5cff,
      transparent: true,
      opacity: variant === "flank-right" ? 0.25 : 0.6,
    })
    const ring1 = new THREE.Mesh(ring1Geom, ring1Mat)
    ring1.rotation.x = Math.PI / 2.3
    ring1.rotation.y = Math.PI / 8
    cloudRoot.add(ring1)

    // Anel orbital 2: Azul Elétrico AWS (#42B4FF)
    const ring2Geom = new THREE.TorusGeometry(3.4, 0.02, 16, 80)
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x42b4ff,
      transparent: true,
      opacity: variant === "flank-left" ? 0.25 : 0.55,
    })
    const ring2 = new THREE.Mesh(ring2Geom, ring2Mat)
    ring2.rotation.x = Math.PI / 1.75
    ring2.rotation.z = Math.PI / 5
    cloudRoot.add(ring2)

    // Nuvenzinhas satélites orbitando em branco perolado
    const satelliteGroup = new THREE.Group()
    scene.add(satelliteGroup)

    const satMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.25,
      metalness: 0.05,
      transmission: 0.35,
      thickness: 1.2,
      transparent: true,
      opacity: 0.9,
    })

    const sat1 = new THREE.Mesh(puffGeom, satMat)
    sat1.scale.set(0.35, 0.28, 0.28)
    sat1.position.set(-3.2, 1.2, 0.8)
    satelliteGroup.add(sat1)

    const sat2 = new THREE.Mesh(puffGeom, satMat)
    sat2.scale.set(0.42, 0.32, 0.32)
    sat2.position.set(3.4, -0.9, -0.5)
    satelliteGroup.add(sat2)

    // =========================================================================
    // UNIVERSO DE PONTINHOS CÓSMICOS & CONSTELAÇÕES ("efeitos vários muito top")
    // =========================================================================
    const totalStars = variant === "hero" ? 280 : 160
    const starGeom = new THREE.BufferGeometry()
    const starPositions = new Float32Array(totalStars * 3)
    const starColors = new Float32Array(totalStars * 3)

    const awsUniversePalette = [
      new THREE.Color(0xffffff), // Estrela branca brilhante
      new THREE.Color(0xad5cff), // Roxo AWS
      new THREE.Color(0x42b4ff), // Azul AWS
      new THREE.Color(0xff57e9), // Rosa AWS
      new THREE.Color(0x00e582), // Verde AWS
      new THREE.Color(0xff9900), // Laranja AWS
      new THREE.Color(0xc99bff), // Roxo suave
      new THREE.Color(0x75d5ff), // Ciano claro
    ]

    for (let i = 0; i < totalStars; i++) {
      // Distribuição em duas camadas: estrelas orbitando a nuvem e estrelas profundas do cosmos
      const isDistant = i % 3 === 0
      const r = isDistant ? 4.5 + Math.random() * 5.5 : 2.2 + Math.random() * 2.8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.8
      starPositions[i * 3 + 2] = r * Math.cos(phi)

      const col = awsUniversePalette[i % awsUniversePalette.length]
      starColors[i * 3] = col.r
      starColors[i * 3 + 1] = col.g
      starColors[i * 3 + 2] = col.b
    }

    starGeom.setAttribute("position", new THREE.BufferAttribute(starPositions, 3))
    starGeom.setAttribute("color", new THREE.BufferAttribute(starColors, 3))

    const starMat = new THREE.PointsMaterial({
      size: 0.085,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    })
    const starField = new THREE.Points(starGeom, starMat)
    scene.add(starField)

    // Linhas de Constelação Geométrica entre estrelas próximas
    const constellationLinesCount = variant === "hero" ? 50 : 25
    const linePositions = new Float32Array(constellationLinesCount * 2 * 3)
    let lineIdx = 0

    for (let i = 0; i < totalStars && lineIdx < constellationLinesCount; i += 3) {
      const p1 = new THREE.Vector3(starPositions[i * 3], starPositions[i * 3 + 1], starPositions[i * 3 + 2])
      for (let j = i + 1; j < Math.min(i + 8, totalStars) && lineIdx < constellationLinesCount; j++) {
        const p2 = new THREE.Vector3(starPositions[j * 3], starPositions[j * 3 + 1], starPositions[j * 3 + 2])
        if (p1.distanceTo(p2) < 2.0) {
          linePositions[lineIdx * 6] = p1.x
          linePositions[lineIdx * 6 + 1] = p1.y
          linePositions[lineIdx * 6 + 2] = p1.z
          linePositions[lineIdx * 6 + 3] = p2.x
          linePositions[lineIdx * 6 + 4] = p2.y
          linePositions[lineIdx * 6 + 5] = p2.z
          lineIdx++
        }
      }
    }

    const lineGeom = new THREE.BufferGeometry()
    lineGeom.setAttribute("position", new THREE.BufferAttribute(linePositions.slice(0, lineIdx * 6), 3))
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xad5cff,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    })
    const constellationLines = new THREE.LineSegments(lineGeom, lineMat)
    scene.add(constellationLines)

    // Iluminação Dual AWS (Roxo & Azul elétrico sobre o corpo branco da nuvem)
    const purpleLight = new THREE.PointLight(0xad5cff, 15, 30)
    purpleLight.position.set(-5, 4, 4.5)
    scene.add(purpleLight)

    const blueLight = new THREE.PointLight(0x42b4ff, 13, 30)
    blueLight.position.set(5.5, -2, 3.5)
    scene.add(blueLight)

    const orangeAccent = new THREE.PointLight(0xff9900, 5, 20)
    orangeAccent.position.set(0, -4.5, -2)
    scene.add(orangeAccent)

    const ambientLight = new THREE.AmbientLight(0xf4f7fd, 2.2)
    scene.add(ambientLight)

    const initRaf = requestAnimationFrame(() => {
      setIsLoaded(true)
    })

    // Interatividade com Mouse / Toque / Giro Cósmico
    let targetRotY = 0
    let targetRotX = 0
    let curRotY = 0
    let curRotX = 0
    let isDragging = false
    let lastX = 0
    let lastY = 0
    let dragVelocityX = 0
    let dragVelocityY = 0

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true
      lastX = e.clientX
      lastY = e.clientY
      container.setPointerCapture?.(e.pointerId)
    }

    const onPointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const dx = e.clientX - lastX
        const dy = e.clientY - lastY
        dragVelocityX = dx * 0.007
        dragVelocityY = dy * 0.007
        targetRotY += dragVelocityX
        targetRotX += dragVelocityY
        lastX = e.clientX
        lastY = e.clientY
      } else {
        const rect = container.getBoundingClientRect()
        const nx = (e.clientX - rect.left) / rect.width - 0.5
        const ny = (e.clientY - rect.top) / rect.height - 0.5
        targetRotY = nx * 0.95
        targetRotX = ny * 0.65
      }
    }

    const onPointerUp = (e: PointerEvent) => {
      isDragging = false
      container.releasePointerCapture?.(e.pointerId)
    }

    if (interactive) {
      container.addEventListener("pointerdown", onPointerDown)
      window.addEventListener("pointermove", onPointerMove, { passive: true })
      window.addEventListener("pointerup", onPointerUp)
      window.addEventListener("pointercancel", onPointerUp)
    }

    // Responsividade ao redimensionar
    const onResize = () => {
      if (!container) return
      const nw = container.clientWidth
      const nh = container.clientHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener("resize", onResize)

    // Loop de Animação 60fps
    let reqId: number
    const clock = new THREE.Clock()

    const renderFrame = () => {
      reqId = requestAnimationFrame(renderFrame)
      const elapsed = clock.getElapsedTime()

      if (!prefersReducedMotion) {
        // Amortecimento suave e inércia de rotação
        curRotY += (targetRotY - curRotY) * 0.06
        curRotX += (targetRotX - curRotX) * 0.06

        if (!isDragging) {
          dragVelocityX *= 0.95
          dragVelocityY *= 0.95
          targetRotY += dragVelocityX
          targetRotX += dragVelocityY
        }

        // Flutuação natural da nuvem branca
        cloudRoot.position.y = Math.sin(elapsed * 1.5) * 0.14
        cloudRoot.position.x = Math.cos(elapsed * 0.9) * 0.08
        cloudRoot.rotation.y = elapsed * 0.22 + curRotY * 1.8
        cloudRoot.rotation.x = curRotX * 1.2 + Math.sin(elapsed * 0.8) * 0.06

        // Rotação dos anéis orbitais
        ring1.rotation.z = elapsed * 0.45
        ring2.rotation.y = elapsed * -0.32

        // Órbita dos satélites brancos
        sat1.position.x = Math.cos(elapsed * 0.7) * 3.4
        sat1.position.z = Math.sin(elapsed * 0.7) * 2.2
        sat1.position.y = Math.sin(elapsed * 1.2) * 0.6 + 0.8

        sat2.position.x = Math.cos(elapsed * 0.6 + Math.PI) * 3.6
        sat2.position.z = Math.sin(elapsed * 0.6 + Math.PI) * 2.5
        sat2.position.y = Math.cos(elapsed * 1.1) * 0.5 - 0.7

        // Rotação dinâmica do campo estelar / universo cósmico
        starField.rotation.y = elapsed * 0.08 + curRotY * 0.5
        starField.rotation.x = Math.sin(elapsed * 0.05) * 0.08 + curRotX * 0.3

        // Pulsação suave das linhas de constelação
        constellationLines.rotation.y = starField.rotation.y
        constellationLines.rotation.x = starField.rotation.x
        lineMat.opacity = 0.18 + Math.sin(elapsed * 2.5) * 0.08
      }

      renderer.render(scene, camera)
    }

    renderFrame()

    return () => {
      cancelAnimationFrame(initRaf)
      cancelAnimationFrame(reqId)
      window.removeEventListener("resize", onResize)
      if (interactive) {
        container.removeEventListener("pointerdown", onPointerDown)
        window.removeEventListener("pointermove", onPointerMove)
        window.removeEventListener("pointerup", onPointerUp)
        window.removeEventListener("pointercancel", onPointerUp)
      }

      puffGeom.dispose()
      cloudMat.dispose()
      ring1Geom.dispose()
      ring1Mat.dispose()
      ring2Geom.dispose()
      ring2Mat.dispose()
      satMat.dispose()
      starGeom.dispose()
      starMat.dispose()
      lineGeom.dispose()
      lineMat.dispose()
      renderer.dispose()
      if (renderer.domElement.parentElement) {
        renderer.domElement.remove()
      }
    }
  }, [interactive, variant])

  return (
    <div
      ref={containerRef}
      className={`relative select-none touch-none ${className ?? ""}`}
      style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)" }}
      aria-hidden="true"
    />
  )
}
