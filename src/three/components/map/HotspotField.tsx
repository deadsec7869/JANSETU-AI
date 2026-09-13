import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformanceMonitor } from '../../hooks/usePerformanceMonitor';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { CityHotspotData } from '../../data/priorityMapData';

interface HotspotFieldProps {
  hotspots: CityHotspotData[];
}

export const HotspotField: React.FC<HotspotFieldProps> = ({ hotspots }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const perf = usePerformanceMonitor();
  const reducedMotion = useReducedMotion();

  const count = perf.tier === 'low' ? 30 : 60;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const targetHotspot = hotspots[i % hotspots.length];
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.5 + Math.random() * 0.8;
      const origin = new THREE.Vector3(
        targetHotspot.position[0] + Math.cos(angle) * radius,
        targetHotspot.position[1] + Math.sin(angle) * radius,
        0.05 + Math.random() * 0.3
      );
      const target = new THREE.Vector3(
        targetHotspot.position[0],
        targetHotspot.position[1],
        0.12
      );

      arr.push({
        position: origin.clone(),
        origin,
        target,
        progress: Math.random(),
        speed: 0.3 + Math.random() * 0.4,
        scale: 0.02 + Math.random() * 0.015,
      });
    }
    return arr;
  }, [count, hotspots]);

  useFrame((_, delta) => {
    if (!meshRef.current || reducedMotion) return;
    const dt = Math.min(delta, 0.1);

    particles.forEach((p, i) => {
      p.progress += p.speed * dt;
      if (p.progress >= 1.0) {
        p.progress = 0;
      }
      p.position.lerpVectors(p.origin, p.target, p.progress);

      dummy.position.copy(p.position);
      dummy.scale.set(p.scale, p.scale, p.scale);
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
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial
        color="#22d3ee"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
};
