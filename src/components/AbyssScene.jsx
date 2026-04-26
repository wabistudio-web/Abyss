import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import MarineSnow from './MarineSnow'
import Drone from './Drone'

function MouseSpotLight({ mouseRef }) {
  const lightRef = useRef()
  const targetPos = useMemo(() => ({ x: 0, y: 0 }), [])

  useFrame(() => {
    if (!lightRef.current || !mouseRef?.current) return
    targetPos.x += (mouseRef.current.x * 6 - targetPos.x) * 0.04
    targetPos.y += (mouseRef.current.y * 4 - targetPos.y) * 0.04
    lightRef.current.position.set(targetPos.x, targetPos.y, 5)
  })

  return (
    <spotLight
      ref={lightRef}
      position={[0, 0, 5]}
      intensity={8}
      distance={25}
      angle={0.55}
      penumbra={0.85}
      color="#00b4d8"
      castShadow={false}
    />
  )
}

function SceneEnvironment({ scrollProgressRef }) {
  const { scene } = useThree()
  const bgStart  = useMemo(() => new THREE.Color('#020b14'), [])
  const bgEnd    = useMemo(() => new THREE.Color('#000000'), [])
  const bgCurrent = useMemo(() => new THREE.Color('#020b14'), [])
  const fogColor  = useMemo(() => new THREE.Color('#010508'), [])

  useFrame(() => {
    const p = scrollProgressRef?.current ?? 0
    bgCurrent.copy(bgStart).lerp(bgEnd, p)
    scene.background = bgCurrent
    if (!scene.fog) scene.fog = new THREE.FogExp2(fogColor.getHex(), 0.018)
    scene.fog.color.copy(bgCurrent)
    scene.fog.density = 0.018 + p * 0.028
  })

  return null
}

const chromaticOffset = new THREE.Vector2(0.0018, 0.001)

export default function AbyssScene({ scrollProgressRef, mouseRef }) {
  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
      }}
      camera={{ position: [0, 0, 10], fov: 55, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      dpr={Math.min(window.devicePixelRatio, 2)}
    >
      <SceneEnvironment scrollProgressRef={scrollProgressRef} />
      <ambientLight intensity={0.04} color="#001a2e" />
      <MouseSpotLight mouseRef={mouseRef} />
      <MarineSnow />
      <Drone scrollProgressRef={scrollProgressRef} />

      <EffectComposer multisampling={0}>
        <Bloom
          mipmapBlur
          intensity={2.2}
          luminanceThreshold={0.08}
          luminanceSmoothing={0.9}
          blendFunction={BlendFunction.ADD}
        />
        <ChromaticAberration
          offset={chromaticOffset}
          blendFunction={BlendFunction.NORMAL}
        />
        <Vignette eskil={false} offset={0.35} darkness={0.85} />
      </EffectComposer>
    </Canvas>
  )
}
