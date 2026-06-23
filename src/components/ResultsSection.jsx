import { Trophy, CheckCircle2 } from 'lucide-react'
import { f } from '../utils/topsis'

/**
 * Komponen Results Section — menampilkan peringkat akhir hasil TOPSIS
 * @param {Array} ranked - Array alternatif yang sudah diranking (dengan Vi, rank, Dplus, Dminus)
 */
export default function ResultsSection({ ranked }) {
  const maxVi = ranked[0]?.Vi || 1

  const getBadgeClass = (index) => {
    switch (index) {
      case 0: return 'bg-yellow-400 text-white'
      case 1: return 'bg-slate-300 text-slate-700'
      case 2: return 'bg-orange-300 text-white'
      case 3: return 'bg-blue-200 text-blue-700'
      default: return 'bg-slate-200 text-slate-700'
    }
  }

  const getProgressClass = (index) => {
    switch (index) {
      case 0: return 'bg-yellow-400'
      case 1: return 'bg-slate-300'
      case 2: return 'bg-orange-300'
      case 3: return 'bg-blue-200'
      default: return 'bg-slate-300'
    }
  }

  return (
    <section id="hasil" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/40 to-violet-50/40 pointer-events-none" />
      <div className="relative max-w-4xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <div className="section-pill bg-amber-100 text-amber-700 shadow-amber-100">
            <Trophy className="w-4 h-4" /> Hasil Akhir
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-2 flex items-center justify-center gap-3 flex-wrap">
            <span className="gradient-title">Peringkat Rekomendasi</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto font-500 mt-3">
            Alternatif dengan <strong>Nilai Preferensi (Vᵢ)</strong> tertinggi adalah rekomendasi terbaik.
          </p>
        </div>

        {/* Winner highlight */}
        {ranked[0] && (
          <div className="bg-white/80 backdrop-blur-md border-2 border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.3)] rounded-3xl p-10 mb-10 text-center relative overflow-hidden">
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-pink-500">
              Tabel Peringkat Lengkap (Nilai Preferensi Vᵢ)
            </span>
          </h3>
          <div className="space-y-4">
            {ranked.map((a, i) => (
              <div key={a.id}
                className="slide-in bg-white/60 backdrop-blur-sm border border-slate-100 rounded-2xl hover:bg-white/80 transition-all p-5 cursor-default"
                style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex items-center gap-5">
                  {/* Rank Badge */}
                  <div className={`w-14 h-14 flex-shrink-0 flex items-center justify-center ${getBadgeClass(i)} rounded-2xl shadow-sm text-2xl font-black`}>
                    {a.rank}
                  </div>

                  {/* Name & Progress bar */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-900 text-slate-800 text-xl">{a.name}</span>
                      {i === 0 && <span className="badge-winner text-xs">🏆 Terbaik!</span>}
                    </div>
                    <div className="w-full bg-slate-100/80 rounded-full h-3 overflow-hidden backdrop-blur-sm shadow-inner">
                      <div
                        className={`h-3 rounded-full transition-all duration-700 ease-out ${getProgressClass(i)}`}
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
