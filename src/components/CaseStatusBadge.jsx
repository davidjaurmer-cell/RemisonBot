export default function CaseStatusBadge({ status, className = "" }) {
  const colors = {
    CREADO: "bg-slate-100 text-slate-700 border border-slate-200",
    EN_DESCARGA: "bg-slate-100 text-slate-700 border border-slate-200",
    DESCARGADO: "bg-slate-100 text-slate-700 border border-slate-200",
    EN_EXTRACCION: "bg-slate-100 text-slate-700 border border-slate-200",
    EXTRAIDO: "bg-slate-100 text-slate-700 border border-slate-200",
    VALIDADA: "bg-slate-100 text-slate-700 border border-slate-200",
    CARTA_TERCEROS: "bg-slate-100 text-slate-700 border border-slate-200",
    REENVIAR_REMISION: "bg-slate-100 text-slate-700 border border-slate-200",
    REVISION_MANUAL: "bg-slate-100 text-slate-700 border border-slate-200",
    PENDIENTE: "bg-slate-100 text-slate-700 border border-slate-200",
    INCIDENCIA: "bg-slate-100 text-slate-700 border border-slate-200",
    CASO_ESPECIAL: "bg-slate-100 text-slate-700 border border-slate-200",
    CERRADO: "bg-slate-100 text-slate-700 border border-slate-200",
  };

  return (
    <span className={`inline-flex rounded-md px-3 py-1 text-xs font-semibold ${colors[status] || "bg-slate-100 text-slate-700 border border-slate-200"} ${className}`}>
      {status}
    </span>
  );
}
