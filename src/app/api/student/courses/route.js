import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';

async function requireStudent(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET });
  return token;
}

export async function GET(request) {
  const token = await requireStudent(request);
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const userId = token.id;

    const enrollments = await prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: {
          include: {
            chapters: {
              include: {
                lessons: {
                  select: { id: true }
                }
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const completedProgress = await prisma.lessonProgress.findMany({
      where: { userId, isCompleted: true },
      select: { lessonId: true }
    });
    const completedLessonIds = new Set(completedProgress.map(p => p.lessonId));

    const courses = enrollments.map(enr => {
      const course = enr.course;
      
      let totalLessons = 0;
      let completedLessons = 0;

      course.chapters.forEach(ch => {
        ch.lessons.forEach(les => {
          totalLessons++;
          if (completedLessonIds.has(les.id)) {
            completedLessons++;
          }
        });
      });

      const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

      return {
        id: course.id,
        title: course.title,
        category: course.category,
        thumbnail: course.thumbnail,
        price: course.price,
        enrolledAt: enr.createdAt,
        progress,
        totalLessons,
        completedLessons,
      };
    });

    return NextResponse.json({ courses });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
