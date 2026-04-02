import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { defaultFilters, defaultRole, defaultTheme, transactionsSeed } from "../data/mockData";
import type {
  AppFilters,
  AppView,
  ThemeMode,
  ToastState,
  Transaction,
  TransactionDraft,
  UserRole,
} from "../types";
import {
  countActiveFilters,
  getBudgetProgress,
  getCategoryTotals,
  getExportRows,
  getFilteredTransactions,
  getInsightMetrics,
  getMonthlySummary,
  getReportCards,
  getTrendSeries,
} from "../utils/finance";

const STORAGE_KEYS = {
  role: "finance-dashboard-role",
  theme: "finance-dashboard-theme",
  transactions: "finance-dashboard-transactions",
  view: "finance-dashboard-view",
};

interface AppState {
  role: UserRole;
  theme: ThemeMode;
  activeView: AppView;
  transactions: Transaction[];
  filters: AppFilters;
}

type Action =
  | { type: "set-role"; payload: UserRole }
  | { type: "set-theme"; payload: ThemeMode }
  | { type: "set-view"; payload: AppView }
  | { type: "set-filters"; payload: Partial<AppFilters> }
  | { type: "reset-filters" }
  | { type: "add-transaction"; payload: Transaction }
  | { type: "update-transaction"; payload: Transaction }
  | { type: "delete-transaction"; payload: string }
  | { type: "reset-transactions" };

const initialState: AppState = {
  role: defaultRole,
  theme: defaultTheme,
  activeView: "overview",
  transactions: transactionsSeed,
  filters: { ...defaultFilters },
};

function safeParse<T>(value: string | null): T | null {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function getInitialState(): AppState {
  if (typeof window === "undefined") {
    return initialState;
  }

  const savedRole = safeParse<UserRole>(window.localStorage.getItem(STORAGE_KEYS.role));
  const savedTheme = safeParse<ThemeMode>(window.localStorage.getItem(STORAGE_KEYS.theme));
  const savedTransactions = safeParse<Transaction[]>(
    window.localStorage.getItem(STORAGE_KEYS.transactions),
  );
  const savedView = safeParse<AppView>(window.localStorage.getItem(STORAGE_KEYS.view));

  return {
    ...initialState,
    role: savedRole ?? initialState.role,
    theme: savedTheme ?? initialState.theme,
    transactions: savedTransactions ?? initialState.transactions,
    activeView: savedView ?? initialState.activeView,
  };
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "set-role":
      return { ...state, role: action.payload };
    case "set-theme":
      return { ...state, theme: action.payload };
    case "set-view":
      return { ...state, activeView: action.payload };
    case "set-filters":
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case "reset-filters":
      return { ...state, filters: { ...defaultFilters } };
    case "add-transaction":
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case "update-transaction":
      return {
        ...state,
        transactions: state.transactions.map((transaction) =>
          transaction.id === action.payload.id ? action.payload : transaction,
        ),
      };
    case "delete-transaction":
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload,
        ),
      };
    case "reset-transactions":
      return { ...state, transactions: transactionsSeed };
    default:
      return state;
  }
}

interface FinanceAppContextValue {
  state: AppState;
  setRole: (role: UserRole) => void;
  setTheme: (theme: ThemeMode) => void;
  setView: (view: AppView) => void;
  setFilters: (filters: Partial<AppFilters>) => void;
  resetFilters: () => void;
  addTransaction: (draft: TransactionDraft) => void;
  updateTransaction: (id: string, draft: TransactionDraft) => void;
  deleteTransaction: (id: string) => void;
  resetTransactions: () => void;
  filteredTransactions: Transaction[];
  activeFilterCount: number;
  summary: ReturnType<typeof getMonthlySummary>;
  trend: ReturnType<typeof getTrendSeries>;
  categoryTotals: ReturnType<typeof getCategoryTotals>;
  budgetProgress: ReturnType<typeof getBudgetProgress>;
  insights: ReturnType<typeof getInsightMetrics>;
  reportCards: ReturnType<typeof getReportCards>;
  exportRows: ReturnType<typeof getExportRows>;
  toast: ToastState | null;
  showToast: (toast: ToastState) => void;
  hideToast: () => void;
}

