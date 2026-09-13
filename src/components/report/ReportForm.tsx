import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CivicCategory } from '../../types/civic';
import { simulateAIIntelligence, StructuredIssueResult } from '../../utils/intelligenceSimulator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { Input, Textarea } from '../ui/Input';
import { Button } from '../ui/Button';
import { VoiceRecorderSimulation } from './VoiceRecorderSimulation';
import { AIProcessingModal } from './AIProcessingModal';
import { StructuredPreviewModal } from './StructuredPreviewModal';
import {
  Droplets,
  Navigation,
  Trash2,
  Zap,
  ShieldAlert,
  Trees,
  Camera,
  MapPin,
  Sparkles,
  Send,
  X
} from 'lucide-react';

const CATEGORIES: { id: CivicCategory; label: string; icon: React.FC<{ className?: string }>; description: string }[] = [
  { id: 'Water & Drainage', label: 'Water & Drainage', icon: Droplets, description: 'Flooding, drain blocks, pipe burst' },
  { id: 'Roads & Transport', label: 'Roads & Transport', icon: Navigation, description: 'Potholes, broken signals, footpaths' },
  { id: 'Electricity & Lighting', label: 'Electricity & Lighting', icon: Zap, description: 'Dark streets, live wires, transformers' },
  { id: 'Waste Management', label: 'Waste Management', icon: Trash2, description: 'Garbage heaps, uncollected waste' },
  { id: 'Public Safety', label: 'Public Safety', icon: ShieldAlert, description: 'Open manholes, hazardous structures' },
  { id: 'Parks & Environment', label: 'Parks & Environment', icon: Trees, description: 'Fallen trees, lake pollution' },
];

