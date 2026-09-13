export type ActionStatus =
  | 'identified'
  | 'prioritized'
  | 'awaiting_review'
  | 'approved'
  | 'assigned'
  | 'in_progress'
  | 'completed'
  | 'verified';

export interface MilestoneStage {
  day: string;
  stageName: string;
  description: string;
  departmentUnit: string;
  status: 'completed' | 'in_progress' | 'pending';
  progressPercent: number;
  timestamp: string;
  metrics?: { label: string; value: string };
}

export interface VerificationFeedback {
  id: string;
  citizenName: string;
  rating: 'improved' | 'partially' | 'not_yet';
  comment: string;
  timestamp: string;
  verifiedLocation: string;
}

export interface WorkOrderData {
  id: string;
  clusterId: string;
  title: string;
  department: string;
  priorityScore: number;
  evidenceConfidence: number;
  wardNumber: number;
  wardName: string;
  location: string;
  status: ActionStatus;
  recommendedAction: string;
  technicalScope: string[];
  estimatedBudget: string;
  actualSpent: string;
  estimatedDays: number;
  daysElapsed: number;
  assignedContractor: string;
  leadEngineer: string;
  createdAt: string;
  approvedAt?: string;
  completedAt?: string;
  milestones: MilestoneStage[];
  reasoningChain: {
    citizenReports: number;
    culvertBlockage: number;
    serviceCapacityDeficit: number;
    vulnerabilityScore: number;
    priorAllocation: string;
    algorithmicConclusion: string;
  };
  impactMetrics: {
    before: {
      reportsWeekly: number;
      serviceGapPercent: number;
      satisfactionPercent: number;
      waterloggingHours: number;
      affectedCommuters: number;
    };
    after: {
      reportsWeekly: number;
      serviceGapPercent: number;
      satisfactionPercent: number;
      waterloggingHours: number;
      affectedCommuters: number;
    };
    serviceGapReductionPercent: number;
    reportsReductionPercent: number;
    satisfactionImprovementPercent: number;
  };
  verification: {
    totalResponses: number;
    improvedPercent: number;
    partiallyPercent: number;
    notYetPercent: number;
    communityConsensus: string;
    feedbacks: VerificationFeedback[];
  };
}

export interface DemoNotification {
  id: string;
  title: string;
  message: string;
  stage: ActionStatus;
  timestamp: string;
  isRead: boolean;
  linkTo?: string;
}

