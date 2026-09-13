import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from './demoController';
import { DEMO_STAGES } from './demoState';
import { CANONICAL_SCENARIO, ELEVATOR_PITCH } from '../../data/canonicalScenario';
import { Button } from '../../components/ui/Button';
import { 
  Play, 
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Compass
} from 'lucide-react';

export const DemoPage: React.FC = () => {
  const navigate = useNavigate();
  const { startDemo, goToStage, resetDemoData } = useDemo();

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-cyan-500/30 p-8 sm:p-12 shadow-2xl shadow-cyan-950/40">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Hackathon Demonstration & Presentation Cockpit</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            JANSETU <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">AI</span>
            <br />
            <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-300">
              From Citizen Voice to Measurable Action
            </span>
          </h1>

          <p className="text-base text-slate-300 leading-relaxed max-w-2xl">
            An intelligence operating system connecting multilingual citizen signals, spatial clustering, deterministic priority scoring, and verifiable municipal accountability.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              icon={Play}
              onClick={startDemo}
              className="shadow-glow-cyan text-sm font-bold px-6 py-3"
            >
              Start 3-Minute Guided Demo
            </Button>

            <Button
              variant="glass"
              size="lg"
              icon={Compass}
              onClick={() => navigate('/')}
              className="border-slate-700 text-slate-200 hover:text-white"
            >
              Explore Freely
            </Button>

            <button
              onClick={resetDemoData}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/80 text-xs font-semibold text-slate-400 hover:text-amber-300 hover:bg-amber-500/10 hover:border-amber-500/30 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Everything (R)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 30-Second Value Proposition Flow */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <span>30-Second Product Narrative</span>
            </h2>
            <p className="text-xs text-slate-400">
              How JANSETU bridges the gap between fragmented citizen reports and verified government execution.
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
            ELEVATOR PITCH
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {ELEVATOR_PITCH.map((p) => (
            <div
              key={p.step}
              className={`p-4 rounded-2xl ${p.bg} border ${p.borderColor} flex flex-col justify-between space-y-3 relative`}
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                  <span className={`font-mono text-xs font-bold ${p.color}`}>{p.step}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${p.color}`}>
                    {p.stage}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mt-2 leading-snug">
                  {p.headline}
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {p.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Canonical Demonstration Scenario Card */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-cyan-500/30 space-y-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold">
                CANONICAL DEMO SCENARIO
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                SYNTHETIC DEMO DATA
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mt-1.5">
              {CANONICAL_SCENARIO.clusterTitle}
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Code: {CANONICAL_SCENARIO.clusterCode} • {CANONICAL_SCENARIO.wardName} • {CANONICAL_SCENARIO.primaryDepartment}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <div className="text-right">
              <p className="text-[10px] text-slate-400 uppercase font-mono">Deterministic Score</p>
              <p className="text-2xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-300">
                {CANONICAL_SCENARIO.deterministicPriorityScore} / 100
              </p>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div>
              <p className="text-[10px] text-emerald-400 uppercase font-mono">Calculated By</p>
              <p className="text-xs font-bold text-white">Rule Engine</p>
            </div>
          </div>
        </div>

        {/* 6 Canonical Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
            <p className="text-[10px] text-slate-400 uppercase font-mono">Reports Ingested</p>
            <p className="text-lg font-mono font-bold text-cyan-400">{CANONICAL_SCENARIO.totalReports}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
            <p className="text-[10px] text-slate-400 uppercase font-mono">Geotagged Images</p>
            <p className="text-lg font-mono font-bold text-purple-400">{CANONICAL_SCENARIO.geotaggedImages}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
            <p className="text-[10px] text-slate-400 uppercase font-mono">Kannada/Eng Audio</p>
            <p className="text-lg font-mono font-bold text-amber-400">{CANONICAL_SCENARIO.audioNotes}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
            <p className="text-[10px] text-slate-400 uppercase font-mono">Culvert Blockage</p>
            <p className="text-lg font-mono font-bold text-rose-400">{CANONICAL_SCENARIO.culvertBlockagePercent}%</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
            <p className="text-[10px] text-slate-400 uppercase font-mono">Daily Commuters</p>
            <p className="text-lg font-mono font-bold text-white">{CANONICAL_SCENARIO.dailyCommutersAffected.toLocaleString()}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
            <p className="text-[10px] text-slate-400 uppercase font-mono">Target Budget</p>
            <p className="text-lg font-mono font-bold text-emerald-400">{CANONICAL_SCENARIO.estimatedBudget}</p>
          </div>
        </div>
      </div>

      {/* 8-Stage Interactive Roadmap Grid */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <span>8-Stage Demonstration Roadmap</span>
          </h2>
          <p className="text-xs text-slate-400">
            Click any stage below to jump directly into that live application view with presenter guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {DEMO_STAGES.map((stage) => (
            <div
              key={stage.key}
              onClick={() => goToStage(stage.index)}
              className="group p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-850/90 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 relative overflow-hidden"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-cyan-400">
                    {stage.stageNumber}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                    {stage.timeline}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {stage.title}
                </h4>

                <p className="text-xs text-slate-400 line-clamp-2">
                  {stage.subtitle}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500 group-hover:text-cyan-400 transition-colors font-medium">
                <span>View {stage.targetRole === 'citizen' ? 'Citizen Flow' : 'Government Flow'}</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hackathon Trust & Governance Statement */}
      <div className="p-6 rounded-3xl bg-slate-950 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>JANSETU Core Governance Principle</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-white">AI INTERPRETS. RULES CALCULATE. HUMANS DECIDE.</strong> An LLM is never permitted to approve municipal budgets, sanction engineering contractors, or invent official decisions.
          </p>
        </div>

        <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
          ZERO-BILLING OFFLINE READY
        </span>
      </div>

    </div>
  );
};
