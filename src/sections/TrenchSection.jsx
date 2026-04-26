import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const WARNING_TEXT =
  'Signal acoustique anormal détecté à -10 240m... Fréquence: 52 Hz... Signature non répertoriée dans la base de données... Protocole d\'urgence SIGMA-9 initialisé... Retour surface recommandé... Retour surface RECOMMANDÉ...'

function TypewriterText({ text, className, triggerKey }) {
  const [displayed, setDisplayed] = useState('')
  const [active, setActive] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!active) return
    setDisplayed('')
    let i = 0
    const id = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(id)
    }, 28)
    return () => clearInterval(id)
  }, [active, text, triggerKey])

  return (
    <p ref={ref} className={className}>
      {displayed}
      {active && displayed.length < text.length && (
        <span
          className="inline-block w-2 h-3.5 ml-0.5 align-middle"
          style={{ background: '#ff003c', animation: 'pulse-biolum 0.6s ease-in-out infinite' }}
        />
      )}
    </p>
  )
}

const trenchStats = [
  { label: 'PRESSION',       value: '1,100 atm',   sub: '1,100× atmosphère' },
  { label: 'TEMPÉRATURE',    value: '1.8°C',        sub: 'Proche du zéro absolu liquide' },
  { label: 'LUMIÈRE',        value: '0.00%',        sub: 'Obscurité perpétuelle' },
  { label: 'PROFONDEUR MAX', value: '−10,994 m',    sub: 'Challenger Deep' },
]

export default function TrenchSection() {
  const sectionRef = useRef()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const opacity   = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])
  const titleX    = useTransform(scrollYProgress, [0, 0.15], [-40, 0])

  return (
    <section ref={sectionRef} className="min-h-[180vh] flex items-center py-36 px-8">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div style={{ opacity }}>
          {/* Section header */}
          <div className="mb-14">
            <div
              className="text-[10px] tracking-[0.5em] mb-3"
              style={{ color: 'rgba(179,0,255,0.5)' }}
            >
              // ZONE HADALE — AU-DELÀ DE −6000m
            </div>

            <motion.h2
              style={{ x: titleX, fontSize: 'clamp(2.5rem,7vw,5rem)' }}
              className="font-black leading-none font-mono mb-5"
            >
              <span className="text-white/80">THE</span>
              <br />
              <span style={{ color: '#ff003c', textShadow: '0 0 40px #ff003c66' }}>TRENCH</span>
            </motion.h2>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-px" style={{ background: 'rgba(255,0,60,0.3)' }} />
              <div className="w-1 h-1 rotate-45" style={{ background: 'rgba(255,0,60,0.4)' }} />
            </div>

            <p className="text-white/20 text-sm leading-relaxed max-w-lg">
              Au-delà de 6 000m, les conditions sont incompatibles avec la biologie terrestre conventionnelle.
              Seuls quelques extremophiles unicellulaires subsistent dans l'obscurité absolue.
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {trenchStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: false }}
                className="rounded-sm p-4"
                style={{
                  background: 'rgba(179,0,255,0.05)',
                  border: '1px solid rgba(179,0,255,0.18)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div
                  className="text-[9px] tracking-widest mb-2"
                  style={{ color: 'rgba(179,0,255,0.5)' }}
                >
                  {stat.label}
                </div>
                <div
                  className="font-bold text-lg text-white mb-1"
                  style={{ textShadow: '0 0 12px rgba(179,0,255,0.4)' }}
                >
                  {stat.value}
                </div>
                <div className="text-white/20 text-[10px]">{stat.sub}</div>
              </motion.div>
            ))}
          </div>

          {/* Warning panel with typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            viewport={{ once: false }}
            className="rounded-sm p-6 max-w-2xl"
            style={{
              background: 'rgba(255,0,60,0.05)',
              border: '1px solid rgba(255,0,60,0.2)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div className="flex items-center gap-2.5 mb-5">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  background: '#ff003c',
                  boxShadow: '0 0 10px #ff003c',
                  animation: 'pulse-biolum 0.8s ease-in-out infinite',
                }}
              />
              <span
                className="text-[10px] tracking-[0.4em] font-mono"
                style={{ color: '#ff003ccc' }}
              >
                ALERTE — SIGNAL NON IDENTIFIÉ
              </span>
            </div>

            <TypewriterText
              text={WARNING_TEXT}
              className="text-white/50 text-[12px] leading-relaxed font-mono"
            />
          </motion.div>

          {/* Horizontal data line */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            viewport={{ once: false }}
            className="mt-10 flex items-center gap-4 text-[10px] font-mono"
            style={{ color: 'rgba(255,0,60,0.3)' }}
          >
            <div className="w-32 h-px" style={{ background: 'rgba(255,0,60,0.2)' }} />
            <span>SIGNAL SONAR: DÉGRADÉ</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,0,60,0.1)' }} />
            <span>COMM: LATENCE +2400ms</span>
            <div className="w-32 h-px" style={{ background: 'rgba(255,0,60,0.2)' }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
