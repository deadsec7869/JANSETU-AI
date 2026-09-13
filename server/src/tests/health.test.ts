import { test, describe } from 'node:test';
import assert from 'node:assert';
import { buildApp } from '../app.js';

describe('GET /api/health', () => {
  test('returns 200 with service status and AI configuration', async () => {
    const app = await buildApp();
    const response = await app.inject({
      method: 'GET',
      url: '/api/health',
    });

    assert.strictEqual(response.statusCode, 200);
    const body = JSON.parse(response.payload);
    assert.strictEqual(body.status, 'ok');
    assert.strictEqual(body.service, 'jansetu-api');
    assert.ok(body.ai);
    assert.strictEqual(typeof body.ai.configured, 'boolean');

    await app.close();
  });
});
