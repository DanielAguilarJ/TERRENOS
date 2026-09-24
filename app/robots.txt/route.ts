import { siteOrigin } from "@/lib/site-info";
export function GET(){return new Response("User-agent: *\nAllow: /\nDisallow: /gestion\nDisallow: /api/\nDisallow: /privacidad\nSitemap: "+siteOrigin+"/sitemap.xml\n",{headers:{"Content-Type":"text/plain; charset=utf-8","Cache-Control":"public, max-age=3600"}});}
