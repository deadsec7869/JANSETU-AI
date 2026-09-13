# JANSETU AI — Deterministic Priority Engine Methodology

## Overview

Unlike black-box LLM scoring systems that produce unpredictable hallucinations, JANSETU AI uses a **transparent, auditable deterministic rule engine** to calculate priority scores (`0 – 100`).

---

## Formula

$$\text{Priority Score} = \min\left(100, \text{round}\left(\sum_{i} w_i \cdot F_i \cdot M_{\text{urgency}}\right)\right)$$

Where $F_i$ represents normalized 0–100 factor inputs:

| Factor ($F_i$) | Description | Weight ($w_i$) |
|---|---|---|
| **Demand Signal ($D$)** | Citizen report volume normalized against ward average ($\log_2(\text{reports}) \times 12$) | $0.20$ |
| **Severity Index ($S$)** | Infrastructure structural hazard / waterlogging depth / road sinkage | $0.25$ |
| **Vulnerability ($V$)** | Demographic vulnerability, presence of schools, hospitals, transit corridors | $0.20$ |
| **Service Gap ($G$)** | Measured deficit in storm drainage or municipal service throughput capacity | $0.20$ |
| **Evidence Confidence ($E$)** | Convergence of multimodal inputs (photos, audio, sensor readings) | $0.15$ |

### Urgency Multiplier ($M_{\text{urgency}}$)
- Standard: `1.00x`
- Arterial transit choke: `1.15x`
- Monsoon alert active: `1.25x`

---

## Canonical Scenario Calculation (`CL-BLR-150-01`)

- **Demand**: 312 reports $\rightarrow 92$
- **Severity**: 78% culvert choke $\rightarrow 94$
- **Vulnerability**: 84,000 daily commuters + schools $\rightarrow 95$
- **Service Gap**: 87% drainage capacity deficit $\rightarrow 96$
- **Evidence Confidence**: 142 photos + 98 audio notes $\rightarrow 91$

$$\text{Base Score} = (0.20 \times 92) + (0.25 \times 94) + (0.20 \times 95) + (0.20 \times 96) + (0.15 \times 91) = 93.75 \approx \mathbf{94 / 100}$$

---

## The Separation of Concerns

1. **Rule Engine Calculates**: Produces the immutable `94 / 100` score.
2. **AI Synthesizes Narrative**: Explains *why* the score is high to citizens and commissioners in plain language.
3. **Elected Official Authorizes**: Reviews the evidence graph and clicks "Authorize Work Order".
