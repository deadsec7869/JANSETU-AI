import { z } from 'zod';

export const CivicCategoryEnum = z.enum([
  'WATER',
  'ROADS',
  'DRAINAGE',
  'LIGHTING',
  'WASTE',
  'SAFETY',
  'HEALTH',
  'PUBLIC_SPACE',
  'OTHER',
]);
export type CivicCategoryType = z.infer<typeof CivicCategoryEnum>;

export const UrgencyEnum = z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL', 'UNKNOWN']);
export type UrgencyType = z.infer<typeof UrgencyEnum>;

export const SeverityEnum = z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL', 'UNKNOWN']);
export type SeverityType = z.infer<typeof SeverityEnum>;

export const ConfidenceEnum = z.enum(['LOW', 'MEDIUM', 'HIGH']);
export type ConfidenceType = z.infer<typeof ConfidenceEnum>;

/**
 * Zod Schema for Structured Civic Report Analysis (Step 7)
 */
export const CivicReportAnalysisSchema = z.object({
  language: z.string().describe('Detected language code or name, e.g. "Kannada", "Hindi", "English"'),
  translatedSummary: z.string().describe('Faithful English translation and concise summary of the citizen submission'),
  category: CivicCategoryEnum.describe('Primary municipal sector for this issue'),
  subcategory: z.string().nullable().describe('Specific subcategory if explicitly mentioned in text, otherwise null'),
  urgency: UrgencyEnum.describe('Calculated urgency level based strictly on stated hazard timeframe'),
  severity: SeverityEnum.describe('Physical structural or safety severity directly described in text'),
  affectedService: z.string().nullable().describe('Municipal service impeded (e.g. "Stormwater Drainage", "Street Lighting")'),
  duration: z.string().nullable().describe('Duration the problem has persisted if stated (e.g. "3 days", "2 weeks"), else null'),
  locationMentioned: z.string().nullable().describe('Exact landmark, road, or ward name mentioned in the text. NEVER invent coordinates or locations.'),
  affectedGroups: z.array(z.string()).describe('Groups explicitly mentioned (e.g. "pedestrians", "school children", "two-wheelers")'),
  extractedEntities: z.array(z.string()).describe('Specific physical entities extracted (e.g. "culvert #412", "transformer", "pothole")'),
  evidenceClaims: z.array(z.string()).describe('Verifiable factual claims asserted by the citizen in their report'),
  missingInformation: z.array(z.string()).describe('Key details absent from submission needed for complete municipal dispatch (e.g. "Exact street address", "Water depth")'),
  confidence: ConfidenceEnum.describe('AI interpretation confidence level'),
  needsHumanReview: z.boolean().describe('Whether submission is ambiguous or high-risk requiring immediate human review'),
  schemaVersion: z.string().default('1.0'),
});
export type CivicReportAnalysis = z.infer<typeof CivicReportAnalysisSchema>;

/**
 * Zod Schema for Structured Evidence Summary (Step 14)
 */
export const EvidenceSummarySchema = z.object({
  summary: z.string().describe('Synthesized summary strictly bounded to supplied evidence inputs'),
  keyFindings: z.array(z.string()).describe('Key corroborating facts established by supplied evidence items'),
  uncertainties: z.array(z.string()).describe('Data gaps, unverified claims, or sensor discrepancies in the evidence pool'),
  missingEvidence: z.array(z.string()).describe('Evidence types not yet submitted (e.g. "Pre-intervention flow meter", "Geotagged ground photo")'),
  confidence: ConfidenceEnum.describe('Synthesis confidence level'),
  schemaVersion: z.string().default('1.0'),
});
export type EvidenceSummary = z.infer<typeof EvidenceSummarySchema>;

/**
 * Zod Schema for Structured Priority Explanation (Step 15)
 */
export const PriorityExplanationSchema = z.object({
  deterministicScore: z.number().min(0).max(100).describe('The exact numeric score calculated by deterministic code'),
  summary: z.string().describe('High-level explanation of why this priority score was produced'),
  keyDrivers: z.array(z.string()).describe('Top mathematical/evidence factors contributing to the score'),
  citizenExplanation: z.string().describe('Clear, respectful plain-language explanation for citizen awareness'),
  officialExplanation: z.string().describe('Technical administrative rationale for municipal engineers and commissioners'),
  recommendedNextStep: z.string().describe('Deterministic next action recommendation for municipal decision-makers'),
  confidence: ConfidenceEnum.describe('Confidence in the explanation quality'),
  schemaVersion: z.string().default('1.0'),
});
export type PriorityExplanation = z.infer<typeof PriorityExplanationSchema>;

/**
 * Request payload schemas
 */
export const AnalyzeReportRequestSchema = z.object({
  text: z.string().min(3, 'Report text must be at least 3 characters long').max(4000, 'Report text must not exceed 4000 characters'),
  language: z.string().optional().default('auto'),
});
export type AnalyzeReportRequest = z.infer<typeof AnalyzeReportRequestSchema>;

export const CreateReportRequestSchema = z.object({
  text: z.string().min(3, 'Report text must be at least 3 characters long').max(4000),
  category: CivicCategoryEnum.optional(),
  locationAddress: z.string().optional(),
  ward: z.string().optional(),
  mediaUrls: z.array(z.string().url()).optional().default([]),
  voiceTranscript: z.string().optional(),
  reporterName: z.string().optional(),
});
export type CreateReportRequest = z.infer<typeof CreateReportRequestSchema>;

export const SummarizeEvidenceRequestSchema = z.object({
  clusterId: z.string().optional(),
  evidenceItems: z.array(
    z.object({
      id: z.string(),
      type: z.string(),
      title: z.string(),
      description: z.string(),
      verified: z.boolean(),
      timestamp: z.string().optional(),
      metadata: z.record(z.unknown()).optional(),
    })
  ).min(1, 'At least 1 evidence item is required to summarize'),
});
export type SummarizeEvidenceRequest = z.infer<typeof SummarizeEvidenceRequestSchema>;

export const ExplainPriorityRequestSchema = z.object({
  score: z.number().min(0).max(100),
  breakdown: z.object({
    demand: z.number(),
    severity: z.number(),
    vulnerability: z.number(),
    urgency: z.number(),
    evidenceStrength: z.number(),
    serviceGap: z.number(),
  }),
  context: z.object({
    category: z.string(),
    clusterName: z.string().optional(),
    location: z.string().optional(),
    reportCount: z.number().optional(),
  }).optional(),
});
export type ExplainPriorityRequest = z.infer<typeof ExplainPriorityRequestSchema>;