export const ReportForm: React.FC = () => {
  const { wards, submitNewReport } = useApp();

  const [category, setCategory] = useState<CivicCategory>('Water & Drainage');
  const [description, setDescription] = useState('');
  const [ward, setWard] = useState('Ward 150 - Bellandur');
  const [locationAddress, setLocationAddress] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [voiceTranscript, setVoiceTranscript] = useState<string>('');
  
  // AI Pipeline State
  const [isProcessing, setIsProcessing] = useState(false);
  const [structuredResult, setStructuredResult] = useState<StructuredIssueResult | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Quick prompt chip helpers
  const handleQuickPrompt = (promptText: string) => {
    setDescription(prev => prev ? `${prev} ${promptText}` : promptText);
  };

  const handleSimulateImageUpload = () => {
    const sampleImages = [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&auto=format&fit=crop&q=80',
    ];
    const chosen = sampleImages[Math.floor(Math.random() * sampleImages.length)];
    if (!uploadedImages.includes(chosen)) {
      setUploadedImages(prev => [...prev, chosen]);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() && !voiceTranscript.trim()) {
      setErrorMsg('Please provide a description or record a voice memo explaining the issue.');
      return;
    }
    setErrorMsg(null);

    // Start AI processing pipeline
    setIsProcessing(true);
  };

  const handleAIProcessingComplete = () => {
    setIsProcessing(false);

    // Generate structured issue from simulator
    const result = simulateAIIntelligence({
      description: description.trim() || voiceTranscript,
      category,
      locationAddress: locationAddress.trim() || 'Outer Ring Road, Bengaluru',
      ward,
      mediaUrls: uploadedImages,
      voiceTranscript: voiceTranscript || undefined,
    });

    // Save to global state
    submitNewReport(result.issue);
    setStructuredResult(result);
    setShowPreviewModal(true);

    // Reset form fields for next use
    setDescription('');
    setLocationAddress('');
    setUploadedImages([]);
    setVoiceTranscript('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-brand-400 font-mono text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Multimodal Ingestion Pipeline</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Report a Civic Issue
        </h1>
        <p className="text-sm text-slate-400">
          Your report will be automatically parsed, clustered with neighborhood evidence, and prioritized for municipal action.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Step 1: Category Picker */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="text-base flex items-center justify-between">
              <span>1. Select Civic Category</span>
              <span className="text-xs font-mono font-normal text-brand-400">Step 1 of 3</span>
            </CardTitle>
            <CardDescription>
              Choose the primary municipal sector responsible for this issue.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isSelected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-brand-500/15 border-brand-500/60 text-white shadow-glow-cyan'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-brand-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-brand-400 shadow-glow-cyan" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white mb-0.5">{cat.label}</div>
                      <div className="text-[10px] text-slate-400 line-clamp-1">{cat.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Step 2: Location & Ward */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="text-base flex items-center justify-between">
              <span>2. Location & Ward Context</span>
              <span className="text-xs font-mono font-normal text-brand-400">Step 2 of 3</span>
            </CardTitle>
            <CardDescription>
              Help JANSETU AI cluster your issue with nearby civic reports.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Municipal Ward
                </label>
                <select
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 transition-all focus:outline-none focus:border-brand-500"
                >
                  {wards.filter(w => w.id !== 'all').map((w) => (
                    <option key={w.id} value={w.name}>
                      {w.name} ({w.zone})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Input
                  label="Street Address or Landmark"
                  placeholder="e.g. Near EcoSpace Gate 2, Outer Ring Road"
                  value={locationAddress}
                  onChange={(e) => setLocationAddress(e.target.value)}
                  icon={<MapPin className="w-4 h-4" />}
                />
              </div>
            </div>

            {/* Quick Landmark Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] text-slate-500 font-medium">Quick Suggestions:</span>
              {['EcoSpace Tech Park Gate', '100ft Road Metro Junction', 'Channasandra Railway Overbridge', '80ft Road 4th Block'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLocationAddress(item)}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step 3: Multimodal Description (Text, Voice, Photo) */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="text-base flex items-center justify-between">
              <span>3. Issue Evidence (Text, Voice, Photos)</span>
              <span className="text-xs font-mono font-normal text-brand-400">Step 3 of 3</span>
            </CardTitle>
            <CardDescription>
              Describe what's happening or speak your report in your local language.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            
            {/* Text description */}
            <div className="space-y-2">
              <Textarea
                label="Detailed Description"
                placeholder="Explain the civic hazard in detail: how long it has been broken, danger level, affected traffic, water depth, or pedestrian safety risks..."
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={errorMsg || undefined}
              />

              {/* Quick Prompt Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] text-slate-500 font-medium">Add tag:</span>
                {[
                  'Drain water overflowing on road',
                  'Deep crater causing vehicle skids',
                  'Streetlights completely dark for 3 days',
                  'Commercial garbage dumped over storm drain',
                  'Immediate safety hazard for school children'
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleQuickPrompt(tag)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-brand-300 hover:border-brand-500/40 transition-colors"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Voice Memo Recorder Simulation */}
            <VoiceRecorderSimulation
              onTranscriptReady={(t) => {
                setVoiceTranscript(t);
                if (!description) {
                  setDescription(t);
                }
              }}
            />

            {/* Photo & Image Dropzone */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Photo Evidence (Optional but boosts AI Priority Confidence)
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={handleSimulateImageUpload}
                  className="w-full sm:w-auto flex-1 flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-700 hover:border-brand-500/60 rounded-xl bg-slate-950/40 hover:bg-slate-900/60 transition-all cursor-pointer group"
                >
                  <div className="p-3 rounded-full bg-slate-800 group-hover:bg-brand-500/20 group-hover:text-brand-400 text-slate-400 transition-colors mb-2">
                    <Camera className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200">
                    Click to attach photo evidence
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5">
                    Supports JPG, PNG with auto GPS tag extraction
                  </span>
                </button>
              </div>

              {/* Uploaded Images Preview Strip */}
              {uploadedImages.length > 0 && (
                <div className="flex items-center gap-3 overflow-x-auto py-2">
                  {uploadedImages.map((img, idx) => (
                    <div key={idx} className="relative w-24 h-24 rounded-xl overflow-hidden border border-brand-500/40 shrink-0 group">
                      <img src={img} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-slate-950/80 text-rose-400 hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </CardContent>
        </Card>

        {/* Form Submission CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-brand-950/40 border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Instant AI Verification Pipeline</h4>
              <p className="text-xs text-slate-400">Structured synthesis, cluster correlation, and priority scoring.</p>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            icon={Send}
            iconPosition="right"
            className="w-full sm:w-auto shadow-glow-cyan"
          >
            Submit & Synthesize Report
          </Button>
        </div>

      </form>

      {/* AI Processing Overlay Simulation */}
      <AIProcessingModal
        isOpen={isProcessing}
        onComplete={handleAIProcessingComplete}
      />

      {/* Structured Preview Modal Result */}
      <StructuredPreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        result={structuredResult}
      />

    </div>
  );
};
