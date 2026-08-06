'use client';

import { useRef, useEffect, useState } from 'react';
import { MapPin, Users, Calendar, ChevronRight, Map } from 'lucide-react';
import { regions } from '@/data/site-data';
import type { Region } from '@/types';

export default function MapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="cobertura" ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-4 py-2 mb-4">
            <Map size={14} className="text-orange-500"/>
            <span className="text-orange-600 text-xs font-semibold uppercase tracking-wider">Cobertura Estatal</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900">Presencia en <span className="gradient-text">Puebla</span></h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Llevando servicios financieros a todas las regiones del estado de Puebla
          </p>
          <div className="w-16 h-1 gradient-orange rounded-full mx-auto mt-4"/>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Map placeholder */}
          <div className="lg:col-span-2">
            <div className="relative bg-gradient-to-br from-orange-50 to-blue-50 rounded-2xl overflow-hidden shadow-card border border-gray-100" style={{ minHeight: '480px' }}>
              {/* SVG Map of Puebla (simplified) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 500 400" className="w-full h-full p-8">
                  {/* Puebla state outline (simplified) */}
                  <path
                    d="M150,80 L180,60 L230,55 L280,70 L320,65 L360,80 L380,110 L370,140 L390,170 L380,210 L360,240 L330,260 L300,280 L270,300 L240,310 L210,300 L180,280 L150,260 L130,230 L120,200 L110,170 L120,140 L130,110 Z"
                    fill="rgba(244,121,32,0.08)"
                    stroke="rgba(244,121,32,0.3)"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  
                  {/* Region dots */}
                  {regions.map((region) => {
                    // Map coords to SVG viewport
                    const svgX = ((region.lng - (-99.5)) / ((-96.5) - (-99.5))) * 400 + 50;
                    const svgY = ((region.lat - 17.8) / (20.8 - 17.8)) * 320 + 40;
                    const isSelected = selectedRegion?.id === region.id;

                    return (
                      <g key={region.id} onClick={() => setSelectedRegion(isSelected ? null : region)} className="cursor-pointer">
                        {/* Pulse ring */}
                        <circle
                          cx={svgX} cy={svgY} r={isSelected ? 20 : 14}
                          fill="rgba(244,121,32,0.15)"
                          className="transition-all duration-300"
                        />
                        {/* Main dot */}
                        <circle
                          cx={svgX} cy={svgY} r={isSelected ? 10 : 7}
                          fill={isSelected ? '#F47920' : '#FF9A3C'}
                          stroke="white"
                          strokeWidth="2"
                          className="transition-all duration-300"
                        />
                        {/* Label */}
                        <text
                          x={svgX} y={svgY + (isSelected ? 26 : 20)}
                          textAnchor="middle"
                          fontSize="9"
                          fill="#374151"
                          fontWeight={isSelected ? '700' : '500'}
                        >
                          {region.name.split(' ')[0]}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Map legend */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-gray-100 shadow-sm">
                <p className="text-xs font-semibold text-gray-700 mb-2">Regiones atendidas</p>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-400"/>
                  <span className="text-xs text-gray-500">Jornada realizada</span>
                </div>
              </div>

              {/* Click hint */}
              {!selectedRegion && (
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 border border-gray-100 shadow-sm">
                  <p className="text-xs text-gray-500">👆 Haz clic en una región</p>
                </div>
              )}
            </div>
          </div>

          {/* Regions list + detail panel */}
          <div className="flex flex-col gap-4">
            {/* Detail panel */}
            {selectedRegion ? (
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 shadow-card">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{selectedRegion.name}</h3>
                    <p className="text-orange-600 text-sm font-medium">{selectedRegion.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedRegion(null)}
                    className="text-gray-400 hover:text-gray-600 text-xs"
                  >✕</button>
                </div>

                <div className="flex gap-4 mb-4">
                  <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                    <Calendar size={14} className="text-orange-500"/>
                    <span>{selectedRegion.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                    <Users size={14} className="text-orange-500"/>
                    <span>{selectedRegion.attendees.toLocaleString()} asistentes</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Servicios ofrecidos:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedRegion.services.map((service, i) => (
                      <span key={i} className="bg-white border border-orange-200 text-orange-600 text-xs px-2.5 py-1 rounded-full">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-5 text-center">
                <MapPin size={32} className="text-orange-300 mx-auto mb-2"/>
                <p className="text-gray-500 text-sm">Selecciona una región en el mapa para ver detalles</p>
              </div>
            )}

            {/* Regions list */}
            <div className="space-y-2 overflow-y-auto" style={{ maxHeight: '300px' }}>
              {regions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setSelectedRegion(selectedRegion?.id === region.id ? null : region)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 ${
                    selectedRegion?.id === region.id
                      ? 'bg-orange-50 border border-orange-200'
                      : 'bg-white border border-gray-100 hover:border-orange-200 hover:bg-orange-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    selectedRegion?.id === region.id ? 'gradient-orange' : 'bg-orange-100'
                  }`}>
                    <MapPin size={14} className={selectedRegion?.id === region.id ? 'text-white' : 'text-orange-500'}/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-700 text-sm truncate">{region.name}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>{region.attendees.toLocaleString()} asistentes</span>
                      <span>·</span>
                      <span>{region.date}</span>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-gray-400 flex-shrink-0"/>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
