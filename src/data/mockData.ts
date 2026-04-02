export interface SummaryData {
  id: string;
  title: string;
  amount: string;
  trend: "up" | "down";
  trendValue: string;
  type: "balance" | "income" | "expense";
}

export const summaryData: SummaryData[] = [
  {
    id: "1",
    title: "Total Balance",
    amount: "$24,563.00",
    trend: "up",
    trendValue: "12.5%",
    type: "balance",
  },
  {
    id: "2",
    title: "Monthly Income",
    amount: "$8,450.00",
    trend: "up",
    trendValue: "4.2%",
    type: "income",
  },
  {
    id: "3",
    title: "Monthly Expenses",
    amount: "$5,230.00",
    trend: "down",
    trendValue: "3.2%",
    type: "expense",
  },
];
