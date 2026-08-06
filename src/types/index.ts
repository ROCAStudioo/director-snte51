// ============================================
// TIPOS GLOBALES DEL PROYECTO
// Director General - Fondo de Ahorro SNTE Sección 51
// ============================================

export interface NavItem {
  label: string;
  href: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: string;
  category: 'academic' | 'professional' | 'achievement' | 'recognition' | 'institutional';
}

export interface ActionCard {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  category: string;
  slug: string;
}

export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  content: string;
  date: string;
  image: string;
  category: string;
  featured: boolean;
  slug: string;
}

export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  category: 'regional' | 'events' | 'meetings' | 'conferences' | 'training';
  type: 'image' | 'video';
  width: number;
  height: number;
}

export interface Testimonial {
  id: number;
  name: string;
  municipality: string;
  comment: string;
  avatar: string;
  role: string;
}

export interface Region {
  id: string;
  name: string;
  lat: number;
  lng: number;
  photo: string;
  date: string;
  services: string[];
  attendees: number;
  description: string;
}

export interface TransparencyDoc {
  id: number;
  title: string;
  type: 'report' | 'announcement' | 'regulation' | 'financial' | 'official';
  date: string;
  size: string;
  url: string;
}

export interface StatCounter {
  value: number;
  label: string;
  suffix: string;
  prefix: string;
  icon: string;
}

export interface SocialPost {
  id: string;
  platform: 'facebook' | 'instagram' | 'youtube';
  content: string;
  image: string;
  date: string;
  likes: number;
  url: string;
}
