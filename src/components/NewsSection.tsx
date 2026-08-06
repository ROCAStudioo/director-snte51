'use client';

import { useRef, useEffect, useState } from 'react';
import { Calendar, Tag, ArrowRight, Newspaper, Search } from 'lucide-react';
import { newsItems } from '@/data/site-data';

const categories = ['Todas', ...Array.from(new Set(newsItems.map(n => n.category)))];

export default function NewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filtered = newsItems.filter(n => {
    const matchesCategory = activeCategory === 'Todas' || n.category === activeCategory;
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = filtered.find(n => n.featured) || filtered[0];
  const rest = filtered.filter(n => n !== featured).slice(0, 3);

  return (
    <section id="noticias" ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-4 py-2 mb-4">
            <Newspaper size={14} className="text-orange-500"/>
            <span className="text-orange-600 text-xs font-semibold uppercase tracking-wider">Sala de Prensa</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900">Últimas <span className="gradient-text">Noticias</span></h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Mantente informado sobre las actividades y logros del Fondo de Ahorro
          </p>
          <div className="w-16 h-1 gradient-orange rounded-full mx-auto mt-4"/>
        </div>

        {/* Filters + Search */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-between items-center mb-10 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'gradient-orange text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-shrink-0">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
            <input
              type="text"
              placeholder="Buscar noticias..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="form-input pl-9 w-56"
            />
          </div>
        </div>

        {/* News layout: featured + 3 side */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Featured news */}
          {featured && (
            <article className="lg:col-span-2 group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100 cursor-pointer">
              {/* Image */}
              <div className="relative h-64 bg-gradient-to-br from-orange-100 to-orange-50">
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <Newspaper size={80} className="text-orange-400"/>
                </div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                    DESTACADA
                  </span>
                  <span className="bg-white/90 backdrop-blur-sm text-orange-600 text-xs font-semibold px-3 py-1.5 rounded-full border border-orange-100">
                    {featured.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                  <Calendar size={12}/>
                  <span>{featured.date}</span>
                </div>
                <h3 className="font-bold text-gray-800 text-xl mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors leading-snug">
                  {featured.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">
                  {featured.summary}
                </p>
                <div className="flex items-center gap-1 text-orange-500 text-sm font-semibold group-hover:gap-2 transition-all">
                  <span>Leer nota completa</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                </div>
              </div>
            </article>
          )}

          {/* Side news */}
          <div className="flex flex-col gap-4">
            {rest.map((news) => (
              <article
                key={news.id}
                className="group flex gap-4 bg-white rounded-2xl p-4 shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100 cursor-pointer"
              >
                {/* Small image */}
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <Newspaper size={28} className="text-orange-300"/>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Tag size={10} className="text-orange-500"/>
                    <span className="text-orange-500 text-xs font-medium">{news.category}</span>
                  </div>
                  <h4 className="font-bold text-gray-700 text-sm line-clamp-2 group-hover:text-orange-600 transition-colors mb-1">
                    {news.title}
                  </h4>
                  <div className="flex items-center gap-1 text-gray-400 text-xs">
                    <Calendar size={10}/>
                    <span>{news.date}</span>
                  </div>
                </div>
              </article>
            ))}

            {/* View all */}
            <button className="flex items-center justify-center gap-2 py-3 border-2 border-dashed border-orange-200 rounded-2xl text-orange-500 text-sm font-medium hover:border-orange-400 hover:bg-orange-50 transition-all mt-auto">
              <span>Ver todas las noticias</span>
              <ArrowRight size={14}/>
            </button>
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <Newspaper size={48} className="mx-auto mb-4 opacity-30"/>
            <p>No se encontraron noticias con los criterios seleccionados</p>
          </div>
        )}
      </div>
    </section>
  );
}
