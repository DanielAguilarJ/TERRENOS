import { organizacionId, siteOrigin } from "@/lib/site-info";

/**
 * Datos estructurados comunes y fechas del sitemap.
 * Google NO sigue un `@id` hasta otra página: cada página define dentro de su propio `@graph` los nodos a los que
 * apunta (la organización, el sitio). Por eso `organizacion` se incluye en el grafo de cada página que la cita.
 */
export const sitioId = siteOrigin + "/#sitio";

export const organizacion = {
  "@type": "Organization",
  "@id": organizacionId,
  name: "Diamond Inmobiliaria",
  alternateName: "Asset Management Diamond",
  url: siteOrigin + "/",
  areaServed: [
    { "@type": "State", name: "Estado de México" },
    { "@type": "State", name: "Hidalgo" },
  ],
  knowsLanguage: "es-MX",
};

/** El nombre del sitio que Google puede mostrar junto al resultado sale de este nodo. */
export const sitio = {
  "@type": "WebSite",
  "@id": sitioId,
  name: "Diamond Inmobiliaria",
  alternateName: "Diamond",
  url: siteOrigin + "/",
  inLanguage: "es-MX",
  publisher: { "@id": organizacionId },
};

/** Migas Inicio → página (Google las muestra en lugar de la URL cruda del resultado). */
export function migas(nombre: string, ruta: string) {
  return {
    "@type": "BreadcrumbList",
    "@id": siteOrigin + ruta + "#migas",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: siteOrigin + "/" },
      { "@type": "ListItem", position: 2, name: nombre, item: siteOrigin + ruta },
    ],
  };
}

export function grafo(...nodos: object[]) {
  return { "@context": "https://schema.org", "@graph": nodos };
}

/** Serializa para `dangerouslySetInnerHTML` sin permitir que un `<` cierre el script. */
export function jsonLd(datos: object) {
  return { __html: JSON.stringify(datos).replace(/</g, "\\u003c") };
}

/**
 * Páginas indexables y la fecha del último cambio REAL de su contenido (no la del despliegue: Google deja de creer
 * en un `lastmod` que cambia en cada build). Al cambiar el texto de una página, actualiza aquí su fecha.
 * `/ficha` (versión para imprimir) y `/privacidad` no se indexan y no van al sitemap.
 */
export const paginasIndexables = [
  { ruta: "/", lastmod: "2026-09-30" },
  { ruta: "/propiedades/el-bindho", lastmod: "2026-09-30" },
  { ruta: "/propiedades/villas-de-la-hacienda", lastmod: "2026-09-30" },
  { ruta: "/guias/comprar-terreno-en-hidalgo", lastmod: "2026-09-30" },
] as const;
