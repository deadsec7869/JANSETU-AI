import { PriorityExplanationInput } from '../aiSchemas';

export function buildPriorityExplanationPrompt(input: PriorityExplanationInput): string {
  return `You are JANSETU AI's Explainable Priority Intelligence Engine.
The JANSETU Deterministic Rule Engine has calculated a Priority Score of ${input.score} / 100 for Cluster "${input.clusterCode}".
Your task is to EXPLAIN WHY the score is elevated based on the multi-factor telemetry. You do NOT compute the score; you provide plain-language explainability for both citizens and government officials.

DETERMINISTIC METRIC FACTORS:
- Score: ${input.score} / 100 (Calculated by Rule Engine v2.4)
- Demand Factor: ${input.factors.demand} / 100 (Based on report volume and repeat complaints)
- Severity Factor: ${input.factors.severity} / 100 (Based on physical asset blockage)
- Vulnerability Factor: ${input.factors.vulnerability} / 100 (Based on population exposure: ${input.affectedPopulation.toLocaleString()} commuters)
- Urgency Factor: ${input.factors.urgency} / 100 (Rate of escalation)
- Evidence Factor: ${input.factors.evidence} / 100 (Multi-source verification)
- Service Capacity Deficit: ${input.factors.serviceGap}%

REQUIRED JSON OUTPUT SCHEMA:
{
  "aiExplanation": "Clear 2-sentence explanation of why this issue ranked as Priority #1 in the municipal basin",
  "citizenExplanation": "Simple, accessible explanation for local residents avoiding technical jargon",
  "governmentExplanation": "Executive justification focusing on civic ROI, risk mitigation, and traffic corridor protection",
  "factorBreakdown": {
    "demandAnalysis": "Explanation of citizen demand factor",
    "severityAnalysis": "Explanation of structural severity factor",
    "vulnerabilityAnalysis": "Explanation of population exposure factor",
    "serviceGapAnalysis": "Explanation of capacity gap factor"
  },
  "ruleEngineCitations": [
    "Weighted Risk Index Eq. 4.2 (Demand 30%, Severity 25%, Vulnerability 25%, Evidence 20%)",
    "Multi-source convergence threshold exceeded (>90% confidence)"
  ]
}`;
}
