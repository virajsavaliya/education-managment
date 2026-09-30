import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';

async function requireAdmin(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET });
  return token?.role === 'ADMIN';
}

export async function GET(request) {
  if (!(await requireAdmin(request))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const courseId = searchParams.get('courseId') || '';

    const whereClause = {
      role: 'STUDENT',
      OR: search ? [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ] : undefined,
    };

    if (courseId) {
      whereClause.enrollments = {
        some: { courseId: courseId }
      };
    }

    const students = await prisma.user.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true, name: true, email: true,
        phone: true, createdAt: true,
        _count: { select: { enrollments: true } },
      },
    });

    return NextResponse.json({ students });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
