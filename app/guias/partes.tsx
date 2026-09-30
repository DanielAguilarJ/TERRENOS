/** Piezas comunes de las guías para compradores. */

type LeyCitada = { nombre: string; url: string };
type CitaGuia = { articulo: string; texto: string };

/** Un fragmento que no empieza la oración se muestra con «…» delante, para que no parezca el artículo entero. */
export function fragmento(texto: string) {
  return /^[a-záéíóúñ]/.test(texto) ? "…" + texto : texto;
}

export function CitaLey({ ley, c }: { ley: LeyCitada; c: CitaGuia }) {
  return (
    <blockquote cite={ley.url}>
      <p>«{fragmento(c.texto)}»</p>
      <p className="guia-fuente"><cite>{ley.nombre}</cite>, art. {c.articulo}</p>
    </blockquote>
  );
}
