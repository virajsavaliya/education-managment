import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request, context) {
  try {
    const { id } = await context.params;

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        chapters: {
          orderBy: { sortOrder: 'asc' },
          include: {
            lessons: {
              orderBy: { sortOrder: 'asc' }
            }
          }
        },
        _count: {
          select: { chapters: true }
        }
      }
    });

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json({ course });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
