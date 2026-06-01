export default function StatsCard({ label, value, accent }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:-translate-y-0.5">
      <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">{label}</p>
      <p className={`mt-4 text-4xl font-bold leading-none ${accent || "text-gray-900"}`}>
        {value}
      </p>
    </div>
  );
}
