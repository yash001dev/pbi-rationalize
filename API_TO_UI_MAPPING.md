# API to UI Field Mapping Guide

## Overview
This document explains how backend API data fields are mapped and displayed in the UI.

---

## Backend API Structure

The backend provides similarity data in the following format:

```typescript
interface ReportSimilarity {
  cluster: number;                           // Cluster/Group ID
  report_name_1: string;                     // First report name
  report_name_2: string;                     // Second report name
  final_similarity_percent: number;          // Similarity percentage (0-100)
  measure_count_report_1: number;            // Total KPIs in Report 1
  measure_count_report_2: number;            // Total KPIs in Report 2
  semantic_common_measures_count: number;    // Shared KPIs between reports
  semantic_unique_measures_report_1: number; // Unique KPIs in Report 1
  semantic_unique_measures_report_2: number; // Unique KPIs in Report 2
}
```

---

## UI Mapping

### 1. Dashboard/Home Page (GroupCard)

| UI Element | API Source | Description |
|------------|------------|-------------|
| Group Name | `cluster` | "Cluster {cluster}" |
| Dashboard Count | Count of unique reports in cluster | Number of reports |
| Avg Similarity | Average of `final_similarity_percent` | Average similarity % |
| Dashboard List | `report_name_1`, `report_name_2` | First 4 report names |

### 2. Cluster View - Comparison Matrix

#### Matrix Cells (Similarity %)

| Position | Value | API Source |
|----------|-------|------------|
| Diagonal (i,i) | 100% | Hardcoded (same report) |
| Off-diagonal (i,j) | Similarity % | `final_similarity_percent` (rounded) |
| Symmetric | (i,j) = (j,i) | Same comparison data |

**Example Matrix:**
```
           Report A  Report B  Report C
Report A      100%      85%       70%
Report B      85%       100%      60%
Report C      70%       60%       100%
```

#### Report Statistics Columns

| Column Header | API Field | Display Logic |
|---------------|-----------|---------------|
| **Total KPIs** | `measure_count_report_1` or `measure_count_report_2` | Shows total number of KPIs/measures in the report |
| **Shared** | `semantic_common_measures_count` | Maximum shared KPIs across all comparisons |
| **Unique** | `semantic_unique_measures_report_1` or `semantic_unique_measures_report_2` | KPIs unique to this report only |

### 3. Comparison Page (Report A vs Report B)

| UI Element | API Field | Description |
|------------|-----------|-------------|
| Similarity Score | `final_similarity_percent` | Overall similarity percentage |
| Report 1 Queries | `measure_count_report_1` | Total KPIs in first report |
| Report 2 Queries | `measure_count_report_2` | Total KPIs in second report |
| Similar Queries | `semantic_common_measures_count` | Shared KPIs |
| Missing in Report 1 | `semantic_unique_measures_report_2` | KPIs in Report 2 but not in Report 1 |
| Missing in Report 2 | `semantic_unique_measures_report_1` | KPIs in Report 1 but not in Report 2 |

---

## Transformation Functions

### File: `src/constants/dataTransformUtils.ts`

#### Key Functions:

1. **`transformToDashboardGroups()`**
   - Creates group cards for home page
   - Calculates average similarity per cluster

2. **`transformToClusterDashboards(clusterId)`**
   - Extracts Total, Shared, Unique KPIs for each report
   - Maps API fields to ClusterDashboard interface

3. **`buildSimilarityMatrix(clusterId)`**
   - Creates symmetric N×N matrix
   - Diagonal = 100%, Off-diagonal = similarity %

4. **`getReportComparison(report1, report2)`**
   - Gets detailed comparison metrics
   - Handles bidirectional lookup

---

## Data Validation

### Formula Check
For each report comparison, this should always be true:

```
measure_count_report_1 = semantic_common_measures_count + semantic_unique_measures_report_1
measure_count_report_2 = semantic_common_measures_count + semantic_unique_measures_report_2
```

**Example:**
```json
{
  "measure_count_report_1": 56,
  "measure_count_report_2": 48,
  "semantic_common_measures_count": 42,
  "semantic_unique_measures_report_1": 14,  // 42 + 14 = 56 ✓
  "semantic_unique_measures_report_2": 6    // 42 + 6 = 48 ✓
}
```

---

## UI Components

### HeatmapCell Component
```tsx
<HeatmapCell value={similarity} />
```
- Input: Similarity percentage (0-100)
- Display: Colored cell with darker shade for < 90%

### Tooltips
- **Column Headers**: Show API field names
- **Data Cells**: Show full metric details
- **Report Names**: Show complete name on hover

---

## Example Data Flow

### 1. Backend API Call
```
GET /api/report-similarity
```

### 2. Data Import
```typescript
// src/constants/reportSimilarityData.ts
export const REPORT_SIMILARITY_DATA: ReportSimilarity[] = [...]
```

### 3. Transform
```typescript
// src/constants/dataTransformUtils.ts
const matrix = buildSimilarityMatrix(clusterId);
const dashboards = transformToClusterDashboards(clusterId);
```

### 4. Display
```tsx
// src/pages/ClusterView.tsx
<HeatmapCell value={matrix[i][j]} />
<div>{dashboard.totalKPIs}</div>  // from measure_count_report
<div>{dashboard.sharedKPIs}</div>  // from semantic_common_measures_count
<div>{dashboard.uniqueKPIs}</div>  // from semantic_unique_measures_report
```

---

## Quick Reference

| What You See | Backend Field |
|--------------|---------------|
| Cluster 0 | `cluster: 0` |
| Report Name | `report_name_1` or `report_name_2` |
| 85% in matrix | `final_similarity_percent: 85.5` |
| Total KPIs: 56 | `measure_count_report_1: 56` |
| Shared: 42 | `semantic_common_measures_count: 42` |
| Unique: 14 | `semantic_unique_measures_report_1: 14` |

---

## Development Notes

- All transformations happen in `dataTransformUtils.ts`
- Raw API data is never modified, only transformed
- Matrix is always symmetric
- Diagonal is always 100%
- Missing comparisons show 0%
