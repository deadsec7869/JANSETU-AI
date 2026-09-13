import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { CityHotspotData } from '../../data/priorityMapData';

interface MapConnectionsProps {
  hotspots: CityHotspotData[];
  selectedHotspotId: string | null;
}

export const MapConnections: React.FC<MapConnectionsProps> = ({
  hotspots,
  selectedHotspotId,
}) => {
  const particleRef = useRef<THREE.Mesh>(null);
  const reducedMotion = useReducedMotion();

  // Create primary Outer Ring Road & arterial corridor connections
  const arterialPoints = useMemo(() => {
    // Connect sequential tech corridor hotspots: Bellandur -> Marathahalli -> Whitefield -> HSR -> BTM
    const sequenceCodes = [
      'CL-BLR-176-06', // BTM
      'CL-BLR-174-05', // HSR
      'CL-BLR-150-01', // Bellandur
      'CL-BLR-112-07', // Marathahalli
      'CL-BLR-138-09', // Whitefield
    ];

    const pts: THREE.Vector3[] = [];
    const ordered = sequenceCodes
      .map((code) => hotspots.find((h) => h.code === code))
      .filter((h): h is CityHotspotData => h !== undefined);

    for (let i = 0; i < ordered.length - 1; i++) {
      pts.push(new THREE.Vector3(ordered[i].position[0], ordered[i].position[1], 0.08));
      pts.push(new THREE.Vector3(ordered[i + 1].position[0], ordered[i + 1].position[1], 0.08));
    }
    return pts;
  }, [hotspots]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(arterialPoints);
  }, [arterialPoints]);

  const curve = useMemo(() => {
    if (arterialPoints.length < 2) return null;
    return new THREE.CatmullRomCurve3(arterialPoints);
  }, [arterialPoints]);

  useFrame((state) => {
    if (!particleRef.current || !curve || reducedMotion) return;
    const progress = (state.clock.getElapsedTime() * 0.25) % 1.0;
    const pt = curve.getPoint(progress);
    particleRef.current.position.copy(pt);
  });

  return (
    <group>
      {/* 3D Arterial Corridor Line */}
      {/* @ts-ignore - R3F LineSegments */}
      <lineSegments geometry={geometry}>
        <lineBasicMaterial
          color="#06b6d4"
          transparent
          opacity={selectedHotspotId ? 0.45 : 0.22}
          linewidth={1}
        />
      </lineSegments>

      {/* Traveling Arterial Signal Photon */}
      {!reducedMotion && curve && (
        <mesh ref={particleRef}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial
            color="#22d3ee"
            transparent
            opacity={0.85}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
    </group>
  );
};
