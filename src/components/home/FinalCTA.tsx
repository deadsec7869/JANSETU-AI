import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Compass, Sparkles } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { Spotlight } from './Spotlight';

export const FinalCTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative my-16 p-10 sm:p-16 rounded-3xl bg-gradient-to-b from-white/90 to-blue-50/40 dark:from-slate-900/90 dark:to-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 shadow-xl backdrop-blur-xl overflow-hidden text-center space-y-8">
      
      {/* Soft Ambient Spotlight Behind CTA */}
      <Spotlight className="-top-32 left-1/3" fill="#7C3AED" />

      <div className="relative z-10 max-w-3xl mx-auto space-y-4">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 font-mono text-[11px] font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Civic Intelligence Network</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          THE CITY IS ALREADY TALKING.<br />
          <span className="text-blue-600 dark:text-blue-400">
            JANSETU MAKES THE SIGNAL ACTIONABLE.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
          From citizen voice to measurable civic action. Empower your neighborhood or inspect real-time municipal response.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <MagneticButton
            variant="primary"
            icon={PlusCircle}
            onClick={() => navigate('/report')}
            className="shadow-glow-blue px-8 py-3.5"
          >
            Report an Issue
          </MagneticButton>

          <MagneticButton
            variant="secondary"
            icon={Compass}
            onClick={() => navigate('/gov')}
            className="px-8 py-3.5"
          >
            Explore JANSETU
          </MagneticButton>
        </div>

      </div>

    </section>
  );
};
