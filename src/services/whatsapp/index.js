export async function connectWhatsAppSession() {
  return {
    success: false,
    message: "Conexión de WhatsApp no implementada aún.",
  };
}

export async function sendWhatsAppMessage({ to, body, attachments = [] }) {
  return {
    success: false,
    message: "Envío de WhatsApp no implementado aún.",
  };
}

export async function listenWhatsAppResponses(callback) {
  // Registrar eventos de llegada de mensajes.
  return () => {};
}
