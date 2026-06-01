# ESPECIFICACION FUNCIONAL - RemisionBot

## Visión general
RemisionBot es un sistema interno de gestión de remisiones médicas diseñado para automatizar el ciclo completo de operación desde la recepción de números de remisión hasta la validación final y trazabilidad.

### Objetivo
Tomar un listado de remisiones
↓
Obtener automáticamente cada remisión
↓
Analizarla
↓
Clasificarla
↓
Contactar al paciente
↓
Recibir respuesta
↓
Validar documentos recibidos
↓
Actualizar estado
↓
Generar trazabilidad completa

---

## Módulo 1: Gestión de Casos

### Entrada
- Excel
- CSV
- Copiar/Pegar números de remisión
- Futuro: conexión directa a la plataforma externa

### Comportamiento
- Cada número de remisión se transformará en un caso único.
- El sistema valida formato y elimina duplicados.
- Crea una entidad `Caso` con estado inicial `CREADO`.

### Ejemplo de entrada
```
13805
13806
13807
13808
```

### Reglas
- Si el número ya existe en la base de datos, se ignora o se actualiza según configuración.
- Si el número es inválido, se registra como `RECHAZADO` y se notifica al operador.

---

## Módulo 2: Obtención de Remisiones

### V1: Manual
- El usuario descarga el PDF de la plataforma.
- El usuario arrastra el PDF al sistema.
- El sistema asocia el PDF al caso correspondiente.

### V2: Automatizada
- Utilizar Playwright para acceder a la plataforma web.
- Flujos:
  1. Ingresar a la plataforma.
  2. Filtrar por NOPBS o PBS.
  3. Seleccionar todos los estados de trámite.
  4. Buscar por número de remisión o número de factura.
  5. Descargar remisión.
- Guardar PDF como documento fuente para extracción.

### Flujo de automatización real
- El operador recibe de un Drive los números de factura o remisión.
- El sistema debe replicar el proceso de filtro en la plataforma de la empresa:
  - NOPBS/PBS
  - Estados de trámite
  - Campo de búsqueda por remisión o factura
- Al descargar el PDF, se guarda la remisión actual del paciente en la plataforma.
- Luego debe validarse que la firma, nombre y cédula del paciente coincidan con los datos del paciente.
- El sistema extrae también la información de la sección de observaciones, donde están los datos del paciente antes del campo de firma.

### Reglas de descarga y validación
- Si los datos de la remisión no coinciden con el paciente:
  - extraer el número de paciente desde el mismo PDF.
  - generar la tarea de contacto con el paciente.
  - solicitar la carta de autorización a terceros.
- Si el paciente firmó pero en campos incorrectos:
  - generar el estado `REENVIAR_REMISION`.
  - enviar la remisión en blanco desde la carpeta corporativa ligada al servidor.
- La remisión siempre conserva fecha, así que cualquier remisión nueva debe usar la fecha original incorrecta.

### Estados de caso
- `EN_DESCARGA`
- `DESCARGADO`
- `ERROR_DESCARGA`

---

## Módulo 3: Lector de PDF

### Objetivo
Extraer datos estructurados de los documentos PDF asociados a cada remisión.

### Datos a extraer
- Número de remisión
- Fecha
- Paciente
- Documento
- Teléfono
- Nombre firmante
- Documento firmante
- Fecha firma

### Datos a ignorar
- Medicamentos
- Diagnósticos
- Información clínica

### Comportamiento
- El lector debe ser tolerante a variaciones de formato.
- Registrar campos extraídos y nivel de confianza.
- Extraer la sección de observaciones para obtener los datos del paciente.
- Extraer el número de paciente desde el PDF cuando exista.
- Extraer la fecha de remisión para poder reeditar remisiones en blanco con la misma fecha.
- Si faltan campos críticos, asignar caso a `REVISION_MANUAL` o `REENVIAR_REMISION`.

### Estados de caso
- `EN_EXTRACCION`
- `EXTRAIDO`
- `ERROR_EXTRACCION`

---

## Módulo 4: Clasificador

### Objetivo
Clasificar automáticamente cada caso según la calidad y consistencia de los datos extraídos.

### Clasificaciones

