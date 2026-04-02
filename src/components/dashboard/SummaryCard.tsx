import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";
import { formatCurrency } from "../../utils/format";

interface SummaryCardProps {
  title: string;
  amount: number;
  tone: "balance" | "income" | "expense";
  detail: string;
  progress?: number;
}

export default function SummaryCard({
  title,
  amount,
  tone,
  detail,
  progress,
}: SummaryCardProps) {
  const icon =
    tone === "balance" ? (
      <Wallet size={18} />
    ) : tone === "income" ? (
      <ArrowUpRight size={18} />
    ) : (
      <ArrowDownRight size={18} />
    );

  const iconClasses =
    tone === "income"
      ? "bg-[var(--income-soft)] text-income"
      : tone === "expense"
        ? "bg-[var(--expense-soft)] text-expense"
        : "bg-primary-soft text-primary";

  const barColor =
    tone === "expense" ? "bg-expense" : tone === "income" ? "bg-income" : "bg-primary";

  return (
    <article className="rounded-[24px] border border-ghost-border bg-panel p-5 shadow-panel sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-muted-accent">
            {title}
          </p>
          <p className="mt-3 break-words text-[1.7rem] font-semibold tracking-[-0.05em] text-on-surface sm:text-[2.2rem]">
            {formatCurrency(amount)}
          </p>
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${iconClasses}`}>
          {icon}
        </div>
      </div>

      {progress ? (
        <div className="mt-5">
          <div className="h-1.5 rounded-full bg-track">
            <div className={`h-1.5 rounded-full ${barColor}`} style={{ width: `${progress}%` }} />
          </div>
        </div>
      ) : null}

      <p
        className={`mt-4 text-sm font-medium ${
          tone === "expense"
            ? "text-expense"
            : tone === "income"
              ? "text-income"
              : "text-on-surface-variant"
        }`}
      >
        {detail}
      </p>
    </article>
  );
}
