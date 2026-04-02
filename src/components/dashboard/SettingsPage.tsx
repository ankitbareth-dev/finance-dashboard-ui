import { Database, MonitorCog, RotateCcw, ShieldCheck } from "lucide-react";
import { useFinanceApp } from "../../context/FinanceAppContext";

export default function SettingsPage() {
  const {
    state: { role, theme },
    setRole,
    setTheme,
    resetTransactions,
  } = useFinanceApp();

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-[2.2rem] font-semibold tracking-[-0.06em] text-on-surface sm:text-[3rem]">
          Demo controls and preferences
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-on-surface-variant">
          This page makes the optional features visible for review: role simulation,
          theme switching, local persistence, and data reset.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <article className="rounded-[24px] border border-ghost-border bg-panel p-6 shadow-panel">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
            <ShieldCheck size={22} />
          </div>
          <h3 className="mt-5 text-[1.35rem] font-semibold tracking-[-0.04em] text-on-surface">
            Role-based UI
          </h3>
          <p className="mt-3 text-on-surface-variant">
            Viewer mode can inspect data only. Admin mode can add, edit, delete, and
            export transactions.
          </p>
          <div className="mt-5 flex gap-3">
            <button
              onClick={() => setRole("viewer")}
              className={`rounded-2xl px-4 py-3 font-medium ${
                role === "viewer"
                  ? "bg-primary text-white"
                  : "bg-panel-muted text-on-surface-variant"
              }`}
            >
              Viewer
            </button>
            <button
              onClick={() => setRole("admin")}
              className={`rounded-2xl px-4 py-3 font-medium ${
                role === "admin"
                  ? "bg-primary text-white"
                  : "bg-panel-muted text-on-surface-variant"
              }`}
            >
              Admin
            </button>
          </div>
        </article>

        <article className="rounded-[24px] border border-ghost-border bg-panel p-6 shadow-panel">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
            <MonitorCog size={22} />
          </div>
          <h3 className="mt-5 text-[1.35rem] font-semibold tracking-[-0.04em] text-on-surface">
            Theme persistence
          </h3>
          <p className="mt-3 text-on-surface-variant">
            Light and dark mode choices are saved locally so the interface stays in the
            last selected appearance after refresh.
          </p>
          <div className="mt-5 flex gap-3">
            <button
              onClick={() => setTheme("light")}
              className={`rounded-2xl px-4 py-3 font-medium ${
                theme === "light"
                  ? "bg-primary text-white"
                  : "bg-panel-muted text-on-surface-variant"
              }`}
            >
              Light
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`rounded-2xl px-4 py-3 font-medium ${
                theme === "dark"
                  ? "bg-primary text-white"
                  : "bg-panel-muted text-on-surface-variant"
              }`}
            >
              Dark
            </button>
          </div>
        </article>

        <article className="rounded-[24px] border border-ghost-border bg-panel p-6 shadow-panel">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
            <Database size={22} />
          </div>
          <h3 className="mt-5 text-[1.35rem] font-semibold tracking-[-0.04em] text-on-surface">
            Local storage
          </h3>
          <p className="mt-3 text-on-surface-variant">
            Transactions, role, theme, and active view are stored in local storage to
            simulate persistence without a backend.
          </p>
          <button
            onClick={resetTransactions}
            className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-ghost-border px-4 py-3 font-medium text-on-surface transition-colors hover:bg-panel-muted"
          >
            <RotateCcw size={16} />
            Restore demo data
          </button>
        </article>
      </div>
    </section>
  );
}
