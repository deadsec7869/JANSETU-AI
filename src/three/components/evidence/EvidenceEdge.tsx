import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { EvidenceEdgeData } from '../../data/evidenceGraphData';

interface EvidenceEdgeProps {
  edge: EvidenceEdgeData;
  sourcePos: [number, number, number];
  targetPos: [number, number, number];
  isHighlighted: boolean;
  isDimmed: boolean;
  isWhyActive: boolean;
}

export const EvidenceEdge: React.FC<EvidenceEdgeProps> = ({
  sourcePos,
  targetPos,
  isHighlighted,
  isDimmed,
  isWhyActive,
}) => {
  const particleRef = useRef<THREE.Mesh>(null);
  const reducedMotion = useReducedMotion();

  const srcVec = useMemo(() => new THREE.Vector3(...sourcePos), [sourcePos]);
  const dstVec = useMemo(() => new THREE.Vector3(...targetPos), [targetPos]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints([srcVec, dstVec]);
  }, [srcVec, dstVec]);

  useFrame((state) => {
    if (!particleRef.current || reducedMotion) return;

    // Move traveling photon particle from source to target
    const speed = isWhyActive ? 1.8 : isHighlighted ? 1.4 : 0.8;
    const progress = (state.clock.getElapsedTime() * speed) % 1.0;

    particleRef.current.position.lerpVectors(srcVec, dstVec, progress);
  });

  const edgeColor = isWhyActive ? '#fbbf24' : isHighlighted ? '#22d3ee' : '#38bdf8';
  const edgeOpacity = isWhyActive ? 0.95 : isHighlighted ? 0.85 : isDimmed ? 0.08 : 0.2;

  return (
    <group>
      {/* 3D Static Connection Filament */}
      {/* @ts-ignore - R3F Line primitive */}
      <line geometry={geometry}>
        <lineBasicMaterial
          color={edgeColor}
          transparent
          opacity={edgeOpacity}
          linewidth={isWhyActive || isHighlighted ? 2 : 1}
        />
      </line>

      {/* Traveling Energy Signal Photon Particle along the Edge */}
      {!reducedMotion && !isDimmed && (
        <mesh ref={particleRef}>
          <sphereGeometry args={[isWhyActive ? 0.045 : 0.03, 8, 8]} />
          <meshBasicMaterial
            color={edgeColor}
            transparent
            opacity={isWhyActive ? 0.95 : isHighlighted ? 0.8 : 0.45}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
    </group>
  );
};
