import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfPanel({ pdfFile }) {
  const panelRef = useRef(null);
  const [pageWidth, setPageWidth] = useState(600);

  useEffect(() => {
    const updateWidth = () => {
      const width = panelRef.current?.offsetWidth ?? 600;
      setPageWidth(Math.max(320, Math.min(720, width - 32)));
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  if (!pdfFile) {
    return (
      <div ref={panelRef} className="border border-slate-200 rounded-[22px] min-h-[360px] flex items-center justify-center bg-slate-50 px-4 py-8 text-center shadow-sm shadow-slate-200/40">
        <span className="text-slate-500">Selecciona una remisión PDF para previsualizar</span>
      </div>
    );
  }

  return (
    <div ref={panelRef} className="border border-slate-200 rounded-[22px] min-h-[360px] overflow-auto bg-slate-50 p-4 shadow-sm shadow-slate-200/40">
      <Document file={pdfFile} className="flex justify-center">
        <Page pageNumber={1} width={pageWidth} />
      </Document>
    </div>
  );
}