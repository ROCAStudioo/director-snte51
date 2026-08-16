import { prisma } from './prisma';
import { siteConfig as staticConfig, actionCards, newsItems, galleryItems, testimonials, regions, statCounters } from '@/data/site-data';

/**
 * Funciones para leer datos de la base de datos.
 * Si la BD está vacía o hay error, usa los datos estáticos como fallback.
 */

export async function getSiteConfig() {
  try {
    const configs = await prisma.siteConfig.findMany();
    if (configs.length === 0) return staticConfig;
    
    const map: Record<string, string> = {};
    configs.forEach(c => { map[c.id] = c.value; });

    return {
      director: {
        name: map['director.name'] || staticConfig.director.name,
        title: map['director.title'] || staticConfig.director.title,
        organization: map['director.organization'] || staticConfig.director.organization,
        section: map['director.section'] || staticConfig.director.section,
        bio: map['director.bio'] || staticConfig.director.bio,
        message: map['director.message'] || staticConfig.director.message,
        signature: map['director.name'] || staticConfig.director.signature,
        photo: staticConfig.director.photo,
        photoCircle: staticConfig.director.photoCircle,
      },
      contact: {
        address: map['contact.address'] || staticConfig.contact.address,
        phone: map['contact.phone'] || staticConfig.contact.phone,
        email: map['contact.email'] || staticConfig.contact.email,
        schedule: map['contact.schedule'] || staticConfig.contact.schedule,
        mapLat: staticConfig.contact.mapLat,
        mapLng: staticConfig.contact.mapLng,
      },
      social: {
        facebook: map['social.facebook'] || staticConfig.social.facebook,
        instagram: map['social.instagram'] || staticConfig.social.instagram,
      },
    };
  } catch {
    return staticConfig;
  }
}

export async function getActions() {
  try {
    const data = await prisma.action.findMany({ where: { published: true }, orderBy: { id: 'desc' } });
    if (data.length === 0) return actionCards;
    return data.map(a => ({
      id: a.id,
      title: a.title,
      description: a.description,
      date: a.date,
      image: a.image || '',
      category: a.category,
      slug: a.slug,
    }));
  } catch {
    return actionCards;
  }
}

export async function getNews() {
  try {
    const data = await prisma.news.findMany({ where: { published: true }, orderBy: { id: 'desc' } });
    if (data.length === 0) return newsItems;
    return data.map(n => ({
      id: n.id,
      title: n.title,
      summary: n.summary,
      content: n.content,
      date: n.date,
      image: n.image || '',
      category: n.category,
      featured: n.featured,
      slug: n.slug,
    }));
  } catch {
    return newsItems;
  }
}

export async function getGallery() {
  try {
    const data = await prisma.galleryItem.findMany({ where: { published: true }, orderBy: { id: 'desc' } });
    if (data.length === 0) return galleryItems;
    return data.map(g => ({
      id: g.id,
      src: g.src,
      alt: g.alt,
      category: g.category.toLowerCase() as any,
      type: g.type.toLowerCase() as any,
      width: g.width || 800,
      height: g.height || 600,
    }));
  } catch {
    return galleryItems;
  }
}

export async function getTestimonials() {
  try {
    const data = await prisma.testimonial.findMany({ where: { approved: true }, orderBy: { id: 'desc' } });
    if (data.length === 0) return testimonials;
    return data.map(t => ({
      id: t.id,
      name: t.name,
      municipality: t.municipality,
      role: t.role,
      comment: t.comment,
      avatar: t.avatar || '',
    }));
  } catch {
    return testimonials;
  }
}

export async function getRegions() {
  try {
    const data = await prisma.region.findMany({ where: { active: true } });
    if (data.length === 0) return regions;
    return data.map(r => ({
      id: r.id,
      name: r.name,
      lat: r.lat,
      lng: r.lng,
      photo: r.photo || '',
      date: r.date,
      services: r.services,
      attendees: r.attendees,
      description: r.description || '',
    }));
  } catch {
    return regions;
  }
}

export async function getStats() {
  try {
    const data = await prisma.stat.findMany({ orderBy: { sortOrder: 'asc' } });
    if (data.length === 0) return statCounters;
    return data.map(s => ({
      value: s.value,
      label: s.label,
      suffix: s.suffix,
      prefix: s.prefix,
      icon: s.icon,
    }));
  } catch {
    return statCounters;
  }
}
