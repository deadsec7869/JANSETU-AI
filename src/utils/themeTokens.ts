/**
 * JANSETU AI — CENTRALIZED THEME TOKENS
 * 
 * Master Color System & Transparent Design Tokens
 * 
 * Color Philosophy:
 * - Electric Blue (#2563EB): Infrastructure, intelligence, primary interaction
 * - Violet (#7C3AED): AI, evidence, advanced analytics, clusters
 * - Emerald (#10B981): Resolved, verified, positive civic impact
 * - Amber (#F59E0B): Attention, scheduled, pending, medium priority
 * - Critical Red (#EF4444): Critical hazards, urgent escalation
 */

export const CIVIC_COLORS = {
  // Primary Electric Blue (Infrastructure & Interaction)
  primary: '#2563EB',
  primaryLight: '#60A5FA',
  primaryDark: '#1D4ED8',
  primaryDim: 'rgba(37, 99, 235, 0.08)',
  primaryGlow: 'rgba(37, 99, 235, 0.25)',

  // Violet (AI, Evidence & Advanced Analytics)
  violet: '#7C3AED',
  violetLight: '#A78BFA',
  violetDark: '#6D28D9',
  violetDim: 'rgba(124, 58, 237, 0.08)',
  violetGlow: 'rgba(124, 58, 237, 0.25)',

  // Emerald (Resolved & Verified Impact)
  emerald: '#10B981',
  emeraldLight: '#34D399',
  emeraldDark: '#059669',
  emeraldDim: 'rgba(16, 185, 129, 0.08)',
  emeraldGlow: 'rgba(16, 185, 129, 0.25)',

  // Amber (Attention & Scheduled Work)
  amber: '#F59E0B',
  amberLight: '#FBBF24',
  amberDark: '#D97706',
  amberDim: 'rgba(245, 158, 11, 0.08)',

  // Critical Red (Urgent Hazard Only)
  criticalRed: '#EF4444',
  redLight: '#F87171',
  redDark: '#DC2626',
  redDim: 'rgba(239, 68, 68, 0.06)',
  redBorder: 'rgba(239, 68, 68, 0.22)',

  // Neutrals & Editorial Typography
  white: '#FFFFFF',
  softWhite: '#F8FAFC',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#64748B',

  // Borders & Glass
  border: 'rgba(15, 23, 42, 0.08)',
  borderStrong: 'rgba(15, 23, 42, 0.16)',
  borderDark: 'rgba(255, 255, 255, 0.10)',
} as const;

export const CIVIC_LIGHT_THEME = {
  background: 'transparent',
  surface: 'rgba(255, 255, 255, 0.65)',
  surfaceElevated: 'rgba(255, 255, 255, 0.85)',
  surfaceSolid: '#FFFFFF',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#64748B',
  border: 'rgba(15, 23, 42, 0.08)',
  borderStrong: 'rgba(15, 23, 42, 0.16)',
  shadow: '0 20px 60px rgba(15, 23, 42, 0.06)',
  shadowElevated: '0 30px 80px rgba(15, 23, 42, 0.09)',
} as const;

export const CIVIC_DARK_THEME = {
  background: 'transparent',
  surface: 'rgba(15, 23, 42, 0.72)',
  surfaceElevated: 'rgba(30, 41, 59, 0.85)',
  surfaceSolid: '#070B14',
  textPrimary: '#F8FAFC',
  textSecondary: '#CBD5E1',
  textMuted: '#94A3B8',
  border: 'rgba(255, 255, 255, 0.10)',
  borderStrong: 'rgba(255, 255, 255, 0.18)',
  shadow: '0 20px 60px rgba(0, 0, 0, 0.40)',
  shadowElevated: '0 30px 80px rgba(0, 0, 0, 0.55)',
} as const;
