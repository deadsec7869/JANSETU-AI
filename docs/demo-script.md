# JANSETU AI — Hackathon Presentation & Demo Script

## 1. 30-Second Elevator Pitch

> *"Imagine 300 citizens reporting severe waterlogging across Bengaluru in Kannada, English, voice notes, and photos. In traditional portals, these are 300 disconnected complaint tickets lost in a backlog.*
>
> *JANSETU AI changes this entirely. Our intelligence operating system ingests multilingual citizen voice, groups them into high-signal infrastructure clusters, maps the spatial urgency, and constructs a 3D evidence graph.*
>
> *Our deterministic rule engine calculates that this Bellandur culvert failure is Priority #1 (94/100). Government officials review AI-assisted work orders, authorize emergency desilting, track the turnaround, and verify the outcome with the original citizen reporters — closing the civic loop with measurable impact."*

---

## 2. Three-Minute Guided Presentation Timeline

| Time | Stage | Route | Key Talking Points & Action |
|---|---|---|---|
| **0:00–0:20** | **01 Citizen Voice** | `/report` | Presenter submits Kannada audio note ("ಮಳೆ ಬಂದಾಗ ಇಲ್ಲಿ ನೀರು ತುಂಬಿಕೊಳ್ಳುತ್ತೆ..."). Show how original citizen voice is preserved. |
| **0:20–0:45** | **02 AI Understanding** | `/report` | Show the 7-stage live triage pipeline. Highlight structured entity extraction (`Water & Drainage`, `Severity 8/10`, `Bellandur ORR`). |
| **0:45–1:05** | **03 Community Cluster** | `/gov/clusters` | Show cluster `CL-BLR-150-01`. 312 reports converge on 1 systemic culvert choke affecting 84,000 commuters. |
| **1:05–1:30** | **04 Spatial Priority Map** | `/gov/priority-map` | Open the WebGL 3D spatial map. Point to the Critical red hotspot on Outer Ring Road. |
| **1:30–1:55** | **05 3D Evidence Graph** | `/gov/evidence` | Show the evidence convergence. Emphasize: **"AI did NOT invent the 94/100 score; our deterministic rule engine calculated it. AI explains it."** |
| **1:55–2:20** | **06 Government Action** | `/gov/projects` | Inspect Work Order `WO-BLR-150-001`. Show the ₹1.45 Cr scope, 18-day timeline, and human Zonal Commissioner approval gate. |
| **2:20–2:45** | **07 Measurable Impact** | `/gov/impact` | Show the Before/After simulation: 76% service deficit reduction, flood waterlogging down from 14.5h to 1.2h. |
| **2:45–3:00** | **08 Citizen Verification** | `/my-reports` | Show the citizen feedback poll: 86% verified resolution. The civic loop is complete. |

---

## 3. Judge FAQ

### Q1: Where is the AI in this project?
**Answer**: AI is the multilingual interpretation, semantic entity normalization, evidence summarizer, and policy briefing engine. It translates raw Kannada audio/text, maps unstructured descriptions to civic ontology schemas, and generates natural language explanations for government commissioners.

### Q2: Can the LLM hallucinate a fake priority score or approve a budget?
**Answer**: Absolutely not. We enforce strict governance separation:
- **Rule Engine Calculates**: All scores (94/100) are computed via auditable mathematical formulas based on structured telemetry and report volumes.
- **AI Explains**: Gemini synthesizes the reasoning narrative.
- **Humans Decide**: Municipal officials must click to authorize work orders and budgets.

### Q3: What happens if Gemini is offline or quota is exceeded?
**Answer**: JANSETU has a zero-billing, 100% offline deterministic `DemoProvider` that executes with zero dependencies. Circuit breaking with a 6.5-second timeout ensures the demo never crashes.

### Q4: Is this using live government data?
**Answer**: For this hackathon demonstration, all data is calibrated **Synthetic Demo Data** (`CL-BLR-150-01`). The architecture is production-structured to consume live Open City BBMP and smart-city sensor feeds upon deployment.

### Q5: How does this differ from CPGRAMS or a complaint chatbot?
**Answer**: Chatbots treat complaints as isolated 1-on-1 tickets. JANSETU is an **infrastructure intelligence platform** that clusters hundreds of complaints, measures spatial equity, produces verifiable work orders, and closes the loop through community re-verification.
