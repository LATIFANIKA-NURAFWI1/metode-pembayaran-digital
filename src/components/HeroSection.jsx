import { ChevronDown, Calculator, ArrowDown, Sparkles } from 'lucide-react'

/**
 * Komponen Hero Section — tampilan utama halaman dengan CTA
 * @param {Function} onScrollTo - Callback untuk smooth scroll ke section
 */
export default function HeroSection({ onScrollTo }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <img src="/images/bg.png" alt="bg" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 via-pink-50/40 to-yellow-50/70" />

      {/* Decorative bubbles */}
      <div className="deco-bubble w-96 h-96 bg-violet-400 top-10 -left-32" />
      <div className="deco-bubble w-72 h-72 bg-pink-400 bottom-20 -right-20" />
      <div className="deco-bubble w-60 h-60 bg-yellow-300 bottom-40 left-10" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 py-32 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border-2 border-white px-5 py-2.5 rounded-full text-sm font-800 text-violet-700 mb-8 shadow-lg shadow-violet-100/50">
          <Sparkles className="w-4 h-4 text-yellow-500" />
          Sistem Pendukung Keputusan · Metode TOPSIS
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-slate-800 mb-6 leading-tight">
          Pilih Pembayaran<br />
          <span className="shimmer-text">Digital Terbaik</span><br />
          untuk UMKM-mu!
        </h1>

        <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed font-600">
          Gunakan metode <strong>TOPSIS</strong> untuk menganalisis dan menemukan metode pembayaran digital
          paling ideal berdasarkan biaya, kemudahan, keamanan, kecepatan, dan popularitas.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => onScrollTo('kalkulator')}
            className="btn-kawaii group bg-gradient-to-r from-violet-500 to-pink-500 text-white px-10 py-4 text-lg font-800 shadow-xl shadow-violet-200 flex items-center gap-3">
            <Calculator className="w-6 h-6" />
            Mulai Simulasi
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>
          <button onClick={() => onScrollTo('data')}
            className="btn-kawaii bg-white/80 backdrop-blur-sm border-2 border-white text-slate-700 px-10 py-4 text-lg font-700 shadow-lg shadow-slate-200/60">
            Lihat Data
          </button>
        </div>

        <div className="mt-20 animate-bounce">
          <ChevronDown className="w-8 h-8 text-slate-400 mx-auto" />
        </div>
      </div>
    </section>
  )
}
