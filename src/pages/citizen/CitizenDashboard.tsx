import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EvidenceGraphScene } from '../../three';
import {
  Hero,
  HeroMetrics,
  HowItWorksBento,
  WhyJansetu,
  EvidencePreview,
  PriorityPreview,
  ImpactTimeline,
  FinalCTA,
  Footer,
} from '../../components/home';

export const CitizenDashboard: React.FC = () => {
  const { impactSummary, clusters } = useApp();
  const [evidenceGraphOpen, setEvidenceGraphOpen] = useState<boolean>(false);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
      
      {/* Interactive 3D Evidence Graph Overlay if Opened */}
      {evidenceGraphOpen ? (
        <div className="relative overflow-hidden rounded-3xl bg-transparent border border-blue-500/30 shadow-2xl min-h-[640px] my-6">
          <EvidenceGraphScene onClose={() => setEvidenceGraphOpen(false)} />
        </div>
      ) : (
        <>
          {/* 1. Hero Section (Typography + 3D Civic Core + Aceternity Spotlight) */}
          <Hero onExploreEvidence={() => setEvidenceGraphOpen(true)} />

          {/* 2. Micro Metrics Strip (Whitespace + Clean stats) */}
          <HeroMetrics
            totalReports={impactSummary.totalIssuesProcessed || 1420}
            activeClusters={clusters.length || 4}
            topPriority={94}
            turnaroundPercent={impactSummary.avgTurnaroundReductionPercent || 46.5}
          />

          {/* 3. How JANSETU Works (6-Card Bento Grid + Card Spotlight) */}
          <HowItWorksBento />

          {/* 4. Why JANSETU (Large editorial statement + 3 Pillars) */}
          <WhyJansetu />

          {/* 5. Evidence Preview (Why was this priority #1? + Tracing Beam) */}
          <EvidencePreview onOpenEvidenceGraph={() => setEvidenceGraphOpen(true)} />

          {/* 6. Deterministic Priority Engine (94/100 + Factor Bars) */}
          <PriorityPreview />

          {/* 7. Impact Timeline (From Signal to Impact 6-stage flow) */}
          <ImpactTimeline />

          {/* 8. Final Call to Action */}
          <FinalCTA />

          {/* 9. Minimal Footer */}
          <Footer />
        </>
      )}

    </div>
  );
};

export default CitizenDashboard;
