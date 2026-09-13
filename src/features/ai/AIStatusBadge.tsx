import React, { useState, useEffect } from 'react';
import { getAIProviderStatus, setForcedAIMode } from './aiProvider';
import { apiClient, ApiHealthResponse } from '../../lib/api';
import { 
  Sparkles, 
  Cpu, 
  Settings2, 
  CheckCircle2, 
  RotateCcw,
  X,
  Server,
  AlertTriangle
} from 'lucide-react';

export const AIStatusBadge: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [status, setStatus] = useState(getAIProviderStatus());
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [backendHealth, setBackendHealth] = useState<ApiHealthResponse | null>(null);
  const [backendStatus, setBackendStatus] = useState<'checking' | 'connected' | 'offline'>('checking');
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const checkHealth = async () => {
    try {
      setBackendStatus('checking');
      const health = await apiClient.getHealth();
      setBackendHealth(health);
      setBackendStatus('connected');
    } catch {
      setBackendHealth(null);
      setBackendStatus('offline');
    }
  };

  useEffect(() => {
    setStatus(getAIProviderStatus());
    checkHealth();
  }, []);

  const handleSetMode = (mode: 'auto' | 'demo') => {
    setForcedAIMode(mode);
    setStatus(getAIProviderStatus());
    setSaveMessage(mode === 'auto' ? 'Switched to JANSETU API Gateway.' : 'Forced Offline Demo Mode.');
    setTimeout(() => setSaveMessage(null), 2500);
  };

  const isConnected = backendStatus === 'connected';

  return (
    <div className={`relative inline-block ${className}`}>
      
      {/* Clickable Badge Trigger */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) checkHealth();
        }}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl font-mono text-[11px] font-bold transition-all border shadow-sm backdrop-blur-md ${
          isConnected
            ? 'bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 border-blue-300 dark:border-blue-700/80 text-blue-700 dark:text-blue-300'
            : 'bg-slate-100 dark:bg-slate-900/90 hover:bg-slate-200 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
        }`}
        title="Click to view AI Intelligence Status & Backend Gateway"
      >
        {isConnected ? (
          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 animate-pulse" />
        ) : (
          <Cpu className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
        )}
        <span>{isConnected ? 'JANSETU API (ONLINE)' : 'DEMO MODE (OFFLINE)'}</span>
      </button>

      {/* Floating Configuration Popover */}
      {isOpen && (
        <div className="fixed sm:absolute top-16 sm:top-10 right-4 sm:right-0 z-50 w-84 max-w-[calc(100vw-2rem)] p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-2xl space-y-3.5 text-xs font-sans animate-in fade-in zoom-in-95 duration-150 text-slate-900 dark:text-slate-100">
          
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h4 className="font-extrabold text-slate-900 dark:text-white">AI Gateway Architecture</h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-[11px]">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Server className="w-3.5 h-3.5 text-blue-500" /> Backend Gateway:
              </span>
              <span className={`font-bold flex items-center gap-1 ${isConnected ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                {isConnected ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                {isConnected ? 'Fastify Server (Port 8787)' : 'Offline / Standalone'}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-slate-400">Gemini Key (Backend):</span>
              <span className={`font-bold ${backendHealth?.ai?.configured ? 'text-violet-600 dark:text-violet-400' : 'text-slate-500'}`}>
                {backendHealth?.ai?.configured ? `Configured (${backendHealth.ai.model})` : 'Not Set (Fallback Active)'}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Client Engine:</span>
              <span className="text-slate-900 dark:text-white font-bold">{status.modeLabel}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Zero-Billing Fallback:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% Guaranteed</span>
            </div>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleSetMode('auto')}
              className="flex-1 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors"
            >
              Connect API
            </button>
            <button
              type="button"
              onClick={() => handleSetMode('demo')}
              className="p-1.5 px-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 text-xs"
              title="Switch to Offline Deterministic Demo Mode"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Offline</span>
            </button>
          </div>

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
