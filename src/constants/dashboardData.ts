export interface DashboardGroup {
  id: number;
  name: string;
  dashboardCount: number;
  avgSimilarity: number;
  dashboards: string[];
  color: 'green' | 'yellow' | 'red';
}

export const DASHBOARD_GROUPS: DashboardGroup[] = [
  {
    id: 1,
    name: 'Group 1',
    dashboardCount: 17,
    avgSimilarity: 95,
    dashboards: [
      'Finance Overview - Q3',
      'CFO Summary',
      'Quarterly Financials V2',
      'Q3 Finance Report (Final)',
    ],
    color: 'green',
  },
  {
    id: 2,
    name: 'Group 2',
    dashboardCount: 5,
    avgSimilarity: 89,
    dashboards: [
      'Quarterly Sales Report v1',
      'Sales Performance Q3',
      'Regional Sales - Final',
    ],
    color: 'yellow',
  },
  {
    id: 3,
    name: 'Group 3',
    dashboardCount: 4,
    avgSimilarity: 88,
    dashboards: [
      'Campaign Analysis',
      'Marketing ROI Dashboard',
      'Ad Spend vs. Return',
    ],
    color: 'yellow',
  },
  {
    id: 4,
    name: 'Group 4',
    dashboardCount: 6,
    avgSimilarity: 96,
    dashboards: [
      'Warehouse Stock Levels',
      'Inventory Overview',
      'Daily Stock Report',
      'Inventory Tracker v4',
    ],
    color: 'green',
  },
  {
    id: 5,
    name: 'Group 5',
    dashboardCount: 3,
    avgSimilarity: 85,
    dashboards: [
      'Employee Headcount',
      'HR Attrition Analysis',
      'Headcount by Dept',
    ],
    color: 'yellow',
  },
  {
    id: 6,
    name: 'Group 6',
    dashboardCount: 8,
    avgSimilarity: 93,
    dashboards: [
      'Customer Satisfaction Q3',
      'NPS Dashboard',
      'Customer Feedback Analysis',
      'Service Quality Metrics',
    ],
    color: 'green',
  },
];

export const DASHBOARD_STATS = {
  totalDashboards: 1240,
  totalGroups: 38,
  totalScanned: 1240,
  avgRedundancy: 22,
};
