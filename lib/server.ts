import { env } from "cloudflare:workers";
import { getChatGPTUser } from "@/app/chatgpt-auth";
import { waNumber } from "@/lib/whatsapp";
export function database() { if (!env.DB) throw new Error("Storage unavailable"); return env.DB; }
export async function isAdmin() { const user=await getChatGPTUser(); const emails=(env.ADMIN_EMAILS||"").split(",").map(x=>x.trim().toLowerCase()).filter(Boolean); return !!user && emails.includes(user.email.toLowerCase()); }
export function sameOrigin(request:Request) { const origin=request.headers.get("origin");return !!origin && origin===new URL(request.url).origin; }
export function json(data:unknown,status=200) { return Response.json(data,{status,headers:{"Cache-Control":"no-store","X-Content-Type-Options":"nosniff"}}); }
/** Datos públicos del sitio. El WhatsApp guardado en el panel manda; si falta, o si no hay base de datos (Vercel),
 *  se usa WHATSAPP_NUMBER del entorno. Sin número en ninguno de los dos, se comporta igual que antes. */
export async function publicSettings() {
 const fallback=waNumber(env.WHATSAPP_NUMBER);
 if(env.WHATSAPP_NUMBER&&!fallback)console.warn("WHATSAPP_NUMBER no es un número de WhatsApp válido (lada de país y número); los botones de WhatsApp no se muestran.");
 let saved:Record<string,string>;
 try{const rows=await database().prepare("SELECT key,value FROM settings").all<{key:string;value:string}>();saved=Object.fromEntries(rows.results.map(r=>[r.key,r.value]));}
 catch(e){if(!fallback)throw e;saved={};}
 return saved.whatsapp||!fallback?saved:{...saved,whatsapp:fallback};
}
