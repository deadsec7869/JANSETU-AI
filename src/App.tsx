import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';

// Citizen Pages
import { CitizenDashboard } from './pages/citizen/CitizenDashboard';
import { ReportIssuePage } from './pages/citizen/ReportIssuePage';
import { MyReportsPage } from './pages/citizen/MyReportsPage';
import { CommunityFeedPage } from './pages/citizen/CommunityFeedPage';
import { CitizenAIAssistantPage } from './pages/citizen/CitizenAIAssistantPage';

// Government Pages
import { GovOverviewPage } from './pages/government/GovOverviewPage';
import { PriorityMapPlaceholder } from './pages/government/PriorityMapPlaceholder';
import { IssueClustersPage } from './pages/government/IssueClustersPage';
import { EvidenceGraphPlaceholder } from './pages/government/EvidenceGraphPlaceholder';
import { ProjectsPage } from './pages/government/ProjectsPage';
import { ImpactPage } from './pages/government/ImpactPage';
import { PolicyBriefPage } from './pages/government/PolicyBriefPage';

// Shared Pages
import { IssueDetailPage } from './pages/shared/IssueDetailPage';
import { NotFoundPage } from './pages/shared/NotFoundPage';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        {/* Citizen Routes */}
        <Route index element={<CitizenDashboard />} />
        <Route path="report" element={<ReportIssuePage />} />
        <Route path="my-reports" element={<MyReportsPage />} />
        <Route path="community" element={<CommunityFeedPage />} />
        <Route path="ai-assistant" element={<CitizenAIAssistantPage />} />
        <Route path="priority" element={<PriorityMapPlaceholder />} />
        <Route path="evidence" element={<EvidenceGraphPlaceholder />} />

        {/* Government Routes */}
        <Route path="gov" element={<GovOverviewPage />} />
        <Route path="gov/priority-map" element={<PriorityMapPlaceholder />} />
        <Route path="gov/clusters" element={<IssueClustersPage />} />
        <Route path="gov/evidence" element={<EvidenceGraphPlaceholder />} />
        <Route path="gov/projects" element={<ProjectsPage />} />
        <Route path="gov/impact" element={<ImpactPage />} />
        <Route path="gov/policy-brief" element={<PolicyBriefPage />} />

        {/* Shared Issue Detail */}
        <Route path="issue/:id" element={<IssueDetailPage />} />

        {/* Fallback 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
