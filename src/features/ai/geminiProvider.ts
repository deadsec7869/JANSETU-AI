import { 
  type CivicReportAnalysis, 
  type ReportAnalysisInput, 
  type ClusterMatchInput, 
  type ClusterMatchResult, 
  type EvidenceSummaryInput, 
  type EvidenceSummary, 
  type PriorityExplanationInput, 
  type PriorityExplanation, 
  type PolicyBriefInput, 
  type PolicyBriefResult 
} from './aiSchemas';
import { type CivicAIProvider, DemoProvider } from './demoProvider';
import { buildReportAnalysisPrompt } from './prompts/reportAnalysisPrompt';
import { buildClusterMatchPrompt } from './prompts/clusterMatchPrompt';
import { buildEvidenceSummaryPrompt } from './prompts/evidenceSummaryPrompt';
import { buildPriorityExplanationPrompt } from './prompts/priorityExplanationPrompt';
import { buildPolicyBriefPrompt } from './prompts/policyBriefPrompt';
import { withTimeout, safeExtractJSON, AIProviderError } from './aiErrors';
import { normalizeReportAnalysis, normalizeEvidenceSummary } from './aiNormalizer';

export class GeminiProvider implements CivicAIProvider {
  public readonly providerName = 'gemini' as const;
  private apiKey: string;
  private modelName: string;
  private fallbackProvider: DemoProvider;

  constructor(apiKey?: string, modelName = 'gemini-1.5-flash') {
    const envObj = (import.meta as any)?.env || {};
    this.apiKey = apiKey || (envObj.VITE_GEMINI_API_KEY as string) || '';
    this.modelName = (envObj.VITE_GEMINI_MODEL as string) || modelName;
    this.fallbackProvider = new DemoProvider();
  }

  public hasValidKey(): boolean {
    return !!this.apiKey && this.apiKey.trim().length > 10;
  }

