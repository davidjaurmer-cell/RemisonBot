import { useCallback, useState } from "react";
import { useCasesStore } from "../store/useCasesStore";

export default function Settings() {
  const resetCases = useCasesStore((state) => state.resetCases);
  const [confirming, setConfirming] = useState(false);

  const handleReset = useCallback(() => {
    resetCases();
    setConfirming(false);
  }, [resetCases]);

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
                  <svg className="h-2 w-2 animate-spin" fill="currentColor" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  ADMINISTRACIÓN
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Configuración
                </h1>
                <p className="mt-3 max-w-2xl text-gray-600">
                  Administra la persistencia, la seguridad y las acciones de mantenimiento del sistema.
                </p>
              </div>
              <div className="rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 shadow-sm">
                Panel de control
              </div>
            </div>
          </div>
        </header>

        {/* Grid de configuración */}
        <section className="grid gap-6 lg:grid-cols-2">
          {/* Tarjeta - Base de datos local */}
          <div className="group overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
            <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-gray-100 p-2.5 text-gray-700">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Base de datos local</h2>
                    <p className="mt-1 text-sm text-gray-600">
                      Persistencia en el navegador
                    </p>
                  </div>
                </div>
                <div className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm">
                  Offline
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="rounded-xl bg-gray-50 p-4 border border-gray-200">
                <p className="text-sm text-gray-700">
                  Se utiliza <span className="inline-flex items-center gap-1 rounded-md bg-gray-900 px-2 py-0.5 font-mono text-xs font-semibold text-white">localStorage</span> para persistir el historial de casos y cambios en el navegador.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Clave de almacenamiento</span>
                  <code className="rounded-md bg-gray-900 px-2 py-1 font-mono text-xs text-slate-300">remisionbot.cases</code>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Modo de operación</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-500 animate-pulse" />
                    Cliente local
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-gray-50 p-4 border border-gray-200">
                <div className="flex items-start gap-2">
                  <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs text-gray-700">
                    Los datos se almacenan exclusivamente en tu navegador. Al limpiar el caché, podrías perder la información.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta - Mantenimiento */}
          <div className="group overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
            <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gray-100 p-2.5 text-gray-700">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Mantenimiento</h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Acciones administrativas del sistema
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-5">
              <div className="rounded-xl bg-gray-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                    <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Restablecer datos</p>
                    <p className="mt-1 text-sm text-gray-600">
                      Esta acción borra los casos actuales y restaura el estado inicial del sistema.
                    </p>
                  </div>
                </div>
              </div>

              {confirming ? (
                <div className="animate-in slide-in-from-top-2 fade-in duration-200 space-y-4 rounded-xl border border-red-200 bg-gradient-to-br from-red-50 to-rose-50 p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                      <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">¿Seguro que quieres reiniciar todos los casos?</p>
                      <p className="mt-1 text-sm text-gray-600">
                        Esta acción no se puede deshacer. Todos los datos actuales se perderán permanentemente.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-slate-800 active:scale-[0.98]"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Sí, reiniciar
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirming(false)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md active:scale-[0.98]"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirming(true)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-slate-800 active:scale-[0.98]"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reiniciar casos
                </button>
              )}

              <div className="rounded-xl bg-gray-50 p-3 border border-gray-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Último respaldo</span>
                  <span className="font-mono text-gray-700">{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer informativo */}
        <div className="rounded-xl border border-gray-200/60 bg-white/50 backdrop-blur-sm p-4 text-center">
          <p className="text-xs text-gray-500">
            🔒 Los datos se almacenan localmente en tu dispositivo. Nadie más tiene acceso a esta información.
          </p>
        </div>
      </div>
    </div>
  );
}