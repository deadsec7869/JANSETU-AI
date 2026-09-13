import { test, describe } from 'node:test';
import assert from 'node:assert';
import {
  CivicReportAnalysisSchema,
  EvidenceSummarySchema,
  PriorityExplanationSchema,
} from '../services/gemini/schemas.js';

describe('Gemini Output Schema Validation', () => {
  test('validates valid CivicReportAnalysis schema', () => {
    const validData = {
      language: 'Kannada',
      translatedSummary: 'Water overflowing near bus stand due to blocked stormwater drain.',
      category: 'DRAINAGE',
      subcategory: 'SWD Clog',
      urgency: 'HIGH',
      severity: 'HIGH',
      affectedService: 'Stormwater Drainage',
      duration: '3 days',
      locationMentioned: 'Bellandur Bus Stop',
      affectedGroups: ['bus commuters', 'pedestrians'],
      extractedEntities: ['SWD Drain', 'Bus Stop'],
      evidenceClaims: ['water is 2 feet deep', 'stagnant since Tuesday'],
      missingInformation: ['exact culvert number'],
      confidence: 'HIGH',
      needsHumanReview: false,
      schemaVersion: '1.0',
    };

    const parsed = CivicReportAnalysisSchema.safeParse(validData);
    assert.strictEqual(parsed.success, true);
    if (parsed.success) {
      assert.strictEqual(parsed.data.category, 'DRAINAGE');
      assert.strictEqual(parsed.data.language, 'Kannada');
    }
  });

  test('rejects invalid CivicReportAnalysis schema missing required fields', () => {
    const invalidData = {
      // missing language, translatedSummary, category
      urgency: 'HIGH',
    };

    const parsed = CivicReportAnalysisSchema.safeParse(invalidData);
    assert.strictEqual(parsed.success, false);
  });

  test('validates valid EvidenceSummary schema', () => {
    const validEvidence = {
      summary: 'Corroborated 12 reports of chronic road crater near metro pillar 45.',
      keyFindings: ['Pothole width exceeds 1 meter', 'Three minor skids reported'],
      uncertainties: ['Rainfall telemetry unavailable'],
      missingEvidence: ['Structural core asphalt sample'],
      confidence: 'HIGH',
      schemaVersion: '1.0',
    };

    const parsed = EvidenceSummarySchema.safeParse(validEvidence);
    assert.strictEqual(parsed.success, true);
  });

  test('validates valid PriorityExplanation schema', () => {
    const validExplanation = {
      deterministicScore: 94,
      summary: 'Critical priority driven by arterial highway exposure and structural culvert failure.',
      keyDrivers: ['84,000 affected commuters', '78% culvert siltation'],
      citizenExplanation: 'Scored high because this road hazard affects daily office transit.',
      officialExplanation: 'Arterial risk profile exceeds threshold for rapid emergency desilting.',
      recommendedNextStep: 'Issue emergency tender for desilting crew.',
      confidence: 'HIGH',
      schemaVersion: '1.0',
    };

    const parsed = PriorityExplanationSchema.safeParse(validExplanation);
    assert.strictEqual(parsed.success, true);
  });
});
