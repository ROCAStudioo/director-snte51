import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const regions = await prisma.region.findMany({ orderBy: { name: 'asc' } });
  return NextResponse.json(regions);
}

export async function POST(req: Request) {
  const data = await req.json();
  const region = await prisma.region.create({ data });
  return NextResponse.json(region);
}

export async function PUT(req: Request) {
  const data = await req.json();
  const { id, ...rest } = data;
  const region = await prisma.region.update({ where: { id }, data: rest });
  return NextResponse.json(region);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.region.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
