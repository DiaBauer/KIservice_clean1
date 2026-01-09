import {motion,AnimatePresence} from 'framer-motion'
import {useEffect,useState} from 'react'
import Image from 'next/image'
const MESSAGES=["GPT‑ & Voice‑Agenten beantworten Anfragen in Sekunden.","Ihr KI‑Service‑Agent entlastet Ihr Team – 24/7.","Messbar effizient: weniger Tickets, mehr Zeit für das Wesentliche."]
export default function Hero(){
  const [index,setIndex]=useState(0);useEffect(()=>{const id=setInterval(()=>setIndex(i=>(i+1)%MESSAGES.length),3200);return()=>clearInterval(id)},[])
  return (<section className="relative pt-28 pb-16 md:pt-32 md:pb-24 hero-gradient overflow-hidden">
    <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <motion.h1 className="text-4xl md:text-5xl font-extrabold leading-[1.15] text-white">"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  <span className="text-white">
    24/7&nbsp;<span className="text-accent">KI-Agenten</span> für Unternehmen&nbsp;–
  </span>
  <br />
  <span className="text-accent">
    ohne komplizierte KI-Projekte.
  </span>
</motion.h1>
        <motion.p className="mt-6 text-white/80 max-w-xl" initial={{opacity:0,y:20}} animate={{opacity:1,y:0,transition:{delay:0.2}}}>
          Wir liefern: <strong>KI‑Agenten, die Ergebnisse bringen.</strong> Automatisieren Sie Kundenservice, Beratung &amp; Support – mit sofort einsatzbereiten GPT‑ und Voice‑Agenten.
        </motion.p>
        <div className="mt-6 h-8 relative overflow-hidden">
          <AnimatePresence mode="wait"><motion.div key={index} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:0.4}} className="text-primary/90 font-medium">{MESSAGES[index]}</motion.div></AnimatePresence>
        </div>
        <div className="mt-8 flex items-center gap-4">
          <a href="#kontakt" className="px-5 py-3 rounded-lg bg-primary text-black font-semibold shadow-glow hover:brightness-110 hover:translate-y-[-1px] transition">Demo starten</a>
          <a href="#agenten" className="px-5 py-3 rounded-lg border border-primary/60 text-white hover:bg-white/10 transition">Agenten vergleichen</a>
        </div>
      </div>
            
      <motion.div className="relative h-[340px] md:h-[460px]" initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} transition={{duration:0.8}} viewport={{once:true}}>
        <Image src="/hero-brain.png" alt="Neurales Netz" fill className="object-contain pointer-events-none select-none" priority/>
      </motion.div>
    </div>
  </section>)
}
