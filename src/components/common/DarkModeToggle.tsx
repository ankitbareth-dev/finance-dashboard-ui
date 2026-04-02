import { MoonStar, SunMedium } from "lucide-react";
import { useFinanceApp } from "../../context/FinanceAppContext";

export default function DarkModeToggle() {
  const {
    state: { theme },
    setTheme,
  } = useFinanceApp();

  return (
    <div className="inline-flex items-center rounded-full bg-panel-muted p-1 shadow-inner shadow-black/5">
      <button
        onClick={() => setTheme("light")}
        className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
          theme === "light"
            ? "bg-panel text-primary shadow-[0_10px_20px_rgba(15,23,42,0.08)]"
            : "text-on-surface-muted hover:text-on-surface"
        }`}
        aria-label="Switch to light mode"
      >
        <SunMedium size={18} />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
          theme === "dark"
            ? "bg-primary text-white shadow-[0_10px_20px_rgba(14,124,99,0.24)]"
            : "text-on-surface-muted hover:text-on-surface"
        }`}
        aria-label="Switch to dark mode"
      >
        <MoonStar size={18} />
      </button>
    </div>
  );
}
