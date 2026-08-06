'use client';

import { useRef, useEffect, useState } from 'react';
import { Heart, ExternalLink, Share2, Play } from 'lucide-react';
import { socialPosts, siteConfig } from '@/data/site-data';

const platformConfig = {
  facebook: {
    name: 'Facebook',
    color: 'bg-blue-600',
    lightColor: 'bg-blue-50 text-blue-600 border-blue-200',
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  instagram: {
    name: 'Instagram',
    color: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400',
    lightColor: 'bg-pink-50 text-pink-600 border-pink-200',
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  youtube: {
    name: 'YouTube',
    color: 'bg-red-600',
    lightColor: 'bg-red-50 text-red-600 border-red-200',
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
      </svg>
    ),
  },
};

export default function SocialSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-4 py-2 mb-4">
            <Share2 size={14} className="text-orange-500"/>
            <span className="text-orange-600 text-xs font-semibold uppercase tracking-wider">Redes Sociales</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900">Síguenos en <span className="gradient-text">Redes</span></h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Mantente conectado y comparte las acciones del Fondo de Ahorro
          </p>
          <div className="w-16 h-1 gradient-orange rounded-full mx-auto mt-4"/>
        </div>

        {/* Social links */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {Object.entries(platformConfig).map(([key, config]) => (
            <a
              key={key}
              href={siteConfig.social[key as keyof typeof siteConfig.social]}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-5 py-3 rounded-xl text-white font-semibold text-sm ${config.color} shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200`}
            >
              <config.icon/>
              <span>{config.name}</span>
            </a>
          ))}
        </div>

        {/* Social posts grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {socialPosts.map((post, index) => {
            const config = platformConfig[post.platform];
            return (
              <div
                key={post.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100 hover:border-orange-100"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Platform header */}
                <div className={`flex items-center justify-between p-4 border-b border-gray-50`}>
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg ${config.color} flex items-center justify-center text-white`}>
                      <config.icon/>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-700">{config.name}</p>
                      <p className="text-xs text-gray-400">@fondoahorrosnte51</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>

                {/* Post image placeholder */}
                <div className="relative h-44 bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
                  <div className="opacity-20">
                    {post.platform === 'youtube' ? (
                      <Play size={48} className="text-red-500"/>
                    ) : (
                      <config.icon/>
                    )}
                  </div>
                  {post.platform === 'youtube' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-lg opacity-80">
                        <Play size={24} className="text-white ml-1"/>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-3">
                    {post.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                      <Heart size={12}/>
                      <span>{post.likes.toLocaleString()}</span>
                    </div>
                    <a
                      href={post.url}
                      className="flex items-center gap-1 text-orange-500 text-xs font-medium hover:text-orange-600 transition-colors"
                    >
                      <span>Ver publicación</span>
                      <ExternalLink size={10}/>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
