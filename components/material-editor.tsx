"use client"

import { useStudioStore } from "@/lib/studio-store"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HexColorPicker } from "react-colorful"
import { useState } from "react"
import { Palette, Sliders, Sparkles } from "lucide-react"

export function MaterialEditor() {
  const { materialConfig, updateMaterialConfig } = useStudioStore()
  const [activeColorPicker, setActiveColorPicker] = useState<string | null>(null)

  const ColorPicker = ({
    label,
    value,
    onChange,
    id,
  }: {
    label: string
    value: string
    onChange: (color: string) => void
    id: string
  }) => (
    <div className="space-y-2">
      <Label className="text-white text-sm">{label}</Label>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="w-8 h-8 p-0 border-white/20 bg-transparent"
          style={{ backgroundColor: value }}
          onClick={() => setActiveColorPicker(activeColorPicker === id ? null : id)}
        />
        <div className="text-xs text-white/60 font-mono">{value}</div>
      </div>
      {activeColorPicker === id && (
        <div className="mt-2">
          <HexColorPicker color={value} onChange={onChange} />
        </div>
      )}
    </div>
  )

  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Material Editor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="colors" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/10">
            <TabsTrigger value="colors" className="text-xs">
              Colors
            </TabsTrigger>
            <TabsTrigger value="properties" className="text-xs">
              Properties
            </TabsTrigger>
            <TabsTrigger value="effects" className="text-xs">
              Effects
            </TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-4 mt-4">
            <ColorPicker
              label="Case Color"
              value={materialConfig.caseColor}
              onChange={(color) => updateMaterialConfig({ caseColor: color })}
              id="case"
            />

            <ColorPicker
              label="Face Color"
              value={materialConfig.faceColor}
              onChange={(color) => updateMaterialConfig({ faceColor: color })}
              id="face"
            />

            <ColorPicker
              label="Strap Color"
              value={materialConfig.strapColor}
              onChange={(color) => updateMaterialConfig({ strapColor: color })}
              id="strap"
            />
          </TabsContent>

          <TabsContent value="properties" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label className="text-white text-sm flex items-center gap-2">
                <Sliders className="w-3 h-3" />
                Metalness: {materialConfig.metalness.toFixed(2)}
              </Label>
              <Slider
                value={[materialConfig.metalness]}
                onValueChange={([value]) => updateMaterialConfig({ metalness: value })}
                max={1}
                min={0}
                step={0.01}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white text-sm">Roughness: {materialConfig.roughness.toFixed(2)}</Label>
              <Slider
                value={[materialConfig.roughness]}
                onValueChange={([value]) => updateMaterialConfig({ roughness: value })}
                max={1}
                min={0}
                step={0.01}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white text-sm">Clearcoat: {materialConfig.clearcoat.toFixed(2)}</Label>
              <Slider
                value={[materialConfig.clearcoat]}
                onValueChange={([value]) => updateMaterialConfig({ clearcoat: value })}
                max={1}
                min={0}
                step={0.01}
                className="w-full"
              />
            </div>
          </TabsContent>

          <TabsContent value="effects" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={materialConfig.preset === "gold" ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  updateMaterialConfig({
                    preset: "gold",
                    caseColor: "#FFD700",
                    metalness: 0.9,
                    roughness: 0.1,
                  })
                }
                className="text-xs"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                Gold
              </Button>

              <Button
                variant={materialConfig.preset === "silver" ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  updateMaterialConfig({
                    preset: "silver",
                    caseColor: "#C0C0C0",
                    metalness: 0.9,
                    roughness: 0.1,
                  })
                }
                className="text-xs"
              >
                Silver
              </Button>

              <Button
                variant={materialConfig.preset === "black" ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  updateMaterialConfig({
                    preset: "black",
                    caseColor: "#1a1a1a",
                    metalness: 0.1,
                    roughness: 0.9,
                  })
                }
                className="text-xs"
              >
                Matte Black
              </Button>

              <Button
                variant={materialConfig.preset === "rose" ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  updateMaterialConfig({
                    preset: "rose",
                    caseColor: "#E8B4B8",
                    metalness: 0.8,
                    roughness: 0.2,
                  })
                }
                className="text-xs"
              >
                Rose Gold
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
