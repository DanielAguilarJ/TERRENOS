export const siteOrigin = "https://diamond-el-bindho.oportunidades70814.chatgpt.site";

/** Vista previa al compartir (WhatsApp, Facebook, X, iMessage): imagen 1200x630 generada en public/. */
export function shareMetadata(path: string, title: string, description: string, image: string, alt: string) {
  const url = siteOrigin + path;
  const images = [{ url: siteOrigin + image, width: 1200, height: 630, alt, type: "image/jpeg" }];
  return {
    alternates: { canonical: url },
    openGraph: { url, title, description, type: "website", locale: "es_MX", siteName: "Diamond Inmobiliaria", images },
    twitter: { card: "summary_large_image", title, description, images: [siteOrigin + image] },
  };
}
export const propertyListing = {
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "@id": siteOrigin + "/propiedades/el-bindho#el-bindho",
  url: siteOrigin + "/propiedades/el-bindho",
  name: "El Bindho: terreno de 76,000 m² en San Agustín Tlaxiaca, Hidalgo",
  description: "Superficie neta ofertada de 76,000 m² según memorándum de la propiedad. Precio base de compra directa: $399 MXN por m², $30,324,000 MXN en total. Gastos e impuestos no incluidos; datos sujetos a validación documental.",
  inLanguage: "es-MX",
  image: siteOrigin + "/og-bindho.jpg",
  about: {
    "@type": "Place",
    name: "El Bindho",
    address: { "@type": "PostalAddress", addressLocality: "San Agustín Tlaxiaca", addressRegion: "Hidalgo", addressCountry: "MX" },
    additionalProperty: { "@type": "PropertyValue", name: "Superficie neta ofertada", value: 76000, unitText: "m²" }
  },
  offers: { "@type": "Offer", price: "30324000", priceCurrency: "MXN", url: siteOrigin + "/propiedades/el-bindho#solicitud", description: "Precio base de compra directa, sin impuestos, gastos notariales, trámites ni urbanización. Condiciones y disponibilidad a confirmar." },
  publisher: { "@type": "Organization", name: "Asset Management Diamond", url: siteOrigin }
};
