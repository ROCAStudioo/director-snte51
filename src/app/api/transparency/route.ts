import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const docs = await prisma.transparencyDoc.findMany({ orderBy: { id: 'desc' } });
  return NextResponse.json(docs);
}

export async function POST(req: Request) {
  const data = await req.json();
  const doc = await prisma.transparencyDoc.create({ data });
  return NextResponse.json(doc);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.transparencyDoc.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
