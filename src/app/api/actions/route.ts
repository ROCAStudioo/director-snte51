import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const actions = await prisma.action.findMany({ orderBy: { id: 'desc' } });
  return NextResponse.json(actions);
}

export async function POST(req: Request) {
  const data = await req.json();
  const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const action = await prisma.action.create({
    data: { ...data, slug, published: true },
  });
  return NextResponse.json(action);
}

export async function PUT(req: Request) {
  const data = await req.json();
  const { id, ...rest } = data;
  const action = await prisma.action.update({ where: { id }, data: rest });
  return NextResponse.json(action);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.action.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
