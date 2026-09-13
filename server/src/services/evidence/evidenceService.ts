import { geminiService, AITrace } from '../gemini/service.js';
import { EvidenceSummary, SummarizeEvidenceRequest } from '../gemini/schemas.js';
import { isGeminiConfigured } from '../gemini/client.js';
import { AppError } from '../../middleware/errorHandler.js';

export class EvidenceService {
  async summarize(input: SummarizeEvidenceRequest): Promise<{ summary: EvidenceSummary; trace?: AITrace }> {
    if (!input.evidenceItems || input.evidenceItems.length === 0) {
      throw new AppError('Cannot summarize empty evidence set.', 'INSUFFICIENT_DATA', 400);
    }

    if (!isGeminiConfigured()) {
      // Deterministic evidence summary fallback
      const totalCount = input.evidenceItems.length;
      const verifiedCount = input.evidenceItems.filter((e) => e.verified).length;

      return {
        summary: {
          summary: `Synthesized evidence pool consisting of ${totalCount} recorded item(s) with ${verifiedCount} verified ground signal(s).`,
          keyFindings: input.evidenceItems.map((e) => `${e.type.toUpperCase()}: ${e.title} - ${e.description}`),
          uncertainties: input.evidenceItems.filter((e) => !e.verified).map((e) => `Unverified item: ${e.title}`),
          missingEvidence: totalCount < 3 ? ['Additional multimodal corroboration needed'] : [],
          confidence: verifiedCount >= 2 ? 'HIGH' : 'MEDIUM',
          schemaVersion: '1.0',
        },
      };
    }

    return geminiService.summarizeEvidence(input);
  }
}

export const evidenceService = new EvidenceService();
