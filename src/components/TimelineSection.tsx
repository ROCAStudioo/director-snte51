'use client';

import { useRef, useEffect, useState } from 'react';
import { GraduationCap, BookOpen, Briefcase, BarChart3, Award, Users, Star, Trophy, Building2 } from 'lucide-react';
import { timelineItems } from '@/data/site-data';
import type { TimelineItem } from '@/types';

const iconMap: Record<string, React.ComponentType<{size?: number; className?: string}>> = {
  graduation: GraduationCap,
  book: BookOpen,
  briefcase: Briefcase,
  chart: BarChart3,
  award: Award,
  users: Users,
  star: Star,
  trophy: Trophy,
  building: Building2,
};

const categoryColors: Record<TimelineItem['category'], string> = {
  academic: 'bg-blue-50 text-blue-600 border-blue-200',
  professional: 'bg-green-50 text-green-600 border-green-200',
  achievement: 'bg-purple-50 text-purple-600 border-purple-200',
  recognition: 'bg-yellow-50 text-yellow-600 border-yellow-200',
  institutional: 'bg-orange-50 text-orange-600 border-orange-200',
};

const categoryLabels: Record<TimelineItem['category'], string> = {
  academic: 'Formación',
  professional: 'Profesional',
  achievement: 'Logro',
  recognition: 'Reconocimiento',
  institutional: 'Institucional',
};

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          // Stagger timeline items
          timelineItems.forEach((_, i) => {
            setTimeout(() => setVisibleItems(prev => [...prev, i]), i * 150);
          });
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="trayectoria" ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-4 py-2 mb-4">
            <GraduationCap size={14} className="text-orange-500"/>
            <span className="text-orange-600 text-xs font-semibold uppercase tracking-wider">Trayectoria</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900">Historia de <span className="gradient-text">Liderazgo</span></h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Una trayectoria forjada con compromiso, dedicación y servicio al magisterio poblano
          </p>
          <div className="w-16 h-1 gradient-orange rounded-full mx-auto mt-4"/>
        </div>

        {/* Category filter pills */}
        <div className={`flex flex-wrap justify-center gap-2 mb-12 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {Object.entries(categoryLabels).map(([cat, label]) => (
            <span key={cat} className={`px-3 py-1.5 rounded-full text-xs font-medium border ${categoryColors[cat as TimelineItem['category']]}`}>
              {label}
            </span>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-orange-300 via-orange-200 to-transparent -translate-x-1/2"/>

          <div className="space-y-8 lg:space-y-0">
            {timelineItems.map((item, index) => {
              const IconComponent = iconMap[item.icon] || Star;
              const isLeft = index % 2 === 0;
              const isVisible = visibleItems.includes(index);

              return (
                <div key={index} className={`relative lg:grid lg:grid-cols-2 lg:gap-8 lg:mb-12 transition-all duration-600 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  
                  {/* Left column content (even items) */}
                  <div className={`${isLeft ? 'lg:pr-12' : 'lg:col-start-2 lg:pr-0 lg:pl-12'}`}>
                    {(isLeft || true) && (
                      <div className={`group bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100 hover:border-orange-200 ${
                        isLeft ? 'lg:text-right' : 'lg:text-left'
                      } ${isLeft ? '' : 'lg:col-start-2'}`}>
                        
                        {/* Category badge */}
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mb-3 ${categoryColors[item.category]}`}>
                          {categoryLabels[item.category]}
                        </span>

                        {/* Year */}
                        <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'lg:justify-end' : 'justify-start'}`}>
                          <span className="text-2xl font-bold gradient-text">{item.year}</span>
                        </div>

                        {/* Icon + Title */}
                        <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'lg:justify-end' : 'justify-start'}`}>
                          <div className="w-10 h-10 rounded-xl gradient-orange flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                            <IconComponent size={18} className="text-white"/>
                          </div>
                          <h3 className="font-bold text-gray-800 text-base leading-tight max-w-xs">{item.title}</h3>
                        </div>

                        <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                      </div>
                    )}
                  </div>

                  {/* Center dot */}
                  <div className="hidden lg:block absolute left-1/2 top-8 w-5 h-5 rounded-full gradient-orange -translate-x-1/2 border-3 border-white shadow-md z-10"
                    style={{border: '3px solid white'}}
                  />

                  {/* Right column placeholder for odd items */}
                  {isLeft && <div className="hidden lg:block"/>}
                </div>
              );
            })}
          </div>

          {/* Mobile timeline (stacked) */}
          <div className="lg:hidden space-y-4">
            {timelineItems.map((item, index) => {
              const IconComponent = iconMap[item.icon] || Star;
              const isVisible = visibleItems.includes(index);

              return (
                <div key={index} className={`flex gap-4 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                  {/* Left line */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-10 h-10 rounded-xl gradient-orange flex items-center justify-center shadow-md">
                      <IconComponent size={18} className="text-white"/>
                    </div>
                    {index < timelineItems.length - 1 && (
                      <div className="w-px h-full bg-orange-200 mt-2"/>
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-8 flex-1">
                    <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl font-bold gradient-text">{item.year}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${categoryColors[item.category]}`}>
                          {categoryLabels[item.category]}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-800 text-sm mb-2">{item.title}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
