# JANSETU AI
### From Citizen Voice to Measurable Action.

> An AI-powered civic intelligence layer that transforms multilingual citizen signals into structured evidence, identifies systemic civic clusters, calculates deterministic priorities, connects recommendations to municipal action, and measures outcomes.

---

## 🏛️ Executive Overview

**JANSETU** (*Bridge to the People*) is not a complaint portal, a generic chatbot, or a scheme finder. It is an end-to-end **civic intelligence operating system** designed to solve the fundamental failure mode of modern civic governance:

> *Cities receive thousands of fragmented citizen complaints daily. Traditional grievance systems treat them as isolated tickets, leading to superficial patches, bureaucratic backlogs, and zero public trust.*

JANSETU captures citizen voice across text, audio, and imagery in local languages (e.g., Kannada, Hindi, English), clusters related signals using spatial and semantic ontologies, proves infrastructure deficit with multi-source causal evidence, calculates explainable priority scores deterministically, and verifies real-world resolution through citizen ground consensus.

---

## 🧭 Core Governance Principle

```
┌─────────────────┐      ┌────────────────────────┐      ┌───────────────────────┐
│  AI INTERPRETS  │  ──▶ │    RULES CALCULATE     │  ──▶ │     HUMANS DECIDE     │
│ (NLP & Vision)  │      │(Deterministic Formula) │      │ (Municipal Engineers) │
└─────────────────┘      └────────────────────────┘      └───────────────────────┘
```

1. **AI Interprets**: Multimodal extraction, local language translation, semantic entity normalization, and natural language explainability.
2. **Data Proves**: Multi-source evidence graphs connecting citizen geotagged photos, audio notes, and municipal asset registries.
3. **Rules Calculate**: Mathematical priority formulas calculate urgency and severity — never black-box hallucination.
4. **Humans Decide**: Government officials retain exclusive constitutional authority to authorize budgets, dispatch teams, and approve work orders.

---

## 🔒 Absolute Zero-Fabrication Policy

**JANSETU operates under a strict Zero-Fabrication Protocol:**

- **No Invented Statistics**: JANSETU never presents fabricated citizen counts, live municipal budgets, or telemetry percentages as genuine production records.
- **Intentional Empty States**: When real data is unavailable, JANSETU displays clear, respectful empty states (`NO CIVIC DATA YET`, `PRIORITY AWAITS VERIFIED EVIDENCE`, `IMPACT NOT YET MEASURABLE`, `MAP DATA UNAVAILABLE`).
- **Isolated Developer Test Data**: Synthetic data exists strictly for testing and interface evaluation in an isolated developer mode, which is **OFF by default** and distinctly watermarked with:
  > `TEST DATASET ACTIVE: Synthetic information for interface demonstration only.`
- **No Illusion of Government Connection**: JANSETU does not claim active municipal API integration (BBMP, BWSSB, BESCOM) unless a verified production data bridge is configured.

---

## 🔁 How It Works: The 6-Stage Civic Loop

```
01 LISTEN          Citizens submit issues via voice, text, or photos in their native language.
      ↓
02 UNDERSTAND      Multimodal AI extracts intent, location, hazard category, and context.
      ↓
03 CLUSTER         Spatial DBSCAN & semantic ontologies aggregate individual reports into systemic clusters.
      ↓
04 PRIORITIZE      Deterministic formula weights demand, severity, vulnerability, and service gap.
      ↓
05 ACT             Actionable decision support generates structured work orders for municipal engineers.
      ↓
06 MEASURE         Before-and-after resolution tracking confirmed via citizen ground consensus.
```

---

## 🧠 Backend & AI Gateway Architecture

JANSETU enforces a strict security perimeter where the frontend never accesses external AI keys directly:

```
┌──────────────────────────────────────┐
│       Frontend (React / Vite)        │
│   - JansetuApiProvider / UI          │
│   - Zero secrets in client bundles   │
└──────────────────┬───────────────────┘
                   │ HTTP (VITE_API_BASE_URL: http://localhost:8787)
                   ▼
┌──────────────────────────────────────┐
│     JANSETU Backend API (Fastify)    │
│  - POST /api/reports                 │
│  - POST /api/ai/analyze-report       │
│  - POST /api/ai/summarize-evidence   │
│  - POST /api/ai/explain-priority     │
│  - GET  /api/health                  │
│                                      │
│  - Zod Schema Validation             │
│  - Deterministic Priority Engine     │
│  - Timeout & Exponential Backoff     │
└──────────────────┬───────────────────┘
                   │ HTTPS (process.env.GEMINI_API_KEY)
                   ▼
       ┌───────────────────────┐
       │   Google Gemini API   │
       │  (gemini-2.0-flash)   │
       └───────────────────────┘
```

