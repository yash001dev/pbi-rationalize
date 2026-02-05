# Data Integration Guide

## Overview
This document explains how the backend report similarity data has been integrated into the application and how to use it.

## File Structure

### 1. `reportSimilarityData.ts`
Contains the raw backend data with the `REPORT_SIMILARITY_DATA` array.

**Data Structure:**
```typescript
interface ReportSimilarity {
  cluster: number;
  report_name_1: string;
  report_name_2: string;
  final_similarity_%: number;
  measure_count_report_1: number;
  measure_count_report_2: number;
  semantic_common_measures_count: number;
  semantic_unique_measures_report_1: number;
  semantic_unique_measures_report_2: number;
}
```

### 2. `dataTransformUtils.ts`
Utility functions that transform the raw backend data into formats used by the application.

**Key Functions:**

#### Cluster Operations
- `getUniqueClusters()` - Get all unique cluster IDs
- `getReportsByCluster(clusterId)` - Get all reports in a cluster
- `getClusterAverageSimilarity(clusterId)` - Calculate average similarity for a cluster

#### Dashboard Operations
- `transformToDashboardGroups()` - Convert data to `DashboardGroup[]` format
- `getDashboardStats()` - Calculate overall statistics

#### Cluster View Operations
- `transformToClusterDashboards(clusterId)` - Get cluster dashboards with KPI counts
- `buildSimilarityMatrix(clusterId)` - Build similarity matrix for a cluster
- `getRedundantMeasures(clusterId)` - Get redundant measures analysis

#### Comparison Operations
- `getReportComparison(report1, report2)` - Get comparison metrics between two reports
- `getReportComparisons(reportName)` - Get all comparisons for a specific report

#### Search/Filter Operations
- `findHighSimilarityReports(threshold)` - Find reports with similarity above threshold
- `getUniqueReports()` - Get all unique report names

### 3. Updated Constant Files

#### `dashboardData.ts`
Now uses `transformToDashboardGroups()` and `getDashboardStats()` to provide real data.

**Usage:**
```typescript
import { DASHBOARD_GROUPS, DASHBOARD_STATS } from '../constants/dashboardData';

// DASHBOARD_GROUPS now contains all clusters from backend data
// DASHBOARD_STATS now contains calculated statistics
```

#### `clusterData.ts`
Provides functions to get cluster-specific data dynamically.

**Usage:**
```typescript
import {
  getClusterDashboards,
  getSimilarityMatrix,
  getRedundantKPIs,
  getClusterInfo
} from '../constants/clusterData';

// Get data for a specific cluster
const clusterDashboards = getClusterDashboards(clusterId);
const similarityMatrix = getSimilarityMatrix(clusterId);
const redundantKPIs = getRedundantKPIs(clusterId);
const clusterInfo = getClusterInfo(clusterId);
```

#### `comparisonData.ts`
Provides a function to get comparison data between any two reports.

**Usage:**
```typescript
import { getComparisonData } from '../constants/comparisonData';

// Get comparison between two specific reports
const comparison = getComparisonData('Report A', 'Report B');
```

## Usage Examples

### Example 1: Display All Clusters
```typescript
import { DASHBOARD_GROUPS } from '../constants/dashboardData';

function DashboardList() {
  return (
    <div>
      {DASHBOARD_GROUPS.map((group) => (
        <div key={group.id}>
          <h3>{group.name}</h3>
          <p>Reports: {group.dashboardCount}</p>
          <p>Avg Similarity: {group.avgSimilarity}%</p>
        </div>
      ))}
    </div>
  );
}
```

### Example 2: View Specific Cluster Details
```typescript
import { 
  getClusterDashboards, 
  getSimilarityMatrix 
} from '../constants/clusterData';

function ClusterDetails({ clusterId }: { clusterId: number }) {
  const dashboards = getClusterDashboards(clusterId);
  const matrix = getSimilarityMatrix(clusterId);
  
  return (
    <div>
      <h2>Cluster {clusterId}</h2>
      {dashboards.map((dashboard) => (
        <div key={dashboard.name}>
          <h4>{dashboard.name}</h4>
          <p>Total KPIs: {dashboard.totalKPIs}</p>
          <p>Shared: {dashboard.sharedKPIs}</p>
          <p>Unique: {dashboard.uniqueKPIs}</p>
        </div>
      ))}
    </div>
  );
}
```

