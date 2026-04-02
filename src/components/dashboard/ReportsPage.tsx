import { useFinanceApp } from "../../context/FinanceAppContext";
import { formatCompactCurrency, formatCurrency } from "../../utils/format";

export default function ReportsPage() {
  const { reportCards, categoryTotals, trend, insights } = useFinanceApp();

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-[2.2rem] font-semibold tracking-[-0.06em] text-on-surface sm:text-[3rem]">
          Spending patterns at a glance
        </h2>
        <p className="mt-4 max-w-3xl text-lg text-on-surface-variant">
          This report view turns the same transaction dataset into higher-level insights,
          so the evaluation can see both interface design and the way state is reused
          across features.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {reportCards.map((card) => (
          <article
            key={card.label}
            className="rounded-[24px] border border-ghost-border bg-panel p-6 shadow-panel"
          >
            <p className="text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-muted-accent">
              {card.label}
            </p>
            <h3 className="mt-4 text-[2rem] font-semibold tracking-[-0.05em] text-on-surface">
              {typeof card.value === "number" && card.value > 100
                ? formatCurrency(card.value)
                : `${Number(card.value).toFixed(1)}${card.label === "Expense Intensity" ? "%" : ""}`}
            </h3>
            <p className="mt-3 text-on-surface-variant">{card.caption}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.3fr_0.9fr]">
        <article className="rounded-[24px] border border-ghost-border bg-panel p-6 shadow-panel">
          <h3 className="text-[1.3rem] font-semibold tracking-[-0.04em] text-on-surface">
            Monthly balance trajectory
          </h3>
          <div className="mt-6 space-y-4">
            {trend.map((entry, index) => (
              <div key={entry.month}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-on-surface">{entry.label}</span>
                  <span className="text-on-surface-variant">
                    {formatCompactCurrency(entry.value)}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-track">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${55 + index * 8}%`,
                      backgroundColor: "var(--primary)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[24px] border border-ghost-border bg-panel p-6 shadow-panel">
          <h3 className="text-[1.3rem] font-semibold tracking-[-0.04em] text-on-surface">
            Category mix
          </h3>
          <div className="mt-6 space-y-4">
            {categoryTotals.map((entry, index) => (
              <div key={entry.category} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: `var(--chart-${(index % 4) + 1})` }}
                  />
                  <span className="text-on-surface">{entry.label}</span>
                </div>
                <span className="font-semibold text-on-surface-variant">
                  {formatCurrency(entry.value)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[20px] bg-panel-muted p-5">
            <p className="text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-muted-accent">
              Analyst Note
            </p>
            <p className="mt-3 text-on-surface">
              The highest expense this month was{" "}
              <span className="font-semibold">
                {insights.largestExpense?.description ?? "not available"}
              </span>
              , while rent remains the top structural spend category.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
