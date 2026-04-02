# Finance Dashboard UI

A frontend-only finance dashboard built with React, TypeScript, Vite, and Tailwind CSS.  
The app is structured as an assignment-ready submission that demonstrates dashboard design, transactions management, role-based UI behavior, shared state, responsive layouts, and a few optional enhancements.

## Setup

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run build
npm run lint
```

## What’s Included

- Dashboard overview with:
  - Total balance, income, and expenses summary cards
  - Time-based balance trend visualization
  - Categorical spending breakdown
  - Insight cards for top category, monthly comparison, savings rate, and largest expense
  - Budget utilization section
- Transactions experience with:
  - Search
  - Filter by type
  - Filter by category
  - Sort by date or amount
  - Empty state handling
  - CSV export
- Role-based frontend simulation:
  - `Viewer` can inspect data
  - `Admin` can add, edit, delete, and export transactions
- Shared state management using a React context provider
- Local persistence using `localStorage`
- Light and dark mode
- Additional pages for reports, budget, and settings to make the navigation feel complete

## Assignment Mapping

### 1. Dashboard Overview

Implemented in the overview view with:

- Financial summary cards
- Balance trend chart
- Spending breakdown donut
- Insight tiles
- Budget utilization bars

### 2. Transactions Section

Implemented in the transactions view with:

- Transaction table showing date, description, category, type, and amount
- Search, filtering, and sorting
- Admin-only add/edit/delete actions
- Empty state when filters return no matches

### 3. Basic Role Based UI

Implemented via the role switcher in the header and settings view.

- `Viewer`: read-only experience
- `Admin`: management actions enabled

### 4. Insights Section

Implemented in the overview and reports views:

- Highest spending category
- Monthly comparison
- Savings rate
- Largest expense
- Category mix and report cards

### 5. State Management

Managed centrally in `FinanceAppProvider`:

- Transactions data
- Current role
- Current theme
- Active view
- Search/filter/sort state
- Toast feedback

### 6. UI and UX Expectations

- Responsive sidebar + content layout
- Light and dark visual systems
- Empty states
- Smooth transitions and polished feedback

## Optional Enhancements Included

- Dark mode
- Local storage persistence
- CSV export
- Toast notifications
- Modal-based transaction creation/editing

## Design Reference

The UI implementation was shaped around the reference images supplied with the assignment prompt:

- Light overview dashboard
- Light transactions dashboard
- Dark overview dashboard
- Dark transactions dashboard

Those references informed the visual direction for:

- Cream light theme and charcoal dark theme
- Left navigation rail
- Header controls
- Dashboard card composition
- Transactions management layout

## Project Structure

```text
src/
  components/
    common/
    dashboard/
    layout/
    transactions/
  context/
  data/
  utils/
```

## Notes

- The app uses mock data only and does not depend on a backend.
- Transactions are persisted locally for demo purposes.
- The current implementation is intentionally frontend-focused to match the assignment scope.
