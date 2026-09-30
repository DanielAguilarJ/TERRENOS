/* eslint-disable @next/next/no-html-link-for-pages -- con vinext en Vercel, `next/link` deja el clic en la portada
   («e is not a function»); el sitio enlaza con <a href> (carga completa) y la guarda C5 lo exige. */
import "../guia.css";
import { shareMetadata, siteOrigin } from "@/lib/site-info";
import { grafo, jsonLd, migas, organizacion, paginasIndexables } from "@/lib/seo";
import { CONSULTADA, GASTOS, LEYES, LISTA_FINAL, PASOS, RUTA_GUIA_DEPTO } from "@/lib/guias/depto-atizapan";
import { RUTA_GUIA_TERRENO } from "@/lib/guias/terreno-hidalgo";
import { CitaLey } from "../partes";

const TITULO = "Comprar un departamento en Atizapán: gastos y documentos";
const DESCRIPCION = "Qué revisar y qué pagar al comprar un departamento en Atizapán: IFREM, aviso preventivo, condominio, impuesto sobre adquisición y escritura, con la ley citada.";
// La fecha de revisión es la misma que declara el sitemap: una sola fuente para `lastmod` y `dateModified`.
const REVISADA = paginasIndexables.find((p) => p.ruta === RUTA_GUIA_DEPTO)?.lastmod ?? "2026-09-30";
const TITULO_PASO = Object.fromEntries(PASOS.map((p) => [p.id, p.titulo]));

export const metadata = {
  title: "Comprar departamento en Atizapán: gastos y documentos",
  description: DESCRIPCION,
  ...shareMetadata(RUTA_GUIA_DEPTO, TITULO, "Registro, aviso preventivo, condominio, impuesto, predial y escritura: la lista, con cada artículo de ley.", "/og-diamond.jpg", "Diamond Inmobiliaria: guía para comprar un departamento en Atizapán"),
};

const articulo = {
  "@type": "Article",
  "@id": siteOrigin + RUTA_GUIA_DEPTO + "#guia",
  headline: TITULO,
  description: DESCRIPCION,
  inLanguage: "es-MX",
  datePublished: "2026-09-30",
  dateModified: REVISADA,
  mainEntityOfPage: siteOrigin + RUTA_GUIA_DEPTO,
  image: siteOrigin + "/og-diamond.jpg",
  author: { "@id": organizacion["@id"] },
  publisher: { "@id": organizacion["@id"] },
  about: { "@type": "Place", name: "Atizapán de Zaragoza", address: { "@type": "PostalAddress", addressLocality: "Atizapán de Zaragoza", addressRegion: "Estado de México", addressCountry: "MX" } },
  citation: Object.values(LEYES).map((l) => ({ "@type": "Legislation", name: l.nombre, url: l.url })),
};

export default function GuiaDeptoAtizapan() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(grafo(articulo, migas("Comprar un departamento en Atizapán", RUTA_GUIA_DEPTO), organizacion))} />
      <main className="document-page guia">
        <nav className="guia-migas" aria-label="Migas de pan">
          <a href="/">Inicio</a><span aria-hidden="true">/</span><span aria-current="page">Comprar un departamento en Atizapán</span>
        </nav>
        <div className="eyebrow">GUÍA PARA COMPRADORES · ESTADO DE MÉXICO</div>
        <h1>{TITULO}</h1>
        <p className="lead">Comprar un departamento en Atizapán de Zaragoza pasa por las leyes del Estado de México: el Registro que lleva el IFREM, el aviso preventivo del notario, las reglas del condominio, el impuesto sobre adquisición de inmuebles, las constancias de predial y agua, y la escritura. Esta guía explica cada paso en lenguaje llano, dice qué gastos vas a encontrar sin inventar montos y cita, debajo, el artículo de la ley que lo dice.</p>
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
            <div className="guia-citas">{p.citas.map((c) => <CitaLey key={c.ley + c.articulo + c.texto} ley={LEYES[c.ley]} c={c} />)}</div>
          </section>
        ))}

        <section id="gastos" aria-labelledby="gastos-titulo">
          <h2 id="gastos-titulo">Los gastos de la compra, sin montos</h2>
          <p>Estos son los pagos, y las cuentas que deben estar pagadas, que aparecen en los pasos anteriores. Los montos dependen de la tarifa y de los derechos vigentes, así que pídelos a tu notario.</p>
          <ul className="guia-lista">{GASTOS.map((g) => (
            <li key={g.paso + g.texto}>{g.texto} <a href={"#" + g.paso}>Ver: {TITULO_PASO[g.paso]}</a></li>
          ))}</ul>
        </section>

        <section id="lista" aria-labelledby="lista-titulo">
          <h2 id="lista-titulo">Antes de firmar, ten a la mano</h2>
          <ul className="guia-lista">{LISTA_FINAL.map((t) => <li key={t}>{t}</li>)}</ul>
        </section>

        <section id="departamento" aria-labelledby="departamento-titulo">
          <h2 id="departamento-titulo">¿Buscas un departamento en Atizapán?</h2>
          <p>Villas de la Hacienda es un departamento en venta en Atizapán de Zaragoza, sobre Boulevard S.O.P.</p>
          <p>Pide la documentación disponible y revísala con esta lista y con tu notario antes de decidir.</p>
          <a className="button gold" href="/propiedades/villas-de-la-hacienda">Ver el departamento en Villas de la Hacienda</a>
        </section>

        <section id="hidalgo" aria-labelledby="hidalgo-titulo">
          <h2 id="hidalgo-titulo">¿Y si compras en Hidalgo?</h2>
          <p>Las reglas cambian de un estado a otro: en Hidalgo, por ejemplo, el impuesto que paga quien compra tiene una tasa general en lugar de una tarifa por rangos. Para un terreno allá, consulta la <a href={RUTA_GUIA_TERRENO}>guía para comprar un terreno en Hidalgo</a>.</p>
        </section>

        <section id="fuentes" aria-labelledby="fuentes-titulo">
          <h2 id="fuentes-titulo">Fuentes</h2>
          <p>Textos descargados del acervo de legislación vigente de la Legislatura del Estado de México. Gaceta: Gaceta del Gobierno del Estado de México.</p>
          <div className="guia-tabla">
            <table>
              <thead><tr><th scope="col">Ley</th><th scope="col">Publicación</th><th scope="col">Última reforma</th></tr></thead>
              <tbody>{Object.values(LEYES).map((l) => (
                <tr key={l.codigo}><td><a href={l.url} rel="noopener">{l.nombre}</a></td><td>{l.publicacion}</td><td>{l.reforma}</td></tr>
              ))}</tbody>
            </table>
          </div>
        </section>

        <div className="document-note">Esta guía resume las leyes del Estado de México que aplican a la compra de un departamento en Atizapán, en las versiones consultadas el {CONSULTADA}. No incluye montos en pesos, porque la tarifa del impuesto, los derechos del Registro y los aranceles se actualizan, y no sustituye la revisión de un notario o de un abogado: pídele que confirme que no haya reformas posteriores y qué trámites pide el municipio.</div>

        <footer className="guia-pie">
          <a href="/">Diamond Inmobiliaria</a>
          <a href="/propiedades/villas-de-la-hacienda">Departamento en Atizapán</a>
          <a href="/propiedades/el-bindho">Terreno en Hidalgo: El Bindho</a>
          <a href={RUTA_GUIA_TERRENO}>Guía: comprar terreno en Hidalgo</a>
          <a href="/privacidad">Privacidad</a>
        </footer>
      </main>
    </>
  );
}