#### VALIDADA
- Documento coincide
- Nombre coincide
- Fecha existe

#### CARTA_TERCEROS
- Documento diferente
- Nombre diferente

#### REENVIAR_REMISION
- Campos vacíos
- Fecha vacía
- Nombre vacío
- Documento vacío

#### REVISION_MANUAL
- Sello portería
- Texto ilegible
- Error extracción

### Reglas de decisión
- Si los campos clave están completos y consistentes, asignar `VALIDADA`.
- Si existe discrepancia entre paciente/documento, asignar `CARTA_TERCEROS`.
- Si faltan datos imprescindibles, asignar `REENVIAR_REMISION`.
- Si la extracción falla o la calidad es insuficiente, asignar `REVISION_MANUAL`.

---

## Módulo 5: Centro de Revisión

### Propósito
Permitir la validación humana de casos que no pueden resolverse automáticamente.

### Pantalla principal (conceptual)
```
┌────────────────────────┬────────────────────────┐
│ Datos Extraídos        │ PDF                   │
│                        │                        │
│ Paciente               │                        │
│ Documento              │                        │
│ Teléfono               │                        │
│ Estado sugerido        │                        │
│                        │                        │
│ Confirmar              │                        │
└────────────────────────┴────────────────────────┘
```

### Comportamiento
- La IA sugiere un estado.
- El revisor puede corregir datos o cambiar el estado.
- Guardar auditoría de cada cambio.

### Acciones posibles
- Confirmar `VALIDADA`
- Solicitar `CARTA_TERCEROS`
- Generar `REENVIAR_REMISION`
- Marcar `REVISION_MANUAL`

---

## Módulo 6: Generador de Mensajes

### Carta a terceros
- Generar mensaje automático.
- Adjuntar `CartaAutorizacion.pdf`.

### Reenvío
- Generar mensaje automático.
- Adjuntar `RemisionEnBlanco.pdf`.

### Reglas
- Si el caso clasificado es `CARTA_TERCEROS`, preparar carta autorizada.
- Si el caso es `REENVIAR_REMISION`, preparar remisión en blanco.
- Todos los mensajes deben contener datos del paciente y caso.

---

## Módulo 7: WhatsApp

### Conexión
- WhatsApp corporativo.
- QR para sesión inicial.
- Sesión persistente para evitar re-autenticación.

### Funciones
- Enviar mensaje.
- Enviar archivo.
- Leer respuesta.
- Descargar adjunto.

### Comportamiento
- Cada caso tiene un hilo de comunicación.
- Asociar mensajes y archivos recibidos al caso correcto.
- Marcar estado de envío y recepción.

---

## Módulo 8: Analizador de Respuestas

### Objetivo
Convertir el texto libre del paciente en eventos estructurados.

### Ejemplos
- Mensaje paciente: `Adjunto la carta.` → `DOCUMENTO_RECIBIDO`
- Mensaje paciente: `Nunca recibí ese medicamento.` → `INCIDENCIA`
- Mensaje paciente: `Estoy hospitalizado.` → `CASO_ESPECIAL`

### Reglas
- Analizar intención y entidades.
- Registrar el tipo de respuesta en el caso.
- Si hay adjuntos, descargar y validar.

---

## Módulo 9: Validador de Carta

### Objetivo
Revisar documentos recibidos y determinar si tienen los datos requeridos.

### Analizar
- Paciente
- Documento
- Autorizado
- Documento autorizado
- Fecha
- Firma

### Resultado
- `VALIDA`
- `INCOMPLETA`

### Comportamiento
- Si todos los campos obligatorios están presentes y consistentes, marcar `VALIDA`.
- Si falta algún campo o es ilegible, marcar `INCOMPLETA`.

---

## Módulo 10: Seguimiento

### Automatización
- Día 2 → Recordatorio 1
- Día 5 → Recordatorio 2
- Día 7 → Último recordatorio

### Reglas
- Solo enviar recordatorios si el caso no está cerrado.
- Registrar cada recordatorio como un evento de histórico.
- Permitir desactivar seguimiento para casos especiales.

---

## Módulo 11: Dashboard