### Example 3: Compare Two Reports
```typescript
import { getComparisonData } from '../constants/comparisonData';

function ReportComparison() {
  const comparison = getComparisonData(
    'Affine Org Utilization Report',
    'Affine Org_test_visual (1)'
  );
  
  return (
    <div>
      <h3>Comparing:</h3>
      <p>{comparison.report1Name} vs {comparison.report2Name}</p>
      <p>Similarity: {comparison.metrics.similarityScore}%</p>
      <p>Common Measures: {comparison.metrics.similarQueries}</p>
      <p>Unique to Report 1: {comparison.metrics.missingInReport2}</p>
      <p>Unique to Report 2: {comparison.metrics.missingInReport1}</p>
    </div>
  );
}
```

### Example 4: Find High Similarity Reports
```typescript
import { findHighSimilarityReports } from '../constants/dataTransformUtils';

function HighSimilarityReports() {
  const highSimilarity = findHighSimilarityReports(90); // 90% threshold
  
  return (
    <div>
      <h3>Potential Duplicate Reports (>90% similarity)</h3>
      {highSimilarity.map((item, idx) => (
        <div key={idx}>
          <p>{item.report_name_1} ↔ {item.report_name_2}</p>
          <p>Similarity: {item['final_similarity_%']}%</p>
        </div>
      ))}
    </div>
  );
}
```

### Example 5: Dynamic Cluster Selection
```typescript
import { getUniqueClusters } from '../constants/dataTransformUtils';
import { getClusterDashboards } from '../constants/clusterData';
import { useState } from 'react';

function ClusterSelector() {
  const clusters = getUniqueClusters();
  const [selectedCluster, setSelectedCluster] = useState(clusters[0]);
  const dashboards = getClusterDashboards(selectedCluster);
  
  return (
    <div>
      <select 
        value={selectedCluster} 
        onChange={(e) => setSelectedCluster(Number(e.target.value))}
      >
        {clusters.map((clusterId) => (
          <option key={clusterId} value={clusterId}>
            Cluster {clusterId}
          </option>
        ))}
      </select>
      
      <div>
        <h3>Reports in Cluster {selectedCluster}</h3>
        {dashboards.map((dashboard) => (
          <div key={dashboard.name}>{dashboard.name}</div>
        ))}
      </div>
    </div>
  );
}
```

## Data Summary

Based on the backend data provided:

- **Total Unique Reports:** 39
- **Total Clusters:** 8 (clusters 0, 1, 5, 6, 7, 8, 9, 10)
- **Total Comparisons:** 88 report pairs
- **Highest Similarity:** 100% (Revenue Opportunities_test_visual vs Revenue Opportunities)
- **Key Clusters:**
  - Cluster 0: 2 reports (Affine Org reports)
  - Cluster 1: 3 reports (Artistri reports)
  - Cluster 6: 4 reports (Life expectancy reports)
  - Cluster 7: 8 reports (Manufacturing reports)
  - Cluster 9: 12 reports (Sales/Superstore reports)

## Benefits

1. **Real Data:** Application now uses actual backend data instead of mock data
2. **Type Safety:** All data transformations are type-safe
3. **Flexibility:** Easy to query data by cluster, report, or similarity threshold
4. **Maintainability:** Single source of truth for backend data
5. **Extensibility:** Easy to add new transformation functions as needed

## Updating Data

To update with new backend data:

1. Replace the array in `src/constants/reportSimilarityData.ts` with the new data
2. All existing functionality will automatically use the new data
3. No changes needed to components or other constant files

## API Reference

See `dataTransformUtils.ts` for complete function signatures and documentation.
