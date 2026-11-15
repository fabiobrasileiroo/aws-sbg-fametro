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

    // Checagem de preferência de movimento reduzido (WCAG 2.2)
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const w = container.clientWidth || 320
    const h = container.clientHeight || 200

    // Cena, Câmera e Renderizador WebGL
    const scene = new THREE.Scene()
    // Câmera posicionada com folga generosa para os anéis e estrelas nunca serem cortados
    const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 100)
    camera.position.set(0, 0, variant === "hero" ? 9.2 : 9.8)

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      })
    } catch {
      return
    }

    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.35
    renderer.domElement.style.overflow = "visible"
    container.appendChild(renderer.domElement)

    // Grupo Raiz da Nuvem (Mantida SEMPRE de frente para a câmera)
    const cloudRoot = new THREE.Group()
    if (variant === "flank-left") {
      cloudRoot.scale.set(0.85, 0.85, 0.85)
    } else if (variant === "flank-right") {
      cloudRoot.scale.set(0.85, 0.85, 0.85)
    }
    scene.add(cloudRoot)

    // Material de Nuvem Branca Sólida com acabamento Glossy / Frosted Glass (estilo 3D Keynote Apple/AWS)
    // Sólida, aveludada e opaca, sem transparência ou efeito fumaça, com camada de verniz/clearcoat
    const cloudMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0x0e1726,
      roughness: 0.28,
      metalness: 0.02,
      clearcoat: 0.8,
      clearcoatRoughness: 0.15,
      reflectivity: 0.9,
    })

    const puffGeom = new THREE.SphereGeometry(1, 30, 26)

    // Geometria clássica e harmoniosa de nuvem perfeitamente simétrica e fofa vista de frente
    const puffConfigs = [
      // Domo central superior
      { pos: [0, 0.22, 0], scale: [1.38, 1.35, 1.05] },
      // Pico do topo
      { pos: [0.28, 0.8, 0.04], scale: [1.12, 1.08, 0.95] },
      // Ombro esquerdo superior
      { pos: [-0.68, 0.56, -0.04], scale: [1.02, 0.98, 0.92] },
      // Flanco esquerdo médio
      { pos: [-1.32, 0.06, 0], scale: [1.08, 1.0, 0.94] },
      // Flanco esquerdo baixo (borda suave)
      { pos: [-2.05, -0.25, 0.04], scale: [0.82, 0.76, 0.8] },
      // Flanco direito médio
      { pos: [1.32, 0.1, 0], scale: [1.14, 1.04, 0.94] },
      // Flanco direito baixo (borda suave)
      { pos: [2.08, -0.22, 0.04], scale: [0.84, 0.78, 0.8] },
      // Base inferior reta e volumosa
      { pos: [-0.72, -0.32, 0.08], scale: [1.12, 0.74, 0.9] },
      { pos: [0.72, -0.32, 0.08], scale: [1.12, 0.74, 0.9] },
      { pos: [0, -0.38, 0.1], scale: [1.28, 0.68, 0.92] },
    ]

    puffConfigs.forEach(({ pos, scale }) => {
      const mesh = new THREE.Mesh(puffGeom, cloudMat)
      mesh.position.set(pos[0], pos[1], pos[2])
      mesh.scale.set(scale[0], scale[1], scale[2])
      cloudRoot.add(mesh)
    })

    // Grupo independente para anéis orbitais e constelações (que giram ao redor da nuvem fixa)
    const orbitGroup = new THREE.Group()
    scene.add(orbitGroup)

    // Anel orbital 1: Roxo AWS (#AD5CFF)
    const ring1Geom = new THREE.TorusGeometry(2.7, 0.024, 16, 80)
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0xad5cff,
      transparent: true,
      opacity: variant === "flank-right" ? 0.35 : 0.65,
    })
    const ring1 = new THREE.Mesh(ring1Geom, ring1Mat)
    ring1.rotation.x = Math.PI / 2.3
    ring1.rotation.y = Math.PI / 8
    orbitGroup.add(ring1)

    // Anel orbital 2: Azul Elétrico AWS (#42B4FF)
    const ring2Geom = new THREE.TorusGeometry(2.95, 0.02, 16, 80)
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x42b4ff,
      transparent: true,
      opacity: variant === "flank-left" ? 0.35 : 0.6,
    })
    const ring2 = new THREE.Mesh(ring2Geom, ring2Mat)
    ring2.rotation.x = Math.PI / 1.75
    ring2.rotation.z = Math.PI / 5
    orbitGroup.add(ring2)

    // Nuvenzinhas satélites sólidas orbitando ao redor
    const satGroup = new THREE.Group()
    scene.add(satGroup)

    const satMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0x0e1726,
      roughness: 0.3,
      metalness: 0.02,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
    })

    const sat1 = new THREE.Mesh(puffGeom, satMat)
    sat1.scale.set(0.32, 0.25, 0.25)
    sat1.position.set(-2.6, 0.9, 0.7)
    satGroup.add(sat1)

    const sat2 = new THREE.Mesh(puffGeom, satMat)
    sat2.scale.set(0.36, 0.28, 0.28)
    sat2.position.set(2.7, -0.7, -0.4)
    satGroup.add(sat2)

    // =========================================================================
    // UNIVERSO DE PONTINHOS CÓSMICOS & CONSTELAÇÕES AWS
    // =========================================================================
    const totalStars = variant === "hero" ? 280 : 150
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
      const isDistant = i % 3 === 0
      const r = isDistant ? 3.6 + Math.random() * 3.4 : 1.9 + Math.random() * 1.9
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.85
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
    const constellationLinesCount = variant === "hero" ? 48 : 22
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
      opacity: 0.24,
      blending: THREE.AdditiveBlending,
    })
    const constellationLines = new THREE.LineSegments(lineGeom, lineMat)
    scene.add(constellationLines)

    // =========================================================================
    // ILUMINAÇÃO DE DESTAQUE DUAL AWS (Sem sombras turvas)
    // =========================================================================
    // Luz frontal suave para realçar o branco porcelana e a fofura da nuvem
    const frontLight = new THREE.DirectionalLight(0xffffff, 1.6)
    frontLight.position.set(0, 1.5, 7)
    scene.add(frontLight)

    // Roxo vibrante no canto superior esquerdo
    const purpleLight = new THREE.PointLight(0xad5cff, 18, 30)
    purpleLight.position.set(-5, 4.5, 4.5)
    scene.add(purpleLight)

    // Azul Ciano elétrico no canto superior direito
    const blueLight = new THREE.PointLight(0x42b4ff, 15, 30)
    blueLight.position.set(5.5, -1.8, 3.5)
    scene.add(blueLight)

    // Toque quente suave na base
    const orangeAccent = new THREE.PointLight(0xff9900, 6, 20)
    orangeAccent.position.set(0, -4.5, 1)
    scene.add(orangeAccent)

    const ambientLight = new THREE.AmbientLight(0xf0f4fd, 1.8)
    scene.add(ambientLight)

    const initRaf = requestAnimationFrame(() => {
      setIsLoaded(true)
    })

    // =========================================================================
    // INTERATIVIDADE GLOBAL: O MOUSE EM QUALQUER LUGAR DA TELA MOVE A NUVEM
    // =========================================================================
    let targetTiltY = 0
    let targetTiltX = 0
    let curTiltY = 0
    let curTiltX = 0

    const baseAngleY = variant === "flank-left" ? 0.22 : variant === "flank-right" ? -0.22 : 0

    const onGlobalPointerMove = (e: PointerEvent) => {
      // Coordenadas normalizadas em relação à tela inteira [-0.5, 0.5]
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = e.clientY / window.innerHeight - 0.5

      // Leve inclinação 3D elegante (máximo ±12° em Y e ±9° em X) - Nuvem sempre de frente
      targetTiltY = Math.max(-0.22, Math.min(0.22, nx * 0.45))
      targetTiltX = Math.max(-0.16, Math.min(0.16, ny * 0.35))
    }

    const onGlobalPointerLeave = () => {
      targetTiltY = 0
      targetTiltX = 0
    }

    if (interactive) {
      window.addEventListener("pointermove", onGlobalPointerMove, { passive: true })
      window.addEventListener("pointerleave", onGlobalPointerLeave)
    }

    // Responsividade
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
        // Amortecimento suave e fluído
        curTiltY += (targetTiltY - curTiltY) * 0.06
        curTiltX += (targetTiltX - curTiltX) * 0.06

        // A nuvem fica SEMPRE de frente: flutua e desliza suavemente em direção ao mouse em qualquer lugar da tela
        cloudRoot.position.y = Math.sin(elapsed * 1.5) * 0.12 - curTiltX * 0.35
        cloudRoot.position.x = Math.cos(elapsed * 0.8) * 0.06 + curTiltY * 0.45
        cloudRoot.rotation.y = baseAngleY + curTiltY
        cloudRoot.rotation.x = curTiltX + Math.sin(elapsed * 0.8) * 0.03

        // Anéis orbitais giram continuamente em 3D ao redor da nuvem frontal
        ring1.rotation.z = elapsed * 0.45
        ring2.rotation.y = elapsed * -0.32

        // Órbita dos satélites
        sat1.position.x = Math.cos(elapsed * 0.7) * 2.8
        sat1.position.z = Math.sin(elapsed * 0.7) * 1.8
        sat1.position.y = Math.sin(elapsed * 1.2) * 0.4 + 0.6

        sat2.position.x = Math.cos(elapsed * 0.6 + Math.PI) * 2.9
        sat2.position.z = Math.sin(elapsed * 0.6 + Math.PI) * 2.0
        sat2.position.y = Math.cos(elapsed * 1.1) * 0.35 - 0.5

        // Rotação dinâmica do campo estelar cósmico acompanhando o mouse global
        starField.rotation.y = elapsed * 0.07 + curTiltY * 0.85
        starField.rotation.x = Math.sin(elapsed * 0.05) * 0.06 + curTiltX * 0.55

        // Linhas de constelação
        constellationLines.rotation.y = starField.rotation.y
        constellationLines.rotation.x = starField.rotation.x
        lineMat.opacity = 0.2 + Math.sin(elapsed * 2.5) * 0.08
      }

      renderer.render(scene, camera)
    }

    renderFrame()

    return () => {
      cancelAnimationFrame(initRaf)
      cancelAnimationFrame(reqId)
      window.removeEventListener("resize", onResize)
      if (interactive) {
        window.removeEventListener("pointermove", onGlobalPointerMove)
        window.removeEventListener("pointerleave", onGlobalPointerLeave)
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
