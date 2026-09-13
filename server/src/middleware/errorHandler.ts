import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';
import { logger } from '../utils/logger.js';

export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'AI_UNAVAILABLE'
  | 'AI_TIMEOUT'
  | 'AI_INVALID_RESPONSE'
  | 'INSUFFICIENT_DATA'
  | 'NOT_FOUND'
  | 'INTERNAL_ERROR';

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly details?: unknown;

  constructor(message: string, code: ErrorCode = 'INTERNAL_ERROR', statusCode: number = 500, details?: unknown) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export function errorHandler(error: FastifyError | Error, request: FastifyRequest, reply: FastifyReply): void {
  // Zod validation errors
  if (error instanceof ZodError) {
    logger.warn('Request validation failed', {
      route: request.url,
      method: request.method,
      error: error.issues,
    });

    reply.status(400).send({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid request payload or schema mismatch.',
        details: error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      },
    });
    return;
  }

  // Custom AppError
  if (error instanceof AppError) {
    logger.warn(`AppError [${error.code}]: ${error.message}`, {
      route: request.url,
      method: request.method,
      status: error.statusCode,
      code: error.code,
    });

    reply.status(error.statusCode).send({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
      },
    });
    return;
  }

  // Fastify schema validation error
  if ('validation' in error && error.validation) {
    reply.status(400).send({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: error.message || 'Validation failed',
        details: error.validation,
      },
    });
    return;
  }

  // Unhandled / Internal errors
  logger.error(`Unhandled server exception: ${error.message}`, {
    route: request.url,
    method: request.method,
    error,
  });

  reply.status(500).send({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An internal server error occurred. Please retry shortly.',
    },
  });
}
