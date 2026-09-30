#!/usr/bin/env node
/**
 * Aviso a buscadores por IndexNow (lo usan Bing y otros buscadores participantes; Google NO). Toma las URL del
 * sitemap PUBLICADO y comprueba antes que la llave esté publicada. Por defecto es un ENSAYO: muestra lo que
 * enviaría y no manda nada. Solo envía con --enviar.
 *
 *   node scripts/indexnow.mjs                                   # ensayo contra el sitio publicado
 *   node scripts/indexnow.mjs --leer-de http://127.0.0.1:4317   # ensayo contra un servidor local
 *   node scripts/indexnow.mjs --enviar                          # envío real, una vez por cambio de contenido
 *
 * La llave es el único public/<llave>.txt cuyo contenido es su propio nombre (opción 1 del protocolo,
 * https://www.indexnow.org/documentation). No es secreta: el archivo es público por diseño y solo permite pedir que
 * se vuelvan a rastrear URL de este mismo sitio. Para rotarla se sustituye ese archivo por otro.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = fileURLToPath(new URL("..", import.meta.url));
const ENDPOINT = "https://api.indexnow.org/indexnow";
const LLAVE = /^[A-Za-z0-9-]{8,128}$/;
const RESPUESTAS = {
  200: "recibido",
  202: "recibido; la llave está pendiente de validación",
  400: "formato inválido",
  403: "llave no válida: el buscador no encontró el archivo o su contenido no coincide",
  422: "alguna URL no es de este sitio o la llave no cumple el formato",
  429: "demasiadas solicitudes: esperar antes de reintentar",
};

class Parada extends Error {}

function origenPublico() {
  const fuente = readFileSync(path.join(RAIZ, "lib/site-info.ts"), "utf8");
  const m = fuente.match(/siteOrigin\s*=\s*"(https:\/\/[^"/]+)"/);
  if (!m) throw new Parada("no encontré siteOrigin en lib/site-info.ts");
  return m[1];
}

function llavePublicada() {
  const dir = path.join(RAIZ, "public");
  const llaves = readdirSync(dir)
    .filter((f) => f.endsWith(".txt") && LLAVE.test(f.slice(0, -4)))
    .map((f) => f.slice(0, -4))
    .filter((n) => readFileSync(path.join(dir, `${n}.txt`), "utf8").trim() === n);
  if (llaves.length !== 1) throw new Parada(`se esperaba exactamente una llave en public/ y hay ${llaves.length}`);
  return llaves[0];
}

async function leer(url) {
  try {
    const r = await fetch(url, { redirect: "error" });
    return { estado: r.status, texto: await r.text() };
  } catch (e) {
    throw new Parada(`no pude leer ${url}: ${e.cause?.code ?? e.message}`);
  }
}

function argumentos(argv) {
  const i = argv.indexOf("--leer-de");
  const leerDe = i >= 0 ? argv[i + 1] : undefined;
  if (i >= 0 && !/^https?:\/\/[^/]+$/.test(leerDe ?? "")) throw new Parada("--leer-de espera un origen sin ruta, p. ej. http://127.0.0.1:4317");
  const enviar = argv.includes("--enviar");
  if (enviar && leerDe) throw new Parada("--enviar no se combina con --leer-de: solo se avisa de lo que está publicado");
  return { leerDe, enviar };
}

async function main() {
  const { leerDe, enviar } = argumentos(process.argv.slice(2));
  const origen = origenPublico();
  const lectura = leerDe ?? origen;
  const llave = llavePublicada();

  const archivo = await leer(`${lectura}/${llave}.txt`);
  if (archivo.estado !== 200 || archivo.texto.trim() !== llave) {
    throw new Parada(`la llave no está publicada en ${lectura}/${llave}.txt (estado ${archivo.estado}): fusiona y despliega antes de enviar`);
  }
  const sitemap = await leer(`${lectura}/sitemap.xml`);
  if (sitemap.estado !== 200) throw new Parada(`${lectura}/sitemap.xml respondió ${sitemap.estado}`);
  const urls = [...sitemap.texto.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
  const ajenas = urls.filter((u) => u !== origen && !u.startsWith(`${origen}/`));
  if (!urls.length || ajenas.length) throw new Parada(`el sitemap no sirve para avisar: ${urls.length} URL, ajenas a ${origen}: ${ajenas.join(", ")}`);

  const envio = { host: new URL(origen).host, key: llave, keyLocation: `${origen}/${llave}.txt`, urlList: urls };
  console.log(JSON.stringify(envio, null, 2));
  if (!enviar) {
    console.log(`ENSAYO: ${urls.length} URL listas y llave publicada; no se envió nada. Para enviar: node scripts/indexnow.mjs --enviar`);
    return 0;
  }
  const r = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json; charset=utf-8" }, body: JSON.stringify(envio) });
  console.log(`IndexNow respondió ${r.status}: ${RESPUESTAS[r.status] ?? "respuesta no documentada"}`);
  return r.status === 200 || r.status === 202 ? 0 : 1;
}

main().then(
  (codigo) => process.exit(codigo),
  (e) => {
    console.error(e instanceof Parada ? `PARADA: ${e.message}` : e);
    process.exit(e instanceof Parada ? 2 : 1);
  },
);
