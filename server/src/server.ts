import { buildApp } from './app.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';
import { isGeminiConfigured, getGeminiModelName } from './services/gemini/client.js';

async function startServer() {
  try {
    const app = await buildApp();
    const port = env.PORT;
    const host = '0.0.0.0';

    await app.listen({ port, host });

    const geminiStatus = isGeminiConfigured()
      ? `CONNECTED (Model: ${getGeminiModelName()})`
      : 'OFFLINE (Running in Deterministic Mode)';

    logger.info(`🚀 JANSETU API Server listening on http://${host}:${port}`, {
      port,
      env: env.NODE_ENV,
      geminiStatus,
      clientOrigin: env.CLIENT_ORIGIN,
    });

    console.log(`
┌────────────────────────────────────────────────────────┐
│  ◈ JANSETU AI — BACKEND SERVER STARTED                │
├────────────────────────────────────────────────────────┤
│  API Port:        http://localhost:${port}               │
│  Client Origin:   ${env.CLIENT_ORIGIN}         │
│  Gemini Status:   ${geminiStatus.padEnd(35)} │
│  Environment:     ${env.NODE_ENV.padEnd(35)} │
└────────────────────────────────────────────────────────┘
    `);
  } catch (err) {
    logger.error('Failed to start JANSETU API server', { error: err });
    process.exit(1);
  }
}

startServer();
