import { useState, useMemo, useRef } from 'react'
import {
  ChevronDown, Star, Trophy, Shield, Zap, DollarSign,
  BarChart2, Calculator, Table2, CheckCircle2, ArrowDown,
  Sparkles, TrendingUp, Award, Info
} from 'lucide-react'
import './index.css'

/* ─── DEFAULT DATA ─── */
const DEFAULT_CRITERIA = [
  { id: 'C1', name: 'Biaya Transaksi',    type: 'Cost',    weight: 40 },
  { id: 'C2', name: 'Kemudahan',          type: 'Benefit', weight: 27 },
  { id: 'C3', name: 'Keamanan',           type: 'Benefit', weight: 24 },
  { id: 'C4', name: 'Kecepatan',          type: 'Benefit', weight:  6 },
  { id: 'C5', name: 'Popularitas',        type: 'Benefit', weight:  4 },
]

const DEFAULT_ALTERNATIVES = [
  { id: 'A1', name: 'QRIS',               values: [1.61, 4.39, 4.24, 4.24, 4.24] },
  { id: 'A2', name: 'E-Wallet',           values: [2.25, 3.88, 3.64, 3.91, 3.91] },
  { id: 'A3', name: 'Transfer Bank',      values: [3.36, 3.59, 4.12, 3.65, 3.65] },
  { id: 'A4', name: 'Kartu Debit/Kredit', values: [1.63, 3.53, 4.06, 3.88, 3.88] },
]

/* ─── TOPSIS ENGINE (UNCHANGED) ─── */
function computeTopsis(alternatives, criteria) {
  const n = alternatives.length
  const m = criteria.length

  const totalW = criteria.reduce((s, c) => s + Number(c.weight), 0)
  const W = criteria.map(c => Number(c.weight) / (totalW || 1))

  const denom = Array.from({ length: m }, (_, j) => {
    const sq = alternatives.reduce((s, a) => s + Math.pow(Number(a.values[j]), 2), 0)
    return Math.sqrt(sq) || 1
  })
  const R = alternatives.map(a => a.values.map((v, j) => Number(v) / denom[j]))
  const Y = R.map(row => row.map((r, j) => r * W[j]))

  const Aplus  = Array.from({ length: m }, (_, j) => {
    const col = Y.map(row => row[j])
    return criteria[j].type === 'Benefit' ? Math.max(...col) : Math.min(...col)
  })
  const Aminus = Array.from({ length: m }, (_, j) => {
    const col = Y.map(row => row[j])
    return criteria[j].type === 'Benefit' ? Math.min(...col) : Math.max(...col)
  })

  const Dplus  = Y.map(row => Math.sqrt(row.reduce((s, y, j) => s + Math.pow(y - Aplus[j],  2), 0)))
  const Dminus = Y.map(row => Math.sqrt(row.reduce((s, y, j) => s + Math.pow(y - Aminus[j], 2), 0)))

  const Vi = alternatives.map((a, i) => {
    const denom = Dplus[i] + Dminus[i]
    return { ...a, Vi: denom === 0 ? 0 : Dminus[i] / denom }
  })

  const ranked = [...Vi].sort((a, b) => b.Vi - a.Vi).map((a, i) => ({ ...a, rank: i + 1 }))
  return { R, Y, Aplus, Aminus, Dplus, Dminus, Vi, ranked, W }
}

/* ─── HELPER ─── */
const f = (v, d = 4) => Number(v).toFixed(d)

/* ═══════════════════════════════════════════
   COMPONENTS
═══════════════════════════════════════════ */

