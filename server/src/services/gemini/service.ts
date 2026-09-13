import { getGeminiClient, getGeminiModelName, isGeminiConfigured } from './client.js';
import { PROMPTS } from './prompts.js';
import {
  CivicReportAnalysisSchema,
  type CivicReportAnalysis,
  EvidenceSummarySchema,
  type EvidenceSummary,
  PriorityExplanationSchema,
  type PriorityExplanation,
} from './schemas.js';
import { AppError } from '../../middleware/errorHandler.js';
import { logger } from '../../utils/logger.js';

export interface AITrace {
  provider: 'gemini' | 'deterministic_fallback';
  model: string;
  operation: string;
  promptVersion: string;
  timestamp: string;
  durationMs: number;
}

export class GeminiService {
  private readonly defaultTimeoutMs = 15000;
  private readonly maxRetries = 2;

  /**
   * Translates and structures a raw citizen report into factual civic entities.
   */
  async analyzeReport(input: { text: string; language?: string }): Promise<{ analysis: CivicReportAnalysis; trace: AITrace }> {
    const startTime = Date.now();
    const promptVersion = 'reportAnalysis.v1';
    const model = getGeminiModelName();

    const userPrompt = `Citizen Submission:
"${input.text}"

Language hint: ${input.language || 'auto'}

Extract structured evidence and return ONLY the JSON matching the required schema.`;

    const rawResponse = await this.executeWithRetry(
      PROMPTS.reportAnalysisV1,
      userPrompt,
      'analyzeReport'
    );

    const parsedJson = this.parseJsonSafe(rawResponse);
    const validated = CivicReportAnalysisSchema.safeParse(parsedJson);

    if (!validated.success) {
      logger.error('Gemini analyzeReport schema validation failed', {
        error: validated.error.issues,
        rawResponse,
      });
      throw new AppError(
        'AI generated an invalid response schema. Please retry.',
        'AI_INVALID_RESPONSE',
        502,
        validated.error.issues
      );
    }

    const durationMs = Date.now() - startTime;
    return {
      analysis: validated.data,
      trace: {
        provider: 'gemini',
        model,
        operation: 'analyzeReport',
        promptVersion,
        timestamp: new Date().toISOString(),
        durationMs,
      },
    };
  }

  /**
   * Synthesizes an evidence summary strictly based on provided evidence items.
   */
  async summarizeEvidence(input: {
    clusterId?: string;
    evidenceItems: Array<{ id: string; type: string; title: string; description: string; verified: boolean }>;
  }): Promise<{ summary: EvidenceSummary; trace: AITrace }> {
    const startTime = Date.now();
    const promptVersion = 'evidenceSummary.v1';
    const model = getGeminiModelName();

    const userPrompt = `Cluster ID: ${input.clusterId || 'Awaiting Cluster Link'}
Evidence Items:
${JSON.stringify(input.evidenceItems, null, 2)}

Synthesize the evidence summary strictly following the zero-fabrication prompt.`;

    const rawResponse = await this.executeWithRetry(
      PROMPTS.evidenceSummaryV1,
      userPrompt,
      'summarizeEvidence'
    );

    const parsedJson = this.parseJsonSafe(rawResponse);
    const validated = EvidenceSummarySchema.safeParse(parsedJson);

    if (!validated.success) {
      logger.error('Gemini summarizeEvidence schema validation failed', {
        error: validated.error.issues,
        rawResponse,
      });
      throw new AppError(
        'AI generated an invalid evidence summary schema.',
        'AI_INVALID_RESPONSE',
        502,
        validated.error.issues
      );
    }

    const durationMs = Date.now() - startTime;
    return {
      summary: validated.data,
      trace: {
        provider: 'gemini',
        model,
        operation: 'summarizeEvidence',
        promptVersion,
        timestamp: new Date().toISOString(),
        durationMs,
      },
    };
  }

