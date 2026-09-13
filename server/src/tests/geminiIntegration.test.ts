import { isGeminiConfigured, getGeminiModelName } from '../services/gemini/client.js';
import { geminiService } from '../services/gemini/service.js';

async function runGeminiIntegrationTest() {
  console.log('\n--- JANSETU AI: GEMINI LIVE INTEGRATION TEST ---\n');

  if (!isGeminiConfigured()) {
    console.log('⚠️  Gemini integration test skipped: GEMINI_API_KEY is not configured in server/.env');
    console.log('   (Platform operates in deterministic fallback mode)\n');
    process.exit(0);
  }

  console.log(`📡 Connecting to Gemini API (Model: ${getGeminiModelName()})...`);
  const sampleCitizenText =
    'Near Bellandur outer ring road, the stormwater drain is overflowing with sewage water since yesterday evening. Pedestrians cannot cross the road.';

  try {
    const startTime = Date.now();
    const result = await geminiService.analyzeReport({
      text: sampleCitizenText,
    });
    const duration = Date.now() - startTime;

    console.log(`✅ Gemini Response received in ${duration}ms:`);
    console.log(JSON.stringify(result.analysis, null, 2));

    if (!result.analysis.category || !result.analysis.language) {
      throw new Error('Analysis missing category or language');
    }

    console.log('\n✨ Gemini Live Integration Test PASSED successfully!\n');
    process.exit(0);
  } catch (err: any) {
    console.error('❌ Gemini Live Integration Test FAILED:', err.message);
    process.exit(1);
  }
}

runGeminiIntegrationTest();
