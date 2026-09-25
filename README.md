# El Bindho · Asset Management Diamond

Sitio de presentación y recepción de consultas para el terreno El Bindho, en San Agustín Tlaxiaca, Hidalgo.

La página presenta los datos del memorándum de la propiedad, una ficha para imprimir, modalidades de operación, preguntas frecuentes y un formulario que registra consultas en Cloudflare D1. El panel privado de gestión permite revisar interesados y cambiar su etapa comercial.

## Desarrollo local

Requisitos: Node.js 22.13 o posterior y npm.

```sh
npm ci
cp .env.example .env
npm run dev
```

Abre `http://127.0.0.1:5173`. El sitio usa la autenticación local de Sites para desarrollo. En producción, el panel requiere iniciar sesión con ChatGPT y una dirección incluida en `ADMIN_EMAILS`.

Para generar los archivos de producción ejecuta `npm run build`. Las herramientas de hosting y su archivo `.openai/hosting.json` corresponden al proyecto de Sites asociado; revisa el destino antes de desplegar desde otro entorno.

## Configuración privada

Configura las variables en el servicio que aloja la aplicación, o en el archivo local `.env`:

- `ADMIN_EMAILS`: lista de correos autorizados a entrar al panel.
- `LEAD_WEBHOOK_URL` y `LEAD_WEBHOOK_SECRET`: destino HTTPS y secreto opcionales para conectar un CRM.

`.env`, las bases de datos locales, los archivos de build y las credenciales están excluidos de Git. No subas datos de compradores, títulos, identificaciones ni documentos privados.

El aviso de privacidad y la información comercial deben revisarse antes de abrir el sitio al público. Las cifras de superficie, el precio y las modalidades son las indicadas en el memorándum de la propiedad y están sujetas a validación y acuerdo. Las fotografías incluidas muestran la región, no el terreno.

## Tecnología

Vinext, React, Cloudflare Workers, D1 y Drizzle. La aplicación incluye metadatos para buscadores, `robots.txt`, `sitemap.xml` y datos estructurados del listado.
