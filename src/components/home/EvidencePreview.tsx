import React from 'react';
import { motion } from 'framer-motion';
import { Network, ShieldAlert, Sparkles, Building, Users, PlusCircle, Layers } from 'lucide-react';
import { TracingBeam } from './TracingBeam';
import { MagneticButton } from './MagneticButton';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

interface EvidencePreviewProps {
  onOpenEvidenceGraph?: () => void;
}

export const EvidencePreview: React.FC<EvidencePreviewProps> = ({ onOpenEvidenceGraph }) => {
  const { clusters, issues, isTestMode } = useApp();
  const navigate = useNavigate();

  const activeCluster = clusters.length > 0 ? clusters[0] : null;

  const schemaSteps = [
    {
      badge: '01 INPUT',
      title: 'Citizen Voice',
      desc: 'Multimodal reports (voice, photos, and text) logged with GPS verification.',
      icon: Users,
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      badge: '02 CLUSTER',
      title: 'Spatial Cluster',
      desc: 'DBSCAN spatial grouping connects related neighborhood reports into a unified node.',
      icon: Network,
      color: 'text-violet-600 dark:text-violet-400',
    },
    {
      badge: '03 DEFICIT',
      title: 'Infrastructure Deficit',
      desc: 'Spatial mapping identifies underlying asset vulnerabilities and service capacity gaps.',
      icon: ShieldAlert,
      color: 'text-indigo-600 dark:text-indigo-400',
    },
    {
      badge: '04 IMPACT',
      title: 'Demographic Context',
      desc: 'Proximity weighting scores access to schools, clinics, transit, and vulnerable residents.',
      icon: Building,
      color: 'text-amber-600 dark:text-amber-400',
    },
    {
      badge: '05 RESULT',
      title: 'Deterministic Priority',
      desc: 'Mathematical formula ranks intervention urgency transparently for official signoff.',
      icon: Sparkles,
      color: 'text-emerald-600 dark:text-emerald-400',
    },
  ];

  return (
    <section className="py-16 space-y-10 border-t border-slate-200/80 dark:border-slate-800/80">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-950/40 border border-violet-200/80 dark:border-violet-800/60 text-violet-700 dark:text-violet-300 font-mono text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-violet-600" />
            <span>Explainable Causal Graph</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            WHY DOES THIS ISSUE MATTER?
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            {activeCluster 
              ? `Evidence breakdown for Cluster ${activeCluster.code} (${activeCluster.name})`
              : 'How JANSETU transforms raw complaints into explainable, evidence-backed priority graphs.'}
          </p>
        </div>

        {/* CTA */}
        <MagneticButton
          variant="secondary"
          icon={Network}
          onClick={onOpenEvidenceGraph}
          className="border-violet-500/30 text-violet-700 dark:text-violet-300 hover:border-violet-500 shrink-0"
        >
          Explore 3D Evidence Graph
        </MagneticButton>
      </div>

      {/* Causal Chain Visualization */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-lg backdrop-blur-xl">
        
        {/* If real/test cluster exists, display its evidence nodes */}
        {activeCluster ? (
          <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="hidden lg:block absolute top-1/2 left-4 right-4 -translate-y-8 z-0">
              <TracingBeam orientation="horizontal" />
            </div>

            {schemaSteps.map((step, idx) => (
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
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Status:</span>
                  <span className="font-bold text-slate-900 dark:text-white">Active Node</span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Clean, beautiful empty state when no verified data is ingested yet */
          <div className="py-12 px-4 text-center space-y-6 max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-violet-50 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800 text-violet-600 dark:text-violet-400 mx-auto flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                NO VERIFIED CLUSTER EVIDENCE YET
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Evidence graphs construct causal chains automatically when verified citizen reports are logged in a neighborhood. Submit a report to begin building the evidence layer.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <MagneticButton
                variant="primary"
                icon={PlusCircle}
                onClick={() => navigate('/report')}
                className="text-xs py-2.5 px-4"
              >
                Submit Citizen Report
              </MagneticButton>
            </div>
          </div>
        )}

        {/* Provenance Footer */}
        <div className="mt-8 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Provenance tracked on all evidence nodes</span>
          </div>
          <span>
            {isTestMode ? 'TEST DATASET ACTIVE' : `${issues.length} REAL CIVIC SIGNAL(S) INGESTED`}
          </span>
        </div>

      </div>

    </section>
  );
};
