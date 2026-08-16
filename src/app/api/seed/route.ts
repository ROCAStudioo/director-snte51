import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { actionCards, newsItems, galleryItems, testimonials, regions, statCounters, transparencyDocs, siteConfig } from '@/data/site-data';

/**
 * GET /api/seed — Llena la base de datos con los datos iniciales
 * Solo ejecutar una vez para migrar los datos estáticos a la BD
 */
export async function GET() {
  try {
    // Seed Actions
    for (const action of actionCards) {
      await prisma.action.upsert({
        where: { slug: action.slug },
        update: {},
        create: {
          title: action.title,
          description: action.description,
          slug: action.slug,
          image: action.image,
          category: action.category,
          date: action.date,
          published: true,
        },
      });
    }

    // Seed News
    for (const news of newsItems) {
      await prisma.news.upsert({
        where: { slug: news.slug },
        update: {},
        create: {
          title: news.title,
          summary: news.summary,
          content: news.content || '',
          slug: news.slug,
          image: news.image,
          category: news.category,
          featured: news.featured,
          date: news.date,
          published: true,
        },
      });
    }

    // Seed Gallery
    const existingGallery = await prisma.galleryItem.count();
    if (existingGallery === 0) {
      for (const item of galleryItems) {
        await prisma.galleryItem.create({
          data: {
            src: item.src,
            alt: item.alt,
            category: item.category.toUpperCase() as any,
            type: item.type.toUpperCase() as any,
            width: item.width,
            height: item.height,
          },
        });
      }
    }

    // Seed Testimonials
    const existingTestimonials = await prisma.testimonial.count();
    if (existingTestimonials === 0) {
      for (const t of testimonials) {
        await prisma.testimonial.create({
          data: {
            name: t.name,
            municipality: t.municipality,
            role: t.role,
            comment: t.comment,
            avatar: t.avatar,
            approved: true,
          },
        });
      }
    }

    // Seed Regions
    for (const region of regions) {
      await prisma.region.upsert({
        where: { id: region.id },
        update: {},
        create: {
          id: region.id,
          name: region.name,
          lat: region.lat,
          lng: region.lng,
          photo: region.photo,
          date: region.date,
          services: region.services,
          attendees: region.attendees,
          description: region.description,
        },
      });
    }

    // Seed Stats
    const existingStats = await prisma.stat.count();
    if (existingStats === 0) {
      for (let i = 0; i < statCounters.length; i++) {
        const s = statCounters[i];
        await prisma.stat.create({
          data: {
            label: s.label,
            value: s.value,
            prefix: s.prefix,
            suffix: s.suffix,
            icon: s.icon,
            sortOrder: i,
          },
        });
      }
    }

    // Seed Transparency Docs
    const existingDocs = await prisma.transparencyDoc.count();
    if (existingDocs === 0) {
      for (const doc of transparencyDocs) {
        await prisma.transparencyDoc.create({
          data: {
            title: doc.title,
            type: doc.type.toUpperCase() as any,
            date: doc.date,
            size: doc.size,
            url: doc.url,
          },
        });
      }
    }

    // Seed Site Config
    const configData = {
      'director.name': siteConfig.director.name,
      'director.title': siteConfig.director.title,
      'director.organization': siteConfig.director.organization,
      'director.section': siteConfig.director.section,
      'director.bio': siteConfig.director.bio,
      'director.message': siteConfig.director.message,
      'contact.address': siteConfig.contact.address,
      'contact.phone': siteConfig.contact.phone,
      'contact.email': siteConfig.contact.email,
      'contact.schedule': siteConfig.contact.schedule,
      'social.facebook': siteConfig.social.facebook,
      'social.instagram': siteConfig.social.instagram,
    };

    for (const [key, value] of Object.entries(configData)) {
      await prisma.siteConfig.upsert({
        where: { id: key },
        update: { value },
        create: { id: key, value },
      });
    }

    return NextResponse.json({ success: true, message: 'Base de datos poblada correctamente' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
