'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Calendar, ArrowRight, Zap, Filter } from 'lucide-react';
import { actionCards } from '@/data/site-data';

const categories = ['Todos', ...Array.from(new Set(actionCards.map(a => a.category)))];

export default function ActionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filtered = activeCategory === 'Todos'
    ? actionCards
    : actionCards.filter(a => a.category === activeCategory);

  return (
    <section id="acciones" ref={sectionRef} className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-4 py-2 mb-4">
            <Zap size={14} className="text-orange-500"/>
            <span className="text-orange-600 text-xs font-semibold uppercase tracking-wider">Acciones de Gobierno</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900">Acciones <span className="gradient-text">Recientes</span></h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Trabajando día a día por el bienestar y patrimonio del magisterio poblano
          </p>
          <div className="w-16 h-1 gradient-orange rounded-full mx-auto mt-4"/>
        </div>

        {/* Category filter */}
        <div className={`flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Filter size={16} className="text-gray-400 self-center mr-1"/>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'gradient-orange text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {filtered.map((action) => (
            <article
              key={action.id}
              className={`group bg-white rounded-2xl overflow-hidden shadow-card transition-all duration-300 cursor-pointer border border-gray-100 ${
                hoveredCard === action.id ? 'shadow-card-hover -translate-y-2' : 'hover:shadow-card-hover hover:-translate-y-1'
              }`}
              onMouseEnter={() => setHoveredCard(action.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image */}
              <div className="relative h-52 bg-gradient-to-br from-orange-100 to-orange-50 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center opacity-30">
                    <div className="w-16 h-16 rounded-2xl gradient-orange mx-auto flex items-center justify-center">
                      <Zap size={28} className="text-white"/>
                    </div>
                  </div>
                </div>
                {/* Category overlay */}
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 backdrop-blur-sm text-orange-600 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm border border-orange-100">
                    {action.category}
                  </span>
                </div>
                {/* Hover overlay */}
                <div className={`absolute inset-0 gradient-orange opacity-0 group-hover:opacity-10 transition-opacity duration-300`}/>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Date */}
                <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-3">
                  <Calendar size={12}/>
                  <span>{action.date}</span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-gray-800 text-base mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                  {action.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm line-clamp-3 mb-4 leading-relaxed">
                  {action.description}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-1 text-orange-500 text-sm font-semibold group-hover:gap-2 transition-all duration-200">
                  <span>Leer más</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View all */}
        <div className={`text-center mt-10 transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-orange-300 text-orange-600 font-semibold rounded-xl hover:bg-orange-50 hover:border-orange-500 transition-all duration-200">
            <span>Ver todas las acciones</span>
            <ArrowRight size={16}/>
          </button>
        </div>
      </div>
    </section>
  );
}
