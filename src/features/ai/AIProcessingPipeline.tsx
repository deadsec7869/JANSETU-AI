import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  Cpu, 
  Network, 
  Layers, 
  Flame, 
  FileCheck2,
  CheckCheck
} from 'lucide-react';

interface AIProcessingPipelineProps {
  onComplete?: () => void;
  className?: string;
  isCompleted?: boolean;
}

const PIPELINE_STEPS = [
  { id: '01', title: 'Understanding Report', desc: 'Multilingual NLP (Kannada / English) & intent classification', icon: Cpu },
  { id: '02', title: 'Extracting Civic Entities', desc: 'Isolating defect, landmark, and affected service domain', icon: Sparkles },
  { id: '03', title: 'Matching Related Reports', desc: 'Spatial clustering with active ward incident hotspots', icon: Layers },
  { id: '04', title: 'Building Evidence Context', desc: 'Merging vision, audio transcripts, and sensor telemetry', icon: Network },
  { id: '05', title: 'Generating Causal Explanation', desc: 'Synthesizing plain-language reasoning for residents', icon: FileCheck2 },
  { id: '06', title: 'Applying Priority Rules', desc: 'Rule Engine calculates deterministic risk index (94/100)', icon: Flame },
  { id: '07', title: 'Preparing Recommendation', desc: 'Structuring municipal civil work order proposal', icon: CheckCheck },
];

export const AIProcessingPipeline: React.FC<AIProcessingPipelineProps> = ({
  onComplete,
  className = '',
  isCompleted = false,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(isCompleted ? 7 : 0);

  useEffect(() => {
    if (isCompleted) {
      setCurrentStep(7);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= 6) {
          clearInterval(interval);
          if (onComplete) onComplete();
          return 7;
        }
        return prev + 1;
      });
    }, 280);

    return () => clearInterval(interval);
  }, [isCompleted, onComplete]);

  return (
    <div className={`p-5 rounded-3xl bg-slate-950/95 border border-cyan-500/40 backdrop-blur-2xl shadow-2xl space-y-4 font-sans ${className}`}>
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Cpu className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">
              7-STAGE CIVIC INTELLIGENCE PIPELINE
            </span>
            <h3 className="text-sm font-extrabold text-white">
              Autonomous AI Triage & Rule Engine
            </h3>
          </div>
        </div>

        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-cyan-300 font-bold">
          {currentStep >= 7 ? 'TRIAGE COMPLETE' : `STAGE 0${Math.min(7, currentStep + 1)} / 07`}
        </span>
      </div>

      {/* 7 Progressive Steps */}
      <div className="space-y-2">
        {PIPELINE_STEPS.map((step, idx) => {
          const isDone = currentStep > idx || isCompleted;
          const isActive = currentStep === idx && !isCompleted;
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              className={`p-2.5 rounded-xl border transition-all flex items-center justify-between gap-3 text-xs ${
                isActive
                  ? 'bg-cyan-950/70 border-cyan-500 text-white shadow-glow-cyan'
                  : isDone
                  ? 'bg-slate-900/50 border-emerald-500/30 text-slate-200'
                  : 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold shrink-0 ${
                    isDone
                      ? 'bg-emerald-500 text-slate-950'
                      : isActive
                      ? 'bg-cyan-400 text-slate-950 animate-pulse'
                      : 'bg-slate-900 text-slate-500 border border-slate-700'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : step.id}
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <Icon className={`w-3 h-3 ${isActive ? 'text-cyan-300' : isDone ? 'text-emerald-400' : 'text-slate-600'}`} />
                    <span className="font-bold">{step.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5 leading-tight">
                    {step.desc}
                  </span>
                </div>
              </div>

              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold shrink-0 ${
                isDone
                  ? 'bg-emerald-950 text-emerald-300'
                  : isActive
                  ? 'bg-cyan-950 text-cyan-300 animate-pulse'
                  : 'text-slate-600'
              }`}>
                {isDone ? 'COMPLETE' : isActive ? 'PROCESSING' : 'PENDING'}
              </span>
            </div>
          );
        })}
      </div>

    </div>
  );
};
