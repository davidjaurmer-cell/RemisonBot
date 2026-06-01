const STORAGE_KEY = "remisionbot_cases";

export const databaseSchema = {
  cases: [
    "id",
    "numero_remision",
    "paciente",
    "documento",
    "telefono",
    "estado",
    "origen",
    "fecha_remision",
    "numero_paciente",
    "link_carta_terceros",
    "createdAt",
    "updatedAt",
  ],
  events: ["id", "caso_id", "tipo_evento", "detalle", "usuario", "fecha"],
  users: ["id", "nombre", "pin_hash", "rol", "createdAt"],
};

export function initializeDatabase() {
  if (!window?.localStorage) return;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ cases: [], events: [] }));
  }
}

export function loadCases() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    const data = JSON.parse(saved);
    return data.cases || [];
  } catch (error) {
    console.error("Error loading cases from storage", error);
    return [];
  }
}

export function saveCases(cases) {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const data = saved ? JSON.parse(saved) : { cases: [], events: [] };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, cases }));
    return true;
  } catch (error) {
    console.error("Error saving cases to storage", error);
    return false;
  }
}

export function appendEvent(event) {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const data = saved ? JSON.parse(saved) : { cases: [], events: [] };
    data.events = data.events || [];
    data.events.push(event);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Error appending event to storage", error);
    return false;
  }
}
