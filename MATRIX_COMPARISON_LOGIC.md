# Dashboard Comparison Matrix Logic

## Overview
The Cluster View page displays a symmetric comparison matrix showing similarity percentages between all reports in a cluster, along with detailed KPI statistics for each report.

## API Field Mapping

The backend provides the following data fields for each report comparison:

| API Field Name | Display As | Description |
|----------------|------------|-------------|
| `measure_count_report_1` | Total KPIs (Report 1) | Total number of KPIs/measures in Report 1 |
| `measure_count_report_2` | Total KPIs (Report 2) | Total number of KPIs/measures in Report 2 |
| `semantic_common_measures_count` | Shared KPIs | Number of KPIs that are common between both reports |
| `semantic_unique_measures_report_1` | Unique KPIs (Report 1) | Number of KPIs unique to Report 1 only |
| `semantic_unique_measures_report_2` | Unique KPIs (Report 2) | Number of KPIs unique to Report 2 only |
| `final_similarity_percent` | Similarity % | Overall similarity percentage between reports |

## Matrix Columns Explained

In the ClusterView matrix, each report row displays:

1. **Total KPIs**: From `measure_count_report_1` or `measure_count_report_2`
   - The total count of all KPIs/measures in that specific report
   
2. **Shared**: From `semantic_common_measures_count`
   - KPIs that are semantically similar/common with other reports in the cluster
   - Shows the maximum shared count across all comparisons
   
3. **Unique**: From `semantic_unique_measures_report_1` or `semantic_unique_measures_report_2`
   - KPIs that are unique to this report and not found in compared reports

4. **Action**: Link to detailed comparison view

## Data Flow Example

### Backend API Response
```json
{
  "cluster": 0,
  "report_name_1": "Sales Dashboard",
  "report_name_2": "Revenue Report",
  "final_similarity_percent": 85.5,
  "measure_count_report_1": 56,      // Total KPIs in Sales Dashboard
  "measure_count_report_2": 48,      // Total KPIs in Revenue Report
  "semantic_common_measures_count": 42,  // Shared KPIs between both
  "semantic_unique_measures_report_1": 14,  // Unique to Sales Dashboard
  "semantic_unique_measures_report_2": 6    // Unique to Revenue Report
}
```

### UI Display

**For "Sales Dashboard" row:**
- Total KPIs: **56** (from `measure_count_report_1`)
- Shared: **42** (from `semantic_common_measures_count`)
- Unique: **14** (from `semantic_unique_measures_report_1`)

**For "Revenue Report" row:**
- Total KPIs: **48** (from `measure_count_report_2`)
- Shared: **42** (from `semantic_common_measures_count`)
- Unique: **6** (from `semantic_unique_measures_report_2`)

**In Matrix Cell [Sales Dashboard, Revenue Report]:**
- Similarity: **86%** (rounded from `final_similarity_percent`)

### Validation Formula
For each report, this should be true:
```
Total KPIs = Shared KPIs + Unique KPIs
56 = 42 + 14 ✓ (Sales Dashboard)
48 = 42 + 6  ✓ (Revenue Report)
```

## Matrix Rules

### Scenario 1: Same Report (Diagonal)
When comparing a report with itself (row and column are the same):
```
if row1 report name: "Report A"
if col1 report name: "Report A"
then matrix[row1, col1] = 100%
```
**Result**: All diagonal cells show 100% similarity

### Scenario 2: Different Reports (Symmetric)
When comparing different reports, the matrix is symmetric:
```
if row1 report name: "Report A"
if col2 report name: "Report B"
Both have similarity: 50%

then:
  matrix[row1, col2] = 50%  (Report A vs Report B)
  matrix[row2, col1] = 50%  (Report B vs Report A)
```
**Result**: Similarity values are mirrored across the diagonal

## Implementation Details

### Data Source
- Raw data: `src/constants/reportSimilarityData.ts` (from backend)
- Transform function: `buildSimilarityMatrix()` in `dataTransformUtils.ts`

### Matrix Construction
```typescript
export function buildSimilarityMatrix(clusterId: number): number[][] {
  const reports = getReportsByCluster(clusterId);
  const matrix: number[][] = [];
  
  for (let i = 0; i < reports.length; i++) {
    matrix[i] = [];
    for (let j = 0; j < reports.length; j++) {
      if (i === j) {
        // Scenario 1: Same report (diagonal)
        matrix[i][j] = 100;
      } else {
        // Scenario 2: Different reports (symmetric lookup)
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
```

## Visual Representation

### Example Matrix for 3 Reports

|              | Report A | Report B | Report C |
|--------------|----------|----------|----------|
| **Report A** | 100%     | 85%      | 70%      |
| **Report B** | 85%      | 100%     | 60%      |
| **Report C** | 70%      | 60%      | 100%     |

### Features:
- **Diagonal (100%)**: Report vs itself is always 100%
- **Symmetry**: matrix[i][j] = matrix[j][i]
- **Color Coding**: 
  - High similarity (≥90%): Light color
  - Low similarity (<90%): Darker color
  - Visual emphasis on potential redundancy

## Component Usage

### ClusterView Component
```typescript
const clusterId = parseInt(groupId);
const clusterReports = getReportsByCluster(clusterId);
const similarityMatrix = getSimilarityMatrix(clusterId);

// Render matrix
{similarityMatrix.flat().map((value, index) => (
  <HeatmapCell key={index} value={value} />
))}
```

### Dynamic Rendering
- **Rows**: Full report names on the left
- **Columns**: Full report names at the top (truncated if needed)
- **Cells**: Colored based on similarity percentage
- **Responsive**: Grid adjusts based on number of reports

## Data Flow

1. **Backend** → `report_similarity_percent.json`
2. **Import** → `reportSimilarityData.ts`
3. **Transform** → `buildSimilarityMatrix()` creates symmetric matrix
4. **Display** → `ClusterView.tsx` renders with `HeatmapCell` components

## Key Functions

- `getReportsByCluster(clusterId)`: Get all reports in a cluster
- `getSimilarityMatrix(clusterId)`: Get the comparison matrix
- `buildSimilarityMatrix(clusterId)`: Build symmetric matrix with 100% diagonal

## Notes

- Matrix is always **square** (N×N for N reports)
- Matrix is always **symmetric** (mirrored across diagonal)
- Diagonal is always **100%** (perfect self-similarity)
- Missing comparisons show **0%** (no data)
