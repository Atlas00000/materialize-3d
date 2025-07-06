"use client"

import { useStudioStore } from "@/lib/studio-store"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Sun, Moon, Lightbulb, Zap } from "lucide-react"

export function EnvironmentControls() {
  const {
    environment,
    setEnvironment,
    lightingConfig,
    updateLightingConfig,
    showPhysics,
    setShowPhysics,
    animateRotation,
    setAnimateRotation,
  } = useStudioStore()

  const environments = [
    { name: "studio", label: "Studio", icon: Lightbulb },
    { name: "sunset", label: "Sunset", icon: Sun },
    { name: "night", label: "Night", icon: Moon },
    { name: "warehouse", label: "Warehouse", icon: Lightbulb },
  ]

  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center gap-2">
          <Sun className="w-4 h-4" />
          Environment & Lighting
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Environment Presets */}
        <div className="space-y-2">
          <Label className="text-white text-sm">Environment</Label>
          <div className="grid grid-cols-2 gap-2">
            {environments.map((env) => {
              const Icon = env.icon
              return (
                <Button
                  key={env.name}
                  variant={environment === env.name ? "default" : "outline"}
                  size="sm"
                  onClick={() => setEnvironment(env.name)}
                  className="text-xs justify-start"
                >
                  <Icon className="w-3 h-3 mr-1" />
                  {env.label}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Lighting Controls */}
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white text-sm">Key Light: {lightingConfig.keyLightIntensity.toFixed(1)}</Label>
            <Slider
              value={[lightingConfig.keyLightIntensity]}
              onValueChange={([value]) => updateLightingConfig({ keyLightIntensity: value })}
              max={3}
              min={0}
              step={0.1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white text-sm">Fill Light: {lightingConfig.fillLightIntensity.toFixed(1)}</Label>
            <Slider
              value={[lightingConfig.fillLightIntensity]}
              onValueChange={([value]) => updateLightingConfig({ fillLightIntensity: value })}
              max={2}
              min={0}
              step={0.1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white text-sm">Ambient: {lightingConfig.ambientIntensity.toFixed(1)}</Label>
            <Slider
              value={[lightingConfig.ambientIntensity]}
              onValueChange={([value]) => updateLightingConfig({ ambientIntensity: value })}
              max={1}
              min={0}
              step={0.1}
              className="w-full"
            />
          </div>
        </div>

        {/* Animation Controls */}
        <div className="space-y-3 pt-2 border-t border-white/10">
          <div className="flex items-center justify-between">
            <Label className="text-white text-sm">Auto Rotate</Label>
            <Switch checked={animateRotation} onCheckedChange={setAnimateRotation} />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-white text-sm">Animate Lights</Label>
            <Switch
              checked={lightingConfig.animateLights}
              onCheckedChange={(checked) => updateLightingConfig({ animateLights: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-white text-sm flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Physics Demo
            </Label>
            <Switch checked={showPhysics} onCheckedChange={setShowPhysics} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
