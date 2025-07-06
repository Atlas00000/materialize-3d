"use client"

import { MaterialEditor } from "@/components/material-editor"
import { EnvironmentControls } from "@/components/environment-controls"
import { ProductSelector } from "@/components/product-selector"
import { ExportControls } from "@/components/export-controls"
import { PerformanceMonitor } from "@/components/performance-monitor"

export function UI() {
  return (
    <>
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-4 pointer-events-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-white">Materialize 3D</h1>
            <div className="text-sm text-white/60">Product Studio</div>
          </div>
          <ExportControls />
        </div>
      </header>

      {/* Left Panel */}
      <div className="absolute left-4 top-20 bottom-4 w-80 pointer-events-auto">
        <div className="h-full bg-black/20 backdrop-blur-md rounded-lg border border-white/10 overflow-hidden">
          <div className="p-4 space-y-6 h-full overflow-y-auto">
            <ProductSelector />
            <MaterialEditor />
            <EnvironmentControls />
          </div>
        </div>
      </div>

      {/* Performance Monitor */}
      <div className="absolute bottom-4 right-4 pointer-events-auto">
        <PerformanceMonitor />
      </div>
    </>
  )
}
