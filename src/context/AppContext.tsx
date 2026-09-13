import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, ThemeMode } from '../types/common';
import { CivicIssue, IssueCluster, DepartmentMetric, CivicImpactSummary, WardOption } from '../types/civic';
import { MOCK_ISSUES, MOCK_CLUSTERS, MOCK_DEPARTMENTS, MOCK_IMPACT_SUMMARY, MOCK_WARDS } from '../data/mockCivicData';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  issues: CivicIssue[];
  clusters: IssueCluster[];
  departments: DepartmentMetric[];
  impactSummary: CivicImpactSummary;
  wards: WardOption[];
  selectedWard: string;
  setSelectedWard: (wardId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  submitNewReport: (newIssue: CivicIssue) => void;
  toggleUpvote: (issueId: string) => void;
  confirmIssue: (issueId: string) => void;
  getIssueById: (issueId: string) => CivicIssue | undefined;
  getClusterById: (clusterId: string) => IssueCluster | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('citizen');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [issues, setIssues] = useState<CivicIssue[]>(MOCK_ISSUES);
  const [clusters, setClusters] = useState<IssueCluster[]>(MOCK_CLUSTERS);
  const [departments] = useState<DepartmentMetric[]>(MOCK_DEPARTMENTS);
  const [impactSummary, setImpactSummary] = useState<CivicImpactSummary>(MOCK_IMPACT_SUMMARY);
  const [wards] = useState<WardOption[]>(MOCK_WARDS);
  const [selectedWard, setSelectedWard] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    // Apply dark mode class to HTML element
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const submitNewReport = (newIssue: CivicIssue) => {
    setIssues(prev => [newIssue, ...prev]);

    // Update impact summary counter
    setImpactSummary(prev => ({
      ...prev,
      totalIssuesProcessed: prev.totalIssuesProcessed + 1,
      citizensEmpowered: prev.citizensEmpowered + 1,
    }));

    // Update cluster count if linked
    if (newIssue.clusterId) {
      setClusters(prev => prev.map(c => {
        if (c.id === newIssue.clusterId) {
          return {
            ...c,
            totalReportsCount: c.totalReportsCount + 1,
            linkedIssueIds: [...c.linkedIssueIds, newIssue.id],
          };
        }
        return c;
      }));
    }
  };

  const toggleUpvote = (issueId: string) => {
    setIssues(prev => prev.map(issue => {
      if (issue.id === issueId) {
        const isUpvoted = !!issue.userHasUpvoted;
        return {
          ...issue,
          userHasUpvoted: !isUpvoted,
          upvotes: isUpvoted ? Math.max(0, issue.upvotes - 1) : issue.upvotes + 1,
        };
      }
      return issue;
    }));
  };

  const confirmIssue = (issueId: string) => {
    setIssues(prev => prev.map(issue => {
      if (issue.id === issueId) {
        return {
          ...issue,
          confirmationsCount: issue.confirmationsCount + 1,
          evidenceGraph: [
            ...issue.evidenceGraph,
            {
              id: `ev-confirm-${Date.now()}`,
              type: 'citizen_verification',
              title: 'Additional Citizen Confirmation',
              description: 'Local resident verified persistent issue on ground.',
              timestamp: 'Just now',
              verified: true,
            }
          ]
        };
      }
      return issue;
    }));
  };

  const getIssueById = (issueId: string) => {
    return issues.find(i => i.id === issueId || i.code === issueId);
  };

  const getClusterById = (clusterId: string) => {
    return clusters.find(c => c.id === clusterId || c.code === clusterId);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        theme,
        toggleTheme,
        issues,
        clusters,
        departments,
        impactSummary,
        wards,
        selectedWard,
        setSelectedWard,
        searchQuery,
        setSearchQuery,
        submitNewReport,
        toggleUpvote,
        confirmIssue,
        getIssueById,
        getClusterById,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
