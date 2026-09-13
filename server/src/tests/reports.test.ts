import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert';
import { buildApp } from '../app.js';
import { reportRepository } from '../repositories/inMemoryCivicReportRepository.js';

describe('Reports API (/api/reports)', () => {
  beforeEach(() => {
    reportRepository.clear();
  });

  test('POST /api/reports creates a report and preserves raw citizen voice', async () => {
    const app = await buildApp();
    const rawText = 'Outer ring road culvert overflow causing 2 feet flooding near bus stop.';

    const response = await app.inject({
      method: 'POST',
      url: '/api/reports',
      payload: {
        text: rawText,
        category: 'WATER',
        locationAddress: 'Outer Ring Road, Bellandur',
        ward: 'Ward 150 - Bellandur',
      },
    });

    assert.strictEqual(response.statusCode, 201);
    const body = JSON.parse(response.payload);
    assert.strictEqual(body.success, true);
    assert.ok(body.data.id.startsWith('REP-'));
    assert.strictEqual(body.data.originalText, rawText);
    assert.strictEqual(body.data.category, 'WATER');
    assert.strictEqual(body.data.status, 'SUBMITTED');
    assert.strictEqual(body.data.provenance.sourceType, 'CITIZEN');

    await app.close();
  });

  test('POST /api/reports returns 400 for invalid short text', async () => {
    const app = await buildApp();

    const response = await app.inject({
      method: 'POST',
      url: '/api/reports',
      payload: {
        text: 'ab', // < 3 chars
      },
    });

    assert.strictEqual(response.statusCode, 400);
    const body = JSON.parse(response.payload);
    assert.strictEqual(body.success, false);
    assert.strictEqual(body.error.code, 'VALIDATION_ERROR');

    await app.close();
  });

  test('GET /api/reports lists created reports', async () => {
    const app = await buildApp();

    await app.inject({
      method: 'POST',
      url: '/api/reports',
      payload: {
        text: 'Streetlights on 100ft road broken for 4 days',
        category: 'LIGHTING',
      },
    });

    const response = await app.inject({
      method: 'GET',
      url: '/api/reports',
    });

    assert.strictEqual(response.statusCode, 200);
    const body = JSON.parse(response.payload);
    assert.strictEqual(body.success, true);
    assert.strictEqual(body.count, 1);
    assert.strictEqual(body.data[0].category, 'LIGHTING');

    await app.close();
  });

  test('GET /api/reports/:id returns 404 for non-existent report', async () => {
    const app = await buildApp();

    const response = await app.inject({
      method: 'GET',
      url: '/api/reports/REP-non-existent-id',
    });

    assert.strictEqual(response.statusCode, 404);
    const body = JSON.parse(response.payload);
    assert.strictEqual(body.error.code, 'NOT_FOUND');

    await app.close();
  });
});
