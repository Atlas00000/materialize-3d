"use client"

import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { useStudioStore } from "@/lib/studio-store"

export function PerformanceStats() {
  const updatePerformance = useStudioStore((s) => s.updatePerformance)
  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())

  useFrame((state) => {
    frameCount.current++
    const now = performance.now()

    if (now - lastTime.current >= 1000) {
      updatePerformance({
        fps: Math.round((frameCount.current * 1000) / (now - lastTime.current)),
        drawCalls: state.gl.info.render.calls,
        heap: (performance as any).memory?.usedJSHeapSize || 0,
      })
      frameCount.current = 0
      lastTime.current = now
    }
  })

  return null
}
