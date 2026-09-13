import { geminiService } from '../gemini/service.js';
import { PriorityExplanation } from '../gemini/schemas.js';

export interface PriorityCalculationInput {
  demand: number; // 0 - 100 (density of corroborated citizen reports)
  severity: number; // 0 - 100 (hazard severity index: water depth, crater width, electric hazard)
  vulnerability: number; // 0 - 100 (demographic sensitivity: school, hospital, transit corridor)
  urgency: number; // 0 - 100 (temporal decay risk of delayed intervention)
  evidenceStrength: number; // 0 - 100 (multi-source confirmation ratio, photo tags)
  serviceGap: number; // 0 - 100 (chronic municipal delivery lag)
  recurrenceMultiplier?: number; // 1.0 - 2.0 (repeat occurrences at coordinate)
}

export interface PriorityCalculationResult {
  status: 'calculated' | 'insufficient_data';
  score: number | null;
  breakdown: PriorityCalculationInput | null;
  formula: string;
  missingFactors?: string[];
  explanation?: PriorityExplanation;
}

export class PriorityService {
  /**
   * Deterministic Priority Calculation Formula (Steps 15 & 16)
   * 
   * Formula weights:
   * - Demand: 25%
   * - Severity: 25%
   * - Vulnerability: 20%
   * - Urgency: 15%
   * - Evidence Strength: 10%
   * - Service Gap: 5%
   * + Recurrence factor addition
   * 
   * Guaranteed to be mathematically idempotent: Same inputs ALWAYS yield the exact same score.
   */
  calculatePriority(input: Partial<PriorityCalculationInput>): PriorityCalculationResult {
    const missing: string[] = [];
    if (input.demand === undefined) missing.push('demand');
    if (input.severity === undefined) missing.push('severity');
    if (input.vulnerability === undefined) missing.push('vulnerability');
    if (input.urgency === undefined) missing.push('urgency');
    if (input.evidenceStrength === undefined) missing.push('evidenceStrength');
    if (input.serviceGap === undefined) missing.push('serviceGap');

    if (missing.length > 0) {
      return {
        status: 'insufficient_data',
        score: null,
        breakdown: null,
        formula: 'Priority = (Demand*0.25) + (Severity*0.25) + (Vulnerability*0.20) + (Urgency*0.15) + (Evidence*0.10) + (ServiceGap*0.05)',
        missingFactors: missing,
      };
    }

    const fullInput = input as PriorityCalculationInput;
    const recurrence = fullInput.recurrenceMultiplier ? Math.min(2.0, Math.max(1.0, fullInput.recurrenceMultiplier)) : 1.0;

    const weightedScore =
      fullInput.demand * 0.25 +
      fullInput.severity * 0.25 +
      fullInput.vulnerability * 0.20 +
      fullInput.urgency * 0.15 +
      fullInput.evidenceStrength * 0.10 +
      fullInput.serviceGap * 0.05;

    // Apply recurrence multiplier safely, clamp between 0 and 100
    const rawScore = weightedScore * (recurrence > 1.0 ? 1.0 + (recurrence - 1.0) * 0.2 : 1.0);
    const finalScore = Math.min(100, Math.max(0, Math.round(rawScore)));

    return {
      status: 'calculated',
      score: finalScore,
      breakdown: fullInput,
      formula: 'Priority = min(100, round(((Demand*0.25)+(Severity*0.25)+(Vulnerability*0.20)+(Urgency*0.15)+(Evidence*0.10)+(ServiceGap*0.05)) * RecurrenceBonus))',
    };
  }

  /**
   * Calculates score deterministically and then calls AI to synthesize human-readable explainability.
   */
  async calculateAndExplain(
    input: PriorityCalculationInput,
    context?: { category: string; clusterName?: string; location?: string; reportCount?: number }
  ): Promise<PriorityCalculationResult> {
    const calc = this.calculatePriority(input);
    if (calc.status === 'insufficient_data' || calc.score === null || !calc.breakdown) {
      return calc;
    }

    try {
      const aiResult = await geminiService.explainPriority({
        score: calc.score,
        breakdown: calc.breakdown,
        context,
      });
      return {
        ...calc,
        explanation: aiResult.explanation,
      };
    } catch {
      // Deterministic fallback explanation if Gemini is offline
      return {
        ...calc,
        explanation: {
          deterministicScore: calc.score,
          summary: `Calculated priority score of ${calc.score}/100 driven primarily by severity (${calc.breakdown.severity}/100) and demand density (${calc.breakdown.demand}/100).`,
          keyDrivers: [
            `Structural hazard severity weighted at ${calc.breakdown.severity}`,
            `Citizen demand density weighted at ${calc.breakdown.demand}`,
            `Vulnerability index at ${calc.breakdown.vulnerability}`,
          ],
          citizenExplanation: `This civic problem has been scored at ${calc.score}/100 based on the danger level and the number of verified neighborhood reports.`,
          officialExplanation: `Mathematical priority is ${calc.score}/100 computed by rule engine. Urgency rating is ${calc.breakdown.urgency}/100; service gap rating is ${calc.breakdown.serviceGap}/100.`,
          recommendedNextStep: calc.score >= 80 ? 'Immediate field inspection and emergency dispatch' : 'Schedule routine maintenance team',
          confidence: 'HIGH',
          schemaVersion: '1.0',
        },
      };
    }
  }
}

export const priorityService = new PriorityService();
