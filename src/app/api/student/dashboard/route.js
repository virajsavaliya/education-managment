import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';

async function requireStudent(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET });
  return token; // returns token if authenticated
}

export async function GET(request) {
  const token = await requireStudent(request);
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const userId = token.id;

    // Get all enrollments for this user
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
      }
    });

    // Get completed lessons list for this user
    const completedProgress = await prisma.lessonProgress.findMany({
      where: { userId, isCompleted: true },
      select: { lessonId: true }
    });
    const completedLessonIds = new Set(completedProgress.map(p => p.lessonId));

    let completedCoursesCount = 0;
    const activeCourses = enrollments.map(enr => {
      const course = enr.course;
      
      // Calculate total lessons in course
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
      if (progress === 100 && totalLessons > 0) {
        completedCoursesCount++;
      }

      return {
        id: course.id,
        title: course.title,
        category: course.category,
        thumbnail: course.thumbnail,
        progress,
        totalLessons,
        completedLessons,
      };
    });

    // Get list of student's enrolled course IDs
    const enrolledCourseIds = enrollments.map(e => e.course.id);

    // Get upcoming active live classes count
    let liveClassesCount = 0;
    if (enrolledCourseIds.length > 0) {
      liveClassesCount = await prisma.liveClass.count({
        where: {
          isActive: true,
          scheduledAt: { gte: new Date() },
          OR: [
            {
              courses: {
                none: {}
              }
            },
            {
              courses: {
                some: {
                  id: { in: enrolledCourseIds }
                }
              }
            }
          ]
        }
      });
    }

    return NextResponse.json({
      stats: {
        enrolledCount: enrollments.length,
        completedCount: completedCoursesCount,
        liveClassesCount,
        certificatesCount: completedCoursesCount // student gets a cert for every completed course
      },
      activeCourses
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