  /**
   * Internal generic invocation to Google Gemini API
   */
  private async generateJSON<T>(prompt: string, fallbackFactory: () => Promise<T>, imageBase64?: string): Promise<T> {
    if (!this.hasValidKey()) {
      return fallbackFactory();
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.modelName}:generateContent?key=${this.apiKey}`;

    const parts: any[] = [{ text: prompt }];

    if (imageBase64) {
      // Support multimodal image attachment
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
      parts.push({
        inline_data: {
          mime_type: 'image/jpeg',
          data: cleanBase64,
        },
      });
    }

    const payload = {
      contents: [{ parts }],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.15,
        maxOutputTokens: 1024,
      },
    };

    const callPromise = (async () => {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorBody = await res.text();
        throw new AIProviderError(`Gemini HTTP Error ${res.status}: ${errorBody}`, 'GEMINI_HTTP_ERROR');
      }

      const jsonResponse = await res.json();
      const rawOutputText = jsonResponse?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawOutputText) {
        throw new AIProviderError('Empty text received from Gemini API', 'GEMINI_EMPTY_RESPONSE');
      }

      const parsed = safeExtractJSON<T | null>(rawOutputText, null);
      if (!parsed) {
        throw new AIProviderError('Failed to parse valid structured JSON from Gemini output', 'GEMINI_JSON_PARSE_ERROR');
      }

      return parsed;
    })();

    return withTimeout(callPromise, 6500, fallbackFactory);
  }

  async analyzeReport(input: ReportAnalysisInput): Promise<CivicReportAnalysis> {
    const prompt = buildReportAnalysisPrompt(input);
    const startTime = Date.now();

    try {
      const raw = await this.generateJSON<any>(
        prompt,
        () => this.fallbackProvider.analyzeReport(input),
        input.imageBase64
      );

      const normalized = normalizeReportAnalysis(raw, input.text || input.audioTranscript || '', 'gemini');
      normalized.latencyMs = Date.now() - startTime;
      return normalized;
    } catch (err) {
      console.warn('[JANSETU Gemini] Fallback activated for analyzeReport:', err);
      return this.fallbackProvider.analyzeReport(input);
    }
  }

  async matchCluster(input: ClusterMatchInput): Promise<ClusterMatchResult> {
    const prompt = buildClusterMatchPrompt(input);

    try {
      const raw = await this.generateJSON<any>(
        prompt,
        () => this.fallbackProvider.matchCluster(input)
      );

      return {
        bestMatchingClusterId: raw?.bestMatchingClusterId || (raw?.matchType === 'duplicate' ? 'CL-BLR-150-01' : null),
        clusterCode: raw?.clusterCode || (raw?.matchType === 'duplicate' ? 'CL-BLR-150-01' : null),
        matchType: raw?.matchType || 'related',
        confidence: typeof raw?.confidence === 'number' ? raw.confidence : 0.94,
        confidencePercentage: typeof raw?.confidencePercentage === 'number' ? raw.confidencePercentage : 94,
        reason: raw?.reason || 'Identical water and drainage failure pattern in Bellandur tech corridor.',
        similarityScore: typeof raw?.similarityScore === 'number' ? raw.similarityScore : 0.94,
        sourceProvider: 'gemini',
      };
    } catch (err) {
      console.warn('[JANSETU Gemini] Fallback activated for matchCluster:', err);
      return this.fallbackProvider.matchCluster(input);
    }
  }

  async summarizeEvidence(input: EvidenceSummaryInput): Promise<EvidenceSummary> {
    const prompt = buildEvidenceSummaryPrompt(input);

    try {
      const raw = await this.generateJSON<any>(
        prompt,
        () => this.fallbackProvider.summarizeEvidence(input)
      );

      return normalizeEvidenceSummary(raw, input, 'gemini');
    } catch (err) {
      console.warn('[JANSETU Gemini] Fallback activated for summarizeEvidence:', err);
      return this.fallbackProvider.summarizeEvidence(input);
    }
  }

  async explainPriority(input: PriorityExplanationInput): Promise<PriorityExplanation> {
    const prompt = buildPriorityExplanationPrompt(input);

    try {
      const raw = await this.generateJSON<any>(
        prompt,
        () => this.fallbackProvider.explainPriority(input)
      );

      return {
        deterministicScore: input.score,
        aiExplanation: raw?.aiExplanation || `Priority ${input.score}/100 reflects heavy citizen demand converging with critical culvert choke and high commuter exposure.`,
        citizenExplanation: raw?.citizenExplanation || 'This issue is ranked #1 because it blocks major transit routes during rainfall and affects thousands of neighbors.',
        governmentExplanation: raw?.governmentExplanation || 'Fast-track capex sanction is recommended to eliminate acute municipal risk along the economic corridor.',
        factorBreakdown: raw?.factorBreakdown || {
          demandAnalysis: 'High citizen volume and recurring complaints.',
          severityAnalysis: 'Severe physical culvert blockage.',
          vulnerabilityAnalysis: 'High commuter density near tech parks.',
          serviceGapAnalysis: 'Substantial stormwater discharge deficit.',
        },
        ruleEngineCitations: raw?.ruleEngineCitations || [
          'JANSETU Deterministic Priority Model v2.4',
          'Rule Engine calculated score without autonomous LLM hallucination',
        ],
        sourceProvider: 'gemini',
      };
    } catch (err) {
      console.warn('[JANSETU Gemini] Fallback activated for explainPriority:', err);
      return this.fallbackProvider.explainPriority(input);
    }
  }

  async generatePolicyBrief(input: PolicyBriefInput): Promise<PolicyBriefResult> {
    const prompt = buildPolicyBriefPrompt(input);

    try {
      const raw = await this.generateJSON<any>(
        prompt,
        () => this.fallbackProvider.generatePolicyBrief(input)
      );

      return {
        executiveFinding: raw?.executiveFinding || `Zonal Brief: Concentrated stormwater infrastructure deficit requires emergency intervention for ${input.clusterCode}.`,
        problemDefinition: raw?.problemDefinition || `Primary SWD Culvert #412 siltation has reached ${input.evidenceData.culvertBlockagePercent}%, causing recurrent roadway submergence.`,
        evidenceBreakdown: raw?.evidenceBreakdown || {
          citizenReports: input.evidenceData.totalReports,
          imagesCount: input.evidenceData.imagesCount,
          voiceNotesCount: input.evidenceData.audioCount,
          culvertChoke: input.evidenceData.culvertBlockagePercent,
          serviceCapacityDeficit: input.evidenceData.serviceGapPercent,
        },
        priorityReasoning: raw?.priorityReasoning || `Ranked #1 in Greater Bengaluru based on commuter exposure and zero prior capex allocation.`,
        recommendedAction: raw?.recommendedAction || input.recommendedAction,
        estimatedBudget: raw?.estimatedBudget || '₹1.45 Cr',
        estimatedDuration: raw?.estimatedDuration || '18 Days',
        expectedOutcome: raw?.expectedOutcome || '76% reduction in stormwater service deficit and protection of 84,000 daily commuters.',
        dataLimitations: raw?.dataLimitations || 'Synthesized from prototype municipal sensor baselines and citizen telemetry.',
        sourceStatus: 'SYNTHETIC DEMO DATA',
        sourceProvider: 'gemini',
      };
    } catch (err) {
      console.warn('[JANSETU Gemini] Fallback activated for generatePolicyBrief:', err);
      return this.fallbackProvider.generatePolicyBrief(input);
    }
  }
}
