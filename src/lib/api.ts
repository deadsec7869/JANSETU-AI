/**
 * JANSETU API Client
 * 
 * Secure HTTP gateway communicating strictly with the JANSETU Fastify backend.
 * The browser NEVER makes direct calls to the Gemini API or accesses GEMINI_API_KEY.
 */

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:8787';

export interface ApiHealthResponse {
  status: 'ok' | 'degraded' | 'error';
  service: string;
  version: string;
  timestamp: string;
  ai: {
    provider: string;
    configured: boolean;
    model: string | null;
  };
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface ApiCivicReportAnalysis {
  language: string;
  translatedSummary: string;
  category: string;
  subcategory: string | null;
  urgency: string;
  severity: string;
  affectedService: string | null;
  duration: string | null;
  locationMentioned: string | null;
  affectedGroups: string[];
  extractedEntities: string[];
  evidenceClaims: string[];
  missingInformation: string[];
  confidence: 'LOW' | 'MEDIUM' | 'HIGH';
  needsHumanReview: boolean;
  schemaVersion: string;
}

export interface ApiAITrace {
  provider: 'gemini' | 'deterministic_fallback';
  model: string;
  operation: string;
  promptVersion: string;
  timestamp: string;
  durationMs: number;
}

export interface ApiReportEntity {
  id: string;
  originalText: string;
  category: string;
  locationAddress?: string;
  ward?: string;
  mediaUrls: string[];
  voiceTranscript?: string;
  reporterName?: string;
  status: string;
  analysis?: ApiCivicReportAnalysis;
  priorityScore?: number;
  provenance: {
    source: string;
    sourceType: string;
    createdAt: string;
    verificationStatus: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ApiEvidenceSummary {
  summary: string;
  keyFindings: string[];
  uncertainties: string[];
  missingEvidence: string[];
  confidence: 'LOW' | 'MEDIUM' | 'HIGH';
  schemaVersion: string;
}

export interface ApiPriorityExplanation {
  deterministicScore: number;
  summary: string;
  keyDrivers: string[];
  citizenExplanation: string;
  officialExplanation: string;
  recommendedNextStep: string;
  confidence: 'LOW' | 'MEDIUM' | 'HIGH';
  schemaVersion: string;
}

export class JansetuApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl.replace(/\/+$/, '');
  }

  /**
   * Checks the health and AI configuration of the backend server.
   */
  async getHealth(): Promise<ApiHealthResponse> {
    const res = await fetch(`${this.baseUrl}/api/health`);
    if (!res.ok) {
      throw new Error(`Health check failed with HTTP ${res.status}`);
    }
    return res.json();
  }

  /**
   * Submits a raw citizen text to the backend for structured AI entity extraction.
   */
  async analyzeReport(params: { text: string; language?: string }): Promise<{
    analysis: ApiCivicReportAnalysis;
    aiTrace?: ApiAITrace;
  }> {
    const res = await fetch(`${this.baseUrl}/api/ai/analyze-report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json?.error?.message || `Analyze report failed with status ${res.status}`);
    }

    return {
      analysis: json.data,
      aiTrace: json.aiTrace,
    };
  }

  /**
   * Submits a new civic report to be processed, analyzed, and stored on the backend.
   */
  async submitReport(payload: {
    text: string;
    category?: string;
    locationAddress?: string;
    ward?: string;
    mediaUrls?: string[];
    voiceTranscript?: string;
    reporterName?: string;
  }): Promise<{
    report: ApiReportEntity;
    analysis: ApiCivicReportAnalysis | null;
    aiTrace?: ApiAITrace;
    warning?: string;
  }> {
    const res = await fetch(`${this.baseUrl}/api/reports`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json?.error?.message || `Submit report failed with status ${res.status}`);
    }

    return {
      report: json.data,
      analysis: json.analysis,
      aiTrace: json.aiTrace,
      warning: json.warning,
    };
  }

  /**
   * Requests evidence synthesis from the backend for a civic cluster.
   */
  async summarizeEvidence(params: {
    clusterId?: string;
    evidenceItems: Array<{ id: string; type: string; title: string; description: string; verified: boolean }>;
  }): Promise<{
    summary: ApiEvidenceSummary;
    aiTrace?: ApiAITrace;
  }> {
    const res = await fetch(`${this.baseUrl}/api/ai/summarize-evidence`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json?.error?.message || `Summarize evidence failed with status ${res.status}`);
    }

    return {
      summary: json.data,
      aiTrace: json.aiTrace,
    };
  }

  /**
   * Requests human-readable explainability for a deterministically calculated priority score.
   */
  async explainPriority(params: {
    score: number;
    breakdown: {
      demand: number;
      severity: number;
      vulnerability: number;
      urgency: number;
      evidenceStrength: number;
      serviceGap: number;
    };
    context?: {
      category: string;
      clusterName?: string;
      location?: string;
      reportCount?: number;
    };
  }): Promise<{
    data: {
      status: string;
      score: number;
      explanation?: ApiPriorityExplanation;
      formula: string;
    };
  }> {
    const res = await fetch(`${this.baseUrl}/api/ai/explain-priority`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json?.error?.message || `Explain priority failed with status ${res.status}`);
    }

    return json;
  }
}

export const apiClient = new JansetuApiClient();
