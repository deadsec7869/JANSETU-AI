import React from 'react';
import { motion } from 'framer-motion';

export const WhyJansetu: React.FC = () => {
  const pillars = [
    {
      title: 'CITIZEN VOICE',
      description: 'Multilingual reports in local dialects are processed in real-time, removing digital literacy barriers for every citizen.',
      accent: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-500/20',
    },
    {
      title: 'EVIDENCE GRAPH',
      description: 'Spatial clustering aggregates hundreds of fragmented complaints into deterministic, transparent causal evidence.',
      accent: 'text-violet-600 dark:text-violet-400',
      border: 'border-violet-500/20',
    },
    {
      title: 'MEASURABLE ACTION',
      description: 'Municipalities receive prioritized work orders with estimated budgets and field verification to ensure real outcomes.',
      accent: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-500/20',
    },
  ];

  return (
    <section className="py-20 border-t border-slate-200/80 dark:border-slate-800/80 space-y-16">
      
      {/* Editorial Manifesto Statement */}
      <div className="max-w-4xl space-y-4">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 font-semibold"
        >
          Not Another Complaint Portal
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.06]"
        >
          JANSETU DOESN’T JUST COUNT REPORTS.{' '}
          <span className="text-blue-600 dark:text-blue-400">
            IT UNDERSTANDS THE SIGNAL.
          </span>
        </motion.h2>
      </div>

      {/* 3 Minimal Pillars (No giant card containers, clean whitespace) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-4">
        {pillars.map((pillar, index) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            className={`space-y-3 pt-6 border-t-2 ${pillar.border}`}
          >
            <h3 className={`text-base font-bold font-mono tracking-wider ${pillar.accent}`}>
              {pillar.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {pillar.description}
            </p>
          </motion.div>
        ))}
      </div>

    </section>
  );
};
