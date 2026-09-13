import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Scale, Calculator } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PriorityPreview: React.FC = () => {
  const { issues } = useApp();

  const topIssue = issues.length > 0
    ? [...issues].sort((a, b) => (b.priorityScore?.overallScore || 0) - (a.priorityScore?.overallScore || 0))[0]
    : null;

  const score = topIssue?.priorityScore?.overallScore || null;

  const methodologyFactors = [
    { name: 'Demand Density', weight: '25%', formula: 'Geospatial report cluster volume & repetition frequency' },
    { name: 'Structural Severity', weight: '20%', formula: 'Hazard severity index (e.g. flood height, crater depth)' },
    { name: 'Demographic Vulnerability', weight: '20%', formula: 'Proximity to schools, hospitals, transit arteries' },
    { name: 'Urgency & Decay', weight: '15%', formula: 'Temporal decay factor based on unresolved duration' },
    { name: 'Evidence Robustness', weight: '10%', formula: 'Multimodal corroboration & resident ground confirmations' },
    { name: 'Historical Service Gap', weight: '10%', formula: 'Municipal SLA deviation and chronic infrastructure backlog' },
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

      {/* Priority Visual Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-lg backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Side: Score or Intentional Empty State */}
        <div className="lg:col-span-5 space-y-6 flex flex-col items-start">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Composite Calculation
            </span>
            
            {score !== null ? (
              <div className="flex items-baseline gap-3">
                <span className="text-6xl sm:text-7xl lg:text-8xl font-black font-sans tracking-tight text-blue-600 dark:text-blue-400">
                  {score}
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-slate-400 dark:text-slate-600 font-mono">
                  / 100
                </span>
              </div>
            ) : (
              <div className="py-2">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-mono text-sm font-semibold">
                  <Calculator className="w-5 h-5 text-blue-500" />
                  <span>PRIORITY AWAITS VERIFIED EVIDENCE</span>
                </div>
              </div>
            )}

            <p className="text-base font-bold text-slate-900 dark:text-white">
              {topIssue
                ? `${topIssue.title.slice(0, 50)}...`
                : 'Deterministic Civic Score Formula'}
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

        {/* Right Side: Methodology Weighting Breakdown */}
        <div className="lg:col-span-7 space-y-3.5">
          {methodologyFactors.map((factor, idx) => (
            <motion.div
              key={factor.name}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="p-3 rounded-xl bg-white/80 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 space-y-1"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-800 dark:text-slate-200 font-bold">
                  {factor.name}
                </span>
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {factor.weight} Weight
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {factor.formula}
              </p>
            </motion.div>
          ))}
        </div>

      </div>

    </section>
  );
};
