import { CivicCategory, CivicIssue, PriorityLevel } from '../types/civic';
import { TEST_CLUSTERS } from '../data/testCivicData';

export interface StructuredIssueResult {
  issue: CivicIssue;
  clusterMatch?: {
    clusterId: string;
    clusterName: string;
    similarityScore: number;
    totalLinkedCount: number;
  };
  detectedEntities: {
    primarySubject: string;
    hazardKeywords: string[];
    urgencyIndicator: string;
  };
}

export function simulateAIIntelligence(params: {
  description: string;
  category: CivicCategory;
  locationAddress: string;
  ward: string;
  mediaUrls?: string[];
  voiceTranscript?: string;
}): StructuredIssueResult {
  const { description, category, locationAddress, ward, mediaUrls = [], voiceTranscript } = params;
  const combinedText = `${description} ${voiceTranscript || ''}`.toLowerCase();

  // Keyword hazard extraction
  const hazardKeywords: string[] = [];
  if (combinedText.includes('flood') || combinedText.includes('water') || combinedText.includes('drain')) hazardKeywords.push('Hydro-hazard', 'Water Inundation');
  if (combinedText.includes('pothole') || combinedText.includes('accident') || combinedText.includes('crater')) hazardKeywords.push('Road Structural Failure', 'Vehicle Skid Hazard');
  if (combinedText.includes('light') || combinedText.includes('dark') || combinedText.includes('blackout')) hazardKeywords.push('Nocturnal Blind Spot', 'Pedestrian Vulnerability');
  if (combinedText.includes('garbage') || combinedText.includes('smell') || combinedText.includes('waste')) hazardKeywords.push('Bio-waste Accumulation', 'Drain Block Risk');
  if (combinedText.includes('spark') || combinedText.includes('wire') || combinedText.includes('shock')) hazardKeywords.push('High-Voltage Arc Hazard');

  if (hazardKeywords.length === 0) {
    hazardKeywords.push('Civic Disruption', 'Public Quality-of-Life');
  }

  // Priority Calculation Simulation
  let safetyScore = 65;
  let economicScore = 55;
  let affectedPop = 1200;
  let repeatFactor = 1;

  if (combinedText.includes('emergency') || combinedText.includes('urgent') || combinedText.includes('accident') || combinedText.includes('deep') || combinedText.includes('severe')) {
    safetyScore += 25;
    economicScore += 20;
    affectedPop += 2500;
  }
  if (ward.includes('Bellandur') || ward.includes('Whitefield')) {
    affectedPop += 1800;
    economicScore += 15;
  }

  const overallScore = Math.min(98, Math.round((safetyScore * 0.45) + (economicScore * 0.3) + ((affectedPop / 1000) * 0.5) + (repeatFactor * 2)));

  let priorityLevel: PriorityLevel = 'Medium';
  if (overallScore >= 85) priorityLevel = 'Critical';
  else if (overallScore >= 70) priorityLevel = 'High';
  else if (overallScore >= 50) priorityLevel = 'Medium';
  else priorityLevel = 'Low';

  // Cluster matching
  let matchedCluster = TEST_CLUSTERS.find(c => c.category === category || c.ward.includes(ward.split('-')[0].trim()));
  if (!matchedCluster && TEST_CLUSTERS.length > 0) {
    matchedCluster = TEST_CLUSTERS[0];
  }

  // Department assignment
  let dept = {
    id: 'dept-roads',
    name: 'BBMP Major Roads & Infrastructure',
    slaHours: 48,
    officerInCharge: 'Er. S. Manjunatha',
  };

  let interventionType: 'Emergency Repair' | 'Capital Infrastructure' | 'Routine Maintenance' | 'Policy Enforcement' = 'Routine Maintenance';
  let estimatedCost = 'Awaiting Municipal Assessment';
  let estimatedDays = 3;

  if (category === 'Water & Drainage') {
    dept = {
      id: 'dept-swd',
      name: 'BBMP Stormwater Drainage Division',
      slaHours: 24,
      officerInCharge: 'Er. Rajesh Kulkarni',
    };
    interventionType = 'Emergency Repair';
    estimatedCost = 'Awaiting Municipal Assessment';
    estimatedDays = 2;
  } else if (category === 'Electricity & Lighting') {
    dept = {
      id: 'dept-bescom',
      name: 'BESCOM Urban Distribution Wing',
      slaHours: 24,
      officerInCharge: 'N. S. Venkatesh',
    };
    interventionType = 'Routine Maintenance';
    estimatedCost = 'Awaiting Municipal Assessment';
    estimatedDays = 1;
  } else if (category === 'Waste Management') {
    dept = {
      id: 'dept-swm',
      name: 'BBMP Solid Waste Management (SWM)',
      slaHours: 36,
      officerInCharge: 'Dr. Ramesh Babu',
    };
    interventionType = 'Routine Maintenance';
    estimatedCost = 'Awaiting Municipal Assessment';
    estimatedDays = 1;
  } else if (category === 'Public Safety') {
    dept = {
      id: 'dept-safety',
      name: 'BBMP & Bangalore Traffic Police Civic Wing',
      slaHours: 12,
      officerInCharge: 'ACP V. Chandrashekar',
    };
    interventionType = 'Emergency Repair';
    estimatedCost = 'Awaiting Municipal Assessment';
    estimatedDays = 1;
  }

  const randomSuffix = Math.floor(100 + Math.random() * 900);
  const issueId = `JS-REAL-${randomSuffix}`;

  // Title generation
  const generatedTitle = description.length > 60 
    ? `${description.slice(0, 58).trim()}...` 
    : description;

  const nowIso = new Date().toISOString();

  const issue: CivicIssue = {
    id: issueId,
    code: issueId,
    title: generatedTitle,
    description,
    category,
    subcategory: `${category} Incident Report`,
    ward: ward || 'Ward 150 - Bellandur',
    zone: 'Bengaluru Urban',
    locationAddress: locationAddress || 'Local Ward Sector, Bengaluru',
    coordinates: {
      lat: 12.9279 + (Math.random() - 0.5) * 0.05,
      lng: 77.6271 + (Math.random() - 0.5) * 0.05,
    },
    status: 'reported',
    priorityLevel,
    priorityScore: {
      overallScore,
      safetyRisk: safetyScore,
      affectedPopulation: affectedPop,
      repeatFactor,
      economicImpact: economicScore,
      vulnerabilityWeight: 1.2,
      explanation: `Multi-factor AI assessment: ${safetyScore}% safety risk factor with estimated impact on ~${affectedPop.toLocaleString()} residents in ${ward}.`,
    },
    aiConfidence: Math.floor(88 + Math.random() * 8),
    clusterId: matchedCluster?.id,
    clusterName: matchedCluster?.name,
    reporter: {
      name: 'You (Citizen Reporter)',
      isAnonymous: false,
      verificationLevel: 'Verified Resident',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    },
    createdAt: nowIso,
    updatedAt: nowIso,
    upvotes: 1,
    userHasUpvoted: true,
    confirmationsCount: 1,
    mediaUrls: mediaUrls.length > 0 ? mediaUrls : [],
    voiceMemoTranscript: voiceTranscript,
    provenance: {
      source: 'Multimodal Citizen Submission',
      sourceType: 'citizen_submission',
      createdAt: nowIso,
      verificationStatus: 'unverified',
      confidence: 0.9,
    },
    evidenceGraph: [
      {
        id: `ev-new-${Date.now()}`,
        type: 'citizen_verification',
        title: 'Initial Citizen Ingestion',
        description: `Visual & textual evidence submitted via JANSETU mobile web interface.`,
        timestamp: 'Just now',
        verified: true,
        provenance: {
          source: 'Citizen Submission',
          sourceType: 'citizen_submission',
          createdAt: nowIso,
          verificationStatus: 'verified',
        }
      }
    ],
    timeline: [
      {
        id: `tl-new-1`,
        stage: 'Reported',
        timestamp: 'Just now',
        title: 'Citizen Report Filed',
        description: 'Received via JANSETU AI multimodal ingestion pipe.',
        actor: 'Citizen Reporter',
        actorRole: 'Citizen',
      },
      {
        id: `tl-new-2`,
        stage: 'AI Triaged',
        timestamp: 'Just now',
        title: 'JANSETU AI Structured Analysis',
        description: `Categorized under ${category} with Priority Level ${priorityLevel} (${overallScore}/100).`,
        actor: 'JANSETU AI Engine',
        actorRole: 'AI Engine',
      }
    ],
    responsibleDepartment: dept,
    proposedAction: {
      summary: `Automated dispatch recommendation: Rapid inspection by ${dept.name} crew followed by ${interventionType.toLowerCase()} intervention.`,
      estimatedCost,
      estimatedDays,
      interventionType,
    },
  };

  return {
    issue,
    clusterMatch: matchedCluster ? {
      clusterId: matchedCluster.id,
      clusterName: matchedCluster.name,
      similarityScore: 92,
      totalLinkedCount: matchedCluster.totalReportsCount + 1,
    } : undefined,
    detectedEntities: {
      primarySubject: category,
      hazardKeywords,
      urgencyIndicator: priorityLevel,
    },
  };
}
