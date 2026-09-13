import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { EvidenceNodeData } from '../../data/evidenceGraphData';

interface EvidenceNodeProps {
  node: EvidenceNodeData;
  isSelected: boolean;
  isHovered: boolean;
  isDimmed: boolean;
  isWhyActive: boolean;
  onHover: (id: string | null) => void;
  onSelect: (node: EvidenceNodeData) => void;
}

export const EvidenceNode: React.FC<EvidenceNodeProps> = ({
  node,
  isSelected,
  isHovered,
  isDimmed,
  isWhyActive,
  onHover,
  onSelect,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const reducedMotion = useReducedMotion();

  useFrame((state, delta) => {
    if (!groupRef.current || reducedMotion) return;

    const time = state.clock.getElapsedTime();

    // Floating micro-motion
    const floatY = Math.sin(time * 1.8 + node.position[0] * 2) * 0.03;
    groupRef.current.position.y = node.position[1] + floatY;

    // Scale dynamics
    const targetScale = isSelected ? 1.4 : isWhyActive ? 1.35 : isHovered ? 1.25 : isDimmed ? 0.85 : 1.0;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 8);

    // Subtle rotation of auxiliary ring if present
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * (isWhyActive ? 1.2 : 0.4);
    }
  });

  const nodeOpacity = isDimmed ? 0.25 : 1.0;
  const emissiveBoost = isWhyActive ? 3.5 : isSelected ? 3.0 : isHovered ? 2.5 : 1.0;

  // Render distinct 3D geometry matching semantic node type
  const renderGeometry = () => {
    switch (node.type) {
      case 'citizen':
        // Small glowing sphere for citizen signal reports
        return (
          <mesh>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.glowColor}
              emissiveIntensity={emissiveBoost}
              roughness={0.2}
              metalness={0.8}
              transparent
              opacity={nodeOpacity}
            />
          </mesh>
        );

      case 'cluster':
        // Central glowing core with internal nucleus
        return (
          <group>
            <mesh>
              <sphereGeometry args={[0.42, 32, 32]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.glowColor}
                emissiveIntensity={emissiveBoost}
                roughness={0.1}
                metalness={0.9}
                transparent
                opacity={nodeOpacity}
              />
            </mesh>
            <mesh ref={ringRef}>
              <ringGeometry args={[0.55, 0.62, 32]} />
              <meshBasicMaterial
                color={node.glowColor}
                transparent
                opacity={isDimmed ? 0.1 : 0.6}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        );

      case 'location':
        // Coordinate cylindrical disc
        return (
          <group>
            <mesh rotation={[Math.PI / 3, 0, 0]}>
              <cylinderGeometry args={[0.3, 0.3, 0.08, 24]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.glowColor}
                emissiveIntensity={emissiveBoost}
                roughness={0.3}
                metalness={0.7}
                transparent
                opacity={nodeOpacity}
              />
            </mesh>
            <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
              <ringGeometry args={[0.38, 0.42, 24]} />
              <meshBasicMaterial
                color={node.glowColor}
                transparent
                opacity={isDimmed ? 0.1 : 0.4}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        );

      case 'infrastructure':
        // Architectural faceted block
        return (
          <mesh rotation={[0.2, 0.4, 0]}>
            <boxGeometry args={[0.36, 0.36, 0.36]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.glowColor}
              emissiveIntensity={emissiveBoost}
              roughness={0.2}
              metalness={0.8}
              transparent
              opacity={nodeOpacity}
            />
          </mesh>
        );

      case 'population':
        // Constellation of 3 connected population nodes
        return (
          <group>
            <mesh position={[-0.12, 0.08, 0]}>
              <sphereGeometry args={[0.14, 16, 16]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.glowColor}
                emissiveIntensity={emissiveBoost}
                transparent
                opacity={nodeOpacity}
              />
            </mesh>
            <mesh position={[0.12, -0.06, 0.05]}>
              <sphereGeometry args={[0.16, 16, 16]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.glowColor}
                emissiveIntensity={emissiveBoost}
                transparent
                opacity={nodeOpacity}
              />
            </mesh>
            <mesh position={[0, 0.16, -0.05]}>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.glowColor}
                emissiveIntensity={emissiveBoost}
                transparent
                opacity={nodeOpacity}
              />
            </mesh>
          </group>
        );

      case 'service-gap':
        // Warning octagon ring
        return (
          <group>
            <mesh>
              <torusGeometry args={[0.28, 0.05, 8, 8]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.glowColor}
                emissiveIntensity={emissiveBoost}
                roughness={0.2}
                metalness={0.9}
                transparent
                opacity={nodeOpacity}
              />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshBasicMaterial color="#ef4444" transparent opacity={nodeOpacity} />
            </mesh>
          </group>
        );

      case 'project':
        // Blueprint structured box
        return (
          <mesh rotation={[0, Math.PI / 4, 0]}>
            <boxGeometry args={[0.4, 0.22, 0.4]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.glowColor}
              emissiveIntensity={emissiveBoost}
              roughness={0.4}
              metalness={0.6}
              transparent
              opacity={nodeOpacity}
            />
          </mesh>
        );

      case 'priority':
        // High-density luminous dodecahedron
        return (
          <group>
            <mesh>
              <dodecahedronGeometry args={[0.42, 0]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.glowColor}
                emissiveIntensity={emissiveBoost}
                roughness={0.1}
                metalness={0.9}
                transparent
                opacity={nodeOpacity}
              />
            </mesh>
            <mesh ref={ringRef}>
              <torusGeometry args={[0.55, 0.008, 16, 32]} />
              <meshBasicMaterial color="#22d3ee" transparent opacity={isDimmed ? 0.1 : 0.6} />
            </mesh>
          </group>
        );

      case 'action':
        // Stable hexagonal endpoint prism
        return (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.3, 0.34, 0.22, 6]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.glowColor}
              emissiveIntensity={emissiveBoost}
              roughness={0.2}
              metalness={0.8}
              transparent
              opacity={nodeOpacity}
            />
          </mesh>
        );

      default:
        return (
          <mesh>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color={node.color} />
          </mesh>
        );
    }
  };

  return (
    <group
      ref={groupRef}
      position={node.position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(node);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(node.id);
      }}
      onPointerOut={() => onHover(null)}
    >
      {renderGeometry()}

      {/* Floating HTML Badge on Hover or WhyActive */}
      {(isHovered || isSelected || isWhyActive) && (
        <Html
          position={[0, 0.45, 0]}
          center
          distanceFactor={10}
          style={{ pointerEvents: 'none' }}
        >
          <div
            className={`px-3 py-2 rounded-xl border backdrop-blur-xl shadow-2xl whitespace-nowrap text-left space-y-1 transform -translate-y-2 animate-in fade-in zoom-in-95 duration-150 ${
              isWhyActive
                ? 'bg-amber-950/95 border-amber-400 text-amber-100 shadow-amber-950/60'
                : 'bg-slate-950/95 border-cyan-500/60 text-white shadow-cyan-950/60'
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full shadow-sm"
                style={{ backgroundColor: node.glowColor }}
              />
              <span className="font-extrabold text-xs tracking-wider uppercase">
                {node.label}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-300 font-bold">
                {node.confidence}% Confidence
              </span>
            </div>
            <div className="text-[11px] text-slate-300 font-mono">
              {node.value}
            </div>
            {isWhyActive && node.whyExplanation && (
              <div className="text-[10px] text-amber-300 font-sans max-w-[200px] leading-tight pt-1 border-t border-amber-800/50">
                Step {node.whyStep}: {node.whyExplanation}
              </div>
            )}
          </div>
        </Html>
      )}
    </group>
  );
};
