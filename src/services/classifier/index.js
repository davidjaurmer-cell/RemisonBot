import { caseStates } from "../../utils/constants";

export function classifyCase(caso) {
  if (!caso) return caseStates.REVISION_MANUAL;

  const hasPaciente = Boolean(caso.paciente && caso.paciente !== "--");
  const hasDocumento = Boolean(caso.documento && caso.documento !== "--");
  const hasFecha = Boolean(caso.fecha_remision && caso.fecha_remision !== "--");

  if (!hasPaciente || !hasDocumento || !hasFecha) {
    return caseStates.REENVIAR_REMISION;
  }

  if (caso.documento && caso.documentoFirmante && caso.documento !== caso.documentoFirmante) {
    return caseStates.CARTA_TERCEROS;
  }

  if (!hasPaciente) {
    return caseStates.REVISION_MANUAL;
  }

  return caseStates.VALIDADA;
}

export function getClassificationReason(caso) {
  if (!caso) return "Caso sin información.";
  const state = classifyCase(caso);
  switch (state) {
    case caseStates.VALIDADA:
      return "Datos completos y consistentes.";
    case caseStates.CARTA_TERCEROS:
      return "Discrepancia entre documento y documento del firmante.";
    case caseStates.REENVIAR_REMISION:
      return "Campos críticos vacíos o incompletos.";
    case caseStates.REVISION_MANUAL:
      return "Requiere revisión manual por calidad de extracción o formato.";
    default:
      return "Clasificación pendiente.";
  }
}
