export default function CaseDetails({ caso }) {
  if (!caso) return null;

  return (
    <div>
      <h2 className="font-bold text-xl mb-4">
        Información del Caso
      </h2>

      <div className="space-y-4">
        <div>
          <strong>Remisión:</strong> {caso.id}
        </div>

        <div>
          <strong>Paciente:</strong> {caso.paciente}
        </div>

        <div>
          <strong>Teléfono:</strong> {caso.telefono}
        </div>

        <div>
          <strong>Estado:</strong> {caso.estado}
        </div>
      </div>
    </div>
  );
}