import { FastifyPluginAsync } from 'fastify';
import {
  AnalyzeReportRequestSchema,
  SummarizeEvidenceRequestSchema,
  ExplainPriorityRequestSchema,
} from '../services/gemini/schemas.js';
import { geminiService } from '../services/gemini/service.js';
import { evidenceService } from '../services/evidence/evidenceService.js';
import { priorityService } from '../services/priority/priorityService.js';

export const aiRoutes: FastifyPluginAsync = async (fastify) => {
  /**
   * POST /api/ai/analyze-report
   * Analyzes raw citizen text into structured factual entities.
   */
  fastify.post('/analyze-report', async (request, reply) => {
    const validated = AnalyzeReportRequestSchema.parse(request.body);
    const result = await geminiService.analyzeReport(validated);

    return reply.status(200).send({
      success: true,
      data: result.analysis,
      aiTrace: result.trace,
    });
  });

  /**
   * POST /api/ai/summarize-evidence
   * Synthesizes a factual evidence summary for a civic cluster.
   */
  fastify.post('/summarize-evidence', async (request, reply) => {
    const validated = SummarizeEvidenceRequestSchema.parse(request.body);
    const result = await evidenceService.summarize(validated);

    return reply.status(200).send({
      success: true,
      data: result.summary,
      aiTrace: result.trace,
    });
  });

  /**
   * POST /api/ai/explain-priority
   * Calculates score deterministically and explains the causal drivers.
   */
  fastify.post('/explain-priority', async (request, reply) => {
    const validated = ExplainPriorityRequestSchema.parse(request.body);
    const result = await priorityService.calculateAndExplain(
      validated.breakdown,
      validated.context
    );

    return reply.status(200).send({
      success: true,
      data: result,
    });
  });
};
