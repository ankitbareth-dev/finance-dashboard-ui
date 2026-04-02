import { useFinanceApp } from "../../context/FinanceAppContext";
import { formatCurrency } from "../../utils/format";

export default function BudgetPage() {
  const { budgetProgress, summary } = useFinanceApp();

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-[2.2rem] font-semibold tracking-[-0.06em] text-on-surface sm:text-[3rem]">
            Budget control center
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-on-surface-variant">
            Budget progress is derived from the same live transactions. This helps
            demonstrate shared state and insight reuse across the app.
          </p>
        </div>

        <div className="rounded-[24px] border border-ghost-border bg-panel px-6 py-5 shadow-panel">
          <p className="text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-muted-accent">
            Monthly Envelope
          </p>
          <p className="mt-2 text-[2rem] font-semibold tracking-[-0.05em] text-on-surface">
            {formatCurrency(summary.expenses)}
          </p>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        {budgetProgress.map((item, index) => (
          <article
            key={item.category}
            className="rounded-[24px] border border-ghost-border bg-panel p-6 shadow-panel"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-muted-accent">
                  {item.label}
                </p>
                <p className="mt-3 text-[1.85rem] font-semibold tracking-[-0.05em] text-on-surface">
                  {item.utilization.toFixed(0)}%
                </p>
              </div>
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em]"
                style={{
                  color: `var(--budget-${index + 1})`,
                  backgroundColor: "color-mix(in srgb, var(--panel-muted) 72%, transparent)",
                }}
              >
                {formatCurrency(item.actual)} spent
              </span>
            </div>

            <div className="mt-5 h-2 rounded-full bg-track">
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${Math.min(item.utilization, 100)}%`,
                  backgroundColor: `var(--budget-${index + 1})`,
                }}
              />
            </div>
            <p className="mt-4 text-on-surface-variant">
              Budget {formatCurrency(item.budget)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
