import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';
import { CivicParticles } from './CivicParticles';
import { CivicNodes } from './CivicNodes';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface CivicCoreProps {
  scale?: number;
  position?: [number, number, number];
  onSelectNode?: (nodeId: string) => void;
}

export const CivicCore: React.FC<CivicCoreProps> = ({
  scale = 1.0,
  position = [0, 0, 0],
  onSelectNode,
}) => {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const groupRef = useRef<THREE.Group>(null);
  const nucleusRef = useRef<THREE.Mesh>(null);
  const innerWireframeRef = useRef<THREE.Mesh>(null);
  const orbitalRing1Ref = useRef<THREE.Mesh>(null);
  const orbitalRing2Ref = useRef<THREE.Mesh>(null);
  const orbitalRing3Ref = useRef<THREE.Mesh>(null);
  const pulseRingRef = useRef<THREE.Mesh>(null);

  const reducedMotion = useReducedMotion();

  useFrame((state, delta) => {
    if (reducedMotion) return;

    const t = state.clock.getElapsedTime();

    // Nucleus subtle restrained pulse (calm breathing)
    if (nucleusRef.current) {
      const pulse = 1.0 + Math.sin(t * 1.8) * 0.035;
      nucleusRef.current.scale.set(pulse, pulse, pulse);
    }

    // Inner wireframe slow rotation
    if (innerWireframeRef.current) {
      innerWireframeRef.current.rotation.x = t * 0.12;
      innerWireframeRef.current.rotation.y = t * 0.16;
    }

    // Concentric thin orbital rings with golden-ratio rotation rates
    if (orbitalRing1Ref.current) {
      orbitalRing1Ref.current.rotation.z = t * 0.05;
      orbitalRing1Ref.current.rotation.x = Math.PI / 4 + Math.sin(t * 0.15) * 0.04;
    }
    if (orbitalRing2Ref.current) {
      orbitalRing2Ref.current.rotation.z = -t * 0.06;
      orbitalRing2Ref.current.rotation.y = Math.PI / 3 + Math.cos(t * 0.12) * 0.04;
    }
    if (orbitalRing3Ref.current) {
      orbitalRing3Ref.current.rotation.z = t * 0.03;
      orbitalRing3Ref.current.rotation.x = -Math.PI / 6;
    }

    // Active pulse ring when a node is hovered
    if (pulseRingRef.current) {
      if (hoveredNodeId) {
        const pulseProgress = (t * 2.5) % 1.0;
        const pulseScale = 0.5 + pulseProgress * 2.8;
        pulseRingRef.current.scale.set(pulseScale, pulseScale, pulseScale);
        (pulseRingRef.current.material as THREE.MeshBasicMaterial).opacity = (1.0 - pulseProgress) * 0.6;
        pulseRingRef.current.visible = true;
      } else {
        pulseRingRef.current.visible = false;
      }
    }

    // Subtle, heavy pointer parallax (5-15px equivalent world-space shift)
    if (groupRef.current) {
      const targetX = position[0] + (state.pointer.x * 0.32);
      const targetY = position[1] + (state.pointer.y * 0.22);
      groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetX, 1.8, delta);
      groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 1.8, delta);
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      
      {/* Central Restrained Holographic Nucleus */}
      <mesh ref={nucleusRef}>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#22d3ee"
          emissiveIntensity={1.3}
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>

      {/* Outer Faceted Geometric Translucent Cage */}
      <mesh ref={innerWireframeRef}>
        <octahedronGeometry args={[0.75, 0]} />
        <meshStandardMaterial
          color="#0891b2"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Hover Broadcast Pulse Wave */}
      <mesh ref={pulseRingRef} visible={false}>
        <ringGeometry args={[0.4, 0.45, 32]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Floating Thin Concentric Orbital Rings */}
      <Float speed={1.0} rotationIntensity={0.08} floatIntensity={0.15}>
        <mesh ref={orbitalRing1Ref}>
          <torusGeometry args={[1.35, 0.005, 16, 120]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.35} />
        </mesh>

        <mesh ref={orbitalRing2Ref}>
          <torusGeometry args={[2.05, 0.004, 16, 100]} />
          <meshBasicMaterial color="#6366f1" transparent opacity={0.25} />
        </mesh>

        <mesh ref={orbitalRing3Ref}>
          <torusGeometry args={[2.65, 0.004, 16, 100]} />
          <meshBasicMaterial color="#10b981" transparent opacity={0.2} />
        </mesh>
      </Float>

      {/* Instanced 3-Class Particle Subsystem */}
      <CivicParticles hoveredNodeId={hoveredNodeId} />

      {/* Semantic Civic Issue Nodes */}
      <CivicNodes
        hoveredNodeId={hoveredNodeId}
        onHoverNode={setHoveredNodeId}
        onSelectNode={(node) => onSelectNode?.(node.id)}
      />

    </group>
  );
};
