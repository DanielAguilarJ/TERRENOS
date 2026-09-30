import type { Metadata } from "next";
import { siteOrigin } from "@/lib/site-info";
import "./diamond.css";
import "./fonts.css";
import "./estate.css";
import "./agency.css";
import "./showcase.css";

export const metadata: Metadata = {
  title: "Diamond Inmobiliaria | Asset Management Diamond",
  description: "Propiedades en Hidalgo y Estado de México. Conoce el portafolio de Diamond y solicita información de cada inmueble.",
  metadataBase: new URL(siteOrigin),
  openGraph: { title: "Diamond Inmobiliaria", description: "Terrenos y departamentos. Información clara para tu próxima decisión inmobiliaria.", type: "website", locale: "es_MX", siteName: "Diamond Inmobiliaria", images: [{ url: "/og-diamond.jpg", width: 1200, height: 630, alt: "Diamond Inmobiliaria: dos propiedades en venta" }] },
  twitter: { card: "summary_large_image", images: ["/og-diamond.jpg"] },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX">
      <body className="antialiased">{children}</body>
    </html>
  );
}
