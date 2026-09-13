import React from 'react';
import { motion } from 'framer-motion';
import { CardSpotlight } from './CardSpotlight';
import { 
  Mic, 
  FileText, 
  Camera, 
  BrainCircuit, 
  Network, 
  Target, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const HowItWorksBento: React.FC = () => {
  return (
    <section className="py-16 space-y-10">
      
      {/* Section Header */}
      <div className="space-y-3 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 font-mono text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>The Civic Intelligence Loop</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          HOW JANSETU WORKS
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-300">
          From fragmented citizen voice to measurable civic action.
        </p>
      </div>

      {/* Bento Grid Layout (6 Structured Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* CARD 1: LISTEN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="p-6 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-md hover:shadow-xl hover:border-blue-500/30 transition-all space-y-4 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200/60 dark:border-blue-800/40">
                01
              </span>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Mic className="w-3.5 h-3.5" />
                <FileText className="w-3.5 h-3.5" />
                <Camera className="w-3.5 h-3.5" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              LISTEN
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Multilingual citizen reports submitted via voice notes in Kannada, Hindi, and English, geo-tagged photos, or WhatsApp messages.
            </p>
          </div>

          {/* Micro Visual: floating signal particles simulation */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-[11px] font-mono">
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Kannada Voice + Photo
            </span>
            <span className="text-blue-600 dark:text-blue-400 font-semibold">1,420 INGESTED</span>
          </div>
        </motion.div>

        {/* CARD 2: UNDERSTAND */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-6 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-md hover:shadow-xl hover:border-violet-500/30 transition-all space-y-4 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-violet-600 dark:text-violet-400 px-2.5 py-0.5 rounded-full bg-violet-50 dark:bg-violet-950/50 border border-violet-200/60 dark:border-violet-800/40">
                02
              </span>
              <BrainCircuit className="w-4 h-4 text-violet-500" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              UNDERSTAND
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              AI extracts structured civic ontology: issue category, spatial coordinates, structural hazard severity, and vulnerable demographic context.
            </p>
          </div>

          {/* Micro Visual: structured schema tokens */}
          <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
            <div className="px-2 py-1 rounded bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 text-slate-600 dark:text-slate-400">
              ISSUE: Water Main
            </div>
            <div className="px-2 py-1 rounded bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 text-slate-600 dark:text-slate-400">
              SEVERITY: 87/100
            </div>
          </div>
        </motion.div>

        {/* CARD 3: CLUSTER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="p-6 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-md hover:shadow-xl hover:border-blue-500/30 transition-all space-y-4 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200/60 dark:border-blue-800/40">
                03
              </span>
              <Network className="w-4 h-4 text-blue-500" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              CLUSTER
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              DBSCAN spatial grouping connects isolated neighborhood reports into a single, cohesive municipal work package.
            </p>
          </div>

          {/* Micro Visual: merging node indicators */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-600 dark:text-slate-400">312 Reports</span>
            <ArrowRight className="w-3 h-3 text-blue-500" />
            <span className="text-blue-600 dark:text-blue-400 font-bold">1 HOTSPOT CLUSTER</span>
          </div>
        </motion.div>

        {/* CARD 4: PRIORITIZE (Featured with CardSpotlight) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CardSpotlight className="p-6 h-full flex flex-col justify-between space-y-4 border-blue-500/30">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200/60 dark:border-blue-800/40">
                  04
                </span>
                <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                PRIORITIZE
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Deterministic rule engine scores civic priority (0–100) using demand density, critical infrastructure proximity, and historical service gap.
              </p>
            </div>

            {/* Micro Visual: circular score */}
            <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/70 dark:border-blue-800/60 flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                Deterministic Score:
              </span>
              <span className="font-mono text-lg font-extrabold text-blue-600 dark:text-blue-400">
                94 / 100
              </span>
            </div>
          </CardSpotlight>
        </motion.div>

        {/* CARD 5: ACT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="p-6 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-md hover:shadow-xl hover:border-violet-500/30 transition-all space-y-4 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-violet-600 dark:text-violet-400 px-2.5 py-0.5 rounded-full bg-violet-50 dark:bg-violet-950/50 border border-violet-200/60 dark:border-violet-800/40">
                05
              </span>
              <span className="text-[10px] font-mono uppercase font-bold text-violet-600 dark:text-violet-400">Work Order</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              ACT
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Municipal engineers receive an actionable brief: What, Where, Why, estimated budget (₹1.45 Cr), and recommended field crew dispatch.
            </p>
          </div>

          {/* Micro Visual: action timeline tag */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-600 dark:text-slate-400">BWSSB Water Division</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">18 DAYS EST.</span>
          </div>
        </motion.div>

        {/* CARD 6: MEASURE (Featured with CardSpotlight) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <CardSpotlight className="p-6 h-full flex flex-col justify-between space-y-4 border-emerald-500/30">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/60 dark:border-emerald-800/40">
                  06
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                MEASURE
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Did the municipal intervention work? Before-and-after satellite & citizen ground verification completes the accountability loop.
              </p>
            </div>

            {/* Micro Visual: verified status */}
            <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-800/60 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-700 dark:text-slate-300">
                Citizen Verification:
              </span>
              <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                4.8 / 5 Verified
              </span>
            </div>
          </CardSpotlight>
        </motion.div>

      </div>

    </section>
  );
};
