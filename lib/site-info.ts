export const siteOrigin = "https://diamond-el-bindho.oportunidades70814.chatgpt.site";
export const propertyListing = {
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "@id": siteOrigin + "/#el-bindho",
  url: siteOrigin + "/",
  name: "El Bindho: terreno de 76,000 m² en San Agustín Tlaxiaca, Hidalgo",
  description: "Superficie neta ofertada de 76,000 m² según memorándum de la propiedad. Precio base de compra directa: $399 MXN por m², $30,324,000 MXN en total. Gastos e impuestos no incluidos; datos sujetos a validación documental.",
  inLanguage: "es-MX",
  about: {
    "@type": "Place",
    name: "El Bindho",
    address: { "@type": "PostalAddress", addressLocality: "San Agustín Tlaxiaca", addressRegion: "Hidalgo", addressCountry: "MX" },
    additionalProperty: { "@type": "PropertyValue", name: "Superficie neta ofertada", value: 76000, unitText: "m²" }
  },
  offers: { "@type": "Offer", price: "30324000", priceCurrency: "MXN", url: siteOrigin + "/#solicitud", description: "Precio base de compra directa, sin impuestos, gastos notariales, trámites ni urbanización. Condiciones y disponibilidad a confirmar." },
  publisher: { "@type": "Organization", name: "Asset Management Diamond", url: siteOrigin }
};