const FinanceAppContext = createContext<FinanceAppContextValue | null>(null);

function toTransaction(id: string, draft: TransactionDraft): Transaction {
  const amountValue = Number.parseFloat(draft.amount);

  return {
    id,
    date: draft.date,
    description: draft.description.trim(),
    category: draft.category,
    type: draft.type,
    amount: draft.type === "expense" ? -Math.abs(amountValue) : Math.abs(amountValue),
  };
}

function createTransactionId() {
  return `txn-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function FinanceAppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState);
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", state.theme === "dark");
    window.localStorage.setItem(STORAGE_KEYS.role, JSON.stringify(state.role));
    window.localStorage.setItem(STORAGE_KEYS.theme, JSON.stringify(state.theme));
    window.localStorage.setItem(
      STORAGE_KEYS.transactions,
      JSON.stringify(state.transactions),
    );
    window.localStorage.setItem(STORAGE_KEYS.view, JSON.stringify(state.activeView));
  }, [state.activeView, state.role, state.theme, state.transactions]);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const filteredTransactions = useMemo(
    () => getFilteredTransactions(state.transactions, state.filters),
    [state.filters, state.transactions],
  );
  const activeFilterCount = useMemo(
    () => countActiveFilters(state.filters),
    [state.filters],
  );
  const summary = useMemo(() => getMonthlySummary(state.transactions), [state.transactions]);
  const trend = useMemo(() => getTrendSeries(state.transactions), [state.transactions]);
  const categoryTotals = useMemo(
    () => getCategoryTotals(state.transactions, summary.latestMonth),
    [state.transactions, summary.latestMonth],
  );
  const budgetProgress = useMemo(
    () => getBudgetProgress(state.transactions, summary.latestMonth),
    [state.transactions, summary.latestMonth],
  );
  const insights = useMemo(
    () => getInsightMetrics(state.transactions),
    [state.transactions],
  );
  const reportCards = useMemo(
    () => getReportCards(state.transactions),
    [state.transactions],
  );
  const exportRows = useMemo(
    () => getExportRows(filteredTransactions),
    [filteredTransactions],
  );

  const value = useMemo<FinanceAppContextValue>(
    () => ({
      state,
      setRole: (role) => dispatch({ type: "set-role", payload: role }),
      setTheme: (theme) => dispatch({ type: "set-theme", payload: theme }),
      setView: (view) => dispatch({ type: "set-view", payload: view }),
      setFilters: (filters) => dispatch({ type: "set-filters", payload: filters }),
      resetFilters: () => dispatch({ type: "reset-filters" }),
      addTransaction: (draft) => {
        dispatch({
          type: "add-transaction",
          payload: toTransaction(createTransactionId(), draft),
        });
        setToast({ message: "Transaction added successfully", tone: "success" });
      },
      updateTransaction: (id, draft) => {
        dispatch({
          type: "update-transaction",
          payload: toTransaction(id, draft),
        });
        setToast({ message: "Transaction updated successfully", tone: "success" });
      },
      deleteTransaction: (id) => {
        dispatch({ type: "delete-transaction", payload: id });
        setToast({ message: "Transaction removed", tone: "info" });
      },
      resetTransactions: () => {
        dispatch({ type: "reset-transactions" });
        setToast({ message: "Demo data restored", tone: "info" });
      },
      filteredTransactions,
      activeFilterCount,
      summary,
      trend,
      categoryTotals,
      budgetProgress,
      insights,
      reportCards,
      exportRows,
      toast,
      showToast: setToast,
      hideToast: () => setToast(null),
    }),
    [
      activeFilterCount,
      budgetProgress,
      categoryTotals,
      exportRows,
      filteredTransactions,
      insights,
      reportCards,
      state,
      summary,
      toast,
      trend,
    ],
  );

  return (
    <FinanceAppContext.Provider value={value}>{children}</FinanceAppContext.Provider>
  );
}

export function useFinanceApp() {
  const context = useContext(FinanceAppContext);

  if (!context) {
    throw new Error("useFinanceApp must be used within FinanceAppProvider");
  }

  return context;
}
