import type { ReactNode } from "react";
import {
  BarChart3,
  LayoutGrid,
  ReceiptText,
  Settings,
  WalletCards,
} from "lucide-react";
import NavItem from "../common/NavItem";
import { useFinanceApp } from "../../context/FinanceAppContext";
import type { AppView } from "../../types";

const navItems: Array<{
  id: AppView;
  label: string;
  icon: ReactNode;
}> = [
  { id: "overview", label: "Overview", icon: <LayoutGrid size={20} /> },
  { id: "transactions", label: "Transactions", icon: <ReceiptText size={20} /> },
  { id: "reports", label: "Reports", icon: <BarChart3 size={20} /> },
  { id: "budget", label: "Budget", icon: <WalletCards size={20} /> },
  { id: "settings", label: "Settings", icon: <Settings size={20} /> },
];

export default function Sidebar() {
  const {
    state: { activeView },
    setView,
  } = useFinanceApp();

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-ghost-border bg-surface px-4 py-5 sm:px-5 sm:py-6 lg:min-h-screen lg:max-w-[270px] lg:border-r lg:border-b-0 lg:px-5 lg:py-7">
      <div className="px-1">
        <span className="text-[1.15rem] font-semibold tracking-[-0.04em] text-primary">
          Bespoke Vault
        </span>
      </div>

      <nav className="mt-5 flex flex-1 flex-col gap-4 lg:mt-8">
        <div className="-mx-1 overflow-x-auto pb-1 lg:mx-0 lg:overflow-visible lg:pb-0">
          <div className="flex gap-3 px-1 lg:flex-col lg:px-0">
            {navItems.map((item) => (
              <NavItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                isActive={activeView === item.id}
                onClick={() => setView(item.id)}
              />
            ))}
          </div>
        </div>

        <div className="border-t border-ghost-border pt-4 lg:mt-auto lg:pt-6">
          <button
            className="w-full rounded-[16px] bg-primary px-5 py-3.5 text-base font-semibold tracking-[-0.03em] text-white shadow-[0_18px_30px_rgba(14,124,99,0.25)] transition-transform hover:-translate-y-0.5 sm:text-lg sm:py-4"
            onClick={() => setView("transactions")}
          >
            + Quick Transfer
          </button>
        </div>
      </nav>
    </aside>
  );
}
