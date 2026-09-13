import React from 'react';
import { motion } from 'framer-motion';

interface HeroMetricsProps {
  totalReports?: number;
  activeClusters?: number;
  topPriority?: number;
  turnaroundPercent?: number;
}

export const HeroMetrics: React.FC<HeroMetricsProps> = ({
  totalReports = 1420,
  activeClusters = 4,
  topPriority = 94,
  turnaroundPercent = 46.5,
}) => {
  const metrics = [
    {
      value: totalReports.toLocaleString(),
      label: 'Reports Processed',
      sublabel: 'Multilingual citizen signals',
      color: 'text-slate-900 dark:text-white',
    },
    {
      value: `${activeClusters}`,
      label: 'Active Clusters',
      sublabel: 'Spatial issue hotspots',
      color: 'text-violet-600 dark:text-violet-400',
    },
    {
      value: `${topPriority}/100`,
      label: 'Top Priority Score',
      sublabel: 'Deterministic rule calculation',
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      value: `+${turnaroundPercent}%`,
      label: 'Resolution Acceleration',
      sublabel: 'Faster field dispatch',
      color: 'text-emerald-600 dark:text-emerald-400',
    },
  ];

  return (
    <section className="py-8 my-6 border-y border-slate-200/80 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/30 backdrop-blur-md rounded-2xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-200/70 dark:divide-slate-800/70">
        {metrics.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
            className="px-6 py-2 flex flex-col items-start justify-center space-y-1"
          >
            <span className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold font-sans tracking-tight ${item.color}`}>
              {item.value}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
              {item.label}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              {item.sublabel}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
