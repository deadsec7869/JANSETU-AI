import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ErrorBoundary } from '../components/shared/ErrorBoundary';
import { usePerformanceMonitor } from './hooks/usePerformanceMonitor';

interface CivicCanvasProps {
  children: React.ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  fov?: number;
  style?: React.CSSProperties;
  fallback?: React.ReactNode;
}

export const CivicCanvas: React.FC<CivicCanvasProps> = ({
  children,
  className = '',
  cameraPosition = [0, 0, 10],
  fov = 45,
  style,
  fallback,
}) => {
  const perf = usePerformanceMonitor();
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }
  }, []);

  const defaultFallback = (
    <div className={`w-full h-full min-h-[240px] bg-transparent rounded-2xl flex items-center justify-center p-6 ${className}`}>
      <div className="flex items-center gap-2.5 text-xs font-mono text-blue-600 dark:text-blue-400 bg-white/80 dark:bg-slate-900/80 px-4 py-2 rounded-xl border border-blue-500/20 shadow-md backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        <span>INITIALIZING CIVIC INTELLIGENCE...</span>
      </div>
    </div>
  );

  if (!isClient || !hasWebGL) {
    return (
      <div className={`relative w-full h-full ${className}`} style={style}>
        {fallback || defaultFallback}
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`} style={style}>
      <ErrorBoundary fallback={fallback || defaultFallback}>
        <Canvas
          camera={{ position: cameraPosition, fov, near: 0.1, far: 1000 }}
          dpr={perf.dpr}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
          }}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};
