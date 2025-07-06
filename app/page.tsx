"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { ProductStudio } from "@/components/product-studio"
import { UI } from "@/components/ui-overlay"
import { StudioProvider } from "@/lib/studio-store"
import { Loader2 } from "lucide-react"

export default function Home() {
  return (
    <StudioProvider>
      <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }} gl={{ antialias: true, alpha: false }}>
            <Suspense fallback={null}>
              <ProductStudio />
            </Suspense>
          </Canvas>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <UI />
        </div>

        {/* Loading Overlay */}
        <Suspense
          fallback={
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-4 text-white">
                <Loader2 className="w-8 h-8 animate-spin" />
                <p className="text-lg font-medium">Loading Materialize 3D...</p>
              </div>
            </div>
          }
        >
          <div />
        </Suspense>
      </div>
    </StudioProvider>
  )
}
