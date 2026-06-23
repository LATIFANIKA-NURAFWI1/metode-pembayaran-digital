# 🏆 SPK Pembayaran Digital UMKM

<div align="center">

**Sistem Pendukung Keputusan Pemilihan Metode Pembayaran Digital untuk UMKM**  
menggunakan Metode **TOPSIS** *(Technique for Order of Preference by Similarity to Ideal Solution)*

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Lucide React](https://img.shields.io/badge/Lucide_React-Icons-F56565)](https://lucide.dev)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

[🚀 Live Demo](https://spk-react.vercel.app) · [📖 Dokumentasi](#cara-penggunaan) · [🐛 Laporkan Bug](../../issues)

</div>

---

## 📖 Tentang Project

Project ini merupakan **Sistem Pendukung Keputusan (SPK)** berbasis web untuk membantu pelaku **UMKM** memilih metode pembayaran digital yang paling sesuai dengan kebutuhan bisnis mereka.

### Alternatif yang Dievaluasi
| ID | Metode Pembayaran |
|----|-------------------|
| A1 | QRIS |
| A2 | E-Wallet |
| A3 | Transfer Bank |
| A4 | Kartu Debit/Kredit |

### Kriteria Penilaian
| ID | Kriteria | Tipe | Bobot Default |
|----|----------|------|---------------|
| C1 | Biaya Transaksi | Cost | 40% |
| C2 | Kemudahan | Benefit | 27% |
| C3 | Keamanan | Benefit | 23% |
| C4 | Kecepatan | Benefit | 6% |
| C5 | Popularitas | Benefit | 4% |

---

## ✨ Fitur Utama

- 📊 **Kalkulator TOPSIS Interaktif** — ubah nilai matriks & bobot, hasil berubah real-time
- 📋 **Tampilan Langkah-Langkah** — visualisasi setiap tahap perhitungan TOPSIS (R, Y, A⁺, A⁻, D⁺, D⁻, Vᵢ)
- 🏅 **Peringkat Rekomendasi** — leaderboard dengan highlight pemenang
- 💎 **UI Glassmorphism** — desain modern dengan claymorphism card & animasi halus
- 📱 **Responsive** — tampil optimal di desktop & mobile
- ⚡ **Client-Side Only** — tidak butuh backend, semua kalkulasi di browser

---

## 🛠️ Tech Stack

| Teknologi | Versi | Keterangan |
|-----------|-------|------------|
| [React](https://react.dev) | ^19 | UI Library |
| [Vite](https://vitejs.dev) | ^8 | Build Tool & Dev Server |
| [Tailwind CSS](https://tailwindcss.com) | ^4 | Utility-first CSS |
| [Lucide React](https://lucide.dev) | ^1 | Icon Library |
| Google Fonts (Nunito) | — | Typography |

---

## 🚀 Cara Menjalankan

### Prerequisites
- [Node.js](https://nodejs.org) versi 18 ke atas
- npm atau yarn

### Instalasi

```bash
# Clone repository
git clone https://github.com/username/spk-react.git
cd spk-react

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka browser dan akses `http://localhost:5173`

### Build Production

```bash
npm run build
npm run preview
```

---

## 📁 Struktur Folder

```
spk-react/
├── public/
│   ├── images/              # Gambar statis (bg, ilustrasi)
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/          # Komponen React terpisah
│   │   ├── Navbar.jsx
│   │   ├── HeroSection.jsx
│   │   ├── DataSection.jsx
│   │   ├── CalculatorSection.jsx
│   │   ├── TopsisStepsSection.jsx
│   │   ├── ResultsSection.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   └── defaultData.js   # Konstanta data default
│   ├── utils/
│   │   └── topsis.js        # Logika perhitungan TOPSIS
│   ├── App.jsx              # Root component (assembler)
│   ├── index.css            # Global styles & design tokens
│   └── main.jsx             # Entry point
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

---

## 🧮 Algoritma TOPSIS

Metode TOPSIS bekerja dalam 6 langkah:

1. **Normalisasi Matriks** — mengubah nilai matriks keputusan ke skala yang sebanding
2. **Bobot Ternormalisasi** — mengalikan nilai ternormalisasi dengan bobot kriteria
3. **Solusi Ideal Positif (A⁺)** — nilai terbaik tiap kriteria
4. **Solusi Ideal Negatif (A⁻)** — nilai terburuk tiap kriteria
5. **Jarak ke Solusi Ideal** — menghitung D⁺ dan D⁻ setiap alternatif
6. **Nilai Preferensi (Vᵢ)** — `Vᵢ = D⁻ / (D⁺ + D⁻)` → semakin tinggi semakin baik

---

## 👤 Author

**Latifa Nika Nurafwi**

---

## 📄 Lisensi

Distributed under the MIT License. See `LICENSE` for more information.
