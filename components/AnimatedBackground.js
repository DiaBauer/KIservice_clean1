import {useEffect,useRef} from 'react'
export default function AnimatedBackground(){
  const canvasRef=useRef(null)
  useEffect(()=>{
    const canvas=canvasRef.current;const ctx=canvas.getContext('2d')
    let animationId;let width=(canvas.width=window.innerWidth);let height=(canvas.height=window.innerHeight)
    const DPR=window.devicePixelRatio||1;canvas.width=width*DPR;canvas.height=height*DPR;ctx.scale(DPR,DPR)
    const count=Math.min(100,Math.floor((width*height)/14000))
    const pts=Array.from({length:count}).map(()=>({x:Math.random()*width,y:Math.random()*height,vx:(Math.random()-0.5)*0.6,vy:(Math.random()-0.5)*0.6}))
    function draw(){ctx.clearRect(0,0,width,height)
      const grad=ctx.createRadialGradient(width*0.7,height*0.25,50,width*0.7,height*0.25,Math.max(width,height))
      grad.addColorStop(0,'rgba(23,180,255,0.10)');grad.addColorStop(1,'transparent');ctx.fillStyle=grad;ctx.fillRect(0,0,width,height)
      for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>width)p.vx*=-1;if(p.y<0||p.y>height)p.vy*=-1}
      for(let i=0;i<pts.length;i++){for(let j=i+1;j<pts.length;j++){const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y;const d2=dx*dx+dy*dy;if(d2<25600){const a=1-Math.sqrt(d2)/160;ctx.strokeStyle=`rgba(23,180,255,${0.15*a})`;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.stroke()}}}
      for(const p of pts){ctx.beginPath();ctx.arc(p.x,p.y,1.6,0,Math.PI*2);ctx.fillStyle='rgba(245,184,0,0.8)';ctx.fill()}
      animationId=requestAnimationFrame(draw)}
    function onResize(){width=window.innerWidth;height=window.innerHeight;const DPR=window.devicePixelRatio||1;canvas.width=width*DPR;canvas.height=height*DPR;ctx.scale(DPR,DPR)}
    window.addEventListener('resize',onResize);draw();return()=>{cancelAnimationFrame(animationId);window.removeEventListener('resize',onResize)}
  },[])
  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" aria-hidden="true"/>
}
