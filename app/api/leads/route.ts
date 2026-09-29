import { z } from "zod";
import { database, isAdmin, sameOrigin, json } from "@/lib/server";
import { env } from "cloudflare:workers";
const schema=z.object({id:z.string().uuid(),propertyId:z.enum(["el-bindho","villas-de-la-hacienda"]).default("el-bindho"),name:z.string().trim().min(2).max(120),email:z.string().trim().email().max(200),phone:z.string().trim().max(35),company:z.string().trim().max(160),modality:z.enum(["A","B","C","orientacion","contado","credito"]),budget:z.enum(["menos-10","10-30","30-50","mas-50","por-definir","menos-1","1-2","2-3","3-5","mas-5"]),timeline:z.enum(["0-3","3-6","6-12","explorando"]),intent:z.enum(["informacion","visita","documentacion","propuesta"]),message:z.string().trim().max(2000),consent:z.literal(true),website:z.string().max(300).optional(),source:z.string().max(200).optional()});
export async function POST(request:Request){
 if(!sameOrigin(request))return json({error:"Solicitud no permitida."},403);
 if(Number(request.headers.get("content-length")||0)>16000)return json({error:"Solicitud demasiado extensa."},413);
 try{
  const raw=await request.text();if(raw.length>16000)return json({error:"Solicitud demasiado extensa."},413);
  let decoded:unknown;try{decoded=JSON.parse(raw);}catch{return json({error:"Formato no válido."},400);}
  const parsed=schema.safeParse(decoded);if(!parsed.success)return json({error:"Revisa los campos y acepta el uso de tus datos para atender esta consulta."},400);
  const d=parsed.data;
  const apartment=d.propertyId==="villas-de-la-hacienda";
  const allowedModes=apartment?["orientacion","contado","credito"]:["orientacion","A","B","C"];
  const allowedBudgets=apartment?["por-definir","menos-1","1-2","2-3","3-5","mas-5"]:["por-definir","menos-10","10-30","30-50","mas-50"];
  if(!allowedModes.includes(d.modality)||!allowedBudgets.includes(d.budget))return json({error:"Revisa la modalidad y presupuesto para esta propiedad."},400);
  if(d.website)return json({error:"No se pudo validar la solicitud. Recarga la página."},400);
  const db=database();
  const existing=await db.prepare("SELECT id,property_id FROM leads WHERE id = ?").bind(d.id).first<{id:string;property_id:string}>();if(existing&&existing.property_id!==d.propertyId)return json({error:"Esta referencia pertenece a otra propiedad. Recarga el formulario."},409);if(existing)return json({id:d.id,reference:"DB-"+d.id.slice(0,8).toUpperCase()});
  const ip=request.headers.get("cf-connecting-ip")||"local"; const window=Math.floor(Date.now()/600000);
  const digest=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(ip+":"+window));const key=Array.from(new Uint8Array(digest)).map(v=>v.toString(16).padStart(2,"0")).join("");
  const limit=await db.prepare("INSERT INTO rate_limits (key,count,expires_at) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count").bind(key,Date.now()+600000).first<{count:number}>();
  if((limit?.count||0)>6)return json({error:"Has enviado varias solicitudes. Inténtalo de nuevo en 10 minutos."},429);
  await db.prepare("DELETE FROM rate_limits WHERE expires_at < ?").bind(Date.now()).run();
  const score=20+(apartment?(d.budget!=="por-definir"?20:0):(d.budget==="30-50"||d.budget==="mas-50"?30:0))+(d.timeline==="0-3"?25:d.timeline==="3-6"?15:0)+(d.intent==="propuesta"?15:d.intent==="visita"?10:0)+(d.company?5:0)+(d.phone?5:0);
  const now=new Date();const due=new Date(now.getTime()+(score>=65?24:48)*3600000).toISOString();
  await db.prepare("INSERT INTO leads (id,property_id,name,email,phone,company,modality,budget,timeline,intent,message,status,score,source,consent_version,created_at,followup_at,notification) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)").bind(d.id,d.propertyId,d.name,d.email.toLowerCase(),d.phone,d.company,d.modality,d.budget,d.timeline,d.intent,d.message,"nuevo",score,d.source||"directo","2026-09-28",now.toISOString(),due,"no_configurada").run();
  // Integración opcional. Ningún contacto sale del sitio sin configurar un destino.
  if(env.LEAD_WEBHOOK_URL && env.LEAD_WEBHOOK_SECRET){
   let status="fallida";
   try {const payload=JSON.stringify({event:"lead.created",id:d.id,propertyId:d.propertyId,name:d.name,email:d.email,phone:d.phone,company:d.company,modality:d.modality,budget:d.budget,timeline:d.timeline,intent:d.intent,message:d.message,score,followupAt:due});
    const hmac=await crypto.subtle.importKey("raw",new TextEncoder().encode(env.LEAD_WEBHOOK_SECRET),{name:"HMAC",hash:"SHA-256"},false,["sign"]);
    const signature=Array.from(new Uint8Array(await crypto.subtle.sign("HMAC",hmac,new TextEncoder().encode(payload)))).map(v=>v.toString(16).padStart(2,"0")).join("");
    const url=new URL(env.LEAD_WEBHOOK_URL);if(url.protocol!=="https:")throw new Error("HTTPS required");
    const r=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json","X-Diamond-Signature":signature,"Idempotency-Key":d.id},body:payload,signal:AbortSignal.timeout(4000),redirect:"error"});if(r.ok)status="entregada";
   } catch { console.error("Lead webhook delivery failed"); }
   await db.prepare("UPDATE leads SET notification=? WHERE id=?").bind(status,d.id).run();
  }
  return json({id:d.id,reference:"DB-"+d.id.slice(0,8).toUpperCase()},201);
 } catch(e){console.error("Lead capture failed",e instanceof Error?e.message:"Unknown error");return json({error:"No pudimos guardar la solicitud. Tus datos siguen en el formulario. Inténtalo de nuevo."},503);}
}
export async function GET(){if(!await isAdmin())return json({error:"Acceso restringido."},403);try{const result=await database().prepare("SELECT * FROM leads ORDER BY created_at DESC LIMIT 1000").all();return json({leads:result.results});}catch{return json({error:"No se pudieron cargar las consultas."},503);}}
export async function PATCH(request:Request){if(!sameOrigin(request)||!await isAdmin())return json({error:"Acceso restringido."},403);try{const p=z.object({id:z.string().uuid(),status:z.enum(["nuevo","contactado","documentacion","visita","propuesta","cerrado","descartado"])}).safeParse(await request.json());if(!p.success)return json({error:"Estado no válido."},400);const r=await database().prepare("UPDATE leads SET status=? WHERE id=?").bind(p.data.status,p.data.id).run();return r.meta.changes?json({ok:true}):json({error:"Consulta no encontrada."},404);}catch{return json({error:"No se pudo guardar el estado."},503);}}
