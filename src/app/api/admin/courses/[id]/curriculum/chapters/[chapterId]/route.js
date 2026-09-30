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
    const { id, chapterId } = await context.params;
    const body = await request.json();
    const { title, sortOrder } = body;

    const data = {};
    if (title !== undefined) data.title = title;
    if (sortOrder !== undefined) data.sortOrder = parseInt(sortOrder) || 0;

    // Verify ownership
    const chapterExists = await prisma.chapter.findFirst({
      where: { id: chapterId, courseId: id },
    });
    if (!chapterExists) return NextResponse.json({ error: 'Chapter not found' }, { status: 404 });

    const chapter = await prisma.chapter.update({
      where: { id: chapterId },
      data,
    });

    return NextResponse.json({ chapter });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  if (!(await requireAdmin(request))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const { id, chapterId } = await context.params;

    // Verify ownership
    const chapterExists = await prisma.chapter.findFirst({
      where: { id: chapterId, courseId: id },
    });
    if (!chapterExists) return NextResponse.json({ error: 'Chapter not found' }, { status: 404 });

    await prisma.chapter.delete({
      where: { id: chapterId },
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
