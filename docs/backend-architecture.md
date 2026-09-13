# JANSETU AI — Backend Architecture

> **Architecture Principle**: *"The frontend never communicates directly with external AI APIs. The backend is the sole gateway enforcing validation, deterministic calculations, timeouts, retries, and data provenance."*

---

## 🏗️ System Overview

```
┌────────────────────────────────────────────────────────┐
│               Frontend (React / Vite)                  │
│       - CivicAIProvider / JansetuApiProvider           │
│       - No API secrets in browser bundles              │
└───────────────────────────┬────────────────────────────┘
                            │ HTTP (VITE_API_BASE_URL)
                            ▼
┌────────────────────────────────────────────────────────┐
│            JANSETU Backend API (Fastify)               │
│  ┌─────────────────┐ ┌──────────────┐ ┌─────────────┐  │
│  │ /api/health     │ │ /api/reports │ │ /api/ai     │  │
│  └─────────────────┘ └──────┬───────┘ └──────┬──────┘  │
│                             │                │         │
│  ┌──────────────────────────▼────────────────▼──────┐  │
│  │               Zod Schema Validation              │  │
│  └──────────────────────────┬───────────────────────┘  │
│                             │                          │
│  ┌──────────────────────────▼───────────────────────┐  │
│  │       Deterministic Priority & Report Logic      │  │
│  │       (priorityService.ts / reportService.ts)    │  │
│  └──────────────────────────┬───────────────────────┘  │
│                             │                          │
│  ┌──────────────────────────▼───────────────────────┐  │
│  │                  GeminiService                   │  │
│  │  - @google/genai (GEMINI_MODEL: gemini-2.0-flash)│  │
│  │  - 15s Timeout & Exponential Backoff Retries     │  │
│  │  - Zero-Fabrication Versioned Prompts            │  │
│  └──────────────────────────┬───────────────────────┘  │
└─────────────────────────────┼──────────────────────────┘
                              │ HTTPS (process.env.GEMINI_API_KEY)
                              ▼
                 ┌──────────────────────────┐
                 │  Google Gemini API       │
                 └──────────────────────────┘
```

---

## 🔒 Security & Gateway Model

1. **Secret Isolation**:
   - `GEMINI_API_KEY` is loaded exclusively inside `server/src/config/env.ts`.
   - Never prefixed with `VITE_` and never compiled into frontend bundles.
2. **CORS Governance**:
   - Controlled via `CLIENT_ORIGIN` (defaulting to `http://localhost:5173`). Wildcard origins (`*`) are disallowed.
3. **Structured Safe Logging**:
   - Headers, API tokens, and credentials are automatically stripped before writing JSON logs.
4. **Resilient Error Normalization**:
   - Standardized error codes returned: `VALIDATION_ERROR`, `AI_UNAVAILABLE`, `AI_TIMEOUT`, `AI_INVALID_RESPONSE`, `INSUFFICIENT_DATA`, `NOT_FOUND`, `INTERNAL_ERROR`.

---

## 🗄️ Repository & Data Persistence Layer

- **Current Implementation**: `InMemoryCivicReportRepository`
  - Thread-safe in-memory map storing `CivicReportEntity` records with full `DataProvenance` tags.
  - Development and evaluation storage.
- **Future Database Migration Plan**:
  - Implements the abstract `CivicReportRepository` interface.
  - Can be swapped for PostgreSQL (via Prisma or Kysely) or MongoDB without changing service or route logic.

---

## ⚙️ Deterministic Priority Calculation

The backend enforces that **AI interprets, rules calculate, and humans decide**:

$$P = \min\left(100, \text{round}\left(\left(D \times 0.25 + S \times 0.25 + V \times 0.20 + U \times 0.15 + E \times 0.10 + G \times 0.05\right) \times R\right)\right)$$

Where:
- $D$: Demand density
- $S$: Structural severity
- $V$: Demographic vulnerability
- $U$: Temporal urgency
- $E$: Multi-source evidence strength
- $G$: Service capacity deficit
- $R$: Recurrence multiplier ($1.0 - 2.0$)

If any critical factor is missing, the backend returns `{ status: "insufficient_data" }` instead of fabricating inputs.
