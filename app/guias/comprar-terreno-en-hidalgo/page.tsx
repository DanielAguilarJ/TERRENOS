/* eslint-disable @next/next/no-html-link-for-pages -- con vinext en Vercel, `next/link` deja el clic en la portada
   («e is not a function»); el sitio enlaza con <a href> (carga completa) y la guarda C5 lo exige. */
import "../guia.css";
import { shareMetadata, siteOrigin } from "@/lib/site-info";
import { grafo, jsonLd, migas, organizacion, paginasIndexables } from "@/lib/seo";
import { CONSULTADA, LEYES, LISTA_FINAL, PASOS, RUTA_GUIA_TERRENO, type Cita } from "@/lib/guias/terreno-hidalgo";

const TITULO = "Comprar un terreno en Hidalgo: qué revisar antes de firmar";
const DESCRIPCION = "Qué revisar antes de comprar un terreno en Hidalgo: ejido, gravámenes, uso de suelo, catastro, traslación de dominio y escritura, con la ley citada.";
// La fecha de revisión es la misma que declara el sitemap: una sola fuente para `lastmod` y `dateModified`.
const REVISADA = paginasIndexables.find((p) => p.ruta === RUTA_GUIA_TERRENO)?.lastmod ?? "2026-09-30";

export const metadata = {
  title: "Comprar terreno en Hidalgo: qué revisar antes de firmar",
  description: DESCRIPCION,
  ...shareMetadata(RUTA_GUIA_TERRENO, TITULO, "Ejido, gravámenes, uso de suelo, catastro, impuesto y escritura: la lista, con cada artículo de ley.", "/og-diamond.jpg", "Diamond Inmobiliaria: guía para comprar un terreno en Hidalgo"),
};

const articulo = {
  "@type": "Article",
  "@id": siteOrigin + RUTA_GUIA_TERRENO + "#guia",
  headline: TITULO,
  description: DESCRIPCION,
  inLanguage: "es-MX",
  datePublished: "2026-09-30",
  dateModified: REVISADA,
  mainEntityOfPage: siteOrigin + RUTA_GUIA_TERRENO,
  image: siteOrigin + "/og-diamond.jpg",
  author: { "@id": organizacion["@id"] },
  publisher: { "@id": organizacion["@id"] },
  about: { "@type": "Place", name: "Hidalgo", address: { "@type": "PostalAddress", addressRegion: "Hidalgo", addressCountry: "MX" } },
  citation: Object.values(LEYES).map((l) => ({ "@type": "Legislation", name: l.nombre, url: l.url })),
};

/** Un fragmento que no empieza la oración se muestra con «…» delante, para que no parezca el artículo entero. */
function fragmento(texto: string) {
  return /^[a-záéíóúñ]/.test(texto) ? "…" + texto : texto;
}

function CitaLey({ c }: { c: Cita }) {
  const ley = LEYES[c.ley];
  return (
    <blockquote cite={ley.url}>
      <p>«{fragmento(c.texto)}»</p>
      <p className="guia-fuente"><cite>{ley.nombre}</cite>, art. {c.articulo}</p>
    </blockquote>
  );
}

export default function GuiaTerrenoHidalgo() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(grafo(articulo, migas("Comprar un terreno en Hidalgo", RUTA_GUIA_TERRENO), organizacion))} />
      <main className="document-page guia">
        <nav className="guia-migas" aria-label="Migas de pan">
          <a href="/">Inicio</a><span aria-hidden="true">/</span><span aria-current="page">Comprar un terreno en Hidalgo</span>
        </nav>
        <div className="eyebrow">GUÍA PARA COMPRADORES · HIDALGO</div>
        <h1>{TITULO}</h1>
        <p className="lead">Antes de pagar un anticipo por un terreno en Hidalgo, hay seis cosas que revisar: si la tierra es ejidal, qué dice el Registro Público, qué permite el uso de suelo, su registro en el catastro, el impuesto que paga quien compra y cómo se firma la escritura. Esta guía explica cada una en lenguaje llano y cita, debajo, el artículo de la ley que lo dice.</p>
        <p className="guia-fecha">Revisada contra los textos oficiales de las leyes el {CONSULTADA}.</p>

        <nav className="guia-indice" aria-labelledby="indice">
          <h2 id="indice">En esta guía</h2>
          <ol>{PASOS.map((p) => <li key={p.id}><a href={"#" + p.id}>{p.titulo}</a></li>)}</ol>
        </nav>

        {PASOS.map((p, i) => (
          <section key={p.id} id={p.id} aria-labelledby={p.id + "-titulo"}>
            <h2 id={p.id + "-titulo"}>{i + 1}. {p.titulo}</h2>
            {p.texto.map((t) => <p key={t}>{t}</p>)}
            <h3>Qué pedir</h3>
            <ul>{p.pedir.map((t) => <li key={t}>{t}</li>)}</ul>
            <h3>Lo que dice la ley</h3>
            <div className="guia-citas">{p.citas.map((c) => <CitaLey key={c.ley + c.articulo + c.texto} c={c} />)}</div>
          </section>
        ))}

        <section id="lista" aria-labelledby="lista-titulo">
          <h2 id="lista-titulo">Antes de firmar, ten a la mano</h2>
          <ul className="guia-lista">{LISTA_FINAL.map((t) => <li key={t}>{t}</li>)}</ul>
        </section>

        <section id="terreno-grande" aria-labelledby="terreno-grande-titulo">
          <h2 id="terreno-grande-titulo">¿Buscas un terreno grande en Hidalgo?</h2>
          <p>El Bindho son 76,000 m² ofertados en San Agustín Tlaxiaca. Por su superficie, un proyecto de fraccionamiento o subdivisión ahí entraría en el supuesto de más de 10,000 m² del paso 3.</p>
          <p>Pide la documentación disponible y revísala con esta lista y con tu notario antes de decidir.</p>
          <a className="button gold" href="/propiedades/el-bindho">Ver el terreno El Bindho</a>
        </section>

        <section id="fuentes" aria-labelledby="fuentes-titulo">
          <h2 id="fuentes-titulo">Fuentes</h2>
          <p>Textos descargados del Congreso del Estado de Hidalgo y, la Ley Agraria, del Orden Jurídico Nacional. DOF: Diario Oficial de la Federación; P.O.: Periódico Oficial del Estado de Hidalgo.</p>
          <div className="guia-tabla">
            <table>
              <thead><tr><th scope="col">Ley</th><th scope="col">Publicación</th><th scope="col">Última reforma</th></tr></thead>
              <tbody>{Object.values(LEYES).map((l) => (
                <tr key={l.codigo}><td><a href={l.url} rel="noopener">{l.nombre}</a></td><td>{l.publicacion}</td><td>{l.reforma}</td></tr>
              ))}</tbody>
            </table>
          </div>
        </section>

        <div className="document-note">Esta guía resume las leyes que aplican a la compra de un terreno en Hidalgo, en las versiones consultadas el {CONSULTADA}. No incluye montos en pesos, porque el valor de la UMA, los derechos del Registro y las tarifas municipales cambian cada año, y no sustituye la revisión de un notario o de un abogado: pídele que confirme que no haya reformas posteriores y qué trámite pide tu municipio.</div>

        <footer className="guia-pie">
          <a href="/">Diamond Inmobiliaria</a>
          <a href="/propiedades/el-bindho">Terreno en Hidalgo: El Bindho</a>
          <a href="/propiedades/villas-de-la-hacienda">Departamento en Atizapán</a>
          <a href="/privacidad">Privacidad</a>
        </footer>
      </main>
    </>
  );
}
