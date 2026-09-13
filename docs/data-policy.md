# JANSETU AI — Data Provenance & AI Guardrail Policy

## 1. Synthetic Data Disclosure

All civic metrics, population estimates, financial figures, sensor telemetry, and work order data presented in the hackathon demonstration are **Synthetic Demo Data** (`SYNTHETIC DEMO DATA`).

They are engineered to model realistic urban governance scenarios in Greater Bengaluru (specifically Ward 150 - Bellandur Outer Ring Road), but do **not** represent live BBMP municipal databases or official municipal sanctions.

---

## 2. No-Fabrication AI Guardrail Policy

In accordance with responsible civic AI principles, JANSETU AI enforces strict prompt-level and schema-level no-fabrication constraints:

1. **Supplied Context Bound**: The AI is strictly prohibited from inferring or inventing exact casualty figures, budget amounts, contractor names, or government approval statuses unless explicitly provided in the structured request payload.
2. **Missing Data Fallback**: When necessary context is missing from a citizen report, the model must output `"unknown"` or `"not provided"` rather than guessing.
3. **Low Confidence Flagging**: Any issue classification below 65% certainty is routed to human triage with status `"needs_review"`.

---

## 3. Citizen Privacy & Data Minimization

- **No PII Transmitted**: Only anonymous report text, transcribed audio tokens, category signals, and approximate ward coordinates are sent to AI providers.
- **Zero Credentials**: No passwords, personal identity cards (Aadhaar/PAN), or sensitive phone numbers are requested or passed to external LLMs.
- **Client-Side Edge Processing**: Audio synthesis and transcript simulations execute entirely on the client edge.

---

## 4. Zero-Billing Architecture

The application requires **zero paid cloud infrastructure** for full functionality:
- No paid Google Maps API (WebGL synthetic city grid).
- No paid speech-to-text API (browser edge / simulated transcription).
- No paid cloud vector database.
- 100% offline capability via `DemoProvider`.
