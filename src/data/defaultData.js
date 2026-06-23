/* ─── DEFAULT DATA ─── */
/* Data default untuk kriteria dan alternatif metode pembayaran digital UMKM */

/**
 * Kriteria penilaian metode pembayaran digital
 * type: 'Benefit' = semakin tinggi semakin baik
 * type: 'Cost'    = semakin rendah semakin baik
 * weight: bobot dalam persen (total harus = 100)
 */
export const DEFAULT_CRITERIA = [
  { id: 'C1', name: 'Biaya Transaksi', type: 'Cost',    weight: 40 },
  { id: 'C2', name: 'Kemudahan',       type: 'Benefit', weight: 27 },
  { id: 'C3', name: 'Keamanan',        type: 'Benefit', weight: 23 },
  { id: 'C4', name: 'Kecepatan',       type: 'Benefit', weight:  6 },
  { id: 'C5', name: 'Popularitas',     type: 'Benefit', weight:  4 },
]

/**
 * Alternatif metode pembayaran digital yang dievaluasi
 * values: nilai setiap kriteria [C1, C2, C3, C4, C5]
 * Sumber: hasil survei UMKM (skala 1-5)
 */
export const DEFAULT_ALTERNATIVES = [
  { id: 'A1', name: 'QRIS',               values: [1.61, 4.39, 4.24, 4.24, 4.24] },
  { id: 'A2', name: 'E-Wallet',           values: [2.25, 3.88, 3.64, 3.91, 3.91] },
  { id: 'A3', name: 'Transfer Bank',      values: [3.36, 3.59, 4.12, 3.65, 3.65] },
  { id: 'A4', name: 'Kartu Debit/Kredit', values: [1.63, 3.53, 4.06, 3.88, 3.88] },
]
