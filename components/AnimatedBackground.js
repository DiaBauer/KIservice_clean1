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
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0)

    // 🧠 FEINTUNING – neuronales Netz
    const POINTS = Math.min(160, Math.floor((width * height) / 9000))
    const SPEED = 0.12
    const LINK_DISTANCE = 140

    const pts = Array.from({ length: POINTS }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      r: Math.random() * 0.8 + 0.6
    }))

    function draw() {
      ctx.clearRect(0, 0, width, height)

      // 🌌 sehr dezenter Grundnebel
      const bg = ctx.createRadialGradient(
        width * 0.5,
        height * 0.25,
        80,
        width * 0.5,
        height * 0.25,
        Math.max(width, height)
      )
      bg.addColorStop(0, 'rgba(255,255,255,0.02)')
      bg.addColorStop(1, 'transparent')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, width, height)

      // Bewegung
      for (const p of pts) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
      }

      // 🔗 NEURONALE VERBINDUNGEN – KLAR & SICHTBAR
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < LINK_DISTANCE) {
            const strength = 1 - dist / LINK_DISTANCE
            ctx.strokeStyle = `rgba(255,255,255,${0.22 * strength})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      }

      // ✴ Knotenpunkte – technisch, nicht funkelnd
      for (const p of pts) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255,255,255,0.55)'
        ctx.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    function onResize() {
      width = window.innerWidth
      height = window.innerHeight
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

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  )
}
