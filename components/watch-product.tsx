"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { useStudioStore } from "@/lib/studio-store"
import { CustomMaterial } from "@/components/custom-material"
import * as THREE from "three"

export function WatchProduct() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { watchConfig, materialConfig, animateRotation } = useStudioStore()

  useFrame((state) => {
    if (meshRef.current && animateRotation) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  const watchGeometry = useMemo(() => {
    const group = new THREE.Group()

    // Watch case
    const caseGeometry = new THREE.CylinderGeometry(1, 1, 0.3, 32)
    const caseMesh = new THREE.Mesh(caseGeometry)
    caseMesh.position.y = 0
    group.add(caseMesh)

    // Watch face
    const faceGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.05, 32)
    const faceMesh = new THREE.Mesh(faceGeometry)
    faceMesh.position.y = 0.15
    group.add(faceMesh)

    // Watch crown
    const crownGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.2, 8)
    const crownMesh = new THREE.Mesh(crownGeometry)
    crownMesh.position.set(1, 0, 0)
    crownMesh.rotation.z = Math.PI / 2
    group.add(crownMesh)

    return group
  }, [])

  return (
    <group ref={meshRef}>
      {/* Watch Case */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1, 1, 0.3, 32]} />
        <CustomMaterial
          type="case"
          color={materialConfig.caseColor}
          metalness={materialConfig.metalness}
          roughness={materialConfig.roughness}
        />
      </mesh>

      {/* Watch Face */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 0.8, 0.05, 32]} />
        <CustomMaterial type="face" color={materialConfig.faceColor} metalness={0.1} roughness={0.8} />
      </mesh>

      {/* Watch Crown */}
      <mesh position={[1, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
        <CustomMaterial
          type="case"
          color={materialConfig.caseColor}
          metalness={materialConfig.metalness}
          roughness={materialConfig.roughness}
        />
      </mesh>

      {/* Watch Strap */}
      <WatchStrap />

      {/* Watch Hands */}
      <WatchHands />
    </group>
  )
}

function WatchStrap() {
  const { watchConfig, materialConfig } = useStudioStore()

  return (
    <group>
      {/* Strap segments */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 1.3
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        return (
          <mesh key={i} position={[x, 0, z]} rotation={[0, angle, 0]} castShadow>
            <boxGeometry args={[0.3, 0.2, 0.1]} />
            <CustomMaterial type="strap" color={materialConfig.strapColor} metalness={0.0} roughness={0.9} />
          </mesh>
        )
      })}
    </group>
  )
}

function WatchHands() {
  const minuteHandRef = useRef<THREE.Mesh>(null)
  const hourHandRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime
    if (minuteHandRef.current) {
      minuteHandRef.current.rotation.z = -time * 0.1
    }
    if (hourHandRef.current) {
      hourHandRef.current.rotation.z = -time * 0.01
    }
  })

  return (
    <group position={[0, 0.2, 0]}>
      {/* Hour Hand */}
      <mesh ref={hourHandRef}>
        <boxGeometry args={[0.02, 0.4, 0.01]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Minute Hand */}
      <mesh ref={minuteHandRef}>
        <boxGeometry args={[0.015, 0.6, 0.01]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Center dot */}
      <mesh>
        <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  )
}
