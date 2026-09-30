import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';

async function requireStudent(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET });
  return token;
}

export async function GET(request, context) {
  const token = await requireStudent(request);
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await context.params;
    const userId = token.id;

    // Verify enrollment
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: { userId, courseId: id }
      }
    });

    if (!enrollment) {
      return NextResponse.json({ error: 'You are not enrolled in this course.' }, { status: 403 });
    }

    // Get course syllabus
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
        }
      }
    });

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Get student's completed lessons in this course
    const completedProgress = await prisma.lessonProgress.findMany({
      where: {
        userId,
        lesson: {
          chapter: {
            courseId: id
          }
        }
      },
      select: {
        lessonId: true
      }
    });

    const completedLessonIds = completedProgress.map(p => p.lessonId);

    return NextResponse.json({
      course,
      completedLessonIds
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
