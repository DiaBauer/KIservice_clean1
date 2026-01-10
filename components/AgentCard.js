import {motion} from 'framer-motion'
export default function AgentCard({title,subtitle,cta,comingSoon=false}){
  return (<motion.div className={`className="glow-border bg-white/5 backdrop-blur-sm p-6 rounded-2xl" ${comingSoon?'opacity-80':''}`} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}}>
    <h3 className="text-xl font-semibold text-white">{title}</h3>
    <p className="text-white/70 mt-2 min-h-[56px]">{subtitle}</p>
    <div className="mt-4">{comingSoon?<span className="inline-flex items-center rounded-md bg-white/10 text-white px-3 py-1 text-sm">Coming&nbsp;Soon</span>:<a href="#kontakt" className="inline-flex items-center rounded-md px-4 py-2 bg-white/10 text-white hover:bg-white/20 transition">{cta || 'Jetzt starten'}</a>}</div>
  </motion.div>)
}
