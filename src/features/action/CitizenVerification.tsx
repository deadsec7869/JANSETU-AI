import React, { useState } from 'react';
import { useAction } from '../../context/ActionContext';
import { 
  UserCheck, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Send, 
  MapPin, 
  ShieldCheck
} from 'lucide-react';

interface CitizenVerificationProps {
  className?: string;
}

export const CitizenVerification: React.FC<CitizenVerificationProps> = ({ className = '' }) => {
  const { workOrder, submitCitizenVerification } = useAction();
  const [selectedRating, setSelectedRating] = useState<'improved' | 'partially' | 'not_yet' | null>(null);
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRating) return;
    submitCitizenVerification(selectedRating, feedbackText);
    setSubmitted(true);
  };

  return (
    <div className={`p-6 rounded-3xl bg-slate-950/90 border border-slate-800 backdrop-blur-xl shadow-2xl space-y-6 ${className}`}>
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                COMMUNITY GROUND-TRUTH VERIFICATION
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                CLOSED-LOOP ACCOUNTABILITY
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              Did the Municipal Intervention Improve Your Area?
            </h2>
          </div>
        </div>

        {/* Community Consensus Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>{workOrder.verification.improvedPercent}% Citizen Approval</span>
        </div>
      </div>

      {/* Target Issue Context */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5 font-mono text-xs">
        <div className="flex items-center justify-between text-slate-400 text-[11px]">
          <span>Verified Target: <strong className="text-cyan-300">{workOrder.clusterId}</strong></span>
          <span className="text-emerald-400 font-bold">{workOrder.verification.totalResponses} Community Responses</span>
        </div>
        <div className="text-white font-sans font-bold text-sm">
          {workOrder.title}
        </div>
        <p className="text-slate-300 font-sans text-xs">
          BBMP engineering crews reported mechanical desilting and culvert restoration complete. We require direct citizen feedback before marking this civic issue permanently resolved.
        </p>
      </div>

      {/* Interactive Verification Form */}
      {submitted ? (
        <div className="p-6 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-center space-y-3 animate-in zoom-in-95 duration-200">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/60 flex items-center justify-center mx-auto text-emerald-300">
            <CheckCircle2 className="w-6 h-6 animate-bounce" />
          </div>
          <h3 className="text-base font-extrabold text-white">
            Thank You for Verifying Your Neighborhood!
          </h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            Your on-ground response has been recorded into the municipal accountability index. JANSETU uses citizen consensus to ensure public work orders deliver real outcomes.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <span className="text-xs font-mono font-bold text-slate-300 uppercase block">
            Select Your Ground Observation:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Yes Option */}
            <button
              type="button"
              onClick={() => setSelectedRating('improved')}
              className={`p-4 rounded-2xl border text-left transition-all space-y-1.5 ${
                selectedRating === 'improved'
                  ? 'bg-emerald-950/80 border-emerald-400 text-white shadow-glow-cyan'
                  : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:bg-slate-850'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-emerald-300">YES, IT IMPROVED</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Drainage water cleared, no persistent overflow onto road.
              </p>
            </button>

            {/* Partially Option */}
            <button
              type="button"
              onClick={() => setSelectedRating('partially')}
              className={`p-4 rounded-2xl border text-left transition-all space-y-1.5 ${
                selectedRating === 'partially'
                  ? 'bg-amber-950/80 border-amber-400 text-white shadow-amber-500/20'
                  : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:bg-slate-850'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-amber-300">PARTIALLY</span>
                <HelpCircle className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Main flow improved, but residual silt or minor issues remain.
              </p>
            </button>

            {/* Not Yet Option */}
            <button
              type="button"
              onClick={() => setSelectedRating('not_yet')}
              className={`p-4 rounded-2xl border text-left transition-all space-y-1.5 ${
                selectedRating === 'not_yet'
                  ? 'bg-rose-950/80 border-rose-400 text-white shadow-rose-500/20'
                  : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:bg-slate-850'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-rose-300">NOT YET</span>
                <AlertCircle className="w-4 h-4 text-rose-400" />
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Waterlogging persists during rain or work was inadequate.
              </p>
            </button>

          </div>

          {/* Optional Observation Text */}
          {selectedRating && (
            <div className="space-y-2 animate-in fade-in duration-150">
              <label className="text-[11px] font-mono text-slate-400 block">
                {selectedRating === 'partially' 
                  ? 'What specific work remains to be completed?' 
                  : selectedRating === 'not_yet' 
                  ? 'Describe unresolved issues for the field engineer:' 
                  : 'Optional feedback or praise for municipal field crew:'}
              </label>
              <input
                type="text"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder={selectedRating === 'improved' ? 'e.g., Road is clean and traffic flows freely...' : 'e.g., Silt removed from main culvert, but side drain needs check...'}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 text-slate-950 font-bold text-xs hover:opacity-95 transition-all shadow-glow-cyan flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>SUBMIT GROUND VERIFICATION</span>
              </button>
            </div>
          )}
        </form>
      )}

      {/* Live Verified Citizen Feedback Stream */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
          Recent Ground Observations from Local Commuters & Residents:
        </span>

        <div className="space-y-2.5">
          {workOrder.verification.feedbacks.map((fb) => (
            <div key={fb.id} className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-white">{fb.citizenName}</span>
                  <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {fb.verifiedLocation}
                  </span>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                  fb.rating === 'improved'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : fb.rating === 'partially'
                    ? 'bg-amber-950 text-amber-300 border border-amber-800'
                    : 'bg-rose-950 text-rose-300 border border-rose-800'
                }`}>
                  {fb.rating.toUpperCase()}
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                "{fb.comment}"
              </p>
              <span className="text-[10px] text-slate-500 font-mono block">
                {fb.timestamp}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
