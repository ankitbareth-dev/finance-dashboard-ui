import RoleSwitcher from "../common/RoleSwitcher";
import DarkModeToggle from "../common/DarkModeToggle";
import SummaryCardsRow from "../dashboard/SummaryCardsRow";

export default function MainContent() {
  return (
    <main className="flex-1 overflow-y-auto bg-surface p-8">
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-[1.25rem] font-semibold tracking-[-0.015em] leading-[1.3] text-on-surface">
            Good morning, John
          </h1>
          <div className="mt-1.5 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <p className="text-[0.8125rem] font-normal tracking-[0.01em] leading-normal text-on-surface-variant">
              Your assets are growing. Keep it up!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <RoleSwitcher />
          <DarkModeToggle />
        </div>
      </header>

      <div className="mt-8">
        <SummaryCardsRow />
      </div>
    </main>
  );
}
