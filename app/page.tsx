import Agency from "./agency";
import { properties } from "@/lib/properties";
import { siteOrigin, shareMetadata } from "@/lib/site-info";
import { grafo, jsonLd, organizacion, sitio } from "@/lib/seo";
export const metadata={title:"Propiedades en venta en Atizapán e Hidalgo | Diamond Inmobiliaria",description:"Departamento en Villas de la Hacienda, Atizapán de Zaragoza, y El Bindho, terreno de 76,000 m² en San Agustín Tlaxiaca, Hidalgo. Ubicación, fichas y contacto.",...shareMetadata("/","Diamond Inmobiliaria · Dos propiedades en venta","Departamento en Villas de la Hacienda, Atizapán, y El Bindho: 7.6 hectáreas en Hidalgo a $399 MXN/m². Mira las ubicaciones y las fichas.","/og-diamond.jpg","Diamond Inmobiliaria: departamento en Villas de la Hacienda y terreno El Bindho")};
const catalog={"@type":"ItemList","@id":siteOrigin+"/#propiedades",name:"Propiedades en venta de Diamond Inmobiliaria",itemListElement:Object.values(properties).map((p,i)=>({"@type":"ListItem",position:i+1,name:p.name,url:siteOrigin+p.href,image:siteOrigin+p.ogImage}))};
export default function Home(){return <><script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(grafo(organizacion,sitio,catalog))}/><Agency/></>;}
