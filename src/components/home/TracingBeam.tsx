import React from 'react';
import { motion } from 'framer-motion';

interface TracingBeamProps {
  className?: string;
  orientation?: 'vertical' | 'horizontal';
}

export const TracingBeam: React.FC<TracingBeamProps> = ({
  className = '',
  orientation = 'vertical',
}) => {
  if (orientation === 'horizontal') {
    return (
      <div className={`relative h-[2px] w-full bg-slate-200/80 dark:bg-slate-800/80 overflow-hidden ${className}`}>
        <motion.div
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
        />
      </div>
    );
  }

  return (
    <div className={`relative w-[2px] h-full bg-slate-200/80 dark:bg-slate-800/80 overflow-hidden ${className}`}>
      <motion.div
        animate={{
          y: ['-100%', '100%'],
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-blue-500 to-transparent"
      />
    </div>
  );
};
