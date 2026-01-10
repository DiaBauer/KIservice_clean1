import { useEffect, useRef } from 'react'

export default function AnimatedBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let animationId
    let width = window.innerWidth
    let height = window.innerHeight

    const DPR = window.devicePixelRatio || 1
    canvas.width = width * DPR
    canvas.height = height * DPR
    ctx.scale(DPR, DPR)

    /* ===============================
       FEINTUNING – NEURONEN-LOOK
    =============================== */
    const POINTS = Math.min(160, Math.floor((width * height) / 10000))
    const SPEED = 0.12
    const LINK_DIST = 120

    const pts = Array.from({ length: POINTS }).map(() => {
      const isWarm = Math.random() < 0.3 // 30% gelbe Akzente
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        r: Math.random() * 1.4 + 0.8,
        warm: isWarm,
        phase: Math.random() * Math.PI * 2,
      }
    })

    let t = 0

    function draw() {
      t += 1
      ctx.clearRect(0, 0, width, height)

      /* Sanfter Gesamtglow */
      const glow = ctx.createRadialGradient(
        width * 0.6,
        height * 0.2,
        80,
        width * 0.6,
        height * 0.2,
        Math.max(width, height)
      )
      glow.addColorStop(0, 'rgba(255,255,255,0.04)')
      glow.addColorStop(1, 'transparent')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, width, height)

      /* Bewegung */
      for (const p of pts) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
      }

      /* Verbindungs-Linien – neuronaler Fokus */
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)

          if (d < LINK_DIST) {
            const a = 1 - d / LINK_DIST
            ctx.strokeStyle = `rgba(255,255,255,${0.35 * a})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      }

      /* Knoten (weiß + gelb) */
      for (const p of pts) {
        const pulse = Math.sin(t * 0.02 + p.phase) * 0.4
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r + pulse, 0, Math.PI * 2)
        ctx.fillStyle = p.warm
          ? 'rgba(245,184,0,0.9)'     // warmes Gelb
          : 'rgba(255,255,255,0.9)'  // klares Weiß
        ctx.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    function onResize() {
      width = window.innerWidth
      height = window.innerHeight
      const DPR = window.devicePixelRatio || 1
      canvas.width = width * DPR
      canvas.height = height * DPR
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }

    window.addEventListener('resize', onResize)
    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  /* GANZSEITIG – UNTER HEADER + HERO */
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 pointer-events-none"
      aria-hidden="true"
    />
  )
}
