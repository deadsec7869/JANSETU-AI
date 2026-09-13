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
      const targetX = state.pointer.x * 0.18;
      const targetY = state.pointer.y * 0.12;
      worldGroupRef.current.rotation.y = THREE.MathUtils.damp(worldGroupRef.current.rotation.y, targetX, 1.5, delta);
      worldGroupRef.current.rotation.x = THREE.MathUtils.damp(worldGroupRef.current.rotation.x, -targetY, 1.5, delta);
    }

    if (ringGroupRef.current) {
      ringGroupRef.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <group ref={worldGroupRef}>
      {/* Atmosphere Fog & Dark Blueprint Ambience */}
      <color attach="background" args={['#030712']} />
      <fog attach="fog" args={['#030712', 6, 28]} />

      <ambientLight intensity={0.45 * intensity} />
      <directionalLight
        position={[8, 12, 8]}
        intensity={0.9 * intensity}
        color="#22d3ee"
      />
      <directionalLight
        position={[-8, -8, -4]}
        intensity={0.4 * intensity}
        color="#3b82f6"
      />
      <pointLight
        position={[0, 0, 4]}
        intensity={0.6 * intensity}
        color="#06b6d4"
        distance={18}
      />

      {/* Midground Subtle Datum Ring */}
      <Float speed={0.8} rotationIntensity={0.08} floatIntensity={0.15}>
        <group ref={ringGroupRef} position={[0, 0, -1.8]}>
          <mesh rotation={[Math.PI / 2.6, 0, 0]}>
            <torusGeometry args={[4.8, 0.008, 16, 120]} />
            <meshBasicMaterial color="#0891b2" transparent opacity={0.2} />
          </mesh>
        </group>
      </Float>

      {/* Subtle Coordinate Grid Floor */}
      {showGrid && (
        <gridHelper
          args={[30, 30, '#0e7490', '#1e293b']}
          position={[0, -3.8, 0]}
          rotation={[0, 0, 0]}
        />
      )}
    </group>
  );
};
