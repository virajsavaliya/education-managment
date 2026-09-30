import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';

async function requireAdmin(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET });
  return token?.role === 'ADMIN';
}

export async function GET(request, { params }) {
  if (!(await requireAdmin(request))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const { id } = await params;
    const student = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true, name: true, email: true, phone: true, createdAt: true,
        enrollments: {
          include: {
            course: { select: { id: true, title: true, category: true, level: true, isPublished: true } },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!student) return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    return NextResponse.json({ student });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  if (!(await requireAdmin(request))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const { id } = await params;
    // Enrollments cascade-delete via schema
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
