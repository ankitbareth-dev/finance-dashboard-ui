import { useState } from "react";
import { X } from "lucide-react";
import type { Transaction, TransactionCategory, TransactionDraft } from "../../types";
import { categoryLabels, categoryOrder } from "../../data/mockData";

const defaultDraft: TransactionDraft = {
  date: "2024-06-30",
  description: "",
  amount: "",
  category: "salary",
  type: "income",
};

interface TransactionModalProps {
  transaction?: Transaction | null;
  onClose: () => void;
  onSubmit: (draft: TransactionDraft) => void;
}

export default function TransactionModal({
  transaction,
  onClose,
  onSubmit,
}: TransactionModalProps) {
  const [draft, setDraft] = useState<TransactionDraft>(() =>
    transaction
      ? {
          date: transaction.date,
          description: transaction.description,
          amount: Math.abs(transaction.amount).toString(),
          category: transaction.category,
          type: transaction.type,
        }
      : defaultDraft,
  );

  const isValid =
    draft.description.trim().length > 0 &&
    draft.date.length > 0 &&
    Number.parseFloat(draft.amount) > 0;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/45 px-4 py-8 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-[28px] border border-ghost-border bg-panel p-6 shadow-[0_32px_80px_rgba(15,23,42,0.35)] sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-primary">
              {transaction ? "Edit Transaction" : "New Transaction"}
            </p>
            <h3 className="mt-2 text-[1.85rem] font-semibold tracking-[-0.05em] text-on-surface">
              {transaction ? "Update entry" : "Add transaction"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-on-surface-muted transition-colors hover:bg-panel-muted hover:text-on-surface"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <form
          className="mt-6 grid gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            if (!isValid) {
              return;
            }
            onSubmit(draft);
            onClose();
          }}
        >
          <label className="grid gap-2">
            <span className="text-sm font-medium text-on-surface-variant">Description</span>
            <input
              value={draft.description}
              onChange={(event) =>
                setDraft((current) => ({ ...current, description: event.target.value }))
              }
              className="rounded-2xl border border-ghost-border bg-panel-muted px-4 py-3 text-on-surface outline-none transition-colors focus:border-primary"
              placeholder="e.g. Whole Foods"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-on-surface-variant">Date</span>
              <input
                type="date"
                value={draft.date}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, date: event.target.value }))
                }
                className="rounded-2xl border border-ghost-border bg-panel-muted px-4 py-3 text-on-surface outline-none transition-colors focus:border-primary"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-on-surface-variant">Amount</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={draft.amount}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, amount: event.target.value }))
                }
                className="rounded-2xl border border-ghost-border bg-panel-muted px-4 py-3 text-on-surface outline-none transition-colors focus:border-primary"
                placeholder="0.00"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-on-surface-variant">Type</span>
              <select
                value={draft.type}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    type: event.target.value as TransactionDraft["type"],
                  }))
                }
                className="rounded-2xl border border-ghost-border bg-panel-muted px-4 py-3 text-on-surface outline-none transition-colors focus:border-primary"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-on-surface-variant">Category</span>
              <select
                value={draft.category}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    category: event.target.value as TransactionCategory,
                  }))
                }
                className="rounded-2xl border border-ghost-border bg-panel-muted px-4 py-3 text-on-surface outline-none transition-colors focus:border-primary"
              >
                {categoryOrder.map((category) => (
                  <option key={category} value={category}>
                    {categoryLabels[category]}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-ghost-border px-5 py-3 font-medium text-on-surface-variant transition-colors hover:bg-panel-muted hover:text-on-surface"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className="rounded-2xl bg-primary px-5 py-3 font-semibold text-white shadow-[0_18px_30px_rgba(14,124,99,0.25)] transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
            >
              {transaction ? "Save changes" : "Add transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
