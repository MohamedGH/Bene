import { INK, PAPER } from "./constants";
import useAppState from "./hooks/useAppState";
import Header from "./components/layout/Header";
import AppRoutes from "./components/layout/AppRoutes";

export default function App() {
  const state = useAppState();

  return (
    <div style={{ minHeight: "100vh", background: PAPER, color: INK, fontFamily: "Inter, system-ui, sans-serif" }}>
      <Header view={state.view} onNavigate={state.setView} />
      <main style={{ maxWidth: 880, margin: "0 auto", padding: "32px 20px 80px" }}>
        <AppRoutes state={state} />
      </main>
    </div>
  );
}