export const CANONICAL_WORK_ORDER: WorkOrderData = {
  id: 'WO-BLR-150-001',
  clusterId: 'CL-BLR-150-01',
  title: 'Outer Ring Road — Bellandur Stormwater Drain Culvert Desilting & Automated Weir Gate Installation',
  department: 'BBMP Stormwater Drainage (SWD) Engineering Division',
  priorityScore: 94,
  evidenceConfidence: 91,
  wardNumber: 150,
  wardName: 'Ward 150 - Bellandur',
  location: 'Outer Ring Road (EcoSpace - Bellandur Lake Arterial Outflow)',
  status: 'in_progress',
  recommendedAction: 'Emergency Culvert Desilting + Automated Weir Gate Installation',
  technicalScope: [
    'Emergency mechanical desilting of Primary SWD Culvert #412 (1.2km stretch)',
    'Removal of 420 MT of solidified construction debris and silt deposits',
    'Deployment of 2x automated hydrodynamic telemetry weir gates',
    'Retrofitting reinforced concrete silt traps at EcoSpace junction',
    'Installation of continuous ultrasound water level monitoring sensors',
  ],
  estimatedBudget: '₹1.45 Cr',
  actualSpent: '₹0.98 Cr',
  estimatedDays: 18,
  daysElapsed: 12,
  assignedContractor: 'Bengaluru Urban Infra Dynamics Ltd (Empanelled Cat-A)',
  leadEngineer: 'Er. R. S. Venkatesh (Executive Engineer, BBMP SWD Zone 4)',
  createdAt: '2026-09-02T10:00:00Z',
  approvedAt: '2026-09-04T14:30:00Z',
  milestones: [
    {
      day: 'Day 01',
      stageName: 'Executive Approval & Budget Authorization',
      description: 'Zonal Commissioner authorized ₹1.45 Cr emergency municipal capital grant based on Priority 94 evidence packet.',
      departmentUnit: 'BBMP Finance & Zonal Committee',
      status: 'completed',
      progressPercent: 100,
      timestamp: 'Sep 04, 2026',
      metrics: { label: 'Grant Sanctioned', value: '₹1.45 Cr (100%)' },
    },
    {
      day: 'Day 03',
      stageName: 'Field Crew & Heavy Suction Super-Suckers Deployed',
      description: '3 high-capacity hydro-jetting suction rigs mobilized to Bellandur ORR with traffic police night clearance.',
      departmentUnit: 'BBMP SWD Rapid Taskforce',
      status: 'completed',
      progressPercent: 100,
      timestamp: 'Sep 06, 2026',
      metrics: { label: 'Rigs Active', value: '3 Super-Suckers' },
    },
    {
      day: 'Day 07',
      stageName: 'Mechanical Desilting Reaches 45% Clearance',
      description: 'Sub-surface sediment extraction removed 210 metric tonnes of silt; arterial flow velocity improved by 3.2x.',
      departmentUnit: 'Urban Infra Operations',
      status: 'completed',
      progressPercent: 100,
      timestamp: 'Sep 10, 2026',
      metrics: { label: 'Silt Extracted', value: '210 MT (45%)' },
    },
    {
      day: 'Day 12',
      stageName: 'Culvert #412 Throat Fully Decongested',
      description: 'Internal robotic camera crawler verified 92% cross-sectional unhindered water passage.',
      departmentUnit: 'Quality Inspection Wing',
      status: 'in_progress',
      progressPercent: 78,
      timestamp: 'Sep 13, 2026',
      metrics: { label: 'Throat Clearance', value: '92% Unblocked' },
    },
    {
      day: 'Day 16',
      stageName: 'Automated Weir Gate & Level Sensor Commissioning',
      description: 'Dual telemetry flap gates scheduled for installation with real-time SCADA flood threshold alerting.',
      departmentUnit: 'Hydro-Informatics Team',
      status: 'pending',
      progressPercent: 0,
      timestamp: 'Scheduled Sep 17, 2026',
      metrics: { label: 'Gates Ready', value: '2 Units' },
    },
    {
      day: 'Day 18',
      stageName: 'Execution Complete & Public Verification Sign-off',
      description: 'Full municipal sign-off followed by automated citizen verification poll to 312 original report contributors.',
      departmentUnit: 'JANSETU Civic Accountability Loop',
      status: 'pending',
      progressPercent: 0,
      timestamp: 'Scheduled Sep 19, 2026',
      metrics: { label: 'Expected Verifiers', value: '312 Citizens' },
    },
  ],
  reasoningChain: {
    citizenReports: 312,
    culvertBlockage: 78,
    serviceCapacityDeficit: 87,
    vulnerabilityScore: 95,
    priorAllocation: '₹0 in FY25-26 planned capex',
    algorithmicConclusion: 'High economic commuter exposure (84,000 daily travelers) combined with persistent severe service deficit makes emergency mechanical intervention the single highest ROI civic project.',
  },
  impactMetrics: {
    before: {
      reportsWeekly: 312,
      serviceGapPercent: 87,
      satisfactionPercent: 38,
      waterloggingHours: 14.5,
      affectedCommuters: 84000,
    },
    after: {
      reportsWeekly: 68,
      serviceGapPercent: 21,
      satisfactionPercent: 86,
      waterloggingHours: 1.2,
      affectedCommuters: 84000,
    },
    serviceGapReductionPercent: 76,
    reportsReductionPercent: 78,
    satisfactionImprovementPercent: 126,
  },
  verification: {
    totalResponses: 148,
    improvedPercent: 86,
    partiallyPercent: 11,
    notYetPercent: 3,
    communityConsensus: 'Significant Ground Improvement Verified by 86% of Local Commuters & Residents',
    feedbacks: [
      {
        id: 'fb-1',
        citizenName: 'Pooja R. (EcoSpace Tech Park)',
        rating: 'improved',
        comment: 'The persistent stagnant black water outside Gate 2 was completely cleared this morning. Flow is visibly smooth even after heavy rain yesterday.',
        timestamp: '2 hours ago',
        verifiedLocation: 'ORR EcoSpace Junction',
      },
      {
        id: 'fb-2',
        citizenName: 'Vikas Gowda (Bellandur Ward Resident)',
        rating: 'improved',
        comment: 'Drainage suction crews worked all night. Huge difference in morning traffic congestion since there was no lane submergence.',
        timestamp: '5 hours ago',
        verifiedLocation: 'Ward 150 Culvert #412',
      },
      {
        id: 'fb-3',
        citizenName: 'Ananya S. (Sarjapur Commuter)',
        rating: 'partially',
        comment: 'The main drain is clear, but footpath silt accumulation near the bus stand still needs a final sweep.',
        timestamp: 'Yesterday',
        verifiedLocation: 'Bellandur Bus Stop',
      },
    ],
  },
};

export const DEMO_NOTIFICATIONS_SEED: DemoNotification[] = [
  {
    id: 'notif-1',
    title: 'Report Clustered',
    message: 'Your report #RPT-2026-442 joined Cluster CL-BLR-150-01 alongside 311 other citizen voices.',
    stage: 'identified',
    timestamp: 'Sep 02, 2026',
    isRead: true,
    linkTo: '/issue/RPT-2026-442',
  },
  {
    id: 'notif-2',
    title: 'Issue Prioritized #1',
    message: 'AI Priority Engine calculated Score 94/100 due to 84,000 commuter exposure and 78% culvert choke.',
    stage: 'prioritized',
    timestamp: 'Sep 03, 2026',
    isRead: true,
    linkTo: '/gov/priority-map',
  },
  {
    id: 'notif-3',
    title: 'Municipal Review Approved',
    message: 'BBMP Zonal Commissioner approved ₹1.45 Cr emergency desilting work order WO-BLR-150-001.',
    stage: 'approved',
    timestamp: 'Sep 04, 2026',
    isRead: true,
    linkTo: '/gov/projects',
  },
  {
    id: 'notif-4',
    title: 'Field Execution Active',
    message: 'Hydro-suction rigs operating on Outer Ring Road. Silt extraction has reached 78% milestone.',
    stage: 'in_progress',
    timestamp: 'Sep 13, 2026',
    isRead: false,
    linkTo: '/gov/projects',
  },
  {
    id: 'notif-5',
    title: 'Citizen Verification Requested',
    message: 'Work is reaching completion. Did the drainage flow improve near EcoSpace? Verify now.',
    stage: 'completed',
    timestamp: 'Just now',
    isRead: false,
    linkTo: '/community',
  },
];
