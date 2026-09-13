import { randomUUID } from 'crypto';
import { reportRepository } from '../../repositories/inMemoryCivicReportRepository.js';
import { CivicReportEntity } from '../../repositories/civicReportRepository.js';
import { geminiService, AITrace } from '../gemini/service.js';
import { CreateReportRequest, CivicReportAnalysis } from '../gemini/schemas.js';
import { isGeminiConfigured } from '../gemini/client.js';

export interface CreateReportResult {
  report: CivicReportEntity;
  analysis: CivicReportAnalysis | null;
  aiTrace?: AITrace;
  warning?: string;
}

export class ReportService {
  async createReport(input: CreateReportRequest): Promise<CreateReportResult> {
    const reportId = `REP-${randomUUID()}`;
    const now = new Date().toISOString();

    let analysis: CivicReportAnalysis | null = null;
    let aiTrace: AITrace | undefined;
    let warning: string | undefined;

    // Call Gemini analysis if configured
    if (isGeminiConfigured()) {
      try {
        const aiResult = await geminiService.analyzeReport({
          text: input.text,
        });
        analysis = aiResult.analysis;
        aiTrace = aiResult.trace;
      } catch (err: any) {
        warning = `AI analysis unavailable: ${err?.message || 'Provider offline'}. Report recorded in raw format.`;
      }
    } else {
      warning = 'AI analysis skipped: Backend GEMINI_API_KEY is not configured.';
    }

    const determinedCategory = input.category || (analysis?.category as any) || 'OTHER';

    const entity = await reportRepository.create({
      id: reportId,
      originalText: input.text,
      category: determinedCategory,
      locationAddress: input.locationAddress || analysis?.locationMentioned || undefined,
      ward: input.ward,
      mediaUrls: input.mediaUrls || [],
      voiceTranscript: input.voiceTranscript,
      reporterName: input.reporterName || 'Verified Citizen',
      status: 'SUBMITTED',
      analysis: analysis || undefined,
      provenance: {
        source: 'Citizen Mobile/Web Ingestion',
        sourceType: 'CITIZEN',
        createdAt: now,
        verificationStatus: 'unverified',
        confidence: analysis ? (analysis.confidence === 'HIGH' ? 0.9 : analysis.confidence === 'MEDIUM' ? 0.7 : 0.4) : undefined,
      },
    });

    return {
      report: entity,
      analysis,
      aiTrace,
      warning,
    };
  }

  async getReportById(id: string): Promise<CivicReportEntity | null> {
    return reportRepository.getById(id);
  }

  async listReports(filters?: { category?: string; ward?: string; limit?: number }): Promise<CivicReportEntity[]> {
    return reportRepository.list(filters);
  }
}

export const reportService = new ReportService();
