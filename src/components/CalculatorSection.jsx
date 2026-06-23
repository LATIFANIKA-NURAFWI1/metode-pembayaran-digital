import { Calculator, Info } from 'lucide-react'

/**
 * Komponen Calculator Section — input interaktif untuk mengubah bobot dan nilai matriks
 * Perhitungan TOPSIS berubah real-time setiap input berubah
 * @param {Array}    alternatives    - State alternatif saat ini
 * @param {Function} setAlternatives - Setter untuk alternatif
 * @param {Array}    criteria        - State kriteria saat ini
 * @param {Function} setCriteria     - Setter untuk kriteria
 */
export default function CalculatorSection({ alternatives, setAlternatives, criteria, setCriteria }) {
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

        {/* Heading */}
        <div className="text-center mb-14 relative">
          <div className="section-pill bg-pink-100 text-pink-700 shadow-pink-100">
            <Calculator className="w-4 h-4" /> Kalkulator Simulasi
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-2 flex items-center justify-center gap-3 flex-wrap">
            <span className="gradient-title">Atur Nilai &amp; Bobot</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto font-500 mt-3">
            Ubah nilai matriks dan bobot kriteria sesuai kebutuhan bisnis kamu. Hasil perhitungan akan berubah secara otomatis.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Weight inputs */}
          <div className="glass-card p-7">
            <h3 className="font-900 text-slate-800 text-base mb-5 flex items-center gap-2">
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
