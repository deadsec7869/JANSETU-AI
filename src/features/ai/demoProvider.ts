import { 
  type CivicReportAnalysis, 
  type ReportAnalysisInput, 
  type ClusterMatchInput, 
  type ClusterMatchResult, 
  type EvidenceSummaryInput, 
  type EvidenceSummary, 
  type PriorityExplanationInput, 
  type PriorityExplanation, 
  type PolicyBriefInput, 
  type PolicyBriefResult 
} from './aiSchemas';
import { isKannadaScript, normalizeCategory } from './aiNormalizer';

export interface CivicAIProvider {
  analyzeReport(input: ReportAnalysisInput): Promise<CivicReportAnalysis>;
  matchCluster(input: ClusterMatchInput): Promise<ClusterMatchResult>;
  summarizeEvidence(input: EvidenceSummaryInput): Promise<EvidenceSummary>;
  explainPriority(input: PriorityExplanationInput): Promise<PriorityExplanation>;
  generatePolicyBrief(input: PolicyBriefInput): Promise<PolicyBriefResult>;
}

export class DemoProvider implements CivicAIProvider {
  public readonly providerName = 'demo' as const;

  async analyzeReport(input: ReportAnalysisInput): Promise<CivicReportAnalysis> {
    // Simulate brief algorithmic processing latency
    await new Promise((r) => setTimeout(r, 450));

    const text = input.text || input.audioTranscript || '';
    const isKn = isKannadaScript(text);

    let categoryStr = 'water_drainage';
    let issueTitle = 'Stormwater Drainage Inundation & Culvert Choke';
    let summaryEn = 'Citizen reports severe water stagnation and stormwater drain overflow near the service corridor during moderate rainfall.';
    let entities = ['Drainage Inundation', 'EcoSpace Corridor', 'Culvert #412', 'Commuter Access'];
    let severity = 8;
    let urgency = 9;

    if (text.toLowerCase().includes('pothole') || text.toLowerCase().includes('road') || text.toLowerCase().includes('crater') || text.includes('ರಸ್ತೆ') || text.includes('ಗುಂಡಿ')) {
      categoryStr = 'roads';
      issueTitle = 'Arterial Road Structural Bitumen Rupture';
      summaryEn = isKn
        ? 'Citizen reports dangerous deep potholes along the main carriageway disrupting vehicular flow.'
        : 'Citizen reports multiple contiguous potholes and asphalt disintegration creating hazardous transit conditions.';
      entities = ['Asphalt Disintegration', 'Pothole Crater', 'Main Carriageway'];
      severity = 7;
      urgency = 8;
    } else if (text.toLowerCase().includes('light') || text.toLowerCase().includes('dark') || text.includes('ದೀಪ') || text.includes('ಬೆಳಕು')) {
      categoryStr = 'lighting';
      issueTitle = 'Main Corridor Streetlight Power Blackout';
      summaryEn = 'Citizen reports defunct LED streetlights creating low-visibility safety hazards at pedestrian crossings.';
      entities = ['Defunct Luminaire', 'Subterranean Feeder Cable', 'Pedestrian Crossing'];
      severity = 6;
      urgency = 7;
    } else if (text.toLowerCase().includes('garbage') || text.toLowerCase().includes('waste') || text.includes('ಕಸ')) {
      categoryStr = 'waste';
      issueTitle = 'Public Solid Waste Silt Stagnation';
      summaryEn = 'Citizen reports uncollected secondary waste overflow obstructing pedestrian walkways and open drains.';
      entities = ['Secondary Waste Dump', 'Drain Grate Obstruction'];
      severity = 6;
      urgency = 6;
    } else if (isKn) {
      summaryEn = 'Citizen reports in Kannada: Stormwater drainage stagnation and arterial road flooding during recent rain spell.';
      entities = ['ಮಳೆ ನೀರು (Stormwater)', 'ಡ್ರೈನೇಜ್ (Drainage)', 'ಬೆಳ್ಳಂದೂರು (Bellandur)'];
    }

    const cat = normalizeCategory(categoryStr);

    return {
      category: cat.key,
      categoryLabel: cat.label,
      issue: issueTitle,
      summary: isKn ? text : summaryEn,
      originalLanguage: isKn ? 'kn' : 'en',
      translatedSummaryEn: summaryEn,
      severity,
      urgency,
      duration: 'Persistent (> 3 weeks)',
      locationReference: input.locationHint || 'Outer Ring Road (EcoSpace - Bellandur Junction)',
      affectedService: cat.label,
      entities,
      confidenceScore: 0.94,
      confidenceLevel: 'high',
      suggestedActionType: 'Mechanical Desilting & Automated Weir Telemetry',
      citizenFriendlyExplanation: `Your report has been analyzed under ${cat.label}. It highlights severe service disruption along key commuter corridors and joins the collective municipal evidence graph.`,
      sourceProvider: 'demo',
      latencyMs: 450,
    };
  }

