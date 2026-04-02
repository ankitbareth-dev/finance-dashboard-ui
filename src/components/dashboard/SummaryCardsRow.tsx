import { useFinanceApp } from "../../context/FinanceAppContext";
import SummaryCard from "./SummaryCard";

export default function SummaryCardsRow() {
  const {
    summary,
    insights: { monthlySavingsRate },
  } = useFinanceApp();

  return (
    <section className="grid gap-5 xl:grid-cols-3">
      <SummaryCard
        title="Total Balance"
        amount={summary.totalBalance}
        tone="balance"
        detail={`Latest cycle closed with a ${monthlySavingsRate.toFixed(1)}% savings rate.`}
      />
      <SummaryCard
        title="Monthly Income"
        amount={summary.income}
        tone="income"
        detail="Strong inflow from salary, freelance, and dividend streams."
        progress={74}
      />
      <SummaryCard
        title="Monthly Expenses"
        amount={summary.expenses}
        tone="expense"
        detail={`${Math.abs(summary.expenseChange).toFixed(1)}% ${summary.expenseChange <= 0 ? "below" : "above"} last month.`}
        progress={62}
      />
    </section>
  );
}
