import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';

async function requireAdmin(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET });
  return token?.role === 'ADMIN';
}

export async function GET(request, context) {
  if (!(await requireAdmin(request))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const { id } = await context.params;
    const chapters = await prisma.chapter.findMany({
      where: { courseId: id },
      orderBy: { sortOrder: 'asc' },
      include: {
        lessons: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    return NextResponse.json({ chapters });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request, context) {
  if (!(await requireAdmin(request))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const { id } = await context.params;
    const body = await request.json();
    const { type } = body; // 'chapter' or 'lesson'

    if (type === 'chapter') {
      const { title, sortOrder } = body;
      if (!title) return NextResponse.json({ error: 'Chapter title is required' }, { status: 400 });

      // Determine next sort order if not provided
      let order = parseInt(sortOrder);
      if (isNaN(order)) {
        const lastChapter = await prisma.chapter.findFirst({
          where: { courseId: id },
          orderBy: { sortOrder: 'desc' },
        });
        order = lastChapter ? lastChapter.sortOrder + 1 : 0;
      }

      const chapter = await prisma.chapter.create({
        data: {
          title,
          sortOrder: order,
          courseId: id,
        },
      });

      return NextResponse.json({ type: 'chapter', data: chapter }, { status: 201 });
    }

    if (type === 'lesson') {
      const { chapterId, title, description, videoUrl, notesUrl, duration, isFreePreview, sortOrder } = body;
      if (!chapterId || !title) return NextResponse.json({ error: 'Chapter ID and lesson title are required' }, { status: 400 });

      // Check if chapter exists and belongs to this course
      const chapter = await prisma.chapter.findUnique({
        where: { id: chapterId, courseId: id },
      });
      if (!chapter) return NextResponse.json({ error: 'Chapter not found' }, { status: 404 });

      // Determine next sort order if not provided
      let order = parseInt(sortOrder);
      if (isNaN(order)) {
        const lastLesson = await prisma.lesson.findFirst({
          where: { chapterId },
          orderBy: { sortOrder: 'desc' },
        });
        order = lastLesson ? lastLesson.sortOrder + 1 : 0;
      }

      const lesson = await prisma.lesson.create({
        data: {
          title,
          description: description || null,
          videoUrl: videoUrl || null,
          notesUrl: notesUrl || null,
          duration: duration || null,
          isFreePreview: Boolean(isFreePreview),
          sortOrder: order,
          chapterId,
        },
      });

      return NextResponse.json({ type: 'lesson', data: lesson }, { status: 201 });
    }

    return NextResponse.json({ error: 'Invalid item type' }, { status: 400 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
