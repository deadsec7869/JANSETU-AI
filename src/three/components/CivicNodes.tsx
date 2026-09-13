import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { SEMANTIC_NODES, type CivicNodeItem } from '../constants';
import { useApp } from '../../context/AppContext';

interface CivicNodesProps {
  hoveredNodeId: string | null;
  onHoverNode: (id: string | null) => void;
  onSelectNode?: (node: CivicNodeItem) => void;
}

export const CivicNodes: React.FC<CivicNodesProps> = ({
  hoveredNodeId,
  onHoverNode,
  onSelectNode,
}) => {
  const reducedMotion = useReducedMotion();
  const groupRef = useRef<THREE.Group>(null);
  const { issues, isTestMode } = useApp();

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    // Very subtle orbital drift for the overall node constellation
    groupRef.current.rotation.z += delta * 0.015;
  });

  return (
    <group ref={groupRef}>
      {/* Individual Node Filaments & Spheres */}
      {SEMANTIC_NODES.map((node) => {
        // Calculate dynamic active state based on real issues
        const categoryMatch = issues.filter(i => {
          if (node.id === 'water') return i.category === 'Water & Drainage';
          if (node.id === 'roads') return i.category === 'Roads & Transport';
          if (node.id === 'drainage') return i.category === 'Water & Drainage';
          if (node.id === 'lighting') return i.category === 'Electricity & Lighting';
          if (node.id === 'waste') return i.category === 'Waste Management';
          if (node.id === 'safety') return i.category === 'Public Safety';
          if (node.id === 'health') return i.category === 'Public Health';
          return i.category === 'Parks & Environment';
        });

        const realCount = categoryMatch.length;
        const isActive = isTestMode ? true : realCount > 0;
        const displayCount = isTestMode ? node.reportsCount : realCount;
        const avgPriority = categoryMatch.length > 0 
          ? Math.round(categoryMatch.reduce((sum, i) => sum + (i.priorityScore?.overallScore || 50), 0) / categoryMatch.length)
          : (isTestMode ? node.priority : null);

        const dynamicNode: CivicNodeItem = {
          ...node,
          reportsCount: displayCount,
          priority: avgPriority || 0,
        };

        const isHovered = hoveredNodeId === node.id;
        const isAnyHovered = hoveredNodeId !== null;
        const defaultX = Math.cos(node.angle) * node.radius;
        const defaultY = Math.sin(node.angle) * (node.radius * 0.75);

        return (
          <React.Fragment key={node.id}>
            {/* Connection Filament between CivicCore (0,0,0) and Node */}
            <NodeFilament
              targetPos={[defaultX, defaultY, 0]}
              isHovered={isHovered}
              isDimmed={isAnyHovered && !isHovered}
              isActive={isActive}
              color={node.glowColor}
            />

            {/* Semantic Node Object with Halo Ring and Hover Tooltip */}
            <SingleNode
              node={dynamicNode}
              isActive={isActive}
              avgPriority={avgPriority}
              defaultPos={[defaultX, defaultY, 0]}
              isHovered={isHovered}
              isDimmed={isAnyHovered && !isHovered}
              onPointerOver={() => onHoverNode(node.id)}
              onPointerOut={() => onHoverNode(null)}
              onClick={() => onSelectNode?.(dynamicNode)}
              reducedMotion={reducedMotion}
            />
          </React.Fragment>
        );
      })}
    </group>
  );
};

// -------------------------------------------------------------
// Connection Filament Component (Core -> Node)
// -------------------------------------------------------------
interface NodeFilamentProps {
  targetPos: [number, number, number];
  isHovered: boolean;
  isDimmed: boolean;
  isActive: boolean;
  color: string;
}

const NodeFilament: React.FC<NodeFilamentProps> = ({
  targetPos,
  isHovered,
  isDimmed,
  isActive,
  color,
}) => {
  const lineRef = useRef<THREE.Line>(null);

  const points = React.useMemo(() => {
    return [new THREE.Vector3(0, 0, 0), new THREE.Vector3(...targetPos)];
  }, [targetPos]);

  const geometry = React.useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  const targetOpacity = isHovered 
    ? 0.75 
    : isDimmed 
    ? 0.04 
    : isActive 
    ? 0.22 
    : 0.08;

  const targetColor = isHovered ? '#60a5fa' : color;

  return (
    // @ts-ignore - R3F Line primitive
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial
        color={targetColor}
        transparent
        opacity={targetOpacity}
        linewidth={isHovered ? 2 : 1}
      />
    </line>
  );
};

