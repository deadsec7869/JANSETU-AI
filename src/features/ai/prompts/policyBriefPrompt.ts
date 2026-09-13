import { PolicyBriefInput } from '../aiSchemas';

export function buildPolicyBriefPrompt(input: PolicyBriefInput): string {
  return `You are JANSETU AI's Executive Policy Brief Drafting Engine.
Your task is to generate an executive memorandum for the BBMP Special Commissioner and Zonal Standing Committee.

CLUSTER CONTEXT:
- Code: "${input.clusterCode}"
- Ward: "${input.wardName}"
- Sector: "${input.domain}"
- Algorithmic Priority: ${input.priorityScore} / 100
- Recommended Civil Action: "${input.recommendedAction}"
- Reports: ${input.evidenceData.totalReports} verified citizen voices
- Images: ${input.evidenceData.imagesCount} geotagged visual proofs
- Audio: ${input.evidenceData.audioCount} Kannada/English voice recordings
- Culvert Blockage: ${input.evidenceData.culvertBlockagePercent}%
- Service Capacity Gap: ${input.evidenceData.serviceGapPercent}%

REQUIRED JSON OUTPUT SCHEMA:
{
  "executiveFinding": "1 sentence executive finding for Commissioner review",
  "problemDefinition": "Comprehensive 2-sentence description of the civil infrastructure bottleneck",
  "evidenceBreakdown": {
    "citizenReports": ${input.evidenceData.totalReports},
    "imagesCount": ${input.evidenceData.imagesCount},
    "voiceNotesCount": ${input.evidenceData.audioCount},
    "culvertChoke": ${input.evidenceData.culvertBlockagePercent},
    "serviceCapacityDeficit": ${input.evidenceData.serviceGapPercent}
  },
  "priorityReasoning": "Justification for fast-tracking this municipal capital grant",
  "recommendedAction": "${input.recommendedAction}",
  "estimatedBudget": "₹1.45 Cr",
  "estimatedDuration": "18 Days",
  "expectedOutcome": "76% reduction in stormwater service deficit and protection of 84,000 commuters",
  "dataLimitations": "Synthesized from prototype telemetry; final civil tender requires on-site structural core sampling.",
  "sourceStatus": "SYNTHETIC DEMO DATA"
}`;
}
