import { useState, useMemo } from 'react'
import './index.css'

import { computeTopsis } from './utils/topsis'
import { DEFAULT_CRITERIA, DEFAULT_ALTERNATIVES } from './data/defaultData'

import Navbar              from './components/Navbar'
import HeroSection         from './components/HeroSection'
import DataSection         from './components/DataSection'
import CalculatorSection   from './components/CalculatorSection'
import TopsisStepsSection  from './components/TopsisStepsSection'
import ResultsSection      from './components/ResultsSection'
import Footer              from './components/Footer'

/**
 * Root component — mengelola state global dan merakit semua section halaman
 */
export default function App() {
  const [alternatives, setAlternatives] = useState(DEFAULT_ALTERNATIVES)
  const [criteria, setCriteria]         = useState(DEFAULT_CRITERIA)

  /* Hitung TOPSIS setiap kali alternatives atau criteria berubah */
  const result = useMemo(() => {
    try {
      const raw = computeTopsis(alternatives, criteria)
      const ranked = raw.ranked.map(r => {
        const idx = alternatives.findIndex(a => a.id === r.id)
        return { ...r, Dplus: raw.Dplus[idx], Dminus: raw.Dminus[idx] }
      })
      return { ...raw, ranked }
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
