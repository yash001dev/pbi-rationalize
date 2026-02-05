import { transformToDashboardGroups, getDashboardStats } from './dataTransformUtils';

export interface DashboardGroup {
  id: number;
  name: string;
  dashboardCount: number;
  avgSimilarity: number;
  dashboards: string[];
  color: 'green' | 'yellow' | 'red';
}

// Use real backend data transformed to the required format
export const DASHBOARD_GROUPS: DashboardGroup[] = transformToDashboardGroups();

// Calculate stats from real backend data
export const DASHBOARD_STATS = getDashboardStats();
