import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { DEMO_STAGES, DemoStageConfig } from './demoState';

interface DemoContextType {
  isDemoActive: boolean;
  currentStageIndex: number;
  currentStage: DemoStageConfig;
  totalStages: number;
  startDemo: () => void;
  exitDemo: () => void;
  nextStage: () => void;
  prevStage: () => void;
  goToStage: (index: number) => void;
  resetDemoData: () => void;
  isOverlayCollapsed: boolean;
  setIsOverlayCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDemoActive, setIsDemoActive] = useState<boolean>(() => {
    return sessionStorage.getItem('jansetu_demo_active') === 'true';
  });
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(() => {
    const saved = sessionStorage.getItem('jansetu_demo_stage');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [isOverlayCollapsed, setIsOverlayCollapsed] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { setRole } = useApp();

  const currentStage = DEMO_STAGES[currentStageIndex] || DEMO_STAGES[0];
  const totalStages = DEMO_STAGES.length;

  const syncStageState = useCallback((index: number) => {
    const target = DEMO_STAGES[index];
    if (!target) return;

    setCurrentStageIndex(index);
    sessionStorage.setItem('jansetu_demo_stage', index.toString());
    sessionStorage.setItem('jansetu_demo_active', 'true');

    // Automatically switch role and navigate if active
    setRole(target.targetRole);
    if (location.pathname !== target.targetRoute && location.pathname !== '/demo') {
      navigate(target.targetRoute);
    }
  }, [setRole, navigate, location.pathname]);

  const startDemo = useCallback(() => {
    setIsDemoActive(true);
    sessionStorage.setItem('jansetu_demo_active', 'true');
    syncStageState(0);
    navigate(DEMO_STAGES[0].targetRoute);
  }, [syncStageState, navigate]);

  const exitDemo = useCallback(() => {
    setIsDemoActive(false);
    sessionStorage.removeItem('jansetu_demo_active');
  }, []);

  const nextStage = useCallback(() => {
    if (currentStageIndex < totalStages - 1) {
      const nextIdx = currentStageIndex + 1;
      setCurrentStageIndex(nextIdx);
      sessionStorage.setItem('jansetu_demo_stage', nextIdx.toString());
      const nextConfig = DEMO_STAGES[nextIdx];
      setRole(nextConfig.targetRole);
      navigate(nextConfig.targetRoute);
    } else {
      // Completed last stage
      navigate('/demo');
    }
  }, [currentStageIndex, totalStages, setRole, navigate]);

  const prevStage = useCallback(() => {
    if (currentStageIndex > 0) {
      const prevIdx = currentStageIndex - 1;
      setCurrentStageIndex(prevIdx);
      sessionStorage.setItem('jansetu_demo_stage', prevIdx.toString());
      const prevConfig = DEMO_STAGES[prevIdx];
      setRole(prevConfig.targetRole);
      navigate(prevConfig.targetRoute);
    }
  }, [currentStageIndex, setRole, navigate]);

  const goToStage = useCallback((index: number) => {
    if (index >= 0 && index < totalStages) {
      setIsDemoActive(true);
      sessionStorage.setItem('jansetu_demo_active', 'true');
      setCurrentStageIndex(index);
      sessionStorage.setItem('jansetu_demo_stage', index.toString());
      const stageConfig = DEMO_STAGES[index];
      setRole(stageConfig.targetRole);
      navigate(stageConfig.targetRoute);
    }
  }, [totalStages, setRole, navigate]);

  const resetDemoData = useCallback(() => {
    // Clear session storage and local state
    sessionStorage.removeItem('jansetu_demo_active');
    sessionStorage.removeItem('jansetu_demo_stage');
    sessionStorage.removeItem('jansetu_active_action_order');
    setCurrentStageIndex(0);
    setIsDemoActive(false);
    setRole('citizen');
    navigate('/demo');
  }, [setRole, navigate]);

  // Keyboard navigation for demo presentation mode (ArrowRight, ArrowLeft, Escape, R)
  useEffect(() => {
    if (!isDemoActive && location.pathname !== '/demo') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input/textarea
      const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (targetTag === 'input' || targetTag === 'textarea' || targetTag === 'select') {
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextStage();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevStage();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        exitDemo();
      } else if (e.key === 'r' || e.key === 'R') {
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          resetDemoData();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDemoActive, location.pathname, nextStage, prevStage, exitDemo, resetDemoData]);

  return (
    <DemoContext.Provider
      value={{
        isDemoActive,
        currentStageIndex,
        currentStage,
        totalStages,
        startDemo,
        exitDemo,
        nextStage,
        prevStage,
        goToStage,
        resetDemoData,
        isOverlayCollapsed,
        setIsOverlayCollapsed,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = (): DemoContextType => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};
