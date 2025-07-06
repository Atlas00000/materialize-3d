"use client"

import { useRef, useMemo } from "react"
import { useFrame, extend } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"
import * as THREE from "three"

const CustomShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color(0.5, 0.5, 0.5),
    uMetalness: 0.5,
    uRoughness: 0.5,
    uEnvMapIntensity: 1.0,
  },
  // Vertex shader
  `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uMetalness;
    uniform float uRoughness;
    uniform float uEnvMapIntensity;
    
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    
    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(-vPosition);
      
      // Fresnel effect
      float fresnel = pow(1.0 - dot(normal, viewDir), 2.0);
      
      // Base color with metallic influence
      vec3 baseColor = mix(uColor, uColor * 0.04, uMetalness);
      
      // Simple lighting
      vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
      float NdotL = max(dot(normal, lightDir), 0.0);
      
      // Specular reflection
      vec3 reflectDir = reflect(-lightDir, normal);
      float spec = pow(max(dot(viewDir, reflectDir), 0.0), mix(4.0, 64.0, 1.0 - uRoughness));
      
      // Final color
      vec3 color = baseColor * (0.3 + 0.7 * NdotL) + spec * mix(0.04, 1.0, uMetalness);
      color += fresnel * uEnvMapIntensity * 0.1;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `,
)

extend({ CustomShaderMaterial })

interface CustomMaterialProps {
  type: "case" | "face" | "strap"
  color: string
  metalness: number
  roughness: number
}

export function CustomMaterial({ type, color, metalness, roughness }: CustomMaterialProps) {
  const materialRef = useRef<any>()

  const colorObj = useMemo(() => new THREE.Color(color), [color])

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime
    }
  })

  // Use custom shader for advanced materials, standard for simple ones
  if (type === "case" && metalness > 0.5) {
    return (
      <customShaderMaterial
        ref={materialRef}
        uColor={colorObj}
        uMetalness={metalness}
        uRoughness={roughness}
        uEnvMapIntensity={1.0}
      />
    )
  }

  return <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} envMapIntensity={1.0} />
}
