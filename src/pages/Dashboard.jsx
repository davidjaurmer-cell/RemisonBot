import { useMemo, useState } from "react";
import CaseList from "../components/CaseList";
import CaseDetails from "../components/CaseDetails";
import PdfPanel from "../components/PdfPanel";
import PdfUploader from "../components/PdfUploader";
import StatsCard from "../components/StatsCard";
import { useCasesStore } from "../store/useCasesStore";
import { dashboardStats } from "../utils/constants";

export default function Dashboard() {
  const cases = useCasesStore((state) => state.cases);
  const selectedCaseId = useCasesStore((state) => state.selectedCaseId);
  const selectCase = useCasesStore((state) => state.selectCase);
  const selectedCase = cases.find((item) => item.id === selectedCaseId) || cases[0];
  const [pdfFile, setPdfFile] = useState(null);

  const stats = useMemo(
    () =>
      dashboardStats.map((item) => ({
        ...item,
        value: item.field === "total" ? cases.length : cases.filter((c) => c.estado === item.field).length,
      })),
    [cases]
  );

  return (
    // Se usa w-full y se adapta el padding para respetar la barra lateral del layout general
    <div className="w-full min-h-screen bg-slate-50/50 p-4 md:p-6 text-gray-800 antialiased">
      <div className="w-full space-y-6">
        
        {/* ================= HEADER REFINADO ================= */}
        <header className="relative rounded-xl border border-gray-200/80 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/10">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  En Vivo
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Resumen Ejecutivo
                </span>
              </div>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
                Dashboard de Casos
              </h1>
              <p className="text-xs text-gray-500">
                Monitorea el flujo de remisiones desde la importación hasta la validación final.
              </p>
            </div>
            <div className="self-start sm:self-center rounded-lg bg-gray-50 border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-500">
              Sincronizado al instante
            </div>
          </div>
        </header>

        {/* ================= GRID DE ESTADÍSTICAS ================= */}
        {/* Cambiado a mínimo de columnas en móvil para evitar textos empalmados */}
        <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, idx) => (
            <div
              key={item.field}
              className="bg-white rounded-xl border border-gray-200 p-1 transition-all hover:shadow-sm"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <StatsCard label={item.label} value={item.value} />
            </div>
          ))}
        </section>

        {/* ================= CONTENEDOR PRINCIPAL REESTRUCTURADO ================= */}
        {/* Rompe en columna simple en pantallas normales, y va a dos columnas anchas en pantallas ultra-wide */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-[320px_1fr] items-start">
          
          {/* COLUMNA IZQUIERDA: Lista de Casos */}
          <aside className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden lg:sticky lg:top-6">
            <div className="border-b border-gray-100 bg-gray-50/70 p-4">
              <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                📋 Lista de casos
              </h2>
              <p className="mt-0.5 text-xs text-gray-400 font-medium">{cases.length} activos</p>
            </div>
            <div className="p-2 max-h-[500px] overflow-y-auto">
              <CaseList 
                cases={cases} 
                selectedCase={selectedCase} 
                onSelectCase={(caso) => selectCase(caso.id)} 
              />
            </div>
          </aside>

          {/* COLUMNA DERECHA: El espacio de trabajo real (Apilado vertical para dar aire) */}
          <main className="space-y-6">
            
            {/* SECCIÓN 1: Detalles del Caso */}
            <section className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 bg-gray-50/70 p-4">
                <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  🔍 Detalles del caso
                </h2>
              </div>
              <div className="p-6">
                <CaseDetails caso={selectedCase} />
              </div>
            </section>

            {/* SECCIÓN 2: Visualizador de Documento */}
            <section className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 bg-gray-50/70 p-4 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    📄 Visualizador de documento
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Carga y valida la remisión física en formato PDF
                  </p>
                </div>
                <span className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                  PDF requerido
                </span>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-4 transition-colors hover:border-gray-300 hover:bg-gray-100/30">
                  <PdfUploader onFileSelect={setPdfFile} />
                </div>
                
                {pdfFile && (
                  <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-2">
                    <PdfPanel pdfFile={pdfFile} />
                  </div>
                )}
              </div>
            </section>

          </main>
        </div>

      </div>
    </div>
  );
}