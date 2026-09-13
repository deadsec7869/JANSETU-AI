import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  type ActionStatus, 
  type WorkOrderData, 
  type DemoNotification, 
  type VerificationFeedback,
  CANONICAL_WORK_ORDER, 
  DEMO_NOTIFICATIONS_SEED 
} from '../data/actionWorkflowData';

interface ActionContextType {
  workOrder: WorkOrderData;
  status: ActionStatus;
  notifications: DemoNotification[];
  unreadNotificationsCount: number;
  approveIntervention: () => void;
  requestReview: (notes?: string) => void;
  advanceWorkflowStage: () => void;
  resetDemoWorkflow: () => void;
  setStageDirectly: (stage: ActionStatus) => void;
  submitCitizenVerification: (rating: 'improved' | 'partially' | 'not_yet', comment: string, citizenName?: string) => void;
  markNotificationRead: (id: string) => void;
  activeStepIndex: number;
}

const STAGE_ORDER: ActionStatus[] = [
  'identified',
  'prioritized',
  'awaiting_review',
  'approved',
  'assigned',
  'in_progress',
  'completed',
  'verified',
];

const ActionContext = createContext<ActionContextType | undefined>(undefined);

export const ActionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workOrder, setWorkOrder] = useState<WorkOrderData>(() => {
    const saved = localStorage.getItem('jansetu_work_order');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return CANONICAL_WORK_ORDER;
      }
    }
    return CANONICAL_WORK_ORDER;
  });

  const [notifications, setNotifications] = useState<DemoNotification[]>(() => {
    const saved = localStorage.getItem('jansetu_demo_notifs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEMO_NOTIFICATIONS_SEED;
      }
    }
    return DEMO_NOTIFICATIONS_SEED;
  });

  useEffect(() => {
    localStorage.setItem('jansetu_work_order', JSON.stringify(workOrder));
  }, [workOrder]);

  useEffect(() => {
    localStorage.setItem('jansetu_demo_notifs', JSON.stringify(notifications));
  }, [notifications]);

  const activeStepIndex = STAGE_ORDER.indexOf(workOrder.status);

  // Approve Recommended Intervention
  const approveIntervention = useCallback(() => {
    setWorkOrder((prev) => ({
      ...prev,
      status: 'approved',
      approvedAt: new Date().toISOString(),
      milestones: prev.milestones.map((m, idx) => {
        if (idx === 0) return { ...m, status: 'completed', progressPercent: 100 };
        if (idx === 1) return { ...m, status: 'in_progress', progressPercent: 30 };
        return m;
      }),
    }));

    // Add new instant demo notification
    const newNotif: DemoNotification = {
      id: `notif-${Date.now()}`,
      title: 'Work Order Approved & Funded',
      message: 'Executive review passed: ₹1.45 Cr authorized for WO-BLR-150-001 (Bellandur SWD Desilting).',
      stage: 'approved',
      timestamp: 'Just now',
      isRead: false,
      linkTo: '/gov/projects',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  }, []);

  // Request Administrative Review / Revision
  const requestReview = useCallback((_notes?: string) => {
    setWorkOrder((prev) => ({
      ...prev,
      status: 'awaiting_review',
    }));
  }, []);

  // Advance to next stage in the state machine
  const advanceWorkflowStage = useCallback(() => {
    setWorkOrder((prev) => {
      const currIdx = STAGE_ORDER.indexOf(prev.status);
      if (currIdx >= STAGE_ORDER.length - 1) return prev;
      const nextStatus = STAGE_ORDER[currIdx + 1];

      // Update milestone progression
      let updatedMilestones = [...prev.milestones];
      if (nextStatus === 'assigned') {
        updatedMilestones = updatedMilestones.map((m, idx) => (idx <= 1 ? { ...m, status: 'completed', progressPercent: 100 } : m));
      } else if (nextStatus === 'in_progress') {
        updatedMilestones = updatedMilestones.map((m, idx) => (idx <= 3 ? { ...m, status: 'completed', progressPercent: 100 } : m));
      } else if (nextStatus === 'completed' || nextStatus === 'verified') {
        updatedMilestones = updatedMilestones.map((m) => ({ ...m, status: 'completed', progressPercent: 100 }));
      }

      return {
        ...prev,
        status: nextStatus,
        milestones: updatedMilestones,
        completedAt: nextStatus === 'completed' || nextStatus === 'verified' ? new Date().toISOString() : prev.completedAt,
      };
    });
  }, []);

  // Jump directly to a specific stage (for judges / testing)
  const setStageDirectly = useCallback((stage: ActionStatus) => {
    setWorkOrder((prev) => {
      const targetIdx = STAGE_ORDER.indexOf(stage);
      const updatedMilestones = prev.milestones.map((m, idx) => {
        if (idx < targetIdx) return { ...m, status: 'completed', progressPercent: 100 } as const;
        if (idx === targetIdx) return { ...m, status: 'in_progress', progressPercent: 65 } as const;
        return { ...m, status: 'pending', progressPercent: 0 } as const;
      });

      return {
        ...prev,
        status: stage,
        milestones: updatedMilestones,
      };
    });
  }, []);

  // Reset entire Demo Workflow for repeated evaluation
  const resetDemoWorkflow = useCallback(() => {
    setWorkOrder({
      ...CANONICAL_WORK_ORDER,
      status: 'awaiting_review',
      milestones: CANONICAL_WORK_ORDER.milestones.map((m, idx) => {
        if (idx === 0) return { ...m, status: 'pending', progressPercent: 0 };
        return { ...m, status: 'pending', progressPercent: 0 };
      }),
    });
    setNotifications(DEMO_NOTIFICATIONS_SEED);
    localStorage.removeItem('jansetu_work_order');
    localStorage.removeItem('jansetu_demo_notifs');
  }, []);

  // Citizen Ground Truth Verification Submission
  const submitCitizenVerification = useCallback(
    (rating: 'improved' | 'partially' | 'not_yet', comment: string, citizenName = 'You (Verified Citizen)') => {
      const newFeedback: VerificationFeedback = {
        id: `fb-${Date.now()}`,
        citizenName,
        rating,
        comment: comment || (rating === 'improved' ? 'Drainage overflow cleared; traffic movement is smooth.' : 'Work is progressing.'),
        timestamp: 'Just now',
        verifiedLocation: 'ORR Bellandur EcoSpace Corridor',
      };

      setWorkOrder((prev) => {
        const total = prev.verification.totalResponses + 1;
        let improved = prev.verification.improvedPercent;
        if (rating === 'improved') {
          improved = Math.min(98, improved + 1);
        }

        return {
          ...prev,
          status: 'verified',
          verification: {
            ...prev.verification,
            totalResponses: total,
            improvedPercent: improved,
            feedbacks: [newFeedback, ...prev.verification.feedbacks],
          },
        };
      });

      // Add feedback notification
      const notif: DemoNotification = {
        id: `notif-${Date.now()}`,
        title: 'Community Verification Recorded',
        message: `Your verification feedback was incorporated. 86% of community members confirm significant drainage improvement.`,
        stage: 'verified',
        timestamp: 'Just now',
        isRead: false,
        linkTo: '/gov/impact',
      };
      setNotifications((prev) => [notif, ...prev]);
    },
    []
  );

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  }, []);

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  return (
    <ActionContext.Provider
      value={{
        workOrder,
        status: workOrder.status,
        notifications,
        unreadNotificationsCount,
        approveIntervention,
        requestReview,
        advanceWorkflowStage,
        resetDemoWorkflow,
        setStageDirectly,
        submitCitizenVerification,
        markNotificationRead,
        activeStepIndex,
      }}
    >
      {children}
    </ActionContext.Provider>
  );
};

export const useAction = (): ActionContextType => {
  const context = useContext(ActionContext);
  if (!context) {
    throw new Error('useAction must be used within an ActionProvider');
  }
  return context;
};
