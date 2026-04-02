import { useState } from "react";
import {
  LayoutGrid,
  ArrowLeftRight,
  BarChart3,
  Settings,
  ShieldCheck,
} from "lucide-react";
import NavItem from "../common/NavItem";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("overview");

  return (
    <aside className="flex h-full w-64 flex-col bg-surface-lowest">
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-btn bg-primary text-white">
          <ShieldCheck size={18} strokeWidth={2.5} />
        </div>
        <span className="text-lg font-semibold tracking-tight text-on-surface">
          Safe Vault
        </span>
      </div>

      <div className="mx-5 h-px bg-surface-low" />

      <nav className="mt-4 flex flex-1 flex-col gap-1 px-3">
        <NavItem
          icon={<LayoutGrid size={20} />}
          label="Overview"
          isActive={activeItem === "overview"}
          onClick={() => setActiveItem("overview")}
        />
        <NavItem
          icon={<ArrowLeftRight size={20} />}
          label="Transactions"
          isActive={activeItem === "transactions"}
          onClick={() => setActiveItem("transactions")}
        />
        <NavItem
          icon={<BarChart3 size={20} />}
          label="Analytics"
          isActive={activeItem === "analytics"}
          onClick={() => setActiveItem("analytics")}
        />

        <div className="flex-1" />

        <NavItem
          icon={<Settings size={20} />}
          label="Settings"
          isActive={activeItem === "settings"}
          onClick={() => setActiveItem("settings")}
        />
      </nav>

      <div className="mx-5 h-px bg-surface-low" />

      <div className="flex items-center gap-3 px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-high text-sm font-semibold text-on-surface-variant">
          JD
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-on-surface">John Doe</span>
          <span className="label-sm text-on-surface-muted">Admin</span>
        </div>
      </div>
    </aside>
  );
}
