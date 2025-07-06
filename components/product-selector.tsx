"use client"

import { useStudioStore } from "@/lib/studio-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Watch, Car, Smartphone, Headphones } from "lucide-react"

export function ProductSelector() {
  const { watchConfig, updateWatchConfig } = useStudioStore()

  const products = [
    { id: "watch", name: "Smart Watch", icon: Watch },
    { id: "car", name: "Sports Car", icon: Car },
    { id: "phone", name: "Smartphone", icon: Smartphone },
    { id: "headphones", name: "Headphones", icon: Headphones },
  ]

  const watchStyles = [
    { id: "sport", name: "Sport" },
    { id: "classic", name: "Classic" },
    { id: "luxury", name: "Luxury" },
    { id: "minimal", name: "Minimal" },
  ]

  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center gap-2">
          <Watch className="w-4 h-4" />
          Product Selection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Product Type */}
        <div className="space-y-2">
          <div className="text-sm text-white/80">Product Type</div>
          <div className="grid grid-cols-2 gap-2">
            {products.map((product) => {
              const Icon = product.icon
              return (
                <Button
                  key={product.id}
                  variant={product.id === "watch" ? "default" : "outline"}
                  size="sm"
                  className="text-xs justify-start"
                  disabled={product.id !== "watch"}
                >
                  <Icon className="w-3 h-3 mr-1" />
                  {product.name}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Watch Styles */}
        <div className="space-y-2">
          <div className="text-sm text-white/80">Watch Style</div>
          <div className="grid grid-cols-2 gap-2">
            {watchStyles.map((style) => (
              <Button
                key={style.id}
                variant={watchConfig.style === style.id ? "default" : "outline"}
                size="sm"
                onClick={() => updateWatchConfig({ style: style.id })}
                className="text-xs"
              >
                {style.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Size Options */}
        <div className="space-y-2">
          <div className="text-sm text-white/80">Size</div>
          <div className="flex gap-2">
            {["38mm", "42mm", "45mm"].map((size) => (
              <Button
                key={size}
                variant={watchConfig.size === size ? "default" : "outline"}
                size="sm"
                onClick={() => updateWatchConfig({ size })}
                className="text-xs flex-1"
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
