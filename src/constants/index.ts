/**
 * Central export file for all data constants and utilities
 * Import from this file to access backend data and transformation functions
 */

// Raw backend data
export { REPORT_SIMILARITY_DATA } from './reportSimilarityData';
export type { ReportSimilarity } from './reportSimilarityData';

// Transformation utilities
export {
  getUniqueClusters,
  getUniqueReports,
  getReportsByCluster,
  getClusterAverageSimilarity,
  transformToDashboardGroups,
  getDashboardStats,
  transformToClusterDashboards,
  getReportComparison,
  buildSimilarityMatrix,
  getRedundantMeasures,
  getReportComparisons,
  findHighSimilarityReports,
} from './dataTransformUtils';

// Dashboard data
export { DASHBOARD_GROUPS, DASHBOARD_STATS } from './dashboardData';
export type { DashboardGroup } from './dashboardData';

// Cluster data
export {
  CLUSTER_DASHBOARDS,
  SIMILARITY_MATRIX,
  REDUNDANT_KPIS,
  KPI_GROUPS,
  CLUSTER_INFO,
  getClusterDashboards,
  getSimilarityMatrix,
  getRedundantKPIs,
  getClusterInfo,
} from './clusterData';
export type { ClusterDashboard, KPIGroup } from './clusterData';

// Comparison data
export { COMPARISON_DATA, getComparisonData } from './comparisonData';
export type { ComparisonMetrics, DAXQuery } from './comparisonData';
