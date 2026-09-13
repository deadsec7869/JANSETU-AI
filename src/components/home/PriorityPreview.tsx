import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Scale } from 'lucide-react';

export const PriorityPreview: React.FC = () => {
  const factors = [
    { name: 'Demand Density', score: 91, weight: '25%', color: 'bg-blue-600' },
    { name: 'Structural Severity', score: 87, weight: '20%', color: 'bg-indigo-600' },
    { name: 'Demographic Vulnerability', score: 95, weight: '20%', color: 'bg-violet-600' },
    { name: 'Urgency & Temporal Decay', score: 92, weight: '15%', color: 'bg-amber-500' },
    { name: 'Evidence Robustness', score: 89, weight: '10%', color: 'bg-emerald-600' },
    { name: 'Historical Service Deficit', score: 96, weight: '10%', color: 'bg-rose-500' },
  ];

  return (
    <section className="py-16 space-y-10 border-t border-slate-200/80 dark:border-slate-800/80">
      
      {/* Section Header */}
      <div className="space-y-3 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 font-mono text-xs font-semibold uppercase tracking-wider">
          <Scale className="w-3.5 h-3.5 text-blue-600" />
          <span>Deterministic Priority Engine</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          WHAT SHOULD HAPPEN FIRST?
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-300">
          Transparent multi-criteria weighting scores every neighborhood issue mathematically.
        </p>
      </div>

      {/* Priority Visual Card (Editorial Split) */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-lg backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Side: Hero Score (94/100) */}
        <div className="lg:col-span-5 space-y-6 flex flex-col items-start">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Composite Calculation
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-6xl sm:text-7xl lg:text-8xl font-black font-sans tracking-tight text-blue-600 dark:text-blue-400">
                94
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-slate-400 dark:text-slate-600 font-mono">
                / 100
              </span>
            </div>
            <p className="text-base font-bold text-slate-900 dark:text-white">
              PRIORITY SCORE #1 — HIGH URGENCY
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm">
            Weighted across 6 mathematical civic factors. Zero black-box hallucinations. All weights and mathematical formulas are open and auditable.
          </p>

          <div className="pt-2 flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>AI interprets. Rules calculate. Humans decide.</span>
          </div>
        </div>

        {/* Right Side: Minimal Horizontal Progress Bars */}
        <div className="lg:col-span-7 space-y-4">
          {factors.map((factor, idx) => (
            <motion.div
              key={factor.name}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="space-y-1.5"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  {factor.name} <span className="text-slate-400">({factor.weight} wt)</span>
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {factor.score} <span className="text-slate-400 font-normal">/ 100</span>
                </span>
              </div>

              {/* Progress Bar Container */}
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${factor.score}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + idx * 0.08, ease: 'easeOut' }}
                  className={`h-full rounded-full ${factor.color}`}
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>

    </section>
  );
};
