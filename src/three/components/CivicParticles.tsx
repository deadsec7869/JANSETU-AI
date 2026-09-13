import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformanceMonitor } from '../hooks/usePerformanceMonitor';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { SEMANTIC_NODES, type CivicNodeItem } from '../constants';

export type ParticleKind = 'signal' | 'flow' | 'intelligence';

interface ParticleState {
  kind: ParticleKind;
  position: THREE.Vector3;
  target: THREE.Vector3;
  origin: THREE.Vector3;
  progress: number;
  speed: number;
  baseScale: number;
  color: THREE.Color;
  angle: number;
  radius: number;
  elevation: number;
  destNode?: CivicNodeItem;
}

interface CivicParticlesProps {
  hoveredNodeId?: string | null;
}

export const CivicParticles: React.FC<CivicParticlesProps> = ({ hoveredNodeId }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const perf = usePerformanceMonitor();
  const reducedMotion = useReducedMotion();

  // Reduced particle counts by 45% for a clean, non-noisy intelligence network feel
  const count = useMemo(() => {
    if (perf.tier === 'low') return 60;
    if (perf.tier === 'medium') return 100;
    return 160;
  }, [perf.tier]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Initialize particles partitioned into the 3 semantic classes
  const particles = useMemo<ParticleState[]>(() => {
    const arr: ParticleState[] = [];

    // Particle distribution: 70% Signal (Dim Ambient), 20% Flow (Inward), 10% Intelligence (Outward)
    const signalCount = Math.floor(count * 0.7);
    const flowCount = Math.floor(count * 0.2);
    const intelligenceCount = count - signalCount - flowCount;

    // 1. SIGNAL PARTICLES (Ambient citizen reports in outer network)
    for (let i = 0; i < signalCount; i++) {
      const radius = 2.4 + Math.random() * 2.2;
      const angle = Math.random() * Math.PI * 2;
      const elevation = (Math.random() - 0.5) * 1.6;
      const pos = new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * (radius * 0.75) + elevation * 0.3,
        elevation
      );

      arr.push({
        kind: 'signal',
        position: pos,
        origin: pos.clone(),
        target: pos.clone(),
        progress: Math.random(),
        speed: 0.08 + Math.random() * 0.12,
        baseScale: 0.016 + Math.random() * 0.007,
        color: new THREE.Color('#93c5fd').multiplyScalar(0.45), // Soft subtle blue
        angle,
        radius,
        elevation,
      });
    }

    // 2. FLOW PARTICLES (Signals moving INWARD: Outside -> Core)
    for (let i = 0; i < flowCount; i++) {
      const startAngle = Math.random() * Math.PI * 2;
      const startRadius = 3.6 + Math.random() * 1.4;
      const startPos = new THREE.Vector3(
        Math.cos(startAngle) * startRadius,
        Math.sin(startAngle) * (startRadius * 0.75),
        (Math.random() - 0.5) * 0.6
      );

      arr.push({
        kind: 'flow',
        position: startPos.clone(),
        origin: startPos,
        target: new THREE.Vector3(0, 0, 0),
        progress: Math.random(),
        speed: 0.35 + Math.random() * 0.25,
        baseScale: 0.034 + Math.random() * 0.010,
        color: new THREE.Color('#2563eb').multiplyScalar(0.9), // Focused Electric Blue
        angle: startAngle,
        radius: startRadius,
        elevation: 0,
      });
    }

    // 3. INTELLIGENCE PARTICLES (Derived insights radiating OUTWARD: Core -> Semantic Nodes)
    for (let i = 0; i < intelligenceCount; i++) {
      const node = SEMANTIC_NODES[i % SEMANTIC_NODES.length];
      const targetPos = new THREE.Vector3(
        Math.cos(node.angle) * node.radius,
        Math.sin(node.angle) * (node.radius * 0.75),
        0
      );

      arr.push({
        kind: 'intelligence',
        position: new THREE.Vector3(0, 0, 0),
        origin: new THREE.Vector3(0, 0, 0),
        target: targetPos,
        destNode: node,
        progress: Math.random(),
        speed: 0.45 + Math.random() * 0.3,
        baseScale: 0.052 + Math.random() * 0.012,
        color: new THREE.Color(node.glowColor).multiplyScalar(1.0), // Crisp semantic domain color
        angle: node.angle,
        radius: node.radius,
        elevation: 0,
      });
    }

    return arr;
  }, [count]);

  // Set initial instance colors
  useFrame(() => {
    if (!meshRef.current) return;
    particles.forEach((p, i) => {
      meshRef.current?.setColorAt(i, p.color);
    });
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const dt = Math.min(delta, 0.1);
    const time = state.clock.getElapsedTime();

    particles.forEach((p, i) => {
      if (!reducedMotion) {
        if (p.kind === 'signal') {
          // Subtle orbital drifting of ambient citizen signals
          p.angle += p.speed * dt * 0.5;
          const r = p.radius + Math.sin(time * 0.8 + i) * 0.12;
          p.position.set(
            Math.cos(p.angle) * r,
            Math.sin(p.angle) * (r * 0.75) + Math.sin(time * 0.5 + i) * 0.1,
            p.elevation + Math.cos(time * 0.6 + i) * 0.08
          );
        } else if (p.kind === 'flow') {
          // Flow steadily INWARD toward Core: Outside -> Core (0,0,0)
          p.progress += p.speed * dt;
          if (p.progress >= 1.0) {
            p.progress = 0;
            // Respawn on outer perimeter
            const newAngle = Math.random() * Math.PI * 2;
            const newRadius = 3.6 + Math.random() * 1.2;
            p.origin.set(
              Math.cos(newAngle) * newRadius,
              Math.sin(newAngle) * (newRadius * 0.75),
              (Math.random() - 0.5) * 0.4
            );
          }
          p.position.lerpVectors(p.origin, p.target, p.progress);
        } else if (p.kind === 'intelligence') {
          // Flow OUTWARD: Core -> Semantic Node
          // If a node is hovered, prioritize routing to that node
          let targetPos = p.target;
          if (hoveredNodeId && p.destNode?.id !== hoveredNodeId) {
            const targetNode = SEMANTIC_NODES.find((n) => n.id === hoveredNodeId);
            if (targetNode) {
              targetPos = new THREE.Vector3(
                Math.cos(targetNode.angle) * targetNode.radius,
                Math.sin(targetNode.angle) * (targetNode.radius * 0.75),
                0
              );
            }
          }

          p.progress += p.speed * dt;
          if (p.progress >= 1.0) {
            p.progress = 0;
          }
          p.position.lerpVectors(p.origin, targetPos, p.progress);
        }
      }

      // Update instance scale & matrix
      dummy.position.copy(p.position);
      let scale = p.baseScale;
      if (p.kind === 'intelligence') {
        // Subtle pulse for intelligence particles
        scale *= 1.0 + Math.sin(time * 4.0 + i) * 0.2;
      }
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();

      meshRef.current?.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      frustumCulled={false}
    >
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
};
