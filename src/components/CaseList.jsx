import CaseStatusBadge from "./CaseStatusBadge";

export default function CaseList({ cases, selectedCase, onSelectCase }) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-semibold text-lg text-slate-900">Casos</h2>
        <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{cases.length} totales</span>
      </div>

      <div className="space-y-3">
        {cases.map((caso) => (
          <button
            key={caso.id}
            onClick={() => onSelectCase(caso)}
            className={`w-full rounded-[20px] border p-4 text-left transition ${
              selectedCase?.id === caso.id
                ? "border-slate-300 bg-slate-50 shadow-sm"
                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">{caso.id}</p>
                <p className="mt-1 text-xs text-slate-500">{caso.paciente || "Paciente no asignado"}</p>
              </div>
              <CaseStatusBadge status={caso.estado} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
