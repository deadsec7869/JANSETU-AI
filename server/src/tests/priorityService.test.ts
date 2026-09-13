import { test, describe } from 'node:test';
import assert from 'node:assert';
import { priorityService } from '../services/priority/priorityService.js';

describe('Deterministic Priority Engine', () => {
  test('calculates correct weighted score deterministically', () => {
    const input = {
      demand: 80,
      severity: 90,
      vulnerability: 85,
      urgency: 75,
      evidenceStrength: 70,
      serviceGap: 60,
    };

    // Expected:
    // (80*0.25) + (90*0.25) + (85*0.20) + (75*0.15) + (70*0.10) + (60*0.05)
    // = 20 + 22.5 + 17 + 11.25 + 7 + 3 = 80.75 -> 81
    const result1 = priorityService.calculatePriority(input);
    const result2 = priorityService.calculatePriority(input);

    assert.strictEqual(result1.status, 'calculated');
    assert.strictEqual(result1.score, 81);
    // Absolute idempotency guarantee:
    assert.strictEqual(result1.score, result2.score);
  });

  test('returns insufficient_data when required factors are missing', () => {
    const incompleteInput = {
      demand: 80,
      severity: 90,
      // missing vulnerability, urgency, evidenceStrength, serviceGap
    };

    const result = priorityService.calculatePriority(incompleteInput);
    assert.strictEqual(result.status, 'insufficient_data');
    assert.strictEqual(result.score, null);
    assert.ok(result.missingFactors && result.missingFactors.length > 0);
    assert.ok(result.missingFactors.includes('vulnerability'));
  });

  test('applies recurrence multiplier safely and clamps between 0 and 100', () => {
    const highInput = {
      demand: 95,
      severity: 98,
      vulnerability: 95,
      urgency: 92,
      evidenceStrength: 90,
      serviceGap: 88,
      recurrenceMultiplier: 1.8,
    };

    const result = priorityService.calculatePriority(highInput);
    assert.strictEqual(result.status, 'calculated');
    assert.ok(result.score !== null && result.score <= 100);
    assert.ok(result.score !== null && result.score >= 90);
  });
});
