import Head from 'next/head'
import NavBar from '@/components/NavBar'
import Hero from '@/components/Hero'
import AnimatedBackground from '@/components/AnimatedBackground'
import AgentCard from '@/components/AgentCard'
import Reasons from '@/components/Reasons'
import Footer from '@/components/Footer'
import {motion} from 'framer-motion'

export default function Home(){return (<>
  <Head>
    <title>ki.service – 24/7 KI‑Assistenten für Ihr Business</title>
    <meta name="description" content="Produktisierte GPT‑ und Voice‑Agenten: sofort einsatzbereit, DSGVO‑konform, B2B‑ready. Automatisieren Sie Kundenservice, Beratung & Support – ohne komplizierte Projekte."/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link rel="icon" href="/logo.png"/>
  </Head>
  <AnimatedBackground/><NavBar/>
  <main>
    <Hero/>
    <section id="agenten" className="py-12 md:py-16"><div className="mx-auto max-w-6xl px-4">
      <motion.h2 className="text-2xl md:text-3xl font-bold mb-8 text-white" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>Unsere <span className="text-accent">Agenten</span></motion.h2>
      <div className="grid md:grid-cols-3 gap-6">
        <AgentCard title="Support‑GPT" subtitle="Firmenspezifische Wissensbasis für Self‑Service & Chatbot." cta="Jetzt starten"/>
        <AgentCard title="Telefonberater · Voice‑Agent (Custom GPT)" subtitle="Voice‑Bots für Hotline & telefonische Beratung – natürlich & effizient." cta="Jetzt testen"/>
        <AgentCard title="Produktberater · GPT‑Agent (Custom GPT)" subtitle="Berät zu Produkten & Leistungen, steigert Conversion & Entlastung im Vertrieb." cta="Demo anfragen"/>
      </div>
      <div className="mt-6 grid md:grid-cols-3 gap-6">
        <AgentCard title="Verkaufsgesprächs‑führender Voice‑Agent" subtitle="Live ausprobieren – Coming Soon." comingSoon/>
      </div>
    </div></section>
    <Reasons/>
    <section id="problem" className="py-16"><div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-8 items-center">
      <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}}>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Viele investieren in KI – doch oft <span className="text-accent">verpufft</span> es im Projekt.</h2>
        <p className="text-white/80 mb-4">Wir liefern <strong>fertige, getestete Agenten</strong> statt PowerPoint‑Versprechen. Starten Sie in Tagen, nicht in Monaten – mit klaren KPIs und einem Setup, das sich an Ihre Prozesse anpasst.</p>
        <ul className="space-y-2 text-white/80 list-disc list-inside">
          <li>Messbare Entlastung im Support</li><li>Schnellere Reaktionszeiten & bessere Customer Experience</li><li>Skalierbare Automatisierungen ohne Vendor‑Lock‑in</li>
        </ul>
        <div className="mt-6"><a href="#kontakt" className="px-5 py-3 rounded-lg bg-primary text-black font-semibold hover:brightness-110">Unverbindliches Gespräch</a></div>
      </motion.div>
      <motion.div className="glow-border rounded-2xl p-6 min-h-[220px]" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}}>
        <h3 className="text-xl font-semibold mb-3">Drei Gründe, jetzt zu starten</h3>
        <ol className="space-y-3 list-decimal list-inside text-white/80">
          <li><strong>Sofortiger Effekt:</strong> Erste Agenten in wenigen Tagen live.</li>
          <li><strong>Kalkulierbare Kosten:</strong> Transparente Pakete & klare Laufzeiten.</li>
          <li><strong>Zukunftssicherheit:</strong> Moderne Architektur (Next.js, APIs, LLMs, RAG).</li>
        </ol>
      </motion.div>
    </div></section>
    <section id="kontakt" className="py-16 bg-[rgba(255,255,255,0.03)]"><div className="mx-auto max-w-3xl px-4">
      <motion.h2 className="text-2xl md:text-3xl font-bold mb-6 text-white" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>Kurz sprechen? Wir melden uns.</motion.h2>
      <form className="space-y-4" onSubmit={(e)=>{e.preventDefault(); alert('Danke! Wir melden uns umgehend bei Ihnen.');}}>
        <div className="grid md:grid-cols-2 gap-4">
          <div><label className="block text-sm mb-1">Vor- & Nachname</label><input type="text" required className="w-full rounded-md bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-primary focus:outline-none p-2"/></div>
          <div><label className="block text-sm mb-1">E‑Mail</label><input type="email" required className="w-full rounded-md bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-primary focus:outline-none p-2"/></div>
        </div>
        <div><label className="block text-sm mb-1">Ihr Anliegen</label><textarea rows={4} className="w-full rounded-md bg-white/5 border border-white/10 text-white p-2 focus:ring-2 focus:ring-primary focus:outline-none" placeholder="Kurze Beschreibung – z. B. 'Support‑Chatbot für E‑Commerce', 'Voice‑Agent für Hotline', etc."/></div>
        <button type="submit" className="px-5 py-3 rounded-lg bg-primary text-black font-semibold hover:brightness-110">Absenden</button>
      </form>
      <p className="text-xs text-white/50 mt-4">Oder senden Sie uns eine Mail an <a className="underline" href="mailto:kontakt@ki.service">kontakt@ki.service</a>.</p>
    </div></section>
  </main>
  <Footer/>
</>)}