// ──────── NAVBAR ────────
function Navbar({ onScrollTo }) {
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

// ──────── HERO SECTION ────────
function HeroSection({ onScrollTo }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <img src="/bg.png" alt="bg" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 via-pink-50/40 to-yellow-50/70" />

      {/* Decorative bubbles */}
      <div className="deco-bubble w-96 h-96 bg-violet-400 top-10 -left-32" />
      <div className="deco-bubble w-72 h-72 bg-pink-400 bottom-20 -right-20" />
      <div className="deco-bubble w-60 h-60 bg-yellow-300 bottom-40 left-10" />

      {/* Floating mascot right */}
      <div className="absolute right-8 top-24 hidden lg:block z-10">
        <img
          src="/roket.png"
          alt="Maskot Roket"
          className="w-56 h-56 object-contain mascot-peek"
          style={{ filter: 'drop-shadow(0 20px 40px rgba(124,58,237,0.25))' }}
        />
        {/* Sparkle dots around mascot */}
        <div className="sparkle-dot bg-yellow-300" style={{ top: '10%', right: '10%', animationDelay: '0s' }} />
        <div className="sparkle-dot bg-pink-400" style={{ top: '30%', right: '-10%', animationDelay: '1s' }} />
        <div className="sparkle-dot bg-violet-400" style={{ top: '60%', right: '5%', animationDelay: '2s' }} />
      </div>

      {/* Small floating mascot left */}
      <div className="absolute left-6 bottom-32 hidden xl:block z-10">
        <img
          src="/koin.png"
          alt="Maskot Koin"
          className="w-28 h-28 object-contain float-2 opacity-80"
          style={{ filter: 'drop-shadow(0 10px 20px rgba(251,191,36,0.4))' }}
        />
      </div>

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

// ──────── DATA TABLE SECTION ────────
function DataSection({ alternatives, criteria }) {
  return (
    <section id="data" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-50/30 to-blue-50/20 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <div className="section-pill bg-blue-100 text-blue-700 shadow-blue-100">
            <Table2 className="w-4 h-4" /> Data Default
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="gradient-title">Matriks Penilaian Awal</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto font-500">
            Data matriks keputusan dan bobot kriteria yang digunakan sebagai nilai default dalam perhitungan TOPSIS.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Criteria & Weights */}
          <div className="glass-card p-7">
            <h3 className="font-900 text-slate-800 text-base mb-5 flex items-center gap-2">
              {/* Maskot kecil ngintip di sebelah judul */}
              <img src="/koin.png" alt="maskot" className="w-8 h-8 object-contain float-1" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500">
                Kriteria &amp; Bobot
              </span>
            </h3>
            <div className="space-y-3">
              {criteria.map((c) => (
                <div key={c.id} className="flex items-center justify-between bg-white/60 rounded-2xl px-4 py-2.5 shadow-sm hover:scale-[1.02] transition-transform">
                  <div>
                    <span className="font-800 text-slate-700 text-sm">{c.id}</span>
                    <span className="text-slate-500 text-sm ml-2">{c.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-800 ${c.type === 'Benefit' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {c.type}
                    </span>
                    <span className="font-900 text-violet-600 text-sm">{c.weight}%</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100/80 flex justify-between">
              <span className="text-sm font-700 text-slate-600">Total Bobot</span>
              <span className="font-900 text-slate-800">{criteria.reduce((s, c) => s + Number(c.weight), 0)}%</span>
            </div>
          </div>

          {/* Decision Matrix */}
          <div className="lg:col-span-2 glass-card p-7">
            <h3 className="font-900 text-slate-800 text-base mb-5 flex items-center gap-2">
              <img src="/roket.png" alt="maskot" className="w-8 h-8 object-contain float-3" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
                Matriks Keputusan (X)
              </span>
            </h3>
            <div className="table-wrap">
              <table className="cute-table">
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left' }}>Alternatif</th>
                    {criteria.map(c => <th key={c.id}>{c.id}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {alternatives.map((a, i) => (
                    <tr key={a.id}>
                      <td>
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 flex items-center justify-center bg-gradient-to-br from-violet-400 to-pink-400 text-white text-xs font-900 rounded-xl shadow-sm">{a.id}</span>
                          <span className="font-700 text-slate-700">{a.name}</span>
                        </div>
                      </td>
                      {a.values.map((v, j) => (
                        <td key={j} className="text-center font-700 text-slate-600">{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ──────── CALCULATOR SECTION ────────
function CalculatorSection({ alternatives, setAlternatives, criteria, setCriteria }) {
  const handleValueChange = (altIdx, critIdx, val) => {
    setAlternatives(prev => {
      const next = prev.map((a, ai) => ai !== altIdx ? a : {
        ...a,
        values: a.values.map((v, ci) => ci !== critIdx ? v : val)
      })
      return next
    })
  }

  const handleWeightChange = (critIdx, val) => {
    setCriteria(prev => prev.map((c, i) => i !== critIdx ? c : { ...c, weight: val }))
  }

  const totalWeight = criteria.reduce((s, c) => s + Number(c.weight), 0)
  const weightOk = Math.abs(totalWeight - 100) < 0.01

  return (
    <section id="kalkulator" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/40 via-violet-50/30 to-blue-50/20 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto">

        {/* Heading with mascot peek */}
        <div className="text-center mb-14 relative">
          <div className="section-pill bg-pink-100 text-pink-700 shadow-pink-100">
            <Calculator className="w-4 h-4" /> Kalkulator Simulasi
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-2 flex items-center justify-center gap-3 flex-wrap">
            <img src="/koin.png" alt="maskot kecil" className="w-12 h-12 object-contain mascot-peek hidden sm:inline-block" />
            <span className="gradient-title">Atur Nilai &amp; Bobot</span>
            <span className="text-slate-800"></span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto font-500 mt-3">
            Ubah nilai matriks dan bobot kriteria sesuai kebutuhan bisnis kamu. Hasil perhitungan akan berubah secara otomatis.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Weight inputs */}
          <div className="glass-card p-7">
            <h3 className="font-900 text-slate-800 text-base mb-5 flex items-center gap-2">
              <img src="/shield.png" alt="maskot" className="w-8 h-8 object-contain float-2" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 text-sm">
                Bobot Kriteria (%)
              </span>
            </h3>
            <div className="space-y-4">
              {criteria.map((c, i) => (
                <div key={c.id}>
                  <label className="flex items-center justify-between mb-2">
                    <span className="text-sm font-800 text-slate-700">{c.id}: {c.name}</span>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-800 ${c.type === 'Benefit' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {c.type}
                    </span>
                  </label>
                  <input
                    type="number"
                    className="clay-input"
                    value={c.weight}
                    step="0.1"
                    onChange={e => handleWeightChange(i, e.target.value)}
                  />
                </div>
              ))}
              <div className={`flex items-center justify-between mt-3 p-3 rounded-2xl ${weightOk ? 'bg-green-50/80 border-2 border-green-200' : 'bg-red-50/80 border-2 border-red-200'}`}>
                <span className="text-sm font-700 text-slate-700">Total:</span>
                <span className={`font-900 text-base ${weightOk ? 'text-green-600' : 'text-red-600'}`}>
                  {totalWeight.toFixed(1)}% {weightOk ? '✓' : '⚠️'}
                </span>
              </div>
              {!weightOk && (
                <p className="text-xs text-red-500 font-700 text-center bg-red-50 rounded-xl py-2">Total bobot harus = 100%</p>
              )}
            </div>
          </div>

          {/* Matrix inputs */}
          <div className="lg:col-span-3 glass-card p-7">
            <h3 className="font-900 text-slate-800 text-base mb-5 flex items-center gap-2">
              <img src="/roket.png" alt="maskot" className="w-8 h-8 object-contain float-1" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-pink-500 text-sm">
                Nilai Matriks Keputusan (X)
              </span>
            </h3>
            <div className="table-wrap">
              <table className="cute-table">
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', minWidth: '120px' }}>Alternatif</th>
                    {criteria.map(c => (
                      <th key={c.id} style={{ minWidth: '90px' }}>
                        {c.id}
                        <div style={{ fontWeight: 600, fontSize: '0.7rem', color: '#be185d', opacity: 0.7, textTransform: 'none', letterSpacing: 'normal' }}>
                          {c.name.split(' ')[0]}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {alternatives.map((a, ai) => (
                    <tr key={a.id}>
                      <td>
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 flex items-center justify-center bg-gradient-to-br from-violet-400 to-pink-400 text-white text-xs font-900 rounded-xl shadow-sm flex-shrink-0">{a.id}</span>
                          <span className="font-700 text-slate-700 text-xs">{a.name}</span>
                        </div>
                      </td>
                      {a.values.map((v, ci) => (
                        <td key={ci} className="py-2 px-2">
                          <input
                            type="number"
                            className="clay-input"
                            value={v}
                            step="0.01"
                            onChange={e => handleValueChange(ai, ci, e.target.value)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Tip box */}
        <div className="flex items-start gap-3 bg-blue-50/80 backdrop-blur-sm border-2 border-blue-200/60 rounded-[1.5rem] p-5">
          <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700 font-600">
            <strong>Tips:</strong> Ubah nilai pada tabel di atas dan hasil perhitungan TOPSIS di bawah akan berubah secara <em>real-time</em> secara otomatis. Pastikan total bobot = 100%.
          </p>
        </div>
      </div>
    </section>
  )
}

// ──────── TOPSIS STEPS SECTION ────────
function TopsisStepsSection({ result, criteria, alternatives }) {
  const { R, Y, Aplus, Aminus, Dplus, Dminus, Vi, W } = result

  const TableCard = ({ title, icon, gradFrom, gradTo, children }) => (
    <div className="glass-card p-7 mb-6">
      <h3 className="font-900 text-slate-800 text-base mb-5 flex items-center gap-2">
        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradFrom} ${gradTo}`}>{icon}</span>
        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradFrom} ${gradTo}`}>{title}</span>
      </h3>
      <div className="table-wrap">{children}</div>
    </div>
  )

  const MatrixTable = ({ data }) => (
    <table className="cute-table">
      <thead>
        <tr>
          <th style={{ textAlign: 'left' }}>Alternatif</th>
          {criteria.map(c => <th key={c.id}>{c.id}</th>)}
        </tr>
      </thead>
      <tbody>
        {alternatives.map((a, i) => (
          <tr key={a.id}>
            <td>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center bg-gradient-to-br from-violet-400 to-pink-400 text-white text-xs font-900 rounded-xl">{a.id}</span>
                <span className="font-600 text-slate-700 text-xs">{a.name}</span>
              </div>
            </td>
            {data[i].map((v, j) => (
              <td key={j} className="text-center font-600 text-slate-600 text-xs" style={{ fontVariantNumeric: 'tabular-nums' }}>{f(v)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )

  return (
    <section id="langkah" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-50/20 to-pink-50/30 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="section-pill bg-yellow-100 text-yellow-700 shadow-yellow-100">
            <TrendingUp className="w-4 h-4" /> Langkah TOPSIS
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="gradient-title">Proses Perhitungan Live</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto font-500">
            Setiap tabel di bawah menampilkan hasil perhitungan langkah demi langkah yang berubah real-time.
          </p>
        </div>

        {/* Step 1 */}
        <TableCard
          title="Langkah 1: Bobot Ternormalisasi (W)"
          icon={<BarChart2 className="w-5 h-5 inline mr-1" />}
          gradFrom="from-violet-500" gradTo="to-purple-600"
        >
          <div className="flex flex-wrap gap-3">
            {criteria.map((c, j) => (
              <div key={c.id} className="bg-violet-50/80 border-2 border-violet-100 rounded-2xl px-5 py-3 text-center min-w-[110px] hover:scale-105 transition-transform">
                <div className="text-xs font-800 text-violet-500 mb-1">{c.id} · {c.name}</div>
                <div className="font-900 text-violet-700 text-xl">{f(W[j])}</div>
              </div>
            ))}
          </div>
        </TableCard>

        {/* Step 2 */}
        <TableCard
          title="Langkah 2: Matriks Normalisasi (R)"
          icon={<Table2 className="w-5 h-5 inline mr-1" />}
          gradFrom="from-blue-500" gradTo="to-cyan-500"
        >
          <MatrixTable data={R} />
        </TableCard>

        {/* Step 3 */}
        <TableCard
          title="Langkah 3: Matriks Normalisasi Terbobot (Y)"
          icon={<Table2 className="w-5 h-5 inline mr-1" />}
          gradFrom="from-pink-500" gradTo="to-rose-500"
        >
          <MatrixTable data={Y} />
        </TableCard>

        {/* Step 4 */}
        <TableCard
          title="Langkah 4: Solusi Ideal Positif (A⁺) & Negatif (A⁻)"
          icon={<Star className="w-5 h-5 inline mr-1" />}
          gradFrom="from-yellow-500" gradTo="to-amber-500"
        >
          <table className="cute-table">
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Solusi</th>
                {criteria.map(c => <th key={c.id}>{c.id}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="bg-green-100 text-green-700 text-xs font-900 px-3 py-1.5 rounded-full">A⁺ (Max)</span></td>
                {Aplus.map((v, j) => <td key={j} className="text-center font-700 text-green-600 text-xs" style={{ fontVariantNumeric: 'tabular-nums' }}>{f(v)}</td>)}
              </tr>
              <tr>
                <td><span className="bg-red-100 text-red-600 text-xs font-900 px-3 py-1.5 rounded-full">A⁻ (Min)</span></td>
                {Aminus.map((v, j) => <td key={j} className="text-center font-700 text-red-500 text-xs" style={{ fontVariantNumeric: 'tabular-nums' }}>{f(v)}</td>)}
              </tr>
            </tbody>
          </table>
        </TableCard>

        {/* Step 5 */}
        <TableCard
          title="Langkah 5: Jarak Solusi Ideal D⁺ dan D⁻"
          icon={<TrendingUp className="w-5 h-5 inline mr-1" />}
          gradFrom="from-emerald-500" gradTo="to-teal-500"
        >
          <table className="cute-table">
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Alternatif</th>
                <th>D⁺ (Jarak ke A⁺)</th>
                <th>D⁻ (Jarak ke A⁻)</th>
              </tr>
            </thead>
            <tbody>
              {alternatives.map((a, i) => (
                <tr key={a.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 flex items-center justify-center bg-gradient-to-br from-emerald-400 to-teal-400 text-white text-xs font-900 rounded-xl">{a.id}</span>
                      <span className="font-600 text-slate-700 text-xs">{a.name}</span>
                    </div>
                  </td>
                  <td className="text-center font-700 text-red-500 text-sm" style={{ fontVariantNumeric: 'tabular-nums' }}>{f(Dplus[i])}</td>
                  <td className="text-center font-700 text-green-600 text-sm" style={{ fontVariantNumeric: 'tabular-nums' }}>{f(Dminus[i])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableCard>
      </div>
    </section>
  )
}

// ──────── RESULTS SECTION ────────
function ResultsSection({ ranked }) {
  const rankColors = [
    'from-yellow-200 via-amber-100 to-yellow-300 border-yellow-400',
    'from-slate-100 via-slate-50 to-slate-200 border-slate-300',
    'from-orange-100 via-orange-50 to-orange-200 border-orange-300',
    'from-blue-50 via-sky-50 to-blue-100 border-blue-200',
  ]
  const medalBg = ['bg-gradient-to-br from-yellow-400 to-amber-500', 'bg-gradient-to-br from-slate-300 to-slate-400', 'bg-gradient-to-br from-orange-300 to-orange-500', 'bg-gradient-to-br from-blue-300 to-blue-400']

  const maxVi = ranked[0]?.Vi || 1

  return (
    <section id="hasil" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/40 to-violet-50/40 pointer-events-none" />
      <div className="relative max-w-4xl mx-auto">

        {/* Heading with mascot peek */}
        <div className="text-center mb-16">
          <div className="section-pill bg-amber-100 text-amber-700 shadow-amber-100">
            <Trophy className="w-4 h-4" /> Hasil Akhir
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-2 flex items-center justify-center gap-3 flex-wrap">
            <span className="gradient-title">Peringkat Rekomendasi</span>
            <span className="text-slate-800"> </span>
            <img src="/roket.png" alt="maskot roket" className="w-12 h-12 object-contain mascot-peek hidden sm:inline-block" />
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto font-500 mt-3">
            Alternatif dengan <strong>Nilai Preferensi (Vᵢ)</strong> tertinggi adalah rekomendasi terbaik.
          </p>
        </div>

        {/* Winner highlight */}
        {ranked[0] && (
          <div className="clay-card bg-gradient-to-br from-yellow-200 via-amber-100 to-yellow-300 border-2 border-yellow-400 p-10 mb-10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400" />
            {/* Confetti blobs */}
            <div className="deco-bubble w-40 h-40 bg-yellow-400 top-0 right-0 opacity-30" style={{ borderRadius: '60% 40% 50% 60%' }} />
            <div className="deco-bubble w-32 h-32 bg-amber-300 bottom-0 left-10 opacity-25" style={{ borderRadius: '50% 60% 40% 50%' }} />

            <div className="text-6xl mb-3 relative z-10">🏆</div>
            <div className="badge-winner mb-4 inline-block relative z-10">⭐ Rekomendasi Terbaik</div>
            <h3 className="text-4xl font-black text-slate-800 mb-2 relative z-10">{ranked[0].name}</h3>
            <p className="text-slate-600 font-600 mb-5 relative z-10 max-w-md mx-auto">
              Dengan nilai preferensi tertinggi sebesar <strong className="text-amber-700 text-xl">{f(ranked[0].Vi)}</strong>,
              metode ini paling sesuai berdasarkan seluruh kriteria yang diperhitungkan.
            </p>
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-5 py-2.5 rounded-full border border-yellow-300 relative z-10">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="font-800 text-slate-700">Peringkat #1 dari {ranked.length} alternatif</span>
            </div>
          </div>
        )}

        {/* Full Leaderboard */}
        <div className="glass-card p-7 mb-6">
          <h3 className="font-900 text-slate-800 text-lg mb-6 flex items-center gap-2">
            <img src="/shield.png" alt="maskot" className="w-9 h-9 object-contain float-2" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-pink-500">
              Tabel Peringkat Lengkap (Nilai Preferensi Vᵢ)
            </span>
          </h3>
          <div className="space-y-4">
            {ranked.map((a, i) => (
              <div key={a.id}
                className={`slide-in rounded-[1.5rem] border-2 bg-gradient-to-r ${rankColors[i] || 'from-slate-100 to-slate-200 border-slate-300'} p-5 hover:scale-[1.02] transition-all cursor-default`}
                style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex items-center gap-5">
                  {/* Rank Badge */}
                  <div className={`w-14 h-14 flex-shrink-0 flex items-center justify-center ${medalBg[i] || 'bg-slate-300'} rounded-2xl shadow-md text-2xl text-white font-black`}>
                    {a.rank}
                  </div>

                  {/* Name */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-900 text-slate-800 text-xl">{a.name}</span>
                      {i === 0 && <span className="badge-winner text-xs">🏆 Terbaik!</span>}
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-white/60 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                      <div
                        className="h-3 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 transition-all duration-700 ease-out"
                        style={{ width: `${(a.Vi / maxVi) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Score */}
                  <div className="text-right flex-shrink-0">
                    <div className="font-black text-slate-800 text-2xl" style={{ fontVariantNumeric: 'tabular-nums' }}>{f(a.Vi, 4)}</div>
                    <div className="text-xs text-slate-500 font-700">Nilai Vᵢ</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Table */}
        <div className="glass-card p-7">
          <h3 className="font-900 text-slate-800 text-base mb-5 flex items-center gap-2">
            <img src="/koin.png" alt="maskot" className="w-8 h-8 object-contain float-1" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-slate-700">
              Ringkasan Nilai Preferensi (Vᵢ)
            </span>
          </h3>
          <div className="table-wrap">
            <table className="cute-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th style={{ textAlign: 'left' }}>Alternatif</th>
                  <th>D⁺</th>
                  <th>D⁻</th>
                  <th>Vᵢ = D⁻/(D⁺+D⁻)</th>
                  <th>Peringkat</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((a, i) => (
                  <tr key={a.id}>
                    <td className="text-center text-lg font-bold text-slate-700">#{a.rank}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 flex items-center justify-center bg-gradient-to-br from-violet-400 to-pink-400 text-white text-xs font-900 rounded-xl">{a.id}</span>
                        <span className="font-700 text-slate-700">{a.name}</span>
                      </div>
                    </td>
                    <td className="text-center font-700 text-red-500 text-xs" style={{ fontVariantNumeric: 'tabular-nums' }}>{f(a.Dplus || 0)}</td>
                    <td className="text-center font-700 text-green-600 text-xs" style={{ fontVariantNumeric: 'tabular-nums' }}>{f(a.Dminus || 0)}</td>
                    <td className="text-center font-900 text-violet-700" style={{ fontVariantNumeric: 'tabular-nums' }}>{f(a.Vi)}</td>
                    <td className="text-center">
                      {i === 0 ? (
                        <span className="badge-winner">#{a.rank} Terbaik!</span>
                      ) : (
                        <span className="badge-kawaii">#{a.rank}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

// ──────── FOOTER ────────
function Footer() {
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

          <div className="flex justify-center gap-4 mb-6">
            <img src="/koin.png" alt="koin" className="w-10 h-10 object-contain float-1 opacity-70" />
            <img src="/shield.png" alt="shield" className="w-10 h-10 object-contain float-2 opacity-70" />
            <img src="/roket.png" alt="roket" className="w-10 h-10 object-contain float-3 opacity-70" />
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

// ──────── MAIN APP ────────
export default function App() {
  const [alternatives, setAlternatives] = useState(DEFAULT_ALTERNATIVES)
  const [criteria, setCriteria]         = useState(DEFAULT_CRITERIA)

  const result = useMemo(() => {
    try {
      const raw = computeTopsis(alternatives, criteria)
      const rankWithD = raw.ranked.map(r => {
        const idx = alternatives.findIndex(a => a.id === r.id)
        return { ...r, Dplus: raw.Dplus[idx], Dminus: raw.Dminus[idx] }
      })
      return { ...raw, ranked: rankWithD }
    } catch {
      return { R: [], Y: [], Aplus: [], Aminus: [], Dplus: [], Dminus: [], Vi: [], ranked: [], W: [] }
    }
  }, [alternatives, criteria])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen">
      <Navbar onScrollTo={scrollTo} />
      <HeroSection onScrollTo={scrollTo} />
      <DataSection alternatives={DEFAULT_ALTERNATIVES} criteria={DEFAULT_CRITERIA} />
      <CalculatorSection
        alternatives={alternatives}
        setAlternatives={setAlternatives}
        criteria={criteria}
        setCriteria={setCriteria}
      />
      <TopsisStepsSection result={result} criteria={criteria} alternatives={alternatives} />
      <ResultsSection ranked={result.ranked} />
      <Footer />
    </div>
  )
}
