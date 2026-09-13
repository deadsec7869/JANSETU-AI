import { GoogleGenAI } from '@google/genai';
import { env } from '../../config/env.js';
import { logger } from '../../utils/logger.js';

let geminiClientInstance: GoogleGenAI | null = null;

/**
 * Returns the singleton GoogleGenAI client if an API key is configured, or null otherwise.
 */
export function getGeminiClient(): GoogleGenAI | null {
  if (!env.GEMINI_API_KEY || env.GEMINI_API_KEY.trim() === '') {
    return null;
  }

  if (!geminiClientInstance) {
    try {
      geminiClientInstance = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
      logger.info('Gemini client initialized successfully', { model: env.GEMINI_MODEL });
    } catch (err) {
      logger.error('Failed to initialize GoogleGenAI client', { error: err });
      return null;
    }
  }

  return geminiClientInstance;
}

/**
 * Returns boolean status indicating whether Gemini is configured with a valid key.
 */
export function isGeminiConfigured(): boolean {
  return Boolean(env.GEMINI_API_KEY && env.GEMINI_API_KEY.trim().length > 5);
}

/**
 * Returns the configured Gemini model name.
 */
export function getGeminiModelName(): string {
  return env.GEMINI_MODEL || 'gemini-2.0-flash';
}
