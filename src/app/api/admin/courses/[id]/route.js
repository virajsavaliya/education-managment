import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';

function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function requireAdmin(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET });
  return token?.role === 'ADMIN';
}

export async function PUT(request, { params }) {
  if (!(await requireAdmin(request))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, category, price, thumbnail, level, duration, isPublished } = body;

    const data = {};
    if (title !== undefined) { data.title = title; data.slug = slugify(title); }
    if (description !== undefined) data.description = description;
    if (category !== undefined) data.category = category;
    if (price !== undefined) data.price = parseFloat(price) || 0;
    if (thumbnail !== undefined) data.thumbnail = thumbnail;
    if (level !== undefined) data.level = level;
    if (duration !== undefined) data.duration = duration;
    if (isPublished !== undefined) data.isPublished = Boolean(isPublished);

    const course = await prisma.course.update({ where: { id }, data });
    return NextResponse.json({ course });
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
    await prisma.course.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
