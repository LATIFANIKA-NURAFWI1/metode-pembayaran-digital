import { Table2 } from 'lucide-react'

/**
 * Komponen Data Section — menampilkan matriks penilaian awal dan bobot kriteria default
 * @param {Array} alternatives - Data alternatif yang ditampilkan
 * @param {Array} criteria - Data kriteria yang ditampilkan
 */
export default function DataSection({ alternatives, criteria }) {
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
                  {alternatives.map((a) => (
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
