import Layout from '../components/Layout';
import StatsCard from '../components/StatsCard';
import GroupCard from '../components/GroupCard';
import { DASHBOARD_STATS, DASHBOARD_GROUPS } from '../constants/dashboardData';

export default function Home() {
  return (
    <Layout>
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-500 mt-1">
          An at-a-glance summary of the redundancy problem.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <StatsCard
            label="Total Dashboards Scanned"
            value={DASHBOARD_STATS.totalDashboards.toLocaleString()}
          />
          <StatsCard
            label="Total Redundancy Groups"
            value={DASHBOARD_STATS.totalGroups}
          />
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900">Redundancy Groups</h3>
          <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {DASHBOARD_GROUPS.map((group) => (
              <GroupCard key={group.id} {...group} />
            ))}

            <div className="lg:col-span-2 xl:col-span-1 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-transparent py-20 text-center">
              <div className="text-blue-600 text-5xl">🔍</div>
              <h4 className="mt-4 text-lg font-semibold text-gray-900">
                No Matching Groups
              </h4>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your filters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
