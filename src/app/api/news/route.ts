import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const news = await prisma.news.findMany({ orderBy: { id: 'desc' } });
  return NextResponse.json(news);
}

export async function POST(req: Request) {
  const data = await req.json();
  const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const news = await prisma.news.create({
    data: { ...data, slug, published: true },
  });
  return NextResponse.json(news);
}

export async function PUT(req: Request) {
  const data = await req.json();
  const { id, ...rest } = data;
  const news = await prisma.news.update({ where: { id }, data: rest });
  return NextResponse.json(news);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.news.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
