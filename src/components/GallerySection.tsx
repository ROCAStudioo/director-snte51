'use client';

import { useRef, useEffect, useState } from 'react';
import { Camera, Grid3X3, Play, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { galleryItems } from '@/data/site-data';
import type { GalleryItem } from '@/types';

const categoryFilters: { key: string; label: string }[] = [
  { key: 'all', label: 'Todos' },
  { key: 'regional', label: 'Regionales' },
  { key: 'events', label: 'Eventos' },
  { key: 'meetings', label: 'Reuniones' },
  { key: 'conferences', label: 'Conferencias' },
  { key: 'training', label: 'Capacitación' },
];

const categoryColors: Record<string, string> = {
  regional: 'bg-blue-100 text-blue-600',
  events: 'bg-green-100 text-green-600',
  meetings: 'bg-purple-100 text-purple-600',
  conferences: 'bg-yellow-100 text-yellow-600',
  training: 'bg-orange-100 text-orange-600',
};

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') setLightboxIndex(i => (i + 1) % filtered.length);
      if (e.key === 'ArrowLeft') setLightboxIndex(i => (i - 1 + filtered.length) % filtered.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen]);

  const filtered = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(g => g.category === activeFilter);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const labelFor = (cat: string) => categoryFilters.find(f => f.key === cat)?.label || cat;

  return (
    <section id="galeria" ref={sectionRef} className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-4 py-2 mb-4">
            <Camera size={14} className="text-orange-500"/>
            <span className="text-orange-600 text-xs font-semibold uppercase tracking-wider">Galería</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900">Momentos <span className="gradient-text">Memorables</span></h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Registro visual del trabajo y compromiso con el magisterio poblano
          </p>
          <div className="w-16 h-1 gradient-orange rounded-full mx-auto mt-4"/>
        </div>

        {/* Filters */}
        <div className={`flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {categoryFilters.map(filter => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === filter.key
                  ? 'gradient-orange text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-500'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className={`masonry-grid transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {filtered.map((item, index) => (
            <div
              key={item.id}
              className="masonry-item group relative overflow-hidden rounded-2xl cursor-pointer shadow-card hover:shadow-card-hover transition-all duration-300"
              onClick={() => openLightbox(index)}
            >
              {/* Aspect ratio box */}
              <div
                className="w-full bg-gradient-to-br from-orange-100 to-orange-50"
                style={{ paddingBottom: `${(item.height / item.width) * 100}%` }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  {item.type === 'video' ? (
                    <div className="flex flex-col items-center gap-2 opacity-30">
                      <Play size={40} className="text-orange-500"/>
                    </div>
                  ) : (
                    <div className="opacity-20">
                      <Camera size={40} className="text-orange-400"/>
                    </div>
                  )}
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryColors[item.category]}`}>
                    {labelFor(item.category)}
                  </span>
                  <p className="text-white text-sm mt-1 font-medium">{item.alt}</p>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                    {item.type === 'video' ? (
                      <Play size={20} className="text-white"/>
                    ) : (
                      <ZoomIn size={20} className="text-white"/>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <Grid3X3 size={48} className="mx-auto mb-4 opacity-30"/>
            <p>No hay elementos en esta categoría</p>
          </div>
        )}

        {/* Upload CTA */}
        <div className={`text-center mt-10 transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-orange-300 text-orange-600 font-semibold rounded-xl hover:bg-orange-50 hover:border-orange-500 transition-all duration-200">
            <Camera size={16}/>
            <span>Ver galería completa</span>
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={() => setLightboxOpen(false)}
          >
            <X size={20}/>
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={e => { e.stopPropagation(); setLightboxIndex(i => (i - 1 + filtered.length) % filtered.length); }}
          >
            <ChevronLeft size={20}/>
          </button>

          <div
            className="max-w-4xl w-full max-h-full"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl overflow-hidden" style={{ minHeight: '400px' }}>
              <div className="flex items-center justify-center h-96">
                <div className="text-center opacity-30">
                  <Camera size={80} className="text-orange-400 mx-auto mb-2"/>
                  <p className="text-orange-600">{filtered[lightboxIndex]?.alt}</p>
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <p className="text-white font-medium">{filtered[lightboxIndex]?.alt}</p>
              <p className="text-gray-400 text-sm mt-1">{lightboxIndex + 1} / {filtered.length}</p>
            </div>
          </div>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={e => { e.stopPropagation(); setLightboxIndex(i => (i + 1) % filtered.length); }}
          >
            <ChevronRight size={20}/>
          </button>
        </div>
      )}
    </section>
  );
}
