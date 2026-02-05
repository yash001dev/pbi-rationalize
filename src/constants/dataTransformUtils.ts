/**
 * Data transformation utilities
 * Transforms backend report similarity data into formats used by the application
 */

import { REPORT_SIMILARITY_DATA } from './reportSimilarityData';
import type { ReportSimilarity } from './reportSimilarityData';
import type { DashboardGroup } from './dashboardData';
import type { ClusterDashboard } from './clusterData';
import type { ComparisonMetrics } from './comparisonData';

/**
 * Get unique cluster IDs from the similarity data
 */
export function getUniqueClusters(): number[] {
  const clusters = new Set(REPORT_SIMILARITY_DATA.map((item) => item.cluster));
  return Array.from(clusters).sort((a, b) => a - b);
}

/**
 * Get all unique report names from the similarity data
 */
export function getUniqueReports(): string[] {
  const reports = new Set<string>();
  REPORT_SIMILARITY_DATA.forEach((item) => {
    reports.add(item.report_name_1);
    reports.add(item.report_name_2);
  });
  return Array.from(reports).sort();
}

/**
 * Get all reports in a specific cluster
 */
export function getReportsByCluster(clusterId: number): string[] {
  const reports = new Set<string>();
  REPORT_SIMILARITY_DATA.filter((item) => item.cluster === clusterId).forEach((item) => {
    reports.add(item.report_name_1);
    reports.add(item.report_name_2);
  });
  return Array.from(reports);
}

/**
 * Calculate average similarity for a cluster
 */
export function getClusterAverageSimilarity(clusterId: number): number {
  const clusterData = REPORT_SIMILARITY_DATA.filter((item) => item.cluster === clusterId);
  if (clusterData.length === 0) return 0;
  
  const totalSimilarity = clusterData.reduce((sum, item) => sum + item.final_similarity_percent, 0);
  return Math.round(totalSimilarity / clusterData.length);
}

/**
 * Get similarity color based on percentage
 */
function getSimilarityColor(similarity: number): 'green' | 'yellow' | 'red' {
  if (similarity >= 80) return 'green';
  if (similarity >= 50) return 'yellow';
  return 'red';
}

/**
 * Transform report similarity data into DashboardGroup format
 */
export function transformToDashboardGroups(): DashboardGroup[] {
  const clusters = getUniqueClusters();
  
  return clusters.map((clusterId) => {
    const reports = getReportsByCluster(clusterId);
    const avgSimilarity = getClusterAverageSimilarity(clusterId);
    
    return {
      id: clusterId,
      name: `Cluster ${clusterId}`,
      dashboardCount: reports.length,
      avgSimilarity,
      dashboards: reports.slice(0, 4), // Show first 4 for preview
      color: getSimilarityColor(avgSimilarity),
    };
  });
}

/**
 * Get total statistics from the data
 */
export function getDashboardStats() {
  const uniqueReports = getUniqueReports();
  const clusters = getUniqueClusters();
  const totalComparisons = REPORT_SIMILARITY_DATA.length;
  
  // Calculate average redundancy (reports with high similarity)
  const highSimilarityPairs = REPORT_SIMILARITY_DATA.filter(
    (item) => item.final_similarity_percent >= 70
  ).length;
  const avgRedundancy = Math.round((highSimilarityPairs / totalComparisons) * 100);
  
  return {
    totalDashboards: uniqueReports.length,
    totalGroups: clusters.length,
    totalScanned: uniqueReports.length,
    avgRedundancy,
  };
}

/**
 * Transform cluster data into ClusterDashboard format
 * API Field Mapping:
 * - measure_count_report_1 → Total KPIs in Report 1
 * - measure_count_report_2 → Total KPIs in Report 2
 * - semantic_common_measures_count → Shared KPIs between reports
 * - semantic_unique_measures_report_1 → Unique KPIs in Report 1
 * - semantic_unique_measures_report_2 → Unique KPIs in Report 2
 */
