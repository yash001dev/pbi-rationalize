import { Link } from 'react-router-dom';

interface GroupCardProps {
  id: number;
  name: string;
  dashboardCount: number;
  avgSimilarity: number;
  dashboards: string[];
  color: 'green' | 'yellow' | 'red';
}

export default function GroupCard({
  id,
  name,
  dashboardCount,
  avgSimilarity,
  dashboards,
  color,
}: GroupCardProps) {
  const colorClasses = {
    green: 'text-green-600',
    yellow: 'text-yellow-600',
    red: 'text-red-600',
  };

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <span className="inline-flex items-center rounded-full bg-blue-600/10 px-2.5 py-0.5 text-xs font-medium text-blue-600">
            {dashboardCount} Dashboards
          </span>
        </div>
        <p className={`mt-1 text-sm font-semibold ${colorClasses[color]}`}>
          {avgSimilarity}% Avg. Similarity
        </p>
        <ul className="mt-4 space-y-2 text-sm text-gray-500">
          {dashboards.slice(0, 4).map((dashboard, index) => (
            <li key={index} className="truncate">
              {dashboard}
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
        <Link
          to={`/cluster?groupId=${id}`}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
        >
          View Details
          <span className="text-base">→</span>
        </Link>
      </div>
    </div>
  );
}
