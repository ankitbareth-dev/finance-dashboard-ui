import {
  budgets,
  categoryLabels,
  categoryOrder,
  startingBalance,
} from "../data/mockData";
import type { AppFilters, BudgetItem, Transaction, TransactionCategory } from "../types";
import { formatMonthLabel, percentageChange } from "./format";

export function getLatestMonth(transactions: Transaction[]) {
  return [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
    ?.date.slice(0, 7);
}

export function getTransactionsForMonth(
  transactions: Transaction[],
  monthKey: string | undefined,
) {
  if (!monthKey) {
    return [];
  }

  return transactions.filter((transaction) => transaction.date.startsWith(monthKey));
}

export function getMonthlySummary(transactions: Transaction[]) {
  const latestMonth = getLatestMonth(transactions);
  const latestMonthTransactions = getTransactionsForMonth(transactions, latestMonth);

  const income = latestMonthTransactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const expenses = latestMonthTransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);

  const totalBalance =
    startingBalance + transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

  const previousMonthKey = latestMonth
    ? new Date(`${latestMonth}-01T00:00:00`).toISOString().slice(0, 7)
    : undefined;
  const previousMonth = previousMonthKey
    ? shiftMonth(previousMonthKey, -1)
    : undefined;
  const previousMonthTransactions = getTransactionsForMonth(transactions, previousMonth);
  const previousExpenses = previousMonthTransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);

  return {
    latestMonth,
    income,
    expenses,
    totalBalance,
    expenseChange: percentageChange(expenses, previousExpenses),
  };
}

function shiftMonth(monthKey: string, amount: number) {
  const date = new Date(`${monthKey}-01T00:00:00`);
  date.setMonth(date.getMonth() + amount);
  return date.toISOString().slice(0, 7);
}

export function getTrendSeries(transactions: Transaction[]) {
  const months = new Map<string, number>();

  transactions.forEach((transaction) => {
    const monthKey = transaction.date.slice(0, 7);
    months.set(monthKey, (months.get(monthKey) ?? 0) + transaction.amount);
  });

  const sortedMonths = [...months.entries()].sort(([a], [b]) => a.localeCompare(b));
  let runningBalance = startingBalance;

  return sortedMonths.map(([month, net]) => {
    runningBalance += net;
    return {
      month,
      label: formatMonthLabel(`${month}-01`),
      value: runningBalance,
    };
  });
}

export function getCategoryTotals(transactions: Transaction[], monthKey: string | undefined) {
  const monthly = getTransactionsForMonth(transactions, monthKey).filter(
    (transaction) => transaction.type === "expense",
  );

  const totals = monthly.reduce(
    (acc, transaction) => {
      acc[transaction.category] =
        (acc[transaction.category] ?? 0) + Math.abs(transaction.amount);
      return acc;
    },
    {} as Record<TransactionCategory, number>,
  );

  return categoryOrder
    .map((category) => ({
      category,
      label: categoryLabels[category],
      value: totals[category] ?? 0,
    }))
    .filter((entry) => entry.value > 0);
}

export function getTopExpenseCategory(
  transactions: Transaction[],
  monthKey: string | undefined,
) {
  return getCategoryTotals(transactions, monthKey).sort((a, b) => b.value - a.value)[0];
}

export function getBudgetProgress(
  transactions: Transaction[],
  monthKey: string | undefined,
) {
  const categoryTotals = getCategoryTotals(transactions, monthKey);

  return budgets.map((budget) => {
    const actual =
      categoryTotals.find((entry) => entry.category === budget.category)?.value ?? 0;
    const utilization = budget.budget === 0 ? 0 : (actual / budget.budget) * 100;

    return {
      ...budget,
      actual,
      utilization,
    };
  });
}

export function getInsightMetrics(transactions: Transaction[]) {
  const summary = getMonthlySummary(transactions);
  const topCategory = getTopExpenseCategory(transactions, summary.latestMonth);
  const trend = getTrendSeries(transactions);
  const latestPoint = trend[trend.length - 1]?.value ?? 0;
  const previousPoint = trend[trend.length - 2]?.value ?? 0;
  const monthlyBalanceChange = percentageChange(latestPoint, previousPoint);
  const monthlySavingsRate =
    summary.income === 0 ? 0 : ((summary.income - summary.expenses) / summary.income) * 100;

  const largestExpense = getTransactionsForMonth(transactions, summary.latestMonth)
    .filter((transaction) => transaction.type === "expense")
    .sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount))[0];

  return {
    topCategory,
    monthlyBalanceChange,
    monthlySavingsRate,
    largestExpense,
  };
}

export function getFilteredTransactions(
  transactions: Transaction[],
  filters: AppFilters,
) {
  const searchValue = filters.search.trim().toLowerCase();

  const filtered = transactions.filter((transaction) => {
    const matchesSearch =
      searchValue.length === 0 ||
      transaction.description.toLowerCase().includes(searchValue) ||
      categoryLabels[transaction.category].toLowerCase().includes(searchValue) ||
      transaction.note?.toLowerCase().includes(searchValue);

    const matchesType = filters.type === "all" || transaction.type === filters.type;
    const matchesCategory =
      filters.category === "all" || transaction.category === filters.category;

    return matchesSearch && matchesType && matchesCategory;
  });

  return filtered.sort((a, b) => {
    switch (filters.sortBy) {
      case "date-asc":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "amount-desc":
        return Math.abs(b.amount) - Math.abs(a.amount);
      case "amount-asc":
        return Math.abs(a.amount) - Math.abs(b.amount);
      case "date-desc":
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });
}

export function countActiveFilters(filters: AppFilters) {
  return [
    filters.search.trim().length > 0,
    filters.type !== "all",
    filters.category !== "all",
    filters.sortBy !== "date-desc",
  ].filter(Boolean).length;
}

export function getReportCards(transactions: Transaction[]) {
  const summary = getMonthlySummary(transactions);
  const categoryTotals = getCategoryTotals(transactions, summary.latestMonth);
  const monthlyNet = summary.income - summary.expenses;

  return [
    {
      label: "Net Position",
      value: monthlyNet,
      caption: "Current month net cash flow",
    },
    {
      label: "Active Categories",
      value: categoryTotals.length,
      caption: "Tracked in the latest cycle",
    },
    {
      label: "Expense Intensity",
      value: summary.income === 0 ? 0 : (summary.expenses / summary.income) * 100,
      caption: "Expenses as a share of income",
    },
  ];
}

export function getExportRows(transactions: Transaction[]) {
  return transactions.map((transaction) => ({
    date: transaction.date,
    description: transaction.description,
    category: categoryLabels[transaction.category],
    type: transaction.type,
    amount: transaction.amount.toFixed(2),
  }));
}

export function getBudgetLabel(budget: BudgetItem) {
  return budget.label;
}