// -------------------------------------------------------------
// Single Semantic Node Component
// -------------------------------------------------------------
interface SingleNodeProps {
  node: CivicNodeItem;
  isActive: boolean;
  avgPriority: number | null;
  defaultPos: [number, number, number];
  isHovered: boolean;
  isDimmed: boolean;
  onPointerOver: () => void;
  onPointerOut: () => void;
  onClick?: () => void;
  reducedMotion: boolean;
}

const SingleNode: React.FC<SingleNodeProps> = ({
  node,
  isActive,
  avgPriority,
  defaultPos,
  isHovered,
  isDimmed,
  onPointerOver,
  onPointerOut,
  onClick,
  reducedMotion,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const currentPos = useRef(new THREE.Vector3(...defaultPos));

  useFrame((state, delta) => {
    if (!groupRef.current || reducedMotion) return;

    // Organic micro-floating breathing
    const time = state.clock.getElapsedTime();
    const floatSpeed = isActive ? 1.5 : 0.8;
    const floatOffset = Math.sin(time * floatSpeed + node.angle * 3) * (isActive ? 0.035 : 0.015);
    const targetZ = isHovered ? 0.25 : 0; // Move subtly toward camera when hovered

    currentPos.current.x = defaultPos[0];
    currentPos.current.y = defaultPos[1] + floatOffset;
    currentPos.current.z = THREE.MathUtils.damp(currentPos.current.z, targetZ, 6, delta);

    groupRef.current.position.copy(currentPos.current);

    // Subtle scale lerp on hover
    const baseScale = isActive ? 1.0 : 0.75;
    const targetScale = isHovered ? 1.3 : isDimmed ? baseScale * 0.85 : baseScale;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 8);

    // Rotate subtle outer ring
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * (isActive ? 0.35 : 0.12);
    }
  });

  const nodeOpacity = isDimmed ? 0.25 : isActive ? 1.0 : 0.4;
  const emissiveIntensity = isHovered 
    ? 2.2 
    : isDimmed 
    ? 0.2 
    : isActive 
    ? 0.9 
    : 0.25;

  return (
    <group
      ref={groupRef}
      position={defaultPos}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onPointerOver();
      }}
      onPointerOut={() => onPointerOut()}
    >
      {/* Central Solid Glowing Domain Sphere */}
      <mesh>
        <sphereGeometry args={[node.size, 16, 16]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.glowColor}
          emissiveIntensity={emissiveIntensity}
          roughness={0.25}
          metalness={0.7}
          transparent
          opacity={nodeOpacity}
        />
      </mesh>

      {/* Subtle Concentric Orbital Halo Ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[node.size * 1.35, node.size * 1.5, 24]} />
        <meshBasicMaterial
          color={node.glowColor}
          transparent
          opacity={isHovered ? 0.6 : isDimmed ? 0.05 : isActive ? 0.22 : 0.08}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Semantic Badge Shown ONLY on Hover/Focus */}
      {isHovered && (
        <Html
          position={[0, node.size + 0.35, 0]}
          center
          distanceFactor={11}
          style={{ pointerEvents: 'none' }}
        >
          <div className="px-3 py-2 rounded-xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 backdrop-blur-xl shadow-2xl whitespace-nowrap text-left space-y-1 transform -translate-y-2 animate-in fade-in zoom-in-95 duration-150 cursor-pointer pointer-events-auto">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full shadow-sm"
                style={{ backgroundColor: node.color }}
              />
              <span className="font-extrabold text-xs text-slate-900 dark:text-white tracking-wider">
                {node.label}
              </span>
              {avgPriority !== null ? (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 text-blue-700 dark:text-blue-300 font-bold">
                  Priority {avgPriority}/100
                </span>
              ) : (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-medium">
                  Dormant
                </span>
              )}
            </div>
            
            <div className="text-[11px] text-slate-600 dark:text-slate-300 font-mono flex items-center justify-between gap-3">
              <span>Verified Signals:</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {node.reportsCount} report(s)
              </span>
            </div>

            <div className="text-[9px] text-blue-600 dark:text-blue-400 font-mono pt-1 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1 font-semibold">
              {isActive ? (
                <span>Click to inspect category cluster →</span>
              ) : (
                <span className="text-slate-400">Awaiting citizen submissions</span>
              )}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};
