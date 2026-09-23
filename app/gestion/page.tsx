import { requireChatGPTUser } from "@/app/chatgpt-auth";
import { isAdmin } from "@/lib/server";
import Dashboard from "./dashboard";
export const dynamic="force-dynamic";
export const metadata={title:"Gestión comercial | Diamond",robots:{index:false,follow:false}};
export default async function Management(){await requireChatGPTUser("/gestion");if(!await isAdmin())return <main className="document-page"><h1>Acceso de gestión restringido</h1><p>Esta cuenta no tiene autorización para consultar los interesados.</p><a className="button outline" href="/">Volver al sitio</a></main>;return <Dashboard/>;}
