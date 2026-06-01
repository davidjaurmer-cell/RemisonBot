export default function PdfUploader({ onFileSelect }) {
  return (
    <div className="mb-4 overflow-hidden rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/40">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-900">Seleccionar remisión PDF</p>
          <p className="mt-1 text-xs text-slate-500">Sube un archivo para revisar el contenido y extraer metadatos.</p>
        </div>
      </div>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => onFileSelect(e.target.files?.[0] ?? null)}
        className="mt-4 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
      />
    </div>
  );
}