import { useState } from "react";
import { useCasesStore } from "../store/useCasesStore";
import CaseList from "../components/CaseList";

export default function ImportCases() {
  const [sourceText, setSourceText] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const cases = useCasesStore((state) => state.cases);
  const addCasesFromText = useCasesStore((state) => state.addCasesFromText);
  const importCasesFromFile = useCasesStore((state) => state.importCasesFromFile);

  const handleImport = () => {
    const newCases = addCasesFromText(sourceText);
    setMessage(`${newCases.length} remisión(es) preparadas para el flujo.`);
  };

  const handleFileImport = async () => {
    if (!file) return;
    const imported = await importCasesFromFile(file);
    setMessage(`${imported.length} remisión(es) importadas desde el archivo.`);
    setFile(null);
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
                  <svg className="h-2 w-2" fill="currentColor" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  IMPORTACIÓN
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Importar remisiones
                </h1>
                <p className="mt-3 max-w-2xl text-gray-600">
                  Añade remisiones desde texto o archivo CSV/TXT y genera casos para automatizar el proceso.
                </p>
              </div>
              <div className="rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 shadow-sm">
                {cases.length} casos activos
              </div>
            </div>
          </div>
        </header>

        {/* Layout principal */}
        <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* Columna izquierda - Importación */}
          <div className="space-y-6">
            {/* Tarjeta de importación por texto */}
            <div className="overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-lg transition-all hover:shadow-xl">
              <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white p-4">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-gray-100 p-2 text-gray-700">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Copiar / pegar remisiones</h2>
                    <p className="text-xs text-gray-500">Ingresa una remisión por línea</p>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <textarea
                  value={sourceText}
                  onChange={(event) => setSourceText(event.target.value)}
                  placeholder="13805&#10;13806&#10;13807&#10;13808"
                  className="min-h-[200px] w-full rounded-xl border border-gray-200 bg-gray-50/50 p-4 text-sm text-gray-900 outline-none transition-all focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
                <button
                  type="button"
                  onClick={handleImport}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:from-gray-800 hover:to-gray-700 active:scale-[0.98]"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Importar desde texto
                </button>
              </div>
            </div>

            {/* Tarjeta de importación por archivo */}
            <div className="overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-lg transition-all hover:shadow-xl">
              <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-gray-100 p-2 text-gray-700">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Importar archivo</h2>
                      <p className="text-xs text-gray-500">CSV o TXT (una remisión por línea)</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-gradient-to-r from-gray-100 to-gray-200 px-3 py-1 text-xs font-semibold text-gray-600 shadow-sm">
                    Simple
                  </span>
                </div>
              </div>
              <div className="p-5">
                <label className="block cursor-pointer">
                  <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50/80 p-6 transition-all hover:border-gray-400 hover:bg-gray-100">
                    <svg className="h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-600">
                      {file ? `📄 ${file.name}` : "Haz clic o arrastra un archivo"}
                    </p>
                    <p className="text-xs text-gray-400">CSV, TXT hasta 5MB</p>
                  </div>
                  <input
                    type="file"
                    accept=".csv,.txt"
                    onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                    className="hidden"
                  />
                </label>
                <button
                  type="button"
                  onClick={handleFileImport}
                  disabled={!file}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:from-gray-800 hover:to-gray-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:from-gray-900 disabled:hover:to-gray-800 active:scale-[0.98]"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Importar archivo
                </button>
              </div>
            </div>

            {/* Mensaje de éxito */}
            {message && (
              <div className="animate-in slide-in-from-top-2 fade-in duration-300 rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                    <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-800">{message}</p>
                </div>
              </div>
            )}
          </div>

          {/* Columna derecha - Casos existentes */}
          <div className="overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-lg transition-all hover:shadow-xl">
            <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white p-4">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-gray-100 p-2 text-gray-700">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Casos existentes</h2>
                  <p className="text-xs text-gray-500">Revisa las remisiones ya almacenadas</p>
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="overflow-hidden rounded-xl bg-gray-50/50">
                <CaseList cases={cases} selectedCase={null} onSelectCase={() => {}} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}