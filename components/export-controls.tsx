"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, Share2, Camera, FileImage, Link } from "lucide-react"
import { useStudioStore } from "@/lib/studio-store"

export function ExportControls() {
  const { generateShareLink, exportConfiguration } = useStudioStore()

  const handleScreenshot = () => {
    // This would capture the canvas
    console.log("Taking screenshot...")
  }

  const handleExport3D = () => {
    // This would export the 3D model
    console.log("Exporting 3D model...")
  }

  const handleShare = async () => {
    const link = generateShareLink()
    await navigator.clipboard.writeText(link)
    console.log("Share link copied to clipboard")
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleShare}
        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-slate-800 border-slate-700">
          <DropdownMenuItem onClick={handleScreenshot} className="text-white">
            <Camera className="w-4 h-4 mr-2" />
            Screenshot (PNG)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExport3D} className="text-white">
            <FileImage className="w-4 h-4 mr-2" />
            3D Model (GLB)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => exportConfiguration()} className="text-white">
            <Link className="w-4 h-4 mr-2" />
            Configuration
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
