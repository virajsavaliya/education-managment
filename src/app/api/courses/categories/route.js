import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      where: { isPublished: true, category: { not: "" } },
      select: { category: true },
      distinct: ['category'],
    });
    
    // Map list to dynamic unique strings and filter empties
    const categories = courses
      .map(c => c.category?.trim())
      .filter(Boolean);

    // Sort alphabetically
    categories.sort((a, b) => a.localeCompare(b));

    return NextResponse.json({ categories });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
