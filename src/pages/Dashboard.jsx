import { useState } from "react";
import { mockCases } from "../data/mockCases";
import CaseDetails from "../components/CaseDetails";
import PdfPanel from "../components/PdfPanel";
import PdfUploader from "../components/PdfUploader";

export default function Dashboard() {
  const [selectedCase, setSelectedCase] = useState(mockCases[0]);
  const [pdfFile, setPdfFile] = useState(null);

  return (
    <div className="h-screen bg-slate-100 p-4">
      <h1 className="text-3xl font-bold mb-4">
        RemisionBot
      </h1>

      <div className="grid grid-cols-12 gap-4 h-[90%]">

        {/* Lista de Casos */}
        <div className="col-span-3 bg-white rounded-xl shadow p-4">

          <h2 className="font-bold text-lg mb-4">
            Casos
          </h2>

          <div className="space-y-2">
            {mockCases.map((caso) => (
              <button
                key={caso.id}
                onClick={() => setSelectedCase(caso)}
                className={`w-full text-left border rounded-lg p-3 transition ${
                  selectedCase.id === caso.id
                    ? "bg-slate-200"
                    : "hover:bg-slate-100"
                }`}
              >
                {caso.id}
              </button>
            ))}
          </div>

        </div>

        {/* Panel Derecho */}
        <div className="col-span-9 bg-white rounded-xl shadow p-4 overflow-auto">

          <CaseDetails caso={selectedCase} />

          <div className="mt-6">
            <>
  <PdfUploader onFileSelect={setPdfFile} />
  <PdfPanel pdfFile={pdfFile} />
</>
          </div>

        </div>

      </div>
    </div>
  );
}