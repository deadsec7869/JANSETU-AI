export type DemoStage =
  | 'voice'
  | 'understanding'
  | 'cluster'
  | 'priority'
  | 'evidence'
  | 'action'
  | 'impact'
  | 'verification';

export interface DemoStageConfig {
  key: DemoStage;
  index: number;
  stageNumber: string;
  title: string;
  subtitle: string;
  timeline: string;
  targetRoute: string;
  targetRole: 'citizen' | 'government';
  talkingPoints: string[];
  keyPrinciple: string;
  provenanceLabel: string;
  metrics: { label: string; value: string }[];
}

export const DEMO_STAGES: DemoStageConfig[] = [
  {
    key: 'voice',
    index: 0,
    stageNumber: '01 / 08',
    title: 'Citizen Voice & Multilingual Intake',
    subtitle: 'Capturing raw citizen experiences in native Kannada & English without bureaucratic barriers.',
    timeline: '0:00 – 0:20',
    targetRoute: '/report',
    targetRole: 'citizen',
    talkingPoints: [
      'Citizens report issues using natural language, voice recordings, or photos.',
      'Supports Kannada ("ಮಳೆ ಬಂದಾಗ...") and English natively.',
      'No complicated categorization dropdowns required from citizens.',
    ],
    keyPrinciple: 'Citizen voice is preserved in original dialect alongside structured translation.',
    provenanceLabel: 'MULTILINGUAL INTAKE',
    metrics: [
      { label: 'Input Modality', value: 'Kannada Audio / Voice Note' },
      { label: 'Target Issue', value: 'Stormwater Culvert Blockage' },
      { label: 'Location', value: 'Ward 150 - Bellandur ORR' },
    ],
  },
  {
    key: 'understanding',
    index: 1,
    stageNumber: '02 / 08',
    title: 'AI Understanding & Entity Triage',
    subtitle: 'Extracting canonical civic entities through strict structured schemas with no fabrication.',
    timeline: '0:20 – 0:45',
    targetRoute: '/report',
    targetRole: 'citizen',
    talkingPoints: [
      'Gemini / DemoProvider normalizes unstructured complaints into validated JSON.',
      'Extracts category (water_drainage), severity (8/10), and infrastructure entities.',
      'No-fabrication guardrail strictly bounds outputs to verified report tokens.',
    ],
    keyPrinciple: 'AI interprets and normalizes; deterministic schemas validate before state storage.',
    provenanceLabel: '7-STAGE AI TRIAGE',
    metrics: [
      { label: 'Category', value: 'Water & Drainage' },
      { label: 'Severity Index', value: '8 / 10' },
      { label: 'Confidence', value: '94% High' },
    ],
  },
  {
    key: 'cluster',
    index: 2,
    stageNumber: '03 / 08',
    title: 'Community Issue Clustering',
    subtitle: 'Aggregating 312 isolated complaints into a single systemic municipal hotspot.',
    timeline: '0:45 – 1:05',
    targetRoute: '/gov/clusters',
    targetRole: 'government',
    talkingPoints: [
      'Transforms individual noise into high-signal infrastructure clusters.',
      'Connects 312 reports across 22 days to Culvert #412 failure.',
      'Identifies 84,000 daily commuters and 32,000 residents affected.',
    ],
    keyPrinciple: 'Governments solve systemic cluster root causes, not isolated tickets.',
    provenanceLabel: 'SYNTHETIC CLUSTER DATA',
    metrics: [
      { label: 'Cluster Code', value: 'CL-BLR-150-01' },
      { label: 'Total Reports', value: '312 Reports' },
      { label: 'Commuters Exposed', value: '84,000 / day' },
    ],
  },
  {
    key: 'priority',
    index: 3,
    stageNumber: '04 / 08',
    title: 'Spatial Civic Priority Map',
    subtitle: 'Where does the city need urgent intervention? Spatial density and ward equity heatmaps.',
    timeline: '1:05 – 1:30',
    targetRoute: '/gov/priority-map',
    targetRole: 'government',
    talkingPoints: [
      'WebGL Spatial Heatmap identifies hotspot severity across Greater Bengaluru.',
      'Bellandur ORR highlighted with Critical SLA breach risk.',
      'Enables zonal municipal commissioners to allocate field rigs geographically.',
    ],
    keyPrinciple: 'Spatial prioritization eliminates political bias and highlights neglected infrastructure.',
    provenanceLabel: 'SPATIAL TELEMETRY',
    metrics: [
      { label: 'Hotspot Status', value: 'CRITICAL (90–100)' },
      { label: 'Culvert Choke', value: '78% Blocked' },
      { label: 'Service Deficit', value: '87% Gap' },
    ],
  },
  {
    key: 'evidence',
    index: 4,
    stageNumber: '05 / 08',
    title: 'Interactive 3D Evidence Graph',
    subtitle: 'Why is this Priority #1? Deterministic rule engine calculations + AI explainability.',
    timeline: '1:30 – 1:55',
    targetRoute: '/gov/evidence',
    targetRole: 'government',
    talkingPoints: [
      '3D Graph connects citizen reports, geotagged images, sensors, and vulnerability.',
      'Priority Score 94/100 is calculated by transparent deterministic formulas, NOT a black-box LLM.',
      'Gemini provides the natural language narrative explaining the convergence.',
    ],
    keyPrinciple: 'AI INTERPRETS. RULES CALCULATE. HUMANS DECIDE.',
    provenanceLabel: 'SYNTHETIC EVIDENCE GRAPH',
    metrics: [
      { label: 'Rule Engine Score', value: '94 / 100' },
      { label: 'Geotagged Images', value: '142 Images' },
      { label: 'Vulnerability Weight', value: '95 / 100' },
    ],
  },
  {
    key: 'action',
    index: 5,
    stageNumber: '06 / 08',
    title: 'Government Action & Work Order',
    subtitle: 'What should government do? AI intervention recommendation + human official authorization.',
    timeline: '1:55 – 2:20',
    targetRoute: '/gov/projects',
    targetRole: 'government',
    talkingPoints: [
      'AI recommends: Emergency Culvert Desilting + Automated Weir Gate.',
      'Estimated ₹1.45 Cr capital outlay over 18 days execution timeline.',
      'Requires human Zonal Commissioner review and authorization before issuance.',
    ],
    keyPrinciple: 'AI assists decision-making; elected/appointed officials retain sole spending authorization.',
    provenanceLabel: 'PROTOTYPE WORK ORDER',
    metrics: [
      { label: 'Work Order ID', value: 'WO-BLR-150-001' },
      { label: 'Estimated Budget', value: '₹1.45 Cr' },
      { label: 'Execution Window', value: '18 Days' },
    ],
  },
  {
    key: 'impact',
    index: 6,
    stageNumber: '07 / 08',
    title: 'Measurable Civic Impact',
    subtitle: 'Did it work? Before vs after infrastructure analytics and flood duration reduction.',
    timeline: '2:20 – 2:45',
    targetRoute: '/gov/impact',
    targetRole: 'government',
    talkingPoints: [
      'Quantifies infrastructure turnaround: 76% service deficit reduction.',
      'Waterlogging duration dropped from 14.5 hours to 1.2 hours per rain event.',
      'Weekly complaint volume plunged by 78% following culvert clearance.',
    ],
    keyPrinciple: 'Civic investments must produce verified, measurable public utility improvements.',
    provenanceLabel: 'SYNTHETIC IMPACT SIMULATION',
    metrics: [
      { label: 'Service Deficit', value: '87% → 21% (-76%)' },
      { label: 'Flood Duration', value: '14.5h → 1.2h' },
      { label: 'Satisfaction', value: '38% → 86%' },
    ],
  },
  {
    key: 'verification',
    index: 7,
    stageNumber: '08 / 08',
    title: 'Citizen Verification & Closed Loop',
    subtitle: 'Returning to the community to verify real-world resolution on the ground.',
    timeline: '2:45 – 3:00',
    targetRoute: '/my-reports',
    targetRole: 'citizen',
    talkingPoints: [
      'Polls the 312 original report contributors to confirm ground conditions.',
      '86% verified significant improvement; 11% reported partial resolution.',
      'The civic loop closes from citizen voice to verified public impact.',
    ],
    keyPrinciple: 'Accountability is complete only when citizens verify ground reality.',
    provenanceLabel: 'COMMUNITY CONSENSUS',
    metrics: [
      { label: 'Citizen Consensus', value: '86% Verified Clear' },
      { label: 'Responses', value: '148 Verified' },
      { label: 'Loop Status', value: 'CLOSED & RESOLVED' },
    ],
  },
];
