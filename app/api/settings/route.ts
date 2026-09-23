import { z } from "zod";
import { database, isAdmin, sameOrigin, json, publicSettings } from "@/lib/server";
export async function GET(){try{return json(await publicSettings());}catch{return json({});}}
export async function PUT(request:Request){
 if(!sameOrigin(request)||!await isAdmin())return json({error:"Acceso restringido."},403);
 try{const s=z.object({email:z.union([z.string().email().max(200),z.literal("")]),whatsapp:z.string().regex(/^\d{7,15}$|^$/),bookingUrl:z.union([z.string().url().max(500).refine(v=>v.startsWith("https://")),z.literal("")]),legalName:z.string().trim().max(200),address:z.string().trim().max(400)}).safeParse(await request.json());if(!s.success)return json({error:"Revisa el correo, teléfono y enlace de agenda (HTTPS)."},400);const db=database();await db.batch(Object.entries(s.data).map(([key,value])=>db.prepare("INSERT INTO settings (key,value) VALUES (?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value").bind(key,value)));return json({ok:true});}catch{return json({error:"No se pudo guardar la configuración."},503);}
}
