/* ─── TOPSIS CALCULATION ENGINE ─── */

/**
 * Menghitung metode TOPSIS (Technique for Order of Preference by Similarity to Ideal Solution)
 * @param {Array} alternatives - Array alternatif dengan id, name, values[]
 * @param {Array} criteria - Array kriteria dengan id, name, type (Benefit/Cost), weight
 * @returns {Object} Hasil perhitungan lengkap semua langkah TOPSIS
 */
export function computeTopsis(alternatives, criteria) {
  const n = alternatives.length
  const m = criteria.length

  // Normalisasi bobot
  const totalW = criteria.reduce((s, c) => s + Number(c.weight), 0)
  const W = criteria.map(c => Number(c.weight) / (totalW || 1))

  // Langkah 1: Normalisasi matriks keputusan (R)
  const denom = Array.from({ length: m }, (_, j) => {
    const sq = alternatives.reduce((s, a) => s + Math.pow(Number(a.values[j]), 2), 0)
    return Math.sqrt(sq) || 1
  })
  const R = alternatives.map(a => a.values.map((v, j) => Number(v) / denom[j]))

  // Langkah 2: Matriks normalisasi terbobot (Y)
  const Y = R.map(row => row.map((r, j) => r * W[j]))

  // Langkah 3: Solusi ideal positif (A+) dan negatif (A-)
  const Aplus = Array.from({ length: m }, (_, j) => {
    const col = Y.map(row => row[j])
    return criteria[j].type === 'Benefit' ? Math.max(...col) : Math.min(...col)
  })
  const Aminus = Array.from({ length: m }, (_, j) => {
    const col = Y.map(row => row[j])
    return criteria[j].type === 'Benefit' ? Math.min(...col) : Math.max(...col)
  })

  // Langkah 4: Jarak ke solusi ideal
  const Dplus  = Y.map(row => Math.sqrt(row.reduce((s, y, j) => s + Math.pow(y - Aplus[j],  2), 0)))
  const Dminus = Y.map(row => Math.sqrt(row.reduce((s, y, j) => s + Math.pow(y - Aminus[j], 2), 0)))

  // Langkah 5: Nilai preferensi (Vi)
  const Vi = alternatives.map((a, i) => {
    const d = Dplus[i] + Dminus[i]
    return { ...a, Vi: d === 0 ? 0 : Dminus[i] / d }
  })

  // Langkah 6: Perankingan
  const ranked = [...Vi].sort((a, b) => b.Vi - a.Vi).map((a, i) => ({ ...a, rank: i + 1 }))

  return { R, Y, Aplus, Aminus, Dplus, Dminus, Vi, ranked, W }
}

/**
 * Format angka ke desimal tertentu
 * @param {number} v - Nilai yang diformat
 * @param {number} d - Jumlah desimal (default 4)
 */
export const f = (v, d = 4) => Number(v).toFixed(d)
