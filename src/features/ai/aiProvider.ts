import { type CivicAIProvider, DemoProvider } from './demoProvider';
import { JansetuApiProvider } from './jansetuApiProvider';
import { type AIProviderStatus } from './aiSchemas';

let forcedMode: 'auto' | 'api' | 'demo' = 'auto';

export function setForcedAIMode(mode: 'auto' | 'api' | 'demo'): void {
  forcedMode = mode;
}

/**
 * Singleton factory returning the active CivicAIProvider.
 * Routes all live AI intelligence through the secure JANSETU backend server (JansetuApiProvider).
 * Falls back to DemoProvider only if explicitly set to demo mode.
 */
export function getAIProvider(): CivicAIProvider {
  const envObj = (import.meta as any)?.env || {};
  const envProvider = (envObj.VITE_AI_PROVIDER as string) || 'auto';
  const effectiveMode = forcedMode !== 'auto' ? forcedMode : envProvider;

  if (effectiveMode === 'demo') {
    return new DemoProvider();
  }

  return new JansetuApiProvider();
}

/**
 * Returns diagnostic metadata about the current AI intelligence engine.
 */
export function getAIProviderStatus(): AIProviderStatus {
  const envObj = (import.meta as any)?.env || {};
  const envProvider = (envObj.VITE_AI_PROVIDER as string) || 'auto';
  const effectiveMode = forcedMode !== 'auto' ? forcedMode : envProvider;
  const isApiActive = effectiveMode !== 'demo';

  return {
    provider: isApiActive ? 'gemini' : 'demo',
    modeLabel: isApiActive ? 'JANSETU API (BACKEND GEMINI GATEWAY)' : 'DEMO AI (DETERMINISTIC)',
    isFallback: !isApiActive,
    modelName: (envObj.VITE_GEMINI_MODEL as string) || 'gemini-2.0-flash',
    hasApiKey: isApiActive,
    lastQueryTime: new Date().toLocaleTimeString(),
  };
}

export { JansetuApiProvider };
