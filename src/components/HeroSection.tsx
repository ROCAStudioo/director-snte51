'use client';

import { useRef } from 'react';
import { ArrowRight, ChevronDown, Play } from 'lucide-react';
import { siteConfig } from '@/data/site-data';

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  const scrollToNext = () => {
    document.getElementById('director')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" ref={heroRef} className="relative min-h-screen flex items-center bg-white" style={{ overflowX: 'hidden', width: '100%', maxWidth: '100%' }}>
      
      {/* Animated Background Pattern */}
      <div className="pattern-hero absolute inset-0 transition-transform duration-700 ease-out pointer-events-none">
        {/* Geometric shapes */}
        <svg className="absolute top-0 right-0 w-full h-full opacity-5" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <polygon points="800,0 1200,0 1200,400" fill="#F47920"/>
          <polygon points="900,800 1200,500 1200,800" fill="#F47920"/>
          <circle cx="200" cy="650" r="300" fill="none" stroke="#F47920" strokeWidth="1"/>
          <circle cx="1000" cy="200" r="200" fill="none" stroke="#F47920" strokeWidth="0.5"/>
          <line x1="0" y1="300" x2="600" y2="0" stroke="#F47920" strokeWidth="0.5"/>
          <line x1="0" y1="400" x2="700" y2="0" stroke="#F47920" strokeWidth="0.5"/>
          <line x1="0" y1="500" x2="800" y2="0" stroke="#F47920" strokeWidth="0.3"/>
          <polygon points="100,100 200,0 300,100 200,200" fill="none" stroke="#F47920" strokeWidth="0.5"/>
          <polygon points="500,600 600,500 700,600 600,700" fill="none" stroke="#F47920" strokeWidth="0.5"/>
        </svg>
        
        {/* Gradient orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-orange-100 opacity-30 blur-3xl animate-pulse"/>
        <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-orange-50 opacity-40 blur-2xl"/>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-orange-100 opacity-20 blur-2xl"/>
      </div>

      {/* Orange accent bar top */}
      <div className="absolute top-0 left-0 right-0 h-1 gradient-orange"/>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Photo Column */}
          <div className="relative order-2 lg:order-1 flex justify-center lg:justify-start">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
              style={{ width: '340px', height: '460px' }}>
              <img
                src="/images/director.jpg"
                alt="Mtro. Omar Castañeda Ramiro - Director General"
                className="w-full h-full object-cover object-center"
              />
              {/* Glow sutil */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-orange-200 pointer-events-none"/>
            </div>
          </div>

          {/* Content Column */}
          <div className="order-1 lg:order-2 space-y-6">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-4 py-2">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"/>
              <span className="text-orange-600 text-xs font-semibold uppercase tracking-wider">Fondo de Ahorro · Sección 51 SNTE</span>
            </div>

            {/* Main heading */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {siteConfig.director.name.split(' ').map((word, i) => (
                  <span key={i} className={i < 1 ? 'gradient-text' : ''}>
                    {word}{' '}
                  </span>
                ))}
              </h1>
              <h2 className="text-lg sm:text-xl text-orange-500 font-semibold mt-2">
                {siteConfig.director.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-500 mt-1 font-medium">
                {siteConfig.director.organization}
              </p>
              <p className="text-sm text-gray-400">
                {siteConfig.director.section}
              </p>
            </div>

            {/* Bio */}
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-lg">
              {siteConfig.director.bio}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => document.getElementById('trayectoria')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center gap-2 px-6 py-3.5 gradient-orange text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                <span>Conoce su trayectoria</span>
                <ArrowRight size={18}/>
              </button>
              <button
                onClick={() => document.getElementById('acciones')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white border-2 border-orange-200 text-orange-600 font-semibold rounded-xl hover:bg-orange-50 hover:border-orange-400 transition-all duration-200"
              >
                <Play size={18} className="fill-orange-500"/>
                <span>Últimas acciones</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-400 hover:text-orange-500 transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <span className="text-xs font-medium">Descubre más</span>
        <ChevronDown size={20}/>
      </button>
    </section>
  );
}
