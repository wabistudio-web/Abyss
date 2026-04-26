import React, { useRef, useState, useEffect } from 'react'
import AbyssScene from './components/AbyssScene'
import HUD from './components/HUD'
import HeroSection from './sections/HeroSection'
import TwilightSection from './sections/TwilightSection'
import TrenchSection from './sections/TrenchSection'
import { motion } from 'framer-motion'

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const scrollProgressRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
        scrollProgressRef.current = p
        setScrollProgress(p)
      })
    }
    const onMouse = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouse, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouse)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="relative bg-abyss">
      {/* Fixed 3D Canvas — behind everything */}
      <AbyssScene scrollProgressRef={scrollProgressRef} mouseRef={mouseRef} />

      {/* Fixed HUD overlay — above everything */}
      <HUD scrollProgress={scrollProgress} />

      {/* Scrollable narrative content */}
      <main className="relative z-10">
        <HeroSection />
        <TwilightSection />
        <TrenchSection />

        {/* Final depth section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-center max-w-xl"
            style={{
              background: 'rgba(255,0,60,0.06)',
              border: '1px solid rgba(255,0,60,0.18)',
              backdropFilter: 'blur(16px)',
              padding: '3rem',
              borderRadius: '2px',
            }}
          >
            <div
              className="text-[10px] tracking-[0.5em] mb-6 font-mono"
              style={{ color: 'rgba(255,0,60,0.6)' }}
            >
              // PROFONDEUR MAXIMALE ATTEINTE
            </div>

            <h2
              className="font-black font-mono mb-2"
              style={{
                fontSize: 'clamp(3rem,10vw,6rem)',
                color: '#fff',
                textShadow: '0 0 40px rgba(255,0,60,0.5)',
                lineHeight: 1,
              }}
            >
              −10,994
            </h2>
            <div
              className="text-2xl font-mono mb-6"
              style={{ color: 'rgba(255,0,60,0.6)' }}
            >
              MÈTRES
            </div>

            <div className="h-px w-full mb-6" style={{ background: 'rgba(255,0,60,0.15)' }} />

            <p className="text-white/30 text-sm leading-relaxed font-mono">
              CHALLENGER DEEP — FOSSE DES MARIANNES<br />
              Le point le plus profond des océans terrestres.<br />
              Pression: 1,100 atmosphères. Température: 1.8°C.<br />
              Obscurité absolue. Silence. Néant.
            </p>

            <div className="mt-8 flex items-center justify-center gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#ff003c', boxShadow: '0 0 8px #ff003c', animation: 'pulse-biolum 1s ease-in-out infinite' }}
              />
              <span className="text-[10px] font-mono" style={{ color: 'rgba(255,0,60,0.5)', letterSpacing: '0.3em' }}>
                FIN DE TRANSMISSION
              </span>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  )
}
