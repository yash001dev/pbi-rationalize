import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  name: string;
  path: string;
  icon: string;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', path: '/', icon: '📊' },
  { name: 'Cluster View', path: '/cluster', icon: '🔍' },
  { name: 'Comparison', path: '/comparison', icon: '⚖️' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="flex h-screen min-h-full w-64 flex-col justify-between border-r border-gray-200 bg-white p-4 sticky top-0">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-3 px-2">
          <div className="size-6 text-blue-600">
            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z"></path>
            </svg>
          </div>
          <h1 className="text-lg font-bold tracking-tight text-gray-900">
            Redundancy Tool
          </h1>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600/10 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <p>{item.name}</p>
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-col gap-4 border-t border-gray-200 pt-6">
          <div className="px-0 py-0">
            <label className="flex flex-col min-w-40 h-10 w-full">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                <div className="text-gray-400 flex border border-gray-300 bg-gray-100 items-center justify-center pl-3 rounded-l-lg border-r-0">
                  <span className="text-xl">🔍</span>
                </div>
                <input
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 focus:outline-0 focus:ring-1 focus:ring-blue-600 border border-gray-300 bg-gray-100 focus:border-blue-600 h-full placeholder:text-gray-400 px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal"
                  placeholder="Search by name..."
                />
              </div>
            </label>
          </div>

          <details className="flex flex-col border-t border-gray-200 py-2 group" open>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-2">
              <p className="text-sm font-medium text-gray-900">Filter by</p>
              <span className="text-gray-500 group-open:rotate-180 transition-transform duration-200">
                ▼
              </span>
            </summary>
            <div className="flex flex-col gap-3 pt-2">
              <select className="w-full rounded-lg border-gray-300 bg-gray-100 text-sm focus:border-blue-600 focus:ring-blue-600">
                <option>Workspace</option>
                <option>Marketing</option>
                <option>Sales</option>
                <option>Finance</option>
              </select>
              <select className="w-full rounded-lg border-gray-300 bg-gray-100 text-sm focus:border-blue-600 focus:ring-blue-600">
                <option>Owner</option>
                <option>Jane Doe</option>
                <option>John Smith</option>
              </select>
            </div>
          </details>

          <details className="flex flex-col border-t border-gray-200 py-2 group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-2">
              <p className="text-sm font-medium text-gray-900">Sort by</p>
              <span className="text-gray-500 group-open:rotate-180 transition-transform duration-200">
                ▼
              </span>
            </summary>
            <div className="flex flex-col gap-2 pt-2 text-sm text-gray-700">
              <label className="flex items-center gap-2">
                <input
                  defaultChecked
                  className="text-blue-600 focus:ring-blue-600"
                  name="sort"
                  type="radio"
                />
                Most Similar
              </label>
              <label className="flex items-center gap-2">
                <input
                  className="text-blue-600 focus:ring-blue-600"
                  name="sort"
                  type="radio"
                />
                Most Dashboards
              </label>
              <label className="flex items-center gap-2">
                <input
                  className="text-blue-600 focus:ring-blue-600"
                  name="sort"
                  type="radio"
                />
                Recently Scanned
              </label>
            </div>
          </details>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 w-full text-sm font-medium">
          <span className="text-lg">🚪</span>
          <p>Log Out</p>
        </button>
      </div>
    </aside>
  );
}
