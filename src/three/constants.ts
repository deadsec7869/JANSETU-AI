export interface CivicNodeItem {
  id: string;
  label: string;
  priority: number;
  reportsCount: number;
  color: string;
  glowColor: string;
  angle: number;
  radius: number;
  size: number;
}

/**
 * Semantic Civic Nodes Palette:
 * - WATER -> Electric Blue (#2563EB)
 * - ROADS -> Amber (#F59E0B)
 * - DRAINAGE -> Blue (#1D4ED8)
 * - LIGHTING -> Violet (#7C3AED)
 * - WASTE -> Emerald (#10B981)
 * - SAFETY -> Critical Red (#EF4444)
 * - HEALTH -> Emerald (#059669)
 * - PUBLIC SPACE -> Violet (#8B5CF6)
 */
export const SEMANTIC_NODES: CivicNodeItem[] = [
  { id: 'water', label: 'WATER', priority: 94, reportsCount: 312, color: '#2563eb', glowColor: '#60a5fa', angle: 0, radius: 3.3, size: 0.17 },
  { id: 'roads', label: 'ROADS', priority: 89, reportsCount: 246, color: '#f59e0b', glowColor: '#fbbf24', angle: (Math.PI * 2) / 8 * 1, radius: 3.5, size: 0.16 },
  { id: 'drainage', label: 'DRAINAGE', priority: 92, reportsCount: 184, color: '#1d4ed8', glowColor: '#3b82f6', angle: (Math.PI * 2) / 8 * 2, radius: 3.2, size: 0.16 },
  { id: 'lighting', label: 'LIGHTING', priority: 82, reportsCount: 128, color: '#7c3aed', glowColor: '#a78bfa', angle: (Math.PI * 2) / 8 * 3, radius: 3.4, size: 0.15 },
  { id: 'waste', label: 'WASTE', priority: 76, reportsCount: 95, color: '#10b981', glowColor: '#34d399', angle: (Math.PI * 2) / 8 * 4, radius: 3.1, size: 0.14 },
  { id: 'safety', label: 'SAFETY', priority: 96, reportsCount: 210, color: '#ef4444', glowColor: '#f87171', angle: (Math.PI * 2) / 8 * 5, radius: 3.4, size: 0.18 },
  { id: 'health', label: 'HEALTH', priority: 70, reportsCount: 64, color: '#059669', glowColor: '#10b981', angle: (Math.PI * 2) / 8 * 6, radius: 3.0, size: 0.14 },
  { id: 'public-space', label: 'PUBLIC SPACE', priority: 65, reportsCount: 42, color: '#8b5cf6', glowColor: '#c084fc', angle: (Math.PI * 2) / 8 * 7, radius: 3.2, size: 0.13 },
];
