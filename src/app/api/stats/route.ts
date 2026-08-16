import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const stats = await prisma.stat.findMany({ orderBy: { sortOrder: 'asc' } });
  return NextResponse.json(stats);
}

export async function PUT(req: Request) {
  const data = await req.json();
  // data is an array of stats
  if (Array.isArray(data)) {
    for (const stat of data) {
      if (stat.id) {
        await prisma.stat.update({ where: { id: stat.id }, data: { value: stat.value, label: stat.label, prefix: stat.prefix, suffix: stat.suffix, icon: stat.icon } });
      } else {
        await prisma.stat.create({ data: stat });
      }
    }
  }
  const stats = await prisma.stat.findMany({ orderBy: { sortOrder: 'asc' } });
  return NextResponse.json(stats);
}
