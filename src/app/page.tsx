import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DirectorMessage from "@/components/DirectorMessage";
import TimelineSection from "@/components/TimelineSection";
import ActionsSection from "@/components/ActionsSection";
import StatsSection from "@/components/StatsSection";
import NewsSection from "@/components/NewsSection";
import GallerySection from "@/components/GallerySection";
import MapSection from "@/components/MapSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import SocialSection from "@/components/SocialSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

/**
 * Página principal - Portal institucional
 * Los componentes leen de la base de datos vía las APIs
 * force-dynamic asegura que siempre se cargue la última versión
 */
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function HomePage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <DirectorMessage />
      <TimelineSection />
      <ActionsSection />
      <NewsSection />
      <GallerySection />
      <MapSection />
      <TestimonialsSection />
      <SocialSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
