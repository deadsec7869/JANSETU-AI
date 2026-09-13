import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BrainCircuit, 
  Layers, 
  Network, 
  CheckCircle2, 
  Cpu
} from 'lucide-react';

interface AIProcessingModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

const STEPS = [
  {
    title: 'Understanding your report...',
    subtitle: 'Extracting civic entities, hazard semantics, sentiment, and visual coordinates',
    icon: BrainCircuit,
    color: 'text-brand-400',
    duration: 1800,
  },
  {
    title: 'Finding related issues...',
    subtitle: 'Performing spatial-semantic clustering across ward geographic radius',
    icon: Layers,
    color: 'text-purple-400',
    duration: 2000,
  },
  {
    title: 'Building civic evidence...',
    subtitle: 'Synthesizing evidence graph, calculating algorithmic priority score, & formulating municipal action proposal',
    icon: Network,
    color: 'text-emerald-400',
    duration: 1800,
  },
];

export const AIProcessingModal: React.FC<AIProcessingModalProps> = ({ isOpen, onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepProgress, setStepProgress] = useState(15);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStepIndex(0);
      setStepProgress(15);
      return;
    }

    let timeout1: NodeJS.Timeout;
    let timeout2: NodeJS.Timeout;
    let timeout3: NodeJS.Timeout;

    // Step 1: 0 - 1.8s
    setCurrentStepIndex(0);
    setStepProgress(35);

    // Step 2: 1.8s - 3.8s
    timeout1 = setTimeout(() => {
      setCurrentStepIndex(1);
      setStepProgress(70);
    }, 1800);

    // Step 3: 3.8s - 5.6s
    timeout2 = setTimeout(() => {
      setCurrentStepIndex(2);
      setStepProgress(100);
    }, 3800);

    // Complete
    timeout3 = setTimeout(() => {
      onComplete();
    }, 5600);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  const currentStep = STEPS[currentStepIndex];
  const StepIcon = currentStep.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-lg bg-slate-900 border border-brand-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/80 text-center relative overflow-hidden"
      >
        {/* Background ambient glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-300 font-mono text-xs flex items-center gap-1.5 shadow-glow-cyan">
            <Cpu className="w-3.5 h-3.5 text-brand-400 animate-spin" />
            <span>JANSETU AI Civic Pipeline</span>
          </div>
        </div>

        {/* Animated Icon Central Circle */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-brand-600/30 via-purple-600/30 to-emerald-600/30 p-1 flex items-center justify-center animate-pulse">
            <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center border border-white/10 shadow-inner">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStepIndex}
                  initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 15 }}
                  transition={{ duration: 0.3 }}
                >
                  <StepIcon className={`w-10 h-10 ${currentStep.color}`} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Animated Step Title */}
        <div className="min-h-[70px] mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-1.5"
            >
              <h3 className="text-xl font-extrabold text-white tracking-tight">
                {currentStep.title}
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                {currentStep.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Overall Progress Bar */}
        <div className="space-y-2 mb-6 text-left">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono">Stage {currentStepIndex + 1} of 3</span>
            <span className="font-mono text-brand-300 font-bold">{stepProgress}%</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 via-purple-500 to-emerald-400 transition-all duration-500 ease-out"
              style={{ width: `${stepProgress}%` }}
            />
          </div>
        </div>

        {/* Step checkpoints preview */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-left">
          {STEPS.map((_, idx) => {
            const isDone = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            return (
              <div
                key={idx}
                className={`p-2 rounded-lg border text-[11px] transition-all ${
                  isDone
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                    : isCurrent
                    ? 'bg-brand-950/40 border-brand-500/40 text-brand-200 shadow-glow-cyan'
                    : 'bg-slate-900/40 border-slate-800 text-slate-500'
                }`}
              >
                <div className="flex items-center gap-1 font-semibold mb-0.5">
                  {isDone ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  ) : isCurrent ? (
                    <span className="w-2 h-2 rounded-full bg-brand-400 animate-ping shrink-0" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-slate-600 shrink-0" />
                  )}
                  <span className="truncate">Step {idx + 1}</span>
                </div>
                <div className="truncate text-[10px] opacity-80">
                  {idx === 0 ? 'NLP Parse' : idx === 1 ? 'Clustering' : 'Priority'}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
