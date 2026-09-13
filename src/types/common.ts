export type UserRole = 'citizen' | 'government';
export type ThemeMode = 'dark' | 'light';

export interface NavItem {
  id: string;
  label: string;
  path: string;
  iconName: string;
  badge?: string | number;
  badgeVariant?: 'primary' | 'danger' | 'warning' | 'neutral';
}

export interface WardOption {
  id: string;
  name: string;
  zone: string;
  activeIssuesCount: number;
}
