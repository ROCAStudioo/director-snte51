'use client';

import { useRef, useEffect, useState } from 'react';
import { MapPin, Users, Calendar, ChevronRight, Map } from 'lucide-react';
import { regions as staticRegions } from '@/data/site-data';
import type { Region } from '@/types';

export default function MapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [regions, setRegions] = useState(staticRegions);

  useEffect(() => {
    fetch('/api/regions').then(r => r.json()).then(data => { if (data.length > 0) setRegions(data); }).catch(() => {});
  }, []);

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
              {/* SVG Map of Puebla - contorno real basado en GeoJSON oficial */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 500 400" className="w-full h-full p-4">
                  {/* Contorno real del estado de Puebla (CONABIO 2023) */}
                  <path
                    d="M 269.9 29.9 L 275.9 34.3 L 270.1 49.8 L 288.5 61.2 L 304.8 67.5 L 285.1 76.8 L 266.9 80.3 L 278.2 91.4 L 288.2 104.9 L 299 106.2 L 320.9 108.6 L 327.1 98.5 L 345.7 99.1 L 390 105.9 L 367.7 127.2 L 355.6 155.2 L 343.9 167 L 339 183.1 L 347.8 197 L 377.9 198.9 L 390.4 203.4 L 421.6 207.5 L 408.7 217.7 L 391.1 221.6 L 367.9 229.2 L 363 240.7 L 360.3 256.8 L 353.8 268.1 L 365.2 283.3 L 391.5 287.9 L 420.2 295 L 440.1 293.1 L 463.7 306.9 L 455.6 319.5 L 437.9 329 L 424.6 329.8 L 402.2 339.5 L 372.5 336.7 L 337.8 344.9 L 306.4 346.1 L 291.5 335 L 263.3 323.6 L 252.1 336.9 L 252.6 353 L 260.2 352.6 L 266.4 359.5 L 239.4 367.3 L 221.1 359.7 L 194 359.3 L 170.6 370.9 L 153.7 370.7 L 131.9 365.8 L 115.2 357.5 L 82.4 361.2 L 46 350.1 L 28.6 334.9 L 13.6 325.2 L 32.1 307.8 L 57.8 296.5 L 78.4 298.8 L 71.8 275 L 74.4 263.2 L 82.2 257.1 L 90.3 240.5 L 92.2 231.6 L 91.9 221.2 L 87.2 202.9 L 93 190.6 L 111.6 187.1 L 122.6 195.4 L 137.9 206.8 L 152 219.1 L 162.4 220.5 L 175.1 224.6 L 199.9 221.7 L 224.2 218.3 L 247 211.2 L 255.9 205.3 L 290.7 205.1 L 272.8 190.4 L 261.1 182.8 L 246 177.7 L 221.2 167.5 L 199.9 162.7 L 168.9 157.2 L 166.5 142.7 L 166.4 134.3 L 183.8 119.2 L 192.8 107.5 L 181.6 94.6 L 181.9 90.4 L 200 80.1 L 217.4 70.3 L 238.1 56.4 L 235.5 41.3 L 255.3 30.4 Z"
                    fill="rgba(244,121,32,0.10)"
                    stroke="rgba(244,121,32,0.5)"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />

                  {/* Region dots */}
                  {regions.map((region) => {
                    // Misma proyección que el path: minLon=-99.0, maxLon=-96.7, minLat=17.8, maxLat=20.9
                    const svgX = 20 + (region.lng - (-99.0)) / 2.3 * 460;
                    const svgY = 380 - (region.lat - 17.8) / 3.1 * 360;
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
