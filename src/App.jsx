import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ImportCases from "./pages/ImportCases";
import ReviewCase from "./pages/ReviewCase";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <div className="mx-auto max-w-[1460px] px-4 py-6 sm:px-6 lg:px-8">
          <header className="mb-6 overflow-hidden rounded-[32px] border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 backdrop-blur-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">RemisionBot</p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Gestión moderna de remisiones</h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  Navega casos, revisa documentos y controla el flujo con una interfaz clara y ordenada.
                </p>
              </div>
              <div className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 shadow-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-500" />
                Interfaz renovada
              </div>
            </div>
          </header>
          <div className="grid min-h-[calc(100vh-170px)] gap-6 lg:grid-cols-[300px_1fr]">
            <Sidebar />
            <main className="space-y-6 pb-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/import" element={<ImportCases />} />
                <Route path="/review" element={<ReviewCase />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;