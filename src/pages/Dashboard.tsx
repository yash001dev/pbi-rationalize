import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import {
  COMPARISON_DATA,
  REPORT1_QUERIES,
  REPORT2_QUERIES,
} from '../constants/comparisonData';

export default function Comparison() {
  const { report1Name, report2Name, metrics } = COMPARISON_DATA;

  return (
    <Layout showSidebar={false}>
      <header className="sticky top-0 z-10 w-full border-b border-gray-200/80 bg-gray-50/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 text-gray-900">
            <svg
              className="h-6 w-6 text-blue-600"
              fill="currentColor"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z"></path>
            </svg>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] text-gray-900">
              Power BI Redundancy Tool
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden items-center gap-6 md:flex">
              <Link
                to="/"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
              >
                Dashboard List
              </Link>
              <Link
                to="/cluster"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
              >
                Cluster View
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <button className="flex h-9 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-blue-600 px-4 text-sm font-bold leading-normal tracking-[0.015em] text-white transition-colors hover:bg-blue-700">
                <span className="truncate">Export</span>
              </button>
              <button className="flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gray-200 text-gray-600 transition-colors hover:bg-gray-300">
                <span className="text-xl">⚙️</span>
              </button>
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <p className="text-3xl font-black leading-tight tracking-[-0.033em] text-gray-900 sm:text-4xl">
              Comparison:{' '}
              <span className="text-blue-600">
                <br />
                {report1Name}
              </span>{' '}
              vs.{' '}
              <span className="text-blue-600">{report2Name}</span>
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="flex items-center justify-between gap-6">
                <p className="text-base font-medium text-gray-900">
                  Overall Similarity Score
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {metrics.similarityScore}%
                </p>
              </div>
              <div className="mt-3">
                <div className="h-2 rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-blue-600 transition-all"
                    style={{ width: `${metrics.similarityScore}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div className="divide-y divide-gray-200">
                <div className="flex items-center justify-between gap-x-6 px-6 py-4">
                  <p className="text-sm font-medium text-gray-600">
                    Similarity Score
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {metrics.similarityScore}%
                  </p>
                </div>
                <div className="flex items-center justify-between gap-x-6 px-6 py-4">
                  <p className="text-sm font-medium text-gray-600">
                    No of DAX Query in {report1Name}
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {metrics.report1Queries}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-x-6 px-6 py-4">
                  <p className="text-sm font-medium text-gray-600">
                    No of DAX Query in {report2Name}
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {metrics.report2Queries}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-x-6 px-6 py-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total No of Unique DAX Query
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {metrics.totalUniqueQueries}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-x-6 px-6 py-4">
                  <p className="text-sm font-medium text-gray-600">
                    No of Similar DAX Query between reports
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {metrics.similarQueries}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-x-6 px-6 py-4">
                  <p className="text-sm font-medium text-gray-600">
                    No of dissimilar DAX Query between reports
                  </p>
                  <button className="group flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700">
                    <span>{metrics.dissimilarQueries}</span>
                    <span className="text-base opacity-0 transition-opacity group-hover:opacity-100">
                      ↗
                    </span>
                  </button>
                </div>
                <div className="flex items-center justify-between gap-x-6 px-6 py-4">
                  <p className="text-sm font-medium text-gray-600">
                    DAX Query missing in {report1Name}
                  </p>
                  <button className="group flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700">
                    <span>{metrics.missingInReport1}</span>
                    <span className="text-base opacity-0 transition-opacity group-hover:opacity-100">
                      ↗
                    </span>
                  </button>
                </div>
                <div className="flex items-center justify-between gap-x-6 px-6 py-4">
                  <p className="text-sm font-medium text-gray-600">
                    DAX Query missing in {report2Name}
                  </p>
                  <button className="group flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700">
                    <span>{metrics.missingInReport2}</span>
                    <span className="text-base opacity-0 transition-opacity group-hover:opacity-100">
                      ↗
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white">
              <div className="border-b border-gray-200 p-6">
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      DAX Query Comparison
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Inspect queries side-by-side to identify similarities.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 divide-y divide-gray-200 md:grid-cols-2 md:divide-x md:divide-y-0">
                <div className="p-6">
                  <h4 className="text-base font-semibold text-gray-900">
                    {report1Name}
                  </h4>
                  <div className="mt-4 space-y-3">
                    {REPORT1_QUERIES.map((query) => (
                      <div
                        key={query.id}
                        className="rounded-lg border border-gray-200 bg-gray-50 p-3"
                      >
                        <p className="text-xs font-medium text-gray-500">
                          {query.label}
                        </p>
                        <code className="mt-1 block text-sm text-gray-900 break-all">
                          {query.query}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-base font-semibold text-gray-900">
                    {report2Name}
                  </h4>
                  <div className="mt-4 space-y-3">
                    {REPORT2_QUERIES.map((query) => (
                      <div
                        key={query.id}
                        className="rounded-lg border border-gray-200 bg-gray-50 p-3"
                      >
                        <p className="text-xs font-medium text-gray-500">
                          {query.label}
                        </p>
                        <code className="mt-1 block text-sm text-gray-900 break-all">
                          {query.query}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-start gap-4">
            <Link
              to="/cluster"
              className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-blue-600 px-4 text-sm font-bold leading-normal tracking-[0.015em] text-white transition-colors hover:bg-blue-700"
            >
              <span className="text-xl">←</span>
              <span className="truncate">Back to Cluster</span>
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
