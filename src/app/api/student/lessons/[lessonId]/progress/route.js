import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';

async function requireStudent(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET });
  return token;
}

export async function POST(request, context) {
  const token = await requireStudent(request);
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { lessonId } = await context.params;
    const userId = token.id;
    const body = await request.json();
    const { isCompleted } = body;

    // Check if user is enrolled in the course this lesson belongs to
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        chapter: {
          select: { courseId: true }
        }
      }
    });

    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    const courseId = lesson.chapter.courseId;

    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: { userId, courseId }
      }
    });

    if (!enrollment) {
      return NextResponse.json({ error: 'Not enrolled in this course' }, { status: 403 });
    }

    if (isCompleted) {
      // Upsert progress
      await prisma.lessonProgress.upsert({
        where: {
          userId_lessonId: { userId, lessonId }
        },
        update: {},
        create: {
          userId,
          lessonId
        }
      });
    } else {
      // Delete progress if it exists
      try {
        await prisma.lessonProgress.delete({
          where: {
            userId_lessonId: { userId, lessonId }
          }
        });
      } catch (err) {
        // Already deleted or doesn't exist, ignore
      }
    }

    return NextResponse.json({ success: true, isCompleted });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
