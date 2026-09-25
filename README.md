# Diamond Inmobiliaria · Asset Management Diamond

Sitio inmobiliario con catálogo y recepción de consultas para El Bindho, en San Agustín Tlaxiaca, Hidalgo, y el departamento Villas de la Hacienda, en Atizapán de Zaragoza, Estado de México.

La portada enlaza cada ficha: `/propiedades/el-bindho` y `/propiedades/villas-de-la-hacienda`. El Bindho conserva su ficha imprimible `/ficha`, sus modalidades y asistente. El departamento se presenta como ficha preliminar: precio, m², distribución, estacionamiento, elevador, fotografías y estado legal actual pendientes de confirmar. No se presenta el valor catastral como precio de venta ni se promete rentabilidad o aprobación de crédito.

Los formularios guardan `property_id` en Cloudflare D1 y validan modalidades y presupuestos por inmueble. La migración `0001` conserva las consultas previas como `el-bindho`. El panel permite filtrar por propiedad, consultar pendientes y exportar las consultas. El webhook opcional incluye `propertyId`. La automatización existente de Codex se llama ahora “Consultas de Diamond” y vigila ambos inmuebles sin contactar compradores.

## Desarrollo local

Requisitos: Node.js 22.13 o posterior y npm.

```sh
npm ci
cp .env.example .env
npm run dev
```

Abre `http://127.0.0.1:5173`. El sitio usa la autenticación local de Sites para desarrollo. En producción, el panel requiere iniciar sesión con ChatGPT y una dirección incluida en `ADMIN_EMAILS`.

Para generar los archivos de producción ejecuta `npm run build`. Las herramientas de hosting y su archivo `.openai/hosting.json` corresponden al proyecto de Sites asociado; revisa el destino antes de desplegar desde otro entorno.

## Vercel

La configuración de Vercel compila con Nitro (`npm run build:vercel`) y genera `.vercel/output` en lugar de `.next`. Esto corrige el error de `routes-manifest.json` cuando Vercel detecta el paquete Next.js, pero **la compilación por sí sola no habilita el sitio comercial en Vercel**. El formulario y el panel siguen usando Cloudflare D1 y la autenticación administrada por Sites. En Vercel, el formulario devuelve un error de almacenamiento y la ruta de inicio de sesión del panel no existe hasta que se migren ambos servicios. No conectes el dominio público ni promociones esa implementación como operativa antes de completar y probar la migración de datos y acceso.

## Configuración privada

Configura las variables en el servicio que aloja la aplicación, o en el archivo local `.env`:

- `ADMIN_EMAILS`: lista de correos autorizados a entrar al panel.
- `LEAD_WEBHOOK_URL` y `LEAD_WEBHOOK_SECRET`: destino HTTPS y secreto opcionales para conectar un CRM.

`.env`, las bases de datos locales, los archivos de build y las credenciales están excluidos de Git. No subas datos de compradores, títulos, identificaciones ni documentos privados.

El aviso de privacidad y la información comercial deben revisarse antes de abrir el sitio al público. Las cifras de superficie, el precio y las modalidades son las indicadas en el memorándum de la propiedad y están sujetas a validación y acuerdo. Las fotografías incluidas muestran la región, no el terreno.

## Tecnología

Vinext, React, Cloudflare Workers, D1 y Drizzle. La aplicación incluye metadatos para buscadores, `robots.txt`, `sitemap.xml` y datos estructurados del listado.
