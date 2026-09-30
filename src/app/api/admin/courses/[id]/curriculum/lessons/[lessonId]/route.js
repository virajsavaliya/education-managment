import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';

async function requireAdmin(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET });
  return token?.role === 'ADMIN';
}

export async function PUT(request, context) {
  if (!(await requireAdmin(request))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const { id, lessonId } = await context.params;
    const body = await request.json();
    const { title, description, videoUrl, notesUrl, duration, isFreePreview, sortOrder } = body;

    // Verify ownership: lesson -> chapter -> course
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { chapter: true },
    });
    if (!lesson || lesson.chapter.courseId !== id) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    const data = {};
    if (title !== undefined) data.title = title;
    if (description !== undefined) data.description = description;
    if (videoUrl !== undefined) data.videoUrl = videoUrl;
    if (notesUrl !== undefined) data.notesUrl = notesUrl;
    if (duration !== undefined) data.duration = duration;
    if (isFreePreview !== undefined) data.isFreePreview = Boolean(isFreePreview);
    if (sortOrder !== undefined) data.sortOrder = parseInt(sortOrder) || 0;

    const updated = await prisma.lesson.update({
      where: { id: lessonId },
      data,
    });

    return NextResponse.json({ lesson: updated });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  if (!(await requireAdmin(request))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const { id, lessonId } = await context.params;

    // Verify ownership: lesson -> chapter -> course
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { chapter: true },
    });
    if (!lesson || lesson.chapter.courseId !== id) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    await prisma.lesson.delete({
      where: { id: lessonId },
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
