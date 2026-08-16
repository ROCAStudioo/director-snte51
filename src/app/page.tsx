import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DirectorMessage from "@/components/DirectorMessage";
import TimelineSection from "@/components/TimelineSection";
import ActionsSection from "@/components/ActionsSection";
import StatsSection from "@/components/StatsSection";
import NewsSection from "@/components/NewsSection";
import GallerySection from "@/components/GallerySection";
import MapSection from "@/components/MapSection";
import TransparencySection from "@/components/TransparencySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import SocialSection from "@/components/SocialSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

/**
 * Página principal - Portal institucional del Director General
 * Fondo de Ahorro para las y los Trabajadores de la Educación
 * SNTE Sección 51 · Puebla
 */
export default function HomePage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Navegación fija */}
      <Navbar />

      {/* Hero principal */}
      <HeroSection />

      {/* Mensaje del Director */}
      <DirectorMessage />

      {/* Trayectoria - Timeline */}
      <TimelineSection />

      {/* Acciones recientes */}
      <ActionsSection />

      {/* Contadores animados */}
      <StatsSection />

      {/* Noticias */}
      <NewsSection />

      {/* Galería */}
      <GallerySection />

      {/* Mapa de cobertura */}
      <MapSection />

      {/* Testimonios */}
      <TestimonialsSection />

      {/* Redes sociales */}
      <SocialSection />

      {/* Contacto */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
