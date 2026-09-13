import { FastifyPluginAsync } from 'fastify';
import { isGeminiConfigured, getGeminiModelName } from '../services/gemini/client.js';

export const healthRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/health', async (_request, reply) => {
    const geminiConfigured = isGeminiConfigured();
    const model = getGeminiModelName();

    return reply.status(200).send({
      status: 'ok',
      service: 'jansetu-api',
      version: '0.1.0',
      timestamp: new Date().toISOString(),
      ai: {
        provider: 'gemini',
        configured: geminiConfigured,
        model: geminiConfigured ? model : null,
      },
    });
  });
};
