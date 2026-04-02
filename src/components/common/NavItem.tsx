import { type ReactNode } from "react";

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
      className={`
        group relative flex w-full items-center gap-3 rounded-btn px-4 py-2.5 text-sm font-medium
        transition-colors duration-200 ease-smooth
        ${
          isActive
            ? "bg-primary-soft text-primary"
            : "text-on-surface-variant hover:bg-surface-low hover:text-on-surface"
        }
      `}
    >
      {isActive && (
        <span className="absolute left-0 top-1/2 h-5 w-0.75 -translate-y-1/2 rounded-full bg-primary" />
      )}

      <span className="flex h-5 w-5 items-center justify-center">{icon}</span>

      <span>{label}</span>
    </button>
  );
}
