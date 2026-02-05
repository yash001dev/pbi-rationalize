import { getReportComparison, getUniqueReports } from './dataTransformUtils';

export interface DAXQuery {
  id: number;
  label: string;
  query: string;
}

export interface ComparisonMetrics {
  similarityScore: number;
  report1Queries: number;
  report2Queries: number;
  totalUniqueQueries: number;
  similarQueries: number;
  dissimilarQueries: number;
  missingInReport1: number;
  missingInReport2: number;
}

/**
 * Get comparison data between two reports
 * @param report1Name - Name of the first report
 * @param report2Name - Name of the second report
 */
export function getComparisonData(report1Name?: string, report2Name?: string) {
  const reports = getUniqueReports();
  
  // Use provided reports or default to first two reports
  const defaultReport1 = report1Name || reports[0] || 'Report 1';
  const defaultReport2 = report2Name || reports[1] || 'Report 2';
  
  const metrics = getReportComparison(defaultReport1, defaultReport2);
  
  return {
    report1Name: defaultReport1,
    report2Name: defaultReport2,
    metrics: metrics || {
      similarityScore: 0,
      report1Queries: 0,
      report2Queries: 0,
      totalUniqueQueries: 0,
      similarQueries: 0,
      dissimilarQueries: 0,
      missingInReport1: 0,
      missingInReport2: 0,
    } as ComparisonMetrics,
  };
}

// Default comparison data (using first available reports from backend)
export const COMPARISON_DATA = getComparisonData();

export const REPORT1_QUERIES: DAXQuery[] = [
  {
    id: 1,
    label: 'Query 1: Total Sales',
    query: 'SUM(Sales[SalesAmount])',
  },
  {
    id: 2,
    label: 'Query 2: YTD Sales',
    query: 'CALCULATE(SUM(Sales[SalesAmount]), DATESYTD(Date[Date]))',
  },
  {
    id: 3,
    label: 'Query 3: Monthly Revenue',
    query: 'SUMX(FILTER(Sales, MONTH(Sales[Date]) = MONTH(TODAY())), Sales[Amount])',
  },
  {
    id: 4,
    label: 'Query 4: Customer Count',
    query: 'DISTINCTCOUNT(Sales[CustomerID])',
  },
];

export const REPORT2_QUERIES: DAXQuery[] = [
  {
    id: 1,
    label: 'Query 1: Total Sales',
    query: 'SUMX(Sales, Sales[UnitPrice] * Sales[OrderQuantity])',
  },
  {
    id: 2,
    label: 'Query 2: YTD Sales',
    query: 'TOTALYTD(SUM(Sales[SalesAmount]), Date[Date])',
  },
  {
    id: 3,
    label: 'Query 3: Monthly Revenue',
    query: 'CALCULATE(SUM(Sales[Amount]), DATESMTD(Date[Date]))',
  },
  {
    id: 4,
    label: 'Query 4: Customer Count',
    query: 'COUNTROWS(DISTINCT(Sales[CustomerID]))',
  },
];
