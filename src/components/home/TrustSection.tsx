import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Scale, Cpu, UserCheck } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const principles = [
    {
      title: 'AI Interprets',
      desc: 'Multilingual speech and photos are parsed into structured ontology without hallucinations.',
      icon: Cpu,
      color: 'text-violet-600 dark:text-violet-400',
      border: 'border-violet-500/30',
    },
    {
      title: 'Data Proves',
      desc: 'Every recommendation is grounded in verifiable citizen reports and ground telemetry.',
      icon: ShieldCheck,
      color: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-500/30',
    },
    {
      title: 'Rules Calculate',
      desc: 'Multi-criteria priority ranking is 100% deterministic, auditable, and open-source.',
      icon: Scale,
      color: 'text-indigo-600 dark:text-indigo-400',
      border: 'border-indigo-500/30',
    },
    {
      title: 'Humans Decide',
      desc: 'Elected officials and department engineers authorize all work orders and allocations.',
      icon: UserCheck,
      color: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-500/30',
    },
  ];

  return (
    <section className="py-16 space-y-8 border-t border-slate-200/80 dark:border-slate-800/80">
      
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>Governance & Methodology</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          HOW JANSETU MAKES DECISIONS
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          JANSETU does not invent civic evidence or make autonomous government decisions. Recommendations are derived strictly from available verified evidence and remain subject to human review.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
        {principles.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className={`p-5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border ${item.border} shadow-sm backdrop-blur-md space-y-3`}
          >
            <div className={`p-2 w-fit rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 ${item.color}`}>
              <item.icon className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {item.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

    </section>
  );
};
