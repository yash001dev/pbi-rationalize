/**
 * Example Component - Demonstrates how to use the backend data
 * This file shows various ways to access and display the report similarity data
 */

import { useState } from 'react';
import {
  getUniqueClusters,
  getClusterDashboards,
  getSimilarityMatrix,
  findHighSimilarityReports,
  getReportsByCluster,
  getClusterAverageSimilarity,
  getUniqueReports,
  getReportComparison,
} from '../constants/dataTransformUtils';

export function DataExamples() {
  const clusters = getUniqueClusters();
  const [selectedCluster, setSelectedCluster] = useState(clusters[0] || 0);
  const [selectedReports, setSelectedReports] = useState<{
    report1: string;
    report2: string;
  }>({ report1: '', report2: '' });

  const clusterDashboards = getClusterDashboards(selectedCluster);
  const similarityMatrix = getSimilarityMatrix(selectedCluster);
  const highSimilarity = findHighSimilarityReports(90);
  const reportsInCluster = getReportsByCluster(selectedCluster);
  const avgSimilarity = getClusterAverageSimilarity(selectedCluster);
  const allReports = getUniqueReports();

  const comparison =
    selectedReports.report1 && selectedReports.report2
      ? getReportComparison(selectedReports.report1, selectedReports.report2)
      : null;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Backend Data Examples</h1>

      {/* Example 1: Cluster Selector */}
      <section className="border p-4 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">1. Cluster Selector</h2>
        <div className="flex items-center gap-4">
          <label>Select Cluster:</label>
          <select
            className="border px-3 py-2 rounded"
            value={selectedCluster}
            onChange={(e) => setSelectedCluster(Number(e.target.value))}
          >
            {clusters.map((clusterId) => (
              <option key={clusterId} value={clusterId}>
                Cluster {clusterId}
              </option>
            ))}
          </select>
          <span className="text-gray-600">
            ({reportsInCluster.length} reports, avg similarity: {avgSimilarity}%)
          </span>
        </div>
      </section>

      {/* Example 2: Cluster Dashboards */}
      <section className="border p-4 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">
          2. Reports in Cluster {selectedCluster}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clusterDashboards.map((dashboard) => (
            <div key={dashboard.name} className="border p-3 rounded bg-gray-50">
              <h3 className="font-semibold text-sm mb-2 truncate" title={dashboard.name}>
                {dashboard.name}
              </h3>
              <div className="text-xs space-y-1">
                <p>Total KPIs: {dashboard.totalKPIs}</p>
                <p>Shared KPIs: {dashboard.sharedKPIs}</p>
                <p>Unique KPIs: {dashboard.uniqueKPIs}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Example 3: Similarity Matrix */}
      <section className="border p-4 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">
          3. Similarity Matrix for Cluster {selectedCluster}
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2 bg-gray-100"></th>
                {reportsInCluster.map((report, idx) => (
                  <th
                    key={idx}
                    className="border p-2 bg-gray-100 text-xs max-w-[100px] truncate"
                    title={report}
                  >
                    {idx + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {similarityMatrix.map((row, i) => (
                <tr key={i}>
                  <td
                    className="border p-2 bg-gray-100 font-semibold text-xs max-w-[150px] truncate"
                    title={reportsInCluster[i]}
                  >
                    {i + 1}. {reportsInCluster[i]}
                  </td>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`border p-2 text-center text-xs ${
                        cell >= 80
                          ? 'bg-green-100'
                          : cell >= 50
                          ? 'bg-yellow-100'
                          : 'bg-red-100'
                      }`}
                    >
                      {cell}%
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Example 4: High Similarity Reports */}
      <section className="border p-4 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">
          4. Reports with High Similarity (≥90%)
        </h2>
        <p className="text-sm text-gray-600 mb-3">
          These are potential duplicate reports that could be consolidated
        </p>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {highSimilarity.map((item, idx) => (
            <div key={idx} className="border p-3 rounded bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="text-sm font-semibold">{item.report_name_1}</p>
                  <p className="text-xs text-gray-600">↔</p>
                  <p className="text-sm font-semibold">{item.report_name_2}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">
                    {item.final_similarity_percent}%
                  </p>
                  <p className="text-xs text-gray-600">
                    {item.semantic_common_measures_count} common measures
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Example 5: Report Comparison */}
      <section className="border p-4 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">5. Compare Two Reports</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Report 1:</label>
              <select
                className="w-full border px-3 py-2 rounded"
                value={selectedReports.report1}
                onChange={(e) =>
                  setSelectedReports({ ...selectedReports, report1: e.target.value })
                }
              >
                <option value="">Select a report...</option>
                {allReports.map((report) => (
                  <option key={report} value={report}>
                    {report}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Report 2:</label>
              <select
                className="w-full border px-3 py-2 rounded"
                value={selectedReports.report2}
                onChange={(e) =>
                  setSelectedReports({ ...selectedReports, report2: e.target.value })
                }
              >
                <option value="">Select a report...</option>
                {allReports.map((report) => (
                  <option key={report} value={report}>
                    {report}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {comparison && (
            <div className="border p-4 rounded bg-blue-50">
              <h3 className="font-semibold mb-3">Comparison Results:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-600">Similarity Score</p>
                  <p className="text-2xl font-bold">{comparison.similarityScore}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Common Measures</p>
                  <p className="text-2xl font-bold">{comparison.similarQueries}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Unique to Report 1</p>
                  <p className="text-2xl font-bold">{comparison.missingInReport2}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Unique to Report 2</p>
                  <p className="text-2xl font-bold">{comparison.missingInReport1}</p>
                </div>
              </div>
            </div>
          )}

          {!comparison && selectedReports.report1 && selectedReports.report2 && (
            <div className="border p-4 rounded bg-yellow-50">
              <p className="text-sm">
                No comparison data available for these two reports. They may not have been
                compared in the backend analysis.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Example 6: Data Summary */}
      <section className="border p-4 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">6. Data Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">{allReports.length}</p>
            <p className="text-sm text-gray-600">Total Reports</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-600">{clusters.length}</p>
            <p className="text-sm text-gray-600">Clusters</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">{highSimilarity.length}</p>
            <p className="text-sm text-gray-600">High Similarity Pairs</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-600">
              {Math.round((highSimilarity.length / allReports.length) * 100)}%
            </p>
            <p className="text-sm text-gray-600">Redundancy Rate</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DataExamples;
