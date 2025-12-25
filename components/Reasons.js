import {motion} from 'framer-motion'
const items=[
  {title:'Produkt statt Projekt',text:'Keine langen Beratungsphasen – sofort einsatzbereite Agenten.'},
  {title:'B2B‑ready & DSGVO‑konform',text:'Gehostet in Deutschland, verschlüsselt & skalierbar.'},
  {title:'Technologie, die liefert',text:'GPT‑gestützt, selbstverwaltbar, mit messbarem ROI.'},
]
export default function Reasons(){
  return (<section id="loesung" className="py-16 bg-[rgba(255,255,255,0.02)]">
    <div className="mx-auto max-w-6xl px-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">Warum <span className="text-accent">ki.service?</span></h2>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((it,idx)=>(<motion.div key={it.title} className="glow-border p-6 rounded-2xl h-full" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5,delay:idx*0.05}}>
          <h3 className="text-lg font-semibold text-white">{it.title}</h3><p className="text-white/70 mt-2">{it.text}</p>
        </motion.div>))}
      </div>
    </div>
  </section>)
}