- **Backend Gateway**: Fastify TypeScript API (`server/`) encapsulating `@google/genai`.
- **Zero-Billing Resilience**: 100% offline deterministic fallback if no API key is provided.
- **Multilingual NLP**: Kannada, Hindi, Tamil, Telugu, and English support preserving authoritative raw citizen voice.

---

## 📐 Deterministic Priority Methodology

Priority scores ($P \in [0, 100]$) are calculated deterministically using a multi-factor formula:

$$P = \min\left(100, \left(S \times 0.25\right) + \left(D \times 0.25\right) + \left(V \times 0.20\right) + \left(U \times 0.15\right) + \left(E \times 0.10\right) + \left(G \times 0.05\right)\right)$$

Where:
- $S$: **Safety & Hazard Severity**
- $D$: **Demand Density**
- $V$: **Demographic Vulnerability**
- $U$: **Temporal Urgency**
- $E$: **Evidence Strength**
- $G$: **Service Capacity Deficit**

Every calculated score provides an explainability breakdown for citizens and municipal engineers.

---

## 💻 Technology Stack

| Layer | Technologies |
|---|---|
| **Backend API** | Node.js, Fastify, TypeScript, Zod, `@google/genai` |
| **Frontend Core** | React 18, TypeScript 5.5, Vite 6, Tailwind CSS |
| **Spatial & 3D** | Three.js, React Three Fiber (R3F), Drei, Custom Shaders |
| **AI Intelligence** | Google Gemini 2.0 Flash (Backend-only) + Deterministic Rule Engine |
| **Icons & Motion** | Lucide React, Framer Motion, GSAP |
| **Testing** | Node.js Test Runner, TypeScript execution |

---

## 📁 Repository Structure

```
├── server/               # Fastify TypeScript Backend API Gateway
│   ├── src/
│   │   ├── config/       # Zod-validated environment config
│   │   ├── middleware/   # Standardized error handler (AI_TIMEOUT, etc.)
│   │   ├── routes/       # /api/health, /api/reports, /api/ai
│   │   ├── services/     # GeminiService, ReportService, PriorityService
│   │   ├── repositories/ # InMemoryCivicReportRepository
│   │   └── tests/        # Backend unit & integration tests
│   ├── .env.example      # Server-only environment template
│   └── package.json
│
├── src/                  # React Frontend Application
│   ├── components/       # Light editorial UI & Aceternity components
│   ├── context/          # AppContext (Real data state & test mode toggle)
│   ├── features/ai/      # JansetuApiProvider & AI UI components
│   ├── lib/api.ts        # Typed API client connecting to Fastify
│   ├── pages/            # Citizen & Government dashboards
│   └── three/            # 3D Civic Core, Priority Map & Evidence Graph
│
└── docs/                 # Documentation (Architecture, API, Governance)
```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server && npm install && cd ..
```

### 2. Configure Backend Environment (Optional)

Create `server/.env`:

```env
PORT=8787
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173

# Optional: Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.0-flash
```

### 3. Start Development Servers

```bash
# Terminal 1: Start Backend API (Port 8787)
npm run server

# Terminal 2: Start Frontend (Port 5173)
npm run dev
```

Visit `http://localhost:5173/` in your browser.

---

## 🧪 Testing

```bash
# Run backend unit tests (13 tests: health, reports, priority, schema validation)
npm run test:server

# Run live Gemini integration test (requires GEMINI_API_KEY in server/.env)
npm run test:gemini

# Build frontend and backend bundles
npm run build
npm run build:server
```

---

## 📜 Documentation

- [Backend Architecture](docs/backend-architecture.md)
- [API Reference](docs/api.md)
- [Priority Engine Methodology](docs/priority-methodology.md)
- [Data Policy & Provenance](docs/data-policy.md)

---

## 📜 License

MIT License. Designed and engineered for **Code for Communities 2.0**.
