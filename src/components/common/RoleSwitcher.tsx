import { ChevronDown } from "lucide-react";
import { useFinanceApp } from "../../context/FinanceAppContext";

export default function RoleSwitcher() {
  const {
    state: { role },
    setRole,
  } = useFinanceApp();

  return (
    <div className="relative">
      <select
        value={role}
        onChange={(event) => setRole(event.target.value as "admin" | "viewer")}
        className="w-full appearance-none rounded-full border border-ghost-border bg-panel px-3 py-2.5 pr-9 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-primary outline-none transition-colors focus:border-primary sm:px-4 sm:pr-10 sm:text-sm sm:tracking-[0.16em]"
        aria-label="Select role"
      >
        <option value="admin">Admin Mode</option>
        <option value="viewer">Viewer Mode</option>
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-muted"
      />
    </div>
  );
}
