import { useMemo, useState } from "react";
import CaseDetails from "../components/CaseDetails";
import PdfPanel from "../components/PdfPanel";
import { useCasesStore } from "../store/useCasesStore";
import { dashboardStats, caseStates } from "../utils/constants";
import { statusColors } from "../utils/statusColors";
import { extractPdfMetadata } from "../services/pdf/reader";

export default function ReviewCase() {
  const cases = useCasesStore((state) => state.cases);
  const selectedCaseId = useCasesStore((state) => state.selectedCaseId);
  const selectCase = useCasesStore((state) => state.selectCase);
  const classifySelectedCase = useCasesStore((state) => state.classifySelectedCase);
  const updateCase = useCasesStore((state) => state.updateCase);

  const [pdfFile, setPdfFile] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);

  const selectedCase = cases.find((item) => item.id === selectedCaseId) || cases[0] || null;
  const statusLabel = selectedCase?.estado || caseStates.CREADO;
  const statusClass = statusColors[statusLabel] || "bg-slate-100 text-slate-700";

  const summary = useMemo(() => {
    if (!selectedCase) return [];
    return [
      { label: "Remisión", value: selectedCase.numero_remision || selectedCase.id },
      { label: "Paciente", value: selectedCase.paciente || "--" },
      { label: "Documento", value: selectedCase.documento || "--" },
      { label: "Teléfono", value: selectedCase.telefono || "--" },
      { label: "Estado sugerido", value: statusLabel },
    ];
  }, [selectedCase, statusLabel]);

  const handlePdfChange = (file) => {
    setPdfFile(file || null);
    setExtractedData(null);
  };

  const handleExtractPdf = async () => {
    if (!pdfFile) return;
    setIsExtracting(true);
    try {
      const metadata = await extractPdfMetadata(pdfFile);
      setExtractedData(metadata);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleApplyMetadata = () => {
    if (!selectedCase || !extractedData) return;
    updateCase({ ...selectedCase, ...extractedData });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header moderno */}
        <header className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white" />
          <div className="relative p-6 lg:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                  <svg className="h-2 w-2 animate-pulse" fill="currentColor" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  REVISIÓN ACTIVA
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Centro de revisión
                </h1>
                <p className="mt-3 max-w-2xl text-gray-600">
                  Valida los casos con confianza, corrige datos y confirma la clasificación sugerida por el sistema.
                </p>
              </div>
              <div className="rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 shadow-sm">
                Panel de revisión
              </div>
            </div>
          </div>
        </header>

        {cases.length === 0 ? (
          <div className="flex animate-in fade-in-50 slide-in-from-bottom-5 items-center justify-center rounded-2xl border border-gray-200/60 bg-white p-16 shadow-lg">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                <svg className="h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">No hay casos disponibles</h2>
              <p className="mt-3 text-gray-600">Importa remisiones desde la página de importación para comenzar el flujo de revisión.</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
            {/* Sidebar - Lista de casos */}
            <aside className="rounded-2xl border border-gray-200/60 bg-white shadow-lg transition-all hover:shadow-xl overflow-hidden">
              <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Caso seleccionado</h2>
                    <p className="mt-1 text-2xl font-bold text-gray-900">{selectedCase?.id}</p>
                  </div>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 border border-gray-200 shadow-sm">
                    {statusLabel}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                {summary.map((item, idx) => (
                  <div key={item.label} className="group rounded-xl border border-gray-100 bg-gray-50/30 p-4 transition-all hover:border-gray-200 hover:bg-white hover:shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{item.label}</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 bg-gray-50/30 p-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Lista de casos</p>
                <div className="space-y-1.5 max-h-[400px] overflow-y-auto pr-1">
                  {cases.slice(0, 5).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => selectCase(item.id)}
                      className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                        item.id === selectedCase?.id 
                          ? "bg-gray-50 text-gray-900 shadow-sm border border-gray-200" 
                          : "bg-white text-gray-700 hover:bg-gray-50 border border-transparent hover:border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{item.id}</span>
                        {item.id === selectedCase?.id && (
                          <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                  {cases.length > 5 && (
                    <p className="mt-2 text-center text-xs text-gray-400">+ {cases.length - 5} casos más</p>
                  )}
                </div>
              </div>
            </aside>

            {/* Main content */}
            <main className="space-y-6">
              <div className="grid gap-6 xl:grid-cols-[1.1fr_420px]">
                {/* Columna izquierda */}
                <div className="space-y-6">
                  {/* Acción sugerida */}
                  <div className="overflow-hidden rounded-2xl border border-gray-200/60 bg-gradient-to-br from-white to-gray-50/30 shadow-lg transition-all hover:shadow-xl">
                    <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-gray-100 p-2 text-gray-700">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">Acción sugerida</h3>
                            <p className="text-sm text-gray-600">La IA propone una clasificación</p>
                          </div>
                        </div>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm">
                          Revisión automatizada
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <button
                        onClick={() => classifySelectedCase()}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-slate-800 active:scale-[0.98]"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Confirmar clasificación
                      </button>
                    </div>
                  </div>

                  {/* Case Details */}
                  <div className="overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-lg transition-all hover:shadow-xl">
                    <CaseDetails caso={selectedCase} editable onUpdateCase={updateCase} />
                  </div>
                </div>

                {/* Columna derecha */}
                <div className="space-y-6">
                  {/* Documento PDF */}
                  <div className="overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-lg transition-all hover:shadow-xl">
                    <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-gray-100 p-2 text-gray-700">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">Documento PDF</h3>
                            <p className="text-sm text-gray-600">Sube el PDF para extraer datos</p>
                          </div>
                        </div>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm">
                          📄 PDF
                        </span>
                      </div>
                    </div>
                    <div className="p-5 space-y-4">
                      <label className="block text-sm font-medium text-gray-700">Cargar PDF de remisión</label>
                      <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/80 p-4 transition-all hover:border-gray-300 hover:bg-gray-100">
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={(event) => handlePdfChange(event.target.files?.[0] || null)}
                          className="w-full cursor-pointer rounded-lg text-sm text-gray-500 file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-gray-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-slate-800"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleExtractPdf}
                        disabled={!pdfFile || isExtracting}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:from-gray-800 hover:to-gray-700 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]"
                      >
                        {isExtracting ? (
                          <>
                            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Extrayendo datos...
                          </>
                        ) : (
                          <>
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Extraer datos del PDF
                          </>
                        )}
                      </button>

                      {extractedData && (
                        <div className="animate-in slide-in-from-top-3 fade-in duration-300 rounded-xl border border-gray-200 bg-gray-50/80 p-5">
                          <h4 className="flex items-center gap-2 font-bold text-gray-900">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Datos detectados
                          </h4>
                          <dl className="mt-4 grid gap-3">
                            {Object.entries(extractedData).map(([key, value]) => (
                              <div key={key} className="rounded-lg bg-white/70 p-3">
                                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-600">{key.replace(/_/g, " ")}</dt>
                                <dd className="mt-1 text-sm text-gray-900">{value || "No detectado"}</dd>
                              </div>
                            ))}
                          </dl>
                          <button
                            type="button"
                            onClick={handleApplyMetadata}
                            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-slate-800 active:scale-[0.98]"
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Aplicar datos al caso
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="border-t border-gray-100 p-5">
                      <PdfPanel pdfFile={pdfFile} />
                    </div>
                  </div>

                  {/* Resumen de estados */}
                  <div className="overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-lg">
                    <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white p-5">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-gray-100 p-2 text-gray-700">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Resumen de estados</h3>
                      </div>
                    </div>
                    <div className="p-5">
                      <ul className="space-y-2">
                        {dashboardStats.map((item) => (
                          <li key={item.field} className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm border border-gray-100 transition-all hover:border-gray-200 hover:shadow-md">
                            <span className="text-sm font-medium text-gray-700">{item.label}</span>
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-900">
                              {item.field === "total" ? cases.length : cases.filter((c) => c.estado === item.field).length}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        )}
      </div>
    </div>
  );
}