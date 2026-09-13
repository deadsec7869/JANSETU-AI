import React, { useState, useEffect } from 'react';
import { Mic, Square, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface VoiceRecorderSimulationProps {
  onTranscriptReady: (transcript: string) => void;
}

export const VoiceRecorderSimulation: React.FC<VoiceRecorderSimulationProps> = ({ onTranscriptReady }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [transcript, setTranscript] = useState<string | null>(null);

  const sampleTranscripts = [
    "Heavy stormwater overflow near the main junction. Road is submerged under 2 feet of water and two-wheelers cannot pass.",
    "Dangerous 1.5-foot deep pothole right on the flyover turn. Vehicles are swerving into oncoming traffic to avoid it.",
    "Streetlights have been completely dark along the entire 12th Main road for 3 consecutive nights.",
    "Huge commercial garbage heap dumped right over the drain culvert causing terrible stench and stagnant leachate.",
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setTranscript(null);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // Simulate AI Whisper voice transcription
    const picked = sampleTranscripts[Math.floor(Math.random() * sampleTranscripts.length)];
    setTranscript(picked);
    onTranscriptReady(picked);
  };

  return (
    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${isRecording ? 'bg-rose-500/20 text-rose-400 animate-pulse' : 'bg-brand-500/10 text-brand-400'}`}>
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-white">Voice Memo (Indic & English Supported)</h5>
            <p className="text-[11px] text-slate-400">Speak naturally in Hindi, Kannada, Tamil, or English</p>
          </div>
        </div>

        {isRecording && (
          <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            00:{recordSeconds < 10 ? `0${recordSeconds}` : recordSeconds}
          </div>
        )}
      </div>

      {/* Waveform Visualizer (Simulated) */}
      {isRecording && (
        <div className="flex items-center justify-center gap-1 h-8 bg-slate-950/60 rounded-lg px-4 border border-rose-500/20">
          {[40, 70, 25, 90, 60, 30, 85, 100, 50, 75, 35, 95, 45, 60, 80, 30, 70, 50].map((height, i) => (
            <div
              key={i}
              className="w-1 bg-rose-500 rounded-full animate-pulse"
              style={{
                height: `${Math.max(15, Math.round(height * Math.random()))}%`,
                animationDelay: `${i * 0.08}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Action Trigger */}
      <div className="flex items-center gap-2">
        {!isRecording ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            icon={Mic}
            onClick={handleStartRecording}
            className="text-xs border-brand-500/30 text-brand-300 hover:bg-brand-500/10"
          >
            Start Voice Recording
          </Button>
        ) : (
          <Button
            type="button"
            variant="danger"
            size="sm"
            icon={Square}
            onClick={handleStopRecording}
            className="text-xs"
          >
            Stop & Transcribe with AI
          </Button>
        )}

        {transcript && (
          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Voice captured & transcribed
          </span>
        )}
      </div>

      {/* Transcript Card */}
      {transcript && (
        <div className="p-3 rounded-lg bg-slate-950/70 border border-brand-500/30 text-xs text-slate-200">
          <div className="flex items-center gap-1.5 text-brand-400 font-mono text-[10px] uppercase font-bold mb-1">
            <Sparkles className="w-3 h-3" />
            AI Audio-to-Text Ingestion
          </div>
          <p className="italic text-slate-300 leading-relaxed">"{transcript}"</p>
        </div>
      )}
    </div>
  );
};
