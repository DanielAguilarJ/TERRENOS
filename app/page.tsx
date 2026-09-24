import PropertySite from "./property-site";
import { propertyListing, siteOrigin } from "@/lib/site-info";
export const metadata={
 title: "Terreno en venta en Hidalgo · 7.6 ha | El Bindho",
 description: "El Bindho: 76,000 m² ofertados en San Agustín Tlaxiaca, Hidalgo. Precio base $399 MXN/m². Consulta la ficha y solicita información o una visita.",
 alternates:{canonical:siteOrigin+"/"},
 openGraph:{url:siteOrigin+"/",title:"El Bindho · 7.6 hectáreas en Hidalgo",description:"Terreno en San Agustín Tlaxiaca. 76,000 m² ofertados · $399 MXN/m² · Compra directa o asociación."}
};
export default function Home() { return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(propertyListing).replace(/</g,"\\u003c")}}/><PropertySite /></>; }
