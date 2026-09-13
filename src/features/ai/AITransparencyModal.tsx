import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  X
} from 'lucide-react';

interface AITransparencyModalProps {
  onClose: () => void;
}

export const AITransparencyModal: React.FC<AITransparencyModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="max-w-3xl w-full p-6 sm:p-8 rounded-3xl bg-slate-950 border border-cyan-500/40 shadow-2xl space-y-6 relative overflow-hidden font-sans">
        
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  MUNICIPAL AI GOVERNANCE & TRANSPARENCY
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-400">
                  STANDARD v2.4
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-white tracking-tight mt-0.5">
                Constitutional AI Boundaries in Civic Intelligence
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* The Golden Core Axiom */}
        <div className="p-4.5 rounded-2xl bg-gradient-to-r from-cyan-950/70 via-slate-900 to-indigo-950/70 border border-cyan-500/40 text-center space-y-1 font-mono">
          <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-widest">
            JANSETU GOVERNANCE TRINITY
          </span>
          <div className="text-base sm:text-lg font-black text-white">
            AI Interprets <span className="text-cyan-400">→</span> Rules Calculate <span className="text-cyan-400">→</span> Humans Decide
          </div>
          <p className="text-xs text-slate-300 font-sans mt-1">
            Machine learning accelerates comprehension; deterministic algorithms enforce fairness; elected public servants authorize expenditures.
          </p>
        </div>

        {/* Comparison Matrix: What AI Does vs What AI NEVER Does */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          
          {/* What AI Does */}
          <div className="p-4.5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono uppercase text-[11px]">
              <CheckCircle2 className="w-4 h-4" />
              <span>What AI Does in JANSETU:</span>
            </div>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span><strong>Multilingual NLP:</strong> Interprets citizen voice recordings and text in Kannada & English without erasing cultural nuance.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span><strong>Semantic Clustering:</strong> Matches individual complaints with existing spatial problem hotspots.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span><strong>Causal Summarization:</strong> Synthesizes photos, transcripts, and sensor telemetry into executive findings.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span><strong>Policy Brief Drafting:</strong> Translates complex technical telemetry into concise Corporator memos.</span>
              </li>
            </ul>
          </div>

          {/* What AI NEVER Does */}
          <div className="p-4.5 rounded-2xl bg-slate-900/80 border border-rose-500/30 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold font-mono uppercase text-[11px]">
              <AlertTriangle className="w-4 h-4" />
              <span>What AI NEVER Does:</span>
            </div>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span><strong>NO Autonomous Budget Sanctions:</strong> AI cannot approve grants, award tenders, or release municipal funds.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span><strong>NO Black-Box Scoring:</strong> The Priority Index (e.g. 94/100) is calculated strictly by a deterministic rule engine.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span><strong>NO Data Fabrication:</strong> AI cannot invent casualty numbers, costs, or unverified sensor baselines.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span><strong>NO Contractor Selection:</strong> Official contractor empanelment is governed by municipal procurement law.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 font-mono">
          <span>Engine: Google Gemini Flash + Deterministic Fallback</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-glow-cyan"
          >
            Acknowledge Governance Model
          </button>
        </div>

      </div>
    </div>
  );
};
