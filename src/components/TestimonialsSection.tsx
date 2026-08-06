'use client';

import { useRef, useEffect, useState } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { testimonials } from '@/data/site-data';

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrent(i => (i + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const prev = () => {
    setIsAutoPlaying(false);
    setCurrent(i => (i - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setIsAutoPlaying(false);
    setCurrent(i => (i + 1) % testimonials.length);
  };

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-4 py-2 mb-4">
            <MessageSquare size={14} className="text-orange-500"/>
            <span className="text-orange-600 text-xs font-semibold uppercase tracking-wider">Lo que dice el Magisterio</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900">Testimonios de <span className="gradient-text">Confianza</span></h2>
          <div className="w-16 h-1 gradient-orange rounded-full mx-auto mt-4"/>
        </div>

        {/* Main testimonial */}
        <div className={`relative transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Big quote */}
          <div className="absolute -top-8 left-8 w-16 h-16 rounded-2xl gradient-orange flex items-center justify-center opacity-20">
            <Quote size={32} className="text-white"/>
          </div>

          {/* Card */}
          <div className="relative bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-orange-50 -translate-y-1/2 translate-x-1/2 opacity-50"/>
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-orange-50 translate-y-1/2 -translate-x-1/2 opacity-30"/>

            <div className="relative z-10">
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-orange-400 fill-orange-400"/>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 text-lg sm:text-xl leading-relaxed italic mb-8">
                "{testimonials[current].comment}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-white font-bold text-lg">
                    {testimonials[current].name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-gray-800">{testimonials[current].name}</p>
                  <p className="text-orange-500 text-sm">{testimonials[current].role}</p>
                  <p className="text-gray-400 text-xs flex items-center gap-1 mt-0.5">
                    <span>📍</span>
                    <span>{testimonials[current].municipality}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setIsAutoPlaying(false); setCurrent(i); }}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 h-2.5 bg-orange-500' : 'w-2.5 h-2.5 bg-gray-300 hover:bg-orange-300'
                  }`}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-xl border-2 border-gray-200 text-gray-500 hover:border-orange-400 hover:text-orange-500 flex items-center justify-center transition-all duration-200"
              >
                <ChevronLeft size={18}/>
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-xl gradient-orange text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200"
              >
                <ChevronRight size={18}/>
              </button>
            </div>
          </div>
        </div>

        {/* Mini testimonials row */}
        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 transition-all duration-700 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              onClick={() => { setIsAutoPlaying(false); setCurrent(i); }}
              className={`p-4 rounded-2xl text-left transition-all duration-200 border ${
                i === current
                  ? 'bg-orange-50 border-orange-200 shadow-sm'
                  : 'bg-white border-gray-100 hover:border-orange-200 hover:bg-orange-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  i === current ? 'gradient-orange text-white' : 'bg-orange-100 text-orange-600'
                }`}>
                  {t.name.charAt(0)}
                </div>
                <p className="text-xs font-semibold text-gray-700 line-clamp-1">{t.name.split(' ')[1]}</p>
              </div>
              <p className="text-xs text-gray-400 line-clamp-2">{t.comment.substring(0, 50)}...</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
