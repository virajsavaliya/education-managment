import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';

async function requireAdmin(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET });
  return token?.role === 'ADMIN';
}

export async function PUT(request, { params }) {
  if (!(await requireAdmin(request))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, courseIds, scheduledAt, duration, meetLink, isActive } = body;

    const data = {};
    if (title !== undefined) data.title = title;
    if (description !== undefined) data.description = description;
    if (courseIds !== undefined) {
      data.courses = {
        set: courseIds ? courseIds.map(id => ({ id })) : []
      };
    }
    if (scheduledAt !== undefined) data.scheduledAt = new Date(scheduledAt);
    if (duration !== undefined) data.duration = parseInt(duration);
    if (meetLink !== undefined) data.meetLink = meetLink || null;
    if (isActive !== undefined) data.isActive = Boolean(isActive);

    const liveClass = await prisma.liveClass.update({ where: { id }, data });
    return NextResponse.json({ liveClass });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  if (!(await requireAdmin(request))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const { id } = await params;
    await prisma.liveClass.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
