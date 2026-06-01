import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfPanel({ pdfFile }) {
  if (!pdfFile) {
    return (
      <div className="border rounded-xl h-[600px] flex items-center justify-center bg-slate-50">
        <span className="text-slate-500">
          Selecciona una remisión PDF
        </span>
      </div>
    );
  }

  return (
    <div className="border rounded-xl h-[600px] overflow-auto bg-slate-50 p-4">
      <Document file={pdfFile}>
        <Page pageNumber={1} width={800} />
      </Document>
    </div>
  );
}