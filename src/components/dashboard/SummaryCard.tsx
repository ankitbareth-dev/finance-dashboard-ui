import { type ReactNode } from "react";
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import type { SummaryData } from "../../data/mockData";

const iconMap: Record<
  SummaryData["type"],
  { icon: ReactNode; bg: string; color: string }
> = {
  balance: {
    icon: <Wallet size={20} />,
    bg: "bg-primary-soft",
    color: "text-primary",
  },
  income: {
    icon: <ArrowDownLeft size={20} />,
    bg: "bg-income-soft",
    color: "text-income",
  },
  expense: {
    icon: <ArrowUpRight size={20} />,
    bg: "bg-expense-soft",
    color: "text-expense",
  },
};

interface SummaryCardProps {
  data: SummaryData;
}

export default function SummaryCard({ data }: SummaryCardProps) {
  const { icon, bg, color } = iconMap[data.type];
  const isPositive = data.trend === "up";

  return (
    <div className="group bg-surface-lowest rounded-card shadow-ambient p-6 transition-all duration-200 ease-smooth hover:shadow-ambient-hover hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${bg} ${color}`}
        >
          {icon}
        </div>

        <div className="flex items-center gap-1">
          {isPositive ? (
            <TrendingUp size={14} className="text-income" />
          ) : (
            <TrendingDown size={14} className="text-expense" />
          )}
          <span
            className={`text-xs font-semibold ${isPositive ? "text-income" : "text-expense"}`}
          >
            {data.trendValue}
          </span>
        </div>
      </div>

      <div className="mt-5">
        <p className="label-sm text-on-surface-muted">{data.title}</p>
        <p className="display-sm mt-1 text-on-surface" data-numeric>
          {data.amount}
        </p>
      </div>

      <p className="mt-2 text-xs text-on-surface-muted">vs last month</p>
    </div>
  );
}
