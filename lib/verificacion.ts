import type { Metadata } from "next";

/**
 * Metas de verificación de Google Search Console y Bing Webmaster Tools. Los tokens llegan por variables de entorno
 * del servidor (GOOGLE_SITE_VERIFICATION, BING_SITE_VERIFICATION) para que dar de alta el sitio no pida tocar el
 * código: se pegan en el proveedor y se vuelve a desplegar. Se acepta el token solo o la etiqueta completa que copian
 * las dos consolas (`<meta name="..." content="TOKEN" />`). Lo que no sea un token válido se descarta con un aviso
 * en el registro del servidor: una meta vacía o malformada no verifica nada y deja basura en el <head>.
 */
const TOKEN = /^[A-Za-z0-9_-]{8,128}$/;

function token(nombre: string, valor: string | undefined): string | undefined {
  const crudo = (valor ?? "").trim();
  if (!crudo) return undefined;
  const limpio = crudo.match(/content\s*=\s*["']([^"']+)["']/i)?.[1]?.trim() ?? crudo;
  if (TOKEN.test(limpio)) return limpio;
  console.warn(`${nombre} no es un token de verificación válido (letras, números, «-» o «_»); no se publica la meta.`);
  return undefined;
}

export function verificacionBuscadores(google?: string, bing?: string): Metadata["verification"] {
  const g = token("GOOGLE_SITE_VERIFICATION", google);
  const b = token("BING_SITE_VERIFICATION", bing);
  if (!g && !b) return undefined;
  return { ...(g ? { google: g } : {}), ...(b ? { other: { "msvalidate.01": b } } : {}) };
}
