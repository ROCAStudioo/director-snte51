'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronDown, Play, Star, Users, Award } from 'lucide-react';
import { siteConfig } from '@/data/site-data';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 10;
      const pattern = heroRef.current.querySelector('.pattern-hero') as HTMLElement;
      if (pattern) {
        pattern.style.transform = `translate(${x}px, ${y}px)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToNext = () => {
    document.getElementById('director')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-white">
      
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
            {/* Main photo container */}
            <div className="relative w-72 h-96 sm:w-80 sm:h-[440px] lg:w-[380px] lg:h-[520px]">
              {/* Background card */}
              <div className="absolute -inset-4 rounded-3xl gradient-orange opacity-10 blur-xl"/>
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <div className="w-full h-full bg-gradient-to-br from-orange-100 via-orange-50 to-white flex items-center justify-center">
                  {/* Placeholder for director photo */}
                  <div className="text-center p-8">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 mx-auto flex items-center justify-center mb-4">
                      <span className="text-white text-4xl font-bold">OC</span>
                    </div>
                    <p className="text-orange-600 font-semibold text-sm">Foto del Director</p>
                    <p className="text-gray-400 text-xs mt-1">Reemplazar con foto oficial</p>
                  </div>
                </div>
              </div>

              {/* Floating badge 1 */}
              <div className="absolute -top-4 -right-4 glass-orange rounded-2xl px-4 py-3 shadow-lg border border-orange-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <Star size={16} className="text-orange-500 fill-orange-500"/>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">98%</p>
                    <p className="text-xs text-gray-500">Satisfacción</p>
                  </div>
                </div>
              </div>

              {/* Floating badge 2 */}
              <div className="absolute -bottom-4 -left-4 glass-orange rounded-2xl px-4 py-3 shadow-lg border border-orange-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <Users size={16} className="text-orange-500"/>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">+25,000</p>
                    <p className="text-xs text-gray-500">Socios atendidos</p>
                  </div>
                </div>
              </div>

              {/* Floating badge 3 */}
              <div className="absolute top-1/2 -left-8 glass rounded-2xl px-3 py-2 shadow-lg border border-gray-100">
                <div className="flex items-center gap-2">
                  <Award size={16} className="text-orange-500"/>
                  <p className="text-xs font-semibold text-gray-700">Director General</p>
                </div>
              </div>
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

            {/* Stats row */}
            <div className="flex gap-6 py-4 border-y border-gray-100">
              <div>
                <p className="text-2xl font-bold text-orange-500">+25K</p>
                <p className="text-xs text-gray-500">Trabajadores</p>
              </div>
              <div className="w-px bg-gray-200"/>
              <div>
                <p className="text-2xl font-bold text-orange-500">150+</p>
                <p className="text-xs text-gray-500">Jornadas</p>
              </div>
              <div className="w-px bg-gray-200"/>
              <div>
                <p className="text-2xl font-bold text-orange-500">$500M</p>
                <p className="text-xs text-gray-500">Administrados</p>
              </div>
            </div>

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
