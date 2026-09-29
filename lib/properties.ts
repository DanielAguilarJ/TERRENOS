import { ubicaciones } from "@/lib/ubicaciones";

export const properties = {
  "el-bindho": {
    name: "El Bindho", type: "Terreno", location: "San Agustín Tlaxiaca, Hidalgo", href: "/propiedades/el-bindho", sheet: "/ficha", reference: "DMD-001",
    anchor: "terreno",
    ogImage: "/og-bindho.jpg",
    mapImage: "/mapa-bindho.webp",
    mapAlt: "Mapa del municipio de San Agustín Tlaxiaca, Hidalgo, con su límite marcado y Pachuca de Soto al oriente.",
    mapsQuery: "San Agustín Tlaxiaca, Hidalgo, México",
    share: "Te comparto El Bindho: terreno de 7.6 hectáreas (76,000 m²) en San Agustín Tlaxiaca, Hidalgo, a $399 MXN por m². Compra directa o asociación. Aquí está la ubicación y la ficha:",
  },
  "villas-de-la-hacienda": {
    name: "Villas de la Hacienda", type: "Departamento", location: "Atizapán de Zaragoza, Estado de México", href: "/propiedades/villas-de-la-hacienda", sheet: "/propiedades/villas-de-la-hacienda#ficha", reference: "DMD-002",
    anchor: "departamento",
    ogImage: "/og-villas.jpg",
    mapImage: "/mapa-villas.webp",
    mapAlt: "Mapa de Villas de la Hacienda, Atizapán de Zaragoza: el departamento sobre Boulevard S.O.P. y el Tec de Monterrey, Campus Estado de México, al sur.",
    mapsQuery: "Boulevard S.O.P., Villas de la Hacienda, 52929 Atizapán de Zaragoza, Estado de México",
    share: "Te comparto un departamento en venta en Villas de la Hacienda, Atizapán de Zaragoza: nivel alto, a " + ubicaciones["villas-de-la-hacienda"].referencias[0].km + " km por calle del Tec de Monterrey, Campus Estado de México. Aquí está la ubicación y la ficha:",
  },
} as const;
export type PropertyId = keyof typeof properties;
export function propertyName(id: string) { return properties[id as PropertyId]?.name ?? "Propiedad por definir"; }

/** Enlaces oficiales de Google Maps y Waze (URL públicas, sin llave). Solo hay ruta cuando la ubicación es precisa. */
export function mapLinks(id: PropertyId) {
  const u = ubicaciones[id];
  const punto = u.lat + "," + u.lon;
  return {
    view: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(u.precisa ? punto : properties[id].mapsQuery),
    directions: u.precisa ? "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(punto) : null,
    waze: u.precisa ? "https://waze.com/ul?ll=" + encodeURIComponent(punto) + "&navigate=yes" : null,
  };
}
