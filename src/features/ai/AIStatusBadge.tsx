import React, { useState, useEffect } from 'react';
import { getAIProviderStatus, setCustomGeminiApiKey, setForcedAIMode } from './aiProvider';
import { 
  Sparkles, 
  Cpu, 
  Settings2, 
  CheckCircle2, 
  KeyRound, 
  RotateCcw,
  X
} from 'lucide-react';

export const AIStatusBadge: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [status, setStatus] = useState(getAIProviderStatus());
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [keyInput, setKeyInput] = useState<string>('');
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    setStatus(getAIProviderStatus());
  }, []);

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyInput.trim().length > 10) {
      setCustomGeminiApiKey(keyInput.trim());
      setForcedAIMode('gemini');
      setSaveMessage('Gemini API Key activated!');
    } else {
      setCustomGeminiApiKey(null);
      setForcedAIMode('demo');
      setSaveMessage('Switched to Deterministic Demo Mode.');
    }
    setStatus(getAIProviderStatus());
    setTimeout(() => setSaveMessage(null), 2500);
  };

  const handleResetToDemo = () => {
    setCustomGeminiApiKey(null);
    setForcedAIMode('demo');
    setKeyInput('');
    setStatus(getAIProviderStatus());
    setSaveMessage('Forced Demo Mode (Offline Deterministic).');
    setTimeout(() => setSaveMessage(null), 2500);
  };

  const isGemini = status.provider === 'gemini';

  return (
    <div className={`relative inline-block ${className}`}>
      
      {/* Clickable Badge Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl font-mono text-[11px] font-bold transition-all border shadow-sm backdrop-blur-md ${
          isGemini
            ? 'bg-violet-50 dark:bg-violet-950/60 hover:bg-violet-100 dark:hover:bg-violet-900/60 border-violet-300 dark:border-violet-700/80 text-violet-700 dark:text-violet-300'
            : 'bg-slate-100 dark:bg-slate-900/90 hover:bg-slate-200 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
        }`}
        title="Click to view AI Intelligence Status & Model Configuration"
      >
        {isGemini ? (
          <Sparkles className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400 animate-pulse" />
        ) : (
          <Cpu className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
        )}
        <span>{status.modeLabel}</span>
      </button>

      {/* Floating Configuration Popover */}
      {isOpen && (
        <div className="fixed sm:absolute top-16 sm:top-10 right-4 sm:right-0 z-50 w-80 max-w-[calc(100vw-2rem)] p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-2xl space-y-3.5 text-xs font-sans animate-in fade-in zoom-in-95 duration-150 text-slate-900 dark:text-slate-100">
          
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              <h4 className="font-extrabold text-slate-900 dark:text-white">AI Intelligence Engine</h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-1 font-mono text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Active Engine:</span>
              <span className={`font-bold ${isGemini ? 'text-violet-600 dark:text-violet-300' : 'text-slate-800 dark:text-slate-300'}`}>
                {status.provider === 'gemini' ? 'Google Gemini 1.5 Flash' : 'JANSETU Deterministic Core'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Execution Mode:</span>
              <span className="text-slate-900 dark:text-white font-bold">{status.modeLabel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Zero-Billing Fallback:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% Guaranteed</span>
            </div>
          </div>

          {/* Quick API Key Injection for Hackathon Judges */}
          <form onSubmit={handleSaveKey} className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
              <label className="flex items-center gap-1">
                <KeyRound className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
                <span>Runtime Gemini Key:</span>
              </label>
              {status.hasApiKey && (
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3" /> Configured
                </span>
              )}
            </div>

            <input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="Paste Google AI Studio Key (AIza...)"
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-violet-500 font-mono"
            />

            <div className="flex items-center gap-2 pt-1">
              <button
                type="submit"
                className="flex-1 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors"
              >
                Apply Key
              </button>
              <button
                type="button"
                onClick={handleResetToDemo}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                title="Reset to Offline Demo Mode"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {saveMessage && (
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-[11px] font-mono text-center">
              {saveMessage}
            </div>
          )}

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono">
            <span>AI INTERPRETS • RULES CALCULATE</span>
            <span>HUMANS DECIDE</span>
          </div>

        </div>
      )}

    </div>
  );
};
