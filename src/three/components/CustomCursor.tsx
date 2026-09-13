import React, { useEffect, useState, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const CustomCursor: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if hovering over clickable element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = !!target.closest('button, a, select, input, textarea, [role="button"], .clickable, [data-clickable]');
        setIsHoveringClickable(isClickable);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    let animId: number;
    const animateCursor = () => {
      // Smooth lerp for outer ring
      const lerpFactor = isHoveringClickable ? 0.25 : 0.15;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animId = requestAnimationFrame(animateCursor);
    };

    animId = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [isVisible, isHoveringClickable]);

  if (isTouch || reducedMotion || !isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Inner Central Luminous Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height,background-color] duration-150 ${
          isHoveringClickable
            ? 'w-2 h-2 bg-brand-400 shadow-glow-cyan'
            : 'w-1.5 h-1.5 bg-brand-300'
        }`}
      />

      {/* Outer Magnetic Trailing Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,border-color,background-color] duration-200 ${
          isHoveringClickable
            ? 'w-10 h-10 border-brand-400/80 bg-brand-500/10 shadow-glow-cyan scale-110'
            : 'w-6 h-6 border-slate-500/40 bg-transparent'
        }`}
      />
    </div>
  );
};
