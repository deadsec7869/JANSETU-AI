import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export interface PointerPhysicsState {
  current: THREE.Vector3;
  target: THREE.Vector3;
  velocity: THREE.Vector3;
  isHovering: boolean;
  intensity: number;
}

export function usePointerPhysics() {
  const pointerRef = useRef<PointerPhysicsState>({
    current: new THREE.Vector3(0, 0, 0),
    target: new THREE.Vector3(0, 0, 0),
    velocity: new THREE.Vector3(0, 0, 0),
    isHovering: false,
    intensity: 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePointerMove = (e: PointerEvent) => {
      // Normalize to [-1, 1]
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;

      // Project onto a typical 3D viewport coordinate plane
      pointerRef.current.target.set(nx * 8, ny * 5, 0);
      pointerRef.current.isHovering = true;
      pointerRef.current.intensity = 1.0;
    };

    const handlePointerLeave = () => {
      pointerRef.current.isHovering = false;
      pointerRef.current.intensity = 0;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return pointerRef;
}
