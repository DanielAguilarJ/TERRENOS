import { ArrowDown, ArrowUpRight, Check, FileText } from "lucide-react";
import { AgencyHeader, AgencyFooter } from "./agency-shell";
import PropertyLocation from "./property-location";
import ShareBar from "./share-bar";
import WhatsAppContact from "./whatsapp-contact";
import { ubicaciones } from "@/lib/ubicaciones";

const tec = ubicaciones["villas-de-la-hacienda"].referencias[0];
const tecKm = tec.km.toLocaleString("es-MX", { minimumFractionDigits: 1 });

const apartmentFacts: [string, string][] = [
  ["Operación", "Venta"],
  ["Ubicación", "Boulevard S.O.P., Fracc. Villas de la Hacienda, C.P. 52929, Atizapán de Zaragoza"],
  ["Nivel", "3B · nivel alto del Edificio 3"],
  ["Forma de compra", "Contado, o crédito bancario o Infonavit sujeto a la aprobación de la institución y al avalúo"],
  ["Precio", "A consultar"],
];
const landFacts: [string, string][] = [
  ["Superficie ofertada", "76,000 m² · 7.6 hectáreas"],
  ["Precio base", "$399 MXN por m²"],
  ["Total", "$30,324,000 MXN, sin impuestos ni gastos"],
  ["Régimen declarado", "Propiedad privada, no ejidal"],
  ["Modalidades", "Compra directa, fideicomiso o coinversión"],
  ["Municipio", "San Agustín Tlaxiaca, Hidalgo"],
];

