import { useEffect, useState } from "react";
import CaseStatusBadge from "./CaseStatusBadge";

export default function CaseDetails({ caso, editable = false, onUpdateCase }) {
  const [formState, setFormState] = useState({});

  useEffect(() => {
    if (caso) {
      setFormState({
        paciente: caso.paciente || "",
        telefono: caso.telefono || "",
        documento: caso.documento || "",
        fecha_remision: caso.fecha_remision || "",
        numero_paciente: caso.numero_paciente || "",
        link_carta_terceros: caso.link_carta_terceros || "",
      });
    }
  }, [caso]);

  if (!caso) return null;

  const handleChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!onUpdateCase) return;
    onUpdateCase({ ...caso, ...formState });
  };

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-slate-500 font-semibold">Información del caso</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">{caso.id}</h2>
          </div>
          <CaseStatusBadge status={caso.estado} className="text-xs" />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[18px] border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Paciente</p>
            {editable ? (
              <input
                value={formState.paciente}
                onChange={(e) => handleChange("paciente", e.target.value)}
                className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                placeholder="Nombre del paciente"
              />
            ) : (
              <p className="mt-3 text-sm text-slate-900">{caso.paciente || "No disponible"}</p>
            )}
          </div>
          <div className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Teléfono</p>
            {editable ? (
              <input
                value={formState.telefono}
                onChange={(e) => handleChange("telefono", e.target.value)}
                className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                placeholder="Teléfono"
              />
            ) : (
              <p className="mt-3 text-sm text-slate-900">{caso.telefono || "No disponible"}</p>
            )}
          </div>
          <div className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Documento</p>
            {editable ? (
              <input
                value={formState.documento}
                onChange={(e) => handleChange("documento", e.target.value)}
                className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                placeholder="Documento"
              />
            ) : (
              <p className="mt-3 text-sm text-slate-900">{caso.documento || "No disponible"}</p>
            )}
          </div>
          <div className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Fecha remisión</p>
            {editable ? (
              <input
                value={formState.fecha_remision}
                onChange={(e) => handleChange("fecha_remision", e.target.value)}
                className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                placeholder="DD/MM/AAAA"
              />
            ) : (
              <p className="mt-3 text-sm text-slate-900">{caso.fecha_remision || "No disponible"}</p>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-200/50">
        <h3 className="text-lg font-semibold text-slate-900">Detalle adicional</h3>
        <div className="mt-4 space-y-4 text-sm text-slate-700">
          <div className="rounded-[18px] border border-slate-200 bg-white p-4">
            <span className="font-semibold text-slate-900">Origen:</span>
            <span className="ml-2">{caso.origen || "Importado"}</span>
          </div>
          <div className="rounded-[18px] border border-slate-200 bg-white p-4">
            <span className="font-semibold text-slate-900">Número paciente:</span>
            {editable ? (
              <input
                value={formState.numero_paciente}
                onChange={(e) => handleChange("numero_paciente", e.target.value)}
                className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                placeholder="Número de paciente"
              />
            ) : (
              <span className="ml-2">{caso.numero_paciente || "--"}</span>
            )}
          </div>
          <div className="rounded-[18px] border border-slate-200 bg-white p-4">
            <span className="font-semibold text-slate-900">Carta terceros:</span>
            {editable ? (
              <input
                value={formState.link_carta_terceros}
                onChange={(e) => handleChange("link_carta_terceros", e.target.value)}
                className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                placeholder="URL o referencia de carta"
              />
            ) : (
              <span className="ml-2">{caso.link_carta_terceros || "No cargado"}</span>
            )}
          </div>
        </div>
        {editable && (
          <div className="mt-6 text-right">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Guardar cambios
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
