import { getDocument } from "pdfjs-dist/legacy/build/pdf";

const normalize = (value) => (value ? String(value).trim() : "");

const extractField = (text, patterns) => {
  for (const pattern of patterns) {
    const match = pattern.exec(text);
    if (match && match[1]) {
      return normalize(match[1]);
    }
  }
  return "";
};

export async function extractPdfMetadata(pdfFile) {
  if (!pdfFile) return null;

  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdf = await getDocument({ data: arrayBuffer }).promise;
  const pages = Math.min(pdf.numPages, 3);
  let fullText = "";

  for (let pageIndex = 1; pageIndex <= pages; pageIndex += 1) {
    const page = await pdf.getPage(pageIndex);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(" ");
    fullText += `\n${pageText}`;
  }

  const text = fullText.replace(/[\s]+/g, " ");

  return {
    numero_remision: extractField(text, [/remisi[oó]n[:\s]*([A-Z0-9-]+)/i, /remision[:\s]*([A-Z0-9-]+)/i, /\b(\d{4,7})\b/]),
    fecha_remision: extractField(text, [/fecha[:\s]*(\d{2}\/\d{2}\/\d{4})/i, /fecha\s+remisi[oó]n[:\s]*(\d{2}\/\d{2}\/\d{4})/i]),
    paciente: extractField(text, [/paciente[:\s]*([A-Z0-9\s\.\-]+)/i, /nombre\s+paciente[:\s]*([A-Z0-9\s\.\-]+)/i]),
    documento: extractField(text, [/documento[:\s]*([A-Z0-9\-]+)/i, /c[eé]dula[:\s]*([A-Z0-9\-]+)/i]),
    telefono: extractField(text, [/tel[eé]fono[:\s]*([0-9\+\s\-]+)/i, /celular[:\s]*([0-9\+\s\-]+)/i]),
    nombre_firmante: extractField(text, [/firma[:\s]*([A-Z0-9\s\.\-]+)/i, /firmante[:\s]*([A-Z0-9\s\.\-]+)/i]),
    documento_firmante: extractField(text, [/documento\s+firmante[:\s]*([A-Z0-9\-]+)/i, /c[eé]dula\s+firmante[:\s]*([A-Z0-9\-]+)/i]),
    numero_paciente: extractField(text, [/n[uú]mero\s+paciente[:\s]*([A-Z0-9\-]+)/i, /paciente[:\s]*.*?([0-9]{6,})/i]),
  };
}
