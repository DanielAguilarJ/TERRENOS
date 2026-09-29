"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { properties, type PropertyId } from "@/lib/properties";

let cached: Promise<Record<string, string>> | null = null;
function publicSettings() {
  cached ??= fetch("/api/settings").then(r => (r.ok ? r.json() as Promise<Record<string, string>> : {})).catch(() => ({}));
  return cached;
}

/** «Escríbenos por WhatsApp» con el mensaje ya escrito. Si el panel no tiene número, no se pinta nada. */
export default function WhatsAppContact({ property, className = "agency-action" }: { property?: PropertyId; className?: string }) {
  const [phone, setPhone] = useState("");
  useEffect(() => { let alive = true; publicSettings().then(s => { if (alive) setPhone((s.whatsapp || "").replace(/\D/g, "")); }); return () => { alive = false; }; }, []);
  if (!phone) return null;
  const about = property ? properties[property].type.toLowerCase() + " " + properties[property].name : "sus propiedades";
  const text = "Hola, vi en el sitio de Diamond " + (property ? "el " + about : about) + " y me gustaría recibir información.";
  return <a className={className} href={"https://wa.me/" + phone + "?text=" + encodeURIComponent(text)} target="_blank" rel="noreferrer">Escríbenos por WhatsApp <ArrowUpRight size={18}/></a>;
}
