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

    // 🔧 FEINTUNING (ruhig, hochwertig)
    const POINTS = Math.min(160, Math.floor((width * height) / 10000))
    const SPEED = 0.12

    const pts = Array.from({ length: POINTS }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      baseR: Math.random() * 1.3 + 0.7,
      phase: Math.random() * Math.PI * 2
    }))

    let time = 0

    function draw() {
      time += 1
      ctx.clearRect(0, 0, width, height)

      // 🌌 Sehr dezenter globaler Lichtverlauf
      const grad = ctx.createRadialGradient(
        width * 0.6,
        height * 0.2,
        80,
        width * 0.6,
        height * 0.2,
        Math.max(width, height)
      )
      grad.addColorStop(0, 'rgba(23,180,255,0.06)')
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)

      // ⭐ Bewegung
      for (const p of pts) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
      }

      // 🔗 Linien (sehr subtil)
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 100) {
            const alpha = 1 - dist / 100
            ctx.strokeStyle = `rgba(23,180,255,${0.10 * alpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      }

      // ✨ Sterne mit leichtem Puls
      for (const p of pts) {
        const pulse = Math.sin(time * 0.02 + p.phase) * 0.4
        const r = p.baseR + pulse
        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(245,184,0,0.65)'
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
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}
