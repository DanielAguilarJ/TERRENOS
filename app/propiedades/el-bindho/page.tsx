import PropertySite from "@/app/property-site";
import { propertyListing, shareMetadata } from "@/lib/site-info";
import { grafo, jsonLd, migas, organizacion } from "@/lib/seo";
export const metadata={title:"Terreno en venta de 7.6 ha en Hidalgo · El Bindho | Diamond",description:"76,000 m² ofertados en San Agustín Tlaxiaca, Hidalgo. Precio base $399 MXN/m². Mira la ubicación, consulta la ficha y solicita información o una visita.",...shareMetadata("/propiedades/el-bindho","El Bindho · 7.6 hectáreas en Hidalgo","76,000 m² en San Agustín Tlaxiaca · $399 MXN/m² · Compra directa o asociación. Ubicación y ficha.","/og-bindho.jpg","El Bindho: terreno de 7.6 hectáreas en San Agustín Tlaxiaca, Hidalgo")};
export default function Land(){return <><script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(grafo(propertyListing,migas("El Bindho, terreno en Hidalgo","/propiedades/el-bindho"),organizacion))}/><PropertySite/></>;}
