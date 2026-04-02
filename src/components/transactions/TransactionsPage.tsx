import { useMemo, useState } from "react";
import {
  Download,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useFinanceApp } from "../../context/FinanceAppContext";
import { categoryLabels, categoryOrder } from "../../data/mockData";
import { formatCurrency, formatDate } from "../../utils/format";
import { CategoryBadge, TypeBadge } from "../common/CategoryBadge";
import TransactionModal from "./TransactionModal";
import type { Transaction } from "../../types";

function downloadCsv(
  rows: Array<Record<string, string>>,
  filename: string,
) {
  const headers = Object.keys(rows[0] ?? {});
  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      headers
        .map((header) => JSON.stringify(row[header] ?? ""))
        .join(","),
    ),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

export default function TransactionsPage() {
  const {
    state: {
      role,
      filters: { category, search, sortBy, type },
    },
    filteredTransactions,
    activeFilterCount,
    setFilters,
    resetFilters,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    exportRows,
    showToast,
  } = useFinanceApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const pageRows = useMemo(() => filteredTransactions.slice(0, 8), [filteredTransactions]);

  const openCreateModal = () => {
    setEditingTransaction(null);
    setModalOpen(true);
  };

  const handleExport = () => {
    if (exportRows.length === 0) {
      showToast({ message: "No transactions available for export", tone: "info" });
      return;
    }

    downloadCsv(exportRows, "bespoke-vault-transactions.csv");
    showToast({ message: "CSV export started", tone: "info" });
  };

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-[0.85rem] font-semibold uppercase tracking-[0.18em] text-muted-accent">
            Portfolio Ledger
          </p>
          <h2 className="mt-2 text-[1.95rem] font-semibold tracking-[-0.06em] text-on-surface sm:text-[2.4rem] lg:text-[3.1rem]">
            Transactions
          </h2>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            onClick={handleExport}
            className="inline-flex w-full items-center justify-center gap-3 rounded-[18px] border border-ghost-border bg-panel px-5 py-3.5 font-semibold text-on-surface transition-colors hover:bg-panel-muted sm:w-auto sm:px-6 sm:py-4"
          >
            <Download size={18} />
            Export
          </button>
          {role === "admin" ? (
            <button
              onClick={openCreateModal}
              className="inline-flex w-full items-center justify-center gap-3 rounded-[18px] bg-primary px-5 py-3.5 font-semibold text-white shadow-[0_18px_30px_rgba(14,124,99,0.25)] transition-transform hover:-translate-y-0.5 sm:w-auto sm:px-6 sm:py-4"
            >
              <Plus size={18} />
              Add Transaction
            </button>
          ) : null}
        </div>
      </div>

      <div className="rounded-[24px] border border-ghost-border bg-panel p-4 shadow-panel sm:p-5">
        <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,2fr)_180px_180px_180px_auto]">
          <label className="relative">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-muted"
            />
            <input
              value={search}
              onChange={(event) => setFilters({ search: event.target.value })}
              placeholder="Search transactions, categories, or notes"
              className="w-full rounded-[18px] border border-ghost-border bg-panel-muted py-4 pl-12 pr-4 text-on-surface outline-none transition-colors focus:border-primary"
            />
          </label>

          <select
            value={type}
            onChange={(event) =>
              setFilters({ type: event.target.value as typeof type })
            }
            className="rounded-[18px] border border-ghost-border bg-panel-muted px-4 py-4 text-on-surface outline-none transition-colors focus:border-primary"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <select
            value={category}
            onChange={(event) =>
              setFilters({ category: event.target.value as typeof category })
            }
            className="rounded-[18px] border border-ghost-border bg-panel-muted px-4 py-4 text-on-surface outline-none transition-colors focus:border-primary"
          >
            <option value="all">All Categories</option>
            {categoryOrder.map((item) => (
              <option key={item} value={item}>
                {categoryLabels[item]}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(event) =>
              setFilters({ sortBy: event.target.value as typeof sortBy })
            }
            className="rounded-[18px] border border-ghost-border bg-panel-muted px-4 py-4 text-on-surface outline-none transition-colors focus:border-primary"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Amount High-Low</option>
            <option value="amount-asc">Amount Low-High</option>
          </select>

          <div className="flex items-center justify-between rounded-[18px] bg-primary-soft px-4 py-4 text-primary xl:justify-center xl:gap-3">
            <span className="text-sm font-semibold uppercase tracking-[0.14em]">
              {activeFilterCount} active
            </span>
            {activeFilterCount > 0 ? (
              <button onClick={resetFilters} aria-label="Reset filters">
                <X size={16} />
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[24px] border border-ghost-border bg-panel shadow-panel">
        <div className="grid gap-4 p-4 sm:p-5 md:hidden">
          {pageRows.map((transaction) => (
            <article
              key={transaction.id}
              className="rounded-[20px] border border-ghost-border bg-panel-muted/55 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-accent">
                    {formatDate(transaction.date)}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-on-surface">
                    {transaction.description}
                  </h3>
                </div>
                <div
                  className={`text-right text-lg font-semibold ${
                    transaction.type === "income" ? "text-income" : "text-expense"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}
                  {formatCurrency(Math.abs(transaction.amount))}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <CategoryBadge category={transaction.category} />
                <TypeBadge type={transaction.type} />
              </div>

              {role === "admin" ? (
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => {
                      setEditingTransaction(transaction);
                      setModalOpen(true);
                    }}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-ghost-border px-3 py-2.5 text-on-surface-variant transition-colors hover:bg-panel hover:text-on-surface"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTransaction(transaction.id)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-ghost-border px-3 py-2.5 text-on-surface-variant transition-colors hover:bg-red-500/10 hover:text-expense"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              ) : null}
            </article>
          ))}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="min-w-full">
            <thead className="bg-panel-muted">
              <tr className="text-left text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-muted-accent">
                <th className="px-6 py-5">Date</th>
                <th className="px-6 py-5">Description</th>
                <th className="px-6 py-5">Category</th>
                <th className="px-6 py-5">Type</th>
                <th className="px-6 py-5 text-right">Amount</th>
                {role === "admin" ? <th className="px-6 py-5 text-right">Actions</th> : null}
              </tr>
            </thead>
            <tbody>
              {pageRows.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-t border-ghost-border/70 text-on-surface transition-colors hover:bg-panel-muted/60"
                >
                  <td className="px-6 py-5 text-on-surface-variant">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="px-6 py-5">
                    <div className="font-semibold">{transaction.description}</div>
                    {transaction.note ? (
                      <div className="mt-1 text-sm text-on-surface-muted">
                        {transaction.note}
                      </div>
                    ) : null}
                  </td>
                  <td className="px-6 py-5">
                    <CategoryBadge category={transaction.category} />
                  </td>
                  <td className="px-6 py-5">
                    <TypeBadge type={transaction.type} />
                  </td>
                  <td
                    className={`px-6 py-5 text-right text-[1.05rem] font-semibold ${
                      transaction.type === "income" ? "text-income" : "text-expense"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}
                    {formatCurrency(Math.abs(transaction.amount))}
                  </td>
                  {role === "admin" ? (
                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingTransaction(transaction);
                            setModalOpen(true);
                          }}
                          className="rounded-xl border border-ghost-border px-3 py-2 text-on-surface-variant transition-colors hover:bg-panel-muted hover:text-on-surface"
                          aria-label={`Edit ${transaction.description}`}
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => deleteTransaction(transaction.id)}
                          className="rounded-xl border border-ghost-border px-3 py-2 text-on-surface-variant transition-colors hover:bg-red-500/10 hover:text-expense"
                          aria-label={`Delete ${transaction.description}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-2 border-t border-ghost-border px-4 py-4 text-sm text-on-surface-muted sm:px-6 md:flex-row md:items-center md:justify-between">
          <span>
            Showing {pageRows.length} of {filteredTransactions.length} matching transactions
          </span>
          <span>Local persistence enabled</span>
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="flex min-h-[240px] items-center justify-center rounded-[24px] border border-dashed border-ghost-border bg-panel text-center shadow-panel">
          <div className="max-w-sm px-6 py-10">
            <div className="text-[1.7rem] font-semibold tracking-[-0.04em] text-on-surface">
              No transactions found
            </div>
            <p className="mt-3 text-on-surface-variant">
              Try adjusting your search or filters. The empty state is handled so the
              interface still feels intentional when no data matches.
            </p>
          </div>
        </div>
      ) : null}

      {modalOpen ? (
        <TransactionModal
          key={editingTransaction?.id ?? "new"}
          transaction={editingTransaction}
          onClose={() => setModalOpen(false)}
          onSubmit={(draft) => {
            if (editingTransaction) {
              updateTransaction(editingTransaction.id, draft);
              return;
            }
            addTransaction(draft);
          }}
        />
      ) : null}
    </section>
  );
}
