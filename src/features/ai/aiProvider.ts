import { type CivicAIProvider, DemoProvider } from './demoProvider';
import { GeminiProvider } from './geminiProvider';
import { type AIProviderStatus } from './aiSchemas';

let runtimeCustomApiKey: string | null = null;
let forcedMode: 'auto' | 'gemini' | 'demo' = 'auto';

export function setCustomGeminiApiKey(apiKey: string | null): void {
  runtimeCustomApiKey = apiKey;
}

export function setForcedAIMode(mode: 'auto' | 'gemini' | 'demo'): void {
  forcedMode = mode;
}

/**
 * Singleton factory returning the active CivicAIProvider.
 * Selects GeminiProvider if API key is present and not forced to demo; otherwise DemoProvider.
 */
export function getAIProvider(): CivicAIProvider {
  const envObj = (import.meta as any)?.env || {};
  const envKey = (envObj.VITE_GEMINI_API_KEY as string) || '';
  const effectiveKey = runtimeCustomApiKey || envKey;
  const envProvider = (envObj.VITE_AI_PROVIDER as string) || 'auto';
  const effectiveMode = forcedMode !== 'auto' ? forcedMode : envProvider;

  if (effectiveMode === 'demo') {
    return new DemoProvider();
  }

  if (effectiveKey && effectiveKey.trim().length > 10) {
    return new GeminiProvider(effectiveKey);
  }

  return new DemoProvider();
}

/**
 * Returns diagnostic metadata about the current AI intelligence engine.
 */
export function getAIProviderStatus(): AIProviderStatus {
  const envObj = (import.meta as any)?.env || {};
  const envKey = (envObj.VITE_GEMINI_API_KEY as string) || '';
  const effectiveKey = runtimeCustomApiKey || envKey;
  const hasApiKey = !!effectiveKey && effectiveKey.trim().length > 10;
  const envProvider = (envObj.VITE_AI_PROVIDER as string) || 'auto';
  const effectiveMode = forcedMode !== 'auto' ? forcedMode : envProvider;

  const isGeminiActive = hasApiKey && effectiveMode !== 'demo';

  return {
    provider: isGeminiActive ? 'gemini' : 'demo',
    modeLabel: isGeminiActive ? 'REAL AI (GEMINI)' : 'DEMO AI (DETERMINISTIC)',
    isFallback: !isGeminiActive,
    modelName: (envObj.VITE_GEMINI_MODEL as string) || 'gemini-1.5-flash',
    hasApiKey,
    lastQueryTime: new Date().toLocaleTimeString(),
  };
}
