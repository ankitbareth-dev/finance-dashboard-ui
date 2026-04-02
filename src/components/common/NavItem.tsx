import type { ReactNode } from "react";

interface NavItemProps {
  icon: ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function NavItem({
  icon,
  label,
  isActive = false,
  onClick,
}: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex min-w-max items-center gap-3 rounded-[16px] px-4 py-3 text-left text-[0.95rem] font-medium transition-all duration-200 sm:gap-4 sm:px-5 sm:py-4 sm:text-[1rem] lg:w-full lg:min-w-0 ${
        isActive
          ? "bg-primary-soft text-primary shadow-[0_12px_24px_rgba(14,124,99,0.12)]"
          : "text-on-surface-variant hover:bg-panel-muted hover:text-on-surface"
      }`}
    >
      <span className="flex h-5 w-5 items-center justify-center">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
