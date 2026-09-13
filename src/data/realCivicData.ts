/**
 * JANSETU AI — REAL PRODUCTION CIVIC STATE DEFINITION
 * 
 * Default clean structures for genuine citizen reports, clusters, and provenance.
 * ZERO fabrication: no invented reports, no fake budgets, no fake impact percentages.
 */

import { DepartmentMetric, CivicImpactSummary, WardOption } from '../types/civic';

export const INITIAL_WARDS: WardOption[] = [
  { id: 'all', name: 'All Wards (Greater Bengaluru)', zone: 'City Wide', activeIssuesCount: 0 },
  { id: 'ward-150', name: 'Ward 150 - Bellandur', zone: 'Mahadevapura', activeIssuesCount: 0 },
  { id: 'ward-80', name: 'Ward 80 - Indiranagar', zone: 'East', activeIssuesCount: 0 },
  { id: 'ward-84', name: 'Ward 84 - Whitefield', zone: 'Mahadevapura', activeIssuesCount: 0 },
  { id: 'ward-151', name: 'Ward 151 - Koramangala', zone: 'South', activeIssuesCount: 0 },
  { id: 'ward-45', name: 'Ward 45 - Malleshwaram', zone: 'West', activeIssuesCount: 0 },
];

export const INITIAL_DEPARTMENTS: DepartmentMetric[] = [
  {
    id: 'dept-swd',
    name: 'Stormwater Drainage (SWD)',
    code: 'BBMP-SWD',
    iconName: 'Droplets',
    activeIssues: 0,
    criticalClusters: 0,
    avgResolutionHours: 24,
    budgetAllocated: 'Awaiting Official Budget Integration',
    budgetSpent: 'Awaiting Official Budget Integration',
    resolutionRate: 0,
    officerInCharge: 'Officer Designation - SWD',
  },
  {
    id: 'dept-roads',
    name: 'Major Roads & Infrastructure',
    code: 'BBMP-RDS',
    iconName: 'Navigation',
    activeIssues: 0,
    criticalClusters: 0,
    avgResolutionHours: 24,
    budgetAllocated: 'Awaiting Official Budget Integration',
    budgetSpent: 'Awaiting Official Budget Integration',
    resolutionRate: 0,
    officerInCharge: 'Officer Designation - Roads',
  },
  {
    id: 'dept-bescom',
    name: 'BESCOM Power & Lighting',
    code: 'BESCOM-URB',
    iconName: 'Zap',
    activeIssues: 0,
    criticalClusters: 0,
    avgResolutionHours: 48,
    budgetAllocated: 'Awaiting Official Budget Integration',
    budgetSpent: 'Awaiting Official Budget Integration',
    resolutionRate: 0,
    officerInCharge: 'Officer Designation - Elec',
  },
  {
    id: 'dept-swm',
    name: 'Solid Waste Management',
    code: 'BBMP-SWM',
    iconName: 'Trash2',
    activeIssues: 0,
    criticalClusters: 0,
    avgResolutionHours: 36,
    budgetAllocated: 'Awaiting Official Budget Integration',
    budgetSpent: 'Awaiting Official Budget Integration',
    resolutionRate: 0,
    officerInCharge: 'Officer Designation - SWM',
  },
  {
    id: 'dept-safety',
    name: 'Public Safety & Traffic Support',
    code: 'BTP-CIV',
    iconName: 'ShieldAlert',
    activeIssues: 0,
    criticalClusters: 0,
    avgResolutionHours: 12,
    budgetAllocated: 'Awaiting Official Budget Integration',
    budgetSpent: 'Awaiting Official Budget Integration',
    resolutionRate: 0,
    officerInCharge: 'Officer Designation - Safety',
  },
];

export const INITIAL_IMPACT_SUMMARY: CivicImpactSummary = {
  totalIssuesProcessed: 0,
  activeClustersCount: 0,
  citizensEmpowered: 0,
  avgTurnaroundReductionPercent: null,
  fundsOptimized: null,
  communityTrustIndex: null,
  criticalInterventionsCompleted: 0,
};
