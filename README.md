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

## 🧠 AI Architecture

JANSETU implements a typed provider abstraction (`CivicAIProvider`) that ensures 100% operational stability:

```
                  ┌──────────────────────────────┐
                  │    Multimodal Citizen Input  │
                  └──────────────┬───────────────┘
                                 │
                                 ▼
                  ┌──────────────────────────────┐
                  │       CivicAIProvider        │
                  │ (Typed Interface Abstraction)│
                  └──────┬────────────────┬──────┘
                         │                │
          [If Key Set]   ▼                ▼  [Offline / Zero-Billing]
             ┌─────────────────┐    ┌───────────────────────────┐
             │ GeminiFlash AI  │    │ Deterministic Provider    │
             │ (Google Gemini) │    │ (Deterministic Fallback)  │
             └─────────────────┘    └───────────────────────────┘
```

- **Supported AI Providers**:
  - `GeminiFlashProvider`: Real-time multimodal analysis using Google Gemini 1.5 / 2.0 Flash.
  - `DeterministicProvider`: 100% offline, zero-billing fallback ensuring the platform never breaks due to quota or network failures.
- **AI Responsibilities**:
  - Multilingual NLP translation (Kannada, Hindi, English).
  - Vision damage feature extraction.
  - Natural language policy brief generation.
  - Explainable priority summaries.

---

## 📐 Deterministic Priority Methodology

Priority scores ($P \in [0, 100]$) are calculated deterministically using a multi-factor formula:

$$P = \min\left(100, \left(S \times 0.35\right) + \left(D \times 0.25\right) + \left(V \times 0.20\right) + \left(G \times 0.20\right) + \left(R \times 2\right)\right)$$

Where:
- $S$: **Safety & Hazard Severity** (Risk to life, structural stability, acute hazard).
- $D$: **Demand Density** (Verified citizen submissions and ground confirmations).
- $V$: **Vulnerability Factor** (Transit hubs, schools, elder care centers, arterial corridors).
- $G$: **Service Gap Deficit** (Chronic municipal response delays or recurring backlog).
- $R$: **Recurrence Multiplier** (Repeated unaddressed incidents at the same coordinate).

Every calculated score provides a complete mathematical breakdown and explainability report.

---

## 📊 Data Provenance & Evidence Model

Every civic record in JANSETU carries explicit provenance metadata:

```typescript
export interface DataProvenance {
  source: string;               // e.g. "Citizen Mobile Intake", "Municipal GIS Portal"
  sourceType: ProvenanceType;   // "citizen_submission" | "ground_verification" | "deterministic_rule"
  createdAt: string;            // ISO 8601 Timestamp
  updatedAt?: string;           // ISO 8601 Timestamp
  verificationStatus: string;   // "unverified" | "verified" | "disputed"
  confidence?: number;          // Confidence coefficient (0.0 to 1.0)
}
```

---

## 💻 Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Core** | React 18, TypeScript 5.5, Vite 6 |
| **Styling & Design** | Modern CSS Variables, Tailwind CSS, Dark/Light Themes |
| **Spatial & 3D** | Three.js, React Three Fiber (R3F), Drei, Custom Shaders |
| **AI Intelligence** | Google Gemini API (`@google/genai`), Deterministic Fallback Engine |
| **Icons & Motion** | Lucide React, Framer Motion, GSAP Camera Glide |
| **Data Persistence** | LocalStorage state with DBSCAN runtime cluster aggregation |

---

## 📁 Repository Structure

```
src/
├── components/
│   ├── home/           # Light, minimal landing components (Hero, Capabilities, Bento Grid, Trust)
│   ├── layout/         # Navbar, Data Status Indicator, AppShell
│   ├── report/         # Multimodal ingestion (Voice memo recorder, photo upload, category triage)
│   └── ui/             # Reusable UI components (Card, Badge, Button, Input)
├── context/
│   └── AppContext.tsx  # Production real-data state & developer test mode toggle
├── data/
│   ├── realCivicData.ts  # Clean initial zero-fabrication state (empty pipelines)
│   ├── testCivicData.ts  # Isolated synthetic benchmark dataset for evaluation
│   └── canonicalScenario.ts # 3-minute demo presentation scenario
├── features/
│   ├── ai/             # AI provider abstraction, Gemini provider, Schema normalizer
│   ├── demo/           # 8-stage interactive presenter flow (/demo)
│   └── action/         # Municipal work order lifecycle & closed-loop verification
├── pages/
│   ├── citizen/        # CitizenDashboard, ReportIssuePage, MyReportsPage, CommunityFeedPage, AIAssistant
│   └── government/     # GovOverviewPage, PriorityMap, IssueClusters, EvidenceGraph, Projects, Impact, PolicyBrief
└── three/              # Data-driven 3D Civic Core, Spatial Priority Map, Causal Evidence Graph
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# 1. Clone repository
git clone https://github.com/deadsec7869/JANSETU-AI.git
cd JANSETU-AI

# 2. Install dependencies
npm install

# 3. (Optional) Configure Gemini API Key
cp .env.example .env
# Set VITE_GEMINI_API_KEY="your_api_key"

# 4. Start development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
# Google Gemini API Key for real-time multimodal intelligence (optional)
VITE_GEMINI_API_KEY="your_gemini_api_key_here"

# AI Model Selection (defaults to gemini-2.0-flash)
VITE_GEMINI_MODEL="gemini-2.0-flash"
```

*Note: JANSETU functions completely without an API key using the built-in deterministic fallback engine.*

---

## 🛡️ Privacy & Limitations

- **No PII Transmission**: Citizen phone numbers, Aadhaar IDs, or payment details are never collected or sent to external LLMs.
- **Advisory Decision Support**: JANSETU is an advisory decision support tool. It does not replace constitutional administrative procedures or statutory grievance redressal channels.
- **Open Data Extensibility**: Built with standard GeoJSON and REST data structures ready to ingest datasets from open government portals (e.g. data.gov.in) upon official integration.

---

## 📜 License

MIT License. Designed and engineered for **Code for Communities 2.0**.
