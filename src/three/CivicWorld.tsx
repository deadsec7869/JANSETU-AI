import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';
import { useReducedMotion } from './hooks/useReducedMotion';

interface CivicWorldProps {
  showGrid?: boolean;
  intensity?: number;
}

export const CivicWorld: React.FC<CivicWorldProps> = ({
  showGrid = true,
  intensity = 1.0,
}) => {
  const reducedMotion = useReducedMotion();
  const worldGroupRef = useRef<THREE.Group>(null);
  const ringGroupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (reducedMotion) return;

    if (worldGroupRef.current) {
      // Subtle, heavy pointer parallax drift (5-15px equivalent)
      const targetX = state.pointer.x * 0.16;
      const targetY = state.pointer.y * 0.10;
      worldGroupRef.current.rotation.y = THREE.MathUtils.damp(worldGroupRef.current.rotation.y, targetX, 1.5, delta);
      worldGroupRef.current.rotation.x = THREE.MathUtils.damp(worldGroupRef.current.rotation.x, -targetY, 1.5, delta);
    }

    if (ringGroupRef.current) {
      ringGroupRef.current.rotation.z += delta * 0.015;
    }
  });

  return (
    <group ref={worldGroupRef}>
      {/* 100% Transparent Canvas Environment - No opaque color plane */}
      <ambientLight intensity={0.65 * intensity} color="#ffffff" />
      
      {/* Key Electric Blue Light */}
      <directionalLight
        position={[8, 12, 8]}
        intensity={0.85 * intensity}
        color="#3b82f6"
      />
      {/* Fill Violet Light */}
      <directionalLight
        position={[-8, -6, -4]}
        intensity={0.45 * intensity}
        color="#8b5cf6"
      />
      {/* Core Specular Point Light */}
      <pointLight
        position={[0, 0, 3.5]}
        intensity={0.5 * intensity}
        color="#60a5fa"
        distance={16}
      />

      {/* Midground Subtle Architectural Datum Ring */}
      <Float speed={0.8} rotationIntensity={0.06} floatIntensity={0.12}>
        <group ref={ringGroupRef} position={[0, 0, -1.8]}>
          <mesh rotation={[Math.PI / 2.6, 0, 0]}>
            <torusGeometry args={[4.8, 0.006, 16, 120]} />
            <meshBasicMaterial color="#3b82f6" transparent opacity={0.12} />
          </mesh>
        </group>
      </Float>

      {/* Subtle Coordinate Grid Floor (Ultra-low opacity, structural only) */}
      {showGrid && (
        <gridHelper
          args={[30, 30, '#3b82f6', '#94a3b8']}
          position={[0, -3.8, 0]}
          rotation={[0, 0, 0]}
        >
          {/* Custom opacity override for grid lines */}
        </gridHelper>
      )}
    </group>
  );
};
