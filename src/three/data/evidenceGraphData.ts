export type EvidenceNodeType =
  | 'citizen'
  | 'cluster'
  | 'location'
  | 'infrastructure'
  | 'population'
  | 'service-gap'
  | 'project'
  | 'priority'
  | 'action';

export interface EvidenceNodeData {
  id: string;
  type: EvidenceNodeType;
  label: string;
  subtitle?: string;
  description: string;
  value: string | number;
  metric?: string;
  confidence: number; // e.g. 91 (for 91%)
  position: [number, number, number];
  relationships: string[]; // target node IDs
  category: string;
  color: string;
  glowColor: string;
  isWhyPath?: boolean;
  whyStep?: number;
  whyExplanation?: string;
}

export interface EvidenceEdgeData {
  id: string;
  source: string;
  target: string;
  label?: string;
  strength: number; // 0.1 to 1.0
  isWhyPath?: boolean;
}

export interface PriorityBreakdown {
  demand: number;
  severity: number;
  vulnerability: number;
  urgency: number;
  evidence: number;
  serviceGap: number;
  totalScore: number;
}

export interface EvidenceGraphDataset {
  clusterId: string;
  clusterTitle: string;
  domain: string;
  priorityScore: number;
  totalReports: number;
  serviceGapPercent: number;
  evidenceConfidencePercent: number;
  priorityBreakdown: PriorityBreakdown;
  nodes: EvidenceNodeData[];
  edges: EvidenceEdgeData[];
}

