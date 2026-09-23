import { env } from "cloudflare:workers";
import { getChatGPTUser } from "@/app/chatgpt-auth";
export function database() { if (!env.DB) throw new Error("Storage unavailable"); return env.DB; }
export async function isAdmin() { const user=await getChatGPTUser(); const emails=(env.ADMIN_EMAILS||"").split(",").map(x=>x.trim().toLowerCase()).filter(Boolean); return !!user && emails.includes(user.email.toLowerCase()); }
export function sameOrigin(request:Request) { const origin=request.headers.get("origin");return !!origin && origin===new URL(request.url).origin; }
export function json(data:unknown,status=200) { return Response.json(data,{status,headers:{"Cache-Control":"no-store","X-Content-Type-Options":"nosniff"}}); }
export async function publicSettings() {const rows=await database().prepare("SELECT key,value FROM settings").all<{key:string;value:string}>();return Object.fromEntries(rows.results.map(r=>[r.key,r.value]));}
