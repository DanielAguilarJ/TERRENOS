"use client";

import { ArrowDown, ArrowUpRight, ArrowRight, Diamond, Menu, X, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShareBar from "./share-bar";
import { TechnicalDetails, LocationSection, Calculator, ProcessSection, FAQ, ContactSection, PropertyAssistant } from "./property-details";

export default function PropertySite() {
  const [menu, setMenu] = useState(false);
  const [deal, setDeal] = useState("A");
  const [contactInView, setContactInView] = useState(false);
  const [request, setRequest] = useState({ intent: "informacion", modality: "orientacion", placement: "formulario" });
  useEffect(() => {
    const contact = document.getElementById("contacto");
    if (!contact) return;
    const observer = new IntersectionObserver(([entry]) => setContactInView(entry.isIntersecting), { rootMargin: "0px 0px -80px 0px" });
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);
  function inquire(intent: string, placement: string, modality = "orientacion") {
    setRequest({ intent, modality, placement });
    setMenu(false);
  }
  return <div className={contactInView ? "property-site contact-in-view" : "property-site"}>
    <a className="skip-link" href="#main">Ir al contenido</a>
    <header className="site-header">
      <a className="brand" href="/" aria-label="Diamond Asset Management, inicio"><Diamond aria-hidden="true"/><span>DIAMOND<small>ASSET MANAGEMENT</small></span></a>
      <nav className={menu ? "navigation open" : "navigation"} aria-label="Principal">
        <a href="/#propiedades">Propiedades</a><a onClick={() => setMenu(false)} href="#terreno">El terreno</a>
        <a onClick={() => setMenu(false)} href="#ubicacion">El entorno</a>
        <a onClick={() => setMenu(false)} href="#modalidades">La operación</a>
        <a onClick={() => inquire("informacion", "menu")} href="#solicitud">Contacto</a>
      </nav>
      <a className="header-cta" href="#solicitud" onClick={() => inquire("informacion", "cabecera")}>Solicitar información <ArrowUpRight size={17}/></a>
      <button className="menu-button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label={menu ? "Cerrar menú" : "Abrir menú"}>{menu ? <X/> : <Menu/>}</button>
    </header>
    <main id="main">
      <section className="estate-hero" aria-labelledby="property-title">
        <img className="estate-landscape" src="/hidalgo-landscape.webp" width={2000} height={1334} alt="Paisaje de Mineral del Chico, Hidalgo, en la región de El Bindho." fetchPriority="high"/>
        <div className="estate-shade" aria-hidden="true"/>
        <div className="hero-topline"><span>TIERRA · PATRIMONIO · HIDALGO</span><span>PAISAJE DE LA REGIÓN</span></div>
        <div className="estate-title">
          <div className="estate-location"><MapPin size={16}/> San Agustín Tlaxiaca, Hidalgo</div>
          <h1 id="property-title">El Bindho<span className="sr-only">: terreno en venta de 76,000 m² en Hidalgo</span></h1>
          <p>7.6 hectáreas en el corredor<br/>Pachuca Poniente.</p>
          <a className="estate-explore" href="#terreno">Conocer la propiedad <ArrowDown size={18}/></a>
        </div>
        <div className="estate-offer">
          <span className="offer-label">TERRENO EN VENTA · PRECIO BASE</span>
          <div className="price-per-meter">$399 <span>MXN / m²</span></div>
          <p>Total: $30,324,000 MXN</p>
          <a className="button gold" href="#solicitud" onClick={() => inquire("visita", "portada-visita")}>Solicitar una visita <ArrowUpRight size={19}/></a>
          <a className="offer-secondary" href="#solicitud" onClick={() => inquire("informacion", "portada-informacion")}>Prefiero recibir información <ArrowRight size={15}/></a>
          <small>Precio sin gastos ni impuestos. Visita sujeta a coordinación.</small>
        </div>
      </section>
      <div className="landscape-credit"><span>Mineral del Chico, Hidalgo · paisaje de la región.</span><span><a href="https://commons.wikimedia.org/wiki/File:Parque_nacional_El_Chico_(Mineral_del_chico_valley).jpg" target="_blank" rel="noreferrer">Rafael Saldaña</a> · <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank" rel="noreferrer">CC BY 2.0</a> · Encuadre adaptado</span></div>
      <div className="facts-bar">
        <div><span>SUPERFICIE OFERTADA</span><strong>76,000 <small>m²</small></strong></div>
        <div><span>UBICACIÓN</span><strong>Hidalgo <small>/ México</small></strong></div>
        <div><span>RÉGIMEN SEGÚN DOSSIER</span><strong>Propiedad privada</strong></div>
        <a href="/ficha">Consultar ficha<br/>sin registro <ArrowUpRight size={21}/></a>
      </div>
      <div className="estate-share"><ShareBar property="el-bindho" label="Comparte este terreno"/></div>
      <section id="terreno" className="section intro">
        <div className="intro-heading"><div className="eyebrow">01 — LA PROPIEDAD</div><h2>76,000 m².<br/>Una sola reserva<br/><em>territorial.</em></h2></div>
        <div className="intro-description"><p className="lead">El Bindho, San Agustín Tlaxiaca.<br/>Suelo para evaluar un proyecto de otra escala.</p><p>Una superficie neta de 7.6 hectáreas en el corredor San Agustín Tlaxiaca – Pachuca Poniente. Se propone su adquisición completa o una asociación con la propiedad para desarrollar un proyecto.</p><p>Consulta las características del activo, el esquema de operación y la documentación necesaria para tomar una decisión.</p><div className="intro-links"><a className="text-link" href="/ficha">Leer la ficha del terreno <ArrowUpRight size={18}/></a><a className="text-link" href="#solicitud" onClick={() => inquire("documentacion", "ficha-documentacion")}>Solicitar documentación <ArrowUpRight size={18}/></a></div></div>
      </section>
      <TechnicalDetails/>
      <LocationSection/>
      <section id="modalidades" className="section structures">
        <div className="section-top"><div className="eyebrow">02 — LA OPERACIÓN</div><span>VENTA DIRECTA / ASOCIACIÓN</span></div>
        <h2>Tres formas de<br/><em>hacerlo posible.</em></h2>
        <Tabs defaultValue="A" onValueChange={setDeal}>
          <TabsList className="deal-tabs"><TabsTrigger value="A">01 · Compra directa</TabsTrigger><TabsTrigger value="B">02 · Fideicomiso</TabsTrigger><TabsTrigger value="C">03 · Coinversión</TabsTrigger></TabsList>
          <TabsContent value="A"><div className="deal-panel"><div><span className="deal-kicker">ADQUISICIÓN DE LA SUPERFICIE OFERTADA</span><h3>El terreno para<br/>tu próximo proyecto.</h3><p>Compra de los 76,000 m² netos bajo modalidad “as-is / ad corpus”. El memorándum contempla anticipo contra promesa y liquidación contra emisión del folio individualizado.</p><p className="caption">Las gestiones del nuevo folio corresponden al adquirente, según el dossier. Condiciones sujetas a revisión y contrato.</p></div><div className="deal-price"><span>PRECIO BASE TOTAL</span><strong>$30,324,000</strong><span>MXN · 76,000 m² × $399 MXN/m²</span><small>No incluye impuestos, gastos notariales, trámites ni urbanización.</small></div></div></TabsContent>
          <TabsContent value="B"><div className="deal-panel"><div><span className="deal-kicker">APORTACIÓN DEL ACTIVO</span><h3>Terreno y capital.<br/>Un proyecto compartido.</h3><p>La propiedad aporta el terreno a un fideicomiso y el socio operador aporta el capital del proyecto. El dossier plantea anticipo a capital y participación del propietario sobre ventas brutas.</p></div><div className="deal-price"><span>PARTICIPACIÓN PLANTEADA DEL PROPIETARIO</span><strong>12–15%</strong><span>Sobre ventas brutas · Sujeto a negociación</span><small>No es una rentabilidad garantizada para el inversionista.</small></div></div></TabsContent>
          <TabsContent value="C"><div className="deal-panel"><div><span className="deal-kicker">PROPUESTA DE MACROLOTIFICACIÓN</span><h3>Una escala distinta<br/>de colaboración.</h3><p>Esquema propuesto de subdivisión y urbanización de macrolotes, con fondeo del socio operador y distribución de utilidades sobre ventas.</p></div><div className="deal-price"><span>ESCALA CONCEPTUAL POR MACROLOTE</span><strong>~1 ha</strong><span>Según propuesta del dossier</span><small>Subdivisión, uso y urbanización sujetos a autorizaciones y factibilidad. No son lotes individuales aprobados a la venta.</small></div></div></TabsContent>
        </Tabs>
        <a className="button gold deal-inquire" href="#solicitud" onClick={() => inquire("informacion", "modalidad-" + deal, deal)}>Consultar esta modalidad <ArrowUpRight size={18}/></a>
        <Calculator/>
      </section>
      <ProcessSection/>
      <FAQ/>
      <ContactSection request={request}/>
    </main>
    <footer><div className="footer-top"><a className="brand" href="/"><Diamond/><span>DIAMOND<small>ASSET MANAGEMENT</small></span></a><p>El Bindho, Hidalgo.<br/>Gestión de activos · Región Centro.</p><div className="footer-links"><a href="/ficha">Ficha del activo</a><a href="/privacidad">Privacidad</a><a href="/gestion">Acceso de gestión</a></div></div><div className="footer-wordmark" aria-hidden="true">Tierra. Patrimonio.</div><small>Información comercial basada en el memorándum aportado. Sujeta a validación documental, disponibilidad y acuerdo entre las partes.</small></footer>
    <PropertyAssistant/>
    <div className="mobile-contact"><span>$399 <small>MXN/m²</small></span><a href="#solicitud" onClick={() => inquire("informacion", "movil-fijo")}>Solicitar información <ArrowUpRight size={17}/></a></div>
  </div>;
}
