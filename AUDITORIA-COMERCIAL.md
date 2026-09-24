# Auditoría comercial · El Bindho

Revisión del 24 de septiembre de 2026. Fuente de características: memorándum entregado por la propiedad. No se verificó título, ubicación exacta, permisos ni factibilidad.

## Hallazgos y correcciones

| Punto | Antes | Versión revisada |
| --- | --- | --- |
| Primera impresión | Titular abstracto y bloque numérico decorativo | Nombre del activo, fotografía regional claramente identificada, ubicación, superficie y oferta visibles |
| Precio | Fuera de la portada | $399 MXN/m² y $30,324,000 MXN en la primera pantalla |
| Siguiente paso | Explorar y buscar el contacto al final | Solicitud de visita/información en portada; barra fija de contacto en móvil |
| Fricción | Nueve preguntas visibles | Cuatro iniciales; nombre, correo y consentimiento obligatorios; detalles opcionales |
| Continuidad | Consulta genérica | Modalidad e intención precargadas según el enlace pulsado |
| Medición | Fuente UTM | Fuente UTM y ubicación del enlace guardadas con cada consulta |
| Seguimiento | Fecha calculada sin aviso periódico | Revisión horaria en Codex con avisos de nuevas consultas y vencimientos; no envía mensajes a compradores |
| Descubrimiento | Metadatos básicos | Canonical, descripción específica, sitemap, robots y RealEstateListing |

En la medición inicial a 1440 × 844, el formulario comenzaba aproximadamente a 5,875 px del inicio; en 390 × 844, a 8,653 px. Los enlaces actuales llevan directamente al formulario y conservan la intención, sin exigir recorrer esas secciones. No se usa esa reducción como evidencia de ventas.

## Lo que se comprobó en el sitio alojado

- Acceso limitado al propietario. Una visita anónima devolvió HTTP 401.
- La tabla de consultas estaba vacía y no había datos comerciales configurados en settings.
- No existe una tasa de conversión medible ni evidencia de ventas atribuibles a la web.
- No se registraron consultas sintéticas en producción. Las pruebas del formulario usan almacenamiento local separado.

## Qué puede automatizarse y qué falta

La recepción, referencia, clasificación inicial, respuestas a preguntas del dossier y aviso al propietario ya tienen implementación. La integración firmada con CRM está disponible, sin destino configurado. Correo y WhatsApp automáticos no están activos. Para automatizar respuestas reales hacen falta cuentas comerciales, destino autorizado y mensajes aprobados; la integración también necesita reintentos para garantizar entrega ante caídas.

La web privada no puede atraer tráfico orgánico de buscadores. Abrirla, conectar el dominio, completar identidad/contactos y sustituir las fotos regionales por fotos del predio son los siguientes pasos de activación. No se han enviado anuncios ni publicaciones a terceros.

Tras la apertura: verificar el dominio en Search Console y presentar el sitemap; mantener una sola ficha canónica del activo; distribuir esa ficha mediante cuentas propias de portales o aliados comerciales autorizados. La distribución puede automatizarse con las conexiones correspondientes, pero no existe hoy una red conectada de portales ni una campaña activa. No crear páginas duplicadas, reseñas ficticias, escasez inventada ni correos no solicitados.

## Criterio comercial

La portada debe mostrar finalmente el terreno real, su acceso y su polígono. Una fotografía atractiva de otra zona, aunque se identifique correctamente, no sustituye esa evidencia para una operación de $30.3 millones MXN. La revisión documental, visita, negociación y formalización requieren responsables. No hay base para prometer que la web garantice la venta o elimine esas intervenciones.

## Referencias de diseño y descubrimiento

- Formularios breves y campos opcionales claros: https://www.nngroup.com/articles/web-form-design/
- Información básica y precio para compradores B2B: https://www.nngroup.com/articles/b2b-usability/
- Requisitos técnicos de Google, incluido acceso público: https://developers.google.com/search/docs/essentials/technical
- Un sitemap no garantiza indexación: https://developers.google.com/search/help/crawling-index-faq

## Validación de esta versión

- TypeScript sin errores y diff sin errores de espacios.
- Navegación, formulario y panel comprobados en Chromium. Guardado en D1 local; consentimiento obligatorio; fallo 503 simulado conserva los campos; reintento conserva ID; envío duplicado devuelve la misma referencia.
- La modalidad B y la procedencia del enlace se guardan correctamente. Los detalles opcionales conservan su valor al ocultarse.
- Portada revisada a 1440, 768, 390 y 320 px. La llamada de visita queda dentro de los primeros 844 px de alto. Se corrigió el desbordamiento del simulador y del texto del pie en pantallas pequeñas.
- La barra móvil y el asistente se ocultan al entrar en contacto para no tapar el formulario.
- Ficha, privacidad, robots y sitemap responden HTTP 200 en el entorno local. JSON-LD validado como JSON con precio base correcto; sitemap excluye gestión.
- Estas pruebas verifican funcionamiento y presentación, no probabilidad de venta ni posicionamiento.
