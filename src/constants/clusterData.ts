export interface ClusterDashboard {
  name: string;
  totalKPIs: number;
  sharedKPIs: number;
  uniqueKPIs: number;
}

export interface KPIGroup {
  id: number;
  name: string;
  kpis: string[];
}

export const CLUSTER_DASHBOARDS: ClusterDashboard[] = [
  { name: 'Quarterly Sales Report v1', totalKPIs: 25, sharedKPIs: 24, uniqueKPIs: 1 },
  { name: 'Sales Performance Q3', totalKPIs: 25, sharedKPIs: 24, uniqueKPIs: 1 },
  { name: 'Regional Sales - Final', totalKPIs: 26, sharedKPIs: 23, uniqueKPIs: 3 },
  { name: 'Sales Dashboard (Copy)', totalKPIs: 24, sharedKPIs: 22, uniqueKPIs: 2 },
  { name: 'Team Sales Review', totalKPIs: 27, sharedKPIs: 22, uniqueKPIs: 5 },
];

export const SIMILARITY_MATRIX = [
  [100, 92, 92, 89, 85],
  [92, 100, 95, 91, 88],
  [92, 95, 100, 86, 82],
  [89, 91, 86, 100, 90],
  [85, 88, 82, 90, 100],
];

export const REDUNDANT_KPIS = [
  { name: 'Total Sales Revenue', count: 5 },
  { name: 'YoY Growth %', count: 5 },
  { name: 'Avg. Deal Size', count: 4 },
];

export const KPI_GROUPS: KPIGroup[] = [
  {
    id: 1,
    name: 'KPI Group 1',
    kpis: ['Total Sales Revenue', 'YoY Growth %', 'QoQ Growth %'],
  },
  {
    id: 2,
    name: 'KPI Group 2',
    kpis: ['Avg. Deal Size', 'Win Rate %', 'Sales Cycle Length (Days)'],
  },
  {
    id: 3,
    name: 'KPI Group 3',
    kpis: ['Sales by Region', 'Top Performing Region', '# of Deals by Region'],
  },
];

export const CLUSTER_INFO = {
  groupId: 2,
  groupName: 'Group 2',
  totalDashboards: 5,
  avgSimilarity: 92,
};
