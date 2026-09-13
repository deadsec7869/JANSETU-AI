export interface LogContext {
  route?: string;
  method?: string;
  status?: number;
  durationMs?: number;
  operation?: string;
  error?: unknown;
  [key: string]: unknown;
}

export const logger = {
  info(message: string, context?: LogContext): void {
    const timestamp = new Date().toISOString();
    console.log(JSON.stringify({ level: 'info', timestamp, message, ...sanitizeContext(context) }));
  },

  warn(message: string, context?: LogContext): void {
    const timestamp = new Date().toISOString();
    console.warn(JSON.stringify({ level: 'warn', timestamp, message, ...sanitizeContext(context) }));
  },

  error(message: string, context?: LogContext): void {
    const timestamp = new Date().toISOString();
    const sanitized = sanitizeContext(context);
    if (context?.error instanceof Error) {
      sanitized.errorMessage = context.error.message;
      sanitized.errorName = context.error.name;
    }
    console.error(JSON.stringify({ level: 'error', timestamp, message, ...sanitized }));
  },

  debug(message: string, context?: LogContext): void {
    if (process.env.NODE_ENV === 'development') {
      const timestamp = new Date().toISOString();
      console.debug(JSON.stringify({ level: 'debug', timestamp, message, ...sanitizeContext(context) }));
    }
  },
};

/**
 * Strips any sensitive tokens, authorization headers, or private keys before logging.
 */
function sanitizeContext(context?: LogContext): Record<string, unknown> {
  if (!context) return {};
  const cleaned: Record<string, unknown> = { ...context };

  // Never log secrets
  delete cleaned.GEMINI_API_KEY;
  delete cleaned.apiKey;
  delete cleaned.authorization;

  return cleaned;
}
