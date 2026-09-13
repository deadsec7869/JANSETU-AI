import { EvidenceSummaryInput } from '../aiSchemas';

export function buildEvidenceSummaryPrompt(input: EvidenceSummaryInput): string {
  return `You are JANSETU AI's Causal Evidence Summarization Engine.
Your task is to synthesize multi-source telemetry data from an active civic cluster into an executive finding.

STRUCTURED EVIDENCE PACKET (DO NOT INVENT EXTRA NUMBERS):
- Cluster Code: "${input.clusterCode}"
- Location: "${input.targetLocation}"
- Verified Citizen Reports: ${input.totalReports}
- Geotagged Visual Images: ${input.imagesCount}
- Multilingual Voice Notes: ${input.audioCount}
- Physical Culvert / Asset Blockage: ${input.culvertBlockagePercent}%
- Service Capacity Deficit: ${input.serviceGapPercent}%
- Vulnerability Index: ${input.vulnerabilityScore} / 100
- Daily Affected Commuters: ${input.affectedCommuters.toLocaleString()}
- Local Residents: ${input.affectedResidents.toLocaleString()}
- Existing Municipal Allocation: "${input.priorCapexAllocation}"

REQUIRED JSON OUTPUT SCHEMA:
{
  "executiveFinding": "1 concise sentence stating the core finding",
  "evidenceSummary": "2-3 sentences synthesizing the convergence of voice, photo, and sensor data",
  "keyRisk": "1 sentence describing commuter/public safety risk if unaddressed",
  "recommendedInterventionRationale": "Rationale for why mechanical intervention and sensor telemetry are prescribed",
  "confidence": <float 0.8 to 1.0>,
  "confidenceLevel": "High" | "Moderate"
}`;
}