  async matchCluster(input: ClusterMatchInput): Promise<ClusterMatchResult> {
    await new Promise((r) => setTimeout(r, 350));

    const analysis = input.reportAnalysis;
    const isWaterOrRoad = analysis.category === 'water_drainage' || analysis.category === 'roads';

    if (isWaterOrRoad && input.availableClusters.some((c) => c.code === 'CL-BLR-150-01')) {
      return {
        bestMatchingClusterId: 'CL-BLR-150-01',
        clusterCode: 'CL-BLR-150-01',
        matchType: 'duplicate',
        confidence: 0.94,
        confidencePercentage: 94,
        reason: 'Identical service domain (Water & Drainage), matching geographic corridor (Outer Ring Road - Bellandur), and recurring stormwater culvert siltation defect.',
        similarityScore: 0.94,
        sourceProvider: 'demo',
      };
    }

    const matched = input.availableClusters.find(
      (c) => c.category.toLowerCase().includes(analysis.categoryLabel.toLowerCase())
    );

    if (matched) {
      return {
        bestMatchingClusterId: matched.id,
        clusterCode: matched.code,
        matchType: 'related',
        confidence: 0.82,
        confidencePercentage: 82,
        reason: `Shares domain (${matched.category}) and adjacent ward catchment (${matched.name}).`,
        similarityScore: 0.82,
        sourceProvider: 'demo',
      };
    }

    return {
      bestMatchingClusterId: null,
      clusterCode: null,
      matchType: 'new_issue',
      confidence: 0.45,
      confidencePercentage: 45,
      reason: 'No existing active cluster matches this unique geographic coordinates and defect combination.',
      similarityScore: 0.45,
      sourceProvider: 'demo',
    };
  }

  async summarizeEvidence(input: EvidenceSummaryInput): Promise<EvidenceSummary> {
    await new Promise((r) => setTimeout(r, 400));

    return {
      executiveFinding: `Critical stormwater capacity deficit identified along the Outer Ring Road corridor (Cluster ${input.clusterCode}). Culvert #412 siltation has reached ${input.culvertBlockagePercent}%.`,
      evidenceSummary: `Convergence of ${input.totalReports} multimodal citizen reports (including ${input.imagesCount} geotagged photos and ${input.audioCount} Kannada/English audio recordings) corroborates chronic ${input.serviceGapPercent}% service capacity deficit.`,
      keyRisk: `High-density commuter vulnerability: ${input.affectedCommuters.toLocaleString()} daily travelers face recurrent roadway submergence and severe transit gridlock during rainfall.`,
      recommendedInterventionRationale: `Emergency mechanical desilting and automated SCADA weir telemetry will restore drain capacity to 79% design throughput, reducing commuter waterlogging risk by over 76%.`,
      multiSourceBreakdown: {
        citizenReportsCount: input.totalReports,
        photosCount: input.imagesCount,
        audioNotesCount: input.audioCount,
        culvertChokePercent: input.culvertBlockagePercent,
        serviceCapacityDeficitPercent: input.serviceGapPercent,
      },
      confidence: 0.94,
      confidenceLevel: 'High',
      sourceProvider: 'demo',
    };
  }

  async explainPriority(input: PriorityExplanationInput): Promise<PriorityExplanation> {
    await new Promise((r) => setTimeout(r, 380));

    return {
      deterministicScore: input.score,
      aiExplanation: `Priority Score ${input.score}/100 is elevated due to the convergence of heavy citizen grievance demand (312 reports), high physical culvert choke (${input.factors.severity}/100), and massive commuter exposure (${input.affectedPopulation.toLocaleString()} daily travelers) across the Outer Ring Road economic corridor.`,
      citizenExplanation: `This issue is ranked #1 in your ward because over 300 neighbors reported the same flooded drain, which blocks major bus routes and commuter paths whenever it rains.`,
      governmentExplanation: `High-ROI emergency capex justification: Allocating ₹1.45 Cr for fast-track mechanical desilting directly mitigates an 87% service capacity deficit, preventing millions in economic productivity loss across Bengaluru's primary tech corridor.`,
      factorBreakdown: {
        demandAnalysis: '312 verified citizen submissions with high multi-ward geographic density.',
        severityAnalysis: '78% cross-sectional silt blockage in Primary SWD Culvert #412.',
        vulnerabilityAnalysis: '84,000 daily commuters and critical access to EcoSpace Tech Park.',
        serviceGapAnalysis: '87% deficit between stormwater runoff volume and actual drain discharge throughput.',
      },
      ruleEngineCitations: [
        'JANSETU Deterministic Priority Model v2.4 (Eq. 3: Multi-Vector Risk Integration)',
        'Zero prior FY25-26 capital expenditure allocated to this SWD section',
      ],
      sourceProvider: 'demo',
    };
  }

  async generatePolicyBrief(input: PolicyBriefInput): Promise<PolicyBriefResult> {
    await new Promise((r) => setTimeout(r, 500));

    return {
      executiveFinding: `Zonal Engineering Brief: Concentrated stormwater infrastructure deficit along Outer Ring Road requires emergency municipal intervention (Priority ${input.priorityScore}/100).`,
      problemDefinition: `Primary SWD Culvert #412 has accumulated 420 MT of solidified construction sediment and silt, reducing design discharge capacity by ${input.evidenceData.serviceGapPercent}% and causing severe recurrent submergence outside EcoSpace Tech Park.`,
      evidenceBreakdown: {
        citizenReports: input.evidenceData.totalReports,
        imagesCount: input.evidenceData.imagesCount,
        voiceNotesCount: input.evidenceData.audioCount,
        culvertChoke: input.evidenceData.culvertBlockagePercent,
        serviceCapacityDeficit: input.evidenceData.serviceGapPercent,
      },
      priorityReasoning: `Ranked #1 in Greater Bengaluru Urban Basin based on 84,000 daily commuter exposure, ₹0 existing capex allocation, and 91% evidence confidence from 312 convergent citizen reports.`,
      recommendedAction: input.recommendedAction,
      estimatedBudget: '₹1.45 Cr',
      estimatedDuration: '18 Days',
      expectedOutcome: '76% reduction in stormwater service deficit, restoring arterial traffic throughput to 79% design standard.',
      dataLimitations: 'Synthesized from prototype municipal sensor baselines and citizen telemetry; final contractor billing governed by physical cubic meter silt extraction logs.',
      sourceStatus: 'SYNTHETIC DEMO DATA',
      sourceProvider: 'demo',
    };
  }
}
