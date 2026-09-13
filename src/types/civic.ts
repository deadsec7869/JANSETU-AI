export type CivicCategory = 
  | 'Roads & Transport'
  | 'Water & Drainage'
  | 'Waste Management'
  | 'Electricity & Lighting'
  | 'Public Safety'
  | 'Parks & Environment'
  | 'Public Health';

export type IssueStatus = 
  | 'reported'
  | 'under_review'
  | 'clustered'
  | 'action_scheduled'
  | 'in_progress'
  | 'resolved';

export type PriorityLevel = 'Critical' | 'High' | 'Medium' | 'Low';

export interface WardOption {
  id: string;
  name: string;
  zone: string;
  activeIssuesCount: number;
}

export interface PriorityScoreBreakdown {
  overallScore: number; // 0 - 100
  safetyRisk: number; // 0 - 100
  affectedPopulation: number; // estimated people count
  repeatFactor: number; // how many repeat reports
  economicImpact: number; // 0 - 100
  vulnerabilityWeight: number; // nearby schools/hospitals multiplier
  explanation: string;
}

export interface EvidenceItem {
  id: string;
  type: 'photo' | 'voice_memo' | 'sensor_reading' | 'citizen_verification' | 'satellite_data';
  title: string;
  description: string;
  url?: string;
  timestamp: string;
  verified: boolean;
  metadata?: Record<string, string | number>;
}

export interface IssueTimelineEvent {
  id: string;
  timestamp: string;
  stage: 'Reported' | 'AI Triaged' | 'Clustered' | 'Prioritized' | 'Action Plan' | 'Work In Progress' | 'Resolved';
  title: string;
  description: string;
  actor: string;
  actorRole: 'Citizen' | 'AI Engine' | 'Department Head' | 'Ward Officer' | 'Contractor';
}

export interface CivicIssue {
  id: string;
  code: string; // e.g. "JS-BLR-2026-889"
  title: string;
  description: string;
  category: CivicCategory;
  subcategory?: string;
  ward: string;
  zone: string;
  locationAddress: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  status: IssueStatus;
  priorityLevel: PriorityLevel;
  priorityScore: PriorityScoreBreakdown;
  aiConfidence: number; // percentage, e.g. 96%
  clusterId?: string;
  clusterName?: string;
  reporter: {
    name: string;
    isAnonymous: boolean;
    verificationLevel: 'Verified Resident' | 'Community Leader' | 'General Citizen';
    avatarUrl?: string;
  };
  createdAt: string;
  updatedAt: string;
  upvotes: number;
  userHasUpvoted?: boolean;
  confirmationsCount: number;
  mediaUrls: string[];
  voiceMemoTranscript?: string;
  evidenceGraph: EvidenceItem[];
  timeline: IssueTimelineEvent[];
  responsibleDepartment: {
    id: string;
    name: string;
    slaHours: number;
    officerInCharge: string;
  };
  proposedAction: {
    summary: string;
    estimatedCost: string;
    estimatedDays: number;
    interventionType: 'Emergency Repair' | 'Capital Infrastructure' | 'Routine Maintenance' | 'Policy Enforcement';
  };
}

export interface IssueCluster {
  id: string;
  code: string; // e.g. "CL-BLR-150-09"
  name: string;
  category: CivicCategory;
  ward: string;
  zone: string;
  centerLocation: string;
  totalReportsCount: number;
  uniqueCitizensCount: number;
  activeSince: string;
  status: 'Active Hotspot' | 'Work Scheduled' | 'Mitigation Ongoing' | 'Resolved';
  severityIndex: number; // 0 - 100
  affectedPopulationEstimate: number;
  rootCauseHypothesis: string;
  linkedIssueIds: string[];
  primaryDepartment: string;
  estimatedBudget: string;
  recommendedIntervention: string;
  urgencyMultiplier: number;
}

export interface DepartmentMetric {
  id: string;
  name: string;
  code: string;
  iconName: string;
  activeIssues: number;
  criticalClusters: number;
  avgResolutionHours: number;
  budgetAllocated: string;
  budgetSpent: string;
  resolutionRate: number; // percentage
  officerInCharge: string;
}

export interface CivicImpactSummary {
  totalIssuesProcessed: number;
  activeClustersCount: number;
  citizensEmpowered: number;
  avgTurnaroundReductionPercent: number;
  fundsOptimized: string;
  communityTrustIndex: number;
  criticalInterventionsCompleted: number;
}
