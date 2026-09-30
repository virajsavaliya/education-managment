import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';

export async function GET(request) {
  try {
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET 
    });

    if (!token || token.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Retrieve all users from the database (excluding password hashes)
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Calculate stats
    const studentsCount = await prisma.user.count({
      where: { role: 'STUDENT' }
    });
    const coursesCount = await prisma.course.count();
    const liveClassesCount = await prisma.liveClass.count({
      where: { isActive: true }
    });
    const couponsCount = await prisma.coupon.count({
      where: { isActive: true }
    });

    return NextResponse.json({ 
      users,
      stats: {
        studentsCount,
        coursesCount,
        liveClassesCount,
        couponsCount
      }
    });

  } catch (error) {
    console.error('Fetch Users Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
