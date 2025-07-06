"use client"
import { OrbitControls, Environment, ContactShadows, PresentationControls, Text, Float } from "@react-three/drei"
import { Physics, RigidBody } from "@react-three/rapier"
import { useStudioStore } from "@/lib/studio-store"
import { WatchProduct } from "@/components/watch-product"
import { StudioLighting } from "@/components/studio-lighting"
import { PerformanceStats } from "@/components/performance-stats"

export function ProductStudio() {
  const { environment, showPhysics } = useStudioStore()

  return (
    <>
      {/* Perf collector */} <PerformanceStats />
      <StudioLighting />
      <Environment preset={environment as any} background blur={0.8} />
      <PresentationControls
        enabled={true}
        global={false}
        cursor={true}
        snap={false}
        speed={1}
        zoom={1}
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
      >
        {showPhysics ? (
          <Physics gravity={[0, -9.81, 0]}>
            <RigidBody type="fixed">
              <WatchProduct />
            </RigidBody>
            <PhysicsDemo />
          </Physics>
        ) : (
          <WatchProduct />
        )}
      </PresentationControls>
      <ContactShadows position={[0, -1.4, 0]} opacity={0.4} scale={10} blur={2.4} far={4} />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={8}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI - Math.PI / 6}
      />
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.1}>
        <Text
          position={[0, 3, 0]}
          fontSize={0.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.ttf"
        >
          Materialize 3D
        </Text>
      </Float>
    </>
  )
}

function PhysicsDemo() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <RigidBody key={i} position={[Math.random() * 4 - 2, 5 + i, Math.random() * 4 - 2]}>
          <mesh castShadow>
            <sphereGeometry args={[0.1]} />
            <meshStandardMaterial color={`hsl(${i * 60}, 70%, 50%)`} />
          </mesh>
        </RigidBody>
      ))}
    </>
  )
}
