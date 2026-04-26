import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

export default function Drone({ scrollProgressRef }) {
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const ring3Ref = useRef()
  const coreMatRef = useRef()
  const innerMatRef = useRef()
  const lightRef = useRef()
  const light2Ref = useRef()

  const cyanColor   = useMemo(() => new THREE.Color('#00f3ff'), [])
  const toxicColor  = useMemo(() => new THREE.Color('#39ff14'), [])
  const purpleColor = useMemo(() => new THREE.Color('#b300ff'), [])
  const currentColor = useMemo(() => new THREE.Color(), [])

  useFrame((_, delta) => {
    const p = scrollProgressRef?.current ?? 0

    if (ring1Ref.current) ring1Ref.current.rotation.x += delta * 0.6
    if (ring2Ref.current) ring2Ref.current.rotation.y += delta * 0.4
    if (ring3Ref.current) ring3Ref.current.rotation.z += delta * 0.8

    currentColor.copy(cyanColor).lerp(purpleColor, p)
    if (coreMatRef.current) {
      coreMatRef.current.color.copy(currentColor)
      coreMatRef.current.emissive.copy(currentColor)
      coreMatRef.current.emissiveIntensity = 2 + p * 2
    }
    if (innerMatRef.current) {
      innerMatRef.current.emissive.copy(currentColor)
    }
    if (lightRef.current) {
      lightRef.current.color.copy(currentColor)
      lightRef.current.intensity = 18 + p * 10
    }
    if (light2Ref.current) {
      light2Ref.current.color.copy(p > 0.6 ? purpleColor : toxicColor)
    }
  })

  return (
    <Float speed={1.8} rotationIntensity={0.35} floatIntensity={0.9}>
      <group position={[0, 0, 0]}>
        {/* Outer wireframe icosahedron */}
        <mesh>
          <icosahedronGeometry args={[0.7, 1]} />
          <meshStandardMaterial
            ref={coreMatRef}
            color="#00f3ff"
            emissive="#00f3ff"
            emissiveIntensity={2}
            wireframe
          />
        </mesh>

        {/* Solid inner core */}
        <mesh>
          <icosahedronGeometry args={[0.28, 0]} />
          <meshStandardMaterial
            ref={innerMatRef}
            color="#001020"
            emissive="#00f3ff"
            emissiveIntensity={1.5}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Ring 1 — equatorial */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[1.25, 0.022, 8, 72]} />
          <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={4} />
        </mesh>

        {/* Ring 2 — tilted */}
        <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.55, 0.014, 8, 72]} />
          <meshStandardMaterial color="#39ff14" emissive="#39ff14" emissiveIntensity={3} />
        </mesh>

        {/* Ring 3 — perpendicular */}
        <mesh ref={ring3Ref} rotation={[0, Math.PI / 3, Math.PI / 6]}>
          <torusGeometry args={[0.95, 0.018, 8, 72]} />
          <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={3} />
        </mesh>

        {/* Lights */}
        <pointLight ref={lightRef} color="#00f3ff" intensity={18} distance={22} decay={2} />
        <pointLight ref={light2Ref} color="#39ff14" intensity={6} distance={12} decay={2} position={[0, 0.8, 0]} />
      </group>
    </Float>
  )
}
