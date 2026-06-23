import { BarChart2 } from 'lucide-react'

/**
 * Komponen navigasi bar — fixed di atas, dengan smooth scroll ke setiap section
 * @param {Function} onScrollTo - Callback untuk scroll ke section berdasarkan id
 */
export default function Navbar({ onScrollTo }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between bg-white/70 backdrop-blur-xl border-2 border-white/80 rounded-[2rem] px-5 py-3 shadow-lg shadow-purple-100/40">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-md shadow-violet-200">
            <BarChart2 className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-slate-800 text-lg tracking-tight">
            SPK <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-pink-500">UMKM</span>
          </span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {[['Beranda', 'hero'], ['Data', 'data'], ['Kalkulator', 'kalkulator'], ['Hasil', 'hasil']].map(([label, id]) => (
            <button key={id} onClick={() => onScrollTo(id)}
              className="px-4 py-2 rounded-2xl text-sm font-700 text-slate-600 hover:text-violet-600 hover:bg-violet-50 transition-all duration-200">
              {label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <button onClick={() => onScrollTo('kalkulator')}
          className="btn-kawaii bg-gradient-to-r from-violet-500 to-pink-500 text-white px-6 py-2.5 text-sm font-800 shadow-md shadow-violet-200">
          Mulai Simulasi
        </button>
      </div>
    </nav>
  )
}
