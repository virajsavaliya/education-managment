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

    // Get list of student's enrolled course IDs
    const enrollments = await prisma.enrollment.findMany({
      where: { userId },
      select: { courseId: true }
    });

    const enrolledCourseIds = enrollments.map(e => e.courseId);

    let liveClasses = [];
    if (enrolledCourseIds.length > 0) {
      liveClasses = await prisma.liveClass.findMany({
        where: {
          isActive: true,
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
        },
        orderBy: { scheduledAt: 'asc' },
        include: {
          courses: { select: { title: true } }
        }
      });
    }

    return NextResponse.json({ liveClasses });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
