import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/ui/Button';
import { IssueCard } from '../../components/shared/IssueCard';
import { ClusterCard } from '../../components/shared/ClusterCard';
import { CivicCanvas, CivicWorld, CivicCore, CivicPostProcessing, EvidenceGraphScene } from '../../three';
import { 
  PlusCircle, 
  Sparkles, 
  Activity, 
  Layers, 
  ArrowRight, 
  Flame, 
  TrendingUp, 
  Cpu, 
  Network 
} from 'lucide-react';


export const CitizenDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { issues, clusters, impactSummary, selectedWard, wards } = useApp();
  const [evidenceGraphOpen, setEvidenceGraphOpen] = React.useState<boolean>(false);

  // Filter issues by ward if selected
  const activeWardObj = wards.find(w => w.id === selectedWard);
  const filteredIssues = selectedWard === 'all' 
    ? issues 
    : issues.filter(i => activeWardObj && i.ward.toLowerCase().includes(activeWardObj.name.toLowerCase().split(' - ')[1] || ''));

  const criticalIssues = filteredIssues.filter(i => i.priorityLevel === 'Critical');

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Interactive 3D Hero Section */}
      {evidenceGraphOpen ? (
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 border border-cyan-500/40 shadow-2xl shadow-cyan-950/50 min-h-[580px]">
          <EvidenceGraphScene onClose={() => setEvidenceGraphOpen(false)} />
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-brand-500/30 shadow-2xl shadow-cyan-950/30 min-h-[480px] flex flex-col justify-between p-6 sm:p-10">
          
          {/* Persistent 3D WebGL Civic Core Canvas Layer */}
          <div className="absolute inset-0 z-0 pointer-events-auto opacity-85 hover:opacity-100 transition-opacity duration-300">
            <CivicCanvas cameraPosition={[0, 0, 7.2]} fov={45}>
              <CivicWorld showGrid={false} intensity={1.0} />
              <CivicCore position={[0.9, 0, 0]} scale={0.88} onSelectNode={() => setEvidenceGraphOpen(true)} />
              <CivicPostProcessing bloomIntensity={0.38} />
            </CivicCanvas>
          </div>

          {/* Ambient Gradient Mask (Constrained to left so center-right 3D Core is completely clear) */}
          <div className="absolute inset-y-0 left-0 w-full lg:w-5/12 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent z-0 pointer-events-none" />
          <div className="absolute inset-0 bg-radial-gradient opacity-30 z-0 pointer-events-none" />

          {/* Hero Content Container (Layered above 3D Canvas) */}
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pointer-events-none">
            
            {/* Left Column: Vision & Action CTAs */}
            <div className="space-y-4 max-w-md lg:max-w-lg pointer-events-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-300 font-mono text-xs font-semibold backdrop-blur-md">
                <Cpu className="w-3.5 h-3.5 text-brand-400 animate-pulse" />
                <span>Spatial Civic Intelligence Operating System</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Turn Citizen Voice into <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-teal-300 to-emerald-400">
                  Measurable Action.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                JANSETU AI continuously ingests multimodal citizen reports, computes algorithmic infrastructure risk, and transforms community voice into verified municipal engineering orders.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  icon={PlusCircle}
                  onClick={() => navigate('/report')}
                  className="shadow-glow-cyan"
                >
                  Report New Issue
                </Button>
                <Button
                  variant="glass"
                  size="lg"
                  icon={Network}
                  onClick={() => setEvidenceGraphOpen(true)}
                  className="border-cyan-500/30 text-cyan-300 hover:text-white"
                >
                  Inspect Evidence Graph
                </Button>
              </div>
            </div>

          {/* Far Right Column: Civic Signal Pulse Telemetry HUD */}
          <div className="w-full sm:w-80 lg:w-72 p-4.5 rounded-2xl bg-slate-950/85 border border-slate-800/90 backdrop-blur-xl space-y-3.5 shadow-2xl pointer-events-auto shrink-0 self-end lg:self-center">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">Civic Signal Pulse</span>
              </div>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-brand-400" />
                  Processed Reports
                </span>
                <span className="font-mono font-bold text-white">{impactSummary.totalIssuesProcessed.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-purple-400" />
                  Active Hotspot Clusters
                </span>
                <span className="font-mono font-bold text-purple-300">{clusters.length} clusters</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  Turnaround Acceleration
                </span>
                <span className="font-mono font-bold text-emerald-400">+{impactSummary.avgTurnaroundReductionPercent}% Faster</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono">
              <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                SYNTHETIC DEMO DATA
              </span>
              <span className="text-brand-400 font-semibold">8 CLUSTERS</span>
            </div>
          </div>

        </div>

        {/* Hero Bottom Telemetry Ticker */}
        <div className="relative z-10 pt-5 mt-4 border-t border-slate-800/40 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Hover over any semantic node in the 3D network to inspect clustered community reports.</span>
          </div>
          <span className="font-mono text-[11px] text-slate-500">
            PROTOTYPE PRIORITY ENGINE v2.4 • GREATER BENGALURU
          </span>
        </div>

      </div>
    )}

      {/* Critical Hotspots Banner if any */}
      {criticalIssues.length > 0 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/60 via-slate-900 to-rose-950/40 border border-rose-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-glow-rose">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 shrink-0">
              <Flame className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span>{criticalIssues.length} Critical Priority Hazards in Active Wards</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">
                  Escalated
                </span>
              </h4>
              <p className="text-xs text-slate-300">
                Drain inundations and structural road craters flagged with immediate municipal field crew dispatch recommendations.
              </p>
            </div>
          </div>

          <Button
            variant="danger"
            size="sm"
            onClick={() => navigate('/community')}
            className="shrink-0"
          >
            Review Critical Hazards
          </Button>
        </div>
      )}

      {/* Grid Section: Active Issue Clusters */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-brand-400" />
              <span>Active Neighborhood Issue Clusters</span>
            </h2>
            <p className="text-xs text-slate-400">
              How individual citizen reports are grouped by AI into unified municipal work packages.
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/community')}
            className="text-xs text-brand-400 hover:text-brand-300"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clusters.slice(0, 2).map((cluster) => (
            <ClusterCard key={cluster.id} cluster={cluster} />
          ))}
        </div>
      </div>

      {/* Grid Section: Recent Reports Stream */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              <span>Live Civic Stream & Evidence</span>
            </h2>
            <p className="text-xs text-slate-400">
              Latest citizen submissions verified with AI priority calculations.
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/community')}
            className="text-xs text-brand-400 hover:text-brand-300"
          >
            <span>Explore Community Feed</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredIssues.slice(0, 6).map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      </div>

    </div>
  );
};
