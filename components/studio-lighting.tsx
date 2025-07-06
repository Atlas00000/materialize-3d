"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useStudioStore } from "@/lib/studio-store"
import type * as THREE from "three"

export function StudioLighting() {
  const { lightingConfig } = useStudioStore()
  const keyLightRef = useRef<THREE.DirectionalLight>(null)
  const fillLightRef = useRef<THREE.DirectionalLight>(null)

  useFrame((state) => {
    if (keyLightRef.current && lightingConfig.animateLights) {
      keyLightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 3
      keyLightRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.5) * 3
    }
  })

  return (
    <>
      {/* Key Light */}
      <directionalLight
        ref={keyLightRef}
        position={[5, 5, 5]}
        intensity={lightingConfig.keyLightIntensity}
        color={lightingConfig.keyLightColor}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Fill Light */}
      <directionalLight
        ref={fillLightRef}
        position={[-3, 2, -3]}
        intensity={lightingConfig.fillLightIntensity}
        color={lightingConfig.fillLightColor}
      />

      {/* Rim Light */}
      <directionalLight position={[0, 2, -5]} intensity={lightingConfig.rimLightIntensity} color="#ffffff" />

      {/* Ambient Light */}
      <ambientLight intensity={lightingConfig.ambientIntensity} color={lightingConfig.ambientColor} />

      {/* Point Lights for Highlights */}
      <pointLight position={[2, 1, 2]} intensity={0.5} color="#ffffff" distance={10} decay={2} />

      <pointLight position={[-2, 1, -2]} intensity={0.3} color="#4f46e5" distance={8} decay={2} />
    </>
  )
}
