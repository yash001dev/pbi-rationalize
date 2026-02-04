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

export const COMPARISON_DATA = {
  report1Name: 'Quarterly Sales Report v1',
  report2Name: 'Sales Performance Q3',
  metrics: {
    similarityScore: 92,
    report1Queries: 25,
    report2Queries: 25,
    totalUniqueQueries: 25,
    similarQueries: 22,
    dissimilarQueries: 4,
    missingInReport1: 2,
    missingInReport2: 2,
  } as ComparisonMetrics,
};

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
