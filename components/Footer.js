export default function Footer(){return (<footer className="border-t border-white/10 py-8 bg-black/40">
  <div className="mx-auto max-w-6xl px-4 text-sm text-white/70 grid md:grid-cols-2 gap-6">
    <div className="space-y-2">
      <div className="font-semibold text-white">ki.service</div>
      <div>Ihr KI‑Service‑Partner für produktisierte GPT‑ und Voice‑Agenten.</div>
      <div>Kontakt: <a href="mailto:kontakt@ki.service" className="underline decoration-dotted">kontakt@ki.service</a> · <a href="mailto:info@ki.service" className="underline decoration-dotted">info@ki.service</a></div>
    </div>
    <div className="grid grid-cols-2 gap-2 md:justify-end md:text-right">
      <a href="/impressum" className="hover:text-white">Impressum</a>
      <a href="/agb" className="hover:text-white">AGB</a>
      <a href="/datenschutz" className="hover:text-white">Datenschutz</a>
      <a href="/eu-ai-pact" className="hover:text-white">EU AI Act / DSGVO</a>
    </div>
  </div>
  <div className="mx-auto max-w-6xl px-4 mt-6 text-xs text-white/40">© {new Date().getFullYear()} ki.service · Alle Rechte vorbehalten.</div>
</footer>)}
