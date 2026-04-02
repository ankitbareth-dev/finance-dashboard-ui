import { categoryLabels } from "../../data/mockData";
import type { TransactionCategory, TransactionType } from "../../types";

const categoryClasses: Record<TransactionCategory, string> = {
  salary: "bg-emerald-100/80 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  freelance:
    "bg-violet-100/80 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  rent: "bg-purple-100/80 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300",
  food: "bg-amber-100/80 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  transport: "bg-blue-100/80 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
  shopping: "bg-pink-100/80 text-pink-700 dark:bg-pink-500/15 dark:text-pink-300",
  utilities:
    "bg-orange-100/80 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300",
  investment: "bg-cyan-100/80 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300",
  other: "bg-slate-200/80 text-slate-700 dark:bg-slate-500/15 dark:text-slate-300",
};

const typeClasses: Record<TransactionType, string> = {
  income: "bg-emerald-100/80 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  expense: "bg-slate-200/80 text-slate-700 dark:bg-slate-500/15 dark:text-slate-300",
};

export function CategoryBadge({ category }: { category: TransactionCategory }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${categoryClasses[category]}`}
    >
      {categoryLabels[category]}
    </span>
  );
}

export function TypeBadge({ type }: { type: TransactionType }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${typeClasses[type]}`}
    >
      {type}
    </span>
  );
}
