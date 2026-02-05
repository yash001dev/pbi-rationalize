import {
  transformToClusterDashboards,
  buildSimilarityMatrix,
  getRedundantMeasures,
  getClusterAverageSimilarity,
  getReportsByCluster,
} from './dataTransformUtils';

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

/**
 * Get cluster dashboards for a specific cluster
 * @param clusterId - The cluster ID to get dashboards for (default: 0)
 */
export function getClusterDashboards(clusterId: number = 0): ClusterDashboard[] {
  return transformToClusterDashboards(clusterId);
}

/**
 * Get similarity matrix for a specific cluster
 * @param clusterId - The cluster ID to get matrix for (default: 0)
 */
export function getSimilarityMatrix(clusterId: number = 0): number[][] {
  return buildSimilarityMatrix(clusterId);
}

/**
 * Get redundant KPIs for a specific cluster
 * @param clusterId - The cluster ID to analyze (optional)
 */
export function getRedundantKPIs(clusterId?: number) {
  return getRedundantMeasures(clusterId);
}

// Default export for cluster 0 (first cluster)
export const CLUSTER_DASHBOARDS: ClusterDashboard[] = getClusterDashboards(0);
export const SIMILARITY_MATRIX: number[][] = getSimilarityMatrix(0);
export const REDUNDANT_KPIS = getRedundantKPIs(0);

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

/**
 * Get cluster information
 * @param clusterId - The cluster ID to get info for (default: 0)
 */
export function getClusterInfo(clusterId: number = 0) {
  const reports = getReportsByCluster(clusterId);
  const avgSimilarity = getClusterAverageSimilarity(clusterId);
  
  return {
    groupId: clusterId,
    groupName: `Cluster ${clusterId}`,
    totalDashboards: reports.length,
    avgSimilarity,
  };
}

export const CLUSTER_INFO = getClusterInfo(0);
