export type ThemeMode = "light" | "dark";

export type UserRole = "admin" | "viewer";

export type AppView =
  | "overview"
  | "transactions"
  | "reports"
  | "budget"
  | "settings";

export type TransactionType = "income" | "expense";

export type TransactionCategory =
  | "salary"
  | "freelance"
  | "rent"
  | "food"
  | "transport"
  | "shopping"
  | "utilities"
  | "investment"
  | "other";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: TransactionCategory;
  type: TransactionType;
  note?: string;
}

export interface BudgetItem {
  category: TransactionCategory;
  label: string;
  budget: number;
}

export interface AppFilters {
  search: string;
  type: "all" | TransactionType;
  category: "all" | TransactionCategory;
  sortBy: "date-desc" | "date-asc" | "amount-desc" | "amount-asc";
}

export interface ToastState {
  message: string;
  tone: "success" | "info";
}

export interface TransactionDraft {
  date: string;
  description: string;
  amount: string;
  category: TransactionCategory;
  type: TransactionType;
}
