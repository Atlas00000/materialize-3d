"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Activity } from "lucide-react"
import { useStudioStore } from "@/lib/studio-store"

export function PerformanceMonitor() {
  const { fps, drawCalls, heap } = useStudioStore((s) => s.performance)

  return (
    <Card className="bg-black/20 backdrop-blur-md border-white/10 w-48">
      <CardContent className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-4 h-4 text-green-400" />
          <span className="text-white text-sm font-medium">Performance</span>
        </div>
        <div className="space-y-1 text-xs">
          <Metric label="FPS" value={fps} good={fps >= 50} warn={fps >= 30 && fps < 50} />
          <Metric label="Draw Calls" value={drawCalls} />
          <Metric label="Memory" value={`${Math.round(heap / 1048576)} MB`} />
        </div>
      </CardContent>
    </Card>
  )
}

function Metric({
  label,
  value,
  good,
  warn,
}: {
  label: string
  value: number | string
  good?: boolean
  warn?: boolean
}) {
  const color = good ? "text-green-400" : warn ? "text-yellow-400" : "text-red-400"
  return (
    <div className="flex justify-between text-white/80">
      <span>{label}:</span>
      <span className={typeof value === "number" ? color : ""}>{value}</span>
    </div>
  )
}
