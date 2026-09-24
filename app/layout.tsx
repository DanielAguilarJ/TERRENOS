import type { Metadata } from "next";
import "./diamond.css";
import "./fonts.css";
import "./estate.css";

export const metadata: Metadata = {
  title: "El Bindho · 7.6 ha en Hidalgo | Asset Management Diamond",
  description: "Conoce El Bindho: 76,000 m² ofertados en San Agustín Tlaxiaca, Hidalgo. Compra directa, fideicomiso y coinversión.",
  metadataBase: new URL("https://diamond-el-bindho.oportunidades70814.chatgpt.site"),
  openGraph: { title: "El Bindho | Asset Management Diamond", description: "76,000 m² ofertados en Hidalgo. Conoce el activo y explora tres modalidades de operación.", type: "website", locale: "es_MX" },
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
