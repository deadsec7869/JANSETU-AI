export class AIProviderError extends Error {
  public code: string;
  public retryable: boolean;
  public originalError?: unknown;

  constructor(message: string, code = 'AI_PROVIDER_ERROR', retryable = false, originalError?: unknown) {
    super(message);
    this.name = 'AIProviderError';
    this.code = code;
    this.retryable = retryable;
    this.originalError = originalError;
  }
}

export class AITimeoutError extends AIProviderError {
  constructor(timeoutMs: number) {
    super(`AI Request exceeded timeout of ${timeoutMs}ms. Falling back to Deterministic Intelligence.`, 'AI_TIMEOUT_ERROR', true);
    this.name = 'AITimeoutError';
  }
}

export class AIMalformedOutputError extends AIProviderError {
  constructor(message: string, originalError?: unknown) {
    super(`AI Response was malformed or failed schema validation: ${message}`, 'AI_MALFORMED_OUTPUT', true, originalError);
    this.name = 'AIMalformedOutputError';
  }
}

/**
 * Wraps any promise with an enforced timeout.
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs = 6000,
  fallbackProvider?: () => Promise<T>
): Promise<T> {
  let timer: any;

  const timeoutPromise = new Promise<T>((_, reject) => {
    timer = setTimeout(() => {
      reject(new AITimeoutError(timeoutMs));
    }, timeoutMs);
  });

  try {
    const result = await Promise.race([promise, timeoutPromise]);
    clearTimeout(timer);
    return result;
  } catch (err) {
    clearTimeout(timer);
    if (fallbackProvider) {
      console.warn('[JANSETU AI] Invoking deterministic fallback due to:', (err as Error)?.message || err);
      return await fallbackProvider();
    }
    throw err;
  }
}

/**
 * Safely extracts and parses JSON from raw LLM output even if surrounded by markdown fences.
 */
export function safeExtractJSON<T>(rawText: string, fallbackValue: T): T {
  if (!rawText || typeof rawText !== 'string') return fallbackValue;

  try {
    // 1. Try direct parse
    return JSON.parse(rawText.trim()) as T;
  } catch {
    // 2. Try regex extraction of JSON markdown code block ```json ... ```
    const match = rawText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (match && match[1]) {
      try {
        return JSON.parse(match[1].trim()) as T;
      } catch {
        // continue
      }
    }

    // 3. Try finding first { and last }
    const firstBrace = rawText.indexOf('{');
    const lastBrace = rawText.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      try {
        const sliced = rawText.slice(firstBrace, lastBrace + 1);
        return JSON.parse(sliced) as T;
      } catch {
        // continue
      }
    }

    console.warn('[JANSETU AI] Could not parse structured JSON from text, returning safe fallback');
    return fallbackValue;
  }
}
