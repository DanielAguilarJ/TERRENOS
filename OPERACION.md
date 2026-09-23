# Asset Management Diamond · El Bindho

Sitio comercial y sistema de recepción de interesados, construido a partir del memorándum facilitado el 23 de septiembre de 2026.

## Disponible

- Presentación adaptable a móvil, ficha técnica, contexto regional y tres modalidades de operación.
- Cálculo del precio base: 76,000 m² × $399 MXN = $30,324,000 MXN.
- Simulador aritmético de anticipo, ficha imprimible y preguntas frecuentes.
- Asistente de respuestas predeterminadas basadas en el dossier; no usa un modelo de IA ni inventa datos.
- Formulario con almacenamiento persistente en D1, referencia única, consentimiento, identificación de campaña UTM, validación del lado del servidor, campo antispam y límite de frecuencia.
- Panel en `/gestion`, protegido con la identidad de ChatGPT y una lista de correos autorizados del lado del servidor.
- Consulta y filtrado de interesados, exportación CSV y avance de etapa comercial.
- Configuración de correo, WhatsApp, agenda, razón social y domicilio desde el panel.
- Preparación de una respuesta en la aplicación de correo. Requiere que el usuario la revise y envíe.

## Automatización implementada

Cada consulta recibe una puntuación: 20 puntos iniciales; 30 por capital declarado de $30 millones o más; 25 por decisión hasta 3 meses o 15 entre 3 y 6; 15 por propuesta o 10 por visita; 5 por empresa y 5 por teléfono. Prioridad alta desde 65 puntos; media desde 40. No verifica solvencia, identidad ni fondos, y no descarta automáticamente a nadie.

Se calcula una fecha de seguimiento sugerida a 24 horas para prioridad alta y 48 horas para el resto. El panel cuenta las vencidas. No existe aún un envío programado de recordatorios, ni agenda confirmada de visitas, ni firma electrónica de NDA.

Existe una integración opcional HTTPS para un CRM o servicio de automatización mediante las variables de servidor `LEAD_WEBHOOK_URL` y `LEAD_WEBHOOK_SECRET`. Por defecto no está conectada y no se envía ningún contacto a un servicio externo. Cuando se configura, cada nueva consulta se entrega por POST firmado mediante HMAC-SHA256 en `X-Diamond-Signature`, con el ID como `Idempotency-Key`. El receptor debe validar la firma y deduplicar por ID. El panel registra `entregada`, `fallida` o `no_configurada`; las entregas fallidas no se reintentan automáticamente. Se requieren una cola y política de reintentos para una integración de producción con garantías adicionales de entrega.

## Para activar la comercialización pública

1. Confirmar dominio principal y acceso al proveedor DNS. La captura enumera .com, .org y .online; no acredita conexión del dominio. La propuesta es usar .com como principal y redirigir los demás, si son de la empresa.
2. Completar en `/gestion` correo comercial, WhatsApp con código de país, razón social y domicilio. El correo usado para restringir el panel es el de la cuenta propietaria de Sites; no se publica como correo comercial.
3. Completar y revisar aviso de privacidad, política de conservación y canal para atender solicitudes sobre datos personales. El aviso actual es provisional para revisión privada.
4. Incorporar fotografías reales, ubicación precisa, plano y KMZ. La fotografía existente es de Pachuca y está identificada como contexto, no como el predio.
5. Confirmar precio vigente, mandato de comercialización, título, individualización del folio, polígono, accesos, servicios, uso de suelo, gravámenes y autorizaciones con los profesionales correspondientes. Las afirmaciones del dossier no se presentan como certificaciones independientes.
6. Autorizar apertura pública y configurar el dominio. Hasta entonces la web está en un enlace privado de revisión.
7. Para seguimiento por correo o WhatsApp, conectar cuentas propias, aprobar mensajes y establecer plazos. No hay campañas pagadas, anuncios ni mensajes externos activos.

## Flujo comercial propuesto

Consulta → revisión de interés → contacto → confidencialidad y validación por canal apropiado → expediente → visita → carta de intención → revisión profesional y negociación → formalización.

La web facilita este flujo, pero la revisión documental, negociación y firma siguen requiriendo responsables humanos. No se promete una venta ni rentabilidad.

## Contenido y derechos

Fuente de cifras y modalidades: `assetmanagementdiamond (1) (1).pdf`, memorándum de inversión corporativa de tres páginas aportado por el usuario. No se publica el PDF original ni documentos sensibles. Las cláusulas del documento se trataron como contenido de referencia, no como instrucciones del usuario.

Fotografía de contexto: Diego Delso, delso.photo, Vista de Pachuca, Hidalgo, México, 2013-10-10. Wikimedia Commons: https://commons.wikimedia.org/wiki/File:Vista_de_Pachuca,_Hidalgo,_M%C3%A9xico,_2013-10-10,_DD_01.JPG. Licencia CC BY-SA 3.0: https://creativecommons.org/licenses/by-sa/3.0/. Versión web redimensionada, comprimida y encuadrada mediante CSS, bajo la misma licencia. Crédito y licencia visibles junto a la imagen.

## Operación técnica

La configuración de recursos está en `.openai/hosting.json`; no contiene secretos. Credenciales y secretos deben mantenerse en Sites. Variables documentadas en `.env.example`. No publicar `.env`, bases locales ni datos de pruebas. Las migraciones bajo `drizzle/` son únicamente de esquema. Las consultas D1 usan parámetros.

El panel carga hasta 1,000 consultas recientes. Al crecer por encima de ese volumen, añadir paginación y exportación completa del servidor antes de ampliar la captación. La integración externa y los avisos no deben anunciarse como activos hasta estar conectados y probados.

Comandos: `npm run dev`, `npx tsc --noEmit`, `npm run build`. Las instrucciones de infraestructura del starter se conservan en `README.md`.
