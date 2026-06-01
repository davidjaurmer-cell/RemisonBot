export const caseStates = {
  CREADO: "CREADO",
  EN_DESCARGA: "EN_DESCARGA",
  DESCARGADO: "DESCARGADO",
  EN_EXTRACCION: "EN_EXTRACCION",
  EXTRAIDO: "EXTRAIDO",
  VALIDADA: "VALIDADA",
  CARTA_TERCEROS: "CARTA_TERCEROS",
  REENVIAR_REMISION: "REENVIAR_REMISION",
  REVISION_MANUAL: "REVISION_MANUAL",
  PENDIENTE: "PENDIENTE",
  INCIDENCIA: "INCIDENCIA",
  CASO_ESPECIAL: "CASO_ESPECIAL",
  CERRADO: "CERRADO",
};

export const dashboardStats = [
  { label: "Casos totales", field: "total" },
  { label: "Validadas", field: caseStates.VALIDADA },
  { label: "Carta terceros", field: caseStates.CARTA_TERCEROS },
  { label: "Pendientes", field: caseStates.PENDIENTE },
];
