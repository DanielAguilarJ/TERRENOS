"use client";
import { useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";
import { properties, type PropertyId } from "@/lib/properties";
import { siteOrigin } from "@/lib/site-info";

/** Enlace absoluto con etiquetas de origen: el formulario ya guarda utm_* en cada consulta. */
function sharedUrl(path: string, source: string, campaign: string) {
  const url = new URL(path, siteOrigin);
  url.searchParams.set("utm_source", source);
  url.searchParams.set("utm_medium", "compartir");
  url.searchParams.set("utm_campaign", campaign);
  return url.toString();
}

function WhatsAppIcon() {
  return <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z"/></svg>;
}

export default function ShareBar({ property, tone = "light", label = "Comparte esta propiedad" }: { property?: PropertyId; tone?: "light" | "dark"; label?: string }) {
  const [copied, setCopied] = useState(false);
  const item = property ? properties[property] : null;
  const path = item ? item.href : "/";
  const campaign = item ? property! : "portafolio";
  const text = item ? item.share : "Te comparto las propiedades en venta de Diamond Inmobiliaria: un departamento en Villas de la Hacienda, Atizapán, y El Bindho, 7.6 hectáreas en San Agustín Tlaxiaca, Hidalgo. Aquí están las ubicaciones y las fichas:";
  const whatsapp = "https://wa.me/?text=" + encodeURIComponent(text + " " + sharedUrl(path, "whatsapp", campaign));
  async function copy() {
    try {
      await navigator.clipboard.writeText(sharedUrl(path, "enlace", campaign));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      window.prompt("Copia este enlace:", sharedUrl(path, "enlace", campaign));
    }
  }
  async function nativeShare() {
    const url = sharedUrl(path, "compartir-nativo", campaign);
    if (navigator.share) {
      try { await navigator.share({ title: item ? item.name + " · Diamond Inmobiliaria" : "Diamond Inmobiliaria", text, url }); } catch { /* el usuario cerró el menú */ }
    } else {
      await copy();
    }
  }
  return <div className={"share-bar share-bar-" + tone} role="group" aria-label={label}>
    <span className="share-bar-label">{label}</span>
    <a className="share-bar-whatsapp" href={whatsapp} target="_blank" rel="noreferrer"><WhatsAppIcon/> WhatsApp</a>
    <button type="button" onClick={copy} aria-live="polite">{copied ? <><Check size={17}/> Enlace copiado</> : <><Link2 size={17}/> Copiar enlace</>}</button>
    <button type="button" className="share-bar-native" onClick={nativeShare}><Share2 size={17}/> Más opciones</button>
  </div>;
}
