"use client"

import { create } from "zustand"
import { createContext, useContext, type ReactNode } from "react"

interface MaterialConfig {
  caseColor: string
  faceColor: string
  strapColor: string
  metalness: number
  roughness: number
  clearcoat: number
  preset: string
}

interface WatchConfig {
  style: string
  size: string
  band: string
}

interface LightingConfig {
  keyLightIntensity: number
  fillLightIntensity: number
  rimLightIntensity: number
  ambientIntensity: number
  keyLightColor: string
  fillLightColor: string
  ambientColor: string
  animateLights: boolean
}

interface StudioState {
  // Material configuration
  materialConfig: MaterialConfig
  updateMaterialConfig: (config: Partial<MaterialConfig>) => void

  // Product configuration
  watchConfig: WatchConfig
  updateWatchConfig: (config: Partial<WatchConfig>) => void

  // Environment
  environment: string
  setEnvironment: (env: string) => void

  // Lighting
  lightingConfig: LightingConfig
  updateLightingConfig: (config: Partial<LightingConfig>) => void

  // Animation
  animateRotation: boolean
  setAnimateRotation: (animate: boolean) => void

  // Physics
  showPhysics: boolean
  setShowPhysics: (show: boolean) => void

  // Performance
  performance: { fps: number; drawCalls: number; heap: number }
  updatePerformance: (p: Partial<{ fps: number; drawCalls: number; heap: number }>) => void

  // Export functions
  generateShareLink: () => string
  exportConfiguration: () => void
}

const useStudioStoreImpl = create<StudioState>((set, get) => ({
  // Initial material configuration
  materialConfig: {
    caseColor: "#C0C0C0",
    faceColor: "#000000",
    strapColor: "#8B4513",
    metalness: 0.8,
    roughness: 0.2,
    clearcoat: 0.5,
    preset: "silver",
  },

  updateMaterialConfig: (config) =>
    set((state) => ({
      materialConfig: { ...state.materialConfig, ...config },
    })),

  // Initial watch configuration
  watchConfig: {
    style: "sport",
    size: "42mm",
    band: "sport",
  },

  updateWatchConfig: (config) =>
    set((state) => ({
      watchConfig: { ...state.watchConfig, ...config },
    })),

  // Environment
  environment: "studio",
  setEnvironment: (env) => set({ environment: env }),

  // Lighting configuration
  lightingConfig: {
    keyLightIntensity: 1.5,
    fillLightIntensity: 0.8,
    rimLightIntensity: 0.5,
    ambientIntensity: 0.3,
    keyLightColor: "#ffffff",
    fillLightColor: "#ffffff",
    ambientColor: "#404040",
    animateLights: false,
  },

  updateLightingConfig: (config) =>
    set((state) => ({
      lightingConfig: { ...state.lightingConfig, ...config },
    })),

  // Animation
  animateRotation: false,
  setAnimateRotation: (animate) => set({ animateRotation: animate }),

  // Physics
  showPhysics: false,
  setShowPhysics: (show) => set({ showPhysics: show }),

  // Performance
  performance: { fps: 0, drawCalls: 0, heap: 0 },

  updatePerformance: (p) => set((state) => ({ performance: { ...state.performance, ...p } })),

  // Export functions
  generateShareLink: () => {
    const state = get()
    const config = {
      material: state.materialConfig,
      watch: state.watchConfig,
      environment: state.environment,
      lighting: state.lightingConfig,
    }
    const encoded = btoa(JSON.stringify(config))
    return `${window.location.origin}?config=${encoded}`
  },

  exportConfiguration: () => {
    const state = get()
    const config = {
      material: state.materialConfig,
      watch: state.watchConfig,
      environment: state.environment,
      lighting: state.lightingConfig,
      timestamp: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: "application/json",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "materialize-3d-config.json"
    a.click()
    URL.revokeObjectURL(url)
  },
}))

const StudioContext = createContext<ReturnType<typeof useStudioStoreImpl> | null>(null)

export function StudioProvider({ children }: { children: ReactNode }) {
  const store = useStudioStoreImpl()
  return <StudioContext.Provider value={store}>{children}</StudioContext.Provider>
}

export function useStudioStore() {
  const context = useContext(StudioContext)
  if (!context) {
    throw new Error("useStudioStore must be used within a StudioProvider")
  }
  return context
}
