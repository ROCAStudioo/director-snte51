'use client';

import { useRef, useEffect, useState } from 'react';
import { Quote, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/data/site-data';

export default function DirectorMessage() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="director"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-4 py-2 mb-4">
            <MessageCircle size={14} className="text-orange-500"/>
            <span className="text-orange-600 text-xs font-semibold uppercase tracking-wider">Mensaje Institucional</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900">Mensaje del <span className="gradient-text">Director</span></h2>
          <div className="w-16 h-1 gradient-orange rounded-full mx-auto mt-4"/>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Photo */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-full gradient-orange opacity-20 blur-2xl scale-110"/>
              
              {/* Circle photo */}
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                <img
                  src="/images/director-circle.jpg"
                  alt="Mtro. Omar Castañeda Ramiro"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-orange-200 scale-110 animate-spin" style={{animationDuration: '30s'}}/>
              
              {/* Badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-4 py-2 shadow-lg border border-orange-100 whitespace-nowrap">
                <p className="text-xs font-bold text-orange-600">{siteConfig.director.title}</p>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-6">
            <div className="relative">
              {/* Quote icon */}
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl gradient-orange flex items-center justify-center shadow-lg opacity-20">
                <Quote size={24} className="text-white"/>
              </div>
              <div className="w-10 h-10 rounded-xl gradient-orange flex items-center justify-center shadow-lg mb-4">
                <Quote size={18} className="text-white"/>
              </div>
              
              {/* Message text */}
              <div className="space-y-4">
                {siteConfig.director.message.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Signature */}
            <div className="pt-6 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  {/* Handwritten style signature */}
                  <p
                    className="text-2xl text-orange-500 font-bold"
                    style={{ fontFamily: 'cursive' }}
                  >
                    {siteConfig.director.signature}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{siteConfig.director.title}</p>
                  <p className="text-xs text-gray-400">{siteConfig.director.organization}</p>
                </div>
                <div className="w-16 h-16 rounded-2xl gradient-orange opacity-10 flex items-center justify-center">
                  <span className="text-orange-800 font-bold text-xl opacity-60">FA</span>
                </div>
              </div>
              
              {/* Decorative line under signature */}
              <div className="mt-3 flex items-center gap-2">
                <div className="h-px flex-1 bg-gradient-to-r from-orange-300 to-transparent"/>
                <div className="w-2 h-2 rounded-full bg-orange-300"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