function Facts({ rows }: { rows: [string, string][] }) {
  return <dl className="showcase-facts">{rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>;
}

function ApartmentShowcase() {
  return <section className="showcase" id="departamento" aria-labelledby="departamento-titulo">
    <div className="showcase-head">
      <p className="agency-kicker">DMD–002 · DEPARTAMENTO EN VENTA · ATIZAPÁN DE ZARAGOZA</p>
      <h2 id="departamento-titulo">Villas de la Hacienda.<br/><em>Tu siguiente paso, en casa propia.</em></h2>
    </div>
    <div className="showcase-grid">
      <div className="showcase-intro">
        <p className="showcase-lead">Un departamento en nivel alto dentro de Villas de la Hacienda, una colonia habitacional ya consolidada de Atizapán de Zaragoza, a {tecKm} km por calle del Tec de Monterrey, Campus Estado de México.</p>
        <p>Pensado para quien quiere dejar de pagar renta y empezar un patrimonio propio en el norte del Valle de México, y para quien busca un departamento para rentar a estudiantes o profesionistas de la zona.</p>
      </div>
      <PropertyLocation property="villas-de-la-hacienda" caption="Boulevard S.O.P., Fraccionamiento Villas de la Hacienda, C.P. 52929, Atizapán de Zaragoza, Estado de México."/>
      <div className="showcase-copy">
        <ul className="showcase-points">
          <li><Check size={17}/> La privacidad de un piso alto</li>
          <li><Check size={17}/> Colonia consolidada, con años de vida vecinal</li>
          <li><Check size={17}/> Documentación compartida por canal privado antes de firmar</li>
        </ul>
        <Facts rows={apartmentFacts}/>
        <div className="showcase-actions">
          <a className="button gold" href="/propiedades/villas-de-la-hacienda#contacto">Agenda tu visita <ArrowUpRight size={18}/></a>
          <a className="agency-action" href="/propiedades/villas-de-la-hacienda">Ver la ficha completa <ArrowUpRight size={18}/></a>
          <WhatsAppContact property="villas-de-la-hacienda"/>
        </div>
        <ShareBar property="villas-de-la-hacienda" label="Comparte este departamento"/>
      </div>
    </div>
  </section>;
}

function LandShowcase() {
  return <section className="showcase showcase-alt" id="terreno" aria-labelledby="terreno-titulo">
    <div className="showcase-head">
      <p className="agency-kicker">DMD–001 · TERRENO EN VENTA O ASOCIACIÓN · HIDALGO</p>
      <h2 id="terreno-titulo">El Bindho.<br/><em>7.6 hectáreas para pensar en grande.</em></h2>
    </div>
    <div className="showcase-grid">
      <div className="showcase-intro">
        <p className="showcase-lead">76,000 m² netos en San Agustín Tlaxiaca, municipio vecino de Pachuca y parte de su zona metropolitana: una sola superficie para evaluar un proyecto de otra escala.</p>
        <p>Se ofrece la compra completa o una asociación con la propiedad, mediante fideicomiso o coinversión, para desarrollar un proyecto propio.</p>
      </div>
      <PropertyLocation property="el-bindho" caption="El Bindho está en el municipio de San Agustín Tlaxiaca, al poniente de Pachuca. El polígono exacto y el archivo KMZ se comparten con la documentación."/>
      <div className="showcase-copy">
        <ul className="showcase-points">
          <li><Check size={17}/> Una sola reserva territorial de 7.6 hectáreas</li>
          <li><Check size={17}/> En la Zona Metropolitana de Pachuca, al poniente de la capital</li>
          <li><Check size={17}/> Precio base publicado: $399 MXN por m²</li>
          <li><Check size={17}/> Polígono y archivo KMZ con la documentación</li>
        </ul>
        <Facts rows={landFacts}/>
        <div className="showcase-actions">
          <a className="button gold" href="/propiedades/el-bindho#solicitud">Solicita el expediente <ArrowUpRight size={18}/></a>
          <a className="agency-action" href="/propiedades/el-bindho">Ver la ficha completa <ArrowUpRight size={18}/></a>
          <a className="agency-action" href="/ficha"><FileText size={17}/> Ficha para imprimir</a>
          <WhatsAppContact property="el-bindho"/>
        </div>
        <ShareBar property="el-bindho" label="Comparte este terreno"/>
      </div>
    </div>
  </section>;
}

export default function Agency() {
  return <div className="agency-site"><a className="skip-link" href="#main">Ir al contenido</a><AgencyHeader/><main id="main">
    <section className="agency-hero">
      <div className="agency-hero-copy">
        <p className="agency-kicker">DIAMOND · BIENES RAÍCES EN MÉXICO</p>
        <h1>Un lugar.<br/>Todo lo que<br/><em>viene después.</em></h1>
        <p className="agency-intro">Un departamento en Atizapán y 7.6 hectáreas en Hidalgo. Mira dónde están, qué incluyen y da el siguiente paso desde aquí.</p>
        <div className="hero-jumps">
          <a className="agency-action" href="#departamento">Departamento en Atizapán <ArrowDown size={19}/></a>
          <a className="agency-action" href="#terreno">Terreno de 7.6 ha en Hidalgo <ArrowDown size={19}/></a>
        </div>
        <ShareBar label="Comparte las dos propiedades"/>
      </div>
      <figure className="agency-hero-photo"><img src="/hidalgo-landscape.webp" width={2000} height={1334} alt="Paisaje de Mineral del Chico, Hidalgo, en la región de El Bindho." fetchPriority="high"/><figcaption><span>Una mirada a Hidalgo</span><small>Paisaje de la región</small></figcaption></figure>
    </section>
    <section className="agency-catalog" id="propiedades"><div className="agency-section-heading"><div><p className="agency-kicker">EL PORTAFOLIO DIAMOND</p><h2>Dos propiedades.<br/><em>Distintas posibilidades.</em></h2></div><p>Toca una propiedad para ver<br/>su ubicación, sus datos y cómo avanzar.</p></div><div className="agency-property-grid">
      <a className="agency-property-card" href="#departamento"><div className="agency-apartment-cover"><div className="agency-card-meta"><span>DEPARTAMENTO · VENTA</span><span>DMD–002</span></div><div className="agency-apartment-title">Villas de<br/>la Hacienda<span>ATIZAPÁN DE ZARAGOZA</span></div><div className="agency-card-bottom"><span>Boulevard S.O.P.<br/>Estado de México</span><ArrowDown size={29}/></div></div><div className="agency-card-info"><div><h3>Tu siguiente capítulo, en Atizapán.</h3><p>Departamento · Nivel alto</p></div><span>Precio a consultar</span></div><p className="agency-card-note">A {tecKm} km por calle del Tec de Monterrey, Campus Estado de México.</p></a>
      <a className="agency-property-card" href="#terreno"><div className="agency-land-cover"><img src="/region.webp" width={5501} height={2585} alt="Vista de Pachuca, Hidalgo, la ciudad vecina a San Agustín Tlaxiaca." loading="lazy"/><div className="agency-card-meta"><span>TERRENO · VENTA / ASOCIACIÓN</span><span>DMD–001</span></div><div className="agency-land-title">El Bindho<span>76,000 m² · HIDALGO</span></div><span className="agency-image-label">Pachuca, ciudad vecina</span></div><div className="agency-card-info"><div><h3>Tierra para pensar en grande.</h3><p>San Agustín Tlaxiaca · 7.6 hectáreas</p></div><span>$30,324,000 MXN</span></div><p className="agency-card-note">Precio base: $399 MXN/m². Gastos e impuestos no incluidos.</p></a>
    </div></section>
    <ApartmentShowcase/>
    <LandShowcase/>
    <section className="agency-about" id="diamond"><p className="agency-kicker">ASSET MANAGEMENT DIAMOND</p><div><h2>Elegir una propiedad<br/>merece una<br/><em>buena conversación.</em></h2><p>Somos tu punto de contacto con la parte vendedora. Te mostramos el inmueble, te compartimos su documentación por un canal privado y coordinamos contigo cada paso, de la primera visita a la firma.</p><div className="agency-method">{[["01", "Ubicación a la vista", "Mapa, distancias y ruta para cada propiedad, para que sepas desde el primer vistazo si encaja con tu vida o tu proyecto."], ["02", "El siguiente paso", "Solicita información, la ficha completa o un recorrido con el equipo."], ["03", "Atención con contexto", "Tu consulta queda vinculada al inmueble que elegiste, para darle seguimiento sin repetir nada."]].map(([n, t, p]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{p}</p></article>)}</div></div></section>
    <section className="agency-contact-intro" id="contacto"><p className="agency-kicker">EMPECEMOS POR LO QUE TE INTERESA</p><h2>¿Dónde empieza<br/><em>tu próximo capítulo?</em></h2><div><a className="agency-action" href="/propiedades/villas-de-la-hacienda#contacto">El departamento en Atizapán <ArrowUpRight size={20}/></a><a className="agency-action" href="/propiedades/el-bindho#solicitud">El terreno en Hidalgo <ArrowUpRight size={20}/></a><WhatsAppContact/></div></section>
    <p className="agency-photo-credit">Fotografías de la región: <a href="https://commons.wikimedia.org/wiki/File:Parque_nacional_El_Chico_(Mineral_del_chico_valley).jpg" target="_blank" rel="noreferrer">Rafael Saldaña</a> · <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank" rel="noreferrer">CC BY 2.0</a>; <a href="https://commons.wikimedia.org/wiki/File:Vista_de_Pachuca,_Hidalgo,_M%C3%A9xico,_2013-10-10,_DD_01.JPG" target="_blank" rel="noreferrer">Diego Delso</a> · <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noreferrer">CC BY-SA 3.0</a>. Encuadres adaptados. Mapas: © colaboradores de OpenStreetMap.</p>
  </main><AgencyFooter/></div>;
}
