import { PiggyBank, TrendingUp, Wallet2 } from "lucide-react";
import { useFinanceApp } from "../../context/FinanceAppContext";
import { formatCurrency } from "../../utils/format";
import SummaryCardsRow from "./SummaryCardsRow";

function buildTrendPath(values: number[], width: number, height: number) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const stepX = width / Math.max(values.length - 1, 1);

  const points = values.map((value, index) => {
    const x = index * stepX;
    const y = height - ((value - min) / range) * (height - 40) - 20;
    return { x, y };
  });

  const path = points.reduce((acc, point, index, allPoints) => {
    if (index === 0) {
      return `M ${point.x} ${point.y}`;
    }

    const previous = allPoints[index - 1];
    const controlX = (previous.x + point.x) / 2;
    return `${acc} C ${controlX} ${previous.y}, ${controlX} ${point.y}, ${point.x} ${point.y}`;
  }, "");

  return {
    path,
    area: `${path} L ${width} ${height} L 0 ${height} Z`,
    points,
  };
}

export default function OverviewPage() {
  const { trend, categoryTotals, budgetProgress, insights } = useFinanceApp();
  const chart = buildTrendPath(
    trend.map((point) => point.value),
    640,
    250,
  );

  const donutStops = categoryTotals.reduce(
    (acc, segment, index) => {
      const start = acc.offset;
      const nextOffset = start + (segment.value / acc.total) * 100;
      acc.gradients.push(
        `var(--chart-${index + 1}) ${start}% ${nextOffset}%`,
      );
      acc.offset = nextOffset;
      return acc;
    },
    {
      offset: 0,
      total: categoryTotals.reduce((sum, segment) => sum + segment.value, 0) || 1,
      gradients: [] as string[],
    },
  );

  const insightCards = [
    {
      eyebrow: "Top Category",
      title: insights.topCategory?.label ?? "No category yet",
      subtitle: insights.topCategory ? formatCurrency(insights.topCategory.value) : "Add data",
      accent: "violet",
      icon: <Wallet2 size={18} />,
    },
    {
      eyebrow: "Monthly Comparison",
      title: `${insights.monthlyBalanceChange >= 0 ? "+" : ""}${insights.monthlyBalanceChange.toFixed(1)}% Net Gain`,
      subtitle: "vs previous month",
      accent: "neutral",
      icon: <TrendingUp size={18} />,
    },
    {
      eyebrow: "Savings Rate",
      title: `${insights.monthlySavingsRate.toFixed(1)}%`,
      subtitle: "Healthy cash retention",
      accent: "mint",
      progress: Math.max(0, Math.min(insights.monthlySavingsRate, 100)),
      icon: <PiggyBank size={18} />,
    },
    {
      eyebrow: "Largest Expense",
      title: insights.largestExpense?.description ?? "No expense yet",
      subtitle: insights.largestExpense
        ? `${formatCurrency(Math.abs(insights.largestExpense.amount))} single`
        : "Awaiting activity",
      accent: "rose",
      icon: <Wallet2 size={18} />,
    },
  ];

  const accentClasses: Record<string, string> = {
    violet: "bg-[var(--accent-violet-bg)] border-[var(--accent-violet)]",
    neutral: "bg-panel-muted border-transparent",
    mint: "bg-[var(--accent-mint-bg)] border-primary",
    rose: "bg-[var(--accent-rose-bg)] border-[var(--accent-rose)]",
  };

  return (
    <section className="space-y-8 sm:space-y-10">
      <div>
        <h2 className="text-[2rem] font-semibold tracking-[-0.06em] text-on-surface sm:text-[2.4rem] lg:text-[3.15rem]">
          Good morning, John
        </h2>
        <p className="mt-4 max-w-2xl text-base text-on-surface-variant sm:text-lg">
          Your family office holdings have increased this cycle. The dashboard below
          gives you a quick pulse on cash flow, spending behavior, and monthly
          performance.
        </p>
      </div>

      <SummaryCardsRow />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,2.15fr)_320px]">
        <article className="rounded-[24px] border border-ghost-border bg-panel p-5 shadow-panel sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-[1.3rem] font-semibold tracking-[-0.04em] text-on-surface">
                Balance Trend
              </h3>
              <p className="mt-1 text-on-surface-muted">Growth trajectory Jan - Jun</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="rounded-full bg-panel-muted px-4 py-1.5 font-semibold text-on-surface">
                6 Months
              </span>
              <span className="font-medium text-on-surface-muted">1 Year</span>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <svg
              viewBox="0 0 640 290"
              className="h-[220px] min-w-[560px] overflow-visible sm:h-[300px] sm:min-w-0 sm:w-full"
              role="img"
              aria-label="Balance trend chart"
            >
              <defs>
                <linearGradient id="overview-trend-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--trend-fill)" stopOpacity="0.72" />
                  <stop offset="100%" stopColor="var(--trend-fill)" stopOpacity="0.08" />
                </linearGradient>
              </defs>
              <path d={chart.area} fill="url(#overview-trend-fill)" />
              <path
                d={chart.path}
                fill="none"
                stroke="var(--primary)"
                strokeWidth="6"
                strokeLinecap="round"
              />
              {chart.points.map((point, index) => (
                <g key={`${point.x}-${point.y}`}>
                  <circle cx={point.x} cy={point.y} r="4" fill="var(--primary)" />
                  {index === chart.points.length - 1 ? (
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="8"
                      fill="transparent"
                      stroke="var(--panel)"
                      strokeWidth="3"
                    />
                  ) : null}
                </g>
              ))}
            </svg>
            <div className="mt-3 grid min-w-[560px] grid-cols-6 text-center text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-muted-accent sm:min-w-0 sm:text-[0.82rem] sm:tracking-[0.16em]">
              {trend.map((point) => (
                <span key={point.month}>{point.label}</span>
              ))}
            </div>
          </div>
        </article>

        <article className="rounded-[24px] border border-ghost-border bg-panel p-5 shadow-panel sm:p-8">
          <h3 className="text-[1.25rem] font-semibold tracking-[-0.04em] text-on-surface">
            Spending
          </h3>

          <div className="mt-8 flex justify-center sm:mt-10">
            <div
              className="relative h-36 w-36 rounded-full sm:h-40 sm:w-40"
              style={{
                background: `conic-gradient(${donutStops.gradients.join(", ")})`,
              }}
            >
              <div className="absolute inset-[20px] flex flex-col items-center justify-center rounded-full bg-panel text-center shadow-[inset_0_0_0_1px_var(--ghost-border)] sm:inset-[22px]">
                <span className="text-[1.35rem] font-semibold tracking-[-0.05em] text-on-surface sm:text-[1.9rem]">
                  {formatCurrency(
                    categoryTotals.reduce((sum, item) => sum + item.value, 0),
                  )}
                </span>
                <span className="text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-muted-accent">
                  Total
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-y-4 text-sm text-on-surface-variant sm:mt-10 sm:grid-cols-2 sm:gap-y-5">
            {categoryTotals.slice(0, 4).map((segment, index) => (
              <div key={segment.category} className="flex items-center gap-3">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: `var(--chart-${index + 1})` }}
                />
                <span>{segment.label}</span>
              </div>
            ))}
          </div>
        </article>
      </div>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {insightCards.map((card) => (
          <article
            key={card.eyebrow}
            className={`rounded-[20px] border-l-4 p-5 sm:p-6 ${accentClasses[card.accent]}`}
          >
            <div className="flex items-center gap-3 text-primary">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/70 dark:bg-white/5">
                {card.icon}
              </span>
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-muted-accent">
                {card.eyebrow}
              </p>
            </div>
            <h4 className="mt-4 text-[1.35rem] font-semibold tracking-[-0.04em] text-on-surface">
              {card.title}
            </h4>
            {card.progress ? (
              <div className="mt-4 h-1.5 rounded-full bg-track">
                <div className="h-1.5 rounded-full bg-primary" style={{ width: `${card.progress}%` }} />
              </div>
            ) : null}
            <p className="mt-3 text-sm text-on-surface-variant">{card.subtitle}</p>
          </article>
        ))}
      </section>

      <article className="rounded-[24px] border border-ghost-border bg-panel p-5 shadow-panel sm:p-8">
        <h3 className="text-[1.3rem] font-semibold tracking-[-0.04em] text-on-surface">
          Budget Utilization
        </h3>
        <div className="mt-8 space-y-8">
          {budgetProgress.map((item, index) => (
            <div key={item.category}>
              <div className="mb-3 flex items-center justify-between gap-4">
                <span className="text-[1.05rem] text-on-surface">{item.label}</span>
                <span
                  className="text-[1.05rem] font-semibold"
                  style={{ color: `var(--budget-${index + 1})` }}
                >
                  {item.utilization.toFixed(0)}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-track">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${Math.min(item.utilization, 100)}%`,
                    backgroundColor: `var(--budget-${index + 1})`,
                  }}
                />
              </div>
              {item.utilization > 100 ? (
                <p className="mt-2 text-sm italic text-expense">
                  Limit exceeded by {formatCurrency(item.actual - item.budget)}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
