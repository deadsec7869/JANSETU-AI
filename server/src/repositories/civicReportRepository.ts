import { CivicReportAnalysis } from '../services/gemini/schemas.js';

export type ReportStatus =
  | 'SUBMITTED'
  | 'PROCESSING'
  | 'UNDER_REVIEW'
  | 'VERIFIED'
  | 'PRIORITIZED'
  | 'ACTIONED'
  | 'RESOLVED';

export type ProvenanceSourceType =
  | 'CITIZEN'
  | 'OPEN_DATA'
  | 'GOVERNMENT_API'
  | 'ADMIN'
  | 'AI_INFERENCE';

export interface ReportProvenance {
  source: string;
  sourceType: ProvenanceSourceType;
  createdAt: string;
  updatedAt?: string;
  verificationStatus: 'unverified' | 'verified' | 'disputed';
  confidence?: number;
}

export interface CivicReportEntity {
  id: string;
  originalText: string;
  category: string;
  locationAddress?: string;
  ward?: string;
  mediaUrls: string[];
  voiceTranscript?: string;
  reporterName?: string;
  status: ReportStatus;
  analysis?: CivicReportAnalysis;
  priorityScore?: number;
  provenance: ReportProvenance;
  createdAt: string;
  updatedAt: string;
}

export interface CivicReportRepository {
  create(report: Omit<CivicReportEntity, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): Promise<CivicReportEntity>;
  getById(id: string): Promise<CivicReportEntity | null>;
  list(filters?: { category?: string; ward?: string; status?: ReportStatus; limit?: number }): Promise<CivicReportEntity[]>;
  update(id: string, updates: Partial<CivicReportEntity>): Promise<CivicReportEntity | null>;
  delete(id: string): Promise<boolean>;
  count(): Promise<number>;
}