export function transformToClusterDashboards(clusterId: number): ClusterDashboard[] {
  const reports = getReportsByCluster(clusterId);
  const clusterData = REPORT_SIMILARITY_DATA.filter((item) => item.cluster === clusterId);
  
  return reports.map((reportName) => {
    // Find all comparisons involving this report
    const reportComparisons = clusterData.filter(
      (item) => item.report_name_1 === reportName || item.report_name_2 === reportName
    );
    
    if (reportComparisons.length === 0) {
      return {
        name: reportName,
        totalKPIs: 0,
        sharedKPIs: 0,
        uniqueKPIs: 0,
      };
    }
    
    // Get Total KPIs from API fields:
    // - measure_count_report_1: Total KPIs in report 1
    // - measure_count_report_2: Total KPIs in report 2
    const reportData = reportComparisons[0];
    const totalKPIs = 
      reportData.report_name_1 === reportName
        ? reportData.measure_count_report_1  // Total KPI for this report
        : reportData.measure_count_report_2; // Total KPI for this report
    
    // Get Shared KPIs from API field: semantic_common_measures_count
    // This represents KPIs that are common between reports
    // We take the maximum shared KPIs across all comparisons
    const sharedKPIs = Math.max(
      ...reportComparisons.map((item) => item.semantic_common_measures_count)
    );
    
    // Get Unique KPIs from API fields:
    // - semantic_unique_measures_report_1: Unique KPIs in report 1
    // - semantic_unique_measures_report_2: Unique KPIs in report 2
    const uniqueKPIs =
      reportData.report_name_1 === reportName
        ? reportData.semantic_unique_measures_report_1  // Unique KPIs in this report
        : reportData.semantic_unique_measures_report_2; // Unique KPIs in this report
    
    return {
      name: reportName,
      totalKPIs,    // From measure_count_report_1 or measure_count_report_2
      sharedKPIs,   // From semantic_common_measures_count
      uniqueKPIs,   // From semantic_unique_measures_report_1 or semantic_unique_measures_report_2
    };
  });
}

/**
 * Get comparison data between two specific reports
 */
export function getReportComparison(report1: string, report2: string): ComparisonMetrics | null {
  const comparison = REPORT_SIMILARITY_DATA.find(
    (item) =>
      (item.report_name_1 === report1 && item.report_name_2 === report2) ||
      (item.report_name_1 === report2 && item.report_name_2 === report1)
  );
  
  if (!comparison) return null;
  
  const isReport1First = comparison.report_name_1 === report1;
  
  return {
    similarityScore: Math.round(comparison.final_similarity_percent),
    report1Queries: isReport1First
      ? comparison.measure_count_report_1
      : comparison.measure_count_report_2,
    report2Queries: isReport1First
      ? comparison.measure_count_report_2
      : comparison.measure_count_report_1,
    totalUniqueQueries:
      comparison.measure_count_report_1 +
      comparison.measure_count_report_2 -
      comparison.semantic_common_measures_count,
    similarQueries: comparison.semantic_common_measures_count,
    dissimilarQueries:
      comparison.semantic_unique_measures_report_1 +
      comparison.semantic_unique_measures_report_2,
    missingInReport1: isReport1First
      ? comparison.semantic_unique_measures_report_2
      : comparison.semantic_unique_measures_report_1,
    missingInReport2: isReport1First
      ? comparison.semantic_unique_measures_report_1
      : comparison.semantic_unique_measures_report_2,
  };
}

/**
 * Build similarity matrix for reports in a cluster
 */
export function buildSimilarityMatrix(clusterId: number): number[][] {
  const reports = getReportsByCluster(clusterId);
  const matrix: number[][] = [];
  
  for (let i = 0; i < reports.length; i++) {
    matrix[i] = [];
    for (let j = 0; j < reports.length; j++) {
      if (i === j) {
        matrix[i][j] = 100; // Self-similarity is 100%
      } else {
        const comparison = REPORT_SIMILARITY_DATA.find(
          (item) =>
            (item.report_name_1 === reports[i] && item.report_name_2 === reports[j]) ||
            (item.report_name_1 === reports[j] && item.report_name_2 === reports[i])
        );
        matrix[i][j] = comparison ? Math.round(comparison.final_similarity_percent) : 0;
      }
    }
  }
  
  return matrix;
}

/**
 * Get redundant measures (measures that appear in multiple reports)
 */
export function getRedundantMeasures(clusterId?: number) {
  const dataToAnalyze = clusterId
    ? REPORT_SIMILARITY_DATA.filter((item) => item.cluster === clusterId)
    : REPORT_SIMILARITY_DATA;
  
  // Group by common measure counts
  const measureGroups = new Map<number, number>();
  
  dataToAnalyze.forEach((item) => {
    const count = item.semantic_common_measures_count;
    if (count > 0) {
      measureGroups.set(count, (measureGroups.get(count) || 0) + 1);
    }
  });
  
  // Convert to array and sort by frequency
  return Array.from(measureGroups.entries())
    .map(([count, frequency]) => ({
      name: `Common measures (${count} measures)`,
      count: frequency,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Top 10
}

/**
 * Get all comparisons for a specific report
 */
export function getReportComparisons(reportName: string): ReportSimilarity[] {
  return REPORT_SIMILARITY_DATA.filter(
    (item) => item.report_name_1 === reportName || item.report_name_2 === reportName
  );
}

/**
 * Find reports with high similarity (potential duplicates)
 */
export function findHighSimilarityReports(threshold: number = 90): ReportSimilarity[] {
  return REPORT_SIMILARITY_DATA.filter((item) => item.final_similarity_percent >= threshold);
}
