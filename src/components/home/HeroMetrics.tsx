import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Languages, ShieldCheck, Users } from 'lucide-react';

export const HeroMetrics: React.FC = () => {
  const capabilities = [
    {
      title: 'MULTIMODAL',
      subtitle: 'Voice · Text · Image',
      detail: 'Direct speech & photo ingestion',
      icon: Mic,
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'MULTILINGUAL',
      subtitle: 'Local-Language First',
      detail: 'Kannada, Hindi, & English NLP',
      icon: Languages,
      color: 'text-violet-600 dark:text-violet-400',
    },
    {
      title: 'EVIDENCE-FIRST',
      subtitle: 'AI + Verifiable Sources',
      detail: 'Provenance on every data point',
      icon: ShieldCheck,
      color: 'text-indigo-600 dark:text-indigo-400',
    },
    {
      title: 'HUMAN-IN-THE-LOOP',
      subtitle: 'Decisions Stay Human',
      detail: 'Officials authorize all work orders',
      icon: Users,
      color: 'text-emerald-600 dark:text-emerald-400',
    },
  ];

  return (
    <section className="py-6 my-6 border-y border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/30 backdrop-blur-md rounded-2xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-200/70 dark:divide-slate-800/70">
        {capabilities.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
            className="px-6 py-2 flex flex-col items-start justify-center space-y-1"
          >
            <div className="flex items-center gap-2">
              <item.icon className={`w-4 h-4 ${item.color}`} />
              <span className={`text-sm sm:text-base font-extrabold font-mono tracking-wider ${item.color}`}>
                {item.title}
              </span>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
              {item.subtitle}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              {item.detail}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
