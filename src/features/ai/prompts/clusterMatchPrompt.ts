import { ClusterMatchInput } from '../aiSchemas';

export function buildClusterMatchPrompt(input: ClusterMatchInput): string {
  const clusterListFormatted = input.availableClusters
    .map(
      (c) =>
        `- ID: "${c.id}", Code: "${c.code}", Name: "${c.name}", Category: "${c.category}", Ward: ${c.wardNumber}, Location: "${c.location}"`
    )
    .join('\n');

  return `You are JANSETU AI's Semantic Civic Cluster Matching Engine.
Your task is to compare a new structured citizen report against existing active civic issue clusters and determine if it belongs to an existing hotspot cluster.

NEW REPORT:
- Category: "${input.reportAnalysis.categoryLabel}"
- Summary: "${input.reportAnalysis.translatedSummaryEn}"
- Location: "${input.reportAnalysis.locationReference}"
- Keywords: ${JSON.stringify(input.reportAnalysis.entities)}

ACTIVE CIVIC CLUSTERS:
${clusterListFormatted}

MATCHING RULES:
1. "duplicate" (Confidence > 0.85): Same specific location, same defect, recurring reports.
2. "related" (Confidence 0.60 - 0.84): Same ward corridor or adjacent infrastructure suffering identical root cause.
3. "new_issue" (Confidence < 0.60): Different location and unlinked infrastructure.

REQUIRED JSON OUTPUT SCHEMA:
{
  "bestMatchingClusterId": "<ID of matched cluster, or null if new_issue>",
  "clusterCode": "<Code e.g. CL-BLR-150-01, or null>",
  "matchType": "duplicate" | "related" | "new_issue",
  "confidence": <float 0.1 to 1.0>,
  "confidencePercentage": <integer 10 to 100>,
  "reason": "Clear explanation of the spatial and systemic reasoning for this match",
  "similarityScore": <float 0.1 to 1.0>
}`;
}
