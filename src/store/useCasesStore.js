import { create } from "zustand";
import { mockCases } from "../data/mockCases";
import { loadCases, saveCases, initializeDatabase } from "../services/database";
import { parseRemissionsFromText, parseRemissionsFromCsv, dedupeCases, classifyCase, createCaseFromRemission } from "../services/cases";

const fromStorage = typeof window !== "undefined" ? loadCases() : [];
initializeDatabase();

const initialCases = dedupeCases(
  fromStorage.length > 0 ? fromStorage : mockCases.map((item) => ({
    ...item,
    numero_remision: item.id.replace(/^REM-/, ""),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }))
);

export const useCasesStore = create((set, get) => ({
  cases: initialCases,
  selectedCaseId: initialCases[0]?.id ?? null,

  selectCase: (caseId) => set(() => ({ selectedCaseId: caseId })),

  updateCase: (caseIdOrCase, updates = {}) =>
    set((state) => {
      const updatedCase = typeof caseIdOrCase === "string"
        ? { id: caseIdOrCase, ...updates }
        : caseIdOrCase;

      const cases = state.cases.map((c) =>
        c.id === updatedCase.id
          ? { ...c, ...updatedCase, updatedAt: new Date().toISOString() }
          : c
      );
      saveCases(cases);
      return { cases };
    }),

  addCasesFromText: (text) => {
    const newCases = parseRemissionsFromText(text);
    set((state) => {
      const cases = dedupeCases([...state.cases, ...newCases]);
      saveCases(cases);
      return {
        cases,
        selectedCaseId: state.selectedCaseId ?? newCases[0]?.id,
      };
    });
    return newCases;
  },

  importCasesFromFile: async (file) => {
    if (!file) return [];

    const content = await file.text();
    const ext = file.name.toLowerCase().split(".").pop();
    const imported = ext === "csv" || ext === "txt"
      ? parseRemissionsFromCsv(content)
      : parseRemissionsFromText(content);

    set((state) => {
      const cases = dedupeCases([...state.cases, ...imported]);
      saveCases(cases);
      return {
        cases,
        selectedCaseId: state.selectedCaseId ?? imported[0]?.id,
      };
    });

    return imported;
  },

  classifySelectedCase: () => {
    const { cases, selectedCaseId } = get();
    const current = cases.find((item) => item.id === selectedCaseId);
    if (!current) return null;
    const nextState = classifyCase(current);
    set((state) => {
      const cases = state.cases.map((item) =>
        item.id === selectedCaseId ? { ...item, estado: nextState, updatedAt: new Date().toISOString() } : item
      );
      saveCases(cases);
      return { cases };
    });
    return nextState;
  },

  createCaseFromRemission: (remisionNumber) => {
    const newCase = createCaseFromRemission(remisionNumber);
    set((state) => {
      const cases = dedupeCases([...state.cases, newCase]);
      saveCases(cases);
      return {
        cases,
        selectedCaseId: newCase.id,
      };
    });
    return newCase;
  },

  resetCases: () => {
    saveCases(initialCases);
    set(() => ({ cases: initialCases, selectedCaseId: initialCases[0]?.id ?? null }));
  },
}));
