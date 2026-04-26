import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

const MAX_DEPTH = 10994

function lerp(a, b, t) {
  return a + (b - a) * Math.max(0, Math.min(1, t))
}

function DataBadge({ label, value, unit, color = '#00f3ff' }) {
  return (
    <div className="glass-panel px-3 py-2 rounded-sm" style={{ borderColor: color + '22' }}>
      <div className="text-[10px] tracking-widest mb-1" style={{ color: color + '66' }}>{label}</div>
      <div className="text-sm font-bold" style={{ color, textShadow: `0 0 8px ${color}88` }}>
        {value}
        {unit && <span className="text-xs font-normal opacity-50 ml-1">{unit}</span>}
      </div>
    </div>
  )
}

function StatusDot({ active = true }) {
  return (
    <div
      className="w-1.5 h-1.5 rounded-full"
      style={{
        backgroundColor: active ? '#00f3ff' : '#ff003c',
        boxShadow: active ? '0 0 6px #00f3ff' : '0 0 6px #ff003c',
        animation: 'pulse-biolum 2s ease-in-out infinite',
      }}
    />
  )
}

export default function HUD({ scrollProgress: p }) {
  const depth    = Math.round(lerp(0, MAX_DEPTH, p))
  const pressure = lerp(1, 1100, p).toFixed(1)
  const temp     = lerp(20, 1.8, p).toFixed(1)
  const salinity = (35 + Math.sin(p * 30) * 0.15).toFixed(2)
  const vis      = Math.max(0, Math.round(100 - p * 97))

  const zone = p < 0.25 ? 'SUNLIGHT ZONE' : p < 0.55 ? 'TWILIGHT ZONE' : p < 0.8 ? 'MIDNIGHT ZONE' : 'HADAL ZONE'
  const zoneColor = p < 0.25 ? '#00f3ff' : p < 0.55 ? '#90e0ef' : p < 0.8 ? '#b300ff' : '#ff003c'

  const gaugeColor = useMemo(() => {
    if (p < 0.25) return '#00f3ff'
    if (p < 0.6)  return '#0077b6'
    if (p < 0.85) return '#b300ff'
    return '#ff003c'
  }, [p])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 font-mono select-none">
      {/* Scanline overlay */}
      <div className="absolute inset-0 scanline pointer-events-none" style={{ opacity: 0.25 }} />

      {/* ── TOP BAR ── */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-2.5"
        style={{ borderBottom: '1px solid rgba(0,243,255,0.08)', background: 'rgba(2,11,20,0.4)', backdropFilter: 'blur(8px)' }}
      >
        <div className="flex items-center gap-3">
          <StatusDot active={p < 0.9} />
          <span className="text-biolum/70 text-[10px] tracking-[0.35em]">
            {p < 0.9 ? 'DRONE-7 OPÉRATIONNEL' : 'SYSTÈME CRITIQUE'}
          </span>
        </div>

        <div className="flex items-center gap-5 text-[10px] tracking-wider">
          <span className="text-white/20">ZONE:</span>
          <span style={{ color: zoneColor, textShadow: `0 0 6px ${zoneColor}55` }}>{zone}</span>
          <span className="text-white/20">VIS:</span>
          <span className="text-biolum/60">{vis}%</span>
          <span className="text-white/20">O₂:</span>
          <span className="text-biolum/60">21.3%</span>
        </div>

        <span className="text-white/20 text-[10px] tracking-widest">
          11°22'N — 142°35'E
        </span>
      </div>

      {/* ── LEFT DEPTH GAUGE ── */}
      <div className="absolute left-5 top-14 bottom-14 flex flex-col items-center gap-2">
        <span
          className="text-[9px] tracking-[0.4em] text-biolum/30"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.3em' }}
        >
          PROFONDEUR (m)
        </span>

        <div className="flex-1 flex flex-col items-center w-4 gap-0">
          {/* Track */}
          <div className="flex-1 w-px bg-biolum/10 relative overflow-visible">
            {/* Filled portion */}
            <motion.div
              className="absolute top-0 left-0 right-0"
              style={{
                height: `${p * 100}%`,
                background: `linear-gradient(to bottom, ${gaugeColor}, transparent)`,
                transition: 'height 0.1s linear',
              }}
            />
            {/* Current marker */}
            <motion.div
              className="absolute -left-1.5 right-0 flex items-center"
              style={{ top: `${p * 100}%` }}
            >
              <div className="w-3 h-px" style={{ background: gaugeColor, boxShadow: `0 0 6px ${gaugeColor}` }} />
            </motion.div>
            {/* Tick marks */}
            {[0.25, 0.5, 0.75].map((t) => (
              <div
                key={t}
                className="absolute -left-1 right-0 w-2 h-px bg-white/10"
                style={{ top: `${t * 100}%` }}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[9px] text-white/20">0m</span>
          <div className="w-px h-2 bg-white/10" />
          <span className="text-[9px] text-white/20">-10994</span>
        </div>
      </div>

      {/* ── RIGHT DATA PANELS ── */}
      <div className="absolute right-5 top-14 flex flex-col gap-2.5 w-44">
        {/* Main depth display */}
        <div
          className="px-4 py-3 rounded-sm"
          style={{
            background: 'rgba(0,243,255,0.04)',
            border: `1px solid ${gaugeColor}22`,
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className="text-[10px] tracking-widest mb-1" style={{ color: gaugeColor + '80' }}>PROFONDEUR</div>
          <div
            className="text-2xl font-black tabular-nums"
            style={{ color: gaugeColor, textShadow: `0 0 14px ${gaugeColor}88` }}
          >
            -{depth.toLocaleString('fr-FR')}
          </div>
          <div className="text-[10px] text-white/20 mt-0.5">mètres</div>
        </div>

        <DataBadge label="PRESSION" value={pressure} unit="atm" color={gaugeColor} />
        <DataBadge label="TEMPÉRATURE" value={`${temp}°`} unit="C" color={gaugeColor} />
        <DataBadge label="SALINITÉ" value={salinity} unit="ppt" color="#39ff14" />

        {/* Warning at depth */}
        {p > 0.7 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-3 py-2 rounded-sm text-[10px] leading-relaxed"
            style={{ background: 'rgba(255,0,60,0.08)', border: '1px solid rgba(255,0,60,0.2)', color: '#ff003c88' }}
          >
            ⚠ PRESSION CRITIQUE<br />
            STRUCTURE À LIMITE
          </motion.div>
        )}
      </div>

      {/* ── BOTTOM TICKER ── */}
      <div
        className="absolute bottom-0 left-0 right-0 py-1.5 overflow-hidden"
        style={{ borderTop: '1px solid rgba(0,243,255,0.07)', background: 'rgba(2,11,20,0.5)' }}
      >
        <div className="ticker-track flex whitespace-nowrap text-biolum/25 text-[10px] tracking-[0.25em]">
          {Array(8).fill('DRONE-7 OPÉRATIONNEL // NAVIGATION ACTIVE // SONAR NOMINAL // AUCUNE ANOMALIE // SIGNAL STABLE // CAMÉRA 4K // ').map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
