# 🎨 Materialize 3D - Interactive Product Studio

<div align="center">

![Materialize 3D](https://img.shields.io/badge/Materialize-3D-00d4aa?style=for-the-badge&logo=three.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-latest-000000?style=for-the-badge&logo=three.js&logoColor=white)

**An immersive 3D product visualization studio with real-time material editing and physics simulation**

[🚀 Live Demo](#) • [📖 Documentation](#) • [🐛 Report Bug](#) • [💡 Request Feature](#)

</div>

---

## ✨ Features

### 🎯 Core Capabilities

- **🎨 Real-time Material Editor** - Customize colors, metalness, roughness, and clearcoat with live preview
- **💎 Advanced Material Presets** - Gold, Silver, Rose Gold, and Matte Black with one-click application
- **🌍 Dynamic Environment System** - Studio, Sunset, Night, and Warehouse lighting environments
- **💡 Professional Lighting Setup** - Key, fill, rim, and ambient lights with intensity controls
- **🎭 Physics Simulation** - Interactive physics demo with realistic object behavior
- **📊 Performance Monitoring** - Real-time FPS, draw calls, and memory usage tracking
- **📱 Responsive Design** - Optimized for desktop and mobile devices
- **🎮 Interactive Controls** - Orbit, zoom, and presentation controls for optimal viewing

### 🛠️ Technical Features

- **⚡ Real-time Rendering** - 60fps+ performance with optimized Three.js rendering
- **🎨 Custom Shader Materials** - Advanced material system with custom GLSL shaders
- **🔧 Modular Architecture** - Clean, maintainable codebase with component-based design
- **📦 Modern Tech Stack** - Next.js 14, React 18, TypeScript, and Tailwind CSS
- **🎯 State Management** - Zustand for efficient global state management
- **🎨 UI Components** - Comprehensive shadcn/ui component library

---

## 🎮 Interactive Demo

Experience the full capabilities of Materialize 3D:

```bash
# Clone the repository
git clone https://github.com/yourusername/materialize-3d.git

# Navigate to the project directory
cd materialize-3d

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Visit `http://localhost:3000` to explore the interactive 3D studio!

---

## 🏗️ Project Structure

```
materialize-3d/
├── 📁 app/                    # Next.js app directory
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page component
├── 📁 components/            # React components
│   ├── 📁 ui/               # UI components (shadcn/ui)
│   ├── custom-material.tsx   # Custom material system
│   ├── environment-controls.tsx # Environment controls
│   ├── export-controls.tsx   # Export functionality
│   ├── material-editor.tsx   # Material editor interface
│   ├── performance-monitor.tsx # Performance tracking
│   ├── product-selector.tsx  # Product selection
│   ├── product-studio.tsx    # Main 3D studio
│   ├── studio-lighting.tsx   # Lighting system
│   ├── ui-overlay.tsx        # UI overlay management
│   └── watch-product.tsx     # 3D watch model
├── 📁 hooks/                 # Custom React hooks
├── 📁 lib/                   # Utility libraries
│   ├── studio-store.tsx      # Zustand state management
│   └── utils.ts              # Utility functions
└── 📁 public/               # Static assets
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ 
- **pnpm** (recommended) or npm
- **Modern browser** with WebGL support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/materialize-3d.git
   cd materialize-3d
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

---

## 🎨 Usage Guide

### Material Editor

1. **Color Customization**
   - Click on color swatches to open the color picker
   - Adjust case, face, and strap colors independently
   - Real-time preview of changes

2. **Material Properties**
   - **Metalness**: Controls metallic appearance (0-1)
   - **Roughness**: Controls surface smoothness (0-1)
   - **Clearcoat**: Adds glossy overlay effect (0-1)

3. **Material Presets**
   - **Gold**: High metalness, low roughness
   - **Silver**: Metallic finish with medium roughness
   - **Rose Gold**: Warm metallic tone
   - **Matte Black**: Low metalness, high roughness

### Environment Controls

1. **Environment Presets**
   - **Studio**: Professional lighting setup
   - **Sunset**: Warm, dramatic lighting
   - **Night**: Cool, ambient lighting
   - **Warehouse**: Industrial lighting

2. **Lighting Controls**
   - **Key Light**: Main directional light
   - **Fill Light**: Secondary soft light
   - **Ambient**: Overall scene illumination
   - **Animation**: Toggle light movement

### Physics Demo

- Toggle physics simulation to see realistic object behavior
- Watch objects fall and interact with gravity
- Experience real-time physics calculations

---

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with concurrent features
- **Next.js 14** - Full-stack React framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework

### 3D Graphics
- **Three.js** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for React Three Fiber
- **@react-three/rapier** - Physics simulation

### UI Components
- **shadcn/ui** - Beautiful, accessible components
- **Radix UI** - Headless UI primitives
- **Lucide React** - Beautiful icons

### State Management
- **Zustand** - Lightweight state management
- **React Hook Form** - Form state management

### Development Tools
- **pnpm** - Fast, disk space efficient package manager
- **ESLint** - Code linting
- **Prettier** - Code formatting

---

## 🎯 Key Features Deep Dive

### Real-time Material System

```typescript
// Custom shader material with real-time updates
const CustomShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color(0.5, 0.5, 0.5),
    uMetalness: 0.5,
    uRoughness: 0.5,
    uEnvMapIntensity: 1.0,
  },
  // Vertex shader
  `...`,
  // Fragment shader with PBR lighting
  `...`
)
```

### Performance Monitoring

```typescript
// Real-time performance tracking
useFrame((state) => {
  frameCount.current++
  const now = performance.now()
  
  if (now - lastTime.current >= 1000) {
    updatePerformance({
      fps: Math.round((frameCount.current * 1000) / (now - lastTime.current)),
      drawCalls: state.gl.info.render.calls,
      heap: (performance as any).memory?.usedJSHeapSize || 0,
    })
  }
})
```

### State Management

```typescript
// Zustand store for global state
interface StudioState {
  materialConfig: MaterialConfig
  lightingConfig: LightingConfig
  environment: string
  performance: { fps: number; drawCalls: number; heap: number }
  // ... more state
}
```

---

## 🎨 Customization

### Adding New Materials

1. **Create custom shader** in `components/custom-material.tsx`
2. **Add material preset** in `components/material-editor.tsx`
3. **Update types** in `lib/studio-store.tsx`

### Adding New Products

1. **Create 3D model component** in `components/`
2. **Add product selector** in `components/product-selector.tsx`
3. **Update store** with new product configuration

### Custom Environments

1. **Add environment preset** in Three.js Environment component
2. **Update environment controls** in `components/environment-controls.tsx`
3. **Configure lighting** for new environment

---

## 📊 Performance Optimization

### Rendering Optimizations

- **Frustum Culling** - Only render visible objects
- **Level of Detail (LOD)** - Adjust detail based on distance
- **Instanced Rendering** - Efficient batch rendering
- **Texture Compression** - Optimized texture formats

### Memory Management

- **Texture Pooling** - Reuse texture objects
- **Geometry Instancing** - Share geometry data
- **Automatic Cleanup** - Dispose unused resources
- **Memory Monitoring** - Real-time memory tracking

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests** (if applicable)
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Code Style

- **TypeScript** - All code must be typed
- **ESLint** - Follow linting rules
- **Prettier** - Consistent code formatting
- **Component Structure** - Follow established patterns

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Three.js Community** - Amazing 3D graphics library
- **React Three Fiber** - React integration for Three.js
- **shadcn/ui** - Beautiful component library
- **Zustand** - Simple state management
- **Vercel** - Next.js framework and deployment

---

## 📞 Support

- **📧 Email**: support@materialize3d.com
- **🐛 Issues**: [GitHub Issues](https://github.com/yourusername/materialize-3d/issues)
- **💬 Discord**: [Join our community](https://discord.gg/materialize3d)
- **📖 Documentation**: [Read the docs](https://docs.materialize3d.com)

---

<div align="center">

**Made with ❤️ by the Materialize 3D Team**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/materialize-3d?style=social)](https://github.com/yourusername/materialize-3d)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/materialize-3d?style=social)](https://github.com/yourusername/materialize-3d)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/materialize-3d)](https://github.com/yourusername/materialize-3d/issues)
[![GitHub license](https://img.shields.io/github/license/yourusername/materialize-3d)](https://github.com/yourusername/materialize-3d/blob/main/LICENSE)

</div> 