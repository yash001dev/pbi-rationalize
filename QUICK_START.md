# Quick Start Guide - Using Backend Data

## 🚀 Getting Started in 5 Minutes

### Option 1: Use the Demo Component

1. Add the route to your app:
```typescript
// In your router configuration
import DataExamples from './components/DataExamples';

// Add route:
<Route path="/examples" element={<DataExamples />} />
```

2. Visit `/examples` to see all 6 interactive examples

### Option 2: Update Existing Pages

#### Update Dashboard Page
```typescript
// src/pages/Dashboard.tsx
import { DASHBOARD_GROUPS, DASHBOARD_STATS } from '../constants';

// These now contain real backend data!
console.log(DASHBOARD_STATS.totalDashboards); // 39 actual reports
console.log(DASHBOARD_GROUPS.length); // 8 actual clusters
```

#### Update Cluster View Page
```typescript
// src/pages/ClusterView.tsx
import { getClusterDashboards, getSimilarityMatrix } from '../constants';

// Get data for a specific cluster (e.g., cluster 0)
const dashboards = getClusterDashboards(0);
const matrix = getSimilarityMatrix(0);
```

#### Update Comparison Page
```typescript
// src/pages/Comparison.tsx
import { getReportComparison, getUniqueReports } from '../constants';

// Get all available reports
const reports = getUniqueReports();

// Compare two reports
const comparison = getReportComparison(
  'Affine Org Utilization Report',
  'Affine Org_test_visual (1)'
);
```

### Option 3: Build Custom Queries

```typescript
import {
  getUniqueClusters,
  getReportsByCluster,
  findHighSimilarityReports,
  getClusterAverageSimilarity,
} from '../constants';

// Find all clusters
const clusters = getUniqueClusters();
// Result: [0, 1, 5, 6, 7, 8, 9, 10]

// Get reports in cluster 6 (Life expectancy reports)
const cluster6Reports = getReportsByCluster(6);
// Result: ['Life expectancy new_visual_test_removed', 'Life expectancy new_visual_test', ...]

// Find potential duplicates (≥95% similarity)
const duplicates = findHighSimilarityReports(95);
// Result: Array of report pairs with high similarity

// Get average similarity for cluster 6
const avgSim = getClusterAverageSimilarity(6);
// Result: 94 (%)
```

## 📋 Common Use Cases

### 1. Display All Clusters
```typescript
import { DASHBOARD_GROUPS } from '../constants';

function ClusterList() {
  return (
    <div>
      {DASHBOARD_GROUPS.map(cluster => (
        <div key={cluster.id}>
          <h3>Cluster {cluster.id}</h3>
          <p>{cluster.dashboardCount} reports</p>
          <p>{cluster.avgSimilarity}% average similarity</p>
        </div>
      ))}
    </div>
  );
}
```

### 2. Show Reports in a Cluster
```typescript
import { getClusterDashboards } from '../constants';

function ClusterReports({ clusterId }) {
  const dashboards = getClusterDashboards(clusterId);
  
  return (
    <ul>
      {dashboards.map(dashboard => (
        <li key={dashboard.name}>
          {dashboard.name} - {dashboard.totalKPIs} KPIs
        </li>
      ))}
    </ul>
  );
}
```

### 3. Compare Two Reports
```typescript
import { getReportComparison } from '../constants';

function CompareReports({ report1, report2 }) {
  const comparison = getReportComparison(report1, report2);
  
  if (!comparison) {
    return <p>No comparison available</p>;
  }
  
  return (
    <div>
      <h3>Similarity: {comparison.similarityScore}%</h3>
      <p>Common measures: {comparison.similarQueries}</p>
      <p>Unique to {report1}: {comparison.missingInReport2}</p>
      <p>Unique to {report2}: {comparison.missingInReport1}</p>
    </div>
  );
}
```

### 4. Find Duplicates
```typescript
import { findHighSimilarityReports } from '../constants';

function DuplicateFinder() {
  const duplicates = findHighSimilarityReports(90);
  
  return (
    <div>
      <h3>Potential Duplicates (≥90% similarity)</h3>
      {duplicates.map((item, idx) => (
        <div key={idx}>
          <p>{item.report_name_1} ↔ {item.report_name_2}</p>
          <p>Similarity: {item.final_similarity_percent}%</p>
        </div>
      ))}
    </div>
  );
}
```

### 5. Cluster Selector with Stats
```typescript
import { useState } from 'react';
import { 
  getUniqueClusters, 
  getReportsByCluster,
  getClusterAverageSimilarity 
} from '../constants';

function ClusterSelector() {
  const clusters = getUniqueClusters();
  const [selectedCluster, setSelectedCluster] = useState(clusters[0]);
  
  const reports = getReportsByCluster(selectedCluster);
  const avgSim = getClusterAverageSimilarity(selectedCluster);
  
  return (
    <div>
      <select onChange={(e) => setSelectedCluster(Number(e.target.value))}>
        {clusters.map(id => (
          <option key={id} value={id}>Cluster {id}</option>
        ))}
      </select>
      <p>{reports.length} reports, {avgSim}% avg similarity</p>
    </div>
  );
}
```

## 🎨 Styling Tips

### Color-code by Similarity
```typescript
function getColorClass(similarity: number) {
  if (similarity >= 80) return 'bg-green-100 text-green-800';
  if (similarity >= 50) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
}

// Usage:
<div className={getColorClass(similarity)}>
  {similarity}%
</div>
```

### Badge for High Similarity
```typescript
{similarity >= 90 && (
  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
    Potential Duplicate
  </span>
)}
```

## 📚 API Quick Reference

| Function | Returns | Use Case |
|----------|---------|----------|
| `getUniqueClusters()` | `number[]` | Get all cluster IDs |
| `getUniqueReports()` | `string[]` | Get all report names |
| `getReportsByCluster(id)` | `string[]` | Get reports in cluster |
| `getClusterDashboards(id)` | `ClusterDashboard[]` | Get detailed cluster data |
| `getSimilarityMatrix(id)` | `number[][]` | Get similarity matrix |
| `getReportComparison(r1, r2)` | `ComparisonMetrics` | Compare two reports |
| `findHighSimilarityReports(threshold)` | `ReportSimilarity[]` | Find similar reports |
| `getClusterAverageSimilarity(id)` | `number` | Get cluster avg similarity |
| `DASHBOARD_GROUPS` | `DashboardGroup[]` | All clusters with metadata |
| `DASHBOARD_STATS` | `object` | Overall statistics |

## 🔧 Troubleshooting

**Q: Import not working?**
```typescript
// Use this import pattern:
import { functionName } from '../constants';
// Or:
import { functionName } from '../constants/dataTransformUtils';
```

**Q: Comparison returns null?**
- The two reports may not have been compared in the backend data
- Check if both reports exist using `getUniqueReports()`

**Q: Want to add more data?**
- Update `src/constants/reportSimilarityData.ts`
- Keep the same field names
- All functions will automatically use new data

## 🎯 Next Steps

1. ✅ View the demo: Add `<DataExamples />` to your routes
2. ✅ Update existing pages with real data
3. ✅ Build custom analytics using utility functions
4. ✅ Read full documentation in `DATA_INTEGRATION.md`

## 💡 Pro Tips

- Use `getUniqueReports()` to populate dropdowns
- Use `findHighSimilarityReports()` to show actionable insights
- Cache cluster data in state for better performance
- Color-code by similarity for visual impact
- Show top 3-5 duplicates on dashboard for quick wins

Happy coding! 🚀
