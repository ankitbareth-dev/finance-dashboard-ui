import { useFinanceApp } from "../../context/FinanceAppContext";
import BudgetPage from "../dashboard/BudgetPage";
import OverviewPage from "../dashboard/OverviewPage";
import ReportsPage from "../dashboard/ReportsPage";
import SettingsPage from "../dashboard/SettingsPage";
import AppHeader from "./AppHeader";
import TransactionsPage from "../transactions/TransactionsPage";

export default function MainContent() {
  const {
    state: { activeView },
  } = useFinanceApp();

  const content = {
    overview: <OverviewPage />,
    transactions: <TransactionsPage />,
    reports: <ReportsPage />,
    budget: <BudgetPage />,
    settings: <SettingsPage />,
  }[activeView];

  return (
    <main className="min-h-screen flex-1 bg-surface">
      <AppHeader />
      <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">{content}</div>
    </main>
  );
}
