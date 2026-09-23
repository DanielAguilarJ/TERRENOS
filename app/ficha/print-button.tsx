"use client";
import { Download } from "lucide-react";
export default function PrintButton(){return <button className="button gold" onClick={()=>window.print()}><Download size={17}/> Imprimir o guardar PDF</button>;}
