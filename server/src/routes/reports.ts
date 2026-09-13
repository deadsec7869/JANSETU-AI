import { FastifyPluginAsync } from 'fastify';
import { CreateReportRequestSchema } from '../services/gemini/schemas.js';
import { reportService } from '../services/reports/reportService.js';
import { AppError } from '../middleware/errorHandler.js';

export const reportRoutes: FastifyPluginAsync = async (fastify) => {
  /**
   * POST /api/reports
   * Creates a new civic report, preserves raw citizen voice, runs AI analysis, and stores in repository.
   */
  fastify.post('/', async (request, reply) => {
    const validated = CreateReportRequestSchema.parse(request.body);
    const result = await reportService.createReport(validated);

    return reply.status(201).send({
      success: true,
      data: result.report,
      analysis: result.analysis,
      aiTrace: result.aiTrace,
      warning: result.warning,
    });
  });

  /**
   * GET /api/reports
   * Lists citizen reports with optional filtering.
   */
  fastify.get('/', async (request, reply) => {
    const query = request.query as { category?: string; ward?: string; limit?: string };
    const limit = query.limit ? parseInt(query.limit, 10) : 50;

    const reports = await reportService.listReports({
      category: query.category,
      ward: query.ward,
      limit,
    });

    return reply.status(200).send({
      success: true,
      count: reports.length,
      data: reports,
    });
  });

  /**
   * GET /api/reports/:id
   * Retrieves a single civic report by ID.
   */
  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const report = await reportService.getReportById(id);

    if (!report) {
      throw new AppError(`Report with ID '${id}' was not found.`, 'NOT_FOUND', 404);
    }

    return reply.status(200).send({
      success: true,
      data: report,
    });
  });
};
