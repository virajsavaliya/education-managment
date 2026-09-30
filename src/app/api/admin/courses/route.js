import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';

function requireAdmin(token) {
  if (!token || token.role !== 'ADMIN') return false;
  return true;
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function GET(request) {
  try {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET });
    if (!requireAdmin(token)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const courses = await prisma.course.findMany({
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { enrollments: true } } },
    });

    return NextResponse.json({ courses });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET });
    if (!requireAdmin(token)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const body = await request.json();
    const { title, description, category, price, thumbnail, level, duration, isPublished } = body;

    if (!title || !category) return NextResponse.json({ error: 'Title and category are required' }, { status: 400 });

    // Ensure unique slug
    let slug = slugify(title);
    const existing = await prisma.course.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;

    const course = await prisma.course.create({
      data: {
        title,
        slug,
        description: description || null,
        category,
        price: parseFloat(price) || 0,
        thumbnail: thumbnail || null,
        level: level || 'BEGINNER',
        duration: duration || null,
        isPublished: Boolean(isPublished),
      },
    });

    return NextResponse.json({ course }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
