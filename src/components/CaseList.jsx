export default function CaseList({
  cases,
  selectedCase,
  onSelectCase,
}) {
  return (
    <div>
      <h2 className="font-bold text-lg mb-4">
        Casos
      </h2>

      <div className="space-y-2">
        {cases.map((caso) => (
          <button
            key={caso.id}
            onClick={() => onSelectCase(caso)}
            className={`w-full text-left border rounded-lg p-3 ${
              selectedCase?.id === caso.id
                ? "bg-slate-200"
                : "hover:bg-slate-100"
            }`}
          >
            {caso.id}
          </button>
        ))}
      </div>
    </div>
  );
}