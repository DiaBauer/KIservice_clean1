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

    // 🔧 FEINTUNING-PARAMETER
    const POINTS = Math.min(140, Math.floor((width * height) / 11000)) // mehr Sterne
    const SPEED = 0.15 // deutlich ruhiger

    const pts = Array.from({ length: POINTS }).map((_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      baseR: Math.random() * 1.2 + 0.6,
      phase: Math.random() * Math.PI * 2,
      index: i
    }))

    let time = 0

    function draw() {
      time += 1
      ctx.clearRect(0, 0, width, height)

      // 🌌 Sanfter Lichtverlauf (ruhiger als vorher)
      const grad = ctx.createRadialGradient(
        width * 0.7,
        height * 0.25,
        60,
        width * 0.7,
        height * 0.25,
        Math.max(width, height)
      )
      grad.addColorStop(0, 'rgba(23,180,255,0.08)')
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)

      // ⭐ Bewegung & Begrenzung
      for (const p of pts) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
      }

      // 🔗 Dezente Linien (nur bei Nähe, sehr fein)
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 90) {
            const alpha = 1 - dist / 90
            ctx.strokeStyle = `rgba(23,180,255,${0.12 * alpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      }

      // ✨ Sterne mit leichtem Pulsieren
      for (const p of pts) {
        const pulse = Math.sin(time * 0.02 + p.phase) * 0.4
        const r = p.baseR + pulse

        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(245,184,0,0.75)'
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

  // 🌐 GANZSEITIGER HINTERGRUND
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      aria-hidden="true"
    />
  )
}

