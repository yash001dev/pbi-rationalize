# PBI Rationalize - Power BI Redundancy Tool

A modern React application built with TypeScript, Tailwind CSS, and React Router for analyzing and managing Power BI dashboard redundancy.

## Features

✅ **3 Main Pages:**
- **Dashboard** (`/`) - Overview of redundancy groups with stats
- **Cluster View** (`/cluster`) - Detailed view of dashboard similarities with heatmap
- **Comparison** (`/comparison`) - Side-by-side DAX query comparison

✅ **Reusable Components:**
- `Layout` - Main layout wrapper with sidebar and header
- `Sidebar` - Navigation with filtering and sorting options
- `Header` - Top navigation with user profile
- `StatsCard` - Metric display cards
- `GroupCard` - Dashboard group cards with similarity scores
- `HeatmapCell` - Color-coded similarity cells
- `Breadcrumb` - Navigation breadcrumbs

✅ **Mock Data Structure:**
- `/src/constants/dashboardData.ts` - Dashboard groups and statistics
- `/src/constants/clusterData.ts` - Cluster view matrix and KPI data
- `/src/constants/comparisonData.ts` - Comparison metrics and DAX queries

✅ **Responsive Design:**
- Mobile-first Tailwind CSS styling
- Responsive grid layouts
- Sticky navigation elements
- Smooth transitions and hover effects

✅ **Navigation:**
- React Router for client-side routing
- Query parameters support (e.g., `?groupId=2`)
- Breadcrumb navigation
- Cross-page linking

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Breadcrumb.tsx
│   ├── GroupCard.tsx
│   ├── Header.tsx
│   ├── HeatmapCell.tsx
│   ├── Layout.tsx
│   ├── Sidebar.tsx
│   └── StatsCard.tsx
├── constants/           # Mock data files
│   ├── clusterData.ts
│   ├── comparisonData.ts
│   └── dashboardData.ts
├── pages/               # Page components
│   ├── Home.tsx
│   ├── ClusterView.tsx
│   └── Comparison.tsx
├── App.tsx              # Main app with routing
├── main.tsx             # Entry point
└── index.css            # Tailwind imports
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Technology Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **React Router v6** - Routing
- **Vite** - Build tool

## Navigation Flow

1. **Dashboard** → Click "View Details" on any group card
2. **Cluster View** → Click "View" on any dashboard row
3. **Comparison** → View detailed DAX query comparison
4. Use breadcrumbs or navigation links to go back

## Color Coding

- **Green** (>94% similarity) - High redundancy
- **Yellow** (85-94% similarity) - Moderate redundancy
- **Red** (<85% similarity) - Low redundancy

## Future Enhancements

- Dynamic data fetching from API
- Filtering and sorting functionality
- Export to CSV/PDF
- Dark mode support
- Authentication
