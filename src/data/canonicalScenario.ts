/**
 * JANSETU AI — CANONICAL DEMONSTRATION SCENARIO
 * 
 * Single Source of Truth for Hackathon Judging & Demonstrations
 * Scenario: Outer Ring Road — Bellandur Stormwater Drain Overflow & Inundation
 * Code: CL-BLR-150-01
 * 
 * DATA PROVENANCE: SYNTHETIC DEMO DATA
 * All metrics, costs, and timeline figures are calibrated synthetic estimates
 * designed for prototype evaluation and deterministic validation.
 */

export interface CanonicalScenarioMetrics {
  clusterId: string;
  clusterCode: string;
  clusterTitle: string;
  wardNumber: number;
  wardName: string;
  zone: string;
  location: string;
  category: string;
  subCategory: string;
  primaryDepartment: string;
  
  // Quantitative Evidence Grounding
  totalReports: number;
  geotaggedImages: number;
  audioNotes: number; // Kannada & English audio submissions
  culvertBlockagePercent: number;
  dailyCommutersAffected: number;
  localResidentsAffected: number;
  serviceCapacityDeficitPercent: number;
  vulnerabilityScore: number; // Out of 100
  evidenceConfidencePercent: number;
  deterministicPriorityScore: number; // Out of 100 (Calculated by Rule Engine)
  
  // Government Intervention & Work Order
  workOrderId: string;
  recommendedIntervention: string;
  technicalScope: string[];
  estimatedBudget: string;
  actualSpent: string;
  estimatedDurationDays: number;
  daysElapsed: number;
  assignedContractor: string;
  leadEngineer: string;
  
  // Synthetic Impact Before & After
  impact: {
    weeklyReportsBefore: number;
    weeklyReportsAfter: number;
    serviceDeficitBeforePercent: number;
    serviceDeficitAfterPercent: number;
    satisfactionBeforePercent: number;
    satisfactionAfterPercent: number;
    waterloggingHoursBefore: number;
    waterloggingHoursAfter: number;
    serviceGapReductionPercent: number;
    reportsReductionPercent: number;
    satisfactionImprovementPercent: number;
  };
  
  // Citizen Verification Consensus
  verification: {
    totalResponses: number;
    improvedPercent: number;
    partiallyPercent: number;
    notYetPercent: number;
    communityConsensus: string;
  };

  // Multilingual Intakes for Demo
  demoIntakes: {
    kannada: {
      rawText: string;
      language: string;
      detectedIntent: string;
      translatedSummary: string;
    };
    english: {
      rawText: string;
      language: string;
      detectedIntent: string;
      translatedSummary: string;
    };
  };
}

