# JANSETU AI — Artificial Intelligence Architecture

## Provider Abstraction

JANSETU AI enforces a clean provider boundary (`src/features/ai/aiProvider.ts`) preventing scattered LLM imports across the presentation tier.

```typescript
export interface CivicAIProvider {
  analyzeReport(input: ReportAnalysisInput): Promise<CivicReportAnalysis>;
  matchCluster(report: ReportAnalysisInput, clusters: IssueCluster[]): Promise<ClusterMatchResult>;
  summarizeEvidence(input: EvidenceSummaryInput): Promise<EvidenceSummary>;
  explainPriority(input: PriorityExplanationInput): Promise<PriorityExplanation>;
  generatePolicyBrief(input: PolicyBriefInput): Promise<PolicyBriefResult>;
  analyzeImage?(imageData: string, mimeType: string): Promise<CivicReportAnalysis>;
}
```

---

## Active Providers

### 1. `GeminiProvider` (`geminiProvider.ts`)
- Configured via `VITE_GEMINI_API_KEY` or dynamic runtime header entry.
- Uses Gemini 1.5 Flash / 2.0 Flash endpoint with `responseMimeType: "application/json"`.
- Uses multimodal vision analysis for submitted pothole and flood photographs.
- Built-in `withTimeout(..., 6500)` circuit breaking that gracefully falls back to `DemoProvider` upon network latency or quota limits.

### 2. `DemoProvider` (`demoProvider.ts`)
- Zero-billing, 100% offline, deterministic intelligence engine.
- Guarantees complete hackathon presentation resilience under network outages or unconfigured API keys.
- Delivers exact canonical metrics for `CL-BLR-150-01`.

---

## Prompt Governance & Versioning (`src/features/ai/prompts/`)

All prompts are version-controlled with explicit negative constraints:
- **No-Fabrication Guardrail**: Model is strictly prohibited from inventing population numbers, budget numbers, or official approvals not supplied in structured JSON.
- **Multilingual Support**: Explicit instructions to retain original Kannada text (`ಮಳೆ ಬಂದಾಗ...`) while generating canonical English summaries.
- **Uncertainty Fallback**: If confidence drops below 0.65, model outputs category `"needs_review"`.

---

## 7-Stage Progressive Triage Pipeline

When a citizen submits a report, JANSETU visualizes the actual processing stages rather than a generic spinner:

1. `01 Understanding report & detecting language`
2. `02 Extracting civic entities & location signals`
3. `03 Matching related reports & clustering`
4. `04 Building evidence context & convergence`
5. `05 Generating citizen explainability brief`
6. `06 Applying deterministic priority rules (94/100)`
7. `07 Preparing intervention recommendations`
