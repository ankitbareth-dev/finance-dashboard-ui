import Toast from "./components/common/Toast";
import MainContent from "./components/layout/MainContent";
import Sidebar from "./components/layout/Sidebar";
import { FinanceAppProvider } from "./context/FinanceAppContext";

function App() {
  return (
    <FinanceAppProvider>
      <div className="min-h-screen bg-surface font-sans text-on-surface antialiased lg:flex">
        <Sidebar />
        <MainContent />
        <Toast />
      </div>
    </FinanceAppProvider>
  );
}

export default App;
