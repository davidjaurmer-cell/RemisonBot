import { caseStates } from "./constants";

export const statusColors = {
  [caseStates.CREADO]: "bg-slate-100 text-slate-700",
  [caseStates.VALIDADA]: "bg-emerald-100 text-emerald-800",
  [caseStates.CARTA_TERCEROS]: "bg-amber-100 text-amber-800",
  [caseStates.REENVIAR_REMISION]: "bg-orange-100 text-orange-800",
  [caseStates.REVISION_MANUAL]: "bg-rose-100 text-rose-800",
  [caseStates.PENDIENTE]: "bg-sky-100 text-sky-800",
  [caseStates.INCIDENCIA]: "bg-violet-100 text-violet-800",
  [caseStates.CASO_ESPECIAL]: "bg-indigo-100 text-indigo-800",
  [caseStates.CERRADO]: "bg-slate-100 text-slate-700",
};
