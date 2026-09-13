import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { SEMANTIC_NODES, type CivicNodeItem } from '../constants';

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

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    // Very subtle orbital drift for the overall node constellation
    groupRef.current.rotation.z += delta * 0.02;
  });

  return (
    <group ref={groupRef}>
      {/* Individual Node Filaments & Spheres */}
      {SEMANTIC_NODES.map((node) => {
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
              color={node.glowColor}
            />

            {/* Semantic Node Object with Halo Ring and Hover Tooltip */}
            <SingleNode
              node={node}
              defaultPos={[defaultX, defaultY, 0]}
              isHovered={isHovered}
              isDimmed={isAnyHovered && !isHovered}
              onPointerOver={() => onHoverNode(node.id)}
              onPointerOut={() => onHoverNode(null)}
              onClick={() => onSelectNode?.(node)}
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
  color: string;
}

const NodeFilament: React.FC<NodeFilamentProps> = ({
  targetPos,
  isHovered,
  isDimmed,
  color,
}) => {
  const lineRef = useRef<THREE.Line>(null);

  const points = React.useMemo(() => {
    return [new THREE.Vector3(0, 0, 0), new THREE.Vector3(...targetPos)];
  }, [targetPos]);

  const geometry = React.useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  const targetOpacity = isHovered ? 0.85 : isDimmed ? 0.08 : 0.22;
  const targetColor = isHovered ? '#22d3ee' : color;

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
    const floatOffset = Math.sin(time * 1.5 + node.angle * 3) * 0.04;
    const targetZ = isHovered ? 0.25 : 0; // Move subtly toward camera when hovered

    currentPos.current.x = defaultPos[0];
    currentPos.current.y = defaultPos[1] + floatOffset;
    currentPos.current.z = THREE.MathUtils.damp(currentPos.current.z, targetZ, 6, delta);

    groupRef.current.position.copy(currentPos.current);

    // Subtle scale lerp on hover
    const targetScale = isHovered ? 1.35 : isDimmed ? 0.85 : 1.0;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 8);

    // Rotate subtle outer ring
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.4;
    }
  });

  const nodeOpacity = isDimmed ? 0.35 : 1.0;

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
          emissiveIntensity={isHovered ? 2.8 : isDimmed ? 0.6 : 1.2}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={nodeOpacity}
        />
      </mesh>

      {/* Subtle Concentric Orbital Halo Ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[node.size * 1.4, node.size * 1.55, 24]} />
        <meshBasicMaterial
          color={node.glowColor}
          transparent
          opacity={isHovered ? 0.7 : isDimmed ? 0.1 : 0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Semantic Badge Shown ONLY on Hover/Focus (Eliminates visual clutter) */}
      {isHovered && (
        <Html
          position={[0, node.size + 0.35, 0]}
          center
          distanceFactor={11}
          style={{ pointerEvents: 'none' }}
        >
          <div className="px-3 py-2 rounded-xl bg-slate-950/95 border border-cyan-500/60 backdrop-blur-xl shadow-2xl shadow-cyan-950/60 whitespace-nowrap text-left space-y-1 transform -translate-y-2 animate-in fade-in zoom-in-95 duration-150 cursor-pointer pointer-events-auto">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full shadow-sm"
                style={{ backgroundColor: node.glowColor }}
              />
              <span className="font-extrabold text-xs text-white tracking-wider">
                {node.label}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-300 font-bold">
                Priority {node.priority}
              </span>
            </div>
            <div className="text-[11px] text-slate-300 font-mono flex items-center justify-between gap-3">
              <span>Clustered Reports:</span>
              <span className="font-bold text-white">{node.reportsCount}</span>
            </div>
            <div className="text-[9px] text-cyan-400 font-mono pt-1 border-t border-slate-800 flex items-center gap-1">
              <span>Click to reveal 3D Evidence Graph →</span>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};
