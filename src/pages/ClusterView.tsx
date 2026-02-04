import { Link, useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Breadcrumb from '../components/Breadcrumb';
import HeatmapCell from '../components/HeatmapCell';
import {
  CLUSTER_INFO,
  CLUSTER_DASHBOARDS,
  SIMILARITY_MATRIX,
  REDUNDANT_KPIS,
  KPI_GROUPS,
} from '../constants/clusterData';
import { DASHBOARD_GROUPS } from '../constants/dashboardData';

export default function ClusterView() {
  const [searchParams] = useSearchParams();
  const groupId = searchParams.get('groupId') || '2';
  
  // Get the group data from DASHBOARD_GROUPS
  const selectedGroup = DASHBOARD_GROUPS.find(
    (group) => group.id === parseInt(groupId)
  );
  
  // Fallback to default if group not found
  const groupInfo = selectedGroup || {
    id: 2,
    name: 'Group 2',
    dashboardCount: 5,
    avgSimilarity: 92,
    dashboards: [],
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
              {REDUNDANT_KPIS.map((kpi, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <p className="font-medium text-gray-800">{kpi.name}</p>
                  <p className="text-gray-500">Present in {kpi.count} dashboards</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <h3 className="text-xl font-bold text-gray-900">
            Dashboard Comparison Matrix
          </h3>
          <div className="w-full overflow-x-auto">
            <div className="flex rounded-lg border border-gray-200 bg-white p-1.5">
              <div className="flex flex-col gap-1">
                <div className="h-10"></div>
                {CLUSTER_DASHBOARDS.map((dashboard, index) => (
                  <div
                    key={index}
                    className="flex h-[72px] items-center px-4 text-left text-sm font-medium text-gray-800 min-w-48 max-w-48 truncate"
                  >
                    {dashboard.name}
                  </div>
                ))}
              </div>
              <div className="flex flex-col w-full min-w-[720px]">
                <div className="grid grid-cols-5 h-10">
                  {CLUSTER_DASHBOARDS.map((dashboard, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center px-4 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      {dashboard.name.split(' ')[0]}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-5 gap-1">
                  {SIMILARITY_MATRIX.flat().map((value, index) => (
                    <HeatmapCell key={index} value={value} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1 w-full max-w-[480px]">
                <div className="grid grid-cols-4 h-10">
                  <div className="flex items-center justify-center px-4 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                    Total KPIs
                  </div>
                  <div className="flex items-center justify-center px-4 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                    Shared
                  </div>
                  <div className="flex items-center justify-center px-4 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                    Unique
                  </div>
                  <div className="flex items-center justify-center px-4 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                    Action
                  </div>
                </div>
                {CLUSTER_DASHBOARDS.map((dashboard, index) => (
                  <div key={index} className="grid grid-cols-4 gap-1">
                    <div className="flex h-[72px] items-center justify-center rounded-md bg-gray-50 text-sm">
                      {dashboard.totalKPIs}
                    </div>
                    <div className="flex h-[72px] items-center justify-center rounded-md bg-gray-50 text-sm">
                      {dashboard.sharedKPIs}
                    </div>
                    <div className="flex h-[72px] items-center justify-center rounded-md bg-gray-50 text-sm">
                      {dashboard.uniqueKPIs}
                    </div>
                    <div className="flex h-[72px] items-center justify-center rounded-md bg-gray-50">
                      <Link
                        to="/comparison"
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
