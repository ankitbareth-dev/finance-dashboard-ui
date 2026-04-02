import MainContent from "./components/layout/MainContent";
import Sidebar from "./components/layout/Sidebar";

function App() {
  return (
    <div className="flex h-screen bg-surface font-sans text-on-surface antialiased">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default App;
