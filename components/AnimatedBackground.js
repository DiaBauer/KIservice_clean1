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

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * DPR
      canvas.height = height * DPR
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }

    resize()

    // ⭐ Premium-Parameter
    const STAR_COUNT = Math.min(180, Math.floor((width * height) / 9000))
    const SPEED = 0.12
    const LINK_DIST = 110

    const stars = Array.from({ length: STAR_COUNT }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      r: Math.random() * 1.4 + 0.6,
      phase: Math.random() * Math.PI * 2
    }))

    let t = 0

    function draw() {
      t += 0.015
      ctx.clearRect(0, 0, width, height)

      // 🌌 sanfter globaler Glow (über gesamte Seite)
      const glow = ctx.createRadialGradient(
        width * 0.6,
        height * 0.25,
        80,
        width * 0.6,
        height * 0.25,
        Math.max(width, height)
      )
      glow.addColorStop(0, 'rgba(23,180,255,0.08)')
      glow.addColorStop(1, 'transparent')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, width, height)

      // Bewegung
      for (const s of stars) {
        s.x += s.vx
        s.y += s.vy
        if (s.x < 0 || s.x > width) s.vx *= -1
        if (s.y < 0 || s.y > height) s.vy *= -1
      }

      // Linien
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x
          const dy = stars[i].y - stars[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < LINK_DIST) {
            const a = 1 - dist / LINK_DIST
            ctx.strokeStyle = `rgba(23,180,255,${0.10 * a})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(stars[i].x, stars[i].y)
            ctx.lineTo(stars[j].x, stars[j].y)
            ctx.stroke()
          }
        }
      }

      // Sterne (leicht pulsierend)
      for (const s of stars) {
        const pulse = Math.sin(t + s.phase) * 0.4
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r + pulse, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(245,184,0,0.75)'
        ctx.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}