  /**
   * Generates a multi-audience human-readable explanation for a deterministically calculated priority score.
   */
  async explainPriority(input: {
    score: number;
    breakdown: {
      demand: number;
      severity: number;
      vulnerability: number;
      urgency: number;
      evidenceStrength: number;
      serviceGap: number;
    };
    context?: {
      category: string;
      clusterName?: string;
      location?: string;
      reportCount?: number;
    };
  }): Promise<{ explanation: PriorityExplanation; trace: AITrace }> {
    const startTime = Date.now();
    const promptVersion = 'priorityExplanation.v1';
    const model = getGeminiModelName();

    const userPrompt = `Deterministically Calculated Score: ${input.score} / 100
Mathematical Factor Breakdown:
- Demand Density: ${input.breakdown.demand}
- Structural Severity: ${input.breakdown.severity}
- Demographic Vulnerability: ${input.breakdown.vulnerability}
- Temporal Urgency: ${input.breakdown.urgency}
- Evidence Strength: ${input.breakdown.evidenceStrength}
- Service Capacity Gap: ${input.breakdown.serviceGap}

Civic Context:
${JSON.stringify(input.context || {}, null, 2)}

Explain this score clearly for citizens and administrators without changing the score.`;

    const rawResponse = await this.executeWithRetry(
      PROMPTS.priorityExplanationV1,
      userPrompt,
      'explainPriority'
    );

    const parsedJson = this.parseJsonSafe(rawResponse);
    const validated = PriorityExplanationSchema.safeParse(parsedJson);

    if (!validated.success) {
      logger.error('Gemini explainPriority schema validation failed', {
        error: validated.error.issues,
        rawResponse,
      });
      throw new AppError(
        'AI generated an invalid priority explanation schema.',
        'AI_INVALID_RESPONSE',
        502,
        validated.error.issues
      );
    }

    const durationMs = Date.now() - startTime;
    return {
      explanation: validated.data,
      trace: {
        provider: 'gemini',
        model,
        operation: 'explainPriority',
        promptVersion,
        timestamp: new Date().toISOString(),
        durationMs,
      },
    };
  }

  /**
   * Central call wrapper with timeout and conservative retries.
   */
  private async executeWithRetry(
    systemInstruction: string,
    userContent: string,
    operationName: string
  ): Promise<string> {
    if (!isGeminiConfigured()) {
      throw new AppError(
        'Gemini AI API key is not configured on the backend. Set GEMINI_API_KEY in server/.env.',
        'AI_UNAVAILABLE',
        503
      );
    }

    const client = getGeminiClient();
    if (!client) {
      throw new AppError('Gemini client could not be initialized.', 'AI_UNAVAILABLE', 503);
    }

    let attempts = 0;
    let lastError: unknown = null;

    while (attempts <= this.maxRetries) {
      attempts += 1;
      try {
        const result = await this.callGeminiWithTimeout(client, systemInstruction, userContent);
        return result;
      } catch (err: any) {
        lastError = err;
        const isTimeout = err?.name === 'AbortError' || err?.message?.includes('timeout');
        const isTransient =
          isTimeout ||
          err?.status === 429 ||
          err?.status >= 500 ||
          err?.message?.includes('fetch failed') ||
          err?.message?.includes('ECONNRESET');

        logger.warn(`Gemini call attempt ${attempts} failed for ${operationName}`, {
          error: err?.message,
          isTransient,
        });

        if (attempts > this.maxRetries || !isTransient) {
          if (isTimeout) {
            throw new AppError('Gemini request timed out after 15 seconds.', 'AI_TIMEOUT', 504);
          }
          throw new AppError(
            `Gemini AI service error: ${err?.message || 'Unknown provider error'}`,
            'AI_UNAVAILABLE',
            502,
            { originalError: err?.message }
          );
        }

        // Exponential backoff: 500ms, 1000ms
        await new Promise((res) => setTimeout(res, 500 * Math.pow(2, attempts - 1)));
      }
    }

    throw new AppError('Failed to execute AI operation after retries.', 'AI_UNAVAILABLE', 502, {
      lastError,
    });
  }

  private async callGeminiWithTimeout(
    client: any,
    systemInstruction: string,
    userContent: string
  ): Promise<string> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.defaultTimeoutMs);

    try {
      const model = getGeminiModelName();
      const response = await client.models.generateContent({
        model,
        contents: [
          {
            role: 'user',
            parts: [{ text: userContent }],
          },
        ],
        config: {
          systemInstruction: {
            parts: [{ text: systemInstruction }],
          },
          responseMimeType: 'application/json',
          temperature: 0.1, // Low temperature for factual precision
        },
      });

      clearTimeout(timeoutId);

      const text = response?.text || response?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text || typeof text !== 'string') {
        throw new AppError('Empty response received from Gemini model.', 'AI_INVALID_RESPONSE', 502);
      }

      return text;
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (controller.signal.aborted || err?.name === 'AbortError') {
        throw new AppError('Gemini request timed out.', 'AI_TIMEOUT', 504);
      }
      throw err;
    }
  }

  private parseJsonSafe(text: string): unknown {
    try {
      // Strip markdown code fences if model enclosed JSON in ```json ... ```
      let cleaned = text.trim();
      if (cleaned.startsWith('```json')) {
        cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      return JSON.parse(cleaned);
    } catch (err) {
      logger.error('Failed to parse JSON string from AI', { text, error: err });
      throw new AppError('AI returned a response that could not be parsed as valid JSON.', 'AI_INVALID_RESPONSE', 502);
    }
  }
}

export const geminiService = new GeminiService();
