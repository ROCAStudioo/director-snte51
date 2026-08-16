import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const items = await prisma.testimonial.findMany({ orderBy: { id: 'desc' } });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const data = await req.json();
  const item = await prisma.testimonial.create({ data });
  return NextResponse.json(item);
}

export async function PUT(req: Request) {
  const data = await req.json();
  const { id, ...rest } = data;
  const item = await prisma.testimonial.update({ where: { id }, data: rest });
  return NextResponse.json(item);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.testimonial.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
