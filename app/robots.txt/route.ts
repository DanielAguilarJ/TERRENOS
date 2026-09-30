import { siteOrigin } from "@/lib/site-info";
// /privacidad NO se bloquea aquí: lleva `noindex` y Google solo lo respeta si puede leer la página.
export function GET(){return new Response("User-agent: *\nAllow: /\nDisallow: /gestion\nDisallow: /api/\nSitemap: "+siteOrigin+"/sitemap.xml\n",{headers:{"Content-Type":"text/plain; charset=utf-8","Cache-Control":"public, max-age=3600"}});}
