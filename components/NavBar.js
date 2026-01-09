import Image from 'next/image'
import Link from 'next/link'
export default function NavBar(){
  return (<header className="fixed top-0 inset-x-0 z-40 bg-black border-b border-white/10">
    <div className="mx-auto max-w-6xl px-4 py-5 flex items-center justify-between">
      <div className="flex items-center gap-3 py-1">
        <Image
  src="/logo.png"
  width={72}
  height={72}
  alt="KI.service Logo"
  className="drop-shadow-lg"
  priority
/>
        <span className="text-white font-semibold">ki.service</span>
      </Link>
      <nav className="hidden md:flex items-center gap-8 text-sm text-white/80">
        <Link href="#problem" className="hover:text-white transition">Problem</Link>
        <Link href="#loesung" className="hover:text-white transition">Lösungen</Link>
        <Link href="#agenten" className="hover:text-white transition">Produkte</Link>
        <Link href="#kontakt" className="px-3 py-2 rounded-md bg-white/10 hover:bg-white/20">Demo starten</Link>
      </nav>
    </div>
  </header>)
}
