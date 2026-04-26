import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const fauna = [
  {
    id: 'krill',
    name: 'Euphausia superba',
    common: 'Krill Antarctique',
    depth: '-200m / -600m',
    detail: 'Densité maximale de 30 000 individus/m³. Base de toute la chaîne alimentaire pélagique. Bioluminescence de défense.',
    color: '#00f3ff',
    signal: '██▓▓▒▒░░',
  },
  {
    id: 'squid',
    name: 'Vampyroteuthis infernalis',
    common: 'Calmar Vampire',
    depth: '-600m / -900m',
    detail: 'Photophores couvrant 75% du corps. Production de nuages bioluminescents pour aveugler les prédateurs.',
    color: '#39ff14',
    signal: '▓█▓▒░▒▓█',
  },
  {
    id: 'fish',
    name: 'Melanocetus johnsonii',
    common: 'Baudroie Abyssale',
    depth: '-1000m / -4000m',
    detail: 'Photophore frontal alimenté par des bactéries symbiotiques. Mâchoires extensibles. Prédateur embusqué.',
    color: '#b300ff',
    signal: '░▒▓█████',
  },
]

function FaunaCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.18, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: false, margin: '-80px' }}
      className="rounded-sm p-5 flex flex-col gap-3"
      style={{
        background: `rgba(${item.color === '#00f3ff' ? '0,243,255' : item.color === '#39ff14' ? '57,255,20' : '179,0,255'},0.04)`,
        border: `1px solid ${item.color}22`,
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }}
            />
            <span className="text-[9px] tracking-[0.4em]" style={{ color: item.color + '99' }}>
              ESPÈCE IDENTIFIÉE
            </span>
          </div>
          <div className="text-white font-bold text-sm">{item.common}</div>
          <div className="text-white/30 text-[10px] italic">{item.name}</div>
        </div>
        <div
          className="text-[10px] font-mono px-2 py-1 rounded-sm flex-shrink-0"
          style={{ color: item.color + '99', border: `1px solid ${item.color}22` }}
        >
          {item.depth}
        </div>
      </div>

      {/* Signal bar */}
      <div
        className="text-[11px] tracking-widest"
        style={{ color: item.color + '60', fontFamily: 'monospace' }}
      >
        SIG: {item.signal}
      </div>

      {/* Description */}
      <p className="text-white/45 text-[11px] leading-relaxed">{item.detail}</p>

      {/* Footer bar */}
      <div className="h-px w-full" style={{ background: `linear-gradient(to right, ${item.color}33, transparent)` }} />
    </motion.div>
  )
}

export default function TwilightSection() {
  const sectionRef = useRef()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0])
  const y       = useTransform(scrollYProgress, [0, 0.12], [50, 0])

  return (
    <section ref={sectionRef} className="min-h-[160vh] flex items-center py-36 px-8">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div style={{ opacity, y }}>
          {/* Section header */}
          <div className="mb-14">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="text-biolum/40 text-[10px] tracking-[0.5em] mb-3"
            >
              // ZONE DE TRANSITION — -200m à -1000m
            </motion.div>

            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-black leading-none font-mono mb-5"
              style={{ fontSize: 'clamp(2.5rem,7vw,5rem)' }}
            >
              <span className="text-white">TWILIGHT</span>
              <br />
              <span className="text-biolum" style={{ textShadow: '0 0 30px #00f3ff55' }}>ZONE</span>
            </motion.h2>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-px bg-biolum/25" />
              <div className="w-1 h-1 rotate-45 bg-biolum/25" />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="text-white/35 text-sm leading-relaxed max-w-lg"
            >
              La lumière solaire disparaît progressivement. La pression atteint 100 atmosphères.
              Les créatures ont développé la bioluminescence comme unique source de lumière.
            </motion.p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fauna.map((item, i) => (
              <FaunaCard key={item.id} item={item} index={i} />
            ))}
          </div>

          {/* Bottom data row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 grid grid-cols-3 gap-4"
          >
            {[
              { label: 'ESPÈCES RÉPERTORIÉES', value: '2,340+' },
              { label: 'LUMIÈRE SOLAIRE', value: '< 1%' },
              { label: 'TAUX D\'EXPLORATION', value: '5.7%' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="border border-biolum/10 px-4 py-3 rounded-sm text-center"
                style={{ background: 'rgba(0,243,255,0.02)' }}
              >
                <div className="text-biolum/40 text-[9px] tracking-widest mb-1">{stat.label}</div>
                <div className="text-biolum text-xl font-bold" style={{ textShadow: '0 0 10px #00f3ff44' }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
