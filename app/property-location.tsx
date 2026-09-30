import { ArrowUpRight, MapPin, Navigation } from "lucide-react";
import { mapLinks, properties, type PropertyId } from "@/lib/properties";
import { ubicaciones } from "@/lib/ubicaciones";

const km = (n: number) => n.toLocaleString("es-MX", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + " km";

/** Mapa estático + enlaces de navegación. Las distancias vienen de lib/ubicaciones.ts (derivado, no tecleado). */
export default function PropertyLocation({ property, caption }: { property: PropertyId; caption: string }) {
  const item = properties[property];
  const place = ubicaciones[property];
  const links = mapLinks(property);
  return <div className="place">
    <a className="place-map" href={links.view} target="_blank" rel="noreferrer" aria-label={"Abrir la ubicación de " + item.name + " en Google Maps"}>
      <picture>
        <source media="(max-width: 700px)" srcSet={item.mapImage.replace(".webp", "-movil.webp")} width={520} height={600}/>
        <img src={item.mapImage} width={1200} height={760} alt={item.mapAlt} loading="lazy"/>
      </picture>
      <span className="place-map-open"><MapPin size={16}/> Abrir en Google Maps</span>
    </a>
    <div className="place-body">
      <p className="place-caption">{caption}</p>
      {place.referencias.length > 0 && <ul className="place-refs" aria-label="Distancias por calle desde el departamento">
        {place.referencias.map(r => <li key={r.nombre}><span>{r.nombre}</span><strong>{km(r.km)}</strong></li>)}
      </ul>}
      {place.referencias.length > 0 && <p className="place-note">Distancia por calle en auto, sin autopistas de cuota, calculada con OpenStreetMap. El tiempo depende del tráfico.</p>}
      <div className="place-actions">
        {links.directions && <a href={links.directions} target="_blank" rel="noreferrer"><Navigation size={17}/> Cómo llegar</a>}
        {links.waze && <a href={links.waze} target="_blank" rel="noreferrer">Abrir en Waze <ArrowUpRight size={16}/></a>}
        {!links.directions && <a href={links.view} target="_blank" rel="noreferrer"><MapPin size={17}/> Ver la zona en Google Maps</a>}
      </div>
      <small className="place-credit">Mapa: © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">colaboradores de OpenStreetMap</a></small>
    </div>
  </div>;
}