export const CANONICAL_SCENARIO: CanonicalScenarioMetrics = {
  clusterId: 'CL-BLR-150-01',
  clusterCode: 'CL-BLR-150-01',
  clusterTitle: 'Outer Ring Road — Bellandur Stormwater Drain Overflow & Inundation',
  wardNumber: 150,
  wardName: 'Ward 150 - Bellandur',
  zone: 'Mahadevapura',
  location: 'Outer Ring Road (EcoSpace Flyover junction to Bellandur Gate)',
  category: 'Water & Drainage',
  subCategory: 'Stormwater Drain Inundation & Culvert Choke',
  primaryDepartment: 'BBMP Stormwater Drainage (SWD) Engineering Division',
  
  // Canonical Quantitative Evidence Values
  totalReports: 312,
  geotaggedImages: 142,
  audioNotes: 98,
  culvertBlockagePercent: 78,
  dailyCommutersAffected: 84000,
  localResidentsAffected: 32000,
  serviceCapacityDeficitPercent: 87,
  vulnerabilityScore: 95,
  evidenceConfidencePercent: 91,
  deterministicPriorityScore: 94,
  
  // Canonical Intervention
  workOrderId: 'WO-BLR-150-001',
  recommendedIntervention: 'Emergency Culvert Desilting + Automated Weir Gate Installation',
  technicalScope: [
    'Emergency mechanical desilting of Primary SWD Culvert #412 (1.2km stretch)',
    'Removal of 420 MT of solidified construction debris and silt deposits',
    'Deployment of 2x automated hydrodynamic telemetry weir gates',
    'Retrofitting reinforced concrete silt traps at EcoSpace junction',
    'Installation of continuous ultrasound water level monitoring sensors',
  ],
  estimatedBudget: '₹1.45 Cr',
  actualSpent: '₹0.98 Cr',
  estimatedDurationDays: 18,
  daysElapsed: 12,
  assignedContractor: 'Bengaluru Urban Infra Dynamics Ltd (Empanelled Cat-A)',
  leadEngineer: 'Er. R. S. Venkatesh (Executive Engineer, BBMP SWD Zone 4)',
  
  // Canonical Impact Simulation
  impact: {
    weeklyReportsBefore: 312,
    weeklyReportsAfter: 68,
    serviceDeficitBeforePercent: 87,
    serviceDeficitAfterPercent: 21,
    satisfactionBeforePercent: 38,
    satisfactionAfterPercent: 86,
    waterloggingHoursBefore: 14.5,
    waterloggingHoursAfter: 1.2,
    serviceGapReductionPercent: 76,
    reportsReductionPercent: 78,
    satisfactionImprovementPercent: 126,
  },
  
  // Citizen Consensus
  verification: {
    totalResponses: 148,
    improvedPercent: 86,
    partiallyPercent: 11,
    notYetPercent: 3,
    communityConsensus: 'Significant Ground Improvement Verified by 86% of Local Commuters & Residents',
  },

  // Demo Intakes
  demoIntakes: {
    kannada: {
      rawText: 'ಮಳೆ ಬಂದಾಗ ಇಲ್ಲಿ ನೀರು ತುಂಬಿಕೊಳ್ಳುತ್ತೆ. ಡ್ರೈನೇಜ್ ಸರಿಯಾಗಿ ಕೆಲಸ ಮಾಡುತ್ತಿಲ್ಲ. ರಸ್ತೆ ಪೂರ್ತಿ ಕೆರೆಯಂತಾಗಿದೆ.',
      language: 'Kannada (kn)',
      detectedIntent: 'Report Stormwater Drainage Failure & Waterlogging',
      translatedSummary: 'Severe stormwater drain overflow causing acute road inundation near Outer Ring Road during rains.',
    },
    english: {
      rawText: 'Our road near Bellandur EcoSpace gets completely flooded whenever it rains. The main culvert drain has been blocked for months.',
      language: 'English (en)',
      detectedIntent: 'Report Stormwater Drainage Choke',
      translatedSummary: 'Arterial road waterlogging and chronic culvert choke disrupting major commuter corridor.',
    },
  },
};

/**
 * 30-Second Elevator Proposition Structure
 */
export const ELEVATOR_PITCH = [
  {
    step: '01',
    stage: 'THE PROBLEM',
    headline: 'Citizen feedback is fragmented & noisy.',
    detail: 'Thousands of complaints across Kannada & English are logged as isolated tickets without systemic context.',
    color: 'text-rose-400',
    borderColor: 'border-rose-500/30',
    bg: 'bg-rose-500/10',
  },
  {
    step: '02',
    stage: 'THE INTELLIGENCE GAP',
    headline: 'Critical infrastructure failure patterns remain hidden.',
    detail: 'Manual triage cannot connect 312 separate complaints to 1 blocked culvert choking 84,000 daily commuters.',
    color: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
  },
  {
    step: '03',
    stage: 'JANSETU AI',
    headline: 'AI interprets & converts voice into structured civic evidence.',
    detail: 'Multilingual NLP clusters reports, spatial maps locate hotspots, and 3D evidence graphs converge data.',
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    bg: 'bg-cyan-500/10',
  },
  {
    step: '04',
    stage: 'THE DECISION',
    headline: 'Transparent rule engines calculate — humans decide.',
    detail: 'Score 94/100 is deterministic. AI explains the why, but elected officials authorize municipal action.',
    color: 'text-indigo-400',
    borderColor: 'border-indigo-500/30',
    bg: 'bg-indigo-500/10',
  },
  {
    step: '05',
    stage: 'THE OUTCOME',
    headline: 'Government action becomes measurable & verifiable.',
    detail: 'Work orders link directly to citizen re-verification, closing the civic loop with 86% verified satisfaction.',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
  },
];