### Métricas principales
- Casos Totales
- Validadas
- Carta Terceros
- Pendientes
- Incidencias
- Cerradas

### Características
- Filtros por estado, fecha y usuario.
- Indicadores de uso y desempeño.
- Acceso rápido a casos con anomalías.

---

## Módulo 12: Seguridad

### Base de datos local
- SQLite para persistencia local.
- Modelo transaccional.

### Cifrado
- Cifrar datos sensibles:
  - Teléfono
  - Documento
- Almacenar claves de cifrado en la configuración segura.

### Acceso
- Autenticación básica con usuario y PIN.
- Control de sesión local.

### Logs
- Registrar:
  - Quién revisó
  - Cuándo
  - Qué hizo
- Auditar cambios de estado y ediciones manuales.

---

## Arquitectura propuesta

### Capas del sistema
- Interfaz de usuario (Electron + React + Tailwind)
- Lógica de negocio (Node.js)
- Persistencia local (SQLite)
- Integraciones: PDF, WhatsApp, Playwright

### Componentes principales
- `Importador de casos`
- `Descargador de remisiones`
- `Extractor de PDF`
- `Clasificador automático`
- `Centro de revisión`
- `Generador de mensajes`
- `Cliente WhatsApp`
- `Analizador de respuestas`
- `Validador de documentos`
- `Motor de seguimiento`
- `Dashboard`
- `Seguridad y auditoría`

---

## Tablas principales de la base de datos

### Caso
- `id`
- `numero_remision`
- `estado`
- `paciente`
- `documento`
- `telefono`
- `nombre_firmante`
- `documento_firmante`
- `fecha_firma`
- `fecha_creacion`
- `fecha_actualizacion`
- `origen` (Excel/CSV/manual/automático)

### Documento
- `id`
- `caso_id`
- `tipo`
- `ruta_archivo`
- `metadata`
- `estado_validacion`
- `fecha_subida`

### InteraccionWhatsApp
- `id`
- `caso_id`
- `mensaje`
- `remitente`
- `tipo` (texto/archivo)
- `estado`
- `fecha`

### Evento
- `id`
- `caso_id`
- `tipo_evento`
- `detalle`
- `usuario`
- `fecha`

### Usuario
- `id`
- `nombre`
- `pin_hash`
- `rol`
- `fecha_creacion`

### LogAuditoria
- `id`
- `usuario_id`
- `caso_id`
- `accion`
- `detalle`
- `fecha`

---

## Estados del caso (propuesta)
- `CREADO`
- `EN_DESCARGA`
- `DESCARGADO`
- `EN_EXTRACCION`
- `EXTRAIDO`
- `VALIDADA`
- `CARTA_TERCEROS`
- `REENVIAR_REMISION`
- `REVISION_MANUAL`
- `PENDIENTE`
- `INCIDENCIA`
- `CASO_ESPECIAL`
- `CERRADO`

---

## Reglas de flujo
1. Ingreso de remisiones → caso `CREADO`.
2. Obtención de documento PDF → caso `DESCARGADO` o `ERROR_DESCARGA`.
3. Extracción de PDF → `EXTRAIDO` o `ERROR_EXTRACCION`.
4. Clasificación automática → `VALIDADA`, `CARTA_TERCEROS`, `REENVIAR_REMISION`, `REVISION_MANUAL`.
5. Si la clasificación requiere acción, pasar al `Centro de revisión`.
6. Generación de mensaje y envío por WhatsApp.
7. Recepción de respuesta → `ANALIZAR_RESPUESTA`.
8. Validación de documentos adjuntos → `VALIDA` o `INCOMPLETA`.
9. Seguimiento automático hasta cierre.

---

## Próximo paso profesional
Crear el documento `docs/ESPECIFICACION_FUNCIONAL.md` como plano del sistema completo y usarlo como base antes de implementar pantallas o librerías.

Este documento define:
- Todos los estados.
- Todas las reglas.
- Todos los flujos.
- Todas las pantallas conceptuales.
- Todas las tablas de la base de datos.

---

## Tecnología profesional recomendada
- Electron
- React
- Tailwind
- Node.js
- SQLite
- pdfjs-dist
- Playwright
- whatsapp-web.js
