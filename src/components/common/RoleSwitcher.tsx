import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function RoleSwitcher() {
  const [role, setRole] = useState("admin");

  return (
    <div className="relative">
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="appearance-none rounded-input bg-surface-low py-2 pl-3 pr-8 text-sm font-medium text-on-surface outline-none transition-colors focus:bg-surface-lowest focus:outline-1 focus:outline-secondary-glow"
      >
        <option value="admin">Admin</option>
        <option value="viewer">Viewer</option>
      </select>

      <ChevronDown
        size={14}
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant"
      />
    </div>
  );
}
