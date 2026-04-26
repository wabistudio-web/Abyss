import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 2500

export default function MarineSnow() {
  const geometryRef = useRef()
  const speeds = useMemo(() => {
    const s = new Float32Array(PARTICLE_COUNT)
    for (let i = 0; i < PARTICLE_COUNT; i++) s[i] = 0.3 + Math.random() * 1.2
    return s
  }, [])

  const positions = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 35
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15
    }
    return pos
  }, [])

  useFrame((_, delta) => {
    if (!geometryRef.current) return
    const pos = geometryRef.current.attributes.position.array
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3 + 1] += speeds[i] * delta * 0.4
      pos[i * 3]     += Math.sin(Date.now() * 0.001 + i) * delta * 0.02
      if (pos[i * 3 + 1] > 12.5) pos[i * 3 + 1] = -12.5
    }
    geometryRef.current.attributes.position.needsUpdate = true
  })

  return (
    <points>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#90e0ef"
        size={0.045}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
