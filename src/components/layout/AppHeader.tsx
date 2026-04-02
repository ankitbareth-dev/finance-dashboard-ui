import { Bell } from "lucide-react";
import DarkModeToggle from "../common/DarkModeToggle";
import RoleSwitcher from "../common/RoleSwitcher";
import { useFinanceApp } from "../../context/FinanceAppContext";

const headerCopy = {
  overview: {
    eyebrow: "Dashboard",
    title: "Dashboard Overview with Emerald Pulse",
  },
  transactions: {
    eyebrow: "Portfolio Ledger",
    title: "Transactions",
  },
  reports: {
    eyebrow: "Intelligence",
    title: "Reports & Spending Patterns",
  },
  budget: {
    eyebrow: "Planning",
    title: "Budget Control Center",
  },
  settings: {
    eyebrow: "Preferences",
    title: "Workspace Settings",
  },
};

export default function AppHeader() {
  const {
    state: { activeView },
  } = useFinanceApp();

  const copy = headerCopy[activeView];

  return (
    <header className="flex flex-col gap-4 border-b border-ghost-border bg-surface px-4 py-4 sm:px-6 sm:py-5 lg:flex-row lg:items-center lg:justify-between lg:px-9">
      <div className="min-w-0">
        <p className="text-[0.85rem] font-semibold uppercase tracking-[0.18em] text-primary">
          {copy.eyebrow}
        </p>
        <h1 className="mt-1 text-[1.15rem] font-medium tracking-[-0.04em] text-on-surface sm:text-[1.35rem] lg:text-[1.6rem]">
          {copy.title}
        </h1>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end lg:self-auto">
        <DarkModeToggle />
        <button className="relative flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-panel-muted">
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
        </button>
        <RoleSwitcher />
      </div>
    </header>
  );
}
