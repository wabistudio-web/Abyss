import React from 'react'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.5 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center z-10 px-8"
      >
        {/* Classification badge */}
        <motion.div variants={itemVariants} className="mb-6 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-biolum/30" />
          <span className="text-biolum/50 text-[10px] tracking-[0.5em] font-mono">
            CLASSIFICATION TOP SECRET
          </span>
          <div className="h-px w-12 bg-biolum/30" />
        </motion.div>

        {/* ABYSS glitch title */}
        <motion.div variants={itemVariants} className="relative mb-2">
          <h1
            className="glitch-text text-[clamp(5rem,18vw,14rem)] font-black leading-none text-white font-mono"
            data-text="ABYSS"
            style={{ letterSpacing: '-0.02em' }}
          >
            ABYSS
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div variants={itemVariants} className="mb-3">
          <div className="text-biolum/60 text-[11px] tracking-[0.45em] font-mono">
            PROJET D'EXPLORATION DES GRANDES PROFONDEURS
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-biolum/40" />
          <div className="w-1 h-1 rotate-45 bg-biolum/40" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-biolum/40" />
        </motion.div>

        {/* Scroll CTA */}
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-3">
          <span className="text-white/25 text-[10px] tracking-[0.4em]">INITIER LA DESCENTE</span>
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3], y: [0, 6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-px h-8 bg-gradient-to-b from-biolum/60 to-transparent" />
            <div
              className="w-2.5 h-2.5 rotate-45"
              style={{ border: '1px solid rgba(0,243,255,0.5)', borderTop: 'none', borderLeft: 'none' }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Corner HUD decorations */}
      <div className="absolute bottom-8 left-8 text-biolum/15 text-[10px] font-mono leading-relaxed">
        <div>MISSION: CHALLENGER-7</div>
        <div>STATUT: IMMERSION ACTIVE</div>
        <div>ÉQUIPE: 3 MEMBRES</div>
      </div>
      <div className="absolute bottom-8 right-8 text-biolum/15 text-[10px] font-mono text-right leading-relaxed">
        <div>VÉH. SOUS-MARIN: ABYSS-7</div>
        <div>AUTONOMIE: 72h</div>
        <div>TRANSMISSION: STABLE</div>
      </div>
    </section>
  )
}
