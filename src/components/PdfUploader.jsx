export default function PdfUploader({ onFileSelect }) {
  return (
    <div className="mb-4">
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => onFileSelect(e.target.files[0])}
        className="border rounded-lg p-2"
      />
    </div>
  );
}