import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { CityHotspotData } from '../../data/priorityMapData';

interface HotspotNodeProps {
  hotspot: CityHotspotData;
  isSelected: boolean;
  isHovered: boolean;
  isDimmed: boolean;
  trendFactor?: number; // 0.0 to 1.0 based on weekly trend simulation
  onHover: (id: string | null) => void;
  onSelect: (hotspot: CityHotspotData) => void;
}

export const HotspotNode: React.FC<HotspotNodeProps> = ({
  hotspot,
  isSelected,
  isHovered,
  isDimmed,
  trendFactor = 1.0,
  onHover,
  onSelect,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const beaconRef = useRef<THREE.Mesh>(null);
  const reducedMotion = useReducedMotion();

  // Priority color tokens: Red (90+), Amber (75-89), Electric Blue (<75)
  const isCritical = hotspot.priority >= 90;
  const isHigh = hotspot.priority >= 75 && hotspot.priority < 90;
  const baseColor = isCritical ? '#ef4444' : isHigh ? '#f59e0b' : '#2563eb';
  const glowColor = isCritical ? '#f87171' : isHigh ? '#fbbf24' : '#60a5fa';

  useFrame((state, delta) => {
    if (!groupRef.current || reducedMotion) return;

    const time = state.clock.getElapsedTime();

    // Concentric expanding pulse waves
    if (ring1Ref.current) {
      const progress = (time * (isCritical ? 1.4 : 0.9)) % 1.0;
      const scale = 0.6 + progress * (isCritical ? 2.2 : 1.6);
      ring1Ref.current.scale.set(scale, scale, scale);
      (ring1Ref.current.material as THREE.MeshBasicMaterial).opacity =
        (1.0 - progress) * (isDimmed ? 0.15 : isCritical ? 0.75 : 0.45);
    }

    if (ring2Ref.current) {
      const progress = (time * (isCritical ? 1.4 : 0.9) + 0.5) % 1.0;
      const scale = 0.6 + progress * (isCritical ? 2.2 : 1.6);
      ring2Ref.current.scale.set(scale, scale, scale);
      (ring2Ref.current.material as THREE.MeshBasicMaterial).opacity =
        (1.0 - progress) * (isDimmed ? 0.1 : isCritical ? 0.6 : 0.35);
    }


    // Vertical light column subtle oscillation
    if (beaconRef.current) {
      const beaconPulse = 0.8 + Math.sin(time * 3.0) * 0.2;
      beaconRef.current.scale.set(1.0, beaconPulse, 1.0);
    }

    // Scale dynamics
    const targetScale = isSelected ? 1.45 : isHovered ? 1.3 : isDimmed ? 0.75 : 1.0;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      delta * 8
    );
  });

  const nodeOpacity = isDimmed ? 0.25 : 1.0;
  const emissiveBoost = isSelected ? 3.5 : isHovered ? 2.8 : isCritical ? 2.2 : 1.4;

  return (
    <group
      ref={groupRef}
      position={hotspot.position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(hotspot);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(hotspot.id);
      }}
      onPointerOut={() => onHover(null)}
    >
      {/* Central Luminous Core Sphere */}
      <mesh>
        <sphereGeometry args={[isCritical ? 0.16 : 0.13, 16, 16]} />
        <meshStandardMaterial
          color={baseColor}
          emissive={glowColor}
          emissiveIntensity={emissiveBoost * trendFactor}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={nodeOpacity}
        />
      </mesh>

      {/* Primary Expanding Pulse Wave */}
      <mesh ref={ring1Ref}>
        <ringGeometry args={[0.2, 0.24, 32]} />
        <meshBasicMaterial
          color={glowColor}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Secondary Staggered Pulse Wave */}
      <mesh ref={ring2Ref}>
        <ringGeometry args={[0.2, 0.24, 32]} />
        <meshBasicMaterial
          color={glowColor}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Vertical Light Column / Beacon Cylinder for High/Critical Hotspots */}
      {(isCritical || isHigh) && !isDimmed && (
        <mesh
          ref={beaconRef}
          position={[0, 0, 0.55]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.015, 0.04, 1.1, 16, 1, true]} />
          <meshBasicMaterial
            color={glowColor}
            transparent
            opacity={isSelected ? 0.75 : isCritical ? 0.55 : 0.35}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Floating 3D Tooltip Badge */}
      {(isHovered || isSelected) && (
        <Html
          position={[0, 0.38, 0.3]}
          center
          distanceFactor={10}
          style={{ pointerEvents: 'none' }}
        >
          <div className="px-3 py-2 rounded-xl bg-slate-900/90 dark:bg-slate-950/95 border border-blue-500/40 backdrop-blur-xl shadow-2xl text-left whitespace-nowrap space-y-1 transform -translate-y-2 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full shadow-sm"
                style={{ backgroundColor: glowColor }}
              />
              <span className="font-extrabold text-xs text-white tracking-wider">
                {hotspot.code}
              </span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                  isCritical
                    ? 'bg-rose-950/80 border border-rose-600 text-rose-300'
                    : isHigh
                    ? 'bg-amber-950/80 border border-amber-600 text-amber-300'
                    : 'bg-blue-950/80 border border-blue-600 text-blue-300'
                }`}
              >
                Priority {hotspot.priority}
              </span>
            </div>

            <div className="text-[11px] font-semibold text-slate-200 max-w-[200px] truncate">
              {hotspot.title}
            </div>

            <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between gap-3 pt-1 border-t border-slate-800">
              <span>{hotspot.wardName.split(' - ')[1] || hotspot.wardName}</span>
              <span className="text-blue-300 font-bold">{hotspot.reportCount} Reports</span>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};
