import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlusCircle, Compass, Sparkles, Activity } from 'lucide-react';
import { Spotlight } from './Spotlight';
import { TextGenerateEffect } from './TextGenerateEffect';
import { MagneticButton } from './MagneticButton';
import { CivicCanvas, CivicWorld, CivicCore, CivicPostProcessing } from '../../three';

interface HeroProps {
  onExploreEvidence?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreEvidence }) => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[680px] lg:min-h-[740px] flex items-center justify-between pt-4 pb-12 overflow-hidden">
      
      {/* Aceternity-inspired Spotlight Depth (Soft Blue / Violet) */}
      <Spotlight className="-top-24 left-1/4" fill="#2563EB" />

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center relative z-10">
        
        {/* Left Column (45% on desktop): Editorial Typography & Action CTAs */}
        <div className="lg:col-span-6 xl:col-span-5 space-y-6 z-10">
          
          {/* Micro Hero Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 font-mono text-[11px] font-semibold tracking-wider uppercase backdrop-blur-md shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Civic Intelligence • Bengaluru</span>
          </motion.div>

          {/* Large Editorial Headline */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-1"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-[62px] xl:text-[68px] font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.02] font-sans">
              TURN CITIZEN VOICE INTO
              <span className="block mt-1 text-blue-600 dark:text-blue-400">
                MEASURABLE{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  ACTION.
                </span>
              </span>
            </h1>
          </motion.div>

          {/* Text Generate Effect Supporting Description */}
          <div className="max-w-xl">
            <TextGenerateEffect
              words="AI-powered civic intelligence that transforms multilingual citizen signals into evidence-backed priorities and measurable municipal action."
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
              duration={0.7}
            />
          </div>

          {/* Magnetic Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-wrap items-center gap-3.5 pt-2"
          >
            <MagneticButton
              variant="primary"
              icon={PlusCircle}
              onClick={() => navigate('/report')}
              className="shadow-glow-blue"
            >
              Report an Issue
            </MagneticButton>

            <MagneticButton
              variant="secondary"
              icon={Compass}
              onClick={() => {
                if (onExploreEvidence) {
                  onExploreEvidence();
                } else {
                  navigate('/gov/evidence');
                }
              }}
            >
              Explore Intelligence
            </MagneticButton>
          </motion.div>

          {/* Subtle Tagline & Status Chip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400 dark:text-slate-500 font-mono"
          >
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>CIVIC NETWORK ACTIVE</span>
            </div>
            <span>•</span>
            <span className="tracking-wide">AI INTERPRETS • RULES CALCULATE • HUMANS DECIDE</span>
          </motion.div>

        </div>

        {/* Right Column (55% on desktop): Spatial 3D Civic Core Object */}
        <div className="lg:col-span-6 xl:col-span-7 relative h-[420px] sm:h-[500px] lg:h-[580px] w-full flex items-center justify-center">
          
          {/* Transparent Canvas with Floating Civic Core */}
          <div className="absolute inset-0 w-full h-full pointer-events-auto">
            <CivicCanvas cameraPosition={[0, 0, 6.8]} fov={45}>
              <CivicWorld showGrid={false} intensity={1.05} />
              <CivicCore
                position={[0.2, 0, 0]}
                scale={1.05}
                onSelectNode={() => {
                  if (onExploreEvidence) {
                    onExploreEvidence();
                  } else {
                    navigate('/gov/evidence');
                  }
                }}
              />
              <CivicPostProcessing bloomIntensity={0.22} />
            </CivicCanvas>
          </div>

          {/* Spatial Floating Data Badges (Micro-elements around 3D Core) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute top-8 right-6 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-md backdrop-blur-md text-[11px] font-mono text-slate-700 dark:text-slate-300 pointer-events-none"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="font-bold">WATER CRISIS</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">94 / 100</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute bottom-10 left-6 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-md backdrop-blur-md text-[11px] font-mono text-slate-700 dark:text-slate-300 pointer-events-none"
          >
            <Activity className="w-3.5 h-3.5 text-violet-500" />
            <span>312 SIGNALS</span>
            <span className="text-slate-400">•</span>
            <span className="text-violet-600 dark:text-violet-400 font-semibold">WARD 150</span>
          </motion.div>

        </div>

      </div>

    </section>
  );
};
