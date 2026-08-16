'use client';

import { useRef, useEffect, useState } from 'react';
import { Users, Map, BarChart3, Star, TrendingUp } from 'lucide-react';
import { statCounters as staticStats } from '@/data/site-data';

const iconMap: Record<string, React.ComponentType<{size?: number; className?: string}>> = {
  users: Users,
  map: Map,
  chart: BarChart3,
  star: Star,
  trend: TrendingUp,
};

function AnimatedCounter({ target, suffix, prefix, duration = 2000 }: {
  target: number;
  suffix: string;
  prefix: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString('es-MX')}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [statCounters, setStatCounters] = useState(staticStats);

  useEffect(() => {
    fetch('/api/stats').then(r => r.json()).then(data => { if (data.length > 0) setStatCounters(data); }).catch(() => {});
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-orange opacity-95"/>
      <div className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1200 300" preserveAspectRatio="none">
          <circle cx="100" cy="150" r="200" fill="white"/>
          <circle cx="1100" cy="150" r="200" fill="white"/>
          <polygon points="600,0 700,300 500,300" fill="white"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 rounded-full px-4 py-2 mb-4">
            <TrendingUp size={14} className="text-white"/>
            <span className="text-white text-xs font-semibold uppercase tracking-wider">Resultados que Hablan</span>
          </div>
          <h2 className="text-4xl font-bold text-white">Impacto <span className="text-orange-100">Real</span></h2>
          <div className="w-16 h-1 bg-white/50 rounded-full mx-auto mt-4"/>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
          {statCounters.map((stat, index) => {
            const IconComponent = iconMap[stat.icon] || Star;
            return (
              <div
                key={index}
                className={`text-center transition-all duration-700 ${
                  visible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                    <IconComponent size={24} className="text-white"/>
                  </div>

                  {/* Number */}
                  <div className="text-4xl font-bold text-white mb-2">
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                    />
                  </div>

                  {/* Label */}
                  <p className="text-orange-100 text-sm font-medium">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className={`text-center mt-8 transition-all duration-700 delay-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-orange-100 text-sm">
            * Datos correspondientes al período 2022-2026 bajo la administración del Mtro. Omar Castañeda Ramiro
          </p>
        </div>
      </div>
    </section>
  );
}
