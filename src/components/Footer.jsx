import { BarChart2 } from 'lucide-react'

/**
 * Komponen Footer — bagian bawah halaman dengan info project
 */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900" />
      <div className="deco-bubble w-80 h-80 bg-violet-600 top-0 right-0" />
      <div className="deco-bubble w-60 h-60 bg-pink-600 bottom-0 left-0" />

      <div className="relative z-10 text-slate-400 py-14 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-900/50">
              <BarChart2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-white text-xl">
              SPK <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">UMKM</span>
            </span>
          </div>

          <p className="text-sm mb-2 font-500">
            Sistem Pendukung Keputusan Pemilihan Metode Pembayaran Digital UMKM
          </p>
          <p className="text-sm font-500">
            Menggunakan Metode <strong className="text-violet-400">TOPSIS</strong> · Berbasis Client-Side React
          </p>
          <div className="mt-6 pt-6 border-t border-slate-800 text-xs text-slate-600">
            © {new Date().getFullYear()} SPK UMKM · Built using React &amp; Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  )
}
