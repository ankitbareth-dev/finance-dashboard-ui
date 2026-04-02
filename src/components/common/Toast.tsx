import { CheckCircle2, Info, X } from "lucide-react";
import { useFinanceApp } from "../../context/FinanceAppContext";

export default function Toast() {
  const { toast, hideToast } = useFinanceApp();

  if (!toast) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-[min(92vw,420px)] rounded-[18px] border border-white/10 bg-[#242523] px-5 py-4 text-white shadow-[0_24px_50px_rgba(15,23,42,0.28)]">
      <div className="flex items-center gap-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-[#97f0d0]">
          {toast.tone === "success" ? <CheckCircle2 size={18} /> : <Info size={18} />}
        </span>
        <p className="flex-1 text-sm sm:text-base">{toast.message}</p>
        <button
          onClick={hideToast}
          className="text-white/65 transition-colors hover:text-white"
          aria-label="Dismiss notification"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
