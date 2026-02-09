import { Link, useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Breadcrumb from '../components/Breadcrumb';
import HeatmapCell from '../components/HeatmapCell';
import {
  KPI_GROUPS,
  getClusterDashboards,
  getSimilarityMatrix,
  getRedundantKPIs,
} from '../constants/clusterData';
import { getReportsByCluster } from '../constants/dataTransformUtils';
import { DASHBOARD_GROUPS } from '../constants/dashboardData';

/**
 * ClusterView - Dashboard Comparison Matrix
 * 
 * Displays a symmetric comparison matrix showing similarity between reports
 * 
 * API Field Mapping:
 * - measure_count_report_1/2 → Total KPIs column
 * - semantic_common_measures_count → Shared KPIs column  
 * - semantic_unique_measures_report_1/2 → Unique KPIs column
 * - final_similarity_percent → Matrix cell values
 * 
 * Matrix Rules:
 * 1. Diagonal (same report): Always 100%
 * 2. Off-diagonal (different reports): Symmetric, e.g., [A,B] = [B,A]
 */
export default function ClusterView() {
  const [searchParams] = useSearchParams();
  const groupId = searchParams.get('groupId') || '0';
  const clusterId = parseInt(groupId);
  
  // Get the group data from DASHBOARD_GROUPS
  const selectedGroup = DASHBOARD_GROUPS.find(
    (group) => group.id === clusterId
  );
  
  // Get cluster-specific data
  const clusterReports = getReportsByCluster(clusterId);
  const clusterDashboards = getClusterDashboards(clusterId);
  const similarityMatrix = getSimilarityMatrix(clusterId);
  const redundantKPIs = getRedundantKPIs(clusterId);
  
  // Fallback to default if group not found
  const groupInfo = selectedGroup || {
    id: clusterId,
    name: `Cluster ${clusterId}`,
    dashboardCount: clusterReports.length,
    avgSimilarity: 0,
    dashboards: clusterReports.slice(0, 4),
    color: 'yellow' as const,
  };

  return (
    <Layout>
      <div className="p-8">
        <Breadcrumb
          items={[
            { label: 'Dashboard', path: '/' },
            { label: `${groupInfo.name} Details` },
          ]}
        />

        <div className="flex flex-col md:flex-row flex-wrap items-start justify-between gap-4 mt-6">
          <div className="flex min-w-72 flex-col gap-2">
            <p className="text-gray-900 text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
              {groupInfo.name}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/"
              className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-blue-600 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-700 transition-colors"
            >
              <span className="truncate">Back</span>
            </Link>
            <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-200 text-gray-800 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-300 transition-colors">
              <span className="truncate">Dismiss Group</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-6">
            <p className="text-sm font-medium text-gray-500">
              Total Dashboards Found
            </p>
            <p className="text-3xl font-bold text-gray-900">
              {groupInfo.dashboardCount}
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6">
            <p className="text-sm font-medium text-gray-500">Most Redundant KPIs</p>
            <div className="flex flex-col gap-2">
              {redundantKPIs.slice(0, 5).map((kpi, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <p className="font-medium text-gray-800">{kpi.name}</p>
                  <p className="text-gray-500">Present in {kpi.count} comparisons</p>
                </div>
              ))}
              {redundantKPIs.length === 0 && (
                <p className="text-sm text-gray-500 italic">No redundant KPIs found</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <h3 className="text-xl font-bold text-gray-900">
            Dashboard Comparison Matrix
          </h3>
          <div className="w-full overflow-x-auto relative">
            <div className="flex rounded-lg border border-gray-200 bg-white p-1.5">
              <div className="flex flex-col gap-1 sticky left-0 bg-white z-10">
                <div className="h-10"></div>
                {clusterReports.map((reportName, index) => (
                  <div
                    key={index}
                    className="flex h-[72px] items-center px-4 text-left text-sm font-medium text-gray-800 min-w-48 max-w-48 truncate bg-white"
                    title={reportName}
                  >
                    {reportName}
                  </div>
                ))}
              </div>
              <div className="flex flex-col w-full" style={{ minWidth: `${clusterReports.length * 144}px` }}>
                <div className="h-10" style={{ display: 'grid', gridTemplateColumns: `repeat(${clusterReports.length}, minmax(0, 1fr))` }}>
                  {clusterReports.map((reportName, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center px-2 text-center text-xs font-medium text-gray-500"
                      title={reportName}
                    >
                      <div className="truncate max-w-full">{reportName}</div>
                    </div>
                  ))}
                </div>
                <div className="gap-1" style={{ display: 'grid', gridTemplateColumns: `repeat(${clusterReports.length}, minmax(0, 1fr))` }}>
                  {similarityMatrix.flat().map((value, index) => (
                    <HeatmapCell key={index} value={value} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1 ml-1 shrink-0" style={{ width: '480px' }}>
                <div className="grid grid-cols-4 h-10 gap-1">
                  <div 
                    className="flex items-center justify-center px-2 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                    title="Total number of KPIs/measures in this report (measure_count_report)"
                  >
                    Total KPIs
                  </div>
                  <div 
                    className="flex items-center justify-center px-2 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                    title="Common KPIs shared with other reports (semantic_common_measures_count)"
                  >
                    Shared
                  </div>
                  <div 
                    className="flex items-center justify-center px-2 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                    title="Unique KPIs only in this report (semantic_unique_measures_report)"
                  >
                    Unique
                  </div>
                  <div className="flex items-center justify-center px-2 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                    Action
                  </div>
                </div>
                {clusterDashboards.map((dashboard, index) => (
                  <div key={index} className="grid grid-cols-4 gap-1">
                    <div 
                      className="flex h-[72px] items-center justify-center rounded-md bg-gray-50 text-sm font-medium"
                      title={`Total KPIs in ${dashboard.name}: ${dashboard.totalKPIs}`}
                    >
                      {dashboard.totalKPIs}
                    </div>
                    <div 
                      className="flex h-[72px] items-center justify-center rounded-md bg-gray-50 text-sm font-medium"
                      title={`KPIs shared with other reports: ${dashboard.sharedKPIs}`}
                    >
                      {dashboard.sharedKPIs}
                    </div>
                    <div 
                      className="flex h-[72px] items-center justify-center rounded-md bg-gray-50 text-sm font-medium"
                      title={`Unique KPIs only in ${dashboard.name}: ${dashboard.uniqueKPIs}`}
                    >
                      {dashboard.uniqueKPIs}
                    </div>
                    <div className="flex h-[72px] items-center justify-center rounded-md bg-gray-50">
                      <Link
                        to={`/comparison?report1=${encodeURIComponent(dashboard.name)}&cluster=${clusterId}`}
                        className="text-blue-600 hover:underline text-sm font-bold"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-xs italic text-gray-500 text-right">
            Note: &lt; 90% similarity highlighted in darker color
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <h3 className="text-xl font-bold text-gray-900">Similar KPI Groups</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {KPI_GROUPS.map((group) => (
              <div
                key={group.id}
                className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6"
              >
                <p className="font-bold text-gray-900">{group.name}</p>
                <div className="flex flex-col text-sm text-gray-600">
                  {group.kpis.map((kpi, index) => (
                    <span key={index}>{kpi}</span>
                  ))}
                </div>
                <button className="flex mt-2 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-200 text-gray-800 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-300 transition-colors">
                  <span className="truncate">Inspect KPI Group</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
