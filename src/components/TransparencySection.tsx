'use client';

import { useRef, useEffect, useState } from 'react';
import { Shield, Download, FileText, BarChart3, FileCheck, BookOpen, AlertCircle } from 'lucide-react';
import { transparencyDocs } from '@/data/site-data';
import type { TransparencyDoc } from '@/types';

const typeConfig: Record<TransparencyDoc['type'], { icon: React.ComponentType<{size?: number; className?: string}>; label: string; color: string }> = {
  report: { icon: BarChart3, label: 'Informe', color: 'bg-blue-50 text-blue-600 border-blue-200' },
  announcement: { icon: AlertCircle, label: 'Convocatoria', color: 'bg-green-50 text-green-600 border-green-200' },
  regulation: { icon: BookOpen, label: 'Reglamento', color: 'bg-purple-50 text-purple-600 border-purple-200' },
  financial: { icon: BarChart3, label: 'Estado Financiero', color: 'bg-orange-50 text-orange-600 border-orange-200' },
  official: { icon: FileCheck, label: 'Documento Oficial', color: 'bg-gray-50 text-gray-600 border-gray-200' },
};

export default function TransparencySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="transparencia" ref={sectionRef} className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-4 py-2 mb-4">
            <Shield size={14} className="text-orange-500"/>
            <span className="text-orange-600 text-xs font-semibold uppercase tracking-wider">Transparencia y Rendición de Cuentas</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900">Gestión <span className="gradient-text">Transparente</span></h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Acceso libre a la información institucional del Fondo de Ahorro para las y los Trabajadores de la Educación
          </p>
          <div className="w-16 h-1 gradient-orange rounded-full mx-auto mt-4"/>
        </div>

        {/* Trust banner */}
        <div className={`bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl p-6 mb-10 text-white transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Shield size={28} className="text-white"/>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-xl">Compromiso con la Transparencia</h3>
              <p className="text-orange-100 text-sm mt-1">
                El Fondo de Ahorro de la Sección 51 publica periódicamente sus informes, estados financieros y documentos institucionales para garantizar la confianza del magisterio poblano.
              </p>
            </div>
          </div>
        </div>

        {/* Documents grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {transparencyDocs.map((doc, index) => {
            const config = typeConfig[doc.type];
            const IconComponent = config.icon;

            return (
              <div
                key={doc.id}
                className="group bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100 hover:border-orange-200"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl gradient-orange flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md">
                    <IconComponent size={22} className="text-white"/>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium border mb-2 ${config.color}`}>
                      {config.label}
                    </span>
                    <h3 className="font-bold text-gray-800 text-sm leading-snug mb-1 group-hover:text-orange-600 transition-colors">
                      {doc.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>{doc.date}</span>
                      <span>·</span>
                      <span>{doc.size}</span>
                    </div>
                  </div>
                </div>

                {/* Download button */}
                <button className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-xl text-sm font-medium text-gray-600 hover:text-orange-600 transition-all duration-200 group/btn">
                  <Download size={14} className="group-hover/btn:translate-y-0.5 transition-transform"/>
                  <span>Descargar documento</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* All documents CTA */}
        <div className={`text-center mt-10 transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-gray-500 text-sm mb-4">¿Necesitas un documento específico?</p>
          <button className="inline-flex items-center gap-2 px-8 py-3.5 gradient-orange text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
            <FileText size={16}/>
            <span>Ver todos los documentos</span>
          </button>
        </div>
      </div>
    </section>
  );
}
