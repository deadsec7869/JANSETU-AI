# JANSETU AI — System Architecture

## Overview

JANSETU AI is a civic intelligence operating system built for **Code for Communities 2.0**. It bridges the gap between fragmented citizen reports and verified municipal action using a closed-loop civic governance pipeline:

```
[ Citizen Voice ] 
       │ (Multilingual Kannada/English Audio/Text)
       ▼
[ AI Intake & Normalization ]
       │ (Structured JSON via Gemini / DemoProvider)
       ▼
[ Semantic Issue Clustering ]
       │ (Spatial & Problem Convergence: CL-BLR-150-01)
       ▼
[ Spatial Priority Heatmap ]
       │ (WebGL Urban Density & Hotspot Grid)
       ▼
[ 3D Civic Evidence Graph ]
       │ (Rule Engine Calculates 94/100 • AI Synthesizes Narrative)
       ▼
[ Government Decision Support & Work Order ]
       │ (AI Recommends • Human Zonal Commissioner Authorizes)
       ▼
[ Measurable Civic Impact ]
       │ (Before/After Telemetry & Flood Duration Reduction)
       ▼
[ Citizen Verification ]
       │ (86% Community Ground Consensus)
       ▼
[ Closed Loop Resolved ]
```

---

## Core Governance Principle

> **"AI interprets. Deterministic code validates. Rules calculate. Humans decide."**

- **AI Role**: Language translation, unstructured entity extraction, semantic similarity suggestion, evidence summarization, explainability drafting.
- **Rule Engine Role**: Deterministic priority scoring (`94/100`), SLA tracking, threshold calculations.
- **Human Official Role**: Municipal work order authorization, capital expenditure sanctioning, contractor assignment.

---

## Technical Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 18, TypeScript, Vite |
| **Styling & Design System** | Tailwind CSS, Glassmorphism, Custom Theme Tokens |
| **3D & Spatial Graphics** | Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`) |
| **AI Intelligence Layer** | Google Gemini 1.5/2.0 Flash REST Client + Deterministic `DemoProvider` |
| **State & Navigation** | React Router v6, React Context (`AppContext`, `DemoProvider`) |
| **Icons & Micro-animations** | Lucide React, CSS Transitions & Keyframes |

---

## Directory Structure

```
src/
├── components/
│   ├── layout/          # Navbar, Sidebar, AppShell
│   ├── report/          # Multilingual intake, 7-stage AI triage, voice simulation
│   ├── shared/          # Cards, badges, modals, stats
│   └── ui/              # Buttons, inputs, chips, tabs
├── context/
│   └── AppContext.tsx   # Global store for role, issues, clusters, filters
├── data/
│   ├── canonicalScenario.ts   # Single source of truth (CL-BLR-150-01)
│   ├── actionWorkflowData.ts  # Work orders, milestones, verification
│   └── mockCivicData.ts       # Wards, issues, clusters
├── features/
│   ├── action/          # Closed-loop visual, work order execution
│   ├── ai/              # Provider abstraction, Gemini, Demo fallback, Prompts
│   └── demo/            # 3-minute presenter controller, overlay, /demo route
├── pages/
│   ├── citizen/         # Home, Report, My Reports, Community, AI Assistant
│   ├── government/      # Overview, Priority Map, Clusters, Evidence, Projects, Impact, Brief
│   └── shared/          # Issue Detail, NotFound
├── three/
│   ├── components/      # CivicCore, EvidenceGraphScene, PriorityMapScene
│   └── scene/           # CivicCanvas, CivicWorld, CivicPostProcessing
└── types/               # TypeScript interfaces for civic data
```
