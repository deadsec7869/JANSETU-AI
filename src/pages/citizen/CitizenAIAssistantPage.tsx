import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  Bot, 
  Send, 
  User, 
  Layers, 
  Building2 
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  metadata?: {
    clusterCode?: string;
    department?: string;
    sla?: string;
  };
}

export const CitizenAIAssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: "Namaste! I am JANSETU Civic Co-Pilot. I can explain how our AI clusters citizen issues, identify the exact municipal engineers in charge of your ward, check civic project budgets, and explain SLA turnaround standards.",
      timestamp: 'Just now',
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const samplePrompts = [
    "How does JANSETU cluster my report with neighbors?",
    "Who is responsible for stormwater drain overflow in Bellandur?",
    "What is the official BESCOM streetlight repair SLA?",
    "How does priority scoring prevent political bias?",
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Simulated co-pilot responses
    setTimeout(() => {
      let replyText = "JANSETU AI analyzes multi-vector civic reports across coordinates, text semantics, and photo evidence to hold departments accountable.";
      let meta: ChatMessage['metadata'] = undefined;

      const lower = query.toLowerCase();
      if (lower.includes('cluster') || lower.includes('neighbor')) {
        replyText = "When 5 or more citizen reports share spatial proximity (within 500m) and matching infrastructural ontology (e.g. culvert siltation or feeder cable faults), JANSETU automatically groups them into a single high-impact Hotspot Cluster. This prevents duplicate tickets from getting ignored and forces ward engineers to commission permanent infrastructure solutions rather than superficial patches.";
        meta = { clusterCode: 'CL-BLR-150-01' };
      } else if (lower.includes('bellandur') || lower.includes('drain') || lower.includes('water')) {
        replyText = "Stormwater drainage in Ward 150 (Bellandur) is under the BBMP Stormwater Drainage Division, overseen by Executive Engineer Er. Rajesh Kulkarni. The mandatory emergency dewatering SLA is 24 hours.";
        meta = { department: 'BBMP Stormwater Drainage', sla: '24 Hours SLA' };
      } else if (lower.includes('bescom') || lower.includes('streetlight') || lower.includes('light')) {
        replyText = "Under Karnataka KERC citizen charters, single streetlight replacement has a 24-hour SLA. Subterranean cable faults affecting 5+ poles have a 48-hour SLA. If breached, the ticket automatically escalates to the BESCOM Sub-divisional AEE.";
        meta = { department: 'BESCOM Urban Distribution', sla: '48 Hours Cable SLA' };
      } else if (lower.includes('priority') || lower.includes('bias') || lower.includes('score')) {
        replyText = "JANSETU calculates priority scores using an open-source transparent formula: (Safety Hazard Risk × 45%) + (Affected Population Density × 30%) + (Economic/Transit Transit Weight × 25%) + Repeat Recurrence Multiplier. This ensures high-risk hazards near schools and transit arteries are addressed purely on data, eliminating political favoritism.";
      }

      const aiMsg: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: 'Just now',
        metadata: meta,
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-brand-400 font-mono text-xs font-semibold uppercase tracking-wider">
          <Bot className="w-4 h-4" />
          <span>Civic Knowledge Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Citizen AI Co-Pilot & Grievance Intelligence
        </h1>
        <p className="text-sm text-slate-400">
          Ask questions about ward corporators, municipal SLAs, clustering mechanics, and algorithmic priority scores.
        </p>
      </div>

      {/* Main Chat Card */}
      <Card variant="glass" className="h-[600px] flex flex-col justify-between">
        
        {/* Chat History */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isUser
                      ? 'bg-slate-800 text-slate-200 border border-slate-700'
                      : 'bg-brand-500/20 text-brand-400 border border-brand-500/40 shadow-glow-cyan'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-lg space-y-2 ${isUser ? 'items-end text-right' : 'items-start text-left'}`}>
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-brand-500 text-slate-950 font-medium rounded-tr-none'
                        : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Metadata Chips if present */}
                  {msg.metadata && (
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {msg.metadata.clusterCode && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/60 flex items-center gap-1">
                          <Layers className="w-3 h-3" />
                          {msg.metadata.clusterCode}
                        </span>
                      )}
                      {msg.metadata.department && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-brand-400" />
                          {msg.metadata.department}
                        </span>
                      )}
                    </div>
                  )}

                  <span className="text-[10px] font-mono text-slate-500 px-1">{msg.timestamp}</span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/40 flex items-center justify-center">
                <Bot className="w-4 h-4 animate-pulse" />
              </div>
              <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-ping" />
                <span>JANSETU AI is querying civic graph...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar & Preset Chips */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 space-y-3">
          
          {/* Quick Prompt Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(p)}
                className="text-[11px] px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-brand-300 hover:border-brand-500/40 transition-colors whitespace-nowrap"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask about ward officers, municipal budgets, or issue SLAs..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
            />
            <Button
              variant="primary"
              size="md"
              icon={Send}
              onClick={() => handleSend()}
              disabled={!inputQuery.trim() || isTyping}
            >
              Ask
            </Button>
          </div>

        </div>

      </Card>

    </div>
  );
};