export const WATER_EVIDENCE_GRAPH: EvidenceGraphDataset = {
  clusterId: 'CL-BLR-150-01',
  clusterTitle: 'Outer Ring Road — Bellandur Stormwater Drain Overflow & Inundation',
  domain: 'Water & Drainage',
  priorityScore: 94,
  totalReports: 312,
  serviceGapPercent: 87,
  evidenceConfidencePercent: 91,
  priorityBreakdown: {
    demand: 91,
    severity: 87,
    vulnerability: 95,
    urgency: 92,
    evidence: 89,
    serviceGap: 96,
    totalScore: 94,
  },
  nodes: [
    // 1. Central Hotspot Cluster
    {
      id: 'node-cluster',
      type: 'cluster',
      label: 'WATER CRISIS CLUSTER',
      subtitle: 'CL-BLR-150-01 (Bellandur Drain)',
      description: 'Algorithmically unified cluster of 312 citizen submissions regarding chronic arterial flooding and backflow.',
      value: '312 Reports Clustered',
      metric: '312 Verified Reports',
      confidence: 94,
      position: [0, 0, 0],
      relationships: ['node-loc', 'node-infra', 'node-pop', 'node-gap', 'node-proj', 'node-priority'],
      category: 'Cluster Nucleus',
      color: '#7c3aed',
      glowColor: '#a78bfa',
      isWhyPath: true,
      whyStep: 2,
      whyExplanation: 'AI clustered 312 citizen voice, image, and text reports into a single high-density causal issue.',
    },

    // 2. Citizen Report Sub-nodes (Multi-source citizen signals)
    {
      id: 'node-citizen-1',
      type: 'citizen',
      label: 'Photo Ingestion: ORR Flooding',
      subtitle: '142 Geotagged Citizen Photos',
      description: 'High-confidence visual evidence of 1.2m standing water blocking tech corridor lanes.',
      value: '142 Images',
      metric: 'Visual Proof (96% Confidence)',
      confidence: 96,
      position: [-1.4, 2.3, 0.4],
      relationships: ['node-cluster'],
      category: 'Citizen Signal',
      color: '#2563eb',
      glowColor: '#60a5fa',
      isWhyPath: true,
      whyStep: 1,
      whyExplanation: '142 geotagged citizen photos verified deep standing water blocking public transit lanes.',
    },
    {
      id: 'node-citizen-2',
      type: 'citizen',
      label: 'Voice Reports: Drain Backflow',
      subtitle: '98 Kannada & English Voice Notes',
      description: 'Audio reports of sewage backflow into residential basements during moderate showers.',
      value: '98 Audio Notes',
      metric: 'Transcribed & NLP Classified',
      confidence: 92,
      position: [0, 2.5, -0.3],
      relationships: ['node-cluster'],
      category: 'Citizen Signal',
      color: '#2563eb',
      glowColor: '#60a5fa',
    },
    {
      id: 'node-citizen-3',
      type: 'citizen',
      label: 'Telemetry: SWD Sensor 150-B',
      subtitle: 'IoT Flow Gauge Telemetry',
      description: 'Telemetry sensor SWD-150-B registered discharge velocity collapse by 84% at culvert intake.',
      value: '84% Velocity Drop',
      metric: 'IoT Sensor Stream',
      confidence: 98,
      position: [1.4, 2.3, 0.3],
      relationships: ['node-cluster'],
      category: 'Citizen Signal',
      color: '#2563eb',
      glowColor: '#60a5fa',
    },

    // 3. Location & Spatial Criticality
    {
      id: 'node-loc',
      type: 'location',
      label: 'LOCATION CRITICALITY',
      subtitle: 'Outer Ring Road (Ward 150 - Bellandur)',
      description: 'Arterial economic highway connecting 3 tech parks, Sakra Hospital, and 2 school zones.',
      value: 'Ward 150',
      metric: 'Arterial Corridor (EcoSpace)',
      confidence: 99,
      position: [-2.9, 0.4, 0.2],
      relationships: ['node-pop', 'node-infra'],
      category: 'Spatial Context',
      color: '#475569',
      glowColor: '#64748b',
      isWhyPath: true,
      whyStep: 3,
      whyExplanation: 'Corridor encompasses major economic tech hub, hospital ambulance route, and school buses.',
    },

    // 4. Physical Infrastructure Condition
    {
      id: 'node-infra',
      type: 'infrastructure',
      label: 'INFRASTRUCTURE CONDITION',
      subtitle: 'Primary Culvert #412 Blockage',
      description: 'BBMP primary storm culvert narrowed from 3.2m to 0.7m due to illegal debris and siltation buildup.',
      value: '78% Blocked',
      metric: 'Culvert #412 Silted',
      confidence: 93,
      position: [-2.0, -1.8, 0.3],
      relationships: ['node-gap', 'node-proj'],
      category: 'Asset Condition',
      color: '#2563eb',
      glowColor: '#60a5fa',
      isWhyPath: true,
      whyStep: 4,
      whyExplanation: 'Culvert #412 structural cross-section is 78% obstructed by uncleaned industrial silt.',
    },

    // 5. Population Affected
    {
      id: 'node-pop',
      type: 'population',
      label: 'POPULATION EXPOSURE',
      subtitle: 'Commuters & Local Vulnerability',
      description: 'Over 84,000 daily public transit commuters and 32,000 residents in direct flood risk zone.',
      value: '84,000+ People',
      metric: 'Severe Transit Stoppage',
      confidence: 90,
      position: [2.2, -1.5, 0.2],
      relationships: ['node-gap'],
      category: 'Vulnerability Impact',
      color: '#10b981',
      glowColor: '#34d399',
    },

    // 6. Service Gap / Deficit
    {
      id: 'node-gap',
      type: 'service-gap',
      label: 'SERVICE CAPACITY DEFICIT',
      subtitle: '87% Deficit at >25mm/hr Rain',
      description: 'Current drainage discharge capacity is 4.2 m³/s against required peak flow of 32.5 m³/s.',
      value: '87% Gap',
      metric: 'Severe Capacity Deficit',
      confidence: 96,
      position: [3.0, 0.5, 0.3],
      relationships: ['node-priority'],
      category: 'Capacity Deficit',
      color: '#f59e0b',
      glowColor: '#fbbf24',
      isWhyPath: true,
      whyStep: 5,
      whyExplanation: 'Existing drain cannot evacuate 87% of peak rainfall runoff, triggering flash flooding in 12 mins.',
    },

    // 7. Existing Projects Pipeline
    {
      id: 'node-proj',
      type: 'project',
      label: 'BUDGET & PROJECT GAP',
      subtitle: 'No Active Sanctioned Works',
      description: 'BBMP FY26 capital works registry shows zero approved storm drain widening tenders for this sub-basin.',
      value: '₹0 Allocated',
      metric: 'Unfunded Infrastructure Gap',
      confidence: 88,
      position: [1.2, -2.7, 0.4],
      relationships: ['node-action'],
      category: 'Project Registry',
      color: '#7c3aed',
      glowColor: '#a78bfa',
    },

    // 8. Priority Score Engine Node
    {
      id: 'node-priority',
      type: 'priority',
      label: 'PRIORITY SCORE: 94 / 100',
      subtitle: 'Algorithmically Verified Rank #1',
      description: 'Computed composite index across Demand (91), Severity (87), Vulnerability (95), and Urgency (92).',
      value: '94 / 100',
      metric: 'Rank #1 in Greater Bengaluru',
      confidence: 97,
      position: [0, -3.2, 0.5],
      relationships: ['node-action'],
      category: 'Calculated Priority',
      color: '#ef4444',
      glowColor: '#f87171',
      isWhyPath: true,
      whyStep: 6,
      whyExplanation: 'Composite score of 94/100 ranks this as the #1 critical municipal intervention in Bengaluru.',
    },

    // 9. Recommended Intervention Action
    {
      id: 'node-action',
      type: 'action',
      label: 'RECOMMENDED INTERVENTION',
      subtitle: 'Sanction Emergency Desilting & Automated Weir',
      description: 'Deploy high-velocity suction silt cutters & install automated floodgate weir (Est: ₹1.45 Cr, 18 Days).',
      value: '₹1.45 Cr (18 Days)',
      metric: 'High ROI Municipal Order',
      confidence: 95,
      position: [-2.4, -3.2, 0.4],
      relationships: [],
      category: 'Actionable Outcome',
      color: '#10b981',
      glowColor: '#34d399',
    },
  ],
  edges: [
    { id: 'e1', source: 'node-citizen-1', target: 'node-cluster', strength: 0.9, isWhyPath: true },
    { id: 'e2', source: 'node-citizen-2', target: 'node-cluster', strength: 0.8 },
    { id: 'e3', source: 'node-citizen-3', target: 'node-cluster', strength: 0.85 },
    { id: 'e4', source: 'node-cluster', target: 'node-loc', strength: 0.95, isWhyPath: true },
    { id: 'e5', source: 'node-loc', target: 'node-infra', strength: 0.9, isWhyPath: true },
    { id: 'e6', source: 'node-loc', target: 'node-pop', strength: 0.85 },
    { id: 'e7', source: 'node-infra', target: 'node-gap', strength: 0.95, isWhyPath: true },
    { id: 'e8', source: 'node-pop', target: 'node-gap', strength: 0.8 },
    { id: 'e9', source: 'node-infra', target: 'node-proj', strength: 0.75 },
    { id: 'e10', source: 'node-gap', target: 'node-priority', strength: 0.95, isWhyPath: true },
    { id: 'e11', source: 'node-cluster', target: 'node-priority', strength: 0.9 },
    { id: 'e12', source: 'node-proj', target: 'node-action', strength: 0.8 },
    { id: 'e13', source: 'node-priority', target: 'node-action', strength: 0.95, isWhyPath: true },
  ],
};
