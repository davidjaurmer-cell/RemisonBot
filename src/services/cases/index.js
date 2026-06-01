import { caseStates } from "../../utils/constants";

const REMISSION_PATTERN = /(?:REM-)?(\d{4,7})/g;

export function normalizeRemissionNumber(value) {
  if (!value) return null;
  const cleaned = String(value).trim();
  const match = REMISSION_PATTERN.exec(cleaned);
  REMISSION_PATTERN.lastIndex = 0;
  return match ? match[1] : null;
}

export function parseRemissionsFromText(text) {
  if (!text) return [];

  const numbers = new Set();
  const lines = text.split(/\r?\n/);

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    const remision = normalizeRemissionNumber(trimmed);
    if (remision) {
      numbers.add(remision);
    }
  });

  return Array.from(numbers).map(createCaseFromRemission);
}

export function parseRemissionsFromCsv(text) {
  if (!text) return [];

  const lines = text.split(/\r?\n/).filter(Boolean);
  if (!lines.length) return [];

  const values = new Set();
  lines.forEach((line, index) => {
    const cells = line.split(/[,;\t]/).map((cell) => cell.trim());
    const candidate = cells.find((cell) => normalizeRemissionNumber(cell));
    if (candidate) {
      const remision = normalizeRemissionNumber(candidate);
      if (remision) values.add(remision);
    } else if (index === 0) {
      // puede ser cabecera, ignorar
    }
  });

  return Array.from(values).map(createCaseFromRemission);
}

export function dedupeCases(cases) {
  const seen = new Set();
  return cases.filter((caso) => {
    if (seen.has(caso.id)) return false;
    seen.add(caso.id);
    return true;
  });
}

export function createCaseFromRemission(remisionNumber) {
  return {
    id: `REM-${String(remisionNumber).replace(/^0+/, "")}`,
    numero_remision: String(remisionNumber).trim(),
    paciente: "--",
    documento: "--",
    telefono: "--",
    fecha_remision: "--",
    numero_paciente: "--",
    estado: caseStates.CREADO,
    origen: "IMPORTADO",
    link_carta_terceros: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

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

  return caseStates.VALIDADA;
}
