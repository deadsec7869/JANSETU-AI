import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'glass';
  icon?: React.ComponentType<{ className?: string }>;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  icon: Icon,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = buttonRef.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    // Subtle magnetic strength (2-3px translation)
    setPosition({ x: middleX * 0.12, y: middleY * 0.12 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variantStyles: Record<'primary' | 'secondary' | 'glass', string> = {
    primary:
      'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-glow-blue border border-blue-500/30',
    secondary:
      'bg-white/80 dark:bg-slate-900/80 hover:bg-blue-50/80 dark:hover:bg-blue-950/40 text-slate-800 dark:text-slate-200 border border-slate-200/90 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500/50 shadow-sm',
    glass:
      'bg-transparent hover:bg-blue-50/50 dark:hover:bg-blue-950/30 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800 hover:border-blue-400/60',
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 25, mass: 0.5 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl font-sans font-semibold text-sm transition-colors duration-150 backdrop-blur-md cursor-pointer ${variantStyles[variant]} ${className}`}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />}
      <span>{children}</span>
    </motion.button>
  );
};
