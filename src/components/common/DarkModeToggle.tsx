import { useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="inline-flex items-center gap-0.5 rounded-pill bg-surface-low p-1">
      <button
        onClick={() => setIsDark(false)}
        className={`flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-xs font-medium transition-colors duration-200 ${
          !isDark
            ? "bg-primary text-white"
            : "text-on-surface-variant hover:text-on-surface"
        }`}
      >
        <Sun size={14} />
        Light
      </button>
      <button
        onClick={() => setIsDark(true)}
        className={`flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-xs font-medium transition-colors duration-200 ${
          isDark
            ? "bg-primary text-white"
            : "text-on-surface-variant hover:text-on-surface"
        }`}
      >
        <Moon size={14} />
        Dark
      </button>
    </div>
  );
}
