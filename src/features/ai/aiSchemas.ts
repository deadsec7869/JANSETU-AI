export type CivicCategory =
  | 'water_drainage'
  | 'roads'
  | 'lighting'
  | 'waste'
  | 'safety'
  | 'health'
  | 'public_space'
  | 'needs_review';

export type LanguageCode = 'en' | 'kn' | 'hi' | 'ta' | 'te' | 'auto';

export interface ReportAnalysisInput {
  text: string;
  audioTranscript?: string;
  photoDescription?: string;
  imageBase64?: string;
  locationHint?: string;
  wardNumber?: number;
}

export interface CivicReportAnalysis {
  category: CivicCategory;
  categoryLabel: string;
  issue: string;
  summary: string;
  originalLanguage: string;
  translatedSummaryEn: string;
  severity: number; // 1-10
  urgency: number; // 1-10
  duration: string;
  locationReference: string;
  affectedService: string;
  entities: string[];
  confidenceScore: number; // 0.0 - 1.0
  confidenceLevel: 'high' | 'medium' | 'needs_review';
  suggestedActionType: string;
  citizenFriendlyExplanation: string;
  sourceProvider: 'gemini' | 'demo';
  latencyMs?: number;
}

export interface ClusterCandidate {
  id: string;
  code: string;
  name: string;
  category: string;
  location: string;
  wardNumber: number;
}

export interface ClusterMatchInput {
  reportAnalysis: CivicReportAnalysis;
  availableClusters: ClusterCandidate[];
}

export interface ClusterMatchResult {
  bestMatchingClusterId: string | null;
  clusterCode: string | null;
  matchType: 'duplicate' | 'related' | 'new_issue';
  confidence: number; // 0.0 - 1.0
  confidencePercentage: number;
  reason: string;
  similarityScore: number;
  sourceProvider: 'gemini' | 'demo';
}

export interface EvidenceSummaryInput {
  clusterCode: string;
  totalReports: number;
  imagesCount: number;
  audioCount: number;
  culvertBlockagePercent: number;
  serviceGapPercent: number;
  vulnerabilityScore: number;
  affectedCommuters: number;
  affectedResidents: number;
  priorCapexAllocation: string;
  targetLocation: string;
}

export interface EvidenceSummary {
  executiveFinding: string;
  evidenceSummary: string;
  keyRisk: string;
  recommendedInterventionRationale: string;
  multiSourceBreakdown: {
    citizenReportsCount: number;
    photosCount: number;
    audioNotesCount: number;
    culvertChokePercent: number;
    serviceCapacityDeficitPercent: number;
  };
  confidence: number;
  confidenceLevel: 'High' | 'Moderate' | 'Uncertain';
  sourceProvider: 'gemini' | 'demo';
}

export interface PriorityExplanationInput {
  score: number; // e.g. 94
  clusterCode: string;
  factors: {
    demand: number;
    severity: number;
    vulnerability: number;
    urgency: number;
    evidence: number;
    serviceGap: number;
  };
  affectedPopulation: number;
}

export interface PriorityExplanation {
  deterministicScore: number;
  aiExplanation: string;
  citizenExplanation: string;
  governmentExplanation: string;
  factorBreakdown: {
    demandAnalysis: string;
    severityAnalysis: string;
    vulnerabilityAnalysis: string;
    serviceGapAnalysis: string;
  };
  ruleEngineCitations: string[];
  sourceProvider: 'gemini' | 'demo';
}

export interface PolicyBriefInput {
  clusterCode: string;
  wardName: string;
  domain: string;
  priorityScore: number;
  evidenceData: EvidenceSummaryInput;
  recommendedAction: string;
}

export interface PolicyBriefResult {
  executiveFinding: string;
  problemDefinition: string;
  evidenceBreakdown: {
    citizenReports: number;
    imagesCount: number;
    voiceNotesCount: number;
    culvertChoke: number;
    serviceCapacityDeficit: number;
  };
  priorityReasoning: string;
  recommendedAction: string;
  estimatedBudget: string;
  estimatedDuration: string;
  expectedOutcome: string;
  dataLimitations: string;
  sourceStatus: string;
  sourceProvider: 'gemini' | 'demo';
}

export interface AIProviderStatus {
  provider: 'gemini' | 'demo';
  modeLabel: string;
  isFallback: boolean;
  modelName: string;
  hasApiKey: boolean;
  lastLatencyMs?: number;
  lastQueryTime?: string;
}
