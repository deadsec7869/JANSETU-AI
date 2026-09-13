import React from 'react';
import { motion } from 'framer-motion';

interface SpotlightProps {
  className?: string;
  fill?: string;
}

export const Spotlight: React.FC<SpotlightProps> = ({
  className = '',
  fill = '#2563EB',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className={`pointer-events-none absolute -top-40 left-0 md:left-60 md:-top-20 z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-[138%] lg:w-[840px] h-[800px] opacity-[0.22] dark:opacity-[0.35]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 3787 2842"
        fill="none"
      >
        <g filter="url(#spotlight-filter)">
          <ellipse
            cx="1924.71"
            cy="273.501"
            rx="1924.71"
            ry="273.501"
            transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
            fill={fill}
            fillOpacity="0.38"
          />
          <ellipse
            cx="1800"
            cy="350"
            rx="1200"
            ry="220"
            transform="matrix(-0.75 -0.65 -0.65 0.75 3200 2100)"
            fill="#7C3AED"
            fillOpacity="0.25"
          />
        </g>
        <defs>
          <filter
            id="spotlight-filter"
            x="0.860352"
            y="0.838989"
            width="3785.16"
            height="2840.26"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="165"
              result="effect1_foregroundBlur"
            />
          </filter>
        </defs>
      </svg>
    </motion.div>
  );
};
