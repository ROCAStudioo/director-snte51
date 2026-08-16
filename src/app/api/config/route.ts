import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const configs = await prisma.siteConfig.findMany();
  const result: Record<string, string> = {};
  configs.forEach(c => { result[c.id] = c.value; });
  return NextResponse.json(result);
}

export async function PUT(req: Request) {
  const data = await req.json();
  // data is { key: value, key: value, ... }
  for (const [key, value] of Object.entries(data)) {
    await prisma.siteConfig.upsert({
      where: { id: key },
      update: { value: value as string },
      create: { id: key, value: value as string },
    });
  }
  return NextResponse.json({ success: true });
}
