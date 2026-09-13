import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import { env } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import { healthRoutes } from './routes/health.js';
import { reportRoutes } from './routes/reports.js';
import { aiRoutes } from './routes/ai.js';
import { logger } from './utils/logger.js';

export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({
    logger: false, // We use our structured logger middleware
    disableRequestLogging: true,
  });

  // CORS Configuration (Step 20)
  const allowedOrigins = [
    env.CLIENT_ORIGIN,
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
  ];

  await app.register(cors, {
    origin: (origin, cb) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) {
        return cb(null, true);
      }
      return cb(new Error('CORS origin not allowed'), false);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  // Global Error Handler (Step 17)
  app.setErrorHandler(errorHandler);

  // Request & Response duration logging (Step 21)
  app.addHook('onRequest', async (request) => {
    (request as any).startTime = Date.now();
  });

  app.addHook('onResponse', async (request, reply) => {
    const startTime = (request as any).startTime || Date.now();
    const durationMs = Date.now() - startTime;

    logger.info('HTTP Request', {
      route: request.url,
      method: request.method,
      status: reply.statusCode,
      durationMs,
    });
  });

  // Register API Routes
  await app.register(healthRoutes, { prefix: '/api' });
  await app.register(reportRoutes, { prefix: '/api/reports' });
  await app.register(aiRoutes, { prefix: '/api/ai' });

  return app;
}
