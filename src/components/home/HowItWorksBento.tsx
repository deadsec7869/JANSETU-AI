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
  Sparkles,
  Wrench
} from 'lucide-react';

export const HowItWorksBento: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 space-y-10 scroll-mt-20">
      
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
              Multilingual citizen reports submitted via voice notes in Kannada, Hindi, or English, geotagged photos, and text messages.
            </p>
          </div>

          {/* Micro Visual: Multimodal Ingestion Pipeline */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-[11px] font-mono">
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Multimodal Ingestion
            </span>
            <span className="text-blue-600 dark:text-blue-400 font-semibold">VOICE · TEXT · PHOTO</span>
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
              AI extracts structured civic ontology: issue category, precise spatial coordinates, structural hazard severity, and vulnerable demographic context.
            </p>
          </div>

          {/* Micro Visual: Schema Extraction Tokens */}
          <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
            <div className="px-2 py-1 rounded bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 text-slate-600 dark:text-slate-400">
              SCHEMA: Structured
            </div>
            <div className="px-2 py-1 rounded bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 text-slate-600 dark:text-slate-400">
              ENTITIES: Geotagged
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
              Spatial grouping connects related neighborhood reports into unified civic signals, preventing individual complaints from getting lost.
            </p>
          </div>

          {/* Micro Visual: Aggregation Indicator */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-600 dark:text-slate-400">Isolated Reports</span>
            <ArrowRight className="w-3 h-3 text-blue-500" />
            <span className="text-blue-600 dark:text-blue-400 font-bold">UNIFIED CLUSTER</span>
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
                Deterministic rule engine scores civic priority mathematically using demand density, infrastructure proximity, and verified evidence.
              </p>
            </div>

            {/* Micro Visual: Multi-Factor Formula */}
            <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/70 dark:border-blue-800/60 flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-700 dark:text-slate-300">
                Rule Calculation:
              </span>
              <span className="font-bold text-blue-600 dark:text-blue-400">
                6-FACTOR WEIGHTING
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
              <Wrench className="w-4 h-4 text-violet-500" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              ACT
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Municipal authorities receive structured decision support: issue summary, spatial coordinates, root cause, and recommended intervention.
            </p>
          </div>

          {/* Micro Visual: Decision Support */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-600 dark:text-slate-400">Decision Support:</span>
            <span className="text-violet-600 dark:text-violet-400 font-bold">OFFICIAL SIGNOFF</span>
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
                Ground resolution is verified through follow-up citizen confirmation, closing the civic loop with genuine accountability.
              </p>
            </div>

            {/* Micro Visual: Verification Loop */}
            <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-800/60 flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-700 dark:text-slate-300">
                Civic Loop:
              </span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                CITIZEN VERIFIED
              </span>
            </div>
          </CardSpotlight>
        </motion.div>

      </div>

    </section>
  );
};
