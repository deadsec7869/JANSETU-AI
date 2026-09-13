import React from 'react';
import { motion } from 'framer-motion';
import { Network, ShieldAlert, Sparkles, Building, Users } from 'lucide-react';
import { TracingBeam } from './TracingBeam';
import { MagneticButton } from './MagneticButton';

interface EvidencePreviewProps {
  onOpenEvidenceGraph?: () => void;
}

export const EvidencePreview: React.FC<EvidencePreviewProps> = ({ onOpenEvidenceGraph }) => {
  const steps = [
    {
      badge: 'INPUT',
      title: '312 Citizen Reports',
      desc: 'Multilingual reports (142 photos, 98 Kannada audio notes) logged within 800m of 14th Main Rd.',
      stat: '312 Signals',
      icon: Users,
    },
    {
      badge: 'SPATIAL AGGREGATION',
      title: 'Community Cluster CL-BLR-150-01',
      desc: 'DBSCAN spatial clustering connected isolated street leaks to a single catastrophic trunkline failure.',
      stat: 'Ward 150 (Bellandur)',
      icon: Network,
    },
    {
      badge: 'HAZARD MAPPING',
      title: 'Infrastructure Deficit',
      desc: 'Main feeder line rupture causing 78% supply blockage, affecting 84,000 daily commuters.',
      stat: '78% Deficit',
      icon: ShieldAlert,
    },
    {
      badge: 'CRITICAL IMPACT',
      title: 'Vulnerable Institutions',
      desc: '2 primary government schools and 1 public clinic completely cut off from municipal water supply.',
      stat: '32,000 Residents',
      icon: Building,
    },
    {
      badge: 'DETERMINISTIC RESULT',
      title: 'Priority Score: 94 / 100',
      desc: 'Ranked #1 out of 4 active city hotspots. Work order dispatched to BWSSB Central Division.',
      stat: 'Top Priority #1',
      icon: Sparkles,
    },
  ];

  return (
    <section className="py-16 space-y-10 border-t border-slate-200/80 dark:border-slate-800/80">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-950/40 border border-violet-200/80 dark:border-violet-800/60 text-violet-700 dark:text-violet-300 font-mono text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-violet-600" />
            <span>Explainable Civic Decision</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            WHY WAS THIS PRIORITY #1?
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            Inside Cluster <span className="font-mono font-bold text-slate-900 dark:text-white">CL-BLR-150-01</span>: How data transparency replaces arbitrary guesswork.
          </p>
        </div>

        {/* CTA to Open Full 3D Interactive Evidence Graph */}
        <MagneticButton
          variant="secondary"
          icon={Network}
          onClick={onOpenEvidenceGraph}
          className="border-violet-500/30 text-violet-700 dark:text-violet-300 hover:border-violet-500 shrink-0"
        >
          Explore 3D Evidence Graph
        </MagneticButton>
      </div>

      {/* Causal Chain with Tracing Beam */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-lg backdrop-blur-xl">
        <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-6">
          
          {/* Subtle Horizontal Tracing Beam for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 -translate-y-8 z-0">
            <TracingBeam orientation="horizontal" />
          </div>

          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative z-10 p-5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-md flex flex-col justify-between space-y-4 hover:border-violet-400 dark:hover:border-violet-500/50 transition-all"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 px-2 py-0.5 rounded bg-violet-50 dark:bg-violet-950/60 border border-violet-200/60 dark:border-violet-800/40">
                    {step.badge}
                  </span>
                  <step.icon className="w-4 h-4 text-slate-400" />
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  {step.title}
                </h4>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Metric:</span>
                <span className="font-bold text-slate-900 dark:text-white">{step.stat}</span>
              </div>
            </motion.div>
          ))}

        </div>

        {/* Footer Note */}
        <div className="mt-8 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Trace verified with 100% deterministic weighting rules</span>
          </div>
          <span>SYNTHETIC DEMO DATA • CLUSTER CL-BLR-150-01</span>
        </div>
      </div>

    </section>
  );
};
