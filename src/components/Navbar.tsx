'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { navItems } from '@/data/site-data';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Detect active section
      const sections = navItems.map(item => item.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 overflow-x-hidden ${
        scrolled
          ? 'glass shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-xl gradient-orange flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">FA</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-semibold text-orange-500 leading-tight">Fondo de Ahorro</p>
              <p className="text-xs text-gray-500 leading-tight">SNTE Sección 51</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 animated-underline ${
                  activeSection === item.href.replace('#', '')
                    ? 'text-orange-500 bg-orange-50'
                    : scrolled
                    ? 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                    : 'text-gray-800 hover:text-orange-500 hover:bg-white/20'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA Button + Mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('#contacto')}
              className="hidden md:flex items-center gap-2 px-4 py-2.5 gradient-orange text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <span>Agenda una reunión</span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="glass border-t border-gray-100 px-4 py-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeSection === item.href.replace('#', '')
                  ? 'text-orange-500 bg-orange-50'
                  : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('#contacto')}
            className="mt-2 w-full py-3 gradient-orange text-white text-sm font-semibold rounded-xl shadow-md"
          >
            Agenda una reunión
          </button>
        </div>
      </div>
    </nav>
  );
}
