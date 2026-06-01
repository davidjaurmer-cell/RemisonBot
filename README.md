# RemisionBot

RemisionBot es un prototipo de producto interno para la automatización del flujo de remisiones médicas.

## Qué incluye esta versión

- Importación de casos desde texto y archivos CSV/TXT
- Dashboard de casos con métricas de estado
- Centro de revisión con clasificación automática de casos
- Visualizador de PDF integrado para remisiones
- Persistencia local de casos usando una capa de base de datos simulada
- Módulos de servicio para clasificación, base de datos, PDF, Playwright y WhatsApp (placeholders)
- Documento funcional en `docs/ESPECIFICACION_FUNCIONAL.md`

## Ejecutar en desarrollo

```bash
npm install
npm run dev
```

## Generar producción

```bash
npm run build
```

## Estructura principal

- `src/App.jsx` — enrutamiento y layout principal
- `src/pages/Dashboard.jsx` — tablero principal de casos
- `src/pages/ImportCases.jsx` — importación de remisiones
- `src/pages/ReviewCase.jsx` — revisión y clasificación manual
- `src/components/` — componentes UI reutilizables
- `src/services/` — módulos de lógica y placeholder de integraciones
- `src/store/useCasesStore.js` — estado global de casos
- `docs/ESPECIFICACION_FUNCIONAL.md` — especificación funcional del sistema

## Siguientes pasos recomendados

1. Implementar la integración de Playwright con los filtros NOPBS/PBS.
2. Conectar la base de datos local con SQLite en un contexto Electron/Node.
3. Añadir análisis real de PDF y extracción de campos.
4. Implementar envío y recepción de WhatsApp con sesión persistente.
