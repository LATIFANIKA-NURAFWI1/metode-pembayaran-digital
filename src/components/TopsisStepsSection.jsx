import { BarChart2, Table2, Star, TrendingUp } from 'lucide-react'
import { f } from '../utils/topsis'

/**
 * Komponen TOPSIS Steps Section — menampilkan langkah-langkah perhitungan TOPSIS secara live
 * @param {Object} result       - Hasil komputasi TOPSIS (R, Y, Aplus, Aminus, Dplus, Dminus, W)
 * @param {Array}  criteria     - Data kriteria aktif
 * @param {Array}  alternatives - Data alternatif aktif
 */
export default function TopsisStepsSection({ result, criteria, alternatives }) {
  const { R, Y, Aplus, Aminus, Dplus, Dminus, W } = result

  /* ─── Sub-komponen: Card pembungkus tabel ─── */
  const TableCard = ({ title, icon, gradFrom, gradTo, children }) => (
    <div className="glass-card p-7 mb-6">
      <h3 className="font-900 text-slate-800 text-base mb-5 flex items-center gap-2">
        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradFrom} ${gradTo}`}>{icon}</span>
        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradFrom} ${gradTo}`}>{title}</span>
      </h3>
      <div className="table-wrap">{children}</div>
    </div>
  )

  /* ─── Sub-komponen: Tabel matriks generik ─── */
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

        {/* Langkah 1: Bobot Ternormalisasi */}
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

        {/* Langkah 2: Matriks Normalisasi */}
        <TableCard
          title="Langkah 2: Matriks Normalisasi (R)"
          icon={<Table2 className="w-5 h-5 inline mr-1" />}
          gradFrom="from-blue-500" gradTo="to-cyan-500"
        >
          <MatrixTable data={R} />
        </TableCard>

        {/* Langkah 3: Matriks Normalisasi Terbobot */}
        <TableCard
          title="Langkah 3: Matriks Normalisasi Terbobot (Y)"
          icon={<Table2 className="w-5 h-5 inline mr-1" />}
          gradFrom="from-pink-500" gradTo="to-rose-500"
        >
          <MatrixTable data={Y} />
        </TableCard>

        {/* Langkah 4: Solusi Ideal */}
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

        {/* Langkah 5: Jarak Solusi Ideal */}
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
