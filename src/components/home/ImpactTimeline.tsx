import React from 'react';
import { motion } from 'framer-motion';
import { 
  Radio, 
  BrainCircuit, 
  Sliders, 
  Wrench, 
  BarChart2, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

export const ImpactTimeline: React.FC = () => {
  const stages = [
    {
      step: '01',
      title: 'VOICE',
      desc: 'Multilingual citizen input via voice, text, & photos',
      icon: Radio,
      accent: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/40',
      border: 'border-blue-200 dark:border-blue-800',
    },
    {
      step: '02',
      title: 'UNDERSTAND',
      desc: 'AI extracts structured ontology & location bounds',
      icon: BrainCircuit,
      accent: 'text-violet-600 dark:text-violet-400',
      bg: 'bg-violet-50 dark:bg-violet-950/40',
      border: 'border-violet-200 dark:border-violet-800',
    },
    {
      step: '03',
      title: 'PRIORITIZE',
      desc: 'Deterministic multi-factor score ranks urgency',
      icon: Sliders,
      accent: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/40',
      border: 'border-blue-200 dark:border-blue-800',
    },
    {
      step: '04',
      title: 'ACT',
      desc: 'Government work order dispatched with budget & SLA',
      icon: Wrench,
      accent: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      border: 'border-amber-200 dark:border-amber-800',
    },
    {
      step: '05',
      title: 'MEASURE',
      desc: 'Field execution verified with before/after imagery',
      icon: BarChart2,
      accent: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      border: 'border-emerald-200 dark:border-emerald-800',
    },
    {
      step: '06',
      title: 'VERIFY',
      desc: 'Citizens confirm resolution to close the accountability loop',
      icon: CheckCircle2,
      accent: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      border: 'border-emerald-200 dark:border-emerald-800',
    },
  ];

  return (
    <section className="py-16 space-y-10 border-t border-slate-200/80 dark:border-slate-800/80">
      
      {/* Section Header */}
      <div className="space-y-3 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 font-mono text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Closed-Loop Lifecycle</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          FROM SIGNAL TO IMPACT
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-300">
          A continuous, accountable loop ensuring no community issue is lost in bureaucracy.
        </p>
      </div>

      {/* Horizontal / Grid Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {stages.map((stage, idx) => (
          <motion.div
            key={stage.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: idx * 0.08 }}
            className="p-5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-md backdrop-blur-md flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500">
                  {stage.step}
                </span>
                <div className={`p-2 rounded-xl ${stage.bg} border ${stage.border} ${stage.accent}`}>
                  <stage.icon className="w-4 h-4" />
                </div>
              </div>

              <h4 className={`text-sm font-bold font-mono tracking-wider ${stage.accent}`}>
                {stage.title}
              </h4>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {stage.desc}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[10px] font-mono text-slate-400">
              Stage {idx + 1} of 6
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
};
