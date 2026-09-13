import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { WardPolygonData } from '../../data/priorityMapData';

interface WardRegionProps {
  ward: WardPolygonData;
  isSelected: boolean;
  isHovered: boolean;
  isDimmed: boolean;
  onHover: (id: string | null) => void;
  onSelect: (ward: WardPolygonData) => void;
}

export const WardRegion: React.FC<WardRegionProps> = ({
  ward,
  isSelected,
  isHovered,
  isDimmed,
  onHover,
  onSelect,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const lineRef = useRef<THREE.LineSegments>(null);
  const reducedMotion = useReducedMotion();

  // Create 2D Shape and ExtrudeGeometry for the ward polygon
  const { geometry, lineGeometry } = useMemo(() => {
    const shape = new THREE.Shape();
    ward.polygon.forEach((pt, idx) => {
      if (idx === 0) shape.moveTo(pt[0], pt[1]);
      else shape.lineTo(pt[0], pt[1]);
    });
    shape.closePath();

    // Shallow 3D extrusion
    const extrudeSettings = {
      depth: 0.06,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.015,
      bevelThickness: 0.015,
    };
    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    // Create wireframe border edges
    const edges = new THREE.EdgesGeometry(geom);
    return { geometry: geom, lineGeometry: edges };
  }, [ward.polygon]);

  useFrame((_, delta) => {
    if (!meshRef.current || reducedMotion) return;

    // Subtle elevation when hovered or selected
    const targetZ = isSelected ? 0.12 : isHovered ? 0.06 : 0;
    meshRef.current.position.z = THREE.MathUtils.damp(meshRef.current.position.z, targetZ, 6, delta);
    if (lineRef.current) {
      lineRef.current.position.z = meshRef.current.position.z;
    }
  });

  const surfaceOpacity = isDimmed ? 0.25 : isSelected ? 0.9 : isHovered ? 0.8 : 0.65;
  const borderColor = isSelected ? '#22d3ee' : isHovered ? '#38bdf8' : '#0e7490';
  const borderOpacity = isDimmed ? 0.15 : isSelected ? 0.95 : isHovered ? 0.8 : 0.45;

  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        onSelect(ward);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(ward.id);
      }}
      onPointerOut={() => onHover(null)}
    >
      {/* 3D Extruded Polygonal Surface */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color="#071328"
          roughness={0.4}
          metalness={0.6}
          transparent
          opacity={surfaceOpacity}
        />
      </mesh>

      {/* Luminous Boundary Edges */}
      {/* @ts-ignore - R3F LineSegments */}
      <lineSegments ref={lineRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color={borderColor}
          transparent
          opacity={borderOpacity}
          linewidth={isSelected || isHovered ? 2 : 1}
        />
      </lineSegments>

      {/* Ward Center Label on Hover or Select */}
      {(isHovered || isSelected) && (
        <Html
          position={[ward.center[0], ward.center[1], 0.35]}
          center
          distanceFactor={11}
          style={{ pointerEvents: 'none' }}
        >
          <div className="px-2.5 py-1.5 rounded-xl bg-slate-900/90 dark:bg-slate-950/95 border border-blue-500/40 backdrop-blur-md shadow-2xl text-left whitespace-nowrap space-y-0.5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="font-extrabold text-[11px] text-white tracking-wide">
                {ward.name}
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between gap-2">
              <span>{ward.activeClustersCount} Hotspot Clusters</span>
              <span className="text-blue-300 font-bold">Max {ward.highestPriority}</span>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};
