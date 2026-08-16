import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mtro. Omar Castañeda Ramiro | Director General Fondo de Ahorro SNTE Sección 51",
  description: "Página oficial del Director General del Fondo de Ahorro para las y los Trabajadores de la Educación de la Sección 51 del SNTE.",
  keywords: ["Fondo de Ahorro", "SNTE Sección 51", "Puebla", "Director General", "Omar Castañeda", "Magisterio Poblano"],
  authors: [{ name: "Fondo de Ahorro SNTE Sección 51" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "Fondo de Ahorro SNTE Sección 51",
    title: "Mtro. Omar Castañeda Ramiro | Director General",
    description: "Trabajando con responsabilidad, cercanía y compromiso para fortalecer el patrimonio del magisterio poblano.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" style={{ overflowX: 'hidden' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased w-full">{children}</body>
    </html>
  );
}
