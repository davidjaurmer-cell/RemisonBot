import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/" },
  { label: "Importar casos", path: "/import" },
  { label: "Centro de revisión", path: "/review" },
  { label: "Configuración", path: "/settings" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-full max-w-[300px] rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60 lg:sticky lg:top-6">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-500 font-semibold">RemisionBot</p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-900">Control de flujo</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">Importa casos, revisa remisiones y ajusta configuraciones con orden.</p>
      </div>

      <nav className="space-y-3">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`block rounded-[18px] border px-4 py-3 text-sm font-medium transition ${
                active
                  ? "border-slate-300 bg-slate-900 text-white shadow-sm"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 rounded-[18px] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <p className="font-semibold text-slate-900">Versión</p>
        <p className="mt-1 text-xs">v0.1.0 • Beta</p>
      </div>
    </aside>
  );
}
